---
title: Grid Editing Create Action Without Update Button in Command Column
description: An example on how to enable the Grid Create and Destroy operations and not the Update operation in a Telerik UI for ASP.NET MVC.
type: how-to
page_title: Enable Grid Create Operation without the Update Command
slug: grid-editing-except-update-command
tags: aspnet, mvc,  kendo, kendo-ui, grid, edit, operations, create, update, command, button, hide, render
ticketid: 1382591
res_type: kb
component: grid
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Grid for Progress® Telerik® UI for ASP.NET MVC</td>
 </tr>
</table>

## Description

I have a grid where I only need **Create**,  **Read** and **Destroy**  actions. However, if I have no `command.Edit();` in the `c.Command`, then there is no way to create a record.

If I add the `command.Edit();`, then it throws an error, saying I need to hook up an Update method.

How do I fix this?

## Solution

It is possible to achieve the desired behaviour by providing a custom save button and making it visible only when the edited model is new.

Here is one way of achieving the desired result:

1. Add a custom command button. You may use the `IconClass()` to get it to look like the built-in save buttons:

    ```
        columns.Command(c =>
        {
            c.Destroy();
            c.Custom("Save").Click("saveRow").IconClass("k-icon k-i-check").Visible     ("shouldBeVisible");
        });
    ```

1. Add the click handler which will [save the row](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/methods/saverow) and trigger the create action:
    
    ```
        function saveRow(e) {
            e.preventDefault();
            // e.target is the DOM element representing the button
            var tr = $(e.target).closest("tr");
            this.saveRow();
        }
    ```
    
1. Set the visibility of the custom button to true only for [new models](https://docs.telerik.com/kendo-ui/api/javascript/data/model/methods/isnew):

    ```
        function shouldBeVisible(e) {       
            return e.isNew();
        }
    ```

## See Also

* [API Reference of the Grid](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid)
