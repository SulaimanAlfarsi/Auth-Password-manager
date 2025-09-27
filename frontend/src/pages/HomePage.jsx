import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useAuthStore } from '../store/authStore'
import { usePasswordStore } from '../store/passwordStore'
import { formatDate } from '../utils/date'
import { 
  Plus, 
  Search, 
  Eye, 
  EyeOff, 
  Copy, 
  Edit, 
  Trash2, 
  LogOut,
  Star,
  Globe,
  X,
  Save,
  Loader
} from 'lucide-react'
import toast from 'react-hot-toast'
import DeleteConfirmModal from '../components/DeleteConfirmModal'


const HomePage = () => {
  const {user, logout} = useAuthStore();
  const {passwords, isLoading, error, fetchPasswords, createPassword, deletePassword, clearError} = usePasswordStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [showPassword, setShowPassword] = useState({});
  const [showAddModal, setShowAddModal] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [newPassword, setNewPassword] = useState({
    name: '',
    username: '',
    password: '',
    website: '',
    notes: ''
  });
  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    passwordId: null,
    passwordName: '',
    isDeleting: false
  });

  // Fetch passwords when component mounts
  useEffect(() => {
    fetchPasswords();
  }, [fetchPasswords]);

  // Clear errors when component unmounts
  useEffect(() => {
    return () => {
      clearError();
    };
  }, [clearError]);

  // Show error toast if there's an error
  useEffect(() => {
    if (error) {
      toast.error(error);
      clearError();
    }
  }, [error, clearError]);

  const handleLogout = async () => {
    logout();
  };

  const togglePasswordVisibility = async (id) => {
    if (showPassword[id]) {
      // Hide password
      setShowPassword(prev => ({
        ...prev,
        [id]: false
      }));
    } else {
      // Show password - need to fetch decrypted password from backend
      try {
        const { getPassword } = usePasswordStore.getState();
        const passwordData = await getPassword(id);
        setShowPassword(prev => ({
          ...prev,
          [id]: passwordData.password
        }));
      } catch (error) {
        toast.error('Failed to decrypt password');
      }
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard!');
  };


  const handleAddPassword = async (e) => {
    e.preventDefault();
    
    if (!newPassword.name || !newPassword.username || !newPassword.password) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsAdding(true);
    
    try {
      await createPassword({
        name: newPassword.name,
        username: newPassword.username,
        password: newPassword.password,
        website: newPassword.website,
        notes: newPassword.notes
      });
      
      // Reset form and close modal
      setNewPassword({
        name: '',
        username: '',
        password: '',
        website: '',
        notes: ''
      });
      setShowAddModal(false);
      toast.success('Password saved successfully!');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to save password');
    } finally {
      setIsAdding(false);
    }
  };

  const resetAddForm = () => {
    setNewPassword({
      name: '',
      username: '',
      password: '',
      website: '',
      notes: ''
    });
    setShowAddModal(false);
  };

  const handleDeletePassword = async (id, name) => {
    setDeleteModal({
      isOpen: true,
      passwordId: id,
      passwordName: name,
      isDeleting: false
    });
  };

  const confirmDelete = async () => {
    setDeleteModal(prev => ({ ...prev, isDeleting: true }));
    
    try {
      await deletePassword(deleteModal.passwordId);
      toast.success('Password deleted successfully!');
      // Clear any shown passwords for this item
      setShowPassword(prev => {
        const newState = { ...prev };
        delete newState[deleteModal.passwordId];
        return newState;
      });
    } catch (error) {
      toast.error('Failed to delete password');
    } finally {
      setDeleteModal({
        isOpen: false,
        passwordId: null,
        passwordName: '',
        isDeleting: false
      });
    }
  };

  const cancelDelete = () => {
    setDeleteModal({
      isOpen: false,
      passwordId: null,
      passwordName: '',
      isDeleting: false
    });
  };

  const filteredPasswords = passwords.filter(password =>
    password.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    password.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    password.website.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-[#042C46] to-[#975433] p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full"
      >
         {/* Header */}
         <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 sm:mb-8 gap-4">
           <div>
             <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-[#ec9569] to-[#EA6601] text-transparent bg-clip-text">
               Password Manager
             </h1>
             <p className="text-gray-300 mt-1 sm:mt-2 text-base sm:text-lg">Welcome back, {user?.name}</p>
           </div>
           <motion.button
             whileHover={{ scale: 1.05 }}
             whileTap={{ scale: 0.95 }}
             onClick={handleLogout}
             className="flex items-center justify-center space-x-2 px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-[#ec9569] to-[#EA6601] text-white rounded-lg hover:from-[#EA6601] hover:to-[#d97a42] transition-all text-sm sm:text-base"
           >
             <LogOut className="w-4 h-4 sm:w-5 sm:h-5" />
             <span>Logout</span>
           </motion.button>
         </div>

        {/* Main Content - Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {/* Left Side - Password Vault */}
          <div className="lg:col-span-2 order-1 lg:order-1">
    <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.5 }}
              className="space-y-4 sm:space-y-6"
            >
              {/* Password Vault Header */}
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-[#ec9569] to-[#EA6601] text-transparent bg-clip-text">
                    Password Vault
                  </h2>
                  <p className="text-gray-400 mt-1">Manage your saved passwords</p>
                </div>
              </div>

              {/* Search and Add Button */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
                  <input
                    type="text"
                    placeholder="Search passwords..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-9 sm:pl-10 pr-4 py-2 sm:py-3 bg-gray-800 bg-opacity-50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-[#EA6601] focus:ring-2 focus:ring-[#EA6601] focus:ring-opacity-20 transition-all text-sm sm:text-base"
                  />
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowAddModal(true)}
                  className="flex items-center justify-center space-x-2 px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-[#ec9569] to-[#EA6601] text-white rounded-lg hover:from-[#EA6601] hover:to-[#d97a42] transition-all text-sm sm:text-base"
                >
                  <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="hidden sm:inline">Add Password</span>
                  <span className="sm:hidden">Add</span>
                </motion.button>
              </div>

              {/* Password List */}
              {isLoading && passwords.length === 0 ? (
                <div className="flex items-center justify-center py-12">
                  <Loader className="w-8 h-8 animate-spin text-[#EA6601]" />
                  <span className="ml-2 text-gray-300">Loading passwords...</span>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-4 sm:gap-6">
                  {filteredPasswords.map((password, index) => (
                    <motion.div
                      key={password._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    className="bg-gray-800 bg-opacity-50 backdrop-blur-xl rounded-xl p-4 sm:p-6 border border-gray-700 hover:border-[#EA6601] transition-all"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gradient-to-r from-[#ec9569] to-[#EA6601] rounded-lg flex items-center justify-center">
                          <Globe className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-white">{password.name}</h3>
                          <p className="text-sm text-gray-400">{password.website}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button className="p-2 hover:bg-gray-700 rounded-lg transition-colors">
                          <Edit className="w-4 h-4 text-gray-400" />
                        </button>
                        <button 
                          onClick={() => handleDeletePassword(password._id, password.name)}
                          className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4 text-red-400" />
                        </button>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <label className="text-xs text-gray-400 uppercase tracking-wide">Username</label>
                        <div className="flex items-center justify-between bg-gray-700 bg-opacity-50 rounded-lg p-2 mt-1">
                          <span className="text-white text-sm">{password.username}</span>
                          <button
                            onClick={() => copyToClipboard(password.username)}
                            className="p-1 hover:bg-gray-600 rounded transition-colors"
                          >
                            <Copy className="w-4 h-4 text-gray-400" />
                          </button>
                        </div>
                      </div>

                      <div>
                        <label className="text-xs text-gray-400 uppercase tracking-wide">Password</label>
                        <div className="flex items-center justify-between bg-gray-700 bg-opacity-50 rounded-lg p-2 mt-1">
                          <span className="text-white text-sm font-mono">
                            {showPassword[password._id] ? showPassword[password._id] : '••••••••••••'}
                          </span>
                          <div className="flex items-center space-x-1">
                            <button
                              onClick={() => togglePasswordVisibility(password._id)}
                              className="p-1 hover:bg-gray-600 rounded transition-colors"
                            >
                              {showPassword[password._id] ? (
                                <EyeOff className="w-4 h-4 text-gray-400" />
                              ) : (
                                <Eye className="w-4 h-4 text-gray-400" />
                              )}
                            </button>
                            <button
                              onClick={() => copyToClipboard(showPassword[password._id] || '••••••••••••')}
                              className="p-1 hover:bg-gray-600 rounded transition-colors"
                            >
                              <Copy className="w-4 h-4 text-gray-400" />
                            </button>
                          </div>
                        </div>
                      </div>

                      {password.notes && (
                        <div>
                          <label className="text-xs text-gray-400 uppercase tracking-wide">Notes</label>
                          <p className="text-gray-300 text-sm mt-1">{password.notes}</p>
                        </div>
                      )}
                    </div>
                    </motion.div>
                  ))}
                </div>
              )}

              {/* Empty State */}
              {!isLoading && filteredPasswords.length === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-24 h-24 bg-gray-800 bg-opacity-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Globe className="w-12 h-12 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-300 mb-2">No passwords found</h3>
                  <p className="text-gray-400 mb-6">
                    {searchTerm ? 'Try adjusting your search terms' : 'Start by adding your first password'}
                  </p>
                  {!searchTerm && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setShowAddModal(true)}
                      className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-[#ec9569] to-[#EA6601] text-white rounded-lg hover:from-[#EA6601] hover:to-[#d97a42] transition-all"
                    >
                      <Plus className="w-5 h-5" />
                      <span>Add Your First Password</span>
                    </motion.button>
                  )}
                </motion.div>
              )}
            </motion.div>
          </div>

          {/* Right Side - Profile */}
          <div className="lg:col-span-1 order-2 lg:order-2">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-lg rounded-xl shadow-2xl border border-gray-700 p-4 sm:p-6 lg:sticky lg:top-6"
            >
              <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-[#ec9569] to-[#EA6601] text-transparent bg-clip-text">
                Profile
        </h2>

              {/* Profile Information */}
        <motion.div
                className="mb-4 sm:mb-6 p-3 sm:p-4 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700"
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.2 }}
				>
                <h3 className="text-base sm:text-lg font-semibold text-[#EA6601] mb-3 sm:mb-4 flex items-center">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-[#ec9569] to-[#EA6601] rounded-full flex items-center justify-center mr-2 sm:mr-3">
                    <span className="text-white text-xs sm:text-sm font-bold">
                      {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                    </span>
                  </div>
                  Profile Information
                </h3>
                <div className="space-y-3">
                  <div>
                    <label className="text-xs text-gray-400 uppercase tracking-wide">Full Name</label>
                    <p className="text-white font-medium">{user?.name || 'N/A'}</p>
                  </div>
                  <div>
                    <label className="text-xs text-gray-400 uppercase tracking-wide">Email Address</label>
                    <p className="text-white font-medium break-all">{user?.email || 'N/A'}</p>
                  </div>
                </div>
				</motion.div>

              {/* Account Activity */}
        <motion.div
                className="mb-4 sm:mb-6 p-3 sm:p-4 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700"
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.4 }}
				>
                <h3 className="text-base sm:text-lg font-semibold text-[#EA6601] mb-3 sm:mb-4">Account Activity</h3>
                <div className="space-y-3">
                  <div>
                    <label className="text-xs text-gray-400 uppercase tracking-wide">Member Since</label>
                    <p className="text-white font-medium">
                      {user?.createdAt ? new Date(user.createdAt).toLocaleDateString("en-US", {
							year: "numeric",
							month: "long",
							day: "numeric",
                      }) : 'N/A'}
                    </p>
                  </div>
                  <div>
                    <label className="text-xs text-gray-400 uppercase tracking-wide">Last Login</label>
                    <p className="text-white font-medium">
                      {user?.lastLogin ? formatDate(user.lastLogin) : 'N/A'}
                    </p>
                  </div>
                </div>
				</motion.div>

              {/* Quick Stats */}
        <motion.div
                className="mb-4 sm:mb-6 p-3 sm:p-4 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700"
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.6 }}
              >
                <h3 className="text-base sm:text-lg font-semibold text-[#EA6601] mb-3 sm:mb-4">Quick Stats</h3>
                <div className="grid grid-cols-1 gap-3 sm:gap-4">
                  <div className="text-center">
                    <div className="text-xl sm:text-2xl font-bold text-white">{passwords.length}</div>
                    <div className="text-xs text-gray-400">Total Passwords</div>
                  </div>
                </div>
			</motion.div>
    
    </motion.div>
          </div>
        </div>

       
         {/* Add Password Modal */}
         {showAddModal && (
           <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-[#042C46] to-[#975433] bg-opacity-95 backdrop-blur-sm flex items-center justify-center p-4 z-50">
             <motion.div
               initial={{ opacity: 0, scale: 0.9 }}
               animate={{ opacity: 1, scale: 1 }}
               exit={{ opacity: 0, scale: 0.9 }}
               className="bg-gray-900 bg-opacity-60 backdrop-blur-xl rounded-xl p-8 w-full max-w-2xl border border-gray-700"
             >
               <div className="flex items-center justify-between mb-6">
                 <h2 className="text-2xl font-bold text-white">Add New Password</h2>
                 <button
                   onClick={resetAddForm}
                   className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
                 >
                   <X className="w-6 h-6 text-gray-400" />
                 </button>
               </div>

               <form onSubmit={handleAddPassword} className="space-y-6">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                   <div>
                     <label className="block text-sm font-medium text-gray-300 mb-2">
                       Website/Service Name *
                     </label>
                     <input
                       type="text"
                       value={newPassword.name}
                       onChange={(e) => setNewPassword(prev => ({ ...prev, name: e.target.value }))}
                       placeholder="e.g., Google, Netflix, GitHub"
                       className="w-full px-4 py-3 bg-gray-700 bg-opacity-50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-[#EA6601] focus:ring-2 focus:ring-[#EA6601] focus:ring-opacity-20 transition-all"
                       required
                     />
                   </div>

                   <div>
                     <label className="block text-sm font-medium text-gray-300 mb-2">
                       Website URL
                     </label>
                     <input
                       type="url"
                       value={newPassword.website}
                       onChange={(e) => setNewPassword(prev => ({ ...prev, website: e.target.value }))}
                       placeholder="https://example.com"
                       className="w-full px-4 py-3 bg-gray-700 bg-opacity-50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-[#EA6601] focus:ring-2 focus:ring-[#EA6601] focus:ring-opacity-20 transition-all"
                     />
                   </div>
                 </div>

                 <div>
                   <label className="block text-sm font-medium text-gray-300 mb-2">
                     Username/Email *
                   </label>
                   <input
                     type="text"
                     value={newPassword.username}
                     onChange={(e) => setNewPassword(prev => ({ ...prev, username: e.target.value }))}
                     placeholder="your.email@example.com"
                     className="w-full px-4 py-3 bg-gray-700 bg-opacity-50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-[#EA6601] focus:ring-2 focus:ring-[#EA6601] focus:ring-opacity-20 transition-all"
                     required
                   />
                 </div>

                 <div>
                   <label className="block text-sm font-medium text-gray-300 mb-2">
                     Password *
                   </label>
                   <input
                     type="text"
                     value={newPassword.password}
                     onChange={(e) => setNewPassword(prev => ({ ...prev, password: e.target.value }))}
                     placeholder="Enter your password"
                     className="w-full px-4 py-3 bg-gray-700 bg-opacity-50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-[#EA6601] focus:ring-2 focus:ring-[#EA6601] focus:ring-opacity-20 transition-all font-mono"
                     required
                   />
                 </div>

                 <div>
                   <label className="block text-sm font-medium text-gray-300 mb-2">
                     Notes (Optional)
                   </label>
                   <textarea
                     value={newPassword.notes}
                     onChange={(e) => setNewPassword(prev => ({ ...prev, notes: e.target.value }))}
                     placeholder="Add any additional notes..."
                     rows={3}
                     className="w-full px-4 py-3 bg-gray-700 bg-opacity-50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-[#EA6601] focus:ring-2 focus:ring-[#EA6601] focus:ring-opacity-20 transition-all resize-none"
                   />
                 </div>

                 <div className="flex items-center justify-end space-x-4 pt-4">
                   <motion.button
                     type="button"
                     whileHover={{ scale: 1.02 }}
                     whileTap={{ scale: 0.98 }}
                     onClick={resetAddForm}
                     className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-all"
                   >
                     Cancel
                   </motion.button>
                   <motion.button
                     type="submit"
                     whileHover={{ scale: 1.02 }}
                     whileTap={{ scale: 0.98 }}
                     disabled={isAdding}
                     className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-[#ec9569] to-[#EA6601] text-white rounded-lg hover:from-[#EA6601] hover:to-[#d97a42] transition-all disabled:opacity-50"
                   >
                     {isAdding ? (
                       <>
                         <Loader className="w-4 h-4 animate-spin" />
                         <span>Saving...</span>
                       </>
                     ) : (
                       <>
                         <Save className="w-4 h-4" />
                         <span>Save Password</span>
                       </>
                     )}
              </motion.button>
            </div>
          </form>
        </motion.div>
      </div>
    )}

    {/* Delete Confirmation Modal */}
    <DeleteConfirmModal
      isOpen={deleteModal.isOpen}
      onClose={cancelDelete}
      onConfirm={confirmDelete}
      itemName={deleteModal.passwordName}
      itemType="password"
      isLoading={deleteModal.isDeleting}
    />
  </motion.div>
</div>
  )
}

export default HomePage