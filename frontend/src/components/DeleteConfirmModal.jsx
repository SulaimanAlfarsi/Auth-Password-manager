import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, X, Trash2 } from 'lucide-react';

const DeleteConfirmModal = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  itemName, 
  itemType = "password", 
  isLoading = false,
  title,
  description,
  confirmText = "Delete",
  cancelText = "Cancel"
}) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-[#042C46] to-[#975433] bg-opacity-95 backdrop-blur-sm flex items-center justify-center p-4 z-50">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="bg-gray-900 bg-opacity-60 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-700 p-8 w-full max-w-md relative"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-gray-700 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>

          {/* Warning Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-red-500 bg-opacity-20 rounded-full flex items-center justify-center">
              <AlertTriangle className="w-8 h-8 text-red-400" />
            </div>
          </div>

          {/* Content */}
          <div className="text-center">
            <h2 className="text-2xl font-bold text-white mb-4">
              {title || `Delete ${itemType.charAt(0).toUpperCase() + itemType.slice(1)}`}
            </h2>
            
            <p className="text-gray-300 mb-6 leading-relaxed">
              {description || (
                <>
                  Are you sure you want to delete <span className="font-semibold text-white">"{itemName}"</span>? 
                  This action cannot be undone and the {itemType} will be permanently removed.
                </>
              )}
            </p>

            {/* Action Buttons */}
            <div className="flex space-x-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onClose}
                disabled={isLoading}
                className="flex-1 py-3 px-6 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {cancelText}
              </motion.button>
              
              <motion.button
                whileHover={{ scale: isLoading ? 1 : 1.02 }}
                whileTap={{ scale: isLoading ? 1 : 0.98 }}
                onClick={onConfirm}
                disabled={isLoading}
                className="flex-1 py-3 px-6 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:from-red-600 hover:to-red-700 transition-all font-medium flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Deleting...</span>
                  </>
                ) : (
                  <>
                    <Trash2 className="w-4 h-4" />
                    <span>{confirmText}</span>
                  </>
                )}
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default DeleteConfirmModal;
