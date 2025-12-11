---
title: Edit Nullable Boolean Fields in InLine Editable Grid
page_title: Edit Nullable Boolean Fields when Grid InLine Editable
description: "Use a custom editor template to edit nullable boolean properties when using {{ site.product }} InLine editable Grid."
previous_url: /helpers/data-management/grid/how-to/editing/grid-inline-editing-of-nullable-boolean, /html-helpers/data-management/grid/how-to/editing/grid-inline-editing-of-nullable-boolean
slug: howto_editnullablebooleanfields_gridaspnetmvc
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

How can I edit nullable boolean fields in an InLine editable Grid?

## Solution

You can achieve this requirement using the following implementation:

1. Add the nullable boolean field to the Model that binds to the Grid:

    ```C#
    public bool? Available { get; set; }
    ```

1. Add the following JavaScript logic before the Grid definition:

    ```JS
        // Define custom nullable boolean binder, so the DropDownList editor can update the Model and vice-versa.
        kendo.data.binders.widget.nullableBoolean = kendo.data.Binder.extend({
            init: function (widget, bindings, options) {
                kendo.data.Binder.fn.init.call(this, widget.element[0], bindings, options);

                this.widget = widget;
                this._change = $.proxy(this.change, this);
                widget.bind("change", this._change);
            },

            refresh: function () {
                var that = this,
                    value = that.bindings.nullableBoolean.get();

                that.widget.value(value !== null ? value.toString() : "");
            },

            change: function () {
                var that = this,
                    value = that.widget.value(),
                    modelValue = value === "true" ? true : value === "false" ? false : null;
                that.bindings.nullableBoolean.set(modelValue);
            },

            destroy: function () {
                this.widget.unbind("change", this._change);
            }
        });
    ```

1. Define the Grid:

    ```HtmlHelper
    @(Html.Kendo().Grid<Telerik.Examples.Mvc.Areas.GridEditingInLineNullableBoolean.Models.InLineEditingProduct>()
        .Name("grid")
        .Columns(columns =>
        {
            columns.Bound(p => p.ProductName);
            columns.Bound(p => p.UnitsInStock).Width(100);
            columns.Bound(p => p.Available).Width(100);
            columns.Command(command => command.Edit()).Width(180);
        })
        .Editable(editable => editable.Mode(GridEditMode.InLine))
        .Pageable()
        .Sortable()
        .Filterable()
        .DataSource(dataSource => dataSource
            .Ajax()
            .Model(model =>
            {
                model.Id(p => p.ProductID);
            })
            .Read(read => read.Action("Read", "Home"))
            .Update(update => update.Action("Update", "Home"))
        )
    )
    ```

1. Create a custom editor template with name **Boolean** in the `~/Views/Shared/EditorTemplates/` folder. The Grid will use this editor for all boolean fields that bind to its columns.

    ```Razor
    @using Kendo.Mvc.UI

    @model bool?

    @if (ViewData.ModelMetadata.IsNullableValueType)
    {
        @(
            Html.Kendo().DropDownListFor(model => model)
                .Items(items =>
                {
                    items.Add().Text("Not Set");
                    items.Add().Text("True").Value("true");
                    items.Add().Text("False").Value("false");
                })
                // Specify that the default value binidng must not be set and set the "nullableBoolean" binding.
                .HtmlAttributes(new { data_skip = true, data_bind = "nullableBoolean:" + ViewData.TemplateInfo.GetFullHtmlFieldName(string.Empty)})
        )
    }
    else
    {
        <input type="checkbox" @(Model.Value ? "checked='checked'" : "") />
    }
    ```

To see the complete example, refer to the [project on how to edit a nullable boolean field using a DropDownList editor in the InLine editable Grid](https://github.com/telerik/ui-for-aspnet-mvc-examples/tree/master/Telerik.Examples.Mvc/Telerik.Examples.Mvc/Areas/GridEditingInLineNullableBoolean).

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
