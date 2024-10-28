// Define the ResumeData interface
interface ResumeData {
    name: string;
    email: string;
    phone: string;
    profilePhoto?: File;
    education: string;
    experience: string;
    skills: string;
}

// Form submission handler
document.getElementById('resumeForm')?.addEventListener('submit', function(event) {
    event.preventDefault();  // Prevent form from submitting normally

    // Collect form values
    const nameField = document.getElementById('name') as HTMLInputElement;
    const emailField = document.getElementById('email') as HTMLInputElement;
    const phoneField = document.getElementById('phone') as HTMLInputElement;
    const educationField = document.getElementById('education') as HTMLTextAreaElement;
    const experienceField = document.getElementById('experience') as HTMLTextAreaElement;
    const skillsField = document.getElementById('skills') as HTMLTextAreaElement;
    const profilePhoto = document.getElementById('profilePhoto') as HTMLInputElement;

    if (!nameField || !emailField || !phoneField || !educationField || !experienceField || !skillsField) {
        console.error('Some fields are missing!');
        return;
    }

    const name = nameField.value;
    const email = emailField.value;
    const phone = phoneField.value;
    const education = educationField.value;
    const experience = experienceField.value;
    const skills = skillsField.value;

    // Create resume output with an image at the top
    const resumeOutput = `
        <h2>Generated Resume</h2>
        <div class="profile-photo-container">
            <img src="${URL.createObjectURL(profilePhoto.files![0])}" alt="Profile Photo" class="profile-photo">
        </div>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Education:</strong> ${education}</p>
        <p><strong>Experience:</strong> ${experience}</p>
        <p><strong>Skills:</strong> ${skills}</p>
    `;

    // Display the resume output
    document.getElementById('resumeOutput')!.innerHTML = resumeOutput;

    // Show the shareable section
    document.getElementById('shareableSection')!.style.display = 'block';

    // Generate a shareable link (just as an example)
    const resumeData = {
        name: name,
        email: email,
        phone: phone,
        education: education,
        experience: experience,
        skills: skills
    };

    // Encode the data as a query string
    const resumeDataEncoded = encodeURIComponent(JSON.stringify(resumeData));
    const shareLink = `https://Resumewebsite.com/resume?data=${resumeDataEncoded}`;

    // Show the shareable link in the input field
    (document.getElementById('shareableLink') as HTMLInputElement).value = shareLink;

    // Handle profile photo preview (if available)
    if (profilePhoto?.files[0]) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const imagePreview = document.createElement('img');
            imagePreview.src = e.target!.result as string;
            imagePreview.alt = "Profile Photo";
            imagePreview.className = "profile-photo";
            document.getElementById('resumeOutput')!.appendChild(imagePreview);
        };
        reader.readAsDataURL(profilePhoto.files[0]);
    }
    
    // Copy the link to the clipboard when the "Copy" button is clicked
    document.getElementById('copyButton')?.addEventListener('click', function() {
        const copyText = document.getElementById('shareableLink') as HTMLInputElement;
        copyText.select();
        document.execCommand('copy');
    });

    // Download button functionality
    document.getElementById('downloadBtn')?.addEventListener('click', function() {
        const blob = new Blob([JSON.stringify(resumeData, null, 2)], { type: 'application/json' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'resume.json';
        link.click();
    });
});
