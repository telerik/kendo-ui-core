---
title: Persisting the State
page_title: jQuery Filter Documentation | Persisting the State
description: "Get started with the jQuery Filter by Kendo UI and learn how to save and restore its state, options, and filter expression."
slug: store_settings_kendoui_filter_widget
position: 3
---

# Persisting the State

The Filter enables you to store its filter expression and restore its state for the user.

## Restoring the State on Load

You can store only the filter expression and enable the Filter to apply it the next time the user visits the page, for example.

The following example demonstrates how to use the `change` event to automatically apply filtering and to maintain an up-to-date state of the Filter. Upon a page reload, the stored settings will be provided to the Filter configuration and will be applied.

```dojo
<ol>
    <li>Change the filter.</li>
    <li>Reload the page: <button type="button" onclick="reloadPage();">Reload</button></li>
    <li>The widget will be initialized with the settings that were stored.</li>
    <li>Clear the stored information to start fresh: <button onclick="clearData();">Clear</button></li>
</ol>
<div id="filter"></div>
<ul id="listView"></ul>

<script type="text/x-kendo-template" id="item">
    <li>
        <strong>#= name #</strong>, aged #= age #, is on vacation: #= isOnLeave #
    </li>
</script>

<script>
    $(document).ready(function () {
        var dataSource = new kendo.data.DataSource({
            data: [
                { name: "Jane Doe", age: "25", isOnLeave: false },
                { name: "John Doe", age: "33", isOnLeave: true },
                { name: "John Smith", age: "37", isOnLeave: true },
                { name: "Nathan Doe", age: 42, isOnLeave: false }
            ],
            schema: {
                model: {
                    fields: {
                        name: { type: "string" },
                        age: { type: "number" },
                        isOnLeave: { type: "boolean" }
                    }
                }
            }
        });

        $("#filter").kendoFilter({
            dataSource: dataSource,
            change: applyAndStoreFilterExpression,
            expressionPreview: true,
            fields: [
                { name: "name", type: "string", label: "Name" },
                { name: "age", type: "number", label: "Age" },
                { name: "isOnLeave", type: "boolean", label: "On Vacation" }
            ],
            expression: getInitialExpression()
        }).data("kendoFilter");

        if (getInitialExpression()) { // Apply filter if there was a stored expression.
            $("#filter").data("kendoFilter").applyFilter();
        }


        $("#listView").kendoListView({
            dataSource: dataSource,
            template: kendo.template($("#item").html())
        });
    });

    function applyAndStoreFilterExpression(e) {
        e.sender.applyFilter(); // Apply filtering on every change.
        localStorage["myInitialFilterExpression"] = JSON.stringify(e.expression); // Store the filter expression for future use.
    }

    function getInitialExpression() {
        if (localStorage["myInitialFilterExpression"]) {
            return JSON.parse(localStorage["myInitialFilterExpression"]);
        }
    }

    function reloadPage() {
        window.location.reload();
    }

    function clearData() {
        delete localStorage["myInitialFilterExpression"];
        reloadPage();
    }
</script>
```

## Loading Settings on Demand

You can also save and load a previous specific state of the Filter upon an application logic event.

The following example demonstrates how to obtain the current filter expression and any other settings and apply them when needed.

```dojo
<ol>
    <li>Change the state of the filter.</li>
    <li>Save the state <button onclick="saveState();">Save</button></li>
    <li>Change the state of the filter again.</li>
    <li>Load the state: <button onclick="loadState();">Load</button></li>
    <li>Clear the state: <button onclick="clearState();">Clear</button></li>
</ol>

<div id="filter"></div>
<div id="chart"></div>

<script>
    $(document).ready(function () {
        var dataSource = new kendo.data.DataSource({
            data: [
                { price: 25, year: 2017 },
                { price: 29, year: 2018 },
                { price: 33, year: 2019 }
            ],
            schema: {
                model: {
                    fields: {
                        price: { type: "number" },
                        year: { type: "number" }
                    }
                }
            }
        });

        $("#filter").kendoFilter({
            dataSource: dataSource,
            expressionPreview: true,
            applyButton: true,
            fields: [
                { name: "price", type: "number", label: "Cost" },
                { name: "year", type: "number", label: "Year" }
            ]
        }).data("kendoFilter");

        $("#chart").kendoChart({
            dataSource: dataSource,
            series: [
                { field: "price" }
            ],
            categoryAxis: {
                field: "year"
            }
        });
    });

    function saveState(e) {
        localStorage["myFilterSettings"] = JSON.stringify(getFilter().getOptions().expression);
        // You can store and restore all options not just the expression.
    }

    function loadState() {
        if (localStorage["myFilterSettings"]) {
            var filter = getFilter();
            var opts = filter.getOptions();
            opts.expression = JSON.parse(localStorage["myFilterSettings"]);
            filter.setOptions(opts);
            // If you will restore all options, you need only filter.setOptions(myOptionsLiteral).

            filter.applyFilter(); // Apply the new filter expression.
        }
    }

    function clearState() {
        delete localStorage["myFilterSettings"];
    }

    function getFilter() {
        return $("#filter").data("kendoFilter");
    }
</script>
```

## See Also

* [Basic Usage of the Filter (Demo)](https://demos.telerik.com/kendo-ui/filter/index)
* [Persisting the State of the Filter (Demo)](https://demos.telerik.com/kendo-ui/filter/persist-state)
* [JavaScript API Reference of the Filter](/api/javascript/ui/filter)
