// Function to retrieve and display the data
const populateData = (data) => {
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
  
    // Show the table
    dataTable.style.display = "table";
    hideButton.style.display = "inline-block";
  }
  
  
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
                populateData(data.data);
            } else {
                console.error('Failed to retrieve data');
            }
        }
    }
    xhr.send();
}