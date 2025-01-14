'use client'
import { useState, useEffect } from "react";
import { signIn, useSession } from 'next-auth/react';
import Link from 'next/link'; 
import { useRouter } from 'next/navigation'; 

const LoginPage = () => {
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


  async function handleLogin(e: { preventDefault: () => void; }) {
    e.preventDefault();

    const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
    });

    if (result?.error) {
        setMessage(result.error);
    } else {
        router.push('/dashboard');  // Redirect to dashboard after successful login
    }
}


  return (
    <div className="mb-[5rem] mt-[10rem]">
        <h1 className="text-[2.7rem] text-center font-semibold text-black mb-[3rem]">Log in</h1>
        <div className="px-[3rem] flex">
            <div className="w-1/2">
            <h1 className="text-[1.5rem] ml-[4rem]  font-semibold text-black ">Log in</h1>  
            <form className="flex flex-col w-80 ml-[4rem] mt-[2rem] rounded-lg bg-white" onSubmit={handleLogin}>
                <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" required className="mb-3 p-2 border h-[2.8rem] w-[33rem] border-gray-300 rounded-lg"/>
                <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" required className="mb-3  h-[2.8rem] w-[33rem] p-2 border border-gray-300 rounded-lg"/>
                <Link href="./reset-password" className="mb-3 text-[#670305] underline">Forgot your password?</Link>
                <button type="submit" className="mt-6 px-6 font-radio-canada py-3 text-[1rem] font-semibold bg-[#670305] w-[9rem] rounded text-white hover:bg-red-700 transition">SIGN IN</button>
            </form> 
            {message && (
                    <p className="mt-4 text-center text-sm text-red-500">{message}</p>
                )}
            </div>

            <div className="w-1/2">
                <h1 className="text-[1.5rem] font-semibold text-black mb-[2rem]">New Customer</h1>  
                <p className="text-[0.8rem] w-[30rem]">Sign up for early Sale access plus tailored new arrivals, trends and promotions. To opt out, click unsubscribe in our emails.</p>
                <Link href="./register"><button type="submit" className="mt-6 px-6 font-radio-canada py-3 text-[1rem] font-semibold bg-[#670305] w-[9rem] rounded text-white hover:bg-red-700 transition">REGISTER</button></Link>
            </div>
        </div>
    </div>
  );
};

export default LoginPage;
