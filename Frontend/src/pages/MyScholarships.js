import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import './MyScholarships.css';

const MyScholarships = () => {
  const { token, loading } = useAuth();
  const [scholarships, setScholarships] = useState([]);
  const [fetching, setFetching] = useState(true);
  const [expiringScholarship, setExpiringScholarship] = useState(null);

  const [minGPA, setMinGPA] = useState('');
  const [minAmount, setMinAmount] = useState('');

  useEffect(() => {
    if (loading) return;
    if (!token) {
      console.warn('No token found, skipping scholarship fetch.');
      setFetching(false);
      return;
    }

    const fetchMyScholarships = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/scholarships/mysch', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = res.data;
        setScholarships(data);

        const now = new Date();
        const soon = data.find((sch) => {
          const deadline = new Date(sch.deadline);
          const diff = (deadline - now) / (1000 * 60 * 60 * 24);
          return diff <= 3 && diff >= 0;
        });

        const dismissedId = sessionStorage.getItem('dismissedScholarshipId');
        if (soon && soon._id !== dismissedId) {
          setExpiringScholarship(soon);
        }
      } catch (err) {
        console.error('Failed to fetch scholarships', err);
      } finally {
        setFetching(false);
      }
    };

    fetchMyScholarships();
  }, [token, loading]);

  if (loading || fetching) return <p>Loading your scholarships...</p>;

  const filteredScholarships = scholarships.filter((sch) => {
    const numericAmount = parseFloat(
      String(sch.amount).replace(/[^0-9.]/g, '')
    );

    const meetsGPA = !minGPA || parseFloat(sch.gpa) <= parseFloat(minGPA);
    const meetsAmount = !minAmount || numericAmount >= parseFloat(minAmount);

    return meetsGPA && meetsAmount;
  });

  return (
    <div className="my-scholarships-container">
      <h2 className="my-scholarships-title">My Scholarships</h2>

      <div className="filters">
        <input
          type="number"
          step="0.1"
          placeholder="GPA"
          value={minGPA}
          onChange={(e) => setMinGPA(e.target.value)}
        />
        <input
          type="number"
          placeholder="Min Amount"
          value={minAmount}
          onChange={(e) => setMinAmount(e.target.value)}
        />
      </div>

      {filteredScholarships.length === 0 ? (
        <p className="my-scholarship-empty">No matching scholarships found for your filters.</p>
      ) : (
        <div className="my-scholarships-list">
          {filteredScholarships.map((scholarship) => (
            <div key={scholarship._id} className="my-scholarship-card">
              <strong>{scholarship.title}</strong>
              <p>Deadline: {scholarship.deadline}</p>
              <p>Req. GPA: {scholarship.gpa}</p>
              <p>Amount: {scholarship.amount}</p>
              <p>
                Registration Link:{' '}
                <a href={scholarship.url} target="_blank" rel="noopener noreferrer">
                  Apply Now
                </a>
              </p>
            </div>
          ))}
        </div>
      )}

      {expiringScholarship && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>⏰ Upcoming Deadline</h2>
            <p>
              <strong>{expiringScholarship.title}</strong> is closing soon!
            </p>
            <p>Deadline: {expiringScholarship.deadline}</p>
            <a
              href={expiringScholarship.url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              Apply Now
            </a>
            <button
              className="btn btn-secondary"
              onClick={() => {
                sessionStorage.setItem('dismissedScholarshipId', expiringScholarship._id);
                setExpiringScholarship(null);
              }}
            >
              Dismiss
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyScholarships;
