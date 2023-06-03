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

// Add a new record to the database
const addRecord = (record, databaseType) => {
    const database = readDatabase(getFilePathByDatabaseType(databaseType));
    database.push(record);
    writeToDatabase(getFilePathByDatabaseType(databaseType), database);
};

const deleteRecordByKey = (key, value, databaseType, targetAllRecords = false) => {
    try {
        const database = readDatabase(getFilePathByDatabaseType(databaseType));

        let updatedDatabase;
        if (targetAllRecords) {
            updatedDatabase = database.filter(record => record[key] !== value);
        } else {
            const index = database.findIndex(record => record[key] === value);
            if (index !== -1) {
                updatedDatabase = [...database.slice(0, index), ...database.slice(index + 1)];
            } else {
                console.log(`INTERNAL SERVER ERROR: deleteRecordByKey: [WARN] No record matching the specified key-value pair found: ${key}:${value}`);
                return 'error';
            }
        }

        writeToDatabase(getFilePathByDatabaseType(databaseType), updatedDatabase);
        return 'success';
    } catch (error) {
        console.log(`INTERNAL SERVER ERROR: deleteRecordByKey: The record could not be deleted: ${error}`);
    }
};

const updateRecordByKey = (key, value, updatedRecord, databaseType, targetAllRecords = false) => {
    try {
        const database = readDatabase(getFilePathByDatabaseType(databaseType));
        let recordUpdated = false;

        const updatedDatabase = database.map(record => {
            if (record[key] === value) {
                if (targetAllRecords || !recordUpdated) {
                    recordUpdated = true;
                    return { ...record, ...updatedRecord };
                }
            }
            return record;
        });

        if (!recordUpdated && !targetAllRecords) {
            console.error(`INTERNAL SERVER ERROR: updateRecordByKey: [WARN] No record matching the specified key-value pair found: ${key}:${value}`);
        }

        writeToDatabase(getFilePathByDatabaseType(databaseType), updatedDatabase);
    } catch (error) {
        console.error(`INTERNAL SERVER ERROR: updateRecordByKey: The record could not be updated: ${error}`);
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
            console.error(`INTERNAL SERVER ERROR: getAllRecords: Invalid databaseType: ${databaseType}`);
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

// const allRecords = getAllRecords('user');
// console.table(allRecords);

module.exports = { getAllRecords, addRecord, updateRecordByKey, deleteRecordByKey };