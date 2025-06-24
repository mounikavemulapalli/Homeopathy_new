/** @format */

import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Welcome to Remedy AI Homeopathy Portal</h1>
      <p style={styles.subText}>
        Manage cases, generate summaries, and explore remedies.
      </p>
      <div style={styles.links}>
        <Link to='/add-case' style={styles.button}>
          ➕ Add New Case
        </Link>
        <Link to='/cases' style={styles.button}>
          📋 View All Cases
        </Link>
      </div>
    </div>
  );
};

const styles = {
  container: {
    textAlign: "center",
    padding: "80px 20px",
    backgroundColor: "#f4f4f4",
    minHeight: "100vh",
  },
  heading: {
    fontSize: "2.5rem",
    marginBottom: "10px",
    color: "#333",
  },
  subText: {
    fontSize: "1.2rem",
    marginBottom: "30px",
    color: "#666",
  },
  links: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    flexWrap: "wrap",
  },
  button: {
    padding: "12px 24px",
    backgroundColor: "#3498db",
    color: "#fff",
    textDecoration: "none",
    borderRadius: "6px",
    fontWeight: "bold",
    transition: "background-color 0.3s",
  },
};

export default Home;
