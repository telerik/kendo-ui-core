(function() {
   module("NG pro", {
       setup: function() {
           fixtureData = new kendo.data.ObservableArray([
               { text: "Foo", id: 1 },
               { text: "Bar", id: 2 }
           ]);
       },
       teardown: function() {
           kendo.destroy(QUnit.fixture);
       }
   });

   var windowOptions = {
       title: "Das titlen"
   };

   var fixtureData;

    function trigger(type, el, e) {
        el.trigger($.Event(type, e));
    }

    ngTest("Grid cell templates after edit", 7, function() {

        angular.module("kendo.tests").controller("mine", function($scope) {
            $scope.options = {
                dataSource: new kendo.data.DataSource({
                    data: fixtureData
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
        });

        $("<div ng-controller='mine'><div kendo-grid='grid' k-options='options'></div></div>").appendTo(QUnit.fixture);
    },

    function() {
        var grid = QUnit.fixture.find('[data-role=grid]').getKendoGrid();
        var el = grid.element;
        var tbody = grid.tbody;
        var rows = tbody.find("tr");
        var scope = grid.element.scope();

        equal(el.find('.command-template').eq(0).text(), "Foo/1");
        equal(el.find('.command-template').eq(1).text(), "Bar/2");

        grid.editRow(grid.tbody.find("tr").eq(0));
        grid.cancelRow();
        equal(grid.tbody.find("tr").eq(0).find("td").eq(0).text(), "|Foo|");
        equal(grid.tbody.find("tr").eq(0).find("td").eq(1).text(), "|1|");

        grid.editCell(grid.tbody.find("tr").eq(0).find("td").eq(0));
        grid.closeCell();
        equal(grid.tbody.find("tr").eq(0).find("td").eq(0).text(), "|Foo|");

        scope.$apply(function(){
            fixtureData[0].id = "3";
            fixtureData[1].id = "4";
        });

        equal(grid.tbody.find("tr").eq(0).find("td").eq(1).text(), "|3|");
        equal(grid.tbody.find("tr").eq(1).find("td").eq(1).text(), "|4|");
    }
    );

    ngTest("Grid cell templates", 4, function(){
        angular.module("kendo.tests").controller("mine", function($scope) {
            $scope.options = {
                dataSource: fixtureData,
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
        });

        $("<div ng-controller=mine><div kendo-grid='grid' k-options='options'></div></div>").appendTo(QUnit.fixture);
    },

    function() {
        var grid = QUnit.fixture.find('[data-role=grid]').getKendoGrid();

        var rows = $("tr", grid.tbody);
        equal($(grid.thead[0].rows[0].cells[0]).text(), "6");
        equal($(grid.element.find(".k-footer-template")[0].cells[0]).text(), "8");
        equal(rows.eq(0).text(), "|Foo||1|");
        equal(rows.eq(1).text(), "|Bar||2|");
    }
    );

    ngTest("Grid getOptions does not contain circular references", 1, function(){
        angular.module("kendo.tests").controller("mine", function($scope) {
            $scope.options = {
                dataSource: fixtureData,
                columns: [ "text", "id" ]
            };
        });

        $("<div ng-controller=mine><div kendo-grid='grid' k-options='options'></div></div>").appendTo(QUnit.fixture);
    },

    function() {
        var grid = QUnit.fixture.find('[data-role=grid]').getKendoGrid();

        ok(kendo.stringify(grid.getOptions()))
    }
    );

    ngTest("Grid cell templates", 4, function(){
        angular.module("kendo.tests").controller("mine", function($scope) {
            $scope.options = {
                dataSource: fixtureData,
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
        });

        $("<div ng-controller=mine><div kendo-grid='grid' k-options='options'></div></div>").appendTo(QUnit.fixture);
    }, function() {
        var grid = QUnit.fixture.find('[data-role=grid]').getKendoGrid();
        var rows = $("tr", grid.tbody);
        equal($(grid.thead[0].rows[0].cells[0]).text(), "6");
        equal($(grid.element.find(".k-footer-template")[0].cells[0]).text(), "8");
        equal(rows.eq(0).text(), "|Foo||1|");
        equal(rows.eq(1).text(), "|Bar||2|");
    }
   );

    ngTest("Grid group template", 2, function(){
        angular.module("kendo.tests").controller("mine", function($scope) {
            $scope.options = {
                dataSource: {
                    data: fixtureData,
                    group: { field: "text" }
                },
                columns: [
                    { field: "text", groupHeaderTemplate: "|{{dataItem.value}}|" },
                    { field: "id" }
                ]
            };
        });

        $("<div ng-controller=mine><div kendo-grid='grid' k-options='options'></div></div>").appendTo(QUnit.fixture);
    }, function() {
        var grid = QUnit.fixture.find('[data-role=grid]').getKendoGrid();
        var groupRows = $("tr.k-grouping-row", grid.tbody);

        equal(groupRows.first().text(), "|Bar|");
        equal(groupRows.last().text(), "|Foo|");
    }
   );

    ngTest("Grid group template are in correct order with multiple group descriptors", 4, function(){
        angular.module("kendo.tests").controller("mine", function($scope) {
            $scope.options = {
                dataSource: {
                    data: fixtureData,
                    group: [{ field: "text" }, { field: "id" }]
                },
                columns: [
                    { field: "text", groupHeaderTemplate: "|{{dataItem.value}}|" },
                    { field: "id", groupHeaderTemplate: "|{{dataItem.value}}|" }
                ]
            };
        });

        $("<div ng-controller=mine><div kendo-grid='grid' k-options='options'></div></div>").appendTo(QUnit.fixture);
    }, function() {
        var grid = QUnit.fixture.find('[data-role=grid]').getKendoGrid();
        var groupRows = $("tr.k-grouping-row", grid.tbody);

        equal(groupRows.first().text(), "|Bar|");
        equal($.trim(groupRows.eq(1).text()), "|2|");
        equal(groupRows.eq(2).text(), "|Foo|");
        equal($.trim(groupRows.last().text()), "|1|");
    }
   );
    ngTest("Grid -- compile custom editor field", 2, function(){
        function createEditor(container, options) {
            $("<input name='" + options.field + "' kendo-numerictextbox='ns.numericTextBox' k-ng-bind='dataItem.id' />")
                .appendTo(container);
        }

        angular.module("kendo.tests").controller("mine", function($scope) {
            $scope.options = {
                dataSource: fixtureData,
                columns: [ { field: "text" }, { field: "id", editor: createEditor } ]
            };
            $scope.ns = {};
        });

        $("<div ng-controller=mine><div kendo-grid='grid' k-options='options'></div></div>").appendTo(QUnit.fixture);

        }, function() {
            stop();

            var grid = QUnit.fixture.find('[data-role=grid]').getKendoGrid();
            var scope = grid.element.scope();
            var cell = $(grid.items()[1].cells[1]);

            grid.editCell(cell);

            setTimeout(function(){
                var ntb = scope.ns.numericTextBox;
                ok( ntb instanceof kendo.ui.NumericTextBox );
                equal( ntb.value(), 2 );
                start();
            }, 5);
        }
    );

    ngTest("Grid item scopes are destroyed when page is changed", 2, function() {
        angular.module("kendo.tests").controller("mine", function($scope) {
            $scope.options = {
                dataSource: {
                    data: fixtureData,
                    pageSize: 1
                },
                columns: [ { field: "text" }, { field: "id" } ],
                pageable: true
            };
        });

        $("<div ng-controller=mine><div kendo-grid='grid' k-options='options'></div></div>").appendTo(QUnit.fixture);

        }, function() {
            stop();

            var grid = QUnit.fixture.find('[data-role=grid]').getKendoGrid(),
                $scope = grid.element.scope();

            function firstRow() {
                return grid.items().eq(0);
            }

            firstRow().scope().$on("$destroy", function(){ ok(true) });
            grid.wrapper.find(".k-pager-wrap li:last > a").click();
            firstRow().scope().$on("$destroy", function(){ ok(true) });
            grid.wrapper.find(".k-pager-wrap li:first > a").click();
            setTimeout(start, 100);
        }
    );


    ngTest("Grid popup editable template", 1, function() {
        angular.module("kendo.tests").controller("mine2", function($scope) {
        $scope.options = {
            dataSource: new kendo.data.DataSource({
                data: fixtureData
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
        });

        $("<div ng-controller=mine2><div kendo-grid='grid' k-options='options'></div></div>").appendTo(QUnit.fixture);
    }, function() {
            var grid = QUnit.fixture.find('[data-role=grid]').getKendoGrid();

            grid.editRow(grid.tbody.find("tr:first"));
            var el = grid._editContainer.find(".my-editable");
            equal(el.text(), "Foo/1");
            grid.cancelRow();
    });

    ngTest("Grid rowTemplate", 2, function(){
        angular.module("kendo.tests").controller("mine", function($scope) {
            $scope.options = {
                dataSource: fixtureData,
                columns: [ { field: "text" }, { field: "id" } ],
                rowTemplate: "<tr data-uid='#= uid #'><td colspan='2'>{{dataItem.id}}. {{dataItem.text}}</td></tr>"
            };
        });

        $("<div ng-controller=mine><div kendo-grid='grid' k-options='options'></div></div>").appendTo(QUnit.fixture);
        }, function() {
            var grid = QUnit.fixture.find('[data-role=grid]').getKendoGrid();
            var items = grid.items();
            equal(items.eq(0).text(), "1. Foo");
            equal(items.eq(1).text(), "2. Bar");
        }
    );

    ngTest("Grid frozen columns templates", 2, function(){
        angular.module("kendo.tests").controller("mine", function($scope) {
            $scope.options = {
                dataSource: fixtureData,
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
        });

        $("<div ng-controller=mine><div kendo-grid='grid' k-options='options'></div></div>").appendTo(QUnit.fixture);

    }, function () {
        var grid = QUnit.fixture.find('[data-role=grid]').getKendoGrid();
        var items = grid.items();
        equal(grid.tbody.text(), "|1||2|");
        equal(grid.lockedContent.text(), "|Foo||Bar|");
    });

    ngTest("Grid toolbar/header/footer templates", 5, function(){
        angular.module("kendo.tests").controller("mine", function($scope) {
            $scope.options = {
                dataSource: {
                    data: fixtureData,
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
        });

        $("<div ng-controller=mine><div kendo-grid='grid' k-options='options'></div></div>").appendTo(QUnit.fixture);
    }, function () {
            var grid = QUnit.fixture.find('[data-role=grid]').getKendoGrid();
            var toolbar = grid.element.find(".k-grid-toolbar .my-toolbar");
            var header = grid.element.find(".k-grid-header");
            var footer = grid.element.find(".k-grid-footer");
            equal(toolbar.text(), "6");
            equal(header.find(".my-header").eq(0).text(), "text");
            equal(header.find(".my-header").eq(1).text(), "id");
            equal(footer.find(".my-footer").eq(0).text(), "text");
            equal(footer.find(".my-footer").eq(1).text(), "3");
        }
    );

    ngTest("Grid detailTemplate", 2, function() {
        var count = 2;
        expect(count);
        angular.module("kendo.tests").controller("mine", function($scope) {
            $scope.options = {
                dataSource: fixtureData,
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
        });

        $("<div ng-controller=mine><div kendo-grid='grid' k-options='options'></div></div>").appendTo(QUnit.fixture);
    }, function() {
        stop();
    });

    ngTest("Grid - compile columns menu", 3, function(){
        angular.module("kendo.tests").controller("mine", function($scope) {
            $scope.options = {
                dataSource: $scope.data,
                columns: [
                    { field: "text", title: "<div class='my-column'>|{{ column.foo }}|</div>", foo: "TEST" }
                ],
                columnMenu: true
            };
        });

        $("<div ng-controller=mine><div kendo-grid='grid' k-options='options'></div></div>").appendTo(QUnit.fixture);
    }, function() {
        var grid = QUnit.fixture.find('[data-role=grid]').getKendoGrid();
        grid.wrapper.find(".k-header-column-menu").click();
        var col = $(".my-column");
        equal(col.length, 2);
        equal(col.eq(0).html(), "|TEST|");
        equal(col.eq(1).html(), "|TEST|");
    });

    ngTest("TreeView item template", 2, function(){
        angular.module("kendo.tests").controller("mine", function($scope) {
        $scope.options = {
            dataSource: fixtureData,
            template: "{{dataItem.text}} | {{dataItem.id}}"
        };
        });
        $("<div ng-controller=mine><div kendo-treeview='tree' k-options='options'></div></div>").appendTo(QUnit.fixture);
        }, function () {
            var tree = QUnit.fixture.find('[data-role=treeview]').getKendoTreeView();
            var items = tree.items();
            equal(items.eq(0).text(), "Foo | 1");
            equal(items.eq(1).text(), "Bar | 2");
    });

    ngTest("Draggable hint is compiled in scope of dragged element", 1, function(){
        angular.module("kendo.tests").controller("mine", function($scope) {
        $scope.options = {
            dataSource: fixtureData,
            template: "{{dataItem.text}}/{{dataItem.id}}",
            dragAndDrop: true,
        };
        });
        $("<div ng-controller=mine><div kendo-treeview='tree' k-options='options'></div></div>").appendTo(QUnit.fixture);
        }, function () {
            var tree = QUnit.fixture.find('[data-role=treeview]').getKendoTreeView();
            var item = tree.items().eq(0).find(".k-in:first");
            var pos = item.offset();
            trigger("mousedown", item, { pageX: pos.left, pageY: pos.top });
            trigger("mousemove", $(document.documentElement), {
                pageX: pos.left + 50,
                pageY: pos.top + 50
            });
            equal(tree.dragging._draggable.hint.text(), "Foo/1");
    });

    ngTest("Editor toolbar template", 1, function() {
            angular.module("kendo.tests").controller("mine", function($scope) {
                $scope.options = {
                    tools: [
                        { template: "<div class='my-toolbar'>{{3 + 3}}</div>" }
                    ]
                };
            });
            $("<div ng-controller=mine><textarea kendo-editor='editor' k-options='options'></textarea></div>").appendTo(QUnit.fixture);
        }, function () {
            var el = QUnit.fixture.find('[data-role=editor]').getKendoEditor().toolbar.element.find(".my-toolbar");
            equal(el.text(), "6");
    });

    ngTest("Scheduler -- compile customizable templates", 10, function() {
        angular.module("kendo.tests").controller("mine", function($scope) {
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
                    },{
                        id: 3,
                        start: new Date("2013/6/6 10:00 AM"),
                        end: new Date("2013/6/6 11:00 AM"),
                        title: "Foo",
                        isAllDay: false
                    },{
                        id: 4,
                        start: new Date("2013/6/7 10:00 AM"),
                        end: new Date("2013/6/7 11:00 AM"),
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
        });

        $("<div ng-controller=mine><div kendo-scheduler='scheduler' k-options='options'></div></div>").appendTo(QUnit.fixture);
        }, function() {
            stop();
            var scheduler = QUnit.fixture.find('[data-role=scheduler]').getKendoScheduler();

            function shouldDestroy(sel) {
                var scope = scheduler.element.find(sel).scope();
                scope.$on("$destroy", function(){
                    ok(true);
                });
            }

            scheduler.view("day");
            equal(scheduler.element.find(".my-event").text(), "|Foo||Foo|");
            equal(scheduler.element.find(".my-allday-event").text(), "|Interview|");

            scheduler.view("week");
            equal(scheduler.element.find(".my-event").text(), "|Foo||Foo||Foo|");
            equal(scheduler.element.find(".my-allday-event").text(), "|Interview|");

            // month and agenda views will use eventTemplate for all-day events too
            // so both events will be displayed in a <div class="my-event">

            scheduler.view("month");
            equal(scheduler.wrapper.find(".k-event")[0].getAttribute("data-uid"), scheduler.dataItems()[0].uid);
            equal(scheduler.wrapper.find(".k-event")[2].getAttribute("data-uid"), scheduler.dataItems()[2].uid);
            equal(scheduler.dataItems().length, 3);
            // Fails in Chrome 33, passes in Chrome 35. Comment for now.
            // equal(scheduler.element.find(".my-event").text(), "|Interview||Foo|");

            scheduler.view("agenda");
            equal(scheduler.element.find(".my-event").text(), "|Interview||Foo||Foo||Foo|");

            scheduler.view("day");
            scheduler.editEvent(scheduler.dataSource.at(0));
            shouldDestroy(".my-event");
            shouldDestroy(".my-allday-event");
            scheduler.date(new Date("2014/6/6 10:00 AM"));

            setTimeout(start, 100);
    });

    ngTest("Grid k-on-change puts the right information in scope", 4, function(){
        angular.module("kendo.tests").controller("mine", function($scope) {
                $scope.options = {
                    dataSource: fixtureData,
                    columns: [ { field: "text" }, { field: "id" } ],
                    selectable: true
                };
                $scope.check = function(kendoEvent, selected, data, dataItem) {
                    var grid = $scope.grid;
                    equal(kendoEvent.sender, grid);
                    equal($(selected.sel)[0], grid.items()[0]);
                    equal(data, dataItem);
                    equal(dataItem.id, fixtureData[0].id);
                    start();
                };
        });
        $("<div ng-controller=mine><div kendo-grid='grid' k-options='options' k-on-change='check(kendoEvent, { sel: selected }, data, dataItem)'></div></div>").appendTo(QUnit.fixture);
        }, function () {
            stop();
            var grid = QUnit.fixture.find('[data-role=grid]').getKendoGrid();
            grid.select(grid.items().eq(0));
    });

    ngTest("Grid (multiple selection) k-on-change puts the right information in scope", 4, function(){
        angular.module("kendo.tests").controller("mine", function($scope) {
            $scope.options = {
                dataSource: fixtureData,
                columns: [ { field: "text" }, { field: "id" } ],
                selectable: "multiple"
            };
            $scope.check = function(selected, data) {
                var grid = $scope.grid;
                equal(selected.sel[0], grid.items()[0]);
                equal(selected.sel[1], grid.items()[1]);
                equal(data[0].id, fixtureData[0].id);
                equal(data[1].id, fixtureData[1].id);
                start();
            };
        });
        $("<div ng-controller=mine><div kendo-grid='grid' k-options='options' k-on-change='check({ sel: selected }, data)'></div></div>").appendTo(QUnit.fixture);
        }, function () {
            stop();
            var grid = QUnit.fixture.find('[data-role=grid]').getKendoGrid();
            grid.select(grid.items());
    });

    ngTest("TreeList uses TreeListDataSource", 1, function () {
        angular.module("kendo.tests").controller("treelist", function($scope) {
            $scope.data = [ { id: 1, parentId: null } ];
        });

        $("<div ng-controller=treelist><div kendo-treelist k-data-source='data'/></div>")
            .appendTo(QUnit.fixture);

    }, function() {
        var treelist = QUnit.fixture.find('[data-role=treelist]').getKendoTreeList();
        ok(treelist.dataSource instanceof kendo.data.TreeListDataSource);
    });

    ngTest("TreeList compiles toolbar/header/footer", 3, function() {
        angular.module("kendo.tests").controller("treelist", function($scope) {
            $scope.options = {
                dataSource: {
                    data: [
                        { id: 1, parentId: null },
                        { id: 2, parentId: null }
                    ],
                    aggregate: [
                        { field: "id", aggregate: "sum" },
                    ]
                },
                toolbar: "foo {{ 1 + 1 }}",
                columns: [
                    { field: "id",
                      foo: 1,
                      title: "foo: {{ column.foo }}",
                      footerTemplate: "foo: {{ column.foo }}, sum: {{ aggregate.sum }}" }
                ]
            };
        });

        $("<div ng-controller=treelist><div kendo-treelist k-options='options'/></div>")
            .appendTo(QUnit.fixture);
    }, function() {
        var treelist = QUnit.fixture.find('[data-role=treelist]').getKendoTreeList();
        var wrapper = treelist.wrapper;

        equal(wrapper.find(".k-grid-toolbar").text(), "foo 2");
        equal(wrapper.find("th.k-header").text(), "foo: 1");
        equal(wrapper.find(".k-footer-template").text(), "foo: 1, sum: 3");
    });

    ngTest("Upload template", 1, function(){
        angular.module("kendo.tests").controller("mine", function($scope) {
            $scope.options = {
                template: "{{name}}"
            };
        });

        $("<div ng-controller=mine><input kendo-upload='upload' k-options='options'></input></div>").appendTo(QUnit.fixture);
    }, function () {
            var uploadElement = QUnit.fixture.find('[data-role=upload]');
            var upload = uploadElement.getKendoUpload();
            var clickEvent = $.Event("click");
            uploadElement.trigger(clickEvent);
            if (!clickEvent.isDefaultPrevented()) {
                uploadElement.val("foo.txt").trigger("change");
            }

            equal($(".k-file").html(), "foo.txt");
    });
})();

