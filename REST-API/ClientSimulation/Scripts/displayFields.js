const updateFormFields = () => {
    var selectedOption = document.getElementById("target-db").value;
    
    // Hide all form fields
    var allFields = document.querySelectorAll("#form-fields > div");
    allFields.forEach(function(field) {
        field.style.display = "none";
    });
    
    // Show the selected form fields
    if (selectedOption === "venue") {
        var venueFields = document.querySelectorAll("#venue-fields");
        venueFields.forEach(function(field) {
            field.style.display = "block";
        });
    } else if (selectedOption === "user") {
        var userFields = document.querySelectorAll("#user-fields");
        userFields.forEach(function(field) {
            field.style.display = "block";
        });
    } else if (selectedOption === "photo") {
        var photoFields = document.querySelectorAll("#photo-fields");
            photoFields.forEach(function(field) {
            field.style.display = "block";
        });
    }
}

// Run the function initially to show the default fields
updateFormFields();