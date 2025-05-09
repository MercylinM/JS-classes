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

const role = "guest";

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
    }
}

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

function Order(customer, items, status) {
    this.customer = customer;
    this.items = items;
    this.status = status;
}

Order.prototype.computeTotalCost = function () {
    return this.items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);
};

Order.prototype.updateStatus = function (isPaid) {
    this.status = isPaid ? "Paid" : "Pending";
};

Order.prototype.categorizeUrgency = function () {
    const total = this.computeTotalCost();
    switch (true) {
        case total > 1000:
            return "High urgency";
        case total > 500:
            return "Medium urgency";
        default:
            return "Low urgency";
    }
};

const order1 = new Order(
    { name: "Jane Doe", email: "jane@example.com" },
    [{ productName: "Monitor", quantity: 2, unitPrice: 300 }],
    "Pending"
);

order1.updateStatus(true);
console.log("Total:", order1.computeTotalCost());
console.log("Urgency:", order1.categorizeUrgency());

function Course(title, instructor, students) {
    this.title = title;
    this.instructor = instructor;
    this.students = students;
}

Course.prototype.completedStudents = function () {
    return this.students.filter(s => s.completionStatus).map(s => s.name);
};

Course.prototype.countByExpertise = function () {
    return this.students.reduce((count, s) => {
        const area = this.instructor.expertise;
        if (!count[area]) count[area] = 0;
        count[area]++;
        return count;
    }, {});
};

Course.prototype.instructorMessage = function () {
    if (this.students.length > 5) {
        console.log(`Instructor ${this.instructor.name} has a large class.`);
    } else {
        console.log(`Instructor ${this.instructor.name} has a small, focused group.`);
    }
};

const course = new Course("JavaScript Basics", { name: "Alice", expertise: "Frontend" }, [
    { name: "Tom", completionStatus: true },
    { name: "Sarah", completionStatus: false },
    { name: "Liam", completionStatus: true },
]);

console.log("Completed:", course.completedStudents());
course.instructorMessage();
