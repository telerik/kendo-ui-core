withAngularTests("Angular (UI Core)", function(runTest){

    /* -----[ utils ]----- */

    $.fn.press = function(key) {
        return this.trigger({ type: "keydown", keyCode: key } );
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

    /* -----[ initialization ]----- */

    runTest("create widgets", function(dom, $scope){
        var slider = $("<input kendo-slider />").appendTo(dom);
        var numericTextBox = $("<input kendo-numerictextbox />").appendTo(dom);
        var colorPicker = $("<input kendo-color-picker />").appendTo(dom);
        var grid = $("<div kendo-grid></div>").appendTo(dom);

        $scope.whenRendered(function(){
            start();
            ok(slider.data("kendoSlider") instanceof kendo.ui.Slider);
            ok(numericTextBox.data("kendoNumericTextBox") instanceof kendo.ui.NumericTextBox);
            ok(colorPicker.data("kendoColorPicker") instanceof kendo.ui.ColorPicker);
            if (kendo.ui.Grid) {
                ok(grid.data("kendoGrid") instanceof kendo.ui.Grid);
            }
        });
    });

    runTest("clear the widget value when Angular sends undefined", function(dom, $scope){
        $("<div><input kendo-datepicker='date' k-ng-model='foo.date' /><input kendo-numerictextbox='number' k-ng-model='foo.number' /></div>")
            .appendTo(dom);
        var now = new Date();
        $scope.foo = {
            date   : now,
            number : 10
        };
        $scope.whenRendered(function(){
            start();
            equal($scope.date.value(), now);
            equal($scope.number.value(), 10);
            $scope.$apply(function(){
                $scope.foo = null;
            });
            equal($scope.date.value(), null);
            equal($scope.number.value(), null);
        });
    });

    runTest("store widget reference in $scope", function(dom, $scope){
        $("<div kendo-window='window' k-title='\"Reference\"'></div>").appendTo(dom);
        expect(2);
        $scope.whenRendered(function(){
            ok($scope.window instanceof kendo.ui.Window);
            equal($scope.window.title(), "Reference");
            start();
        });
    });

    runTest("handle k-options", function(dom, $scope){
        var w1 = $("<div kendo-window k-options='windowOptions'></div>").appendTo(dom);
        var w2 = $("<div kendo-window k-title='windowOptions.title'></div>").appendTo(dom);
        expect(2);
        $scope.whenRendered(function(){
            w1 = w1.data("kendoWindow");
            w2 = w2.data("kendoWindow");
            equal(w1.title(), $scope.windowOptions.title);
            equal(w2.title(), $scope.windowOptions.title);
            start();
        });
    });

    runTest("handle unprefixed options", function(dom, $scope){
        var w = $("<div kendo-window options='windowOptions'></div>").appendTo(dom);
        expect(1);
        $scope.whenRendered(function(){
            equal(w.data("kendoWindow").title(), $scope.windowOptions.title);
            start();
        });
    });

    runTest("handle unprefixed on- options", function(dom, $scope){
        var theSwitch = $("<div kendo-mobileswitch on-label='onLabel'></div>").appendTo(dom);
        $scope.onLabel = "ONE"
        $scope.whenRendered(function(){
            equal(theSwitch.data("kendoMobileSwitch").options.onLabel, "ONE");
            start();
        });
    });

    runTest("handle widget data* options", function(dom, $scope){
        var ddl = $("<select kendo-dropdownlist data-source='foo' data-text-field='\"bar\"' data-value-field='\"foo\"'></select>").appendTo(dom);
        expect(3);

        $scope.foo = [
            { foo: "value", bar: "text" }
        ];

        $scope.whenRendered(function(){
            equal(ddl.find('option').attr("value"), "value");
            equal(ddl.find('option').text(), "text");
            equal(ddl.data('kendoDropDownList').options.dataValueField, 'foo');
            start();
        });
    });

    /* -----[ support for {{angular}} expressions in customizable templates ]----- */

    runTest("AutoComplete templates", function(dom, $scope){
        $scope.options = {
            dataSource: $scope.data,
            dataValueField: "id",
            dataTextField: "text",
            template: "| {{dataItem.text}} |",
        };
        var input = $("<input kendo-autocomplete='autocomplete' k-options='options' />").appendTo(dom);
        expect(2);
        $scope.whenRendered(function(){
            input.type("b");
            $scope.autocomplete.search();
            input.press(kendo.keys.DOWN);
            input.press(kendo.keys.ENTER);
            equal(input.val(), "Bar");
            equal($scope.autocomplete.ul.children(":first").text(), "| Bar |");
            start();
        });
    });

    runTest("ComboBox templates", function(dom, $scope){
        $scope.options = {
            dataSource: $scope.data,
            dataValueField: "id",
            dataTextField: "text",
            template: "| {{dataItem.text}} |",
        };
        var combo = $("<input kendo-combobox='combobox' k-options='options' />").appendTo(dom);
        expect(2);
        $scope.whenRendered(function(){
            $scope.combobox.open();
            var items = $scope.combobox.items();
            equal($(items[0]).text(), "| Foo |");
            equal($(items[1]).text(), "| Bar |");
            start();
        });
    });

    runTest("ListView templates", function(dom, $scope){
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
        $scope.whenRendered(function(){
            var items = $scope.list.items();
            equal(items.eq(0).text(), "Foo 1");
            equal(items.eq(1).text(), "2 Bar");
            $scope.list.edit(items.eq(0));
            start();
        });
    });

    runTest("ListView inline templates", function(dom, $scope){
        $scope.edit = function(e) { equal(e.item.text(), "|Foo|"); }

        $("<div kendo-list-view='list' k-data-source='data' k-on-edit='edit(kendoEvent)'><span k-template>{{dataItem.text}} {{dataItem.id}}</span><span k-alt-template>{{dataItem.id}} {{dataItem.text}}</span><div k-edit-template class='my-editable'>|{{dataItem.text}}|</div></div>").appendTo(dom);

        expect(3);

        $scope.whenRendered(function(){
            var items = $scope.list.items();
            equal(items.eq(0).text(), "Foo 1");
            equal(items.eq(1).text(), "2 Bar");
            $scope.list.edit(items.eq(0));
            start();
        });
    });

    runTest("DropDownList templates", function(dom, $scope){
        $scope.options = {
            dataSource: $scope.data,
            dataValueField: "id",
            template: "{{dataItem.text}} {{dataItem.id}}",
            valueTemplate: "{{dataItem.id}} {{dataItem.text}}",
            headerTemplate: "<div id='test-header-template'>|{{1+1}}|</div>"
        };
        var input = $("<select kendo-dropdownlist='list' k-options='options'></select>").appendTo(dom);
        expect(4);
        $scope.whenRendered(function(){
            var items = $scope.list.items();
            equal($(items[0]).text(), "Foo 1");
            equal($(items[1]).text(), "Bar 2");
            $scope.list.value(2);
            equal($scope.list.span.text(), "2 Bar");
            equal($("#test-header-template").html(), "|2|");
            start();
        });
    });

    runTest("Menu + dataSource with {{angular}}", function(dom, $scope){
        $scope.options = {
            dataSource: [
                { text: "{{3 + 3}}", encoded: false }
            ]
        };
        $("<ul kendo-menu='menu' k-options='options'></ul>").appendTo(dom);
        expect(1);
        $scope.whenRendered(function(){
            equal($scope.menu.wrapper.find("li:first").text(), "6");
            start();
        });
    });

    runTest("PanelBar -- compile template loaded from server", function(dom, $scope){
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
        $scope.whenRendered(function(){
            $scope.panelbar.expand(dom.find("li:first"));
        });
    });

    runTest("TabStrip -- compile template loaded from server", function(dom, $scope){
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

    runTest("TabStrip -- compile template in data", function(dom, $scope){
        $scope.name = "foo";
        $scope.options = {
            dataSource: [ { name: 'tab', content: '<div id="content">{{name}}</div>' } ],
            dataTextField: 'name',
            dataContentField: 'content'
        };

        $("<div kendo-tabstrip=foo k-options='options'></div>").appendTo(dom);

        $scope.whenRendered(function(){
            equal($scope.foo.element.find("#content").text(), "foo");
            start();
        });

        expect(1);
    });

    runTest("Splitter -- compile template loaded from server", function(dom, $scope){
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

    runTest("Tooltip -- compile template", function(dom, $scope){
        $scope.text = "{{3 + 3}}";
        var div = $("<div kendo-tooltip='tooltip' k-content='text'>foo</div>").appendTo(dom);
        expect(1);
        $scope.whenRendered(function(){
            $scope.tooltip.show(div);
            equal($scope.tooltip.content.text(), "6");
            start();
        });
    });

    runTest("Window -- compile content through Angular", function(dom, $scope){
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

    runTest("Window -- dataItem is available", function(dom, $scope){
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

    /// custom directives

    runTest("Custom directive with isolated scope", function(dom, $scope){
        $scope.options = {
            dataSource     : $scope.data,
            dataTextField  : "text",
            dataValueField : "id"
        };
        $scope.ns = { test: 1 };
        $("<div isolated-scope><select kendo-dropdownlist='ns.list' ng-model='ns.test' k-options='options'></select></div>").appendTo(dom);
        expect(2);
        setTimeout(function(){
            var dl = $scope.ns.list;
            equal(dom.find("h1").length, 1);
            dl.value(2);
            dl.element.trigger("change");
            equal($scope.ns.test, 2);
            start();
        }, 100);
    });

    /// mobile

    runTest("Mobile ListView -- compiles templates in data source", function(dom, $scope){
        $scope.options = {
            template   : "<div class='my-item'>{{ dataItem.id }}/{{ dataItem.text }}</div>",
            dataSource : $scope.data
        };
        $("<ul kendo-mobilelistview='list' k-options='options'></ul>").appendTo(dom);
        expect(2);
        $scope.whenRendered(function(){
            var items = $scope.list.element.find(".my-item");
            equal(items.eq(0).text(), "1/Foo");
            equal(items.eq(1).text(), "2/Bar");
            start();
        });
    });

    runTest("No `? undefined:undefined ?` option in dropdown (kendo-ui-core#248)", function(dom, $scope){
        expect(2);
        $("<select kendo-dropdownlist='dropDown' ng-model='item'><option value='1'>Foo</option></select>").appendTo(dom);
        $scope.whenRendered(function(){
            var dropDown = $scope.dropDown;
            var items = dropDown.items();
            equal(items.length, 1);
            equal($(items[0]).text(), "Foo");
            start();
        });
    });

    runTest("Set dirty flag on change", function(dom, $scope){
        $scope.options = {
            dataSource     : $scope.data,
            dataTextField  : "text",
            dataValueField : "id"
        };
        $scope.item = 1;
        var form = $("<form name='form'><select name='select' kendo-dropdownlist='dropDown' k-options='options' ng-model='item'></select></form>").appendTo(dom);
        expect(5);
        $scope.whenRendered(function(){
            equal($scope.form.$dirty, false);
            equal($scope.form.select.$dirty, false);
            $scope.dropDown.value(2);
            $scope.dropDown.trigger("change");
            equal($scope.item, 2);
            equal($scope.form.$dirty, true);
            equal($scope.form.select.$dirty, true);
            start();
        });
    });

    // XXX: for some reason ng-repeat does not work in the test suite.
    //
    // runTest("Dirty flag should not be globally cleared with ng-repeat", function(dom, $scope){
    //     var options = {
    //         dataSource     : $scope.data,
    //         dataTextField  : "text",
    //         dataValueField : "id"
    //     };
    //     $scope.things = [{
    //         item: 1,
    //         options: options
    //     }];
    //     var html = [
    //         "<form name='form'>",
    //         "  <div ng-repeat='i in things'>",
    //         "    <select name='i.select' kendo-dropdownlist='i.dropDown' k-options='i.options' ng-model='i.item'></select>",
    //         "  </div>",
    //         "</form>"
    //     ].join("");
    //     var form = $(html).appendTo(dom);
    //     console.log(form.html());
    //     expect(0);
    //     setTimeout(function(){
    //         console.log(form.html());
    //     }, 250);
    //     $scope.whenRendered(function(){
    //         console.log(dom.html());
    //         start();
    //     });
    // });

    runTest("Compile Notification template", function(dom, $scope){
        expect(1);
        $scope.options = {
            animation: false,
            templates: [
                { type: "info", template: "#=message#|{{test}}|{{dataItem.message}}" }
            ],
            show: function(ev) {
                equal(ev.element.html(), "foo|test|foo");
                $scope.notf.hide();
                start();
            }
        };
        $scope.test = "test";
        $("<div kendo-notification='notf' k-options='options'></div>").appendTo(dom);
        $scope.whenRendered(function(){
            $scope.notf.show({
                message: "foo"
            }, "info");
        });
    });

    runTest("DropDown, ComboBox, MultiSelect -- k-ng-model returns items instead of string values", function(dom, $scope){
        $scope.options = {
            dataSource: $scope.data,
            dataValueField: "id",
            dataTextField: "text"
        };
        $scope.comboModel = { id: 2 };
        $scope.dropDownModel = { id: 2 };
        $scope.multiSelectModel = [ { id: 2 } ];

        $("<div>" +
          "  <input kendo-combobox='combo' k-options='options' k-ng-model='comboModel' />" +
          "  <input kendo-dropdownlist='dropDown' k-options='options' k-ng-model='dropDownModel' />" +
          "  <input kendo-multiselect='multiSelect' k-options='options' k-ng-model='multiSelectModel' />" +
          "</div>").appendTo(dom);

        expect(6);
        $scope.whenRendered(function(){
            var combo = $scope.combo;
            var dropDown = $scope.dropDown;
            var multiSelect = $scope.multiSelect;

            // have correct initial values
            equal(combo.value(), "2");
            equal(dropDown.value(), "2");
            deepEqual(multiSelect.value(), [ 2 ]);

            combo.value(1); combo.trigger("change");
            dropDown.value(1); dropDown.trigger("change");
            multiSelect.value([ 2, 1 ]); multiSelect.trigger("change");

            deepEqual($scope.comboModel, { id: 1, text: "Foo" });
            deepEqual($scope.dropDownModel, { id: 1, text: "Foo" });
            equal(JSON.stringify($scope.multiSelectModel), JSON.stringify([ { text: "Bar", id: 2 }, { text: "Foo", id: 1 } ]));
            start();
        });
    });

	runTest("Mutliselect value updated when k-ng-model is changed when value is non-primitive", function(dom, $scope, $timeout){
        $scope.selectOptions = {
                    dataTextField: "ProductName",
                    dataValueField: "ProductID",
                    dataSource: {
                        data:  [
                            {ProductID : 1, ProductName : "Product1"},
                            {ProductID : 2, ProductName : "Product2"},
                            {ProductID : 3, ProductName : "Product3"}
                        ]
                    }
                };

        $scope.selectedIds = [ {ProductID : 1, ProductName : "Product1"},  {ProductID : 2, ProductName : "Product2"}];

        $("<div>" +
          "  <select kendo-multi-select='multiselect' k-options='selectOptions' k-ng-model='selectedIds' k-value-primitive='false'></select>" +
          "</div>").appendTo(dom);

		expect(3);
        $scope.whenRendered(function(){
            $scope.$apply(function() {
                $scope.selectedIds.pop();
            });

            equal($scope.selectedIds.length, 1);
            equal($scope.multiselect.value().length, 1);
            equal($scope.multiselect.value().length, $scope.selectedIds.length);
            start();
        });
    });

    runTest("Mutliselect value updated when k-ng-model is changed when value is primitive", function(dom, $scope, $timeout){
        $scope.selectOptions = {
                    dataTextField: "ProductName",
                    dataValueField: "ProductID",
                    dataSource: {
                        data:  [
                            {ProductID : 1, ProductName : "Product1"},
                            {ProductID : 2, ProductName : "Product2"},
                            {ProductID : 3, ProductName : "Product3"}
                        ]
                    }
                };

        $scope.selectedIds = [ 1, 2 ];

        $("<div>" +
          "  <select kendo-multi-select='multiselect' k-options='selectOptions' k-ng-model='selectedIds' k-value-primitive='true'></select>" +
          "</div>").appendTo(dom);

		expect(3);
        $scope.whenRendered(function(){
            $scope.$apply(function() {
                $scope.selectedIds.pop();
            });

            equal($scope.selectedIds.length, 1);
            equal($scope.multiselect.value().length, 1);
            equal($scope.multiselect.value().length, $scope.selectedIds.length);
            start();
        });
    });

    runTest("Mutliselect value updated when k-ng-model is changed to empty array", function(dom, $scope, $timeout){
        $scope.selectOptions = {
                    dataTextField: "ProductName",
                    dataValueField: "ProductID",
                    dataSource: {
                        data:  [
                            {ProductID : 1, ProductName : "Product1"},
                            {ProductID : 2, ProductName : "Product2"},
                            {ProductID : 3, ProductName : "Product3"}
                        ]
                    }
                };

        $scope.selectedIds = [ 1, 2 ];

        $("<div>" +
          "  <select kendo-multi-select='multiselect' k-options='selectOptions' k-ng-model='selectedIds' k-value-primitive='true'></select>" +
          "</div>").appendTo(dom);

		expect(2);
        $scope.whenRendered(function(){

            $scope.$apply(function() {
                $scope.selectedIds=[];
            });

            equal($scope.selectedIds.length, 0);
            equal($scope.multiselect.value().length, 0);
            start();
        });
    });

    runTest("Mutliselect value updated when k-ng-model is changed after new items is selected", function(dom, $scope, $timeout){
        $scope.selectOptions = {
                    dataTextField: "ProductName",
                    dataValueField: "ProductID",
                    dataSource: {
                        data:  [
                            {ProductID : 1, ProductName : "Product1"},
                            {ProductID : 2, ProductName : "Product2"},
                            {ProductID : 3, ProductName : "Product3"}
                        ]
                    }
                };

        $scope.selectedIds = [{ProductID : 1, ProductName : "Product1"}];

        $("<div>" +
          "  <select kendo-multi-select='multiselect' k-options='selectOptions' k-ng-model='selectedIds' k-value-primitive='false'></select>" +
          "</div>").appendTo(dom);

		expect(2);
        $scope.whenRendered(function(){
            $scope.multiselect.value([1,2]);
            $scope.multiselect.trigger("change");

            $scope.$apply(function() {
                $scope.selectedIds.pop();
            });

            equal($scope.selectedIds.length, 1);
            equal($scope.multiselect.value().length, 1);
            start();
        });
    });

});
