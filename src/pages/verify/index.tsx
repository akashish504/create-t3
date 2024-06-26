import React, { useState } from 'react';
import { useRouter } from 'next/router';

import { api } from "~/utils/api";


export default function AccountVerification () {
  const [otp, setOtp] = useState('');
  const [verificationStatus, setVerificationStatus] = useState('');

  const router = useRouter();
  const { email } = router.query;

  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => { 
    setOtp(e.target.value);
  };

  const verify = api.user.verify.useMutation();
  const handleVerifyAccount = async () => {
    try {
        // Simulate sending OTP to email (replace with actual API call)
        console.log(email)
        

        // Check if OTP is valid (replace with actual verification logic)

        if (otp === "12345678") {
            verify.mutate({ email: String(email), otp: Number(otp)});
            setVerificationStatus('Verification successful!');
            router.push({
              pathname: '/chooseCategory'
            }).catch((error) => {
              console.error('Error navigating to verify page:', error);
            });
        } else {
            setVerificationStatus('Invalid OTP. Please try again.');
        }
    } catch (error) {
      console.error('Error sending OTP:', error);
      setVerificationStatus('Error sending OTP. Please try again later.');
    }
  };

  return (
    <div>
      <h2>Account Verification</h2>
      <div>
        <p>Enter the OTP sent to {email}</p>
      </div>
      <div>
        <label htmlFor="otp">OTP:</label>
        <input
          type="text"
          id="otp"
          value={otp}
          onChange={handleOtpChange}
        />
      </div>
      <button onClick={handleVerifyAccount}>Verify Account</button>
      <div>{verificationStatus}</div>
    </div>
  );
};

// Function to simulate sending OTP to email (replace with actual API call)
// const sendOtpToEmail = async (email: string) => {
//   // Simulate API call delay
//   // await new Promise(resolve => setTimeout(resolve, 1000));
//   // Replace with actual API call to send OTP to email
//   return { otp: '123456' }; // Simulated OTP
// };

