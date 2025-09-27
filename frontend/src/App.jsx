import { use, useEffect, useState } from 'react'
import FloatingShape from './components/FloatingShape'
import { Route, Routes,Navigate } from 'react-router-dom'
import SignUpPage from './pages/SignUpPage'
import LoginPage from './pages/LoginPage'
import EmailVerificationPage from './pages/EmailVerificationPage'
import { Toaster } from 'react-hot-toast'
import { useAuthStore } from './store/authStore'
import HomePage from './pages/HomePage'
import LoadingSpinner from './components/LoadingSpinner'
import ForgotPasswordPage from './pages/ForgotPasswordPage'
import ResetPasswordPage from './pages/ResetPasswordPage'


// protect route that required authentication
const ProtectRoute = ({children}) => {
  const {isAuthenticated,user} = useAuthStore();
  console.log('ProtectRoute - isAuthenticated:', isAuthenticated, 'user:', user);
  
  if(!isAuthenticated){
    console.log('Not authenticated, redirecting to login');
    return <Navigate to="/login" />
  }
  if(!user?.isVerified){
    console.log('User not verified, redirecting to verify-email');
    return <Navigate to="/verify-email" />
  }
  console.log('User authenticated and verified, rendering children');
  return children
}

// redirect to login page if not authenticated
const RedirectAuthenticatedUser = ({children}) => {
  const {isAuthenticated,user} = useAuthStore();

  if(isAuthenticated){
    return <Navigate to="/" />
  }
  return children
}

function App() {
  const {isCheckingAuth,checkAuth} = useAuthStore()

  useEffect(() => {
    console.log('App mounted, checking auth...');
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth) {
    console.log('Checking auth, showing loading spinner...');
    return <LoadingSpinner/>
  }

  return (
 
    <div className="min-h-screen bg-gradient-to-br 
    from-gray-900 via-[#042C46] to-[#975433] 
    relative overflow-hidden">

      <FloatingShape color = 'bg-[#EA6625]' size= 'w-64 h-64' top= '-5%' left= '10%' delay={0}/>
      <FloatingShape color = 'bg-[#042C46]' size= 'w-48 h-48' top= '70%' left= '80%' delay={5}/>
      <FloatingShape color = 'bg-[#EA6625]' size= 'w-32 h-32' top= '40%' left= '-10%' delay={2}/>

      <Routes>
        <Route path='/' element={
          <ProtectRoute>
            <HomePage/>
          </ProtectRoute>
        } />
        <Route path='/signup' element={
          <RedirectAuthenticatedUser>
            <SignUpPage/>
          </RedirectAuthenticatedUser>
        } />
        <Route path='/login' element={
           <RedirectAuthenticatedUser>
           <LoginPage/>
         </RedirectAuthenticatedUser>
          
          } />
        <Route path='/verify-email' element={<EmailVerificationPage/>} />
        <Route path='/forgot-password' element={
          <RedirectAuthenticatedUser>
            <ForgotPasswordPage/>
          </RedirectAuthenticatedUser>

        } />

        <Route path='/reset-password/:token' element={<RedirectAuthenticatedUser>
          <ResetPasswordPage/>
        </RedirectAuthenticatedUser>
      } />
        

      </Routes>
      <Toaster />

    </div>

 
  )
}

export default App
