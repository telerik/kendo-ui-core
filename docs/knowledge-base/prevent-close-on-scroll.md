---
title: Prevent Popup Closure on Scrolling the DropDownList
page_title: Prevent Popup Closure on Scrolling the DropDownList
description: "Learn how to prevent popup closure on scrolling when users reach the end of the list in a Kendo UI DropDownList widget."
previous_url: /controls/editors/dropdownlist/how-to/prevent-close-on-scroll, /controls/editors/dropdownlist/how-to/appearance/prevent-close-on-scroll
slug: howto_prevent_popup_closure_onscroll_dropdownlist
tags: telerik, kendo, jquery, dropdownlist, prevent, popup, closure, on scrolling
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

When the popup item list of the DropDownList is open and the user scrolls it to the end, the browser starts scrolling the page which closes the drop-down list itself. How can I prevent this behavior?

## Solution

The DropDownList enables you to make the popup remain open in such cases. The following example demonstrates how to achieve this behavior.



```dojo
<div id="example">
    <br/><br/><br/><br/><br/><br/><br/><br/>
    <div id="example" style="min-height: 2000px; padding: 30px;">
        <input id="products" style="width: 400px" />
    </div>
</div>

<script>
    $(function() {
          $("#products").kendoDropDownList({
            dataTextField: "ProductName",
            dataValueField: "ProductID",
            dataSource: {
              transport: {
                read: {
                  dataType: "jsonp",
                  url: "https://demos.telerik.com/kendo-ui/service/Products",
                }
              }
            },
            value: "74"
          });

          var widget = $("#products").data("kendoDropDownList");

          widget.ul.parent().on("wheel", function(e) {
            var container = this;

            if ((container.scrollTop == 0 && e.originalEvent.deltaY < 0) ||
                (container.scrollTop == container.scrollHeight - container.offsetHeight &&
                 e.originalEvent.deltaY > 0)) {
              e.preventDefault();
              e.stopPropagation();
            }

          });
        });
</script>
```

## See Also

* [JavaScript API Reference of the DropDownList](/api/javascript/ui/dropdownlist)
* [How to Automatically Adjust the Width of a DropDownList]({% slug howto_automatically_adjust_width_dropdownlist %})
* [How to Create DropDownLists with Long Items]({% slug howto_create_listswith_long_items_dropdownlist %})
* [How to Detect Wrapper Focus Events]({% slug howto_detect_wrapper_focus_events_dropdownlist %})
* [How to Move the Group Label on Top of Items]({% slug howto_move_group_label_ontopof_items_dropdownlist %})
* [How to Remove Items]({% slug howto_remove_items_dropdownlist %})
* [How to Set DataSource Dynamically]({% slug howto_set_datasource_dynamically_dropdownlist %})
* [How to Update MVVM Bound Models on Load]({% slug howto_update_mvvm_model_onload_dropdownlist %})
