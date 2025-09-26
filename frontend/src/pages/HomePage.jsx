import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useAuthStore } from '../store/authStore'
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


const HomePage = () => {
  const {user, logout, isLoading, error} = useAuthStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [showPassword, setShowPassword] = useState({});
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showAddModal, setShowAddModal] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [newPassword, setNewPassword] = useState({
    name: '',
    username: '',
    password: '',
    website: '',
    notes: ''
  });

  // Mock password data - in real app, this would come from your backend
  const [passwords, setPasswords] = useState([
    {
      id: 1,
      name: 'Google Account',
      username: 'user@gmail.com',
      password: 'MySecurePassword123!',
      website: 'https://google.com',
      notes: 'Main Google account',
      createdAt: new Date().toISOString(),
      isFavorite: true
    },
    {
      id: 2,
      name: 'GitHub',
      username: 'developer',
      password: 'GitHubPass456!',
      website: 'https://github.com',
      notes: 'Development account',
      createdAt: new Date().toISOString(),
      isFavorite: false
    },
    {
      id: 3,
      name: 'Netflix',
      username: 'user@email.com',
      password: 'NetflixPass789!',
      website: 'https://netflix.com',
      notes: 'Entertainment subscription',
      createdAt: new Date().toISOString(),
      isFavorite: true
    }
  ]);

  const handleLogout = async () => {
    logout();
  };

  const togglePasswordVisibility = (id) => {
    setShowPassword(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
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
    
    // Simulate API call - in real app, this would save to your backend
    setTimeout(() => {
      const newPasswordEntry = {
        id: passwords.length + 1,
        name: newPassword.name,
        username: newPassword.username,
        password: newPassword.password,
        website: newPassword.website,
        notes: newPassword.notes,
        createdAt: new Date().toISOString(),
        isFavorite: false
      };
      
      setPasswords(prev => [...prev, newPasswordEntry]);
      setNewPassword({
        name: '',
        username: '',
        password: '',
        website: '',
        notes: ''
      });
      setShowAddModal(false);
      setIsAdding(false);
      toast.success('Password saved successfully!');
    }, 1000);
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
         <div className="flex items-center justify-between mb-8">
           <div>
             <h1 className="text-3xl font-bold bg-gradient-to-r from-[#ec9569] to-[#EA6601] text-transparent bg-clip-text">
               Password Vault
             </h1>
             <p className="text-gray-300 mt-2 text-lg">Welcome back, {user?.name}</p>
           </div>
           <motion.button
             whileHover={{ scale: 1.05 }}
             whileTap={{ scale: 0.95 }}
             onClick={handleLogout}
             className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-[#ec9569] to-[#EA6601] text-white rounded-lg hover:from-[#EA6601] hover:to-[#d97a42] transition-all"
           >
             <LogOut className="w-5 h-5" />
             <span>Logout</span>
           </motion.button>
         </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-1 mb-6 bg-gray-800 bg-opacity-50 p-1 rounded-lg">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`flex-1 py-2 px-4 rounded-md transition-all ${
              activeTab === 'dashboard'
                ? 'bg-gradient-to-r from-[#ec9569] to-[#EA6601] text-white'
                : 'text-gray-300 hover:text-white'
            }`}
          >
            Dashboard
          </button>
          <button
            onClick={() => setActiveTab('vault')}
            className={`flex-1 py-2 px-4 rounded-md transition-all ${
              activeTab === 'vault'
                ? 'bg-gradient-to-r from-[#ec9569] to-[#EA6601] text-white'
                : 'text-gray-300 hover:text-white'
            }`}
          >
            Password Vault
          </button>
         
        </div>

         {/* Dashboard Tab */}
         {activeTab === 'dashboard' && (
    <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.9 }}
    transition={{ duration: 0.5 }}
             className='max-w-2xl w-full mx-auto p-8 bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-lg rounded-xl shadow-2xl border border-gray-700'
  >
            <h2 className='text-3xl font-bold mb-6 text-center bg-gradient-to-r from-[#ec9569] to-[#EA6601] text-transparent bg-clip-text'>
              Dashboard
        </h2>

        <div className='space-y-6'>
        <motion.div
					className='p-4 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700'
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.2 }}
				>
                <h3 className='text-xl font-semibold text-[#EA6601] mb-3'>Profile Information</h3>
                <p className='text-gray-300'>Name: {user?.name}</p>
                <p className='text-gray-300'>Email: {user?.email}</p>
				</motion.div>
        <motion.div
					className='p-4 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700'
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.4 }}
				>
                <h3 className='text-xl font-semibold text-[#EA6601] mb-3'>Account Activity</h3>
					<p className='text-gray-300'>
						<span className='font-bold'>Joined: </span>
                  {user?.createdAt ? new Date(user.createdAt).toLocaleDateString("en-US", {
							year: "numeric",
							month: "long",
							day: "numeric",
                  }) : 'N/A'}
					</p>
					<p className='text-gray-300'>
						<span className='font-bold'>Last Login: </span>
                  {user?.lastLogin ? formatDate(user.lastLogin) : 'N/A'}
					</p>
				</motion.div>
        </div>

        <motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.6 }}
              className='mt-6'
			>
				<motion.button
					whileHover={{ scale: 1.05 }}
					whileTap={{ scale: 0.95 }}
					onClick={handleLogout}
                className='w-full py-3 px-4 bg-gradient-to-r from-[#ec9569] to-[#EA6601] text-white 
              font-bold rounded-lg shadow-lg hover:from-[#EA6601] hover:to-[#d97a42]
               focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-gray-900'
				>
					Logout
				</motion.button>
			</motion.div>
          </motion.div>
        )}

        {/* Password Vault Tab */}
        {activeTab === 'vault' && (
          <div className="space-y-6">
            {/* Search and Add Button */}
            <div className="flex items-center space-x-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search passwords..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-800 bg-opacity-50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-[#EA6601] focus:ring-2 focus:ring-[#EA6601] focus:ring-opacity-20 transition-all"
                />
              </div>
               <motion.button
                 whileHover={{ scale: 1.05 }}
                 whileTap={{ scale: 0.95 }}
                 onClick={() => setShowAddModal(true)}
                 className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-[#ec9569] to-[#EA6601] text-white rounded-lg hover:from-[#EA6601] hover:to-[#d97a42] transition-all"
               >
                 <Plus className="w-5 h-5" />
                 <span>Add Password</span>
               </motion.button>
            </div>

            {/* Password List */}
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredPasswords.map((password, index) => (
                <motion.div
                  key={password.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gray-800 bg-opacity-50 backdrop-blur-xl rounded-xl p-6 border border-gray-700 hover:border-[#EA6601] transition-all"
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
                      {password.isFavorite && (
                        <Star className="w-5 h-5 text-yellow-400 fill-current" />
                      )}
                      <button className="p-2 hover:bg-gray-700 rounded-lg transition-colors">
                        <Edit className="w-4 h-4 text-gray-400" />
                      </button>
                      <button className="p-2 hover:bg-gray-700 rounded-lg transition-colors">
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
                          {showPassword[password.id] ? password.password : '••••••••••••'}
                        </span>
                        <div className="flex items-center space-x-1">
                          <button
                            onClick={() => togglePasswordVisibility(password.id)}
                            className="p-1 hover:bg-gray-600 rounded transition-colors"
                          >
                            {showPassword[password.id] ? (
                              <EyeOff className="w-4 h-4 text-gray-400" />
                            ) : (
                              <Eye className="w-4 h-4 text-gray-400" />
                            )}
                          </button>
                          <button
                            onClick={() => copyToClipboard(password.password)}
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
          </div>
        )}

       
         {/* Add Password Modal */}
         {showAddModal && (
           <div className="fixed inset-0 bg-gray-900 bg-opacity-30 backdrop-blur-sm flex items-center justify-center p-4 z-50">
             <motion.div
               initial={{ opacity: 0, scale: 0.9 }}
               animate={{ opacity: 1, scale: 1 }}
               exit={{ opacity: 0, scale: 0.9 }}
               className="bg-gray-800 bg-opacity-90 backdrop-blur-xl rounded-xl p-8 w-full max-w-2xl border border-gray-700"
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
    </motion.div>
     </div>
  )
}

export default HomePage