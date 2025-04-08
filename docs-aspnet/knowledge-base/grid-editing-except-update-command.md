---
title: Creating Action Without Update Button in a Grid Command Column 
description: An example on how to enable the Grid Create and Destroy operations and not the Update operation in a Telerik UI for ASP.NET MVC.
type: how-to
page_title: Enabling Grid Create Operations without the Update Command
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

It is possible to achieve the desired behavior by providing a custom save button and making it visible only when the edited model is new.

Here is one way of achieving the desired result:

1. Add a custom command button. You may use the `IconClass()` to get it to look like the built-in save buttons:

    ```Razor
        columns.Command(c =>
        {
            c.Destroy();
            c.Custom("Save").Click("saveRow").IconClass("k-icon k-i-check").Visible     ("shouldBeVisible");
        });
    ```

1. Add the click handler which will [save the row](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/methods/saverow) and trigger the create action:
    
    ```JS
        function saveRow(e) {
            e.preventDefault();
            // e.target is the DOM element representing the button
            var tr = $(e.target).closest("tr");
            this.saveRow();
        }
    ```
    
1. Set the visibility of the custom button to true only for [new models](https://docs.telerik.com/kendo-ui/api/javascript/data/model/methods/isnew):

    ```JS
        function shouldBeVisible(e) {       
            return e.isNew();
        }
    ```

## More {{ site.framework }} Grid Resources

* [{{ site.framework }} Grid Documentation]({%slug htmlhelpers_grid_aspnetcore_overview%})

* [{{ site.framework }} Grid Demos](https://demos.telerik.com/{{ site.platform }}/grid/index)

{% if site.core %}
* [{{ site.framework }} DataGrid Product Page](https://www.telerik.com/aspnet-core-ui/grid)

* [Telerik UI for {{ site.framework }} Video Onboarding Course (Free for trial users and license holders)]({%slug virtualclass_uiforcore%})

* [Telerik UI for {{ site.framework }} Forums](https://www.telerik.com/forums/aspnet-core-ui)

{% else %}
* [{{ site.framework }} Grid Product Page](https://www.telerik.com/aspnet-mvc/grid)

* [Telerik UI for {{ site.framework }} Video Onboarding Course (Free for trial users and license holders)]({%slug virtualclass_uiformvc%})

* [Telerik UI for {{ site.framework }} Forums](https://www.telerik.com/forums/aspnet-mvc)
{% endif %}

## See Also

* [Client-Side API Reference of the Grid for {{ site.framework }}](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid)
* [Server-Side API Reference of the Grid for {{ site.framework }}](https://docs.telerik.com/{{ site.platform }}/api/grid)
* [Telerik UI for {{ site.framework }} Breaking Changes]({%slug breakingchanges_2023%})
* [Telerik UI for {{ site.framework }} Knowledge Base](https://docs.telerik.com/{{ site.platform }}/knowledge-base)
