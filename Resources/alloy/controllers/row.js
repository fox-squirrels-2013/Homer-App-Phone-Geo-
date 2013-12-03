function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "row";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.row = Ti.UI.createTableViewRow({
        id: "row"
    });
    $.__views.row && $.addTopLevelView($.__views.row);
    $.__views.name = Ti.UI.createLabel({
        height: "30dp",
        font: {
            fontSize: "20dp"
        },
        left: "0dp",
        right: "3dp",
        touchEnabled: false,
        id: "name"
    });
    $.__views.row.add($.__views.name);
    $.__views.product = Ti.UI.createLabel({
        height: "40dp",
        font: {
            fontSize: "16dp"
        },
        left: "103dp",
        right: "3dp",
        touchEnabled: false,
        id: "product"
    });
    $.__views.row.add($.__views.product);
    $.__views.price = Ti.UI.createLabel({
        height: "50dp",
        font: {
            fontSize: "16dp"
        },
        left: "163dp",
        right: "3dp",
        touchEnabled: false,
        id: "price"
    });
    $.__views.row.add($.__views.price);
    $.__views.discount = Ti.UI.createLabel({
        height: "60dp",
        font: {
            fontSize: "16dp"
        },
        left: "203dp",
        right: "3dp",
        touchEnabled: false,
        id: "discount"
    });
    $.__views.row.add($.__views.discount);
    $.__views.address = Ti.UI.createLabel({
        height: "60dp",
        font: {
            fontSize: "16dp"
        },
        left: "203dp",
        right: "3dp",
        touchEnabled: false,
        id: "address"
    });
    $.__views.row.add($.__views.address);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    $.name.text = args.name;
    $.product.text = args.product;
    $.price.text = args.price;
    $.address.text = args.address;
    $.discount.text = args.discount;
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;