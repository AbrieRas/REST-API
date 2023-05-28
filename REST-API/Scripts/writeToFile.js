const fs = require('fs/promises');

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

/**
 * Creates/overwrites file in path and then stores object data from second param.
 * @param {string} path - The path to the file to write.
 * @param {string} object - Object to store in path param.
 */
module.exports = { storeDataInJsonFile };