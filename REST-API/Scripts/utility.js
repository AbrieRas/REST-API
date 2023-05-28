// ===> implementations
const fs = require('fs/promises');
const path = require('path');
const argon2 = require('argon2');
const { readFromFileForItems } = require('./readFromFile.js');
const { storeDataInJsonFile } = require('./writeToFile.js');

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
// const encryptData = async (data) => {
//     try {
//         const hashedData = await asyncEncryptData(data);
//         return hashedData;
//     } catch (error) {
//         console.error('Error:', error);
//         throw error;
//     }
// }

// ===> File paths
const filePathToVenues = path.join(__dirname, '..', 'Data', 'Venues.json');
const filePathToUsers = path.join(__dirname, '..', 'Data', 'Users.json');
const filePathToPhotos = path.join(__dirname, '..', 'Data', 'Photos.json');

// ===> Data to import into js files
// Venues
const venueIds = createRandomIds(10);

const venueNames = ['The Avenue',
                    'Paradise Gardens',
                    'Atlantis',
                    'The Blue Fin',
                    'The Greenhouse',
                    'Big Orchid',
                    'Lotus Lakes',
                    'The Golden Plaza',
                    'Omni',
                    'Prime Lands'];

const venueLength = createRandomNumbers(5, 25, 10);

const venueWidth = createRandomNumbers(5, 25, 10);

const venueSquareMeters = multiplyTwoArrays(venueLength, venueWidth);

const venueAddress = ['4 Bridle StreetHarrisonburg, VA 22801',
                      '345 Swanson CourtHilliard, OH 43026',
                      '7520 Grandrose StreetAkron, OH 44312',
                      '890 Young St.Minot, ND 58701',
                      '154 Rockwell DrivePueblo, CO 81001',
                      '401 School St.Charlotte, NC 28205',
                      '9583 Thatcher St.Depew, NY 14043',
                      '18 Walnut StreetNew York, NY 10002',
                      '7504 High Noon CourtNorwood, MA 02062',
                      '9 Fawn St.Marcus Hook, PA 19061'];

// Users
const userIds = createRandomIds(10);

const userUsernames = ['tswinley0',
                        'rwinslet1',
                        'kcouling2',
                        'lmaffulli3',
                        'jglavias4',
                        'mmabbot5',
                        'cimpy6',
                        'wthaxton7',
                        'lalexandrou8',
                        'yquiddihy9'];

let encryptedUserUsernames = [];

const userPasswords = ['MyKZo3r',
                        'obRO44A',
                        'd8mwBXo',
                        'zKdDKh',
                        'dTwvv2hI',
                        'hiPuvU4',
                        'cGxAxsg',
                        'SbqKfyW',
                        'iwcbnE1',
                        'QSuxUu0O'];

let encryptedUserPasswords = [];

const userEmails = ['whankard0@paypal.com',
                    'cpandie1@cbsnews.com',
                    'nblazynski2@wisc.edu',
                    'lhestrop3@auda.org.au',
                    'kpregal4@goo.gl',
                    'bgroves5@cam.ac.uk',
                    'cducker6@ca.gov',
                    'wharbertson7@intel.com',
                    'kgian8@blog.com',
                    'dfinlay9@google.it'];

let encryptedUserEmails = [];

// Photos
const photoIds = createRandomIds(10);

const photoVenueIds = ['JA39E2B38N',
                        'FE37G7B79L',
                        'LB88M0A76Y',
                        'CT910N9I03D',
                        'YC78E0S20J',
                        'IU40B1V109Y',
                        'HC610A3N110N',
                        'FH01O7U09A',
                        'OG60B3W32E',
                        'CX00R6O31L'];

const photoAuthorIds = ['PQ65K10H102L',
                        'IX310F8N16G',
                        'PW80L10Y32L',
                        'NC86X6W90E',
                        'RU99W9U09E',
                        'OB07C7T86E',
                        'RG94R2W01A',
                        'VM97V5M910B',
                        'UV89Q7V71J',
                        'TY39M0T66T'];

const photoUrls = createPhotoURLs(10);

// ===> Merge data into object
// Venues
class Venue {
    constructor(id, name, length, width, sqMeters, address) {
        this.id = id;
        this.name = name;
        this.length = length;
        this.width = width;
        this.sqMeters = sqMeters;
        this.address = address;
    }
}

const venues = [];

for (let index in venueIds) {
    let venueObject = new Venue(
                                venueIds[index],
                                venueNames[index],
                                venueLength[index],
                                venueWidth[index],
                                venueSquareMeters[index],
                                venueAddress[index]
                            );
    venues.push(venueObject);
}

// Users
class User {
    constructor(id, username, password, email) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.email = email;
    }
}

const users = [];

// HINT: Used within encryptData
const createUsersFromEncryptedData = () => {
    for (let index in userIds) {
        let userObject = new User(
                                    userIds[index],
                                    encryptedUserUsernames[index],
                                    encryptedUserPasswords[index],
                                    encryptedUserEmails[index]
                                );
        users.push(userObject);
    }
};

const encryptAndStoreData = async () => {
    try {
        encryptedUserUsernames = await asyncEncryptData(userUsernames);
        encryptedUserPasswords = await asyncEncryptData(userPasswords);
        encryptedUserEmails = await asyncEncryptData(userEmails);

        createUsersFromEncryptedData();
        
        // Store/overwrite data (NOTE: only use storeDataInJsonFile function once)
        /**
         * Creates/overwrites file in path and then stores object data from second param.
         * @param {string} path - The path to the file to write.
         * @param {string} object - Object to store in path param.
         */
        // storeDataInJsonFile(filePathToUsers, users);
    } catch (error) {
        console.log('encryptAndStoreData: Error: ', error);
    }
};

encryptAndStoreData();

// Photos
class Photo {
    constructor(id, venueId, authorId, url) {
        this.id = id;
        this.venueId = venueId;
        this.authorId = authorId;
        this.url = url;
    }
}

const photos = [];

for (let index in photoIds) {
    let photoObject = new Photo(
                                photoIds[index],
                                photoVenueIds[index],
                                photoAuthorIds[index],
                                photoUrls[index]
                            );
    photos.push(photoObject);
}

// Store/overwrite data (NOTE: only use storeDataInJsonFile function once)
// storeDataInJsonFile(filePathToVenues, venues);
// storeDataInJsonFile(filePathToPhotos, photos);

// ===> Read json file and print contents
/**
 * Reads file and returns its content. If second param is given, function returns content of all Object.secondParam
 * @param {string} path - The path to the file to read.
 * @param {string} searchItem - The object's key to search for.
 * @returns {object} Object of data.
 */
// readFromFileForItems(filePathToUsers, 'id');
