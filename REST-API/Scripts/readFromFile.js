const fs = require('fs/promises');

const readFromFileForItems = async (path, searchItem='') => {
    try {
        const data = await fs.readFile(path, 'utf8');
        const jsonData = JSON.parse(data);

        // Return all data if no searchItem
        if (searchItem === '') {
            console.log('INSIDE IF') // TEMP
            console.log(jsonData); // TEMP
            return jsonData;
        }

        const getSearchItemCallback = key => {
            // Exit .map if searchItem doesn't exist
            if (!jsonData[key][searchItem] && searchItem != '') {
                throw new Error("readFromFileForItems: Couldn't find the object key: " + searchItem);
            }
            return jsonData[key][searchItem];
        };

        const searchItemvalues = Object.keys(jsonData).map(getSearchItemCallback);
        console.log(searchItem + ': ', searchItemvalues); // TEMP
        return searchItemvalues;
    } catch (error) {
        console.log('Something went wrong: ' + error);
    }
};

/**
 * Reads file and returns its content. If second param is given, function returns content of all Object.secondParam
 * @param {string} path - The path to the file to read.
 * @param {string} searchItem - The object's key to search for.
 * @returns {number} Object of data.
 */
module.exports = { readFromFileForItems };