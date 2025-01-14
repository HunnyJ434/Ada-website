'use client'
import { useState, useEffect } from "react";
import { signIn, useSession } from 'next-auth/react';
import Link from 'next/link'; 
import { useRouter } from 'next/navigation'; 

const RegisterPage = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setlastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'authenticated') {
        router.push('/dashboard'); // Redirect to dashboard
    }
  }, [status, router]);


  async function handleSubmit(e: { preventDefault: () => void; }) {
    e.preventDefault();
    const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ email, password, firstName,lastName })
    });
    const data = await response.json();
    if (response.ok) {
        setMessage('Signup successful! You can now login.');
    } else {
        setMessage(data.message || 'An error occurred during signup.');
    }
}


  return (
    <div className="mb-[5rem] mt-[10rem]">
        <h1 className="text-[2.7rem] text-center font-semibold text-black mb-[3rem]">Register</h1>
        <div className="px-[3rem] flex justify-center">
            <div className="w-1/2">
            <h1 className="text-[1.5rem] ml-[4rem]  font-semibold text-black ">Register</h1>  
            <form className="flex flex-col w-80 ml-[4rem] mt-[2rem] rounded-lg bg-white" onSubmit={handleSubmit}>
            <input type="field" id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="First Name" required className="mb-3 p-2 border h-[2.8rem] w-[33rem] border-gray-300 rounded-lg"/>
            <input type="field" id="lastName" value={lastName} onChange={(e) => setlastName(e.target.value)} placeholder="Last Name" required className="mb-3 p-2 border h-[2.8rem] w-[33rem] border-gray-300 rounded-lg"/>
            <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required className="mb-3 p-2 border h-[2.8rem] w-[33rem] border-gray-300 rounded-lg"/>
            <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required className="mb-3  h-[2.8rem] w-[33rem] p-2 border border-gray-300 rounded-lg"/>
            <p className="text-[0.8rem] w-[29rem]">Sign up for early Sale access plus tailored new arrivals, trends and promotions. To opt out, click unsubscribe in our emails.</p>
            <button type="submit" className="mt-6 px-6 font-radio-canada py-3 text-[1rem] font-semibold bg-[#670305] font-thin w-[33.2rem] rounded text-white hover:bg-red-700 transition">REGISTER</button>
            <Link href="/login" className="mt-6 px-6 font-radio-canada py-3 text-center text-[1rem] font-semibold text-[#670305] border-[#670305] border-[1px] font-thin w-[33.2rem] rounded hover:bg-[#670305] hover:text-white transition">LOG IN</Link>
            </form> 
            {message && (
                    <p className="mt-4 text-center text-sm text-red-500">{message}</p>
                )}
            </div>
        </div>
    </div>
  );
};

export default RegisterPage;
