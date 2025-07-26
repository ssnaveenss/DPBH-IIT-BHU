Dark Pattern Buster – Chrome Extension
What are Dark Patterns on Websites?
Dark patterns are design tricks used on websites or apps to manipulate users into doing things they might not want to — like:
•	Subscribing to a service unknowingly
•	Clicking on fake close buttons
•	Getting trapped in confusing popups
•	Making it hard to cancel subscriptions
These patterns are unethical and often target non-tech-savvy users.
________________________________________
Project Overview:
Hackathon: IIT BHU DBPH, Oct 2023
Achievement: Secured 3rd place in semi-finals, presented to Central Govt. Officials
We created a Chrome extension called Dark Pattern Buster that automatically detects and blocks dark patterns on websites using machine learning and DOM/CSS manipulation.
________________________________________
What This Project Does :
•	It scans websites for dark patterns like tricky popups, fake buttons, or hidden links.
•	Then, it hides or removes those elements in real-time.
•	The goal is to protect users from being tricked and make the web experience more transparent and safe, especially for common users.
________________________________________
Tech Used :
Frontend & Extension Setup:
•	HTML, CSS, JavaScript – Created the popup UI and background logic.
•	Chrome Extension APIs – Helped us inject scripts into any active webpage.
Key Files:
•	manifest.json: Sets up permissions (e.g., access to webpage content)
•	content.js: Scans webpage and blocks patterns.
•	background.js: Runs background tasks and handles logic triggers.
________________________________________
Machine Learning – Dark Pattern Detection:
•	Trained a Random Forest model using Python (Scikit-learn).
•	The model learned how dark patterns are structured using:
o	HTML tags and layout
o	Class names like subscribe-popup, modal-hidden, etc.
o	Visual clues (e.g., misleading colors, pre-checked boxes)
The model was exported and used in the extension to identify shady design elements.
________________________________________
Blocking Popups Using JavaScript:
•	We used MutationObserver to detect DOM changes.
•	Suspicious elements (modals, overlays) were:
o	Hidden using style.display = "none"
o	Or removed using element.remove()
This helped clean the user interface without breaking the page.
________________________________________
How to Use the Extension (For Testing):
1.	Open chrome://extensions in your Chrome browser.
2.	Turn ON Developer Mode (top-right toggle).
3.	Click on "Load unpacked".
4.	Select the folder containing the extension files (manifest.json, etc.).
5.	Visit any website — the extension will automatically start checking and cleaning the page!
________________________________________
Why This Project Stands Out:
•	Unique Blend: Combined frontend tech + ML + browser automation.
•	Social Impact: Makes the internet safer by eliminating deceptive design.
•	Scalable Idea: Can be extended to mobile browsers, Firefox, or used for accessibility tools.
•	Hackathon-Ready: Designed and built from scratch in just 36 hours.
________________________________________

“Chose Random Forest because it’s a powerful and easy-to-tune algorithm that performs well with structured data like HTML tag patterns, class names, and attribute values.
It’s also great at handling non-linear decision boundaries, which makes it perfect for detecting complex and varied design tricks used in dark patterns.
Another key reason was its explainability. Since Random Forest is based on decision trees, we could actually trace which features (like certain class names or button texts) 
were contributing most to the model’s prediction — that helped us debug and improve the detection.
And finally, it’s fast and doesn’t need a GPU, which was perfect for running lightweight inference within a browser extension without slowing down the page.”

  •	Good for small-to-medium datasets (which is often the case with niche things like dark pattern datasets).
  •	Low risk of overfitting compared to plain decision trees.
  •	Works well without heavy feature scaling or preprocessing, so it saved us time during hackathon development.

Random Forest gave us the best balance between accuracy, speed, and interpretability — ideal for a real-time Chrome extension.”

