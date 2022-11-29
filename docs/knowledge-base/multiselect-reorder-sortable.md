---
title: How To Reorder Items by Drag and Drop in MultiSelect
description: An example on how to reorder selected items and items in MultiSelect popup.
type: how-to
page_title: Drag and Drop to Reorder Selected Items and Popup Items Using Sortable  - Kendo UI MultiSelect for jQuery
slug: multiselect-reorder-sortable
tags: multiselect, reorder, sortable, drag, drop
res_type: kb
ticketid: 1543097
component: multiselect
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Kendo UI MultiSelect</td>
  <td>Kendo UI Sortable</td>
 </tr> 
</table>

## Description

How to drag and drop to reorder selected items and popup items in MultiSelect?

## Solution

- Use [`Kendo Sortable`](/api/javascript/ui/sortable) for the selected items in MultiSelect:

```
    required.tagList.kendoSortable({
      hint: function (element) {    
        return element.clone().addClass("hint");
      },
      placeholder: function (element) {               
        return element.clone().addClass("placeholder").text("drop here");
      },
      change: function (e) {
        var oldIndex = e.oldIndex;
        var newIndex = e.newIndex;
        var multiValue = required.value();
        var newValue = arrangeArray(multiValue, oldIndex, newIndex);
        required.value(newValue);
      }
    });
```

- Use [`Kendo Sortable`](/api/javascript/ui/sortable) for the list elements in the MultiSelect popup. 

```
    $(required.list).children().find("ul").kendoSortable({
        hint: function (element) {
          return  element.clone().addClass("hint");
        },
        placeholder: function (element) {               
          return  element.clone().addClass("placeholder").text("drop here");
        },
        change: function(e) {
          var dataSource = required.dataSource;
          var oldIndex = e.oldIndex,
              newIndex = e.newIndex,
              data = dataSource.data(),
              dataItem = dataSource.at(oldIndex);
  
          dataSource.remove(dataItem);
          dataSource.insert(newIndex, dataItem);
        }
    });
```

You can find the full example below:

```dojo
    <div id="example" role="application">
      <div class="demo-section k-header">
        <h2>Invite Attendees</h2>
        <label for="required">Required</label>
        <select id="required" multiple="multiple" data-placeholder="Select attendees...">
          <option selected>Steven White</option>
          <option>Nancy King</option>
          <option>Nancy Davolio</option>
          <option>Robert Davolio</option>
          <option>Michael Leverling</option>
          <option>Andrew Callahan</option>
          <option>Michael Suyama</option>
          <option selected>Anne King</option>
          <option>Laura Peacock</option>
          <option>Robert Fuller</option>
          <option>Janet White</option>
          <option>Nancy Leverling</option>
          <option>Robert Buchanan</option>
          <option>Margaret Buchanan</option>
          <option selected>Andrew Fuller</option>
          <option>Anne Davolio</option>
          <option>Andrew Suyama</option>
          <option>Nige Buchanan</option>
          <option>Laura Fuller</option>
        </select>
      </div>
      <style>

        .k-item input {
          left: 0
        }
      </style>
      <script>
        $(document).ready(function() {
          function arrangeArray(arr, old_index, new_index) {
            if (new_index >= arr.length) {
              var k = new_index - arr.length + 1;
              while (k--) {
                arr.push(undefined);
              }
            }
            arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
            return arr;
          };
          var checkInputs = function(elements) { 
            elements.each(function() {
              var element = $(this);     
              var input = element.children().find("input");

              input.prop("checked", element.hasClass("k-selected"));
            });
          };
          // create MultiSelect from select HTML element
          var required = $("#required").kendoMultiSelect({
            itemTemplate: "#:data.text# <input type='checkbox'/>",
            autoClose: false,
            dataBound: function() {
              var items = this.ul.find("li");
              setTimeout(function() {
                checkInputs(items);
              });
            },
            change: function() {
              var items = this.ul.find("li");
              checkInputs(items);
            }
          }).data("kendoMultiSelect");

          required.tagList.kendoSortable({
            hint: function (element) {    
              return element.clone().addClass("hint");
            },
            placeholder: function (element) {               
              return element.clone().addClass("placeholder").text("drop here");
            },
            change: function (e) {
              var oldIndex = e.oldIndex;
              var newIndex = e.newIndex;
              var multiValue = required.value();
              var newValue = arrangeArray(multiValue, oldIndex, newIndex);
              required.value(newValue);
            }
          });
          
          $(required.list).children().find("ul").kendoSortable({
            hint: function (element) {
              return  element.clone().addClass("hint");
            },
            placeholder: function (element) {               
              return  element.clone().addClass("placeholder").text("drop here");
            },
            change: function(e) {
              var dataSource = required.dataSource;
              var oldIndex = e.oldIndex,
                  newIndex = e.newIndex,
                  data = dataSource.data(),
                  dataItem = dataSource.at(oldIndex);

              dataSource.remove(dataItem);
              dataSource.insert(newIndex, dataItem);
            }
          });
        });
      </script>
    </div>
```

## See Also

* [MultiSelect API Reference](/api/javascript/ui/multiselect)
