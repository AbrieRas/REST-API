const updateData = () => {
    const inputTargetedDb = document.getElementById("target-db").value;
    const inputId = document.getElementById("search-for-id").value;
    const inputUpdatedId = document.getElementById("updated-id").value;
    const inputTargetAllRecords = document.querySelector("#replace-all");
    // Add your code to handle the "Update" button functionality
    console.log('Updating data:'
        + '\nvenue: ' + inputTargetedDb.toString()
        + '\nid: ' + inputId.toString()
        + '\nupdated-id: ' + inputUpdatedId.toString()
        + '\ntarget-all-records: ' + inputTargetAllRecords.checked);

    // API PUT
    const record = {
        id: inputUpdatedId.toString(),
        name: 'Test venue',
        length: Math.floor(Math.random()*20),
        width: Math.floor(Math.random()*20),
        sqMeters: Math.floor(Math.random()*600),
        address: 'Test address v2: ' + new Date().getDate()
    };

    const url = new URL('http://localhost:4001');
    url.pathname = "/data";
    const params = new URLSearchParams();
    params.set("venue", inputTargetedDb.toString());
    params.set("id", inputId.toString());
    params.set("target-all-records", inputTargetAllRecords.checked);
    url.search = params;

    const xhr = new XMLHttpRequest();
    xhr.open('PUT', url.toString());
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                console.log('Data updated successfully');
            } else {
                console.error('Failed to update data');
            }
        }
    };
    xhr.send(JSON.stringify(record));
};
