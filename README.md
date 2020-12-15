# team html roster generator script

## Table of Contents

* [Goal](#goal)
* [Acceptance Criteria](#acceptance-criteria)
* [Changes](#changes)
* [Live Project](#live-project)

## Goal

write a quiz game as demonstrated in a provided animated gif 

## Acceptance Criteria
```
GIVEN A node app that collects a development team's roster
WHEN I run the app
THEN it asks me to enter manager info
WHEN I'm done entering manager info
THEN I am asked who to enter next
WHEN I choose Intern for the above
THEN I am asked to enter Intern info.
WHEN I choose Engineer
THEN I am asked to enter Engineer info
WHEN I choose to enter no more employees
THEN an html file is saved into ./output/team.html that shows the team roster
```

## Changes

The baseline project was included under a Develop/ directory under the homework
assignment and may be seen in the git history plain as day.  It included several
test suites as effective documentation of the design for a set of classes to be
implemented under the lib/ directory.  So phase 1 of completing this homework 
was getting the tests to pass.  Once they were all passing, the next step was to
get the project to dump the filled out template file under ./output/team.html .
Most of this functionality was provided as some simple templating functionality
that could produce a string of the file contents given an array of Employee
objects.  I could get this working by producing some static array of such 
objects and by calling the provided html.render function passing that object
array and then using the fs.writeFile method.  However, much of the meat of this
project was in using inquirer.prompt repeatedly to collect the team info at the command-line.  Driving the input process as a sort of recursive "loop", 
of sorts, formed the majority of the bona-fide work of this project and advise for how to procede was given in an office hours.  But it essentially works like
this: create functions to collect data for each respective sort of employee
which invoke inquirer.prompt, registering a .then() from the returned promise
that pulls the answer data out and creates a new Employee object using the 
constructor for that particular subclass of employee.  The constructor is 
invoked with the specialized, specific data appropriate to the asked questions
for that particular type of employee.  After this, for each function for an employee, once the new employee is added (pushed) to a global list, another function
askUserForEmployee type, asks which type of employee to add next and indirectly (under the then()) invokes the next askForWhateverEmployeeTypeInfo function to 
continue the loop of sorts and this process continues until "add no more" is 
selected at which point, the dump-file function is called with the global array
which has collected the employee objects throughout this process.

## Live Project

github project page: https://github.com/YouFarted/EmployeeTemplateEngine <br/>
github live site: NONE on this one.  It must be run locally.
A screencap of me typing into the inquirer prompts.
https://drive.google.com/file/d/1pZiTb7a0XFk_aZKFpPzfgHjHtXSXO9M5/view?usp=sharing
The resulting generated output html file:
https://drive.google.com/file/d/1uMxODoJAdycZfuox0s8yymzd56xSaEAp/view?usp=sharing
