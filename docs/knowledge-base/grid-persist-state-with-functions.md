---
title: Persist the State of the Grid alongside the Function Handlers
description: "Persist the Grid state and include the function definitions in the saved options."
type: how-to
page_title: Persist the State of the Kendo UI Grid alongside the Function Handlers - Kendo UI Grid for jQuery
slug: grid-persist-state-with-functions
tags: grid, persist, state, save, options, restore, function, functions, handler, handlers
res_type: kb
---

## Environment
<table>
	<tbody>
		<tr>
			<td>Product</td>
			<td>Progress® Kendo UI® Grid for jQuery</td>
		</tr>
	</tbody>
</table>

## Description

By default [`JSON.stringify()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify) cannot serialize function definitions. Event handlers and other similar Grid configurations are lost when the state is persisted with [`getOptions`](/api/javascript/ui/grid/methods/getoptions) and [`setOptions`](/api/javascript/ui/grid/methods/setoptions).

## Solution

Implement a custom [`JSON reviver`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse#using_the_reviver_parameter) which can serialize and deserialize the function definitions.

```dojo
<script type="x-kendo/template" id="template">
    <button class='k-button' onclick='kendo.alert("WORKS")'>My Button</button>
</script>

<button id="save">Save Options</button>
<button id="set">Set Options</button>
<div id="grid"></div>
<script>
    extendJsonParsing();

    $(document).ready(function () {
        $("#grid").kendoGrid({
            dataSource: {
                type: "odata",
                transport: {
                    read: "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Orders"
                },
                schema: {
                    model: {
                        fields: {
                            OrderID: { type: "number" },
                            Freight: { type: "number" },
                            ShipName: { type: "string" },
                            OrderDate: { type: "date" },
                            ShipCity: { type: "string" }
                        }
                    }
                },
                pageSize: 20,
                serverPaging: true,
                serverFiltering: true,
                serverSorting: true
            },
            // Databound function that must also be saved in the options of the user.
            dataBound: function (e) {
                console.log("The DataBound event was fired.");
            },
            toolbar: kendo.template($("#template").html()),
            height: 550,
            filterable: true,
            sortable: true,
            pageable: true,
            columns: [{
                field: "OrderID",
                filterable: false
            },
            /* Editable function that must also be saved in the options of the user */
            { field: "Freight", editable: function () { return false; } },
            {
                field: "OrderDate",
                title: "Order Date",
                format: "{0:MM/dd/yyyy}"
            }, {
                field: "ShipName",
                title: "Ship Name"
            }, {
                field: "ShipCity",
                title: "Ship City"
            }
            ]
        });
    });

    $("#save").on("click", function (e) {
        e.preventDefault();
        var options = $("#grid").data("kendoGrid").getOptions();
        // Stringify the grid options.
        var stringOptions = JSON.stringify(options);
        // Save them in the local storage.
        localStorage["kendo-grid-persist-options"] = stringOptions;
    });

    $("#set").on("click", function (e) {
        e.preventDefault();
        var options = localStorage["kendo-grid-persist-options"];
        if (options) {
            // Parse the options using the custom reviver.
            var parseOptions = JSON.parse(options, Function.deserialize);

            var grid = $("#grid").data("kendoGrid");
            // Set the options back to the Grid.
            grid.setOptions(parseOptions);
        }
    });

    function extendJsonParsing() {
        Function.prototype.toJSON = function () {
            // Retrieve the function definition.
            var output = this.toString();
            // The default schema.model.fields parsers cannot be serialized. You need to exclude them.
            var parsers = ["number", "date", "boolean", "string"];

            if (
                this.name &&
                (new RegExp('^\\s*' + this.name + '\\s*([(])')).test(output)
            )
                output = 'function ' + output;

            // Stringify the function as long as it isn't one of the default parsers.
            if (!parsers.includes(this.name))
                return Function.prototype.toJSON.flag + output;
        };
        Function.prototype.toJSON.flag = '_FUNC';
        Function.deserialize = function (key, data) {
            // Check if the current field that is being deserialized is a function or not.
            if (!Function.deserialize.check.test(data))
                return data;

            // If it is a function, remove the flag from it.
            data = data.replace(Function.deserialize.check, '');

            // Parse the string back to a regular function.
            return new Function(
                'return (' + data + ').apply(this, arguments);'
            );
        };
        Function.deserialize.check = new RegExp('^' + Function.prototype.toJSON.flag);
    }
</script>
```