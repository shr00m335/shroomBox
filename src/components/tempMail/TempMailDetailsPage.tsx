import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Sidebar from "../sidebar/Sidebar";

const TempMailDetailsPage: React.FC = () => {
  const { email } = useParams(); // /tempMail/:email
  const [messages, setMessages] = useState<any[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch messages when the component mounts (or when email changes)
  useEffect(() => {
    if (email) {
      fetchMessages(email);
    }
  }, [email]);

  const fetchMessages = async (addr: string) => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(
        `/gmail_api/get-emails?email=${encodeURIComponent(addr)}`
      );
      if (!res.ok) {
        throw new Error("Failed to fetch messages");
      }
      const data = await res.json();
      setMessages(Array.isArray(data) ? data : []);
    } catch (err: any) {
      setError(err.message || "An error occurred while fetching messages");
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = () => {
    if (email) {
      fetchMessages(email);
    }
  };

  if (!email) {
    return <div>No email address provided.</div>;
  }

  return (
    <div className="flex bg-[#F5F6FA] w-screen h-screen">
      <Sidebar selectedItem="tempMail" />
      <div className="p-5 mx-auto">
        <h1 className="font-bold text-2xl mb-5">Inbox for: {email}</h1>

        {/* Refresh Inbox Button */}
        <button
          onClick={handleRefresh}
          disabled={loading}
          className="bg-green-500 text-white px-4 py-2 rounded mr-3"
        >
          {loading ? "Refreshing..." : "Refresh Inbox"}
        </button>

        {/* Back to the main list */}
        <Link
          to="/tempMail"
          className="inline-block bg-blue-500 text-white px-4 py-2 rounded"
        >
          Back to Email List
        </Link>

        {error && <p className="text-red-500 mt-3">{error}</p>}

        {/* No messages */}
        {messages.length === 0 && !loading && (
          <p className="mt-5">No messages found for this email.</p>
        )}

        {/* Display messages */}
        <div className="mt-5 space-y-4">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className="border border-gray-200 p-4 rounded bg-white shadow-sm"
            >
              <p>
                <strong>From:</strong> {msg.mail_from}
              </p>
              <p>
                <strong>Subject:</strong> {msg.mail_subject}
              </p>
              <p>
                <strong>Date:</strong>{" "}
                {new Date(msg.mail_timestamp * 1000).toLocaleDateString()}
              </p>
              <p className="mt-2">
                <strong>Message:</strong> {msg.mail_text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TempMailDetailsPage;
