// Function to populate the table with venue data
const populateVenueData = (data) => {
    const dataTable = document.getElementById("dataTable");
    const hideButton = document.getElementById("hideButton");
    const dataRows = document.getElementById("dataRows");

    // Clear previous data rows
    dataRows.innerHTML = "";

    // Populate the table with data
    data.forEach(record => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${record.id}</td>
            <td>${record.name}</td>
            <td>${record.length}</td>
            <td>${record.width}</td>
            <td>${record.sqMeters}</td>
            <td>${record.address}</td>
        `;
        dataRows.appendChild(row);
    });

    // Show the table and header if there is data
    if (data.length > 0) {
        dataTable.style.display = "table";
        hideButton.style.display = "inline-block";

        // Add the header row
        const headerRow = document.createElement("tr");
        headerRow.innerHTML = `
            <th>ID</th>
            <th>Name</th>
            <th>Length</th>
            <th>Width</th>
            <th>Square Meters</th>
            <th>Address</th>
        `;
        dataRows.insertBefore(headerRow, dataRows.firstChild);
    } else {
        // Hide the table and header if there is no data
        dataTable.style.display = "none";
        hideButton.style.display = "none";
    }
};

// Function to populate the table with user data
const populateUserData = (data) => {
    const dataTable = document.getElementById("dataTable");
    const hideButton = document.getElementById("hideButton");
    const dataRows = document.getElementById("dataRows");

    // Clear previous data rows
    dataRows.innerHTML = "";

    // Populate the table with data
    data.forEach(record => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${record.id}</td>
            <td>${record.username}</td>
            <td>${record.password}</td>
            <td>${record.email}</td>
        `;
        dataRows.appendChild(row);
    });

    // Show the table and header if there is data
    if (data.length > 0) {
        dataTable.style.display = "table";
        hideButton.style.display = "inline-block";

        // Add the header row
        const headerRow = document.createElement("tr");
        headerRow.innerHTML = `
            <th>ID</th>
            <th>Username</th>
            <th>Password</th>
            <th>Email</th>
        `;
        dataRows.insertBefore(headerRow, dataRows.firstChild);
    } else {
        // Hide the table and header if there is no data
        dataTable.style.display = "none";
        hideButton.style.display = "none";
    }
};

// Function to populate the table with photo data
const populatePhotoData = (data) => {
    const dataTable = document.getElementById("dataTable");
    const hideButton = document.getElementById("hideButton");
    const dataRows = document.getElementById("dataRows");

    // Clear previous data rows
    dataRows.innerHTML = "";

    // Populate the table with data
    data.forEach(record => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${record.id}</td>
            <td>${record.venueId}</td>
            <td>${record.authorId}</td>
            <td>${record.url}</td>
        `;
        dataRows.appendChild(row);
    });

    // Show the table and header if there is data
    if (data.length > 0) {
        dataTable.style.display = "table";
        hideButton.style.display = "inline-block";

        // Add the header row
        const headerRow = document.createElement("tr");
        headerRow.innerHTML = `
            <th>ID</th>
            <th>Venue ID</th>
            <th>Author ID</th>
            <th>URL</th>
        `;
        dataRows.insertBefore(headerRow, dataRows.firstChild);
    } else {
        // Hide the table and header if there is no data
        dataTable.style.display = "none";
        hideButton.style.display = "none";
    }
};
  
  
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
}