---
title: Automatically Adjust the DropDownList Width
page_title: Adjust the Width Automatically - jQuery DropDownList
description: "Learn how to automatically adjust the width of a Kendo UI for jQuery DropDownList component."
previous_url: /controls/editors/dropdownlist/how-to/auto-adjust-the-width, /controls/editors/dropdownlist/how-to/appearance/auto-adjust-the-width
slug: howto_automatically_adjust_width_dropdownlist
tags: telerik, kendo, jquery, dropdownlist, adjust, width, automatically
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
  <td>Visual Studio Version</td>
  <td>Visual Studio 2017</td>
 </tr>
 <tr>
  <td>Preferred Language</td>
  <td>JavaScript</td>
 </tr>
</table>

## Description

How can I automatically adjust the width of the DropDownList depending on its list items?

## Solution

To achieve this behavior:

1. After the control is initialized, reset the list width of the control to `auto`.
2. In the `adjustDropDownWidth` function, add the scrollbar width to the list width.

Either of the following scenarios occur:

1. The DropDownList is already bound when it is opened. In this case, execute `adjustDropDownWidth` in the [`open`](/api/javascript/ui/dropdownlist/events/open) event.
1. The DropDownList triggers a remote request after it is opened. In this case, execute `adjustDropDownWidth` in the [`dataBound`](/api/javascript/ui/dropdownlist/events/databound) event.

The following example demonstrates how to automatically adjust the width of a DropDownList depending on its list items.



```dojo
<style>

  .k-list
  {
    white-space: nowrap;
  }

</style>

<div id="example">

  <p>
    Remote data: <select id="color-remote"></select>
  </p>

  <p>
    Local data: <select id="color-local"></select>
  </p>

</div>

<script>
  $(function() {

    var data = [
      { text: "Grey Grey Grey Grey Grey Grey Grey Grey Grey Grey Grey Grey Grey Grey Grey Grey Grey ", value: "13" },
      { text: "Black 1", value: "1" },
      { text: "Orange 2", value: "2" },
      { text: "Black 3", value: "3" },
      { text: "Orange 4", value: "4" },
      { text: "Black 5", value: "5" },
      { text: "Orange 6", value: "6" },
      { text: "Black 7", value: "7" },
      { text: "Orange 8", value: "8" },
      { text: "Black 9", value: "9" },
      { text: "Orange 10", value: "10" },
      { text: "Black 11", value: "11" },
      { text: "Orange 12", value: "12" }
    ];

    // A DropDownList bound to remote data that is fetched on open.
    // Use a dataBound handler.

    $("#color-remote").kendoDropDownList({
      dataTextField: "text",
      dataValueField: "value",
      autoBind: false,
      dataSource: {
        transport: {
          read: function (e) {
            setTimeout(function(){
              e.success(data);
            }, 500);
          }
        }
      },
      dataBound: adjustDropDownWidth
    });

    var remoteDropDown = $("#color-remote").data("kendoDropDownList");

    remoteDropDown.list.width("auto");

    // A DropDownList bound to local data or remote data that is fetched immediately upon initialization.
    // Use an open handler.

    $("#color-local").kendoDropDownList({
      dataTextField: "text",
      dataValueField: "value",
      dataSource: data,
      open: adjustDropDownWidth
    });

    var localDropDown = $("#color-local").data("kendoDropDownList");

    localDropDown.list.width("auto");

    function adjustDropDownWidth(e) {
      var listContainer = e.sender.list.closest(".k-list-container");
      listContainer.width(listContainer.width() + kendo.support.scrollbar());
    }    

  });
</script>
```

## See Also

* [JavaScript API Reference of the DropDownList](/api/javascript/ui/dropdownlist)
* [Create DropDownLists with Long Items]({% slug howto_create_listswith_long_items_dropdownlist %})
* [Detect Wrapper Focus Events in the DropDownList]({% slug howto_detect_wrapper_focus_events_dropdownlist %})
