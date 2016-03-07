(function() {
    var menu;

    function createMenu(options) {
        removeHTML();

        QUnit.fixture.append("<ul id='menu'></ul>");

        menu = new kendo.ui.Menu("#menu", options);
    }

    function removeHTML() {
        kendo.destroy(QUnit.fixture);
        QUnit.fixture.empty();
    }

    module("Client side rendering", {
        teardown: function () {
            removeHTML();
        }
    });

    test('Custom attribute is rendered in item', function(){
        createMenu({
            dataSource: [{
              text: "Item 1",
              cssClass: "myClass",
              attr: {
                "data-myCustomAttribute": "myCustomAttribute",
              }
            }]
        });

        equal(menu.element.find("li:first").attr("data-myCustomAttribute"), "myCustomAttribute");
    });

    test('Class added via attr is added to other classes', function(){
        createMenu({
            dataSource: [{
              text: "Item 1",
              cssClass: "myClass",
              attr: {
                "class": "myCustomClass",
              }
            }]
        });

        menu.element.find("li:first").empty();
        
        var listItemContents = menu.element.html();
        var classAttributesCount = (listItemContents.match(/class/g) || []).length;

        equal(classAttributesCount, 1);
    });

    test('Multiple attributes are rendered in item', function(){
        createMenu({
            dataSource: [{
              text: "Item 1",
              cssClass: "myClass",
              attr: {
                "data-myCustomAttribute": "myCustomAttribute",
                "id": "myId"
              }
            }]
        });

        var firstItem = menu.element.find("li:first");

        equal(firstItem.attr("data-myCustomAttribute"), "myCustomAttribute");
        equal(firstItem.attr("id"), "myId");
    });

    test('Attributes is rendered in sub item', function(){
        createMenu({
            dataSource: [{
              text: "Item 1",
              items: [{
                    text: "Item 2",
                    attr: {
                        "class": "myClass"
                    }
                }]
            }]
        });
 
        var subItem = menu.element.find(".myClass");
 
        equal(subItem.length, 1);
    });
})();   