import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getApiUrl } from '../config/api';
import './AdminDashboard.css';

/**
 * Admin Dashboard Component
 * Displays all leads in a table format
 * No authentication required for demo purposes
 */
const AdminDashboard = () => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /**
   * Fetch leads from API
   */
  useEffect(() => {
    fetchLeads();
    
    // Refresh leads every 30 seconds
    const interval = setInterval(fetchLeads, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchLeads = async () => {
    try {
      setLoading(true);
      const response = await axios.get(getApiUrl('/api/leads'));
      
      if (response.data.success) {
        setLeads(response.data.leads || []);
        setError(null);
      }
    } catch (err) {
      console.error('Error fetching leads:', err);
      setError('Failed to load leads. Please check your Google Sheets configuration.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-dashboard">
      <div className="container">
        <header className="dashboard-header">
          <h1>Lead Management Dashboard</h1>
          <button onClick={fetchLeads} className="btn btn-primary btn-refresh">
            🔄 Refresh
          </button>
        </header>

        {loading && (
          <div className="loading-state">
            <p>Loading leads...</p>
          </div>
        )}

        {error && (
          <div className="error-state">
            <p>❌ {error}</p>
            <p className="error-hint">
              Make sure your Google Sheets credentials are configured in the .env file.
            </p>
          </div>
        )}

        {!loading && !error && (
          <>
            <div className="dashboard-stats">
              <div className="stat-card">
                <div className="stat-value">{leads.length}</div>
                <div className="stat-label">Total Leads</div>
              </div>
              <div className="stat-card">
                <div className="stat-value">
                  {leads.filter(lead => {
                    const leadDate = new Date(lead.date);
                    const today = new Date();
                    return leadDate.toDateString() === today.toDateString();
                  }).length}
                </div>
                <div className="stat-label">Today's Leads</div>
              </div>
            </div>

            {leads.length === 0 ? (
              <div className="empty-state">
                <p>No leads yet. Leads will appear here once someone submits the form.</p>
              </div>
            ) : (
              <div className="leads-table-container">
                <table className="leads-table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>Service</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {leads.map((lead, index) => (
                      <tr key={lead.id || index}>
                        <td>{lead.name}</td>
                        <td>
                          <a href={`mailto:${lead.email}`}>{lead.email}</a>
                        </td>
                        <td>
                          <a href={`tel:${lead.phone}`}>{lead.phone}</a>
                        </td>
                        <td>{lead.service}</td>
                        <td>{lead.date || 'N/A'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}

        <footer className="dashboard-footer">
          <p>
            <a href="/">← Back to Landing Page</a>
          </p>
        </footer>
      </div>
    </div>
  );
};

export default AdminDashboard;

