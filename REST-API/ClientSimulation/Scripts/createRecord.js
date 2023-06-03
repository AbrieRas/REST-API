const getRecord = () => {
    const targetedDatabase = document.getElementById('target-db').value;

    let record = {};
    if (targetedDatabase === 'venue') {
        const searchForId = document.getElementById('venue-id').value;
        record = {
            id: searchForId.toString(),
            name: 'Test venue',
            length: Math.floor(Math.random()*20),
            width: Math.floor(Math.random()*20),
            sqMeters: Math.floor(Math.random()*600),
            address: 'Test address: ' + new Date().getDate()
        };
    } else if (targetedDatabase === 'user') {
        searchForId = document.getElementById('user-id').value;
    } else if (targetedDatabase === 'photo') {
        searchForId = document.getElementById('photo-id').value;
    }
};