---
title: Storing and Rebinding Kendo UI Filter Options
description: Learn how to save and restore the filter options of Kendo UI Filter to maintain user filter preferences across sessions.
type: how-to
page_title: How to Persist Kendo UI Filter Options for User Sessions
slug: storing-and-rebinding-kendo-ui-filter-options
tags: kendo ui, filter, getoptions, setoptions, localstorage, jquery
res_type: kb
ticketid: 1656799
---

## Environment

| Product | Kendo UI for jQuery / Filter |
| --- | --- |
| Version | 2023.3.1010 |

## Description

I am using Kendo UI for jQuery in my application to filter data based on user input. I want to maintain the filtered state even after the user logs out and logs back in. I need to extract the filter expression and save it in our database, then restore this state when the user returns.

This KB article also answers the following questions:
- How can I save the Kendo UI Filter state in the local storage?
- How do I restore the Kendo UI Filter state from the local storage on page load?
- What is the best practice for persisting user filter preferences in Kendo UI Filter?

## Solution

To persist the filter expressions across user sessions, use the `getOptions()` and `setOptions()` methods of the Kendo UI Filter. Here's a step-by-step guide to save the filter options into the local storage and restore them later, which can be adapted for database storage:

1. **Save the Filter State**: Use the `getOptions()` method to get the current state of the filter and save it. For local storage, you can serialize the options with `kendo.stringify` and store them. For database storage, send this serialized data to your server-side method to save it in the database.

```javascript
$("#save").click(function(e) {
  e.preventDefault();
  var filter = $("#filter").data("kendoFilter");
  var filterOptions = kendo.stringify(filter.getOptions());
  localStorage["kendo-filter-options"] = filterOptions;
  // For database storage, send filterOptions to your server here
});
```

2. **Restore the Filter State**: Retrieve the saved options and use the `setOptions()` method to apply them to the filter. If you stored the options in a database, first fetch them when initializing your page, and then proceed with the restoration.

```javascript
$("#load").click(function(e) {
  e.preventDefault();
  var filter = $("#filter").data("kendoFilter");
  var options = localStorage["kendo-filter-options"]; // Replace with database retrieval logic
          //use below to modify the expression if desired
          //optionsJSON.expression = {
          //  logic: "or",
          //    filters: [
          //      { field: "price", value: 5, operator: "gte" },
          //      { field: "name", value: "salad", operator: "contains" }
          //    ]
          //}
  if (options) {
    var optionsJSON = JSON.parse(options);
    filter.setOptions(optionsJSON);
  }
});
```
Refer to the below Dojo demo for a complete example.

```dojo
    <div id="example" role="application">
      <div id="filter"></div>
      <br />
      <br />
      <br />
      <a href="#" class="k-button" id="save">Save State</a>
      <a href="#" class="k-button" id="load">Load State</a>
      <script>
        window.contentPath = '/kendo-ui/content/mobile/apps/sushi';
        $(document).ready(function () {
          var dataSource = new kendo.data.DataSource({
            transport: {
              read: {
                dataType: "json",
                url: window.contentPath + "/menu.json"
              }
            },
            pageSize: 4,
            schema: {
              model: {
                fields: {
                  name: { type: "string" },
                  price: { type: "number" },
                  image: { type: "string" },
                  category: { type: "string" },
                  description: { type: "string" },
                  featured: { type: "boolean" }
                }
              }
            }
          });

          $("#filter").kendoFilter({
            dataSource: dataSource,
            expressionPreview: true,
            applyButton: true,
            fields: [
              { name: "name", type: "string", label: "Name" },
              { name: "price", type: "number", label: "Price" },
              { name: "description", type: "string", label: "Description" }
            ],
            expression: {
              logic: "or",
              filters: [
                { field: "price", value: 5, operator: "gte" },
                { field: "name", value: "salad", operator: "contains" }
              ]
            }
          }).data("kendoFilter").applyFilter();

        });


        $("#save").click(function (e) {
          e.preventDefault();
          var filter = $("#filter").data("kendoFilter");
          console.log(filter)
          localStorage["kendo-filter-options"] = kendo.stringify(filter.getOptions());
        });

        $("#load").click(function (e) {
          e.preventDefault();
          var filter = $("#filter").data("kendoFilter");
          var options = localStorage["kendo-filter-options"];
          var optionsJSON = JSON.parse(options);
          //use below to modify the expression
          //optionsJSON.expression = {
          //  logic: "or",
          //    filters: [
          //      { field: "price", value: 5, operator: "gte" },
          //      { field: "name", value: "salad", operator: "contains" }
          //    ]
          //}
          
          if (optionsJSON) {
            filter.setOptions(optionsJSON);
          }
        });

      </script>
    </div>
```

## Notes

- When saving filter options to a database, ensure to securely handle the data to prevent injection attacks.
- Consider user privacy and data protection regulations when storing user data.

## See Also

- [Kendo UI Filter Documentation](https://docs.telerik.com/kendo-ui/api/javascript/ui/filter)
- [Kendo.stringify Function Documentation](https://docs.telerik.com/kendo-ui/api/javascript/kendo/methods/stringify)
- [Kendo UI Filter getOptions Method](https://docs.telerik.com/kendo-ui/api/javascript/ui/filter/methods/getoptions)
- [Kendo UI Filter setOptions Method](https://docs.telerik.com/kendo-ui/api/javascript/ui/filter/methods/setoptions)
