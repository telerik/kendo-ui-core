---
title: Display Server Validation Errors in PopUp Editable Grid
page_title: Display Server Validation Errors in PopUp Editable Grid
description: "Show server validation errors in the PopUp edit mode of the {{ site.product }} Grid."
previous_url: /helpers/data-management/grid/how-to/editing/popup-editing-server-validation, /html-helpers/data-management/grid/how-to/editing/popup-editing-server-validation
slug: howto_displayservervalidationerrors_gridaspnetmvc
component: grid
type: how-to
res_type: kb
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

How can I display server validation errors when the Grid is in PopUp edit mode?

## Solution

You can achieve this requirement using the following implementation:

1. Configure the Grid for PopUp editing:

    ```HtmlHelper
    @(Html.Kendo().Grid<Telerik.Examples.Mvc.Areas.GridEditingPopUpServerValidation.Models.Product>()
        .Name("grid")
        .Columns(columns =>
        {
            columns.Bound(p => p.Id);
            columns.Bound(p => p.Name);
            columns.Command(command => command.Edit()).Width(100);
        })
        .ToolBar(toolbar => toolbar.Create())
        .Editable(editable => editable.Mode(GridEditMode.PopUp))
        .DataSource(dataSource => dataSource
            .Ajax()
            .Model(model => model.Id(p => p.Id))
            .Read("Products_Read", "Home")
            .Update("Products_Update", "Home")
            .Create("Products_Create", "Home")
            .Events(events => events.Error("error"))
        )
    )
    ```

1. Create an [external Kendo UI Template](https://docs.telerik.com/kendo-ui/framework/templates/get-started-external) for the error messages:

    ```HTML
    <script type="text/kendo-template" id="message">
        <div class="k-widget k-tooltip k-tooltip-validation k-invalid-msg field-validation-error"
         style="margin: 0.5em; display: block; " data-for="#=field#" data-valmsg-for="#=field#" id="#=field#_validationMessage">
            <span class="k-icon k-warning"> </span>#=message#<div class="k-callout k-callout-n"></div>
        </div>
    </script>

    <script type="text/javascript">
        var validationMessageTmpl = kendo.template($("#message").html());
    </script>
    ```

1. Handle the `Error` event of the DataSource to intercept the received error messages from the server:

    ```JS
        function error(args) {
            if (args.errors) {
                var grid = $("#grid").data("kendoGrid");
                grid.one("dataBinding", function (e) {
                    e.preventDefault();   // Prevent the "dataBinding" event of the Grid if an error occurs.

                    for (var error in args.errors) {
                        showMessage(grid.editable.element, error, args.errors[error].errors);
                    }
                });
            }
        }

        function showMessage(container, name, errors) {
            // Add the validation message to the form.
            container.find("[data-valmsg-for=" + name + "],[data-val-msg-for=" + name + "]")
                .replaceWith(validationMessageTmpl({ field: name, message: errors[0] }))
        }
    ```

To see the example, refer to the [project on how to display server validation errors in the PopUp edit mode of the Telerik UI Grid](https://github.com/telerik/ui-for-aspnet-mvc-examples/tree/master/Telerik.Examples.Mvc/Telerik.Examples.Mvc/Areas/GridEditingPopUpServerValidation).

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
