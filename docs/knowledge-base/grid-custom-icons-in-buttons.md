---
title: How to set change the icons of update and cancel buttons
description: An example how to change the icons of the Update and Cancel buttons in the Kendo UI Grid
type: how-to
page_title: Custom buttons | Kendo UI Grid
slug: grid-custom-icons-in-buttons
tags: grid, custom, buttons, icons, image, background, update, cancel, edit
ticketid: 1144053
res_type: kb

---

## Environment
<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® Grid</td>
 </tr>
</table>


## Description

I can edit the text and styles of the commands (like: command.Edit().Text(" ").HtmlAttributes(new { @class = "k-icon k-i-pencil" });)
I have not found a way to reach the buttons, that show up in the new-item line. How can I change text and images of the "Update" and "Cancel" Button that show up in the line when editing and also when adding a new item?

## Solution

To change the text of the Update and Cancel commands, you can currently pass the desired text to the Edit command like below(the same template is used when adding a new record, so this will alter the Update and Cancel commands in both cases- update and create operations):

#### ASP.NET MVC Example

```
columns.Command(command => {
 command.Edit()
     .Text("")
     .UpdateText("Custom Update")
     .CancelText("Custom Cancel");
 })
```

#### JavaScript Example

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

However, the ability to change the icons will come in the next major release - the beginning of next year. Meanwhile, you can achieve the same with CSS rules, for example:

```
.k-grid-update .k-icon:before{
  content: "\e143";
}
   
 .k-grid-cancel .k-icon:before{
  content: "\e400";
}
```

```html
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