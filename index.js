// You are building a feature rollout system for a startup where a FeatureToggle constructor function has properties: featureName (string), 
// isEnabled (boolean), and userGroupAccess (array of strings like "betaTesters", "admins"), and you must use a prototype method canAccess
// (userRole) to return true or false, a method toggleFeature(flag) to enable or disable the feature, and simulate access attempts using if-else 
// and switch statements for different roles.
function FeatureToggle(featureName, isEnabled, userGroupAccess) {
    this.featureName = featureName;
    this.isEnabled = isEnabled;
    this.userGroupAccess = userGroupAccess;
}

FeatureToggle.prototype.canAccess = function (userRole) {
    if (!this.isEnabled) return false;
    return this.userGroupAccess.includes(userRole);
};

FeatureToggle.prototype.toggleFeature = function (flag) {
    this.isEnabled = flag;
};

const darkMode = new FeatureToggle("Dark Mode", true, ["betaTesters", "admins"]);

const role = "admins";

if (darkMode.canAccess(role)) {
    console.log(`${role} has access to ${darkMode.featureName}`);
} else {
    switch (role) {
        case "betaTesters":
        case "admins":
            console.log(`${role} should have access but feature might be disabled.`);
            break;
        default:
            console.log(`${role} does not have access to ${darkMode.featureName}`);
            break;
    }
}
console.log('====================================');
console.log();
console.log('====================================');

// In a freelancer time - tracking platform, create a TimeLog constructor function with properties: freelancerName(string), 
// projectDetails(object with name and hourlyRate), and logs(array of objects with date, hoursWorked), then add prototype methods 
// to calculate total earnings, filter logs by date range, and determine if weekly hours exceed 40 using if-else logic.
function TimeLog(freelancerName, projectDetails) {
    this.freelancerName = freelancerName;
    this.projectDetails = projectDetails;
    this.logs = [];
}

TimeLog.prototype.addLog = function (date, hoursWorked) {
    this.logs.push({ date, hoursWorked });
};

TimeLog.prototype.totalEarnings = function () {
    return this.logs.reduce((sum, log) => sum + log.hoursWorked * this.projectDetails.hourlyRate, 0);
};

TimeLog.prototype.filterLogsByDateRange = function (startDate, endDate) {
    return this.logs.filter(log => new Date(log.date) >= new Date(startDate) && new Date(log.date) <= new Date(endDate));
};

TimeLog.prototype.exceedsWeeklyHours = function (weekLogs) {
    const totalHours = weekLogs.reduce((sum, log) => sum + log.hoursWorked, 0);
    if (totalHours > 40) {
        console.log("Weekly limit exceeded.");
        return true;
    } else {
        console.log("Weekly hours within limit.");
        return false;
    }
};


const johnLog = new TimeLog("John", { name: "Website", hourlyRate: 20 });
johnLog.addLog("2025-05-01", 5);
johnLog.addLog("2025-05-02", 10);
johnLog.addLog("2025-05-03", 30);

console.log("Total Earnings:", johnLog.totalEarnings());
johnLog.exceedsWeeklyHours(johnLog.logs);
console.log('====================================');
console.log();
console.log('====================================');

// You are developing a startup’s order management system where an Order constructor function should contain customer(object with name and email), 
// items(array of objects with productName, quantity, and unitPrice), and status(string), then implement prototype methods to compute total cost, 
// update order status based on payment, and categorize order urgency using switch and conditional statements.
function Order(customer, items, status) {
    this.customer = customer;
    this.items = items;
    this.status = status;
}

Order.prototype.computeTotalCost = function () {
    console.log(this.items);
    return this.items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);
};

Order.prototype.updateOrderStatus = function (isPaid) {
    this.status = isPaid ? "Paid" : "Pending";
};

Order.prototype.orderUrgency = function () {
    const total = this.computeTotalCost();
    switch (true) {
        case total > 1000:
            return "High urgency";
            break;
        case total > 500:
            return "Medium urgency";
            break;
        default:
            return "Low urgency";
            break;
    }
};

const order1 = new Order(
    { name: "Mercylin", email: "mercylin@mail.com" },
    [{ productName: "Monitor", quantity: 2, unitPrice: 300 }, { productName: "Laptop", quantity: 3, unitPrice: 200 }],
    "Paid"
);

order1.updateOrderStatus(true);
console.log("Total:", order1.computeTotalCost());
console.log("Urgency:", order1.orderUrgency());
console.log('====================================');
console.log();
console.log('====================================');

// In a startup’s employee review tool, design an Employee class with properties: id(number), name(string), performanceMetrics(object with keys 
// like communication, efficiency, and reliability), and feedback(array of strings), then use prototypes to calculate an average score, classify 
// performance level using control flow, and add new feedback based on conditions.
class Employee {
    constructor(id, name, performanceMetrics, feedback) {
        this.id = id;
        this.name = name;
        this.performanceMetrics = performanceMetrics;
        this.feedback = feedback;
    }
   
}

Employee.prototype.averageScore = function() {
        const scores = Object.values(this.performanceMetrics);
        return scores.reduce((sum, val) => sum + val, 0) / scores.length;
}
Employee.prototype.performanceLevel = function() {
    if (this.averageScore() >= 4.5) {
        return "Outstanding";
    }else if (this.averageScore() >= 3) {
        return "Satisfactory";
    }else {
        return "Needs Improvement";
    }
}
Employee.prototype.addFeedback = function(comment) {
    if (comment.length > 5) {
        this.feedback.push(comment);
    } else {
        console.log("Feedback too short.");
    }
}

const employee = new Employee(101, "Matthew", { communication: 5, efficiency: 4, reliability: 4.5 }, []);
employee.addFeedback("Great work on the last sprint.");
console.log("Performance:", employee.performanceLevel());
console.log(employee.feedback[0]);
employee.addFeedback("Good");

console.log('====================================');
console.log();
console.log('====================================');

// Build a simple e - learning system where a Course class has properties: title(string), instructor(object with name and expertise), and students
// (array of objects with name and completionStatus), then add prototype methods to return names of students who completed the course, count 
// enrolled students by expertise area, and use control flow to output different messages for instructors with more or less than 5 students.
class Course {
    constructor(title, instructor, students) {
        this.title = title;
        this.instructor = instructor;
        this.students = students;
    }
}

Course.prototype.completedStudents = function() {
    return this.students.filter(student => student.completionStatus).map(student => student.name);
}

Course.prototype.countByExpertise = function() {

    return this.students.reduce((count, student) => {
        const area = this.instructor.expertise;
        if (!count[area]) {
            count[area] = 0;
        }
        count[area]++;
        return count;
    })
}

Course.prototype.instructorMessage = function() {
    if (this.students.length > 5) {
        console.log(`Instructor ${this.instructor.name} has a large class.`);
    } else {
        console.log(`Instructor ${this.instructor.name} has a small, focused group.`);
    }
}




const course = new Course("JavaScript Basics", { name: "Hunter", expertise: "Frontend" }, [
    { name: "Mercylin", completionStatus: true },
    { name: "Njeri", completionStatus: true },
    { name: "Muthoni", completionStatus: true },
]);

console.log("Completed:", course.completedStudents());
course.instructorMessage();
