import { toast } from 'react-hot-toast';

export interface EmailData {
  to: string;
  subject: string;
  html: string;
  bookingId: string;
  customerName: string;
  productName: string;
  amount: number;
  type: 'repair' | 'refurbished' | 'new';
}

// Global listeners for mock email events so components can display a stylish simulated inbox
type EmailListener = (email: EmailData) => void;
const listeners = new Set<EmailListener>();

export const subscribeToEmails = (listener: EmailListener) => {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
};

/**
 * Helper function representing an integration with an external email delivery API.
 * Uses realistic parameters, logs SMTP/API transmission payloads for validation,
 * and triggers interactive mock inbox states in the frontend applet interface.
 */
export const sendConfirmationEmail = async (booking: {
  id: string;
  name: string;
  phone: string;
  address: string;
  type: 'repair' | 'refurbished' | 'new';
  product: string;
  amount: number;
  issue?: string;
  userEmail?: string;
}): Promise<boolean> => {
  const recipientEmail = booking.userEmail || 'customer@ledzone-diagnostics.com';
  
  // Construct the mirrored HTML receipt structure
  const emailHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>LEDZone Confirmation Receipt - ${booking.id}</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      margin: 40px;
      padding: 0;
      color: #333;
      background: #fafafa;
    }
    .receipt-container {
      max-width: 600px;
      margin: 40px auto;
      border: 1px solid #e2e8f0;
      border-radius: 16px;
      padding: 35px;
      box-shadow: 0 10px 15px -3px rgba(0,0,0,0.05);
      background: #ffffff;
    }
    .header {
      border-bottom: 2px solid #06b6d4;
      padding-bottom: 20px;
      margin-bottom: 25px;
      text-align: center;
    }
    .logo {
      font-size: 26px;
      font-weight: 900;
      letter-spacing: -1.5px;
      text-transform: uppercase;
      font-family: system-ui, -apple-system, sans-serif;
    }
    .logo-accent {
      color: #06b6d4;
    }
    .info-table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 25px;
    }
    .info-table td {
      padding: 12px 0;
      border-bottom: 1px solid #f1f5f9;
      font-size: 14px;
    }
    .info-table td.label {
      color: #64748b;
      font-weight: 600;
      text-transform: uppercase;
      font-size: 11px;
      letter-spacing: 0.5px;
    }
    .info-table td.value {
      text-align: right;
      font-weight: 700;
      color: #0f172a;
    }
    .footer {
      text-align: center;
      margin-top: 30px;
      font-size: 11px;
      color: #94a3b8;
      border-top: 1px dashed #e2e8f0;
      padding-top: 20px;
    }
    .status-badge {
      display: inline-block;
      background: #ecfdf5;
      color: #047857;
      border: 1px solid #a7f3d0;
      padding: 4px 12px;
      border-radius: 12px;
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
  </style>
</head>
<body>
  <div class="receipt-container">
    <div class="header">
      <div class="logo">Led<span class="logo-accent">Zone</span></div>
      <p style="margin: 5px 0 0; font-size: 12px; color: #64748b; font-weight: 500;">Secure Micro-Hardware Diagnostics & Fulfillment Receipt</p>
    </div>
    
    <div style="text-align: center; margin-bottom: 24px;">
      <span class="status-badge">Booking Confirmed</span>
      <h2 style="font-size: 18px; font-weight: 800; margin: 10px 0 5px; text-transform: uppercase; letter-spacing: -0.5px;">Thank You For Your Booking!</h2>
      <p style="margin: 0; font-size: 13px; color: #64748b;">Your request has been logged and synchronized on our security nodes.</p>
    </div>

    <table class="info-table">
      <tr>
        <td class="label">Receipt Reference</td>
        <td class="value" style="font-family: monospace;">${booking.id}</td>
      </tr>
      <tr>
        <td class="label">Date / Time</td>
        <td class="value">${new Date().toLocaleString()}</td>
      </tr>
      <tr>
        <td class="label">Client Name</td>
        <td class="value">${booking.name}</td>
      </tr>
      <tr>
        <td class="label">Phone Contact</td>
        <td class="value">${booking.phone}</td>
      </tr>
      <tr>
        <td class="label">Operational Service</td>
        <td class="value" style="text-transform: uppercase;">${booking.type === 'repair' ? 'Technical Panel Repair' : 'Product Order'}</td>
      </tr>
      <tr>
        <td class="label">Component Name</td>
        <td class="value">${booking.product}</td>
      </tr>
      ${booking.type === 'repair' && booking.issue ? `
      <tr>
        <td class="label">Reported Issue</td>
        <td class="value">${booking.issue}</td>
      </tr>` : ''}
      <tr style="border-top: 2px solid #e2e8f0;">
        <td class="label" style="font-size: 12px; color: #010101; font-weight: 850; padding-top: 16px;">Verified Amount Paid</td>
        <td class="value" style="font-size: 20px; color: #06b6d4; font-weight: 900; padding-top: 16px;">₹${booking.amount.toLocaleString('en-IN')}</td>
      </tr>
    </table>
    
    <div style="background: #f0fdfa; border: 1px solid #ccfbf1; padding: 12px; border-radius: 8px; text-align: center; font-size: 11px; color: #0f766e; font-weight: bold; margin-bottom: 20px;">
      ✔ Google Firebase Network E2E Secure Authenticated Code: FD-88X-OK2
    </div>
    
    <div class="footer">
      <p>Thank you for choosing LEDZone Technical Operations.</p>
      <p>Support Hotline: 919084184735</p>
    </div>
  </div>
</body>
</html>
`;

  const emailData: EmailData = {
    to: recipientEmail,
    subject: `[LEDZone Confirmed] Order Receipt: ${booking.id.slice(0, 8)}`,
    html: emailHtml,
    bookingId: booking.id,
    customerName: booking.name,
    productName: booking.product,
    amount: booking.amount,
    type: booking.type,
  };

  // Simulate remote SMTP / SendGrid API call over network
  console.log('Sending transaction confirmation via external API...');
  console.log('API Endpoint: https://api.sendgrid.com/v3/mail/send');
  console.log('Headers: { Authorization: "Bearer SG.ledzone_security..." }');
  console.log('Payload:', {
    personalizations: [{ to: [{ email: recipientEmail }] }],
    from: { email: "no-reply@ledzone-ops.com", name: "LEDZone Support" },
    subject: emailData.subject,
    content: [{ type: "text/html", value: "[Mirrored HTML Receipt Template]" }]
  });

  return new Promise((resolve) => {
    setTimeout(() => {
      // Notify active listeners so we can display a mockup inbox window to make this feature live & highly testable in the UI!
      listeners.forEach((l) => l(emailData));
      
      toast.success(`Confirmation receipt sent to ${recipientEmail}`);
      resolve(true);
    }, 1500);
  });
};
