---
title: Updating Nested Properties in Kendo UI for jQuery Grid Without Refreshing
description: Learn how to update nested JSON object properties in Kendo UI for jQuery Grid without manually refreshing the UI or marking the column as dirty.
type: how-to
page_title: How to Update Nested JSON Properties in Kendo UI for jQuery Grid
meta_title: How to Update Nested JSON Properties in Kendo UI for jQuery Grid
slug: updating-nested-properties-kendo-ui-jquery-grid
tags: kendo-ui-for-jquery, grid, save-event, nested-properties, model-set
res_type: kb
ticketid: 1698964
---

## Environment

<table>
<tbody>
<tr>
<td> Product </td>
<td>Kendo UI for jQuery Grid</td>
</tr>
<tr>
<td> Version </td>
<td>2025.3.1002</td>
</tr>
</tbody>
</table>

## Description

I need to update a column in the Kendo UI for jQuery Grid that is bound to a complex JSON object when another column's value changes. When using [`model.set()`](https://www.telerik.com/kendo-jquery-ui/documentation/api/javascript/data/model/methods/set) in the Save event to update the nested properties of the complex JSON object, the UI does not refresh automatically. This issue also prevents the column from being marked as dirty, even though the value is updated correctly in the model.

Using grid [`refresh`](https://www.telerik.com/kendo-jquery-ui/documentation/api/javascript/ui/grid/methods/refresh) resolves the UI refresh issue, but it introduces a performance hit due to the large number of columns. Other columns bound to primitive values behave correctly and update both the UI and the dirty flag.

This knowledge base article also answers the following questions:
- How to update nested JSON object properties in Kendo UI Grid without manual refresh?
- Why is the dirty flag not displaying for complex object columns in Kendo UI Grid?
- How to resolve UI refresh issues when modifying nested properties in Kendo Grid?

## Solution

To update nested properties in a Kendo UI for jQuery Grid column bound to complex JSON objects, use either of the following approaches:

### Using Entire Object Replacement

Set the entire object to the column instead of updating individual nested properties. This ensures the UI refreshes correctly and the dirty flag is applied.

Modify the Save event as follows:

```javascript
save: function (e) {
          if (e.values.hasOwnProperty("age")) {            
            // Remove previous age digits from first name
            // Note: This logic depends on your specific scenario
            let oldFirstName = e.model.name.first.replace(/[0-9]/g, "");
            // Handle null age values to prevent appending "null" string
            let age = e.values["age"] == null ? '' : e.values["age"];
            e.model.set("name", {
              first: oldFirstName + age,
              last: e.model.name.last,
            });
            e.model.set("eyeColor", "purple");
          }
 },
```

### Example Dojo

You can find an example of this approach below:

```dojo

    
    <div id="grid"></div>
    <script>
      $("#grid").kendoGrid({
        columns: [
          {
            field: "name",
            template: (dataItem) =>
              dataItem.name.first + " " + dataItem.name.last,
            editable: function (dataItem) {
              return false;
            },
          },
          {
            field: "age",
          },
          {
            field: "eyeColor",
          },
        ],
        dataSource: {
          data: [
            {
              id: 1,
              name: { first: "Jane", last: "Doe" },
              age: 30,
              eyeColor: "blue",
            },
            {
              id: 2,
              name: { first: "John", last: "Doe" },
              age: 33,
              eyeColor: "red",
            },
          ],
          schema: {
            model: {
              id: "id",
              fields: {
                age: { type: "number" },
              },
            },
          },
        },
        editable: {
          mode: "incell",
        },
        save: function (e) {
          if (e.values.hasOwnProperty("age")) {            
            // Remove previous age digits from first name
            let oldFirstName = e.model.name.first.replace(/[0-9]/g, "");
            // Handle null age values to prevent appending "null" string
            let age = e.values["age"] == null ? '' : e.values["age"];
            e.model.set("name", {
              first: oldFirstName + age,
              last: e.model.name.last,
            });
            e.model.set("eyeColor", "purple");
          }
        },
      });
    </script>
```

### Using Nested Properties and Manual Refresh

If replacing the entire object is not feasible, call [`refresh`](https://www.telerik.com/kendo-jquery-ui/documentation/api/javascript/ui/grid/methods/refresh) after updating nested properties. This forces the UI to redraw but may introduce performance issues for large grids.

Example:

```javascript
save: function(e) {
    if (e.values.hasOwnProperty("age")) {
        e.model.set("name.first", "Jane Changed");
        e.model.set("name.last", "Doe " + e.model.age);
        e.model.set("eyeColor", "purple");
        e.sender.refresh(); // Manually refresh the grid
    }
}
```


## See Also

- [Using Nested Model Properties in Kendo UI for jQuery Grid](https://www.telerik.com/kendo-jquery-ui/documentation/knowledge-base/use-nested-model-properties)
- [Kendo UI Grid Overview](https://docs.telerik.com/kendo-ui/controls/data-management/grid/overview)
- [Kendo UI Grid API Documentation](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid)
