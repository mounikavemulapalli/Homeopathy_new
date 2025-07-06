/** @format */

import React from "react";
import "./AboutUs.css";
import doctor from "../assets/doctor.jpg";

const AboutUs = () => {
  return (
    <section className='about-section'>
      <div className='about-container'>
        <h2 className='about-heading'>About Bhanu Homeopathy</h2>

        <p className='about-description'>
          At <strong>Bhanu Homeopathy</strong>, we are committed to providing
          natural, gentle, and effective healing through the timeless science of
          homeopathy. With years of experience and a compassionate approach, we
          treat not just the disease, but the person as a whole.
        </p>

        <div className='about-content'>
          <div className='about-text'>
            <h3>Our Philosophy</h3>
            <p>
              We believe in the body's natural ability to heal itself. Our
              holistic treatments are personalized for every individual,
              ensuring long-term wellness and harmony of mind, body, and spirit.
            </p>

            <h3>Why Choose Us?</h3>
            <ul>
              <li>Experienced and Certified Homeopathic Practitioners</li>
              <li>Customized Treatment Plans</li>
              <li>Safe for all ages – infants to elderly</li>
              <li>Chronic and Acute Disease Management</li>
              <li>Supportive and Confidential Environment</li>
              <li>Affordable and Transparent Pricing</li>
              <li>Comprehensive Family Healthcare</li>
            </ul>

            <h3>Our Mission</h3>
            <p>
              To provide accessible, affordable, and effective homeopathic care
              that heals not just the symptoms but the root cause. We aim to
              integrate homeopathy with modern practices to serve the community
              with integrity and compassion.
            </p>

            <h3>Expertise</h3>
            <p>
              Our team has successfully treated a wide range of chronic and
              acute conditions including:
            </p>
            <ul>
              <li>Skin Disorders (Eczema, Psoriasis, Acne)</li>
              <li>Respiratory Illnesses (Asthma, Allergies)</li>
              <li>Gastrointestinal Issues (IBS, Acidity)</li>
              <li>Joint Pain & Arthritis</li>
              <li>Children’s Health Issues</li>
              <li>Stress, Anxiety & Sleep Disorders</li>
              <li>Female Health & Menstrual Disorders</li>
            </ul>

            <h3>Patient-Centric Approach</h3>
            <p>
              We understand that every patient is unique. That's why we spend
              time to understand your lifestyle, medical history, and emotional
              well-being before prescribing a remedy. Your comfort, privacy, and
              healing are our top priorities.
            </p>
          </div>

          <div className='about-image'>
            <img src={doctor} alt='Bhanu Homeopathy Clinic' />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
