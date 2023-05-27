const fs = require('fs/promises');
const path = require('path');

const filePathToVenues = path.join(__dirname, '..', 'Data', 'Venues.json');

const readFromFile = async (path, searchItem='id') => {
    try {
        const data = await fs.readFile(path, 'utf8');
        const jsonData = JSON.parse(data);

        // Switch for callback function based of searchItem
        const getSearchItemCallback = key => {
            return jsonData[key].sqMeters;
        };

        const ids = Object.keys(jsonData).map(getSearchItemCallback);
        console.log('IDs:', ids);
    } catch(error) {
        console.log('Something went wrong: ' + error);
    }
};

readFromFile(filePathToVenues);
