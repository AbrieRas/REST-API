// implementations
const fs = require('fs');

// Re-use functions

// Create ten random numbers between inputs
const createTenRandomNumbers = (start, end) => {
    let numbers = [];
    let randomNumber = 0;

    randomNumber = Math.floor(Math.random() * (end - start)) + start;
    numbers.push(randomNumber);

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

// Data to import into js files
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

const venueLength = createTenRandomNumbers(5, 25);

const venueWidth = createTenRandomNumbers(5, 25);

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

// Create json file


// Print json file


// Save json file


// Read json file and print contents
