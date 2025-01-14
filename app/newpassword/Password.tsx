'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

function Password() {
  const searchParams = useSearchParams();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted) {
      const tokenFromUrl = searchParams?.get('token');
      const emailFromUrl = searchParams?.get('email');
    
      if (tokenFromUrl && emailFromUrl) {
        setToken(tokenFromUrl);
        setEmail(emailFromUrl);
      } else {
        setErrorMessage('Invalid or expired reset link.');
      }
    }
  }, [searchParams, isMounted]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('/api/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token: token,
          email: email,
          newPassword: newPassword,
        }),
      });

      const data = await response.json();

      if (data.success) {
        window.location.href = '/login';
      } else {
        setErrorMessage(data.message || 'Failed to reset password.');
      }
    } catch (error) {
      console.error('Error resetting password:', error);
      setErrorMessage('Error resetting password.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isMounted) {
    return null;
  }

  if (!token || !email) {
    return <p className='mt-[18rem]'>Loading...</p>;
  }

  return (
    <div className="flex items-center flex-col mt-[10rem] space-y-[1rem]">
      <h1 className='text-[1.5rem] text-thin'>Reset Your Password</h1>
      {errorMessage && <p className="error">{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <div>
              <input type="password" id="newPassword" value={newPassword}  onChange={(e) => setNewPassword(e.target.value)} placeholder="New Password" required className="mb-3 p-2 border h-[2.8rem] w-[33rem] border-gray-300 rounded-lg"/>
        </div>
        <div>
              <input type="password" id="confirmPassword" value={confirmPassword}  onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm New Password" required className="mb-3 p-2 border h-[2.8rem] w-[33rem] border-gray-300 rounded-lg"/>
        </div>
        <button type="submit" disabled={isLoading} className="mt-3 px-6 font-radio-canada py-3 text-[1rem] font-semibold bg-[#670305] font-thin w-[33.2rem] rounded-lg mb-[4rem] text-white hover:bg-red-700 transition">
          {isLoading ? 'Resetting...' : 'Reset Password'}
        </button>
      </form>
    </div>
  );
}

export default Password;
