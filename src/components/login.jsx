import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"
import { FaFacebookF, FaLinkedinIn, FaGoogle, FaRegEnvelope } from 'react-icons/fa'
import { MdLockOutline } from 'react-icons/md'
import bureaux from '../assets/images/bnp_bureaux.jpg'; 
import { useSignIn } from "react-auth-kit"
import '../styles/login.css';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleClick = () => {
    navigate("/register")
  }
  const loginAction = () => {
    navigate("/home")
  }
  return (
  <div class="full-screen">
  <img class="image-container" src={bureaux} alt="/" />
  <div class="background-overlay">
    <div class="container">
      <div class="left-section">
        <div class="py-10">
          <h2 class="title">Se connecter</h2>
          <div class="divider"></div>
          <div class="social-icons">
            <a href="#" class="social-icon">
              <FaFacebookF />
            </a>
            <a href="#" class="social-icon">
              <FaLinkedinIn />
            </a>
            <a href="#" class="social-icon">
              <FaGoogle />
            </a>
          </div>
          <p class="text-gray-400 my-3">ou utilisez votre email</p>
          <div class="email-password-group">
            <div class="input-group">
              <FaRegEnvelope class="input-icon" />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                class="form-control"
              />
            </div>
            <div class="input-group">
              <MdLockOutline class="input-icon" />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                class="form-control"
              />
            </div>
            <div class="remember-me">
              <label>
                <input type="checkbox" name="remember" />
                Se souvenir de moi
              </label>
              <a href="#">Mot de passe oublié ?</a>
            </div>
            <a href="#" onClick={loginAction} class="login-button">
              Accéder à mes comptes
            </a>
          </div>
        </div>
      </div>
      <div class="right-section">
        <h2 class="welcome-title">Bienvenue !</h2>
        <div class="welcome-divider"></div>
        <p class="welcome-text">La banque d'un monde qui change </p>
        <a href="#" onClick={handleClick} class="signup-button">
          Devenir client
        </a>
      </div>
    </div>
  </div>
</div>
  
   
  );
};

export default Login;
