const removeData = () => {
    const inputVenue = document.getElementById("target-db").value;
    const inputId = document.getElementById("search-for-id").value;
    const inputUpdatedId = document.getElementById("updated-id").value;
    const inputTargetAllRecords = document.querySelector("#replace-all");
    // Handle the "Remove" button functionality
    console.log('Updating data:'
        + '\nvenue: ' + inputVenue.toString()
        + '\nid: ' + inputId.toString()
        + '\ntarget-all-records: ' + inputTargetAllRecords.checked);

    // API REMOVE
    const url = new URL('http://localhost:4001');
    url.pathname = "/data";
    const params = new URLSearchParams();
    params.set("venue", inputVenue.toString());
    params.set("id", inputId.toString());
    params.set("target-all-records", inputTargetAllRecords.checked);
    url.search = params;

    const xhr = new XMLHttpRequest();
    xhr.open('DELETE', url.toString());
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                console.log('Data deleted successfully');
            } else {
                console.error('Failed to delete data');
            }
        }
    };
    xhr.send();
};
