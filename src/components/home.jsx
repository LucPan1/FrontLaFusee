import React from 'react'
import { useNavigate } from "react-router-dom"
import logo from '../assets/images/logo.png'; 
import hero from '../assets/images/Hero.jpeg'
import picto from '../assets/images/picto-electrique.png'
import voiture from '../assets/images/voiture.jpeg'
import '../styles/home.css'

const Home = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/")
  }
  return (
    <div>
        <nav class="navbar">
        <div class="logo">
            
        <img src={logo} alt="Logo" />
        </div>
        
        <div class="logout">
            <a href="" onClick={handleClick} class="logout-button">Déconnexion</a>
        </div>
        </nav>
        <div class="hero">
        <img src={hero} alt="Logo"/>
        </div>
        <div class="content">
        <h1 class="title">LE DUO ÉLECTRIQUE-THERMIQUE ARVAL SWITCH : MODE D'EMPLOI</h1>
        <p class="intro">Avec Arval Switch, vos collaborateurs gagnent en autonomie sur la route, mais aussi pour réserver leur véhicule !
        Aucune action n’est requise de votre part : l’ensemble de la prestation est géré de bout en bout par Arval, en direct avec les conducteurs.</p>
        
        <div class="steps-box">
            <ol class="steps-list">
                <li>Sur simple <span class="highlight">appel téléphonique</span>, ils demandent la mise à disposition d’un véhicule thermique ou hybride, en précisant la catégorie souhaitée.</li>
                <li>Le véhicule est <span class="highlight">réservé rapidement</span>, dans l’une des 1 400 agences du réseau partenaire d’Arval, réparties dans toute la France métropolitaine (dont Corse).</li>
                <li>Un <span class="highlight">SMS et/ou un mail de confirmation</span> leur est envoyé, où sont indiqués :
                    <ul>
                        <li>la période de réservation</li>
                        <li>les coordonnées de l'agence où retirer le véhicule</li>
                        <li>le solde restant sur leur réserve annuelle de 20 jours.</li>
                    </ul>
                </li>
            </ol>
            <div class="icon">
                <img src={picto} alt="Arval Switch Icon"/>
            </div>
            
        </div>
    </div>
</div>
  )}


export default Home