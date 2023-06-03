// =================================
// Implementations
// =================================
const path = require('path');
const { createRandomIds, createRandomNumbers, multiplyTwoArrays,
    asyncEncryptData, createPhotoURLs } = require('./utility.js');
const { storeDataInJsonFile } = require('./writeToFile.js');

// =================================
// File paths
// =================================
const filePathToVenues = path.join(__dirname, '..', 'Data', 'Venues.json');
const filePathToUsers = path.join(__dirname, '..', 'Data', 'Users.json');
const filePathToPhotos = path.join(__dirname, '..', 'Data', 'Photos.json');

// =================================
// Venues
// =================================
// ===> Assign data
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

// ===> Merge data into object
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

/**
 * Creates/overwrites file in path and then stores object data from second param.
 * @param {string} path - The path to the file to write.
 * @param {string} object - Object to store in path param.
 */
// storeDataInJsonFile(filePathToVenues, venues);

/**
 * Reads file and returns its content. If second param is given, function returns content of all Object.secondParam
 * @param {string} path - The path to the file to read.
 * @param {string} searchItem - The object's key to search for.
 * @returns {object} Object of data.
 */
// readFromFileForItems(filePathToVenues, 'id');

// =================================
// Users
// =================================
// ===> Assign data
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

// ===> Merge data into object
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
        console.error('encryptAndStoreData: Error: ', error);
    }
};

encryptAndStoreData();

/**
 * Reads file and returns its content. If second param is given, function returns content of all Object.secondParam
 * @param {string} path - The path to the file to read.
 * @param {string} searchItem - The object's key to search for.
 * @returns {object} Object of data.
 */
// readFromFileForItems(filePathToUsers, 'id');

// =================================
// Photos
// =================================
// ===> Assign data
const photoIds = createRandomIds(10);

const photoVenueIds = venueIds;

const photoAuthorIds = userIds;

const photoUrls = createPhotoURLs(10);

// ===> Merge data into object
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

/**
 * Creates/overwrites file in path and then stores object data from second param.
 * 
 * @param {string} path - The path to the file to write.
 * @param {string} object - Object to store in path param.
 */
// storeDataInJsonFile(filePathToPhotos, photos);

/**
 * Reads file and returns its content. If second param is given, function returns content of all Object.secondParam
 * 
 * @param {string} path - The path to the file to read.
 * @param {string} searchItem - The object's key to search for.
 * @returns {object} Object of data.
 */
// readFromFileForItems(filePathToPhotos, 'id');