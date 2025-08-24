// Load saved profile on page load
window.onload = function () {
    const savedName = localStorage.getItem("fullName");
    const savedEmail = localStorage.getItem("email");
    const savedRole = localStorage.getItem("role");
    const savedImage = localStorage.getItem("profileImage");

    if (savedName) document.getElementById("fullName").value = savedName;
    if (savedEmail) document.getElementById("email").value = savedEmail;
    if (savedRole) document.getElementById("role").value = savedRole;
    if (savedImage) document.getElementById("profileImage").src = savedImage;
};

// Handle profile picture upload preview
document.getElementById("uploadImage").addEventListener("change", function (event) {
    const reader = new FileReader();
    reader.onload = function () {
        document.getElementById("profileImage").src = reader.result;
        localStorage.setItem("profileImage", reader.result);
    };
    reader.readAsDataURL(event.target.files[0]);
});

// Save profile details
document.getElementById("profileForm").addEventListener("submit", function (e) {
    e.preventDefault();
    
    const fullName = document.getElementById("fullName").value;
    const email = document.getElementById("email").value;
    const role = document.getElementById("role").value;

    if (!email.endsWith("@ust-legazpi.edu.ph")) {
        alert("Please use your official UST-Legazpi email.");
        return;
    }

    localStorage.setItem("fullName", fullName);
    localStorage.setItem("email", email);
    localStorage.setItem("role", role);

    alert("Profile saved successfully!");
});
