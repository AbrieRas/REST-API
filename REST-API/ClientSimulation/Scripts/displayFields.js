const updateFormFields = () => {
    const selectedOption = document.getElementById("target-db").value;
    
    // Hide all form fields
    const allFields = document.querySelectorAll("#form-fields > div");
    allFields.forEach(function(field) {
        field.style.display = "none";
    });
    
    // Show the selected form fields
    if (selectedOption === "venue") {
        const venueFields = document.querySelectorAll("#venue-fields");
        venueFields.forEach(function(field) {
            field.style.display = "block";
        });
    } else if (selectedOption === "user") {
        const userFields = document.querySelectorAll("#user-fields");
        userFields.forEach(function(field) {
            field.style.display = "block";
        });
    } else if (selectedOption === "photo") {
        const photoFields = document.querySelectorAll("#photo-fields");
        photoFields.forEach(function(field) {
            field.style.display = "block";
        });
    }
}