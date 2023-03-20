---
title: Show Switch label messages with Bootstrap 4 theme
page_title: Label Messages in Bootstrap 4 - Kendo UI Switch for jQuery
description: "Learn how to display the defined messages in the Boostrap v4 theme in the Kendo UI Switch."
slug: switch-label-messages-bootstrap-v4
tags: switch, label, messages, bootstrap, 4, v4, show, display, use, visible
component: switch
type: how-to
res_type: kb
ticketid: 1455921
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® Switch for jQuery</td>
 </tr>
 <tr>
   <td>Product Version</td>
   <td>Tested up to version {{ site.cdnVersion }}</td>
  </tr>
</table>

## Description

I have defined the label messages in the Switch but they are not visible with Bootstrap 4 theme. Why and how can I display them?

* R1 2023 is the last official release of Kendo jQuery, which supports and ships [Less themes]({% slug themesandappearnce_kendoui_desktopwidgets %}) with the product.

## Solution

The Kendo UI Bootstrap theme follows the designs as laid out in [Bootstrap v4](https://getbootstrap.com/docs/4.2/components/forms/#switches). If you prefer to show the labels and deviate from the design, you may override the display:none style that they get for this theme like this:

```
    <style>
        .k-switch-label-on,.k-switch-label-off {
          display:block;
        }
    </style>
```

```dojo    
    <style>
        .k-switch-label-on,.k-switch-label-off {
          display:block;
        }
    </style>

        <div id="example">
      Notifications <input type="checkbox" id="notifications-switch" aria-label="Notifications Switch" checked="checked" /></li>
    </div>

    <script>
      $(function () {
        $("#notifications-switch").kendoSwitch({
          messages: {
            checked: "YES",
            unchecked: "NO"
          }
        });
      });
    </script>
```
