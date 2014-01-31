(function(){

module("kendo attr", {
    teardown: function(){
        kendo.ns = "";
    }
});

test("default ns is empty", function() {
    equal(kendo.ns, "");
});

test("attr returns a data attribute", function() {
    kendo.ns = "kendo-";
    equal(kendo.attr("role"), "data-kendo-role");
});

test("attr handles empty ns", function() {
    kendo.ns = "";
    equal(kendo.attr("role"), "data-role");
});

}());
