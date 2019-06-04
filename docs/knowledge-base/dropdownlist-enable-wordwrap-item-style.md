---
title: Enable Word-Wrapping for DropDownList Items
description: An example on how to wrap long words in the Kendo UI DropDownList without adding a horizontal scrollbar and while keeping its width.
type: how-to
page_title: Prevent Scrolling and Changing Width with Word-Wrap | Kendo UI DropDownList for jQuery
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

How can I enable word-wrapping for a DropDownList item so that I can wrap the item text if it exceeds a certain width?

## Solution

Implement [word-wrapping](https://www.w3schools.com/cssref/css3_pr_word-wrap.asp) by using CSS.  

```
  #myDropDownList-list.k-popup .k-list .k-item{
    word-wrap: break-word;
  }
```

The following example demonstrates how to wrap words in the DropDownList while the width of the drop-down container is retained and the implementation of a horizontal scrollbar avoided.

```dojo
    <style>
      /*For a specific Kendo UI DropDownList*/
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

* [Demo on Using the DropDownList](https://demos.telerik.com/kendo-ui/dropdownlist/index)
