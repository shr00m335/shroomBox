import React, { useEffect, useRef, useState } from "react";
import { FaArrowLeft, FaSyncAlt } from "react-icons/fa";
import { getOpenAIResponse, getTextToSpeech } from "../../../api"; // Adjust path as needed
import { EmailContent } from "./Inbox";

interface EmailDetailsProps {
  email: EmailContent;
  onBack: () => void;
}

const EmailDetails: React.FC<EmailDetailsProps> = ({ email, onBack }) => {
  const [summary, setSummary] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const currentEmailKeyRef = useRef<string>("");

  console.log(email.plain_content);

  // Create a unique key for the current email
  const generateEmailKey = (email: EmailContent) => {
    return `${email.subject}_${email.from}_${
      email.content ? email.content.substring(0, 20) : ""
    }`;
  };

  const generateSummary = async () => {
    if (!email.content) return;

    const emailKey = generateEmailKey(email);
    currentEmailKeyRef.current = emailKey;

    setLoading(true);
    setError("");

    try {
      const prompt = `Summarize this email in 2-3 sentences:\n\nSubject: ${email.subject}\nContent: ${email.plain_content}`;
      const aiResponse = await getOpenAIResponse(prompt);

      // Check if we're still showing the same email
      if (emailKey === currentEmailKeyRef.current) {
        if (aiResponse.choices && aiResponse.choices.length > 0) {
          const summaryText = aiResponse.choices[0].message.content;
          setSummary(summaryText);

          // Get the text-to-speech audio binary data
          const audioData = await getTextToSpeech(summaryText);
          //   console.log("audioData type:", audioData.constructor.name);
          //   console.log("audioData byteLength:", audioData.byteLength);

          // Convert the binary data into a Blob
          //   const blob = new Blob([audioData], { type: "audio/mpeg" });
          // Create an object URL for the Blob
          const audioUrl = URL.createObjectURL(audioData);
          console.log("Audio URL:", audioUrl);

          // Create an Audio element and play it
          const audio = new Audio(audioUrl);
          audio.play();
        } else {
          setError("No summary generated");
        }
      }
    } catch (err) {
      // Only set error if still showing same email
      if (emailKey === currentEmailKeyRef.current) {
        setError("Failed to generate summary");
        console.error("Error generating summary:", err);
      }
    } finally {
      // Only update loading state if still showing same email
      if (emailKey === currentEmailKeyRef.current) {
        setLoading(false);
      }
    }
  };

  // We'll use useEffect once when the component mounts to set up the email key
  // And then track changes manually
  useEffect(() => {
    const newEmailKey = generateEmailKey(email);
    const oldEmailKey = currentEmailKeyRef.current;

    // Only generate summary if the email has changed
    if (newEmailKey !== oldEmailKey) {
      currentEmailKeyRef.current = newEmailKey;
      setSummary("");
      setError("");

      if (email.content) {
        generateSummary();
      }
    }
  }, [email.subject, email.from]); // Only dependency is email ID properties, not content

  const handleRefresh = () => {
    generateSummary();
  };

  return (
    <div className="w-full h-full p-5 bg-white rounded-2xl shadow-md">
      <div className="flex justify-between items-center mb-5">
        <button onClick={onBack} className="text-blue-500 flex items-center">
          <FaArrowLeft className="mr-2" />
          Back
        </button>
      </div>
      {/* Email Summary Section */}
      <div className="mt-8 pt-5 border-t">
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-semibold text-lg text-left">AI Summary</h3>
          <button
            onClick={handleRefresh}
            disabled={loading}
            className="text-blue-500 text-sm flex items-center"
          >
            <FaSyncAlt className={`mr-1 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </button>
        </div>

        {loading && (
          <p className="text-gray-500 italic text-left">
            Generating summary...
          </p>
        )}
        {error && (
          <div className="flex flex-col">
            <p className="text-red-500 text-left">Error: {error}</p>
            <button
              onClick={handleRefresh}
              className="text-blue-500 text-sm self-start mt-1"
            >
              Try again
            </button>
          </div>
        )}
        {!loading && !error && summary && (
          <div className="bg-gray-50 p-3 rounded-lg">
            <p className="text-left text-gray-700">{summary}</p>
          </div>
        )}
      </div>
      <div className="border-b pb-3 mb-3">
        <h2 className="font-bold text-2xl text-left">{email.subject}</h2>
        <p className="text-gray-700 text-left">From: {email.from}</p>
        <p className="text-gray-700 text-left">Category: {email.category}</p>
      </div>
      <div className="mt-5 ">
        <iframe className="w-full h-[500px]" srcDoc={email.content} />
      </div>
    </div>
  );
};

export default EmailDetails;