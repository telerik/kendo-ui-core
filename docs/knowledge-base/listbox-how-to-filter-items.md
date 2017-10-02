---
title: How to filter items in ListBox
description: Filtering items in ListBox
type: how-to
page_title: Filter ListBox items
slug: listbox-how-to-filter-items
tags: listbox, filter, search, contains, items
res_type: kb
---

## Environment
<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI ListBox</td>
 </tr>
</table>


## Description

I have a ListBox that contains a lot of items. I want to add a filter that will show only the items matching the search condition.

## Solution
  
An external input element can be used as search box. The string entered there can be retrieved and used in the DataSource `filter` method.

A live example is available in [this dojo](http://dojo.telerik.com/EworIV/3).


````html
<div class="demo-section k-content wide">
        <input type='text' id='searchBox' class='k-textbox' placeholder='search items' />
        <br />
        <br />

        <div>
          <select id="optional"></select>
          <select id="selected"></select>
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
````

