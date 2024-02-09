import React, { useState } from 'react';

function ForgotPassword() {
  const [email, setEmail] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically make an API call to your backend to handle the password reset request
    console.log('Password reset email sent to:', email);
    // Reset the email field after submission
    setEmail('');
    // Optionally, show a message to the user indicating that the email has been sent
  };

  return (
    <div className="forgot-password">
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={handleEmailChange}
          required
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default ForgotPassword;
