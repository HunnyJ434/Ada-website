'use client'
import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link'; 
const Dashboard = () => {
  const { data: session } = useSession();

  if (!session) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <p className="text-center text-gray-700">You are not logged in. Please sign in.</p>
        </div>
    );
}
const handleSignOut = async () => {
    // Sign out with NextAuth
    await signOut({ redirect: false }); // Don't let NextAuth automatically redirect

  };

console.log(session);
  return (
    <div className='flex mt-[10rem] py-5'>
        <div className='flex flex-col w-1/3 space-y-3 text-[0.9rem] text-thin px-[4rem]'>
            <Link href="./dashboard">Dashboard</Link>
            <Link href="./dashboard">Addresses</Link>
            <button onClick={() => handleSignOut()} className="text-left">Log Out</button>
        </div>

        <div className="container mx-auto ">
            <h1 className="text-[0.9rem] mb-4">Hello <span className='font-bold'>{session?.user?.firstName} {session?.user?.lastName}</span> (not <span className='font-bold'>{session?.user?.firstName} {session?.user?.lastName}</span>? <button onClick={() => handleSignOut()} className="text-left underline">Log Out</button>)</h1>
            <div className='mb-[4rem]'>
            <h1 className='text-[1.7rem] '>Order History</h1>
            <p className='mt-[3rem]'>make your first order</p>
            </div>
            <div className='space-y-[2.2rem]'>
                <h1 className='text-[1.7rem] mb-[1rem]'>Account Details</h1>
                <div className='flex space-x-[16rem]'>
                <p>Name</p>
                <p>{session?.user?.firstName} {session?.user?.lastName}</p>
                </div>
                <div className='flex space-x-[16rem]'>
                <p>Email</p>
                <p>{session?.user?.email}</p>
                </div>
                <button type="submit" className="mt-6 px-6 font-radio-canada py-3 text-[0.9rem] font-thin bg-[#670305] w-[12rem] rounded text-white hover:bg-red-700 transition">VIEW ADDRESSES</button>
            </div>           
        </div>
    </div>
  );
};

export default Dashboard;
