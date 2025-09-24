import { useState } from 'react'
import FloatingShape from './components/FloatingShape'
import { Route, Routes } from 'react-router-dom'
import SignUpPage from './pages/SignUpPage'
import LoginPage from './pages/LoginPage'
import EmailVerificationPage from './pages/EmailVerificationPage'

function App() {

  return (
 
    <div className="min-h-screen bg-gradient-to-br 
    from-gray-900 via-[#042C46] to-[#975433] 
    flex items-center justify-center relative overflow-hidden">

      <FloatingShape color = 'bg-[#EA6625]' size= 'w-64 h-64' top= '-5%' left= '10%' delay={0}/>
      <FloatingShape color = 'bg-[#042C46]' size= 'w-48 h-48' top= '70%' left= '80%' delay={5}/>
      <FloatingShape color = 'bg-[#EA6625]' size= 'w-32 h-32' top= '40%' left= '-10%' delay={2}/>

      <Routes>
        <Route path='/' element={
          <div className="text-white text-center">
            <h1 className="text-4xl font-bold mb-4">Welcome to Password Manager</h1>
            <p className="text-xl">Secure your passwords with us</p>
          </div>
        } />
        <Route path='/signup' element={<SignUpPage/>} />
        <Route path='/login' element={<LoginPage/>} />
        <Route path='/verify-email' element={<EmailVerificationPage/>} />


      </Routes>

    </div>

 
  )
}

export default App
