// Show welcome alert when page loads
window.onload = function () {
    console.log("Smart Academic Scheduler Loaded Successfully");
}

// Add click event to login button
document.addEventListener("DOMContentLoaded", function () {

    const loginBtn = document.querySelector(".login-btn");

    loginBtn.addEventListener("click", function () {
        alert("Redirecting to Login Page...");
    });

});