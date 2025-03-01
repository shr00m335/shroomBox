const BACKEND_URL = "http://127.0.0.1:5000/";
const TEST_EMAIL = "test@example.com"; // Fallback email for testing

document.addEventListener("DOMContentLoaded", () => {
  const generateEmailButton = document.getElementById("generateEmail");
  const emailDisplay = document.getElementById("emailDisplay");
  const fillEmailButton = document.getElementById("fillEmail");

  generateEmailButton.addEventListener("click", async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/create-email`);
      console.log("Response status:", response.status);

      if (!response.ok) {
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
      emailDisplay.innerText = TEST_EMAIL; // Use fallback email for testing
    }
  });

  fillEmailButton.addEventListener("click", () => {
    const email = emailDisplay.innerText;
    if (!email || email.startsWith("Error")) {
      alert("Please generate a valid email first!");
      return;
    }
    // Get the currently active tab and execute a script to fill the fields
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]?.id) {
        chrome.scripting.executeScript({
          target: { tabId: tabs[0].id },
          function: fillFormFields,
          args: [email]
        });
      }
    });
  });
});

// This function runs in the context of the current page
function fillFormFields(email) {
  const maxAttempts = 5;
  let attempts = 0;
  
  const intervalId = setInterval(() => {
    // Utility to set field value and dispatch events
    const setField = (field, value) => {
      if (field) {
        field.value = value;
        field.dispatchEvent(new Event('input', { bubbles: true }));
        field.dispatchEvent(new Event('change', { bubbles: true }));
      }
    };

    // Find and fill email field
    let emailField = document.querySelector("input[type='email']");
    if (!emailField) {
      emailField = document.querySelector("input[placeholder*='Email']");
    }
    setField(emailField, email);

    // Find and fill password field with a hard-coded password
    let passwordField = document.querySelector("input[type='password']");
    if (!passwordField) {
      passwordField = document.querySelector("input[placeholder*='Password']");
    }
    setField(passwordField, "'2j!)e75Z1R,");

    // Find and fill date-of-birth fields (split fields)
    let dobDayField = document.querySelector("input[name='dateOfBirth-D']");
    let dobMonthField = document.querySelector("input[name='dateOfBirth-M']");
    let dobYearField = document.querySelector("input[name='dateOfBirth-Y']");
    
    if (dobDayField && dobMonthField && dobYearField) {
      setField(dobDayField, "01");
      setField(dobMonthField, "01");
      setField(dobYearField, "1990");
    } else {
      // Alternatively, look for a single date field
      let dobField = document.querySelector("input[type='date']");
      if (!dobField) {
        dobField = document.querySelector("input[placeholder*='Birth']");
      }
      setField(dobField, "1990-01-01");
    }

    // Find and fill first name field
    let firstNameField = document.querySelector("input[name='first-name']");
    if (!firstNameField) {
      firstNameField = document.querySelector("input[placeholder*='First name']");
    }
    setField(firstNameField, "Josh");

    // Find and fill last name field
    let lastNameField = document.querySelector("input[name='last-name']");
    if (!lastNameField) {
      lastNameField = document.querySelector("input[placeholder*='Last name']");
    }
    setField(lastNameField, "Ian");
    
    attempts++;
    // If at least one field is filled or we've attempted max times, clear the interval.
    if (
      emailField || 
      passwordField || 
      dobDayField || 
      dobMonthField || 
      dobYearField || 
      firstNameField || 
      lastNameField || 
      attempts >= maxAttempts
    ) {
      clearInterval(intervalId);
      if (!emailField) {
        alert("Email field not found on this page.");
      }
      // Optionally, you can add alerts for other fields if needed.
    }
  }, 500); // check every 500ms
}
