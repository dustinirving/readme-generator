// To use the inquirer module
const inquirer = require('inquirer')

// To use the built in fs module as promises
const fs = require('fs').promises

// To use the axios module
const axios = require('axios')

// Define a global variable for the avatar URL
let avatarURL = ''

// Define a constant as an array of objects to pass through
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

promptUsername()
    .then(githubAPI)
    .then(promptQuestions)
    .then(createReadMe)
    .then(writeReadMe)


function promptUsername() {
    return inquirer.prompt({
        message: 'What is your github username?',
        name: 'username'
    })
}


async function githubAPI({ username }) {
    try {
        const response = await axios.get(`https://api.github.com/users/${username}`)
        avatarURL = response.data.avatar_url
    } catch (err) {
        console.log(err)
    }
}

function promptQuestions() {
    return inquirer.prompt(questions)
}

function createReadMe(answers) {
    console.log(answers.license)
    let badgeURL
    if (answers.license === 'MIT') {
        badgeURL = 'https://img.shields.io/apm/l/vim-mode'
    } else if (answers.license === 'EPL') {
        badgeURL = 'https://img.shields.io/eclipse-marketplace/l/notepad4e'
    } else if (answers.license === '') {
        badgeURL = 'https://img.shields.io/aur/license/android-studio'
    }
    return `\n# ${answers.title}\n![](${badgeURL})\n## Description\n${answers.description}\n## Table of Contents\n1. [Installation](#Installation)\n2. [Usage](#Usage)\n3. [License](#License)\n4. [Contributing](#Contributing)\n5. [Tests](#Tests)\n6. [Questions](#Questions)\n## Installation\n${answers.installation}\n## Usage\n${answers.usage}\n## License\nLicensed under ${answers.license}\n## Contributing\n${answers.contributing}\n## Tests\n${answers.tests}\n## Questions\nEmail: 'hidden'\n\n\n![Profile Image](${avatarURL})`
}

async function writeReadMe(content) {
    try {
        await fs.writeFile('generateREADME.md', content)

    } catch (err) {
        console.log(err)
    }
}




// // Start Chain of Promises
// // init()
// // function init() {}

// // Prompt Githubusername
// promptUsername()
//     // Retrieve Profile Image with github API (api.js module)
//     .then(api)
//     // Prompt Questions about the Readme File
//     .then(promptQuestions)
//     // Write data to a string
//     .then(writeToFile)

// // // Use the data to generate a Markdown file (generateMarkdown.js module)
// // .then(generateMarkdown)

// function promptUsername() {
//     const username = inquirer.prompt({
//         message: 'What is your github username?',
//         name: 'username'
//     })
//     return username
// }

// function promptQuestions() {
//     const answers = inquirer.prompt(questions)
//     return answers
// }

// function writeToFile(fileName, data){}