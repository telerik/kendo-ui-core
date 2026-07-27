---
title: Display AutoComplete Dropdown on Focus in Kendo UI for jQuery Grid
description: Learn how to display the AutoComplete dropdown list in a Kendo UI for jQuery Grid column on focus.
type: how-to
page_title: Show AutoComplete Dropdown on Focus in Kendo UI Grid Column
meta_title: Show AutoComplete Dropdown on Focus in Kendo UI Grid Column
slug: autocomplete-dropdown-on-focus-kendo-grid
tags: kendo-ui,jquery,grid,autocomplete,focus,dropdown
res_type: kb
ticketid: 1695787
---

## Environment

<table>
<tbody>
<tr>
<td> Product </td>
<td> Kendo UI for jQuery Grid </td>
</tr>
<tr>
<td> Version </td>
<td> 2026.2.520 </td>
</tr>
</tbody>
</table>

## Description

I have an AutoComplete editor in a Kendo UI for jQuery Grid column. The dropdown list only appears when I start typing. I want the dropdown list to display when I click into the cell, using the `focus` event.

This knowledge base article also answers the following questions:
- How to trigger AutoComplete dropdown on focus in Kendo UI Grid?
- How to show AutoComplete suggestions when clicking into a Grid cell?
- How to display all AutoComplete results on focus in Kendo UI Grid?

## Solution

To display the AutoComplete dropdown on focus, bind the `focus` event to the input element and use the [search](https://docs.telerik.com/kendo-ui/api/javascript/ui/autocomplete/methods/search) method of the Kendo UI for jQuery AutoComplete.

### Steps:
1. Add an AutoComplete editor to the Grid column.
2. Bind the `focus` event of the input element.
3. Use the `search` method to display the dropdown.

Here is an example implementation:

```javascript
editor: function (container, options) {
    var input = $('<input data-bind="value: ' + options.field + '"/>');
    input.appendTo(container);
    var ac = input.kendoAutoComplete({
        dataSource: filterSource_new_project_group_grid,
        dataTextField: "new_project_group",
        filter: "contains",
        minLength: 0
    }).data("kendoAutoComplete");

    // Bind to the `focus` event
    input.on("focus", function () {
        ac.search(""); // Displays the dropdown
    });
}
```

### Display All Records
If you want to show all the records regardless of the current input value, clear the value before calling the `search` method:

```javascript
input.on("focus", function () {
    ac.value(''); // Clear the current value
    ac.search(""); // Displays all records
});
```

Below is a runnable example:

```dojo
 <div id="example">
      <div id="grid"></div>
      <script>
        $(document).ready(function () {
          var data = ["Toronto", "New York", "London", "Paris"];
          var CityAutoComplete = $("#City").kendoAutoComplete({
            dataSource: data,
            filter: "startswith",
            placeholder: "Select city...",
            separator: ", ",
          });

          var crudServiceBaseUrl = "https://demos.telerik.com/service/v2/core/",
            dataSource = new kendo.data.DataSource({
              transport: {
                read: {
                  url: crudServiceBaseUrl + "/Products",
                },
                update: {
                  url: crudServiceBaseUrl + "/Products/Update",
                  type: "POST",
                  contentType: "application/json",
                },
                destroy: {
                  url: crudServiceBaseUrl + "/Products/Destroy",
                  type: "POST",
                  contentType: "application/json",
                },
                create: {
                  url: crudServiceBaseUrl + "/Products/Create",
                  type: "POST",
                  contentType: "application/json",
                },
                parameterMap: function (options, operation) {
                  if (operation !== "read" && options.models) {
                    return kendo.stringify(options.models);
                  }
                },
              },
              batch: true,
              pageSize: 20,
              schema: {
                model: {
                  id: "ProductID",
                  fields: {
                    ProductID: { editable: false, nullable: true },
                    ProductName: { validation: { required: true } },
                    UnitPrice: {
                      type: "number",
                      validation: { required: true, min: 1 },
                    },
                    Discontinued: { type: "boolean" },
                    UnitsInStock: {
                      type: "number",
                      validation: { min: 0, required: true },
                    },
                  },
                },
              },
            });

          $("#grid").kendoGrid({
            dataSource: dataSource,
            navigatable: true,
            pageable: true,
            height: 550,
            toolbar: {
              items: ["create", "save", "cancel"],
              showInactiveTools: true,
            },
            columns: [
              {
                field: "UnitPrice",
                title: "Unit Price",
                format: "{0:c}",
                width: 120,
              },
              {
                field: "ProductName",
                editor: function (container, options) {
                  var input = $(
                    '<input autocomplete="City" data-bind="value: ' +
                      options.field +
                      '"/>',
                  );
                  input.attr("new_project_group", options.field);
                  input.appendTo(container);
                  input.kendoAutoComplete({
                    dataSource: [
                      { product: "Chai" },
                      { product: "Chang" },
                      { product: "Apple" },
                      { product: "Orange" },
                      { product: "Tea" },
                      { product: "Coffee" },
                    ],
                    dataTextField: "product",
                    change: function (e) {
                      $("#grid").data("kendoGrid").closeCell();
                    },
                    filter: "contains",
                    minLength: 0,
                  });

                  var ac = input.data("kendoAutoComplete");

                  input.on("focus", function () {
                    ac.search("");
                  });
                },
                width: "230px",
              },

              { field: "UnitsInStock", title: "Units In Stock", width: 120 },
              { field: "Discontinued", width: 120 },
            ],
            editable: true,
          });
        });
      </script>
    </div>
```

## See Also

- [Kendo UI AutoComplete API](/api/javascript/ui/autocomplete)
- [Kendo UI for jQuery AutoComplete Overview](https://www.telerik.com/kendo-jquery-ui/documentation/controls/autocomplete/overview)
- [Kendo UI for jQuery Grid Overview](https://www.telerik.com/kendo-jquery-ui/documentation/controls/grid/overview)
