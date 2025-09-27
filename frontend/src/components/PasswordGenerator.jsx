import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Key, ChevronDown, RefreshCw } from 'lucide-react';
import toast from 'react-hot-toast';
import { generateStrongPassword, generateVeryStrongPassword } from '../utils/passwordGenerator';

const PasswordGenerator = ({ onPasswordGenerated, disabled = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const passwordTypes = [
    {
      description: '16 chars, letters, numbers & symbols',
      generator: generateStrongPassword,
      strength: 'Strong'
    },
    {
      description: '20 chars, all character types',
      generator: generateVeryStrongPassword,
      strength: 'Very Strong'
    }
  ];

  const handleGeneratePassword = async (generator, type) => {
    setIsGenerating(true);
    
    // Add a small delay for better UX
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const newPassword = generator();
    onPasswordGenerated(newPassword);
    toast.success(`${type} password generated!`);
    setIsGenerating(false);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <motion.button
        type="button"
        whileHover={{ scale: disabled ? 1 : 1.02 }}
        whileTap={{ scale: disabled ? 1 : 0.98 }}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
        disabled={disabled}
        className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
      >
        <Key className="w-4 h-4" />
        <span>Generate</span>
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </motion.button>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="absolute top-full left-0 mt-2 w-64 bg-gray-800 bg-opacity-95 backdrop-blur-xl rounded-xl shadow-2xl border border-gray-700 p-4 z-50"
        >
          <div className="space-y-3">
            <div className="flex items-center space-x-2 mb-3">
              <Key className="w-5 h-5 text-green-400" />
              <h3 className="text-white font-semibold">Generate Password</h3>
            </div>

            {passwordTypes.map((type, index) => (
              <motion.button
                key={type.name}
                type="button"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleGeneratePassword(type.generator, type.name);
                }}
                disabled={isGenerating || disabled}
                className="w-full p-3 bg-gray-700 bg-opacity-50 hover:bg-gray-600 rounded-lg transition-all text-left disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="text-white font-medium">{type.name}</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        type.strength === 'Strong' ? 'bg-yellow-500 bg-opacity-20 text-white' :
                        'bg-green-500 bg-opacity-20 text-white'
                      }`}>
                        {type.strength}
                      </span>
                    </div>
                    <p className="text-gray-400 text-xs mt-1">{type.description}</p>
                  </div>
                  {isGenerating ? (
                    <RefreshCw className="w-4 h-4 animate-spin text-green-400" />
                  ) : (
                    <RefreshCw className="w-4 h-4 text-gray-400" />
                  )}
                </div>
              </motion.button>
            ))}

            <div className="pt-2 border-t border-gray-700">
              <p className="text-gray-400 text-xs text-center">
                Generated passwords meet all security requirements
              </p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Backdrop to close dropdown */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default PasswordGenerator;
