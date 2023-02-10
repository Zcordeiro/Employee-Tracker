const inquirer = require('inquirer');
const mysql = require('mysql2');

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'password',
        database: 'company_staff_db'
    },
);

const initPrompt = () => {
    return inquirer
        .prompt(
            {
                type: "list",
                name: "mainChoice",
                message: "What would you like to do?",
                choices: ["View all departments",
                    "View all roles",
                    "View all employees",
                    "Add a department",
                    "Add a role",
                    "Add an employee",
                    "Update an employee role"]
            }
        )
};

const addDepartment = () => {
    return inquirer
        .prompt([
            {
                type: "input",
                name: "name",
                message: "What should this department be called?",
                validate: function (name) {
                    if (name) {
                        return true;
                    } else {
                        return "Please enter a valid name.";
                    }
                }
            },
        ])
};

const addRole = () => {
    let departmentSelection = [];
    db.query("SELECT * FROM department", function (err, results) {
        for (let i = 0; i < results.length; i++) {
            departmentSelection.push(results[i].department_name);
        }
    })
    return inquirer
        .prompt([
            {
                type: "input",
                name: "title",
                message: "What the title of the new role?",
                validate: function (title) {
                    if (title) {
                        return true;
                    } else {
                        return "Please enter a valid title.";
                    }
                }
            },
            {
                type: "input",
                name: "salary",
                message: "What is this new role's salary?",
                validate: function (salary) {
                    if (!isNaN(salary)) {
                        return true;
                    } else {
                        return "Please enter a valid salary.";
                    }
                }
            },
            {
                type: "list",
                name: "department",
                message: "What department should this new role be in?",
                choices: departmentSelection,
            }

        ])
}



const addEmployee = () => {
    let roleSelection = [];
    let managerSelection = [];
    db.query("SELECT * FROM roles", function (err, results) {
        for (let i = 0; i < results.length; i++) {
            roleSelection.push(results[i].title);
        }
    });
    db.query("SELECT * FROM employee", function (err, results) {
        for (let i = 0; i < results.length; i++) {
            let managerName = `${results[i].first_name} ${results[i].last_name}`
            managerSelection.push(managerName);
        }
    });
    
    return inquirer
        .prompt([
            {
                type: "input",
                name: "first_name",
                message: "What is this employee's first name?",
                validate: function (name) {
                    if (name) {
                        return true;
                    } else {
                        return "Please enter a valid name.";
                    }
                }
            },
            {
                type: "input",
                name: "last_name",
                message: "What is this employee's last name?",
                validate: function (name) {
                    if (name) {
                        return true;
                    } else {
                        return "Please enter a valid name.";
                    }
                }
            },
            {
                type: "list",
                name: "role",
                message: "What is this employee's role?",
                choices: roleSelection,
            },
            {
                type: "list",
                name: "eManager",
                message: "Who is this employee's manager?",
                choices: managerSelection,
            }

        ])
    
}


module.exports = { initPrompt, addDepartment, addEmployee, addRole }