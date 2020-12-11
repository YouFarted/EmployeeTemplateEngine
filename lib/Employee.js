class Employee {
    constructor(name, id, email) {
        this.name = name
        this.id = id
        this.email = email
    }

    getRole() {
        return "Employee"
    }

    getEmail()
    {
        return this.email
    }

    getId(){
        return this.id
    }

    getName(){
        return this.name
    }
}

module.exports = Employee
