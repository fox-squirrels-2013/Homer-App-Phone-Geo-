function run() {
var tijasmine = require("tijasmine/tijasmine"),
        reporter = new (require("tijasmine/tijasmine-console").ConsoleReporter);
 
    tijasmine.addSpecModules(
 
    );
    tijasmine.addReporter(reporter);
    tijasmine.execute();
}
 
exports.run = run;