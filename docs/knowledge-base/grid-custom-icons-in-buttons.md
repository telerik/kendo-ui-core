---
title: Change the Icons of Update and Cancel Buttons
description: An example on how to change the icons of the Update and Cancel buttons in the Kendo UI Grid.
type: how-to
page_title: Implement Custom Buttons | Kendo UI Grid for jQuery
slug: grid-custom-icons-in-buttons
tags: grid, custom, buttons, icons, image, background, update, cancel, edit
ticketid: 1144053
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI Grid</td>
 </tr>
</table>


## Description

I can edit the text and styles of the commands&mdash;such as `command.Edit().Text(" ").HtmlAttributes(new { @class = "k-icon k-i-pencil" });`&mdash;but I have not found a way to reach the buttons which show up in the new-item line.

How can I change the text and images of the **Update** and **Cancel** buttons which show up in the line while editing and while adding a new item?

## Solution

To change the text of the `update` and `cancel` commands, pass the desired text to the `edit` command. To add a new record, use the same template&mdash;it will change the `update` and `cancel` commands during both update and create operations.

The following example demonstrates how to implement the approach in ASP.NET MVC.

```
columns.Command(command => {
 command.Edit()
     .Text("")
     .UpdateText("Custom Update")
     .CancelText("Custom Cancel");
 })
```

The following example demonstrates how to implement the approach in JavaScript.

```
{
  command: [{
  name: "edit",
  iconClass:"k-icon k-i-copy",
  text: {
     edit: "Custom edit",
     cancel: "Custom cancel",
     update: "Custom update"
  }
 }]
}

```

However, the option to change the icons is scheduled for the next major Kendo UI release at the beginning of next year. Meanwhile, you can achieve the same with CSS rules, as demonstrated in the following example.

```
.k-grid-update .k-icon:before{
  content: "\e143";
}

 .k-grid-cancel .k-icon:before{
  content: "\e400";
}
```

```dojo
    <div id="grid"></div>
    <script>
      $("#grid").kendoGrid({
        columns: [
          { field: "name" },
          { field: "age" },
          { command: [{ name: "edit",
                       iconClass:"k-icon k-i-copy",
                       text: { edit: "Custom edit", cancel: "Custom cancel", update: "Custom update" } }] }
        ],
        dataSource: {
          data: [
            { id: 1, name: "Jane Doe", age: 30 },
            { id: 2, name: "John Doe", age: 33 }
          ],
          schema: {
            model: { id: "id" }
          }
        },
        editable: {
          mode: "inline"
        }
      });
    </script>
    <style>
      .k-grid-update .k-icon:before{
        content: "\e143";
      }

      .k-grid-cancel .k-icon:before{
        content: "\e400";
      }
    </style>
```
