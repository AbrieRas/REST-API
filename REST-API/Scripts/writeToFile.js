const fs = require('fs');

const asyncStoreDataInJsonFile = async (pathToSave, data) => {
    const stringifiedData = JSON.stringify(data);
    try {
        await fs.writeFile(pathToSave, stringifiedData);
    } catch (err) {
        console.log('There was an error writing data to a JSON file.\n\nError: ' + err);
    }
}

const storeDataInJsonFile = async (pathToSave, data) => {
    try {
        const result = await asyncStoreDataInJsonFile(pathToSave, data);
    } catch (error) {
        console.log('storeDataCaller: Something went wrong with storing data: ' + error)
    }
};

// Write the updated data back to the database file
const writeToDatabase = (pathToDatabase, data) => {
    try {
        fs.writeFileSync(pathToDatabase, JSON.stringify(data, null, 2));
    } catch (error) {
        console.error('Error writing to database:', error);
    }
};

/**
 * Creates/overwrites file in path and then stores object data from second param.
 * @param {string} path - The path to the file to write.
 * @param {string} object - Object to store in path param.
 */
module.exports = { storeDataInJsonFile };

/**
 * 
 * 
 */
module.exports = { writeToDatabase };