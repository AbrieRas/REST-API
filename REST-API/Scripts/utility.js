// ===> implementations
const fs = require('fs/promises');
const path = require('path');

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
const createTenRandomIds = () => {
    const letters = [...('abcdefghijklmnopqrstuvwxyz'.toUpperCase())];
    const numbers = createNumbers(0, 10);
    const splitFormat = [...'LLNNLNLNNL'];

    let ids = [];

    while (ids.length < 10) {
        // Replace format with random characters
        const finalFormat = replaceFormatWithCharacters(letters, numbers, splitFormat);

        // Add checker before  a new id

        ids.push(finalFormat.join(''));
    }

    return ids;
};

// ===> Data to import into js files
const venueIds = createTenRandomIds();

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

for (let index in venueNames) {
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
class Users {
    constructor(id, username, password) {
        this.id = id;
        this.username = username;
        this.password = password;
    }
}

const users = [];



// Photos


// ===> Create json file



// ===> Print data for json file
/*
console.log(venues);

Prints
[
    venue { name: 'The Avenue' },
    venue { name: 'Paradise Gardens' },
    venue { name: 'Atlantis' },
    venue { name: 'The Blue Fin' },
    venue { name: 'The Greenhouse' },
    venue { name: 'Big Orchid' },
    venue { name: 'Lotus Lakes' },
    venue { name: 'The Golden Plaza' },
    venue { name: 'Omni' },
    venue { name: 'Prime Lands' }
]
*/


/*
console.log(JSON.stringify(venues));

Prints
[
    {"name":"The Avenue"},
    {"name":"Paradise Gardens"},
    {"name":"Atlantis"},
    {"name":"The Blue Fin"},
    {"name":"The Greenhouse"},
    {"name":"Big Orchid"},
    {"name":"Lotus Lakes"},
    {"name":"The Golden Plaza"},
    {"name":"Omni"},
    {"name":"Prime Lands"}
]
*/

// ===> Save json file
// Save template
const filePathToVenues = path.join(__dirname, '..', 'Data', 'Venues.json');

const storeDataInJsonFile = async (data) => {
    try {
        await fs.writeFile(filePathToVenues, data);
    } catch (err) {
        console.log('There was an error writing data to a JSON file.\n\nError: ' + err);
    }
}

// Execute save (commented out due to overlapping saves)
// storeDataInJsonFile(JSON.stringify(venues));

// ===> Read json file and print contents

