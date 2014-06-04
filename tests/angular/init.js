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
            this.responseText = '{{ hello }}';
        }
    });

    function runTest(name, test){
        asyncTest(name, function(){
            var dom = $("<div></div>").appendTo(QUnit.fixture);
            test(dom);
            $compile(dom)($scope);
        });
    };

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
            ok($scope.window.title() == "Reference");
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
            ok(w1.title() === $scope.windowOptions.title);
            ok(w2.title() === $scope.windowOptions.title);
            start();
        });
    });

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
            ok(input.val() == "Bar");
            ok($scope.autocomplete.ul.children(":first").text() == "| Bar |");
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
            ok($(items[0]).text() == "| Foo |");
            ok($(items[1]).text() == "| Bar |");
            start();
        });
    });

    runTest("ListView templates", function(dom){
        $scope.options = {
            dataSource: $scope.data,
            template: "<span>{{dataItem.text}} {{dataItem.id}}</span>",
            altTemplate: "<span>{{dataItem.id}} {{dataItem.text}}</span>"
        };
        $("<div kendo-listview='list' k-options='options'></div>").appendTo(dom);
        expect(2);
        $scope.$on("kendoRendered", function(){
            var items = $scope.list.items();
            ok(items.eq(0).text() == "Foo 1");
            ok(items.eq(1).text() == "2 Bar");
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
            ok($(items[0]).text() == "Foo 1");
            ok($(items[1]).text() == "Bar 2");
            $scope.list.value(2);
            ok($scope.list.span.text() == "2 Bar");
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
            ok($($scope.grid.thead[0].rows[0].cells[0]).text() == "6");
            ok($($scope.grid.element.find(".k-footer-template")[0].cells[0]).text() == "8");
            ok(rows.eq(0).text() == "|Foo||1|");
            ok(rows.eq(1).text() == "|Bar||2|");
            start();
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

            ok(el.find('.command-template').eq(0).text() == "Foo/1");
            ok(el.find('.command-template').eq(1).text() == "Bar/2");

            grid.editRow(rows.eq(0));
            grid.cancelRow();
            ok(rows.eq(0).find("td").eq(0).text() == "|Foo|");
            ok(rows.eq(0).find("td").eq(1).text() == "|1|");

            grid.editCell(rows.eq(0).find("td").eq(0));
            grid.closeCell();
            ok(rows.eq(0).find("td").eq(0).text() == "|Foo|");

            start();
        });
    });

    // XXX: for some reason this fails, though I *know* that the feature works as expected. :-\
    runTest("Grid popup editable template", function(dom){
        $scope.options = {
            dataSource: new kendo.data.DataSource({
                data: $scope.data
            }),
            columns: [
                { field: "text" },
                { field: "id" },
                { command: [ "edit" ] }
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
            ok(el.text() == "Foo/1");
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
            ok(items.eq(0).text() == "1. Foo");
            ok(items.eq(1).text() == "2. Bar");
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
            ok($scope.grid.tbody.text() == "|1||2|");
            ok($scope.grid.lockedContent.text() == "|Foo||Bar|");
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
            ok(toolbar.text() == "6");
            ok(header.find(".my-header").eq(0).text() == "text");
            ok(header.find(".my-header").eq(1).text() == "id");
            ok(footer.find(".my-footer").eq(0).text() == "text");
            ok(footer.find(".my-footer").eq(1).text() == "3");
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
                ok( div.text() == (ev.data.text + "/" + ev.data.id) );
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
            ok(items.eq(0).text() == "Foo | 1");
            ok(items.eq(1).text() == "Bar | 2");
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
            ok(el.text() == "6");
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
            ok($scope.menu.wrapper.find("li:first").text() == "6");
            start();
        });
    });

    runTest("PanelBar -- compile template loaded from server", function(dom){
        $scope.options = {
            contentUrls: [
                "ajax-template.html"
            ],
            contentLoad: function(ev) {
                ok(dom.find("div.content").text() == $scope.hello);
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
                ok(dom.find("div.content").text() == $scope.hello);
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
                ok(dom.find("div.content").text() == $scope.hello);
                start();
            }
        };
        $("<div kendo-splitter k-options='options'>" +
          "  <div></div>" +
          "  <div class='content'></div>" +
          "</div>").appendTo(dom);
        expect(1);
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
            ok(items.eq(0).text() == "1/Foo");
            ok(items.eq(1).text() == "2/Bar");
            start();
        });
    });

})();
