const BACKEND_URL = "http://127.0.0.1:5000/";

document.addEventListener("DOMContentLoaded", () => {
  const generateEmailButton = document.getElementById("generateEmail");
  const emailDisplay = document.getElementById("emailDisplay");
  const fillEmailButton = document.getElementById("fillEmail");

  generateEmailButton.addEventListener("click", async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/create-email`);
      console.log("Response status:", response.status);

      if (!response.ok) {
        // Log the error text from the response if available
        const errorText = await response.text();
        console.error("HTTP error:", response.status, errorText);
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Response data:", data);

      if (data && data.email) {
        emailDisplay.innerText = data.email;
      } else {
        throw new Error("No email returned from backend.");
      }
    } catch (error) {
      console.error("Error generating email:", error);
      emailDisplay.innerText = "Error generating email";
    }
  });

  fillEmailButton.addEventListener("click", () => {
    const email = emailDisplay.innerText;
    if (!email || email.startsWith("Error")) {
      alert("Please generate a valid email first!");
      return;
    }
    // Get the currently active tab and execute a script to fill the email field
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]?.id) {
        chrome.scripting.executeScript({
          target: { tabId: tabs[0].id },
          function: fillEmailField,
          args: [email]
        });
      }
    });
  });
});

// This function runs in the context of the current page
function fillEmailField(email) {
  // Try to find an input field with type="email"
  const emailField = document.querySelector("input[type='email']");
  if (emailField) {
    emailField.value = email;
  } else {
    alert("No email field found on this page.");
  }
}
