// ===> implementations
const path = require('path');
const argon2 = require('argon2');

// =================================
// File paths
// =================================
const filePathToVenues = path.join(__dirname, '..', 'Data', 'Venues.json');
const filePathToUsers = path.join(__dirname, '..', 'Data', 'Users.json');
const filePathToPhotos = path.join(__dirname, '..', 'Data', 'Photos.json');

// ===> Re-use functions
// Create ten random numbers between inputs
const createRandomNumbers = (start, end, repeatTimes=10) => {
    let numbers = [];
    let randomNumber = 0;

    for (let i=0; i<repeatTimes; i++) {
        randomNumber = Math.floor(Math.random() * (end - start)) + start;
        numbers.push(randomNumber);
    }

    return numbers;
};

// Multiply two numbers from two arrays and return single array with results
const multiplyTwoArrays = (arrayOne, arrayTwo) => {
    let results = [];

    for (let i = 0; i < arrayOne.length; i++) {
        result = arrayOne[i] * arrayTwo[i];
        results.push(result);
    }

    return results;
};

// Create a sequence of numbers
const createNumbers = (start, end) => {
    const numbers = [];
    for (let i = start; i <= end; i++)
        numbers.push(i);
    return numbers;
};

// Function used for .map in generate random venue id
const replaceFormatWithCharacters = (letters, numbers, format) => {
    const replacedCharacters = [];

    for (let i = 0; i < format.length; i++) {
        const formatLetter = format[i];
        if (formatLetter !== 'L' && formatLetter !== 'N')
            throw new Error('There was an error with the replaceFormatWithCharacters function.');

        if (formatLetter === 'L')
            replacedCharacters.push(letters[Math.floor(Math.random() * letters.length)]);
        else
            replacedCharacters.push(numbers[Math.floor(Math.random() * numbers.length)]);
    }

    return replacedCharacters;
};

// Generate random venue id
const createRandomIds = (amount=10) => {
    if (typeof amount != 'number') {
        console.log(`createRandomIds: Did not receive a number: ${amount}`);
        return;
    }

    const letters = [...('abcdefghijklmnopqrstuvwxyz'.toUpperCase())];
    const numbers = createNumbers(0, amount);
    const splitFormat = [...'LLNNLNLNNL'];

    let ids = [];

    while (ids.length < amount) {
        // Replace format with random characters
        const finalFormat = replaceFormatWithCharacters(letters, numbers, splitFormat);

        // Add checker before  a new id

        ids.push(finalFormat.join(''));
    }

    return ids;
};

// Create array of local pictures' paths
const createPhotoURLs = (amount=10) => {
    const paths = [];
    let pathToPhoto = '';

    for (let i=0; i<amount; i++) {
        pathToPhoto = path.join(__dirname, '..', 'Picturs', `${i+1}.bmp`);
        paths.push(pathToPhoto);
    }

    return paths;
};

// Encrypt data into argon2
const asyncEncryptData = async (dataToEncrypt) => {
    try {
        const hashedData = await Promise.all(
            dataToEncrypt.map(async (data) => {
                const hash = await argon2.hash(data);
                return hash;
            })
        );

        return hashedData;
    } catch (error) {
        console.error('Encryption error:', error);
        throw error;
    }
}

const getFilePathByDatabaseType = (databaseType) => {
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
            // console.error(`getAllRecords: Invalid databaseType: ${databaseType}`);
            return;
    }
    return filepath;
};

// API Response codes and messages
const getResponseMessage = responseCode => {
    if (typeof responseCode != 'number') {
        console.log(`getResponseMessage: Code is not a number: ${responseCode}`);
        return;
    }
    let responseMessage = '';

    switch (responseCode) {
        case 200:
            responseMessage = 'OK';
            break;
        case 201:
            responseMessage = 'Data added successfully'
            break;
        case 400:
            responseMessage = 'Bad Request';
            break;
        case 401:
            responseMessage = 'Unauthorized';
            break;
        case 403:
            responseMessage = 'Forbidden';
            break;
        case 404:
            responseMessage = 'Not Found';
            break;
        case 409:
            responseMessage = 'Request could not be processed';
            break;
        case 422:
            responseMessage = 'Unprocessable Entity';
            break;
        case 500:
            responseMessage = 'Internal Server Error';
            break;
        default:
            responseMessage = 'Unknown Response';
      }

      return `{ message: ${responseMessage} }`;
};

module.exports = { createRandomIds, createRandomNumbers, multiplyTwoArrays,
    asyncEncryptData, createPhotoURLs, getFilePathByDatabaseType,
    getResponseMessage };