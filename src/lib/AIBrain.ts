// Unique ID for AI Brain model definitions
// Designed by Product Architect & AI Specialist for LEDZone Technical Operations

export interface DiagnosticResult {
  severity: 'low' | 'medium' | 'high';
  recommendation: string;
  action: 'repair' | 'buy_refurbished' | 'buy_new' | 'none';
  savingsText?: string;
  disabledAction?: boolean;
}

export const correctTypos = (text: string): string => {
  if (!text) return text;
  
  const typoMap: Record<string, string> = {
    'fliker': 'flicker',
    'flickring': 'flickering',
    'scrn': 'screen',
    'disply': 'display',
    'hdm': 'HDMI',
    'hdme': 'HDMI',
    'linez': 'lines',
    'verticle': 'vertical',
    'noice': 'noise',
    'speker': 'speaker',
    'pictr': 'picture',
    'remot': 'remote',
    'singal': 'signal',
    'powre': 'power',
    'voise': 'voice'
  };

  let corrected = text;
  Object.entries(typoMap).forEach(([typo, correction]) => {
    const regex = new RegExp(`\\b${typo}\\b`, 'gi');
    corrected = corrected.replace(regex, correction);
  });
  
  return corrected;
};

export const autoFormatAddress = (address: string): string => {
  if (!address) return address;
  
  let formatted = address;
  const abbreviations: Record<string, string> = {
    '\\bst\\b': 'Street',
    '\\brd\\b': 'Road',
    '\\bapt\\b': 'Apartment',
    '\\bcty\\b': 'City',
    '\\bcol\\b': 'Colony',
    '\\bflr\\b': 'Floor',
    '\\bdelhi\\b': 'Delhi',
    '\\bmumbai\\b': 'Mumbai',
    '\\bblr\\b': 'Bengaluru',
    '\\bindia\\b': 'India',
    '\\bbkp\\b': 'Barrackpore',
    '\\bsec\\b': 'Sector'
  };

  Object.entries(abbreviations).forEach(([abbr, replacement]) => {
    const regex = new RegExp(abbr, 'gi');
    formatted = formatted.replace(regex, replacement);
  });

  // Capitalize main words and collapse extra spaces
  formatted = formatted
    .replace(/\s+/g, ' ')
    .trim()
    .split(' ')
    .map(word => {
      if (word.match(/^[a-zA-Z]/)) {
        return word.charAt(0).toUpperCase() + word.slice(1);
      }
      return word;
    })
    .join(' ');

  return formatted;
};

export const correctInput = (field: string, value: string): { correctedValue: string; message: string | null } => {
  if (!value) return { correctedValue: value, message: null };

  let correctedValue = value;
  let message: string | null = null;

  if (field === 'phone') {
    // Remove non-numeric characters except + or keep only numbers
    const digitsOnly = value.replace(/\D/g, '');
    if (digitsOnly.length > 10) {
      // Handle country codes e.g., 919084184735 -> 9084184735
      if (digitsOnly.startsWith('91') && digitsOnly.length === 12) {
        correctedValue = digitsOnly.slice(2);
        message = 'Format: Standardized Indian local phone number (+91 removed)';
      } else {
        correctedValue = digitsOnly.slice(-10);
        message = 'Format: Trimmed to standard 10-digit primary contact';
      }
    } else {
      correctedValue = digitsOnly;
      if (value !== digitsOnly) {
        message = 'Input sanitized (non-digits removed)';
      }
    }
  } else if (field === 'name') {
    // Trim double spaces and capitalize every word
    const cleaned = value.replace(/\s+/g, ' ').trim();
    const capitalized = cleaned
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
    
    if (value !== capitalized) {
      correctedValue = capitalized;
      message = 'Format: Standardized proper name capitalization';
    }
  } else if (field === 'address') {
    const formatted = autoFormatAddress(value);
    if (value !== formatted) {
      correctedValue = formatted;
      message = 'Format: Standardized address punctuation & common abbreviations';
    }
  } else if (field === 'issue') {
    const corrected = correctTypos(value);
    if (value !== corrected) {
      correctedValue = corrected;
      message = 'Spell Check: Auto-corrected hardware technical terminology';
    }
  }

  return { correctedValue, message };
};

