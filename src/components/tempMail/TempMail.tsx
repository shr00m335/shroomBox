import React, { useEffect, useState } from "react";
import Sidebar from "../sidebar/Sidebar";

interface TempMailProps {
  backendUrl?: string; // Optionally pass your backend URL as a prop (default: http://localhost:5000)
}

const TempMail: React.FC<TempMailProps> = ({
  backendUrl = "http://localhost:5000",
}) => {
  const [disposableEmail, setDisposableEmail] = useState("");
  const [emails, setEmails] = useState<any[]>([]);
  const [error, setError] = useState("");
  const [loadingEmail, setLoadingEmail] = useState(false);
  const [loadingInbox, setLoadingInbox] = useState(false);

  // ----------------------------------------------------------------
  // 1) Keep track of ALL generated emails in local storage
  // ----------------------------------------------------------------
  const [savedEmails, setSavedEmails] = useState<string[]>(() => {
    // On component mount, read any stored emails from localStorage
    const stored = localStorage.getItem("tempEmails");
    return stored ? JSON.parse(stored) : [];
  });

  // Helper to update local storage whenever savedEmails changes
  useEffect(() => {
    localStorage.setItem("tempEmails", JSON.stringify(savedEmails));
  }, [savedEmails]);

  // ----------------------------------------------------------------
  // 2) Create a disposable email
  // ----------------------------------------------------------------
  const handleCreateEmail = async () => {
    setLoadingEmail(true);
    setError("");
    try {
      const response = await fetch(`${backendUrl}/create-email`);
      if (!response.ok) {
        throw new Error("Failed to create disposable email");
      }
      const data = await response.json();
      setDisposableEmail(data.email);
      setEmails([]); // Reset any old inbox messages

      // Store this newly created email in our savedEmails list
      setSavedEmails((prev) => [...prev, data.email]);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "An error occurred while creating the email");
    } finally {
      setLoadingEmail(false);
    }
  };

  // ----------------------------------------------------------------
  // 3) Fetch emails for the currently displayed address
  // ----------------------------------------------------------------
  const handleFetchEmails = async () => {
    if (!disposableEmail) {
      setError("No disposable email found. Please create one first.");
      return;
    }
    setLoadingInbox(true);
    setError("");
    try {
      const response = await fetch(
        `${backendUrl}/get-emails?email=${encodeURIComponent(disposableEmail)}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch emails");
      }
      const data = await response.json();
      // Temp Mail API typically returns an array of message objects
      setEmails(Array.isArray(data) ? data : []);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "An error occurred while fetching emails");
    } finally {
      setLoadingInbox(false);
    }
  };

  return (
    <div className="flex bg-[#F5F6FA] w-screen h-screen">
      <Sidebar selectedItem="tempMail" />
      <div className="w-full h-full p-5">
        <h1 className="font-bold text-3xl mb-5">Temporary Email</h1>

        {/* Button to create the email */}
        <div className="mb-5">
          <button
            onClick={handleCreateEmail}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            disabled={loadingEmail}
          >
            {loadingEmail ? "Creating..." : "Create Disposable Email"}
          </button>
        </div>

        {/* Display the newly created email (if any) */}
        {disposableEmail && (
          <div className="mb-5">
            <p className="text-lg font-semibold">Your disposable email:</p>
            <p className="text-gray-700">{disposableEmail}</p>

            {/* Button to fetch the inbox */}
            <button
              onClick={handleFetchEmails}
              className="mt-3 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              disabled={loadingInbox}
            >
              {loadingInbox ? "Loading..." : "Fetch Emails"}
            </button>
          </div>
        )}

        {/* Display any error messages */}
        {error && <div className="text-red-500 my-3">{error}</div>}

        {/* Display the inbox messages if we have any */}
        {emails.length > 0 && (
          <div className="mt-5">
            <h2 className="text-xl font-semibold mb-2">Inbox Messages</h2>
            <div className="space-y-4">
              {emails.map((msg, index) => (
                <div
                  key={index}
                  className="border border-gray-200 rounded p-4 shadow-sm"
                >
                  <p>
                    <strong>From:</strong> {msg.mail_from}
                  </p>
                  <p>
                    <strong>Subject:</strong> {msg.mail_subject}
                  </p>
                  <p>
                    <strong>Date:</strong> {msg.mail_timestamp}
                  </p>
                  <p className="mt-2 whitespace-pre-line">
                    <strong>Message:</strong> {msg.mail_text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Display a list of all previously created emails */}
        {savedEmails.length > 0 && (
          <div className="mt-5">
            <h2 className="text-xl font-semibold mb-2">
              Previously Created Emails
            </h2>
            <ul className="list-disc pl-5">
              {savedEmails.map((em, idx) => (
                <li key={idx}>{em}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default TempMail;
