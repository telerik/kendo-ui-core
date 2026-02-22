---
title: Edit an InCell Editable Grid using Radio Buttons
page_title: Edit Grid with RadioButton Template in InCell Edit Mode
description: "Use the batch editing functionality of the {{ site.product }} Grid to edit the underlying field using radio buttons in ASP.NET MVC applications."
previous_url: /helpers/data-management/grid/how-to/editing/edit-radio-button-templates-incell-mode, /html-helpers/data-management/grid/how-to/editing/edit-radio-button-templates-incell-mode
slug: howto_editradiobuttontemplatesincellmode_gridaspnetmv
component: grid
type: how-to
res_type: kb
components: ["general"]
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>{{ site.product }} Grid</td>
 </tr>
 <tr>
  <td>Product version</td>
  <td>2025.1.227</td>
 </tr>
</table>

## Description

How can I edit a specified field using a radio buttons in an InCell editable Grid?

## Solution

You can achieve this requirement using the following implementation:

1. Define a template column that contains radio buttons and set its `checked` attribute based on the value of the **Role** field:

    ```HtmlHelper
    @(Html.Kendo().Grid<Person>()
        .Name("persons")
        .Columns(columns =>
        {
            columns.Template(@<text></text>)
            .ClientTemplate(@"<input name='name#=PersonID#' type='radio' value='0' #= Role==0 ? checked='checked':'' # />
            <input name='name#=PersonID#' type='radio' value='1' #= Role==1 ? checked='checked':'' # />
            <input name='name#=PersonID#' type='radio' value='2' #= Role==2 ? checked='checked':'' # />");
            ... // Additional columns.
        })
        .Editable(ed=>ed.Mode(GridEditMode.InCell))
        ... // Additional configuration.
    )
    ```

1. Handle the `click` event of each radio button and update the **Role** field based on the respective radio button state:

    ```JS
        $(function () {
            $('#persons').on('click', ':radio', function () {
                var checked = $(this).is(':checked');
                var grid = $('#persons').data().kendoGrid;
                var dataItem = grid.dataItem($(this).closest('tr'));
                dataItem.set('Role', $(this).val());
            });
        });
    ```

To review the complete example, refer to the [project on how to create a template Grid column with radio buttons that update the underlying model when their state changes](https://github.com/telerik/ui-for-aspnet-mvc-examples/tree/master/Telerik.Examples.Mvc/Telerik.Examples.Mvc/Areas/GridEditingInCellRadioButtonColumn).

## More {{ site.framework }} Grid Resources

* [{{ site.framework }} Grid Documentation]({%slug htmlhelpers_grid_aspnetcore_overview%})
* [{{ site.framework }} Grid Demos](https://demos.telerik.com/{{ site.platform }}/grid/index)
* [{{ site.framework }} Grid Product Page](https://www.telerik.com/aspnet-mvc/grid)
* [Telerik UI for {{ site.framework }} Video Onboarding Course (Free for trial users and license holders)]({%slug virtualclass_uiformvc%})
* [Telerik UI for {{ site.framework }} Forums](https://www.telerik.com/forums/aspnet-mvc)

## See Also

* [Client-Side API Reference of the Grid for {{ site.framework }}](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid)
* [Server-Side API Reference of the Grid for {{ site.framework }}](https://docs.telerik.com/{{ site.platform }}/api/grid)
* [Telerik UI for {{ site.framework }} Knowledge Base](https://docs.telerik.com/{{ site.platform }}/knowledge-base)
