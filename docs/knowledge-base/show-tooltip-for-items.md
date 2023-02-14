---
title: Show DropDownList Item Details in ToolTip
page_title: Show DropDownList Item Details in ToolTip
description: "Learn how to show details for Kendo UI DropDownList items by using a Kendo UI Tooltip."
previous_url: /controls/editors/dropdownlist/how-to/show-tooltip-for-items, /controls/editors/dropdownlist/how-to/appearance/show-tooltip-for-items, /controls/layout/tooltip/how-to/kendoui-tooltip-in-dropdownlist
slug: howto_show_list_items_details_in_tooltip_dropdownlist
tags: telerik, kendo, jquery, dropdownlist, show, item, details, in, tooltip
component: dropdownlist
type: how-to
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® DropDownList for jQuery</td>
 </tr>
 <tr>
  <td>Operating System</td>
  <td>Windows 10 64bit</td>
 </tr>
 <tr>
  <td>Visual Studio version</td>
  <td>Visual Studio 2017</td>
 </tr>
 <tr>
  <td>Preferred Language</td>
  <td>JavaScript</td>
 </tr>
</table>

## Description

How can I show additional information about a list item in a Kendo UI DropDownList?

## Solution

A possible way to achieve this behavior is to use a Kendo UI Tooltip that displays the details when the user hovers with the mouse over the DropDownList item.

The following example demonstrates how to customize the information displayed in the Tooltip depending on the respective data item fields.



```dojo
<input id="dropdownlist" style="width:300px" />
<script>
  var ddl = $("#dropdownlist").kendoDropDownList({
    width:300,
    size:"small",
    dataSource: {
      transport: {
        read: {
          url: 'https://jsonplaceholder.typicode.com/users',
          dataType: 'json'
        }
      }
    },
    dataTextField: "username",
    dataValueField: "id"
  }).data('kendoDropDownList');

  $('body').kendoTooltip({
    filter: 'li.k-list-item',
    position: 'right',
    content: function(e){
      var item = ddl.dataItem($(e.target));

      var result = '<h3>' + item.name + '</h3>' +
					'<h4>' + item.email + '</h4>' +
          'Address: <hr />' +
          '<p>Street: ' + item.address.street + '</p>' +
          '<p>Suite: ' + item.address.suite + '</p>' +
          '<p>ZIP Code: ' + item.address.zipcode + '</p>';

      return result;
    },
    width: 220,
    height: 280
  });
</script>
```

## See Also

* [JavaScript API Reference of the DropDownList](/api/javascript/ui/dropdownlist)
* [How to Automatically Adjust the Width of a DropDownList]({% slug howto_automatically_adjust_width_dropdownlist %})
* [How to Create DropDownLists with Long Items]({% slug howto_create_listswith_long_items_dropdownlist %})
* [How to Detect Wrapper Focus Events]({% slug howto_detect_wrapper_focus_events_dropdownlist %})
* [How to Move the Group Label on Top of Items]({% slug howto_move_group_label_ontopof_items_dropdownlist %})
* [How to Prevent Popup Closure on Scroll]({% slug howto_prevent_popup_closure_onscroll_dropdownlist %})
* [How to Remove Items]({% slug howto_remove_items_dropdownlist %})
* [How to Set DataSource Dynamically]({% slug howto_set_datasource_dynamically_dropdownlist %})
