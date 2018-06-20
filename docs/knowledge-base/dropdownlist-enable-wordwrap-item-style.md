---
title: Enable Word-Wrap for DropDownList Items
description: Wrapping long words while keeping the width of a Kendo UI DropDownList without adding a horizontal scrollbar
type: how-to
page_title: Prevent Scrolling and Changing Width With Word-Wrap | Kendo UI DropDownList
slug: dropdownlist-enable-wordwrap-item-style
tags: dropdownlist, enable, wordwrap, item, style
ticketid: 1160023
res_type: kb
---

## Environment
<table>
 <tr>
  <td>Product</td>
  <td>DropDownList for Progress® Kendo UI®</td>
 </tr>
 <tr>
  <td>Product Version</td>
  <td>2018.2.516</td>
 </tr>
</table>

## Description

How can I enable word-wrap for a drop down control item?  We need to wrap the item text if it is more than certain width.

## Solution

Adding [word-wrap](https://www.w3schools.com/cssref/css3_pr_word-wrap.asp) can be achieved using CSS.  
```
  #myDropDownList-list.k-popup .k-list .k-item{
    word-wrap: break-word;
  }
```

The following will allow word wrapping in the middle of a long word while retaining the width of the Kendo UI DropDownList's dropdown container without adding a horizontal scrollbar:

```html
    <style>
      /*For a Specific Kendo UI DropDownList*/
      #myDropDownList-list.k-popup .k-list .k-item{
        word-wrap: break-word;
      }
    </style>

    <input id="myDropDownList" style="width: 110px;" />  
    <script>
      $(document).ready(function() {
        var data = [
          { text: "First", value: "1" },
          { text: "WordWrappingWordWrappingWordWrapping", value: "2" },
        ];

        $("#myDropDownList").kendoDropDownList({
          dataTextField: "text",
          dataValueField: "value",
          dataSource: data,
          index: 0,
          optionLabel: "Select...",
        });
      });
    </script>
    </div>
```

## See Also

* [Kendo DropDownList Demo](https://demos.telerik.com/kendo-ui/dropdownlist/index)
