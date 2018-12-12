---
title: Add Icon to Confirm Titlebar
description: An example demonstrating how to add a FontAwesome icon to a Kendo UI Confirm's Titlebar 
type: how-to
page_title: Append a FontAwesome Icon to Predefined Dialog's Title | Kendo UI Dialog
slug: dialog-icon-title-confirm-css
tags: dialog, icon, title, confirm, css
ticketid: 1173051
res_type: kb
---

## Environment
<table>
 <tr>
  <td>Product</td>
  <td>Dialog for Progress® Kendo UI®</td>
 </tr>
 <tr>
  <td>Product Version</td>
  <td>2018.2.516</td>
 </tr>
</table>

## Description

How can I add a FontAwesome icon to the title bar of a Kendo UI Confirm box?    

## Solution

Using CSS, you can add an icon to a [predefined dialog](https://docs.telerik.com/kendo-ui/controls/layout/dialog/overview#predefined-dialogs) such as the Kendo UI Confirm component.
```css
  .k-confirm .k-window-titlebar::before {
    content: '\f059';
    font-family: "FontAwesome";
    font-weight: bold;
    font-size: 14px;
  }
  .k-confirm .k-window-titlebar::after {
    font-family: "FontAwesome";
    content: "\f059";
    font-weight: bold;
    font-size: 24px;
    float: right;
  }
  .k-confirm .k-window-titlebar .k-dialog-title {
    visibility: collapse;
  }
```

The following contains the CSS implementation to append [FontAwesome icons](https://fontawesome.com/) to a Kendo UI Confirm.

```dojo
    <link href="https://netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.css" rel="stylesheet">

    <style> 
      /*Icon to the left side of the titlebar */
      .k-confirm .k-window-titlebar::before { 
        content: '\f059  Please Confirm '; 
        font-family: "FontAwesome";
        font-weight: bold; 
        font-size: 14px;
      } 
      /*Icon to the right side of the titlebar */
      .k-confirm .k-window-titlebar::after { 
        font-family: "FontAwesome";
        content: "\f059"; 
        font-weight: bold; 
        font-size: 24px;
        float: right;
      } 
      .k-confirm .k-window-titlebar .k-dialog-title { 
        visibility: collapse; 
      } 
    </style>

    <div id="example">
      <button id="confirmBtn" class="k-button">kendo.confirm</button>

      <script>
        $("#confirmBtn").on("click", function () {
          kendo.confirm("Are you sure that you want to proceed?").then(function () {
            console.log("You have chosen Okay");
          }, function () {
            console.log("You have chosen Cancel");
          });
        });
      </script>
    </div>
```

## See Also

* [Kendo Dialog - Predefined Dialogs Demo](https://demos.telerik.com/kendo-ui/dialog/predefined-dialogs)
