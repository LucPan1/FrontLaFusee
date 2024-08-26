import React, { useRef, useState, useEffect } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import axios from '../api/axios';
import bureaux from '../assets/images/bnp_bureaux.jpg'; 
import '../styles/register.css'

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const REGISTER_URL = '/register';

const Register = () => {
    console.log("hello render");
    
    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');

    const [email, setEmail] = useState('');
    const [validName, setValidName] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    // s'exécute quand le composant recharge
    useEffect(() => {
        userRef.current.focus();
    }, [])

    // valider l'email
    useEffect(() => {
        const result = USER_REGEX.test(email)
        console.log(result);
        console.log(email);
        setValidName(result);
    }, [email])

    useEffect(() => {
        setValidPwd(PWD_REGEX.test(pwd));
        setValidMatch(pwd === matchPwd);
    }, [pwd, matchPwd])

    useEffect(() => {
        setErrMsg('');
    }, [email, pwd, matchPwd])

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Form submitted');
        console.log('Attempting to register with:', { email, pwd });

        try {
            const response = await axios.post(REGISTER_URL,
                JSON.stringify({ email, pwd }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            console.log(response?.data);
            console.log(response?.accessToken);
            console.log(JSON.stringify(response))
            setSuccess(true);
           
            setEmail('');
            setPwd('');
            setMatchPwd('');
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 409) {
                setErrMsg('Username Taken');
            } else {
                setErrMsg('Registration Failed')
            }
            errRef.current.focus();
        }


    }

  return (
<>
        <div className="full-screen">
            <img className="image-container" src={bureaux} alt="/" />
            <div className="background-overlay">
                {success ? (
                    <section >
                        <h1>Bravo vous comptez parmi nos clients!</h1>
                        <p>
                            <a href="/">Se connecter</a>
                        </p>
                    </section>
                ) : (
                    <div className="container">
                        <div className="left-section">
                            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                            <h2 className="title">Inscription</h2>
                            <div className="divider"></div>
                            <form onSubmit={handleSubmit}>     

                            <div className="input-group">
                                    <FontAwesomeIcon icon={faCheck} className={validName ? "valid input-icon" : "hide input-icon"} />
                                    <input
                                        type="text"
                                        id="user"
                                        className="form-control"
                                        placeholder="Nom d'utilisateur"
                                        onChange={(e) => setUser(e.target.value)}
                                        value={user}
                                    />
                                </div>
                           
                                <div className="input-group">
                                    <FontAwesomeIcon icon={faCheck} className={validName ? "valid input-icon" : "hide input-icon"} />
                                    <input
                                        type="text"
                                        id="email"
                                        className="form-control"
                                        ref={userRef}
                                        autoComplete="off"
                                        placeholder='Email'
                                        onChange={(e) => setEmail(e.target.value)}
                                        value={email}
                                        required
                                        aria-invalid={validName ? "false" : "true"}
                                        aria-describedby="uidnote"
                                        onFocus={() => setEmailFocus(true)}
                                        onBlur={() => setEmailFocus(false)}
                                    />
                                </div>
                                <p id="uidnote" className={emailFocus && email && !validName ? "instructions" : "offscreen"}>
                                    <FontAwesomeIcon icon={faInfoCircle} />
                                    Doit contenir 4 à 24 caractères.<br />
                                    Doit commencer par un lettre.<br />
                                    Lettres, chiffres, underscores et tirets autorisés.
                                </p>

                                <div className="input-group">
                                    <FontAwesomeIcon icon={faCheck} className={validPwd ? "valid input-icon" : "hide input-icon"} />
                                    <input
                                        type="password"
                                        id="password"
                                        className="form-control"
                                        placeholder='Mot de passe'
                                        onChange={(e) => setPwd(e.target.value)}
                                        value={pwd}
                                        required
                                        aria-invalid={validPwd ? "false" : "true"}
                                        aria-describedby="pwdnote"
                                        onFocus={() => setPwdFocus(true)}
                                        onBlur={() => setPwdFocus(false)}
                                    />
                                </div>
                                <p id="pwdnote" className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
                                    <FontAwesomeIcon icon={faInfoCircle} />
                                    8 à 24 caractères.<br />
                                    Doit inclure des lettres majuscules et minuscules, un chiffre et un caractère spécial.<br />
                                    Caractères spéciaux autorisés : ! @ # $ %
                                </p>

                                <div className="input-group">
                                    <FontAwesomeIcon icon={faCheck} className={validMatch && matchPwd ? "valid input-icon" : "hide input-icon"} />
                                    <input
                                        type="password"
                                        id="confirm_pwd"
                                        className="form-control"
                                        placeholder='Confirmer le mot de passe'
                                        onChange={(e) => setMatchPwd(e.target.value)}
                                        value={matchPwd}
                                        required
                                        aria-invalid={validMatch ? "false" : "true"}
                                        aria-describedby="confirmnote"
                                        onFocus={() => setMatchFocus(true)}
                                        onBlur={() => setMatchFocus(false)}
                                    />
                                </div>
                                <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
                                    <FontAwesomeIcon icon={faInfoCircle} />
                                    Doit correspondre au premier champ du mot de passe.
                                </p>

                                <button className="login-button" disabled={!validName || !validPwd || !validMatch}>S'inscrire</button>
                            </form>

                            <p>Déjà un client ?<br />
                                <span class="register-button">
                                    <a href="#">Accéder à mes comptes</a>
                                </span>
                            </p>
                        </div>
                        <div className="right-section">
                            <h2 className="welcome-title">Bienvenue!</h2>
                            <div className="welcome-divider"></div>
                            <p className="welcome-text">Inscrivez-vous pour accéder à votre compte.</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    </>
  )
}

export default Register