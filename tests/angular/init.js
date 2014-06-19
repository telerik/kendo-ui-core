(function(){

    module("AngularJS", {
        setup: function() {
            $injector = angular.injector([ "ng", "MyApp" ]);
            $scope = $injector.get("$rootScope").$new();
            $controller = $injector.get("$controller")("MyCtrl", { $scope: $scope });
            $compile = $injector.get("$compile");
        },
        teardown: function() {
            $scope.$destroy();
            kendo.destroy(QUnit.fixture);
        },
    });

    var $injector, $controller, $scope, $compile;

    var app = angular.module("MyApp", [ "kendo.directives", "ngRoute" ]);
    app.controller("MyCtrl", function($scope){
        $scope.windowOptions = {
            title: "Das titlen"
        };
        $scope.data = new kendo.data.ObservableArray([
            { text: "Foo", id: 1 },
            { text: "Bar", id: 2 }
        ]);
        $scope.hello = "Hello World!";
    });

    $.mockjaxSettings.responseTime = 0;

    $.mockjax({
        url: "ajax-template.html",
        response: function() {
            this.responseText = '<div>{{ hello }}</div>';
        }
    });

    $.mockjax({
        url: "data.json",
        response: function() {
            this.responseText = JSON.stringify({
                user: {
                    firstName: "John",
                    lastName: "Doe"
                }
            });
        }
    });

    function runTest(name, test){
        asyncTest(name, function(){
            var dom = $("<div></div>").appendTo(QUnit.fixture);
            test(dom);
            $compile(dom)($scope);
        });
    };

    /* -----[ utils ]----- */

    $.fn.press = function(key) {
        return this.trigger({ type: "keydown", keyCode: key } );
    };

    $.fn.selectedText = function() {
        var that = this[0];

        if (document.selection) {
            return document.selection.createRange().text;
        } else {
            return that.value.substring(that.selectionStart, that.selectionEnd);
        }
    };

    $.fn.type = function(value) {
        return this.val(value).each(function() {
            if (this.createTextRange) {
                var textRange = this.createTextRange();
                textRange.collapse(false);
                textRange.select();
            }
        });
    };

    function trigger(type, el, e) {
        el.trigger($.Event(type, e));
    }

    /* -----[ initialization ]----- */

    runTest("create widgets", function(dom){
        var slider = $("<input kendo-slider />").appendTo(dom);
        var numericTextBox = $("<input kendo-numerictextbox />").appendTo(dom);
        var colorPicker = $("<input kendo-color-picker />").appendTo(dom);
        var grid = $("<div kendo-grid></div>").appendTo(dom);
        expect(4);
        $scope.$on("kendoRendered", function(){
            ok(slider.data("kendoSlider") instanceof kendo.ui.Slider);
            ok(numericTextBox.data("kendoNumericTextBox") instanceof kendo.ui.NumericTextBox);
            ok(colorPicker.data("kendoColorPicker") instanceof kendo.ui.ColorPicker);
            ok(grid.data("kendoGrid") instanceof kendo.ui.Grid);
            start();
        });
    });

    runTest("store widget reference in $scope", function(dom){
        $("<div kendo-window='window' k-title='\"Reference\"'></div>").appendTo(dom);
        expect(2);
        $scope.$on("kendoRendered", function(){
            ok($scope.window instanceof kendo.ui.Window);
            equal($scope.window.title(), "Reference");
            start();
        });
    });

    runTest("handle k-options", function(dom){
        var w1 = $("<div kendo-window k-options='windowOptions'></div>").appendTo(dom);
        var w2 = $("<div kendo-window k-title='windowOptions.title'></div>").appendTo(dom);
        expect(2);
        $scope.$on("kendoRendered", function(){
            w1 = w1.data("kendoWindow");
            w2 = w2.data("kendoWindow");
            equal(w1.title(), $scope.windowOptions.title);
            equal(w2.title(), $scope.windowOptions.title);
            start();
        });
    });

    /* -----[ support for {{angular}} expressions in customizable templates ]----- */

    runTest("AutoComplete templates", function(dom){
        $scope.options = {
            dataSource: $scope.data,
            dataValueField: "id",
            dataTextField: "text",
            template: "| {{dataItem.text}} |",
        };
        var input = $("<input kendo-autocomplete='autocomplete' k-options='options' />").appendTo(dom);
        expect(2);
        $scope.$on("kendoRendered", function(){
            input.type("b");
            $scope.autocomplete.search();
            input.press(kendo.keys.DOWN);
            input.press(kendo.keys.ENTER);
            equal(input.val(), "Bar");
            equal($scope.autocomplete.ul.children(":first").text(), "| Bar |");
            start();
        });
    });

    runTest("ComboBox templates", function(dom){
        $scope.options = {
            dataSource: $scope.data,
            dataValueField: "id",
            dataTextField: "text",
            template: "| {{dataItem.text}} |",
        };
        var combo = $("<input kendo-combobox='combobox' k-options='options' />").appendTo(dom);
        expect(2);
        $scope.$on("kendoRendered", function(){
            $scope.combobox.open();
            var items = $scope.combobox.items();
            equal($(items[0]).text(), "| Foo |");
            equal($(items[1]).text(), "| Bar |");
            start();
        });
    });

    runTest("ListView templates", function(dom){
        $scope.options = {
            dataSource: $scope.data,
            template: "<span>{{dataItem.text}} {{dataItem.id}}</span>",
            altTemplate: "<span>{{dataItem.id}} {{dataItem.text}}</span>",
            editTemplate: "<div class='my-editable'>|{{dataItem.text}}|</div>",
            edit: function(e) {
                equal(e.item.text(), "|Foo|");
            }
        };
        $("<div kendo-listview='list' k-options='options'></div>").appendTo(dom);
        expect(3);
        $scope.$on("kendoRendered", function(){
            var items = $scope.list.items();
            equal(items.eq(0).text(), "Foo 1");
            equal(items.eq(1).text(), "2 Bar");
            $scope.list.edit(items.eq(0));
            start();
        });
    });

    runTest("DropDownList templates", function(dom){
        $scope.options = {
            dataSource: $scope.data,
            dataValueField: "id",
            template: "{{dataItem.text}} {{dataItem.id}}",
            valueTemplate: "{{dataItem.id}} {{dataItem.text}}",
        };
        var input = $("<select kendo-dropdownlist='list' k-options='options'></select>").appendTo(dom);
        expect(3);
        $scope.$on("kendoRendered", function(){
            var items = $scope.list.items();
            equal($(items[0]).text(), "Foo 1");
            equal($(items[1]).text(), "Bar 2");
            $scope.list.value(2);
            equal($scope.list.span.text(), "2 Bar");
            start();
        });
    });

    runTest("Grid cell templates", function(dom){
        $scope.options = {
            dataSource: $scope.data,
            columns: [
                { field: "text",
                  template: "|{{dataItem.text}}|",
                  headerTemplate: "{{3+3}}",
                  footerTemplate: "{{4+4}}",
                },
                { field: "id",
                  template: "|{{dataItem.id}}|"
                }
            ]
        };
        $("<div kendo-grid='grid' k-options='options'></div>").appendTo(dom);
        expect(4);
        $scope.$on("kendoRendered", function(){
            var rows = $("tr", $scope.grid.tbody);
            equal($($scope.grid.thead[0].rows[0].cells[0]).text(), "6");
            equal($($scope.grid.element.find(".k-footer-template")[0].cells[0]).text(), "8");
            equal(rows.eq(0).text(), "|Foo||1|");
            equal(rows.eq(1).text(), "|Bar||2|");
            start();
        });
    });

    runTest("Grid item scopes are destroyed when page is changed", function(dom){
        $scope.options = {
            dataSource: {
                data: $scope.data,
                pageSize: 1
            },
            columns: [ { field: "text" }, { field: "id" } ],
            pageable: true
        };
        $("<div kendo-grid='grid' k-options='options'></div>").appendTo(dom);
        expect(2);
        $scope.$on("kendoRendered", function(){
            var grid = $scope.grid;
            function firstRow() {
                return grid.items().eq(0);
            }
            firstRow().scope().$on("$destroy", function(){ ok(true) });
            grid.wrapper.find(".k-pager-wrap li:last > a").click();
            firstRow().scope().$on("$destroy", function(){ ok(true) });
            grid.wrapper.find(".k-pager-wrap li:first > a").click();
            setTimeout(start, 100);
        });
    });

    runTest("Grid cell templates after edit", function(dom){
        $scope.options = {
            dataSource: new kendo.data.DataSource({
                data: $scope.data
            }),
            columns: [
                { field: "text", template: "|{{dataItem.text}}|" },
                { field: "id", template: "|{{dataItem.id}}|" },
                { command: [ "edit",
                             { template: "<div class='command-template'>{{dataItem.text}}/{{dataItem.id}}</div>" } ]
                }
            ],
            editable: true
        };
        $("<div kendo-grid='grid' k-options='options'></div>").appendTo(dom);
        expect(5);
        $scope.$on("kendoRendered", function(){
            var grid = $scope.grid;
            var el = grid.element;
            var tbody = grid.tbody;
            var rows = tbody.find("tr");

            equal(el.find('.command-template').eq(0).text(), "Foo/1");
            equal(el.find('.command-template').eq(1).text(), "Bar/2");

            grid.editRow(rows.eq(0));
            grid.cancelRow();
            equal(rows.eq(0).find("td").eq(0).text(), "|Foo|");
            equal(rows.eq(0).find("td").eq(1).text(), "|1|");

            grid.editCell(rows.eq(0).find("td").eq(0));
            grid.closeCell();
            equal(rows.eq(0).find("td").eq(0).text(), "|Foo|");

            start();
        });
    });

    runTest("Grid popup editable template", function(dom){
        $scope.options = {
            dataSource: new kendo.data.DataSource({
                data: $scope.data
            }),
            columns: [
                { field: "text" },
                { field: "id" },
                { command: "edit" }
            ],
            editable: {
                mode: "popup",
                template: "<div class='my-editable'>{{dataItem.text}}/{{dataItem.id}}</div>"
            }
        };
        $("<div kendo-grid='grid' k-options='options'></div>").appendTo(dom);
        expect(1);
        $scope.$on("kendoRendered", function(){
            var grid = $scope.grid;
            grid.editRow(grid.tbody.find("tr:first"));
            var el = grid._editContainer.find(".my-editable");
            equal(el.text(), "Foo/1");
            grid.cancelRow();
            start();
        });
    });

    runTest("Grid rowTemplate", function(dom){
        $scope.options = {
            dataSource: $scope.data,
            columns: [ { field: "text" }, { field: "id" } ],
            rowTemplate: "<tr data-uid='#= uid #'><td colspan='2'>{{dataItem.id}}. {{dataItem.text}}</td></tr>"
        };
        $("<div kendo-grid='grid' k-options='options'></div>").appendTo(dom);
        expect(2);
        $scope.$on("kendoRendered", function(){
            var items = $scope.grid.items();
            equal(items.eq(0).text(), "1. Foo");
            equal(items.eq(1).text(), "2. Bar");
            start();
        });
    });

    runTest("Grid frozen columns templates", function(dom){
        $scope.options = {
            dataSource: $scope.data,
            columns: [
                { field: "text",
                  template: "|{{dataItem.text}}|",
                  locked: true
                },
                { field: "id",
                  template: "|{{dataItem.id}}|"
                }
            ]
        };
        $("<div kendo-grid='grid' k-options='options'></div>").appendTo(dom);
        expect(2);
        $scope.$on("kendoRendered", function(){
            var items = $scope.grid.items();
            equal($scope.grid.tbody.text(), "|1||2|");
            equal($scope.grid.lockedContent.text(), "|Foo||Bar|");
            start();
        });
    });

    runTest("Grid toolbar/header/footer templates", function(dom){
        $scope.options = {
            dataSource: {
                data: $scope.data,
                aggregate: [
                    { field: "id", aggregate: "sum" },
                ]
            },
            columns: [
                { field: "text",
                  headerTemplate: "<div class='my-header'>{{ column.field }}</div>",
                  footerTemplate: "<div class='my-footer'>{{ column.field }}</div>"
                },
                { field: "id",
                  headerTemplate: "<div class='my-header'>{{ column.field }}</div>",
                  footerTemplate: "<div class='my-footer'>{{ aggregate.sum }}</div>"
                }
            ],
            toolbar: "<div class='my-toolbar'>{{3 + 3}}</div>",
        };
        $("<div kendo-grid='grid' k-options='options'></div>").appendTo(dom);
        expect(5);
        $scope.$on("kendoRendered", function(){
            var toolbar = $scope.grid.element.find(".k-grid-toolbar .my-toolbar");
            var header = $scope.grid.element.find(".k-grid-header");
            var footer = $scope.grid.element.find(".k-grid-footer");
            equal(toolbar.text(), "6");
            equal(header.find(".my-header").eq(0).text(), "text");
            equal(header.find(".my-header").eq(1).text(), "id");
            equal(footer.find(".my-footer").eq(0).text(), "text");
            equal(footer.find(".my-footer").eq(1).text(), "3");
            start();
        });
    });

    runTest("Grid detailTemplate", function(dom){
        var count = 2;
        expect(count);
        $scope.options = {
            dataSource: $scope.data,
            columns: [
                { field: "text" },
                { field: "id" }
            ],
            detailTemplate: "<div class='my-detail'>{{ dataItem.text }}/{{ dataItem.id }}</div>",
            detailInit: function(ev) {
                var div = ev.detailCell.find(".my-detail");
                equal( div.text(), (ev.data.text + "/" + ev.data.id) );
                if (--count == 0) start();
            },
            dataBound: function() {
                var rows = this.tbody.find("tr.k-master-row");
                this.expandRow(rows.eq(0));
                this.expandRow(rows.eq(1));
            }
        };
        $("<div kendo-grid='grid' k-options='options'></div>").appendTo(dom);
    });

    runTest("TreeView item template", function(dom){
        $scope.options = {
            dataSource: $scope.data,
            template: "{{dataItem.text}} | {{dataItem.id}}"
        };
        $("<div kendo-treeview='tree' k-options='options'></div>").appendTo(dom);
        expect(2);
        $scope.$on("kendoRendered", function(){
            var items = $scope.tree.items();
            equal(items.eq(0).text(), "Foo | 1");
            equal(items.eq(1).text(), "Bar | 2");
            start();
        });
    });

    runTest("Draggable hint is compiled in scope of dragged element", function(dom){
        $scope.options = {
            dataSource: $scope.data,
            template: "{{dataItem.text}}/{{dataItem.id}}",
            dragAndDrop: true,
        };
        $("<div kendo-treeview='tree' k-options='options'></div>").appendTo(dom);
        expect(1);
        $scope.$on("kendoRendered", function(){
            var item = $scope.tree.items().eq(0).find(".k-in:first");
            var pos = item.offset();
            trigger("mousedown", item, { pageX: pos.left, pageY: pos.top });
            trigger("mousemove", $(document.documentElement), {
                pageX: pos.left + 50,
                pageY: pos.top + 50
            });
            equal($scope.tree.dragging._draggable.hint.text(), "Foo/1");
            start();
        });
    });

    runTest("Editor toolbar template", function(dom){
        $scope.options = {
            tools: [
                { template: "<div class='my-toolbar'>{{3 + 3}}</div>" }
            ]
        };
        $("<textarea kendo-editor='editor' k-options='options'></textarea>").appendTo(dom);
        expect(1);
        $scope.$on("kendoRendered", function(){
            var el = $scope.editor.toolbar.element.find(".my-toolbar");
            equal(el.text(), "6");
            start();
        });
    });

    runTest("Menu + dataSource with {{angular}}", function(dom){
        $scope.options = {
            dataSource: [
                { text: "{{3 + 3}}", encoded: false }
            ]
        };
        $("<ul kendo-menu='menu' k-options='options'></ul>").appendTo(dom);
        expect(1);
        $scope.$on("kendoRendered", function(){
            equal($scope.menu.wrapper.find("li:first").text(), "6");
            start();
        });
    });

    runTest("PanelBar -- compile template loaded from server", function(dom){
        $scope.options = {
            contentUrls: [
                "ajax-template.html"
            ],
            contentLoad: function(ev) {
                equal(dom.find("div.content").text(), $scope.hello);
                start();
            }
        };
        $("<ul kendo-panelbar='panelbar' k-options='options'>" +
          "  <li><a>Title</a><div class='content'></div></li>" +
          "</ul>").appendTo(dom);
        expect(1);
        $scope.$on("kendoRendered", function(){
            $scope.panelbar.expand(dom.find("li:first"));
        });
    });

    runTest("TabStrip -- compile template loaded from server", function(dom){
        $scope.options = {
            contentUrls: [ "ajax-template.html" ],
            contentLoad: function(ev) {
                equal(dom.find("div.content").text(), $scope.hello);
                start();
            }
        };
        $("<div kendo-tabstrip k-options='options'>" +
          "  <ul><li class='k-state-active'>AJAX</li></ul>" +
          "  <div class='content'></div>" +
          "</div>").appendTo(dom);
        expect(1);
    });

    runTest("Splitter -- compile template loaded from server", function(dom){
        $scope.options = {
            panes: [ null, { contentUrl: "ajax-template.html" } ],
            contentLoad: function(ev) {
                equal(dom.find("div.content").text(), $scope.hello);
                start();
            }
        };
        $("<div kendo-splitter k-options='options'>" +
          "  <div></div>" +
          "  <div class='content'></div>" +
          "</div>").appendTo(dom);
        expect(1);
    });

    runTest("Tooltip -- compile template", function(dom){
        $scope.text = "{{3 + 3}}";
        var div = $("<div kendo-tooltip='tooltip' k-content='text'>foo</div>").appendTo(dom);
        expect(1);
        $scope.$on("kendoRendered", function(){
            $scope.tooltip.show(div);
            equal($scope.tooltip.content.text(), "6");
            start();
        });
    });

    runTest("Scheduler -- compile customizable templates", function(dom){
        $scope.options = {
            date: new Date("2013/6/6"),
            eventTemplate: "<div class='my-event'>|{{dataItem.title}}|</div>",
            allDayEventTemplate: "<div class='my-allday-event'>|{{dataItem.title}}|</div>",
            editable: {
                template: "<div class='my-editable'>{{dataItem.title}}</div>"
            },
            views: [ "day", "week", "month", "agenda" ],
            edit: function(e) {
                equal(e.container.find(".my-editable").text(), "Interview");
            },
            dataSource: [
                {
                    id: 1,
                    start: new Date("2013/6/6 08:00 AM"),
                    end: new Date("2013/6/6 09:00 AM"),
                    isAllDay: true,
                    title: "Interview",
                    attendees: [1,2]
                },{
                    id: 2,
                    start: new Date("2013/6/6 10:00 AM"),
                    end: new Date("2013/6/6 11:00 AM"),
                    title: "Foo",
                    isAllDay: false
                }
            ],
            resources: [
                {
                    field: "attendees",
                    dataSource: [
                        { value: 1, text: "Alex" },
                        { value: 2, text: "Bob" }
                    ],
                    multiple: true
                }
            ]
        };
        $("<div kendo-scheduler='scheduler' k-options='options'></div>").appendTo(dom);
        expect(9);
        $scope.$on("kendoRendered", function(){
            var scheduler = $scope.scheduler;
            function shouldDestroy(sel) {
                var scope = scheduler.element.find(sel).scope();
                scope.$on("$destroy", function(){
                    ok(true);
                });
            }

            scheduler.view("day");
            equal(scheduler.element.find(".my-event").text(), "|Foo|");
            equal(scheduler.element.find(".my-allday-event").text(), "|Interview|");

            scheduler.view("week");
            equal(scheduler.element.find(".my-event").text(), "|Foo|");
            equal(scheduler.element.find(".my-allday-event").text(), "|Interview|");

            // month and agenda views will use eventTemplate for all-day events too
            // so both events will be displayed in a <div class="my-event">

            scheduler.view("month");
            equal(scheduler.element.find(".my-event").text(), "|Interview||Foo|");

            scheduler.view("agenda");
            equal(scheduler.element.find(".my-event").text(), "|Interview||Foo|");

            scheduler.view("day");
            scheduler.editEvent(scheduler.dataSource.at(0));
            shouldDestroy(".my-event");
            shouldDestroy(".my-allday-event");
            scheduler.date(new Date("2014/6/6 10:00 AM"));

            setTimeout(start, 10);
        });
    });

    runTest("Window -- compile content through Angular", function(dom){
        $scope.options = {
            content: "ajax-template.html",
            refresh: function() {
                var el = this.element;
                equal(el.text(), $scope.hello);
                start();
            }
        };
        $("<div kendo-window k-options='options'></div>").appendTo(dom);
        expect(1);
    });

    runTest("Window -- dataItem is available", function(dom){
        $scope.options = {
            content: {
                url: "data.json",
                dataType: "json",
                template: "<div>{{ dataItem.user.firstName }} {{ dataItem.user.lastName }}</div>"
            },
            refresh: function() {
                var el = this.element;
                equal(el.text(), "John Doe");
                start();
            }
        };
        $("<div kendo-window k-options='options'></div>").appendTo(dom);
        expect(1);
    });

    /// k-on-change handlers

    runTest("Grid k-on-change puts the right information in scope", function(dom){
        $scope.options = {
            dataSource: $scope.data,
            columns: [ { field: "text" }, { field: "id" } ],
            selectable: true
        };
        $scope.check = function(kendoEvent, selected, data, dataItem) {
            var grid = $scope.grid;
            equal(kendoEvent.sender, grid);
            equal($(selected)[0], grid.items()[0]);
            equal(data, dataItem);
            equal(dataItem.id, $scope.data[0].id);
            start();
        };
        $("<div kendo-grid='grid' k-options='options' k-on-change='check(kendoEvent, selected, data, dataItem)'></div>").appendTo(dom);
        expect(4);
        $scope.$on("kendoRendered", function(){
            $scope.grid.select($scope.grid.items().eq(0));
        });
    });

    runTest("Grid (multiple selection) k-on-change puts the right information in scope", function(dom){
        $scope.options = {
            dataSource: $scope.data,
            columns: [ { field: "text" }, { field: "id" } ],
            selectable: "multiple"
        };
        $scope.check = function(selected, data) {
            var grid = $scope.grid;
            equal(selected[0], grid.items()[0]);
            equal(selected[1], grid.items()[1]);
            equal(data[0].id, $scope.data[0].id);
            equal(data[1].id, $scope.data[1].id);
            start();
        };
        $("<div kendo-grid='grid' k-options='options' k-on-change='check(selected, data)'></div>").appendTo(dom);
        expect(4);
        $scope.$on("kendoRendered", function(){
            $scope.grid.select($scope.grid.items());
        });
    });

    /// mobile

    runTest("Mobile ListView -- compiles templates in data source", function(dom){
        $scope.options = {
            template   : "<div class='my-item'>{{ dataItem.id }}/{{ dataItem.text }}</div>",
            dataSource : $scope.data
        };
        $("<ul kendo-mobilelistview='list' k-options='options'></ul>").appendTo(dom);
        expect(2);
        $scope.$on("kendoRendered", function(){
            var items = $scope.list.element.find(".my-item");
            equal(items.eq(0).text(), "1/Foo");
            equal(items.eq(1).text(), "2/Bar");
            start();
        });
    });

    runTest("Mobile ScrollView -- compiles templates in data source", function(dom){
        expect(2);
        $scope.options = {
            template   : "<div class='my-item'>{{ dataItem.id }}/{{ dataItem.text }}</div>",
            dataSource : $scope.data
        };
        $("<ul kendo-mobilescrollview='list' k-options='options'></ul>").appendTo(dom);
        expect(2);

        $scope.$on("kendoRendered", function(){
            var items = $scope.list.element.find(".my-item");
            equal(items.eq(0).text(), "1/Foo");
            equal(items.eq(1).text(), "2/Bar");
            start();
        });
    });

})();
