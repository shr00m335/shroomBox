import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../sidebar/Sidebar";
import { FaCopy } from "react-icons/fa";

interface EmailData {
  address: string;
  label: string;
  createdAt: string;
}

const TempMailMain: React.FC = () => {
  const [emails, setEmails] = useState<EmailData[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState<string | null>(null);
  const [showLabelPopup, setShowLabelPopup] = useState(false);
  const [newLabel, setNewLabel] = useState("");
  const [tempEmailAddress, setTempEmailAddress] = useState("");

  // Load emails from localStorage when component mounts
  useEffect(() => {
    loadEmailsFromStorage();
  }, []);

  // Function to load emails from localStorage
  const loadEmailsFromStorage = () => {
    const savedEmails = localStorage.getItem('tempEmails');
    if (savedEmails) {
      try {
        const parsedEmails = JSON.parse(savedEmails);
        if (Array.isArray(parsedEmails)) {
          setEmails(parsedEmails);
        }
      } catch (e) {
        console.error("Failed to parse emails from localStorage", e);
        // Reset corrupted storage
        localStorage.removeItem('tempEmails');
      }
    }
  };

  // Save emails to localStorage whenever they change
  useEffect(() => {
    if (emails.length > 0) {
      localStorage.setItem('tempEmails', JSON.stringify(emails));
    }
  }, [emails]);

  const initiateEmailCreation = () => {
    // Generate a random email address
    const randomString = Math.random().toString(36).substring(2, 10);
    const randomEmail = `${randomString}@test.com`;
    setTempEmailAddress(randomEmail);
    
    // Open the label popup
    setNewLabel("");
    setShowLabelPopup(true);
  };

  const handleCreateEmail = async () => {
    setLoading(true);
    setError("");
    
    try {
      // Generate a random email address for testing
      const randomString = Math.random().toString(36).substring(2, 10);
      const randomEmail = `${randomString}@test.com`;
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Show popup for label input
      setTempEmailAddress(randomEmail);
      setShowLabelPopup(true);
    } catch (err: any) {
      setError(err.message || "An error occurred while creating the email");
      setLoading(false);
    }
  };

  const completeEmailCreation = () => {
    if (tempEmailAddress) {
      // Create new email object with the label
      const label = newLabel.trim() || "Temporary email address for one-time use";
      const newEmail: EmailData = {
        address: tempEmailAddress,
        label: label,
        createdAt: new Date().toISOString(),
      };
      
      // Add to the emails array
      const updatedEmails = [...emails, newEmail];
      setEmails(updatedEmails);
      
      // Update localStorage
      localStorage.setItem('tempEmails', JSON.stringify(updatedEmails));
      
      // Close the popup
      setShowLabelPopup(false);
      setTempEmailAddress("");
      setNewLabel("");
    }
    setLoading(false);
  };

  const cancelEmailCreation = () => {
    setShowLabelPopup(false);
    setTempEmailAddress("");
    setNewLabel("");
    setLoading(false);
  };

  const handleClearAll = () => {
    setEmails([]);
    localStorage.removeItem('tempEmails');
  };

  // Copy email to clipboard
  const handleCopyEmail = (e: React.MouseEvent, email: string) => {
    e.preventDefault(); // Prevent navigation
    e.stopPropagation(); // Stop event bubbling
    
    navigator.clipboard.writeText(email)
      .then(() => {
        setCopiedEmail(email);
        // Reset the "Copied!" message after 2 seconds
        setTimeout(() => setCopiedEmail(null), 2000);
      })
      .catch(err => {
        console.error('Failed to copy email: ', err);
      });
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="flex bg-[#F5F6FA] w-screen h-screen">
      <Sidebar selectedItem="tempMail" />
      <div className="w-full h-full p-5">
        <p className="font-bold text-3xl w-full text-left">Temporary Email</p>
        <div className="w-full h-9/10 bg-white my-5 rounded-2xl flex flex-col items-start p-5">
          {/* Controls - only showing the Clear All button when needed */}
          {emails.length > 0 && (
            <div className="w-full mb-5">
              <button
                onClick={handleClearAll}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Clear All Emails
              </button>
            </div>
          )}
          
          {error && <p className="text-red-500 mb-4">{error}</p>}

          {/* Email Cards */}
          <div className="w-full grid grid-cols-3 gap-6">
            {emails.length === 0 && !loading ? (
              <div className="col-span-3 text-gray-500 text-center py-10">
                No emails generated yet. Click the "+" card to create one.
              </div>
            ) : (
              emails.map((emailData) => (
                <Link
                  key={emailData.address}
                  to={`/tempMail/${encodeURIComponent(emailData.address)}`}
                  className="block"
                >
                  <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="mx-auto text-lg font-semibold text-gray-800 truncate">{emailData.address}</h3>
                      <div 
                        onClick={(e) => handleCopyEmail(e, emailData.address)}
                        className="p-2 hover:bg-gray-100 rounded-full cursor-pointer"
                        title="Copy to clipboard"
                      >
                        <FaCopy className="text-gray-500" />
                      </div>
                    </div>
                    {copiedEmail === emailData.address && (
                      <p className="text-green-500 text-xs mb-2">Copied to clipboard!</p>
                    )}
                    <p className="text-sm text-gray-500 mb-3">Created on: {formatDate(emailData.createdAt)}</p>
                    <p className="text-sm text-gray-600">
                      {emailData.label}
                    </p>
                    <div className="mt-4 flex justify-end">
                      <span className="text-blue-500 text-sm">View Inbox →</span>
                    </div>
                  </div>
                </Link>
              ))
            )}
            
            {/* Add Email Card */}
            <div 
              onClick={initiateEmailCreation} 
              className="border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center p-5 cursor-pointer hover:bg-gray-50 transition-colors"
              style={{ minHeight: "180px" }}
            >
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-2">
                <span className="text-blue-500 text-2xl">+</span>
              </div>
              <p className="text-gray-600">Generate New Email</p>
              {loading && !showLabelPopup && <p className="text-blue-500 mt-2">Creating...</p>}
            </div>
          </div>
        </div>
      </div>
      
      {/* Label Popup */}
      {showLabelPopup && (
        <div className="fixed inset-0 bg-black/60 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96 max-w-md">
            <h3 className="text-lg font-semibold mb-4">Add a Label for Your Email</h3>
            <p className="text-gray-600 mb-4">
              {tempEmailAddress}
            </p>
            <div className="mb-4">
              <label htmlFor="emailLabel" className="block text-sm font-medium text-gray-700 mb-1">
                Label (optional):
              </label>
              <input
                type="text"
                id="emailLabel"
                placeholder="e.g., Shopping, Social Media, Gaming..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={newLabel}
                onChange={(e) => setNewLabel(e.target.value)}
              />
              <p className="text-xs text-gray-500 mt-1">
                Leave blank to use the default label.
              </p>
            </div>
            <div className="flex justify-end space-x-3">
              <button
                onClick={cancelEmailCreation}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={completeEmailCreation}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Create Email
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TempMailMain;