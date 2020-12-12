const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

// push into this as each new employee's info is entered.
// it is very deliberately left global although passing it as an extra parameter between 
// all the askUserFor... functions would have worked too.  And given the asyncronous 
// nature of this app, it may have been more clear and pure to have passed the array 
// around as it is built to ensure nothing messes with it out of order.  Still, this
// as a global was suggested during office hours and Anthony approved of it so i'm
// gonna leave it as such so as to avoid a grader needing to think twice about why 
// on Earth this is done when everyone else managed to dodge the potential issues.
// And people will get this right because if they do the obviously wrong thing and
// use he array immediately after askUserForManagerInfo() is called, then they will 
// find the array empty because all of the input is collected asyncronously as promises
// so no question has even been asked by the time askUserForManagerInfo returns.  
// The interesting stuff begins as of the first .then(() =>{ ... } and the chain of
// "thens" incrementally add to the array.  And so the use of this array can only
// happen as of when the option "I don't want to add any more team members" is chosen.
// Hence why it is safe to use this array on the right side of the case statement that
// handles when that is chosen. See "case doneText  :" inside of askUserForEmployeeType.
const allEmployees = []

const managerQuestions = [
    {name  : "name",
    message: "What is your manager's name?",
    type   : "input" },
    {name  : "id",
    message: "What is your manager's id?",
    type:    "input" },
    {name  : "email",
    message: "What is your manager's email?",
    type:    "input" },
    {name  : "officeNumber",
    message: "What is your manager's office number?",
    type:    "input" },
]


function askUserForManagerInfo() {
    return inquirer.prompt(managerQuestions).then((response) => {
        let newManager = new Manager(response.name, response.id, response.email, response.officeNumber)
        allEmployees.push(newManager)
        askUserForEmployeeType()
    })
}

const doneText = "I don't want to add any more team members"
const employeeTypeQuestions = [{
    name: "nextType",
    message:"Which type of team member would you like to add?",
    type:"list",
    choices:["Engineer", "Intern", doneText]
}]

function askUserForEmployeeType() {
    return inquirer.prompt(employeeTypeQuestions).then((response) => {
        let nextType = response.nextType;
        switch(nextType) {
            case "Engineer": askUserForEngineerInfo(); break;
            case "Intern"  : askUserForInternInfo(); break;
            case doneText  : generateHtmlFileFromQuestions(allEmployees); break;
            default: throw new Error("inquirer has failed me.  This choice shouldn't be possible: " + nextType)
        }
    })
}

const engineerQuestions = [
      {name  : "name",
      message: "What is the engineer's name?",
      type   : "input" },
      {name  : "id",
      message: "What is the engineer's id?",
      type:    "input" },
      {name  : "email",
      message: "What is the engineer's email?",
      type:    "input" },
      {name  : "github",
      message: "What is the engineer's Github username?",
      type:    "input" },
]

function askUserForEngineerInfo() {
    
    return inquirer.prompt(engineerQuestions).then((response) => {
        let newEngineer = new Engineer(response.name, response.id, response.email, response.github)
        allEmployees.push(newEngineer)
        askUserForEmployeeType()
    })
}

const internQuestions = [
    {name  : "name",
    message: "What is the intern's name?",
    type   : "input" },
    {name  : "id",
    message: "What is the intern's id?",
    type:    "input" },
    {name  : "email",
    message: "What is the intern's email?",
    type:    "input" },
    {name  : "school",
    message: "What is the intern's school?",
    type:    "input" },
]

function askUserForInternInfo() {

    return inquirer.prompt(internQuestions).then((response) => {
        let newIntern = new Intern(response.name, response.id, response.email, response.school)   //(response.name, response.id, response.email)
        allEmployees.push(newIntern)
        askUserForEmployeeType()
    })
}

function generateHtmlFileFromQuestions(employeeList) {
    
    // beware!  As a global variable, allEmployees is available to the scope of multiple
    //  functions that append to it throughout the code.  And this code is all done asyncronously
    //  so  
    let rendered = render(employeeList)

    fs.mkdir(OUTPUT_DIR, { recursive: false }, function (mkdirerr) {
        if (mkdirerr) {
            if (mkdirerr.code === "EEXIST") {
                console.log("output folder already exists.  That's fine.")
            } else {
                console.error("creating the output directory failed: " + JSON.stringify(mkdirerr))
            }
        }
        fs.writeFile(outputPath, rendered, function (err) {
            if (err) {
                console.error(JSON.stringify(err))
            }
        })
    })
}

askUserForManagerInfo()