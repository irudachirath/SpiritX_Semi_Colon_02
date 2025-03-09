import React, { useState } from 'react';

const AuthPages = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="auth-pages">
      <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>
      <form>
        <input type="text" placeholder="Username" required />
        <input type="password" placeholder="Password" required />
        {!isLogin && <input type="password" placeholder="Confirm Password" required />}
        <button type="submit">{isLogin ? 'Login' : 'Sign Up'}</button>
      </form>
      <p onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? 'Need an account? Sign Up' : 'Already have an account? Login'}
      </p>
    </div>
  );
};

export default AuthPages;