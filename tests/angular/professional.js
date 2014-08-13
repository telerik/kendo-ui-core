withAngularTests("Angular (Professional)", function(runTest){

    function trigger(type, el, e) {
        el.trigger($.Event(type, e));
    }

    runTest("Grid cell templates", function(dom, $scope){
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
        $scope.whenRendered(function(){
            var rows = $("tr", $scope.grid.tbody);
            equal($($scope.grid.thead[0].rows[0].cells[0]).text(), "6");
            equal($($scope.grid.element.find(".k-footer-template")[0].cells[0]).text(), "8");
            equal(rows.eq(0).text(), "|Foo||1|");
            equal(rows.eq(1).text(), "|Bar||2|");
            start();
        });
    });

    runTest("Grid item scopes are destroyed when page is changed", function(dom, $scope){
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
        $scope.whenRendered(function(){
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

    runTest("Grid cell templates after edit", function(dom, $scope){
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
        $scope.whenRendered(function(){
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

    runTest("Grid popup editable template", function(dom, $scope){
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
        $scope.whenRendered(function(){
            var grid = $scope.grid;
            grid.editRow(grid.tbody.find("tr:first"));
            var el = grid._editContainer.find(".my-editable");
            equal(el.text(), "Foo/1");
            grid.cancelRow();
            start();
        });
    });

    runTest("Grid rowTemplate", function(dom, $scope){
        $scope.options = {
            dataSource: $scope.data,
            columns: [ { field: "text" }, { field: "id" } ],
            rowTemplate: "<tr data-uid='#= uid #'><td colspan='2'>{{dataItem.id}}. {{dataItem.text}}</td></tr>"
        };
        $("<div kendo-grid='grid' k-options='options'></div>").appendTo(dom);
        expect(2);
        $scope.whenRendered(function(){
            var items = $scope.grid.items();
            equal(items.eq(0).text(), "1. Foo");
            equal(items.eq(1).text(), "2. Bar");
            start();
        });
    });

    runTest("Grid frozen columns templates", function(dom, $scope){
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
        $scope.whenRendered(function(){
            var items = $scope.grid.items();
            equal($scope.grid.tbody.text(), "|1||2|");
            equal($scope.grid.lockedContent.text(), "|Foo||Bar|");
            start();
        });
    });

    runTest("Grid toolbar/header/footer templates", function(dom, $scope){
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
        $scope.whenRendered(function(){
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

    runTest("Grid detailTemplate", function(dom, $scope){
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

    runTest("Grid -- compile custom editor field", function(dom, $scope){
        function createEditor(container, options) {
            $("<input name='" + options.field + "' kendo-numerictextbox='ns.numericTextBox' k-ng-bind='dataItem.id' />")
                .appendTo(container);
        }
        $scope.options = {
            dataSource: $scope.data,
            columns: [ { field: "text" }, { field: "id", editor: createEditor } ]
        };
        $scope.ns = {};
        $("<div kendo-grid='grid' k-options='options'></div>").appendTo(dom);
        expect(2);
        $scope.whenRendered(function(){
            var cell = $($scope.grid.items()[1].cells[1]);
            $scope.grid.editCell(cell);
            setTimeout(function(){
                var ntb = $scope.ns.numericTextBox;
                ok( ntb instanceof kendo.ui.NumericTextBox );
                equal( ntb.value(), 2 );
                start();
            }, 5);
        });
    });

    runTest("Grid - compile columns menu", function(dom, $scope){
        $scope.options = {
            dataSource: $scope.data,
            columns: [
                { field: "text", title: "<div class='my-column'>|{{ column.foo }}|</div>", foo: "TEST" }
            ],
            columnMenu: true
        };
        $("<div kendo-grid='grid' k-options='options'></div>").appendTo(dom);
        expect(3);
        $scope.whenRendered(function(){
            var grid = $scope.grid;
            grid.wrapper.find(".k-header-column-menu").click();
            var col = $(".my-column");
            equal(col.length, 2);
            equal(col.eq(0).html(), "|TEST|");
            equal(col.eq(1).html(), "|TEST|");
            start();
        });
    });

    runTest("TreeView item template", function(dom, $scope){
        $scope.options = {
            dataSource: $scope.data,
            template: "{{dataItem.text}} | {{dataItem.id}}"
        };
        $("<div kendo-treeview='tree' k-options='options'></div>").appendTo(dom);
        expect(2);
        $scope.whenRendered(function(){
            var items = $scope.tree.items();
            equal(items.eq(0).text(), "Foo | 1");
            equal(items.eq(1).text(), "Bar | 2");
            start();
        });
    });

    runTest("Draggable hint is compiled in scope of dragged element", function(dom, $scope){
        $scope.options = {
            dataSource: $scope.data,
            template: "{{dataItem.text}}/{{dataItem.id}}",
            dragAndDrop: true,
        };
        $("<div kendo-treeview='tree' k-options='options'></div>").appendTo(dom);
        expect(1);
        $scope.whenRendered(function(){
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

    runTest("Editor toolbar template", function(dom, $scope){
        $scope.options = {
            tools: [
                { template: "<div class='my-toolbar'>{{3 + 3}}</div>" }
            ]
        };
        $("<textarea kendo-editor='editor' k-options='options'></textarea>").appendTo(dom);
        expect(1);
        $scope.whenRendered(function(){
            var el = $scope.editor.toolbar.element.find(".my-toolbar");
            equal(el.text(), "6");
            start();
        });
    });

    runTest("Scheduler -- compile customizable templates", function(dom, $scope){
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
        expect(8);
        $scope.whenRendered(function(){
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
            // Fails in Chrome 33, passes in Chrome 35. Comment for now.
            // equal(scheduler.element.find(".my-event").text(), "|Interview||Foo|");

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

    runTest("Grid k-on-change puts the right information in scope", function(dom, $scope){
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
        $scope.whenRendered(function(){
            $scope.grid.select($scope.grid.items().eq(0));
        });
    });

    runTest("Grid (multiple selection) k-on-change puts the right information in scope", function(dom, $scope){
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
        $scope.whenRendered(function(){
            $scope.grid.select($scope.grid.items());
        });
    });

});
