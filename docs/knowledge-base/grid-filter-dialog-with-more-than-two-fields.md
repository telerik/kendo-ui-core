---
title: Set Filter Dialog with Two or More Fields in Grid
description: An example on how to configure the filter dialog of the Kendo UI Grid to show more than two fields.
type: how-to
page_title: Set Filter Dialog with More Than Two Fields | Kendo UI Grid for jQuery
slug: grid-filter-dialog-with-more-than-two-fields
tags: grid, filter, dialog, more, than, two, fields, multiple, filtering
ticketid: 1147919
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI Grid</td>
 </tr>
 <tr>
  <td>Operating System</td>
  <td>All</td>
 </tr>
 <tr>
  <td>Browser</td>
  <td>All</td>
 </tr>
 <tr>
  <td>Browser Version</td>
  <td>All</td>
 </tr>
</table>

## Description

The Kendo UI Grid API includes the `filterable.extra` property which allows the user to add a second criterion in the filter menu.

How can I display a filter dialog with three or more fields?

## Solution

Manually change the content of the filter menu container and its logic by subscribing to the `filterMenuInit` event of the API.

```dojo
<script src="https://demos.telerik.com/kendo-ui/content/shared/js/people.js"></script>

<div id="example">
  <div id="grid"></div>

  <script>
    $(document).ready(function() {
      $("#grid").kendoGrid({
        dataSource: {
          data: createRandomData(50),
          pageSize: 15
        },
        height: 550,
        scrollable: true,
        filterable: true,
        pageable: true,
        columns: [
          {
            field: "FirstName",
            title: "Name",
            width: 160,
            filterable: {
              extra: false
            },
            template: "#=FirstName# #=LastName# - #=Title#",
          }
        ],
        filterMenuInit: function(e){
          e.container
            .empty()
            .append($('<span>First name: </span><br /><input id="first-name-operators" /><input id="first-name-tb" class="k-textbox" /><br /><input id="first-logic" /><br /><span>Last name: </span><br /><input id="last-name-operators" /><input id="last-name-tb" class="k-textbox" /><br /><input id="second-logic" /><br /><span>JobTitle: </span><br /><input id="job-title-operators" /><input id="job-title-tb" class="k-textbox" /><div><button type="submit" class="k-button k-primary" id="submit">Filter</button><button type="reset" class="k-button" id="clear">Clear</button></div>'));
          var operators = ['eq', 'startswith', 'contains'];

          $('#first-name-operators, #last-name-operators, #job-title-operators').kendoDropDownList({
            dataSource: operators
          });

          $('#first-logic, #second-logic').kendoDropDownList({
            dataSource: ['and', 'or']
          });

          $('#submit').kendoButton({
            click: function(){
              var firstName = $('#first-name-tb').val();
              var lastName = $('#last-name-tb').val();
              var title = $('#job-title-tb').val();
              var firstNameOperator = $('#first-name-operators').data('kendoDropDownList').value();
              var lastNameOperator = $('#last-name-operators').data('kendoDropDownList').value();
              var titleOperator = $('#job-title-operators').data('kendoDropDownList').value();
              var logic = $('#first-logic').data('kendoDropDownList').value();

              var filter = {
                logic: logic,
                filters: [{
                    field: 'FirstName',
                    operator: firstNameOperator,
                    value: firstName
                  }, {
                    field: 'LastName',
                    operator: lastNameOperator,
                    value: lastName
                  }, {
                    field: 'Title',
                    operator: titleOperator,
                    value: title
                  }]
              }

              e.sender.dataSource.filter(filter);
            }
          });

          $('#clear').kendoButton({
            click: function(){
              e.sender.dataSource.filter({});
            }
          })
        }
      });
    });

  </script>
</div>
```

## See Also

* [API Reference of the filterMenuInit Event](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/events/filtermenuinit)
* [API Reference of the filterable.extra Property](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/configuration/filterable.extra)
