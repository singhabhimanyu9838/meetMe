import React from 'react'
import "../App.css"
import { Link, useNavigate } from 'react-router-dom'

export default function LandingPage() {

  const router = useNavigate();

  return (
    <div className="landingPageContainer">

      <nav className="landingNav">
        <h2 className="brand">meetMe</h2>

        <div className="navList">
          <span onClick={() => router("/aljk23")}>Join as Guest</span>
          <span onClick={() => router("/auth")}>Register</span>
          <button onClick={() => router("/auth")} className="loginBtn">
            Login
          </button>
        </div>
      </nav>

      <section className="landingMainContainer">
        <div className="heroText">
          <h1>
            <span className="highlight">Connect</span> with your loved ones
          </h1>

          <p>Cover the distance with meetMe</p>

          <Link to="/auth" className="ctaBtn">
            Get Started
          </Link>
        </div>

        <div className="heroImage">
          <img src="/mobile.png" alt="Video call illustration" />
        </div>
      </section>

    </div>
  )
}
