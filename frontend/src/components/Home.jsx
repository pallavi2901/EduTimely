import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Lottie from "react-lottie";
import "./Home.css";
import robotAnimationData from "../assets/robot-animation.json";
import capAnimationData from "../assets/cap-animation.json";
import '../styles/styles.css';
export default function Home() {
  const navigate = useNavigate();

  const lottieOptions = {
    loop: true,
    autoplay: true,
    animationData: robotAnimationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
const [showInstructions, setShowInstructions] = useState(false);

  const capOptions = {
    loop: true,
    autoplay: true,
    animationData: capAnimationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div className="home-container">
      {/* Title & Cap Animation */}
      <div className="title-container">
        <h1 className="title">
          Welcome to <span>EDU-TIMELY</span>
        </h1>
        <span className="cap-animation">
          <Lottie options={capOptions} height={100} width={100} />
        </span>
      </div>

      {/* Animated Background */}

      {/* Feature Cards */}
      <div className="features-container">
        <div className="feature-card">
          <h3>➕ Add Reminders</h3>
          <p>Create and manage daily academic or personal task reminders.</p>
          <button onClick={() => navigate("/tasks")}>Go to Tasks</button>
        </div>

        <div className="feature-card">
          <h3>🗓️ Add Events</h3>
          <p>Schedule exams, meetings, deadlines, and important dates.</p>
          <button onClick={() => navigate("/calendar")}>Go to Calendar</button>
        </div>

        <div className="feature-card">
          <h3>📌 Add Pins</h3>
          <p>Pin important notes or quick references to access instantly.</p>
          <button onClick={() => navigate("/notes")}>Go to Notes</button>
        </div>
      </div>

      {/* Project Overview */}
      <div className="project-overview">
        <div className="overview-text">
          <p>
            EDU-TIMELY is a smart academic productivity platform designed to help
            students organize tasks, manage time, and track academic progress
            efficiently — all in one place.
          </p>
        </div>

        {/* Robot shown by default */}
        <div className="robot-container">
          <Lottie options={lottieOptions} height={200} width={200} />
        </div>
      </div>

      {/* Creator Details */}
      <div className="creator-details">
        <h3>Project Creators</h3>
        <p>
          <strong>Project Lead:</strong> Pallavi – 221FA04538
        </p>
      </div>
<button
  className="instructions-toggle-btn"
  onClick={() => setShowInstructions(prev => !prev)}
>
  ⚠️ {showInstructions ? "Hide Instructions" : "View Instructions"}
</button>

      {/* Instructions Box */}
     {/* Instructions Box */}
{showInstructions && (
  <div className="instructions-box">

  <h3>📘 How to Use EDU-TIMELY</h3>

  <div className="instruction-grid">
    <div className="instruction-card">
      <span className="icon">📋</span>
      <h4>Task Manager</h4>
      <p>Add tasks with priority and deadlines. Today’s and yesterday’s tasks appear first automatically.</p>
    </div>

    <div className="instruction-card">
      <span className="icon">🗓️</span>
      <h4>Calendar</h4>
      <p>Click on a date to add events like exams, meetings, and academic schedules.</p>
    </div>

    <div className="instruction-card">
      <span className="icon">📝</span>
      <h4>Notes Picker</h4>
      <p>Right-click on a note to view, rename, or delete it instantly.</p>
    </div>

    <div className="instruction-card">
      <span className="icon">⏱</span>
      <h4>Pomodoro Timer</h4>
      <p>Start focused study sessions using the Pomodoro technique.</p>
    </div>

    <div className="instruction-card">
      <span className="icon">📊</span>
      <h4>Grade Tracker</h4>
      <p>Enter grades to track academic performance and progress.</p>
    </div>

    <div className="instruction-card">
      <span className="icon">📌</span>
      <h4>Pins</h4>
      <p>Pin important notes or tasks so they stay visible on your dashboard.</p>
    </div>
  </div>
  </div>
)}


    </div>
  );
}
