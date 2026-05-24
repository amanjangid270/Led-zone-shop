# Security Specification: Zero-Trust ABAC Firestore Policy

This document outlines the security architecture and invariants for the LedZone database collections.

## 1. Core Data Invariants

### Users Collection (`/users/{userId}`)
*   A user profile can only be read or written by the authenticated user whose `request.auth.uid` matches the document path variable `userId`.
*   Usernames and profiles are immutable on update once set except for private metadata modifications.
*   The `email` stored must strictly match `request.auth.token.email`.

### Bookings Collection (`/bookings/{bookingId}`)
*   `userId` within the payload must strictly match the creator's authenticated ID `request.auth.uid`.
*   A booking can only be read by the owner who created it.
*   Once status is set to a terminal state (e.g. `success`), users are blocked from any further updates to the item unless a trusted staff handles it.
*   Phone numbers must be exactly 10 digits as strings.
*   Fields like `createdAt` and `userId` are strictly immutable after creation.
*   Timestamps like `createdAt` must strictly match `request.time`.

---

## 2. The "Dirty Dozen" Malicious Payloads

The following payloads represent attacks designed to break identity, schema validation, and state immutability. All must return `PERMISSION_DENIED`:

### Identity Spoofing & Escalation
1.  **Direct Profile Injection**: Attacker requests `setDoc` on `/users/victim-uid` with target credentials.
2.  **Foreign Booking Creation**: Attacker inputs `request.auth.uid = "attacker"` but sets payload `"userId": "victim"` to spoof who placed the order.
3.  **Booking Read Snooping**: Attacker attempts to list `/bookings` or get doc `/bookings/victim-booking` as a different authenticated account.

### Schema & Data Poisoning
4.  **Buffer Overflow Name Injection**: Creating a booking where `"name"` size is larger than 128 characters.
5.  **Junk-Character Path Poisoning**: Submitting a booking or profile document ID containing massive special characters (e.g., `../root/bad`) to break queries.
6.  **Phone Number Format Attack**: Setting `"phone"` to a string array, boolean, or raw integer, or a string not matching exactly 10 digits.
7.  **Negative/Huge Amount Injection**: Forging prices inside orders to be negative (e.g., `-10000` Rupees) to seek cashback exploit.
8.  **Empty/Omitted Fields**: Booking request missing compulsory fields like `address` or `type`.

### State & Immutability Attacks
9.  **Time Spoofing (Client Drift)**: Submitting custom client-side UTC date strings under `createdAt` instead of Firestore `request.time` (Server Timestamp).
10. **Identity Relocation (Transfer Owner)**: Attempting to update `userId` of an existing booking to pass tracking to someone else.
11. **Terminal Status Bypass**: Modifying products and totals of a completed (`"status": "success"`) booking.
12. **Malicious Ghost Fields**: Writing a booking containing unauthorized metadata parameters (e.g., `"isAdmin": true`).

---

## 3. Security Test Patterns validation

All write, read, and list operations matching the above malformed scripts are subjected to rejection gates. We verify this strictly by implementing rules validation.
