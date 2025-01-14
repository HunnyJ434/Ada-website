'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation'; // Updated for Next.js 13+

export default function ResetPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/request-reset', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Password reset email sent successfully!');
        setError('');
        setEmail('');
      } else {
        setError(data.error || 'Something went wrong.');
        setMessage('');
      }
    } catch (err) {
      console.error('Error sending reset email:', err);
      setError('An error occurred. Please try again later.');
      setMessage('');
    }
  };

  return (
    <div className="mt-[10rem] flex px-[5rem] mb-3">
      <div className="w-1/2 flex flex-col space-y-5">
        <h1 className="text-[1.5rem]">Reset your password</h1>
        <p className="text-[0.8rem]">We will send you an email to reset your password.</p>
        {message && <p className="text-green-500">{message}</p>}
        {error && <p className="text-red-500">{error}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
            className="mb-3 p-2 border h-[2.8rem] w-[32rem] border-gray-300 block rounded-lg"
          />
          <div className="flex space-x-[1.5rem]">
            <button
              type="submit"
              className="mt-6 px-6 font-radio-canada py-3 text-[1rem] bg-[#670305] w-[7rem] font-thin rounded text-white hover:bg-red-700 transition"
            >
              SUBMIT
            </button>
            <button
              type="button"
              className="mt-6 px-6 font-radio-canada py-3 text-[1rem] text-[#670305] font-thin w-[7rem] rounded hover:text-white hover:bg-[#670305] transition"
              onClick={() => router.push('/login')}
            >
              CANCEL
            </button>
          </div>
        </form>
      </div>
      <div className="w-1/2">
        <h1 className="text-[1.5rem] font-semibold text-black mb-[2rem]">New Customer</h1>
        <p className="text-[0.8rem] w-[30rem]">
          Sign up for early Sale access plus tailored new arrivals, trends and promotions. To opt
          out, click unsubscribe in our emails.
        </p>
        <button
          type="button"
          className="mt-6 font-radio-canada py-3 text-center text-[1rem] font-thin bg-[#670305] w-[7rem] rounded text-white hover:bg-red-700 transition"
          onClick={() => router.push('/register')}
        >
          REGISTER
        </button>
      </div>
    </div>
  );
}
