---
title: Create Custom Filter Operators for Relative Values
page_title: Create Custom Filter Operators for Relative Values - Kendo UI for jQuery Filter
description: "Learn how to create custom operators for relative values in the Kendo UI Filter for jQuery."
slug: filter_operators_for_relative_values
tags: filter, operator, relative, value
component: filter
type: how-to
ticketid: 1618700
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® Filter for jQuery</td>
 </tr>
</table>

## Description

In this article, you will find out how to create a custom Filter operator with relative value for the date fields of the component.

## Solution

- Extend the existing operators by accessing them from the `options` of the Filter component. 

```js
var extendedDateOperators = kendo.ui.Filter.fn.options.operators.date;
extendedDateOperators["withinNext90Days"] = {
    text: 'within the next 90 days',
    handler: withinNext90DaysHandler
};
```

- Set the extented operators as the operators of the [`date`](/api/javascript/ui/filter/configuration/operators.date.custom) field in the configuration of the Filter.

```js
fields: [
   { name: "hireDate", type:"date", label: "Hire Date", operators: {
       date: extendedDateOperators
    } },
   { name: "name", type:"string", label: "Name" }
]
```

- Implement a [`handler`](/api/javascript/ui/filter/configuration/operators.date.custom.handler) for the new custom operator.

```js
function withinNext90DaysHandler(itemValue){
    var today = new Date(new Date().setHours(0,0,0,0));
    var after90Days = new Date(new Date().setDate(today.getDate() + 90)).setHours(0,0,0,0);
    var day = new Date(itemValue.setHours(0,0,0,0));
    
    return today <= day && day <= after90Days;
}
```

- Remove the Filter `editor` by finding its container in the [`change`](/api/javascript/ui/filter/events/change) event of the `filterModel` and then emptying it only for the custom operator.

```js
$("#filter").data("kendoFilter").filterModel.bind("change", function(e) {
    if(!e.items) {
      return;
    }

    let model = e.items[0];
    setTimeout(function(){
      var editorContainer = $("[id='"+model.uid+"']").find(".k-toolbar-item.k-filter-value");

      if(model.operator == "withinNext90Days") {
        editorContainer.empty();
      }
    })
})
```

The following example demonstrates the full implementation of the suggested approach:

```dojo
<div id="filter"></div>
    <br /><br />
    <script>
      var extendedDateOperators = kendo.ui.Filter.fn.options.operators.date;
      extendedDateOperators["withinNext90Days"] = {
                text: 'within the next 90 days',
                handler: withinNext90DaysHandler
              };
      
      var data = [
        { name: "Jane Doe", hireDate: new Date() }, // Today
        { name: "John Doe", hireDate: new Date(2023,8,9) }, // Sept 9 2023
        { name: "Mike Doe", hireDate: new Date(2023,11,9) }, // Dec 9 2023
        { name: "Tom Doe", hireDate: new Date(2024,8,9) } // Sept 9 2024
      ];

      var dataSource = new kendo.data.DataSource({
        data: data,
        change: function(e) {
          // Print the filtered data.

          // This should print 2 items, today and Sept 9. 
          // You can observe the result in the DevTools(F12) console of the browser.
          console.log(this.view());
        }
      });

      $("#filter").kendoFilter({
        dataSource: dataSource,
        applyButton: true,
        expressionPreview: true,
        fields: [
          { name: "hireDate", type:"date", label: "Hire Date", operators: {
            date: extendedDateOperators
          } },
          { name: "name", type:"string", label: "Name" }
        ],
      });

      $("#filter").data("kendoFilter").filterModel.bind("change", function(e) {
        if(!e.items) {
          return;
        }

        let model = e.items[0];
        setTimeout(function(){
          var editorContainer = $("[id='"+model.uid+"']").find(".k-toolbar-item.k-filter-value"),
              dropDown = $("[id='"+model.uid+"']").find(".k-toolbar-item.k-filter-operator select").data("kendoDropDownList"); 

          // Correct dropdown value.
          if (dropDown) {
            dropDown.setOptions({
              template: ({ text }) => typeof text === "object" ? text.text : text,
              valueTemplate: ({ text }) => typeof text === "object" ? text.text : text
            });
            
          }
					
          if(model.operator == "withinNext90Days") {
            editorContainer.empty();
          }
        })

      })
      
      function withinNext90DaysHandler(itemValue){
        var today = new Date(new Date().setHours(0,0,0,0));
        var after90Days = new Date(new Date().setDate(today.getDate() + 90)).setHours(0,0,0,0);
        var day = new Date(itemValue.setHours(0,0,0,0));
        
        return today <= day && day <= after90Days;
      }

    </script>
```

## See Also
* [JavaScript API Reference of the Filter](/api/javascript/ui/filter)