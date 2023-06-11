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
