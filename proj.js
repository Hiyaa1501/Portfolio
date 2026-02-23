document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('feedbackForm');
    const feedbackDisplay = document.getElementById('feedbackDisplay');

    // 1. Load existing feedback from LocalStorage
    const loadFeedback = () => {
        const savedFeedback = JSON.parse(localStorage.getItem('userFeedback')) || [];
        feedbackDisplay.innerHTML = savedFeedback.map(fb => `
            <div class="feedback-item">
                <strong>${fb.name}</strong> (${fb.email}): 
                <p>${fb.message}</p>
            </div>
        `).join('');
    };

    loadFeedback();

    // 2. Form Submission & Validation
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('userName').value.trim();
        const email = document.getElementById('userEmail').value.trim();
        const message = document.getElementById('userMessage').value.trim();
        const status = document.getElementById('formMessage');

        // Simple Validation
        if (name === "" || email === "" || message === "") {
            status.innerText = "Please fill in all fields.";
            status.style.color = "red";
            return;
        }

        // Create feedback object
        const newFeedback = { name, email, message };

        // Save to LocalStorage
        const existingFeedback = JSON.parse(localStorage.getItem('userFeedback')) || [];
        existingFeedback.push(newFeedback);
        localStorage.setItem('userFeedback', JSON.stringify(existingFeedback));

        // DOM Manipulation: Success Message
        status.innerText = "Thank you! Feedback submitted successfully.";
        status.style.color = "lightgreen";

        // Reset and Refresh
        form.reset();
        loadFeedback();
    });
});
