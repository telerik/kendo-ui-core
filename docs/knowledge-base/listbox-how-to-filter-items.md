---
title: Filter ListBox Items
description: Learn how to filter items to match the search conditions in a Kendo UI ListBox.
type: how-to
page_title: Filter Items to Match the Search Conditions - Kendo UI ListBox for jQuery
slug: listbox-how-to-filter-items
tags: listbox, filter, search, contains, items
res_type: kb
component: listbox
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® ListBox for jQuery</td>
 </tr>
</table>

## Description

How can I add a filter that will show only the ListBox items which match the search conditions?

## Solution

Use an external input element as a search box. You can retrieve the string that is entered in the input field and use it in the `filter` method of the DataSource.

````dojo
<div class="demo-section k-content wide">
       <input type='text' id='searchBox' class='k-input k-textbox k-input-solid k-input-md k-rounded-md' placeholder='search items' />
        <br />
        <br />
        
          <select id="optional" style="width: 200px"></select>
          <select id="selected" style="width: 200px"></select>
        </div>
      </div>
      <script>
        $(document).ready(function () {


          $("#searchBox").on("input",function(e) {
            var listBox = $("#optional").getKendoListBox();
            var sarchString = $(this).val();

            listBox.dataSource.filter({ field: "ContactName", operator: "contains", value: sarchString });
          });



          $("#optional").kendoListBox({
            connectWith: "selected",
            draggable: true,
            dropSources: ["selected"],
            toolbar: {
              position: "right",
              tools: ["moveUp", "moveDown", "transferTo", "transferFrom", "transferAllTo", "transferAllFrom", "remove"]
            },
            selectable: "multiple",
            dataSource: {
              type: "odata",
              transport: {
                read: "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Customers"
              }
            },
            dataTextField: "ContactName",
            dataValueField: "CustomerID"
          });

          $("#selected").kendoListBox({
            connectWith: "optional",
            draggable: {
              placeholder: function (element) {
                return element.clone().css({
                  "opacity": 0.3,
                  "border": "1px dashed #000000"
                });
              }
            },
            dropSources: ["optional"],
            selectable: "multiple",
            dataTextField: "ContactName",
            dataValueField: "CustomerID",
            toolbar: {
              position: "right",
              tools: ["moveUp", "moveDown", "remove"]
            }
          });
        });
      </script>
      <style> 
        .k-input
        { 
          width: 250px;
        } 
      </style>
````

For the complete implementation of the approach, refer to [this runnable example](https://dojo.telerik.com/EworIV/3).
