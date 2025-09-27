// Password Generator Utility
export const generatePassword = (options = {}) => {
  const {
    length = 16,
    includeUppercase = true,
    includeLowercase = true,
    includeNumbers = true,
    includeSymbols = true,
    excludeSimilar = true
  } = options;

  let charset = '';
  let password = '';

  // Define character sets
  const lowercase = 'abcdefghijklmnopqrstuvwxyz';
  const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const numbers = '0123456789';
  const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';

  // Characters to exclude if excludeSimilar is true
  const similarChars = 'il1Lo0O';

  // Build charset based on options
  if (includeLowercase) {
    charset += excludeSimilar ? lowercase.replace(/[il]/g, '') : lowercase;
  }
  if (includeUppercase) {
    charset += excludeSimilar ? uppercase.replace(/[LO]/g, '') : uppercase;
  }
  if (includeNumbers) {
    charset += excludeSimilar ? numbers.replace(/[10]/g, '') : numbers;
  }
  if (includeSymbols) {
    charset += symbols;
  }

  // Ensure we have at least one character from each required set
  if (includeLowercase) {
    const lowerChars = excludeSimilar ? lowercase.replace(/[il]/g, '') : lowercase;
    password += lowerChars[Math.floor(Math.random() * lowerChars.length)];
  }
  if (includeUppercase) {
    const upperChars = excludeSimilar ? uppercase.replace(/[LO]/g, '') : uppercase;
    password += upperChars[Math.floor(Math.random() * upperChars.length)];
  }
  if (includeNumbers) {
    const numChars = excludeSimilar ? numbers.replace(/[10]/g, '') : numbers;
    password += numChars[Math.floor(Math.random() * numChars.length)];
  }
  if (includeSymbols) {
    password += symbols[Math.floor(Math.random() * symbols.length)];
  }

  // Fill the rest of the password with random characters
  for (let i = password.length; i < length; i++) {
    password += charset[Math.floor(Math.random() * charset.length)];
  }

  // Shuffle the password to avoid predictable patterns
  return password.split('').sort(() => Math.random() - 0.5).join('');
};

// Predefined password options
export const passwordOptions = {
  strong: {
    length: 16,
    includeUppercase: true,
    includeLowercase: true,
    includeNumbers: true,
    includeSymbols: true,
    excludeSimilar: true
  },
  veryStrong: {
    length: 20,
    includeUppercase: true,
    includeLowercase: true,
    includeNumbers: true,
    includeSymbols: true,
    excludeSimilar: true
  }
};

// Generate different types of passwords
export const generateStrongPassword = () => generatePassword(passwordOptions.strong);
export const generateVeryStrongPassword = () => generatePassword(passwordOptions.veryStrong);
