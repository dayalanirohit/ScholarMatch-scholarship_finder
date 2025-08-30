
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './AllScholarships.css';

const AllScholarships = () => {
  const [scholarships, setScholarships] = useState([]);
  const [displayed, setDisplayed] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch scholarships on mount
  useEffect(() => {
    fetch('http://localhost:5000/api/scholarships/all')
      .then((res) => res.json())
      .then((data) => {
        setScholarships(data);
        setDisplayed(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching scholarships:', err);
        setLoading(false);
      });
  }, []);

  // Shuffle every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      const shuffled = [...scholarships].sort(() => Math.random() - 0.5);
      setDisplayed(shuffled);
    }, 5000);

    return () => clearInterval(interval);
  }, [scholarships]);

  if (loading) return <p style={{ textAlign: 'center' }}>Loading scholarships...</p>;

  return (
    <div className="scholarships-container">
      <div className="filters">
        {/* You can put filters here if needed */}
      </div>

      <motion.div layout className="scholarship-grid">
        <AnimatePresence>
          {displayed.slice(0, 8).map((scholarship) => (

            <motion.div
              key={scholarship._id}
              layout
              className="scholarship-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <h3>{scholarship.title}</h3>
              <p><strong>Amount:</strong> {scholarship.amount}</p>
              <p><strong>Deadline:</strong> {scholarship.deadline}</p>
              <p><strong>Req. GPA:</strong> {scholarship.gpa}</p>
              <p>{scholarship.description?.slice(0, 100)}...</p>
              <a href={scholarship.url} target="_blank" rel="noopener noreferrer">
                Apply Now
              </a>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default AllScholarships;