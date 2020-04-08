// To use the inquirer module
const inquirer = require('inquirer')

// To use the built in fs module as promises
const fs = require('fs').promises

// To use the axios module
const axios = require('axios')

// Define a global variable for the avatar URL
let avatarURL = ''

// Define a constant as an array of objects to pass through the inquirer
const questions = [{
        message: 'What is the title of your project?',
        name: 'title',
        type: 'input',
        default: 'Title'

    },
    {
        message: 'Write a description for your project.',
        name: 'description',
        type: 'input',
        default: 'This is the description...'

    },
    {
        message: 'Describe the installation procedure for your project.',
        name: 'installation',
        type: 'input',
        default: 'Installation process...'

    },
    {
        message: 'Provide instructions for the usage.',
        name: 'usage',
        type: 'input',
        default: 'Usage instructions...'

    },
    {
        message: 'Choose your license.',
        name: 'license',
        type: 'list',
        choices: ['MIT', 'EPL', 'Apache']

    },
    {
        message: 'Write a step by step contributing procedure.',
        name: 'contributing',
        type: 'input',
        default: 'Contributing procedure...',

    },
    {
        message: 'Provide examples of tests and how to run them.',
        name: 'tests',
        type: 'input',
        default: 'Example tests...'

    }
]

// Chain of promises
// Prompt the user for their github username
promptUsername()
    // Retrieve the user's profile image with the axios module
    .then(githubAPI)
    // Prompt questions about the README file
    .then(promptQuestions)
    // Create a string with the user's answers to be put in the markdown file
    .then(createReadMe)
    // Create the README file as a markdown
    .then(writeReadMe)


// This function uses the inquirer module to prompt the user their username
function promptUsername() {
    return inquirer.prompt({
        message: 'What is your github username?',
        name: 'username'
    })
}

// This async function takes the inputed username and retrieves their profile image with axios module
async function githubAPI({ username }) {
    try {
        const response = await axios.get(`https://api.github.com/users/${username}`)
            // Waits until it retireves the data then stores it in the previously define global variable
        avatarURL = response.data.avatar_url
    } catch (err) {
        console.log(err)
    }
}

// This function takes in the array objects containing questions to prompt the user
function promptQuestions() {
    return inquirer.prompt(questions)
}

// This function takes the user's answers and generates a long string
function createReadMe(answers) {
    let badgeURL
        // Depending on the license chosen by the user, a badge is generated
    if (answers.license === 'MIT') {
        badgeURL = 'https://img.shields.io/apm/l/vim-mode'
    } else if (answers.license === 'EPL') {
        badgeURL = 'https://img.shields.io/eclipse-marketplace/l/notepad4e'
    } else if (answers.license === '') {
        badgeURL = 'https://img.shields.io/aur/license/android-studio'
    }
    // Return the string to be used to create the readmefile
    return `\n# ${answers.title}\n![](${badgeURL})\n## Description\n${answers.description}\n## Table of Contents\n1. [Installation](#Installation)\n2. [Usage](#Usage)\n3. [License](#License)\n4. [Contributing](#Contributing)\n5. [Tests](#Tests)\n6. [Questions](#Questions)\n## Installation\n${answers.installation}\n## Usage\n${answers.usage}\n## License\nLicensed under ${answers.license}\n## Contributing\n${answers.contributing}\n## Tests\n${answers.tests}\n## Questions\nEmail: 'hidden'\n\n\n![Profile Image](${avatarURL})`
}

// Asyn function to generate a new markdown file with the user inputed content
async function writeReadMe(content) {
    try {
        await fs.writeFile('generateREADME.md', content)

    } catch (err) {
        console.log(err)
    }
}