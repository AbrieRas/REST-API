const addData = () => {
    // Get field values
    const targetedDatabase = document.getElementById('target-db').value;
    const record = getRecord();
    
    // TEMP
    console.log('Adding:');
    console.log(record);
    
    // API POST: Handle the "Add" button functionality
    // Create an instance of the URL class
    const url = new URL('http://localhost:4001');
    url.pathname = "/data";
    const params = new URLSearchParams();
    params.set('venue', targetedDatabase);
    url.search = params;

    const xhr = new XMLHttpRequest();
    xhr.open('POST', url.toString());
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 201) {
                console.log('Data added successfully');
            } else {
                console.error('Failed to add data');
            }
        }
    };
    xhr.send(JSON.stringify(record));
};
