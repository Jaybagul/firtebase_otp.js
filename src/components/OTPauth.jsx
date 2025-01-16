import React, { useState } from "react";
import { auth } from "../firebase-config"; // Firebase ka auth import kar rahe hain
import { RecaptchaVerifier, signInWithPhoneNumber, PhoneAuthProvider, signInWithCredential } from "firebase/auth"; // Firebase authentication functions ko import kar rahe hain

const OTPauth = () => {
  const [phoneNumber, setPhoneNumber] = useState("");  // Phone number store karte hain
  const [otpSent, setOtpSent] = useState(false);  // OTP bheja gaya hai ya nahi
  const [verificationId, setVerificationId] = useState("");  // Verification ID ko store karte hain
  const [otp, setOtp] = useState("");  // User ne jo OTP dala hai
  const [errorMessage, setErrorMessage] = useState("");  // Error messages ko handle karte hain

  // OTP bhejne ka function
  const sendOtp = () => {
    if (window.recaptchaVerifier) {
      window.recaptchaVerifier.clear();  // Agar pehle se reCAPTCHA hai toh usse clear karte hain
    }

    const recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {  // Invisible reCAPTCHA set kar rahe hain
      size: 'invisible',
      callback: (response) => {  // Jab reCAPTCHA solve hota hai, OTP bhejne ka function chalta hai
        signInWithPhoneNumber(auth, phoneNumber, recaptchaVerifier)  // OTP send karte hain
          .then((confirmationResult) => {
            setVerificationId(confirmationResult.verificationId);  // Verification ID store karte hain
            setOtpSent(true);  // OTP bheja gaya hai
          })
          .catch((error) => {
            setErrorMessage("Failed to send OTP: " + error.message);  // Agar error aaye toh show karte hain
          });
      }
    }, auth);

    recaptchaVerifier.render();  // reCAPTCHA ko render karte hain
  };

  // OTP verify karne ka function
  const verifyOtp = () => {
    const credential = PhoneAuthProvider.credential(verificationId, otp);  // Verification ID aur OTP se credential banate hain

    signInWithCredential(auth, credential)  // OTP verify karte hain
      .then((result) => {
        alert("Authentication Successful");  // Agar successful hota hai, success message show karte hain
      })
      .catch((error) => {
        setErrorMessage("Failed to verify OTP: " + error.message);  // Agar error ho toh error show karte hain
      });
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter your phone number"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}  // Phone number ko update karte hain
      />
      <button onClick={sendOtp}>Send OTP</button>  
      {errorMessage && <p>{errorMessage}</p>}  
      <div id="recaptcha-container"></div>    

      {otpSent && (  // Agar OTP bheja gaya hai, tab OTP input field show hoga
        <div>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}  // OTP ko update karte hain
          />
          <button onClick={verifyOtp}>Verify OTP</button>  // "Verify OTP" pe click karne par OTP verify hota hai
        </div>
      )}
    </div>
  );
};

export default OTPauth;
