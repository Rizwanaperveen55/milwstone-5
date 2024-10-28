var _a;
// Form submission handler
(_a = document.getElementById('resumeForm')) === null || _a === void 0 ? void 0 : _a.addEventListener('submit', function (event) {
    var _a, _b;
    event.preventDefault(); // Prevent form from submitting normally
    // Collect form values
    var nameField = document.getElementById('name');
    var emailField = document.getElementById('email');
    var phoneField = document.getElementById('phone');
    var educationField = document.getElementById('education');
    var experienceField = document.getElementById('experience');
    var skillsField = document.getElementById('skills');
    var profilePhoto = document.getElementById('profilePhoto');
    if (!nameField || !emailField || !phoneField || !educationField || !experienceField || !skillsField) {
        console.error('Some fields are missing!');
        return;
    }
    var name = nameField.value;
    var email = emailField.value;
    var phone = phoneField.value;
    var education = educationField.value;
    var experience = experienceField.value;
    var skills = skillsField.value;
    // Create resume output with an image at the top
    var resumeOutput = "\n        <h2>Generated Resume</h2>\n        <div class=\"profile-photo-container\">\n            <img src=\"".concat(URL.createObjectURL(profilePhoto.files[0]), "\" alt=\"Profile Photo\" class=\"profile-photo\">\n        </div>\n        <p><strong>Name:</strong> ").concat(name, "</p>\n        <p><strong>Email:</strong> ").concat(email, "</p>\n        <p><strong>Phone:</strong> ").concat(phone, "</p>\n        <p><strong>Education:</strong> ").concat(education, "</p>\n        <p><strong>Experience:</strong> ").concat(experience, "</p>\n        <p><strong>Skills:</strong> ").concat(skills, "</p>\n    ");
    // Display the resume output
    document.getElementById('resumeOutput').innerHTML = resumeOutput;
    // Show the shareable section
    document.getElementById('shareableSection').style.display = 'block';
    // Generate a shareable link (just as an example)
    var resumeData = {
        name: name,
        email: email,
        phone: phone,
        education: education,
        experience: experience,
        skills: skills
    };
    // Encode the data as a query string
    var resumeDataEncoded = encodeURIComponent(JSON.stringify(resumeData));
    var shareLink = "https://Resumewebsite.com/resume?data=".concat(resumeDataEncoded);
    // Show the shareable link in the input field
    document.getElementById('shareableLink').value = shareLink;
    // Handle profile photo preview (if available)
    if (profilePhoto === null || profilePhoto === void 0 ? void 0 : profilePhoto.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            var imagePreview = document.createElement('img');
            imagePreview.src = e.target.result;
            imagePreview.alt = "Profile Photo";
            imagePreview.className = "profile-photo";
            document.getElementById('resumeOutput').appendChild(imagePreview);
        };
        reader.readAsDataURL(profilePhoto.files[0]);
    }
    // Copy the link to the clipboard when the "Copy" button is clicked
    (_a = document.getElementById('copyButton')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', function () {
        var copyText = document.getElementById('shareableLink');
        copyText.select();
        document.execCommand('copy');
    });
    // Download button functionality
    (_b = document.getElementById('downloadBtn')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', function () {
        var blob = new Blob([JSON.stringify(resumeData, null, 2)], { type: 'application/json' });
        var link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'resume.json';
        link.click();
    });
});
