// Function to hide the table
const hideTableAndButton = () => {
    const dataTable = document.getElementById("dataTable");
    dataTable.style.display = "none";

    const hideButton = document.getElementById("hideButton");
    hideButton.style.display = "none";
}

const retrieveData = () => {
    const inputVenue = document.getElementById("target-db").value;
    // Add your code to handle the "Retrieve Information" button functionality
    console.log("Retrieving information: " + inputVenue.toString());

    // API GET
    // Create an instance of the URL class
    const url = new URL('http://localhost:4001');
    url.pathname = "/data";
    const params = new URLSearchParams();
    params.set("venue", inputVenue);
    url.search = params;

    const xhr = new XMLHttpRequest();
    xhr.open('GET', url.toString());
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                const data = JSON.parse(xhr.responseText);
                console.log('Data:', data);
                // Call the appropriate populateData function based on the selected value
                if (inputVenue === 'venue') {
                    populateVenueData(data.data);
                } else if (inputVenue === 'user') {
                    populateUserData(data.data);
                } else if (inputVenue === 'photo') {
                    populatePhotoData(data.data);
                } else {
                    console.error('Invalid target-db value');
                }
            } else {
                console.error('Failed to retrieve data');
            }
        }
    }
    xhr.send();
};
