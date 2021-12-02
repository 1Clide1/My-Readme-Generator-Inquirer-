// TODO: Include packages needed for this application
const inquier= require('inquirer');
const fs= require('fs');
const util = require('util');
// getting the markdown js file which is needed to complete the readme
const generateMarkdown= require('./utils/generateMarkdown');
// TODO: Create an array of questions for user input
const questions= 
    [
    {   type: 'input',
        name: 'author',
        message: "What is your name?"
    },
    {   type: 'input',
        name: 'email',
        message: "What is your email?",
        // adds a nice function with some cool regex saying if what you wrote has an @ and a . then it's an email if not please enter a valid one
        validate: email =>{
            if (email.match(/\S+@\S+\.\S+/)) {
                return true
            }
            else{
                console.log("Please enter a correct email.")
            }
        }
    },
    {   type: 'input',
        name: 'github',
        message: "What is your github username?"
    },
    {   type: 'input',
        name: 'title',
        message: "What is the title of your project?"
    },
    {   type: 'input',
        name: 'description',
        message: "Give your project a description"
    },
    {   type: 'input',
        name: 'tech',
        message: "Give your project a description"
    },
    {   type: 'input',
        name: 'install',
        message: "Give a description on how to install the project/What does it take for it to run"
    },
    {   type: 'input',
        name: 'usage',
        message: "How do you use this app/project? Give a usage example/insctructions"
    },
    {   type: 'input',
        name: 'credits',
        message: "Give your final thoughts/shoutouts on who helped you with the project"
    },
    {   type: 'list',
        name: 'license',
        message: "Select a License for this project",
        choices: ['GNU AGPLv3', 'GNU GPLv3', 'GNU LGPLv3', 'Mozilla Public License 2.0', 'Apache License 2.0', 'MIT License', 'Boost Software License 1.0', 'The Unlicense']
    }
    
    ];
    
    // TODO: Create a function to write README file
    function writeToFile(fileName, data) {
        // this writes the 
        fs.writeFile(fileName, data, err =>{
            if (err) {
               return console.error("err");
            }
            else{
                console.log("Went Smoothly");
            }
        });
    }
    // making this a global const saying util module to callback the function wrtieToFile when I need to
    const asyncWriteFile= util.promisify(writeToFile);
// TODO: Create a function to initialize app
// made this an async function to try out this try and catch function
// probably should have used the .then chain instead but like I said the try and catch functions are really interesting
async function init() {
    //try is a cool trick, this means it will try out a statement of code and will catch in this case an error if something goes wrong
    // so I can call what I need to start the app when it's done I then can save at the end 
    console.log("Welcome to my readme generator, please answer the following prompts to get your customized readme!!");
    try {
        // data in this case is your answers
        const data= await inquier.prompt(questions);
        console.log("Your Responses:", data);
        // gets your answers and feeds them into the markdown generator file
        const markdown= generateMarkdown(data);
        console.log(markdown);
        // saves at the end
        await asyncWriteFile('README.md', markdown);
        console.log("saved your readme!!");
    } catch (error) {
        console.error("error");
    }
}    
// Function call to initialize app
init();
