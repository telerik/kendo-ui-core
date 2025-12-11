---
title: Adding "Select All" CheckBox the HeaderTemplate of MultiSelect
description: Learn how to implement a "Select All" checkbox using the headerTemplate in the MultiSelect component.
type: how-to
page_title: How to Implement "Select All" Checkbox in Kendo UI MultiSelect
slug: how-to-add-select-all-multiselect
tags: kendo-ui, multiselect, select-all, headertemplate, tagmode
res_type: kb
components: ["multiselect"]
ticketid: 1666066
---

## Environment

<table>
<tbody>
<tr>
<td>Product</td>
<td>MultiSelect for JSP</td>
</tr>
<tr>
<td>Version</td>
<td>2024.3.806</td>
</tr>
</tbody>
</table>

## Description

I want to add a "Select All" checkbox in the MultiSelect component to allow users to select or deselect all items in the dropdown. How can I achieve this using the `headerTemplate`?

This KB article also answers the following questions:
- How to implement a "Select All" feature in MultiSelect?
- How to customize the header of the MultiSelect popup?
- How to manage multiple selections in MultiSelect through a single checkbox?

## Solution

To add a "Select All" checkbox in the MultiSelect component, use the [`headerTemplate`](https://docs.telerik.com/kendo-ui/api/javascript/ui/multiselect/configuration/headertemplate) configuration. This template renders a checkbox at the top of the dropdown list. By interacting with this checkbox, users can select or deselect all items. Additionally, the [`tagMode`](/api/javascript/ui/multiselect/configuration/tagmode) configuration controls the display of selected items - having a separate tag for every item or a single tag with the count of the selected items.

Here's an example to achieve this functionality:

1. Define the MultiSelect and its `headerTemplate`:

```html
<input id="multiselect" />
<script>
  $("#multiselect").kendoMultiSelect({
    dataSource: ["Item1", "Item2", "Item3", "Item4"],
    headerTemplate: '<input type="checkbox" id="checkAll" /><label for="checkAll">Select All</label>',
    tagMode: "single" // or "multiple" for individual tags
  });
</script>
```

2. Handle the `change` event of the 'Select All' checkbox to select/deselect the needed values in the MultiSelect when the checkbox is checked/unchecked:

```javascript
$('#selectAll').change(function() {
          var multiSelect = $("#FeaturesSelect").data("kendoMultiSelect");
          if($(this).prop('checked')){
            selectAll();
          }
          else{
            multiSelect.value(null);
            $("#FeaturesSelect_listbox > li > input").prop("checked",false);
          }
});

function selectAll() {
        var multiselect = $("#FeaturesSelect").data("kendoMultiSelect");
        var selectedValues = [];
        for (var i = 0; i < multiselect.dataSource.data().length; i++) {
          var item = multiselect.dataSource.data()[i];
          selectedValues.push(item.value);
        }
        
        $("#FeaturesSelect_listbox > li > input").prop("checked", true);
        multiselect.value(selectedValues);
        multiselect.close();
}
```
Below is a runnable Dojo example where the full implementation is demonstrated:

```dojo
 <div id="example" role="application">
      <div class="demo-section k-header">
        <select id="FeaturesSelect" multiple="multiple" data-placeholder="Select attendees...">
          <option>Steven White</option>
          <option>Nancy King</option>
          <option>Nancy Davolio</option>
          <option>Robert Davolio</option>
          <option>Michael Leverling</option>
          <option>Andrew Callahan</option>
          <option>Michael Suyama</option>
          <option>Anne King</option>
          <option>Laura Peacock</option>
          <option>Robert Fuller</option>
          <option>Janet White</option>
          <option>Nancy Leverling</option>
          <option>Robert Buchanan</option>
          <option>Margaret Buchanan</option>
          <option>Andrew Fuller</option>
          <option>Anne Davolio</option>
          <option>Andrew Suyama</option>
          <option>Nige Buchanan</option>
          <option>Laura Fuller</option>
        </select>
      </div>

    </div>
    <script>
      $(document).ready(function() {
        $("#FeaturesSelect").kendoMultiSelect({
          headerTemplate: '<div style="padding:4px 8px"><input type="checkbox" id="selectAll"/>Select All</div>',
          autoClose : true,         
          dataBound: function() {
            var items = this.ul.find("li");
            setTimeout(function() {
              checkInputs(items);
            });
          },
          change: function(e) {
            var totalItems = this.dataSource.data().length;
            var selected = this.value().length;
            if (totalItems != selected ) {
              $('#selectAll').prop('checked', false);
            }
            else{
              $('#selectAll').prop('checked', true);
            }            
          }
        }).data("kendoMultiSelect");

        $('#selectAll').change(function() {
          var multiSelect = $("#FeaturesSelect").data("kendoMultiSelect");
          if($(this).prop('checked')){
            selectAll();
          }
          else{
            multiSelect.value(null);
            $("#FeaturesSelect_listbox > li > input").prop("checked",false);
          }
        });

      });

      function selectAll() {
        var multiselect = $("#FeaturesSelect").data("kendoMultiSelect");
        var selectedValues = [];
        for (var i = 0; i < multiselect.dataSource.data().length; i++) {
          var item = multiselect.dataSource.data()[i];
          selectedValues.push(item.value);
        }

        $("#FeaturesSelect_listbox > li > input").prop("checked", true);
        multiselect.value(selectedValues);
        multiselect.close();
      }
 </script>
```

This code snippet demonstrates how to integrate a "Select All" option using the `headerTemplate` property of the MultiSelect component. The `tagMode` property is configurable to display a single tag with the count of selected items or individual tags for each selection.

## See Also

- [MultiSelect HeaderTemplate Configuration](https://docs.telerik.com/kendo-ui/api/javascript/ui/multiselect/configuration/headertemplate)
- [MultiSelect TagMode Configuration](https://docs.telerik.com/kendo-ui/api/javascript/ui/multiselect/configuration/tagmode)
- [Kendo UI MultiSelect for jQuery Templates (Demo)](https://demos.telerik.com/kendo-ui/multiselect/template)
- [Kendo UI MultiSelect for jQuery API](https://docs.telerik.com/kendo-ui/api/javascript/ui/multiselect)
