import React, { useState } from 'react';

const Login = () => {
  // Initialize error state
  const [err, setErr] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    // Remove the unused variables
    // const email = e.target.email.value;
    // const password = e.target.password.value;

    try {
      // Replace this with your login logic
      // Example:
      // await auth.signInWithEmailAndPassword(email, password);

      // If login is successful, you can redirect or update UI here
    } catch (error) {
      setErr("Something went wrong. Please try again."); // Set the error message
    }
  };

  return (
    <div className="formcontainer">
      <div className="formwrapper">
        <span className="login">Stream Chat</span>
        <span className="title">Login</span>
        <form onSubmit={handleLogin}>
          <input name="email" type="email" placeholder="Email" />
          <input name="password" type="password" placeholder="Password" />
          <button type="submit">Sign In</button>
          {err && <span>{err}</span>}
        </form>
        <p>Don't have an account? Register</p>
      </div>
    </div>
  );
};

export default Login;