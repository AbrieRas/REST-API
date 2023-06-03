const addData = () => {
    // Get field values
    const targetedDatabase = document.getElementById('target-db').value;
    const record = {};
    // if (targetedDatabase === 'venue') {
    //     const searchForId = document.getElementById('venue-id').value;
    //     record = {
    //         id: searchForId.toString(),
    //         name: 'Test venue',
    //         length: Math.floor(Math.random()*20),
    //         width: Math.floor(Math.random()*20),
    //         sqMeters: Math.floor(Math.random()*600),
    //         address: 'Test address: ' + new Date().getDate()
    //     };
    // } else if (targetedDatabase === 'user') {
    //     searchForId = document.getElementById('user-id').value;
    // } else if (targetedDatabase === 'photo') {
    //     searchForId = document.getElementById('photo-id').value;
    // }
    
    // API POST: Handle the "Add" button functionality
    // console.log('Adding:'
    //     + '\nvenue: ' + targetedDatabase.toString()
    //     + '\nid: ' + searchForId.toString());

    // API POST

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
}