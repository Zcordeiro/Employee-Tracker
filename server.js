const express = require("express");
const mysql = require("mysql2");
const userPrompts = require("./src/questions");

const PORT = process.env.PORT || 3001;
const app = express();
const { printTable } = require('console-table-printer');
const { response } = require("express");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'password',
        database: 'company_staff_db'
    },
    console.log(`Connected to the company_staff_db database.`)
);

console.log(userPrompts);

function init() {
    userPrompts.initPrompt().then((data) => {
        console.log("Data: ", data);
        if (data.mainChoice === 'View all departments') {
            db.query('SELECT * FROM department', (err, results) => {
                printTable(results);
                init();
            });
        }
        if (data.mainChoice === 'View all roles') {
            db.query('SELECT * FROM roles', (err, results) => {
                printTable(results);
                init();
            });
        }
        if (data.mainChoice === 'View all employees') {
            db.query('SELECT * FROM employee', (err, results) => {
                console.log("ERROR: ", err);
                printTable(results);
                init();
            });
        }
        if (data.mainChoice === 'Add a department') {
            newDepartment();
        }
        if (data.mainChoice === 'Add a role') {
            newRole();
        }
        if (data.mainChoice === 'Add an employee') {
            newEmployee();
        }
    })
};

function newDepartment() {
    userPrompts.addDepartment().then((response) => {
        let newDepartmentName = response.name;
        console.log(response.name);
        db.query("INSERT INTO department (department_name)VALUES (?)", newDepartmentName, (err, results) => {
            console.log("ERROR: ", err);
            console.log("Insert Result: ", results);
            init();
        });
    })
}

function newRole() {
    userPrompts.addRole().then((response) => {
        db.query("SELECT id FROM department WHERE department_name = ?", response.department, (err, results) => {
            let department_id = results[0].id;
            let params = [response.title, response.salary, department_id];

            db.query("INSERT INTO roles (title, salary, department_id)VALUES (?,?,?)", params, (err, results) => {
                console.log("ERROR: ", err);
                console.log("Insert Result: ", results);
                init();
            })

        })
    })
}

function newEmployee() {
    userPrompts.addEmployee().then((response) => {
        db.query("SELECT id FROM roles Where title = ?", response.role, (err, result) => {
            let roleId = result[0].id;

            db.query("SELECT id FROM employee WHERE employee.first_name = ? AND employee.last_name = ?;", response.eManager.split(" "), (err, result) => {
                let managerId = result[0].id;
                
                let params = [response.first_name, response.last_name, roleId, managerId];
                console.log(params)
                db.query("INSERT INTO employee(first_name, last_name, role_id, manager_id)VALUES (?,?,?,?)", params , function(err, results) {
                    console.log("ERROR: ", err);
                    console.log("Insert Result: ",results);
                    init();
                } )
            })
        })
    })
}

init();
