// =================================
// Implementations
// =================================
const fs = require('fs');
const path = require('path');
const { readDatabase } = require('./readFromFile.js');
const { writeToDatabase } = require('./writeToFile.js');
const { createRandomIds, getFilePathByDatabaseType } = require('./utility.js');

// =================================
// File paths
// =================================
const filePathToVenues = path.join(__dirname, '..', 'Data', 'Venues.json');
const filePathToUsers = path.join(__dirname, '..', 'Data', 'Users.json');
const filePathToPhotos = path.join(__dirname, '..', 'Data', 'Photos.json');

// // Function to read the entire database file
// const readDatabase = () => {
//     try {
//         const data = fs.readFileSync('database.json');
//         return JSON.parse(data);
//     } catch (error) {
//         console.error('Error reading database:', error);
//         return [];
//     }
// };

// // Function to write the updated data back to the database file
// const writeToDatabase = (data) => {
//     try {
//         fs.writeFileSync('database.json', JSON.stringify(data, null, 2));
//     } catch (error) {
//         console.error('Error writing to database:', error);
//     }
// };

// Add a new record to the database
const addRecord = (record, databaseType) => {
    const database = readDatabase(getFilePathByDatabaseType(databaseType));
    database.push(record);
    writeToDatabase(getFilePathByDatabaseType(databaseType), database);
};

// Delete a record from the database based on its ID
const deleteRecordByKey = (key, value, databaseType) => {
    try {
        const database = readDatabase(getFilePathByDatabaseType(databaseType));
        // const updatedDatabase = database.filter(record => record.id !== recordId);
        const updatedDatabase = database.filter(record => record[key] !== value);
        writeToDatabase(getFilePathByDatabaseType(databaseType), updatedDatabase);
    } catch (error) {
        console.error(`deleteRecordByKey: The record could not be deleted: ${error}`);
    }
};

const updateRecordByKey = (key, value, updatedRecord, databaseType, updateFirstRecord = false) => {
    try {
        const database = readDatabase(getFilePathByDatabaseType(databaseType));
        let recordUpdated = false;

        const updatedDatabase = database.map(record => {
        if (!recordUpdated && record[key] === value) {
            recordUpdated = true;
            return { ...record, ...updatedRecord };
        }
            return record;
        });
  
        if (!recordUpdated && updateFirstRecord) {
            console.error(`updateRecordByKey: [WARN] No record matching the specified key-value pair found.`);
        }

        writeToDatabase(getFilePathByDatabaseType(databaseType), updatedDatabase);
    } catch (error) {
        console.error(`updateRecordByKey: The record could not be updated: ${error}`);
    }
};


// Retrieve all records from the database
const getAllRecords = (databaseType) => {
    let filepath = '';
    switch (databaseType) {
        case 'venue':
            filepath = filePathToVenues;
            break;
        case 'user':
            filepath = filePathToUsers;
            break;
        case 'photo':
            filepath = filePathToPhotos;
            break;
        default:
            console.error(`getAllRecords: Invalid databaseType: ${databaseType}`);
            return;
    }
    return readDatabase(filepath);
};

// ===> Usage examples
// const record = {
//     id: createRandomIds(1)[0],
//     name: 'Test venue',
//     length: 25,
//     width: 25,
//     sqMeters: 625,
//     address: 'Test address'
// };

/**
 * Adds a record to a database with the provided input.
 *
 * @param {object} record - Add input in database.
 * @param {string} databaseType - Target a database.
 */
// addRecord(record, 'venue');

/**
 * Removes a record from a database matching the key and value inputs.
 *
 * @param {string} key - Search for record in database.
 * @param {string} value - Search for record in database. Input-against-key.
 * @param {string} databaseType - Target a database.
 */
// deleteRecordByKey('name', 'Test venue', 'venue');

// const updatedRecord = {
//     id: createRandomIds(1)[0],
//     name: 'Test venue v3',
//     length: 25,
//     width: 25,
//     sqMeters: 625,
//     address: 'Test address'
// };

/**
 * Updates a user record from the database based on the provided key, value and
 * updateFirstRecord.
 *
 * @param {string} key - Search for record in database.
 * @param {string} value - Search for record in database. Input-against-key.
 * @param {object} updatedRecord - Replace all matching keys with updated values.
 * @param {string} databaseType - Target a database.
 * @param {boolean} updateFirstRecord - (Optional) Defaulted to false. Changes
 *  first record (true) or all records (false) found.
 */
// updateRecordByKey('name', 'Test venue', updatedRecord, 'venue', true);

const allRecords = getAllRecords('venue');
console.table(allRecords);