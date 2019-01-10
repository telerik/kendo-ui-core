(function() {
    var ListBox = kendo.ui.ListBox,
        listA,
        listB,
        listC,
        listD;

    describe("ListBox - dragdrop", function () {
        beforeEach(function() {
            $(document.body).append(Mocha.fixture);

            var elementA = $('<select id="listA"></select>').appendTo(Mocha.fixture);
            var elementB = $('<select id="listB"></select>').appendTo(Mocha.fixture);
            var elementC = $('<select id="listC"></select>').appendTo(Mocha.fixture);
            var elementD = $('<select id="listD"></select>').appendTo(Mocha.fixture);
            
            listA  = elementA.kendoListBox({
                    dataSource: [ {name: "Tim", id:4 }, {name: "Johny", id:5 }, {name: "Dicky", id:6 }],
                    dataTextField: "name",
                    selectable: true,
                    draggable:true,
                    dropSources: ["listB"]
            }).getKendoListBox();


            listB = elementB.kendoListBox({
                    dataSource: [ {name: "Tom", id:1 }, {name: "Jerry", id:2 }, {name: "Donald", id:3 }],
                    dataTextField: "name",
                    selectable: true,
                    dropSources: ["listA"],
                    draggable:true
            }).getKendoListBox();

            listC = elementC.kendoListBox({
                    dataSource: [ {name: "Tonny", id:7 }, {name: "Jack", id:8 }, {name: "Dino", id:9 }],
                    dataTextField: "name",
                    selectable: true,
                    draggable:true
            }).getKendoListBox();

            listD = elementD.kendoListBox({
                    dataTextField: "name",
                    dataSource: [],
                    dropSources: ["listA"]
            }).getKendoListBox();
        });
        afterEach(function() {
            if(listA) {
              listA.destroy();
            }
            if(listB) {
              listB.destroy();
            }
            if(listC) {
              listC.destroy();
            }
            if(listD) {
              listD.destroy();
            }
            kendo.destroy(Mocha.fixture);
        });

    it("Draggable is not enabled by default", function() {
        assert.isOk(kendo.ui.ListBox.prototype.options.draggable === null);
    });

    it("Placeholder moves across connected listboxes", function() {
        var draggedElement = listB.items().first();
        var draggableOffset = kendo.getOffset(draggedElement);
        var targetElement = listA.items().first(),
            targetOffset = kendo.getOffset(targetElement);

        press(draggedElement, draggableOffset.left, draggableOffset.top);
        move(draggedElement, targetOffset.left, targetOffset.top);

        assert.isOk(listA._getList().children().length === 4, "Placeholder is moved to the ListA");
    });

    it("Item can be dragged from one listbox to another", function() {
        var draggedElement = listB.items().first();
        var draggableOffset = kendo.getOffset(draggedElement);
        var targetElement = listA.items().first(),
            targetOffset = kendo.getOffset(targetElement);

        press(draggedElement, draggableOffset.left, draggableOffset.top);
        move(draggedElement, targetOffset.left, targetOffset.top);
        release(draggedElement, targetOffset.left, targetOffset.top);

        assert.isOk(listB.items().length == 2, "Item is removed from ListB");
        assert.isOk(listA.items().length == 4, "Item is added to ListA");
        assert.isOk(listA.items().first().html() === "Tom");
    });

    it("Item is correctly reordered in listbox using drag", function () {
        var draggedElement = listB.items().last();
        var draggableOffset = kendo.getOffset(draggedElement);
        var targetElement = listB.items().first(),
            targetOffset = kendo.getOffset(targetElement);
        press(draggedElement, draggableOffset.left, draggableOffset.top);
        move(draggedElement, targetOffset.left, targetOffset.top);
        release(draggedElement, targetOffset.left, targetOffset.top);
        //this should not depend on default line hight, since moving up to exact location
        assert.isOk(listB.items().filter(":eq(0)").html() === "Donald");
    });

    it("Item is not dropped if dropSources is not set", function() {
        var draggedElement = listA.items().first();
        var draggableOffset = kendo.getOffset(draggedElement);
        var targetElement = listC.items().last(),
            targetOffset = kendo.getOffset(targetElement);

        press(draggedElement, draggableOffset.left, draggableOffset.top);
        move(draggedElement, targetOffset.left, targetOffset.top);
        release(draggedElement, targetOffset.left, targetOffset.top);

        assert.isOk(listC.dataSource.view().length === 3);
    });

    it("Item is not dropped if dropSources is empty", function() {
        var draggedElement = listA.items().first();
        var draggableOffset = kendo.getOffset(draggedElement);
        var targetElement = listD._getList();
        targetElement.height(30);
        var targetOffset = kendo.getOffset(targetElement);

        press(draggedElement, draggableOffset.left, draggableOffset.top);
        move(draggedElement, targetOffset.left, targetOffset.top);
        release(draggedElement, targetOffset.left, targetOffset.top);

        assert.isOk(listD.dataSource.view().length === 1);
    });

    it("Drag and drop classes are set and removed correctly", function() {
        var draggedElement = listA.items().first();
        var draggableOffset = kendo.getOffset(draggedElement);
        var targetElement = listD._getList();
        var targetOffset = kendo.getOffset(targetElement);

        press(draggedElement, draggableOffset.left, draggableOffset.top);
        move(draggedElement, targetOffset.left, targetOffset.top + 100);
        assert.isOk($("body").find(".k-item.k-state-selected.k-reset.k-drag-clue").length === 1);
        release(draggedElement, targetOffset.left, targetOffset.top + 100);
        assert.isOk(listA.items().find(".k-ghost").length === 0);
    });

     it("Drag and drop hint should not have .k-state-focused class when dragged element is focused", function(){
        var mockedElement = $('<li class="k-item k-state-focused k-state-selected"/>');
        var hint = listA._draggable.options.hint(mockedElement)

        assert.isOk(!hint.hasClass("k-state-focused"));                
    });
    });
}());
