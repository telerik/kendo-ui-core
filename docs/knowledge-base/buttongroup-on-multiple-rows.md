---
title: Display a ButtonGroup on Multiple Rows
page_title: Render ButtonGroups on Multiple Rows - Kendo UI ButtonGroup for jQuery
description: Learn how to show a Kendo UI for jQuery ButtonGroup on multiple rows.
type: how-to
slug: buttongroup-on-multiple-rows
tags: button, buttongroup, multiple, rows
ticketid: 1149689
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® ButtonGroup for jQuery</td>
 </tr>
</table>

## Description

How can I display the buttons in the ButtonGroup on multiple rows?

## Solution

Use the `flex` property to change the rendering of the buttons in the ButtonGroup.

```dojo
    <style>
      #select-period{
        display: flex;
        flex-flow: row wrap;
        align-content: flex-start;
        height: 180px;
        width: 420px;
      }
      .k-button-group .k-button+.k-button {
        margin: 0;
      }
      .k-button {
        flex: 21%;
      }
      .firstLeftRadius {
        border-top-left-radius: 4px !important;
        border-bottom-left-radius: 0px !important;
      }    
      .firstRightRadius {
        border-top-right-radius: 4px !important;
      }    
      .lastLeftRadius {
        border-bottom-left-radius: 4px !important;
      }
      .lastRightRadius {
        border-top-right-radius: 0px !important;
        border-bottom-right-radius: 4px !important;
      }
    </style>
    <div id="example">
      <div class="demo-section k-content">
        <div id="select-period">
          <span class="firstLeftRadius">
            1 @
          </span>
          <span>
            2abc
          </span>
          <span>
            3def
          </span>
          <span class="firstRightRadius">
            Up
          </span>
          <span>
            4 ghi
          </span>
          <span>
            5 jkl
          </span>
          <span>
            6 mno
          </span>
          <span>
            Down
          </span>
          <span>
            7 pqrs
          </span>
          <span>
            8 tuv
          </span>
          <span>
            9 wxyz
          </span>
          <span>
            Left
          </span>
          <span class="lastLeftRadius">
            Cancel
          </span>
          <span>
            0 (space)
          </span>
          <span>
            Enter
          </span>
          <span class="lastRightRadius">
            Right
          </span>
        </div>
      </div>
    </div>

    <script>
      $(function() {
        $("#select-period").kendoButtonGroup();
      });
    </script>
```

## See Also

* [API Reference of the ButtonGroup](https://docs.telerik.com/kendo-ui/api/javascript/ui/buttongroup)
