import crypto from 'crypto';

// Test encryption/decryption
const ENCRYPTION_KEY = 'your-32-character-secret-key-here!';
const ALGORITHM = 'aes-256-cbc';

const getKey = () => {
    const key = Buffer.from(ENCRYPTION_KEY, 'utf8');
    if (key.length < 32) {
        return Buffer.concat([key, Buffer.alloc(32 - key.length)]);
    } else if (key.length > 32) {
        return key.slice(0, 32);
    }
    return key;
};

const testPassword = "MyTestPassword123!";

try {
    console.log('Testing encryption...');
    console.log('Original password:', testPassword);
    
    // Encrypt
    const key = getKey();
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(ALGORITHM, key, iv);
    
    let encrypted = cipher.update(testPassword, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    
    const encryptedWithIv = iv.toString('hex') + ':' + encrypted;
    console.log('Encrypted:', encryptedWithIv);
    
    // Decrypt
    const textParts = encryptedWithIv.split(':');
    const ivDecrypt = Buffer.from(textParts[0], 'hex');
    const encryptedText = textParts[1];
    
    const decipher = crypto.createDecipheriv(ALGORITHM, key, ivDecrypt);
    let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    
    console.log('Decrypted:', decrypted);
    console.log('Match:', testPassword === decrypted);
    
} catch (error) {
    console.error('Encryption test failed:', error);
}
