import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../sidebar/Sidebar";

const TempMailMain: React.FC = () => {
  const [emails, setEmails] = useState<string[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

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

  // useEffect(() => {
  //   localStorage.setItem('tempEmails', JSON.stringify(emails));
  // }, [emails]);

  // const handleCreateEmail = async () => {
  //   setLoading(true);
  //   setError("");
  //   try {
  //     // Adjust if your backend is at a different URL/port
  //     const res = await fetch("http://localhost:5000/create-email");
  //     if (!res.ok) {
  //       throw new Error("Failed to create disposable email");
  //     }
  //     const data = await res.json();
  //     setEmails((prev) => [...prev, data.email]);
  //   } catch (err: any) {
  //     setError(err.message || "An error occurred while creating the email");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // Save emails to localStorage whenever they change
  useEffect(() => {
    if (emails.length > 0) {
      localStorage.setItem('tempEmails', JSON.stringify(emails));
    }
  }, [emails]);

  const handleCreateEmail = async () => {
    setLoading(true);
    setError("");
    
    try {
      // Generate a random email address for testing
      const randomString = Math.random().toString(36).substring(2, 10);
      const randomEmail = `${randomString}@test.com`;
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Add the new email to state
      const updatedEmails = [...emails, randomEmail];
      setEmails(updatedEmails);
      
      // Explicitly update localStorage to ensure persistence
      localStorage.setItem('tempEmails', JSON.stringify(updatedEmails));
    } catch (err: any) {
      setError(err.message || "An error occurred while creating the email");
    } finally {
      setLoading(false);
    }
  };

  const handleClearAll = () => {
    setEmails([]);
    localStorage.removeItem('tempEmails');
  };

  return (
    <div className="flex bg-[#F5F6FA] w-screen h-screen">
      <Sidebar selectedItem="tempMail" />
      <div className="p-5 mx-auto">
        <h1 className="font-bold text-3xl mb-5">Disposable Email List</h1>

        {/* Controls */}
        <div className="flex gap-3">
          {/* Generate a new email */}
          <button
            onClick={handleCreateEmail}
            disabled={loading}
            className="mx-auto bg-blue-500 text-white px-4 py-2 rounded"
          >
            {loading ? "Creating..." : "Generate New Email"}
          </button>

          {/* Clear all emails */}
          {emails.length > 0 && (
            <button
              onClick={handleClearAll}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Clear All Emails
            </button>
          )}
        </div>

        {error && <p className="text-red-500 mt-3">{error}</p>}

        {/* Display generated emails in a 2-column grid */}
        <div className="mt-5 grid grid-cols-2 gap-2">
          {emails.length === 0 ? (
            <p className="col-span-2 text-gray-500">No emails generated yet. Click the button above to create one.</p>
          ) : (
            emails.map((email) => (
              <Link
                key={email}
                to={`/tempMail/${encodeURIComponent(email)}`}
                className="border rounded p-2 bg-white hover:bg-gray-100"
              >
                {email}
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default TempMailMain;