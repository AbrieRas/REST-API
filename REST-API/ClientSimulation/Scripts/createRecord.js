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
        record.name = document.getElementById('user-username').vlaue;
        record['length'] = document.getElementById('user-password').value;
        record.width = document.getElementById('user-email').value;
    } else if (targetedDatabase === 'photo') {
        record.id = document.getElementById('photo-id').value;
        record.name = document.getElementById('photo-venueId').vlaue;
        record['length'] = document.getElementById('photo-authorId').value;
        record.width = document.getElementById('photo-url').value;
    }

    return record;
};