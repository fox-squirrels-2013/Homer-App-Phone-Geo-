var Alloy = require("alloy"), _ = Alloy._, Backbone = Alloy.Backbone;

Alloy.createController("index");

var tijasmine = require("/tijasmine/tijasmine"),
        reporter = new (require("/tijasmine/tijasmine-console").ConsoleReporter)();

tijasmine.addSpecModules("/lib/specs/counter", "/lib/specs/tests_runner");
tijasmine.addReporter(reporter);
tijasmine.execute();