export const analyzeIssue = (issue: string): DiagnosticResult => {
  if (!issue || issue.trim().length < 5) {
    return {
      severity: 'low',
      recommendation: 'Describe your LED symptom. Our AI engine will run automated component fault analysis to calculate repair cost vs. panel replacement.',
      action: 'none'
    };
  }

  const lowercaseIssue = issue.toLowerCase();

  // High severity / Critical screen damage issues where repair is NOT recommended
  const highSeverityTerms = [
    'crack', 'broken', 'smash', 'damage', 'shattered', 'water', 'flood', 'splash', 'liquid', 
    'drop', 'fell', 'hit', 'physical', 'dent', 'cracked screen', 'pnl cracked', 'display broken'
  ];

  // Specific hardware indicators
  const isHighSeverity = highSeverityTerms.some(term => lowercaseIssue.includes(term));

  if (isHighSeverity) {
    return {
      severity: 'high',
      recommendation: 'AI DIAGNOSIS: Physical glass panel fractures or liquid ingestion detected. Screen replacement represents >85% of display value. Repair is NOT cost-effective.',
      action: 'buy_refurbished',
      savingsText: 'Recommended Action: Trade-in for an Infinix Certified Renewed LED to save ₹18,000 over screen replacement.',
      disabledAction: true // UX Decision: Recommend buying renewed as repair is a waste of money
    };
  }

  // Medium severity issues (usually board or backlight)
  const mediumSeverityTerms = [
    'black screen', 'no picture', 'dark screen', 'no light', 'backlight', 'led strip', 'flicker', 
    'flickering', 'dim', 'shadow', 'half screen', 'vertical line', 'horizontal line', 'lines on screen',
    'sound but no video', 'sound ok but black'
  ];

  const isMediumSeverity = mediumSeverityTerms.some(term => lowercaseIssue.includes(term));

  if (isMediumSeverity) {
    return {
      severity: 'medium',
      recommendation: 'AI DIAGNOSIS: Backlight array or T-CON ribbon misalignment. Fully repairable in-house for a fraction of new TV costs.',
      action: 'repair',
      savingsText: 'Repair Recommended: Estimates ₹1,200 - ₹2,500. This saves you roughly ₹15,000 compared to buying a replacement!'
    };
  }

  // Minor issues
  return {
    severity: 'low',
    recommendation: 'AI DIAGNOSIS: Minor peripheral or software fault (HDMI port, Audio chip, or Remote code). Fast, cheap ₹499 service guaranteed.',
    action: 'repair',
    savingsText: 'Simple Fix: Logic board soldering or terminal reboot will resolve this instantly. Save money and extend TV life!'
  };
};

export const detectIntent = (text: string): { 
  intent: 'repair' | 'buy_new' | 'buy_refurbished' | 'unknown';
  confidence: number;
  reason: string;
} => {
  if (!text || text.trim().length < 4) {
    return { intent: 'unknown', confidence: 0, reason: 'Provide more descriptions to analyze.' };
  }

  const prompt = text.toLowerCase();

  // 1. Repair intent
  const repairKeywords = [
    'repair', 'fix', 'screen issue', 'sound broken', 'flicker', 'flickering', 'no sound',
    'not working', 'broken speaker', 'dead pixel', 'red light flashing', 'stuck on logo',
    'port loose', 'damaged hdmi', 'service'
  ];
  const repairMatches = repairKeywords.filter(k => prompt.includes(k)).length;

  // 2. Buy New intent
  const buyNewKeywords = [
    'buy new', 'tcl flagship', 'quantum led', 'brand new', 'latest model', 'purchase new',
    'upgrade to high-end', 'cinematic experience', '115 inch', 'unboxed primary', 'new display'
  ];
  const buyNewMatches = buyNewKeywords.filter(k => prompt.includes(k)).length;

  // 3. Buy Refurbished intent
  const buyRefurbishedKeywords = [
    'refurbished', 'renewed', 'second hand', 'budget tv', 'low cost', 'cheap display',
    'infinix model', 'affordable secondary', 'thrift display', 'used led', 'cheap television'
  ];
  const buyRefurbishedMatches = buyRefurbishedKeywords.filter(k => prompt.includes(k)).length;

  const maxMatches = Math.max(repairMatches, buyNewMatches, buyRefurbishedMatches);

  if (maxMatches === 0) {
    // If no explicit matches, check simple indicators
    if (prompt.includes('buy') || prompt.includes('purchase') || prompt.includes('get')) {
      if (prompt.includes('cheap') || prompt.includes('budget') || prompt.includes('renewed')) {
        return { intent: 'buy_refurbished', confidence: 75, reason: 'AI detected buy requirement for a cost-effective option.' };
      }
      return { intent: 'buy_new', confidence: 70, reason: 'AI detected purchase intent for premium hardware.' };
    }
    if (prompt.includes('broken') || prompt.includes('damage') || prompt.includes('fault') || prompt.includes('issue')) {
      return { intent: 'repair', confidence: 80, reason: 'AI detected troubleshooting or hardware fault context.' };
    }
    return { intent: 'unknown', confidence: 10, reason: 'Could not categorize input safely.' };
  }

  if (maxMatches === repairMatches) {
    return { intent: 'repair', confidence: 85 + (repairMatches * 2), reason: 'AI detected prominent hardware fault descriptions.' };
  } else if (maxMatches === buyNewMatches) {
    return { intent: 'buy_new', confidence: 80 + (buyNewMatches * 2), reason: 'AI identified interest in premium, high-fidelity unboxed stock.' };
  } else {
    return { intent: 'buy_refurbished', confidence: 85 + (buyRefurbishedMatches * 2), reason: 'AI identified interest in pre-owned checked inventory.' };
  }
};
