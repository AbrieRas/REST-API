const getRecord = () => {
    const targetedDatabase = document.getElementById('target-db').value;
    const record = {};

    if (targetedDatabase === 'venue') {
        record.id = document.getElementById('venue-id').value;
        record.name = document.getElementById('venue-name').value;
        record['length'] = document.getElementById('venue-length').value;
        record.width = document.getElementById('venue-width').value;
        record.sqMeters = document.getElementById('venue-sqMeters').value;
        record.address = document.getElementById('venue-address').value;
    } else if (targetedDatabase === 'user') {
        record.id = document.getElementById('user-id').value;
        record.username = document.getElementById('user-username').value;
        record.password = document.getElementById('user-password').value;
        record.email = document.getElementById('user-email').value;
    } else if (targetedDatabase === 'photo') {
        record.id = document.getElementById('photo-id').value;
        record.venueId = document.getElementById('photo-venueId').value;
        record.authorId = document.getElementById('photo-authorId').value;
        record.url = document.getElementById('photo-url').value;
    }

    return record;
};