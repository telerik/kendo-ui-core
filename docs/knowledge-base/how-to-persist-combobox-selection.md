---
title: How to persist the selection of ComboBox
description: Persisting the selected item in ComboBox component
type: how-to
page_title: How to persist ComboBox selection
slug: how-to-persist-combobox-selection
position: 0
tags: persisting,selected,item,combobox
teampulseid:
ticketid: 1116339
pitsid:

---

## Environment
<table>
 <tr>
  <td>Product</td>
  <td>ComboBox for Progress® Kendo UI®</td>
 </tr>
 <tr>
  <td>Operating System</td>
  <td>All</td>
 </tr>
 <tr>
  <td>Browser</td>
  <td>All</td>
 </tr>
</table>


## Description

In web pages we had the Persistence Manager control to preserve the user options and state of the page across postbacks. We are using kendo ComboBoxes for criteria and kendo grid. We need to persist the selected item in the ComboBox.

## Solution

To persist the selected item in the ComboBox component you can use the [select() method](http://docs.telerik.com/kendo-ui/api/javascript/ui/combobox#methods-select) to retrieve the selected item and keep it in localStorage. When necessary you can set it as selected again with select(). 

###### Example

````html
  <div  >
      <a href="#" class="k-button" id="save">Save State</a>
      <a href="#" class="k-button" id="load">Load State</a>
    </div>

    <input id="categories" />

  <script>

      $(document).ready(function() {
        var categories = $("#categories").kendoComboBox({
          filter: "contains",
          placeholder: "Select category...",
          dataTextField: "CategoryName",
          dataValueField: "CategoryID",
          dataSource: {
            type: "odata",
            serverFiltering: true,
            transport: {
              read: "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Categories"
            }
          }
        }).data("kendoComboBox");

        $("#save").click(function (e) {
          e.preventDefault();
          localStorage["combo-selection"] = categories.select();
        });

        $("#load").click(function (e) {
          e.preventDefault();

          var selection = localStorage["combo-selection"];

          if (selection) {
            categories.select(parseInt(selection));
          }
        });


      });


    </script>
````

## See Also

* [Persist Grid state](http://demos.telerik.com/kendo-ui/grid/persist-state)

