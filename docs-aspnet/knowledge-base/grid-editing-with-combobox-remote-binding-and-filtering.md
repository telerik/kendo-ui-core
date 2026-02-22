---
title: Edit Grids Using ComboBoxes with Remote Binding and Filtering
page_title: Edit Grids Using ComboBoxes with Remote Binding and Filtering
description: "Edit a {{ site.product }} Grid by using a {{ site.product }} ComboBox configured for remote binding and server filtering."
previous_url: /helpers/data-management/grid/how-to/editing/grid-editing-with-combobox-remote-binding-and-filtering,  /html-helpers/data-management/grid/how-to/editing/grid-editing-with-combobox-remote-binding-and-filtering
slug: howto_editusingcomboboxremotebindfilter_gridaspnetmvc
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

How can I use a ComboBox component that binds to remote data and uses server-side filtering as an editor in a Grid?

## Solution

The following example demonstrates how to implement a [custom MVVM binding](https://docs.telerik.com/kendo-ui/framework/mvvm/overview) and disable the default value binding of the ComboBox editor.

The approach prevents the initial data binding when the selected value is set. It can also be used to avoid the default [value binding](https://docs.telerik.com/kendo-ui/framework/mvvm/bindings/value#value-binding-of-elements-select) behavior when the ComboBox binds to a large amount of data.

The example relies on the following key steps:

1. Include the following JavaScript logic before the Grid's declaration:

    ```js
        // Create a custom binder that works only with Objects and honours "autoBind:false" state.
        kendo.data.binders.widget.defferedValue = kendo.data.Binder.extend({
            init: function (widget, bindings, options) {
                kendo.data.Binder.fn.init.call(this, widget.element[0], bindings, options);
                this.widget = widget;
                this._change = $.proxy(this.change, this);
                this.widget.bind("change", this._change);
            },
            refresh: function () {
                if (!this._initChange) {
                    var widget = this.widget;
                    var value = this.bindings.defferedValue.get();

                    if (value) {
                        if (widget.options.autoBind === false) {
                            //Bind the widget with single item if deffered binding is used
                            widget.dataSource.data([value]);
                            widget.value(value[widget.options.dataValueField]);
                        } else {
                            //set widget value directly
                            this.widget.value(value[widget.options.dataValueField]);
                        }
                    }
                }
            },
            change: function () {
                this._initChange = true;
                this.bindings.defferedValue.set(this.widget.dataItem() || null);
                this._initChange = false;
            },
            destroy: function () {
                this.widget.unbind("change", this._change);
            }
        });
    ```

1. Define the Grid and specify a custom editor template for the ***Category* column.

    ```HtmlHelper
    columns.Bound(p => p.Category)
    .ClientTemplate("#: data.Category ? data.Category.CategoryName : '[None]' #")
    .EditorTemplateName("ComboBoxLookup")
    .Filterable(false)
    .Sortable(false)
    .Width(200);
    ```

1. Create a View with name **ComboBoxLookup** in the `~/Views/Shared/EditorTemplates/` folder that contains the ComobBox editor:

    ```HtmlHelper
    @using Kendo.Mvc.UI
    @model Telerik.Examples.Mvc.Areas.GridEditingWithComboBoxServerFiltering.Models.Category

    @(Html.Kendo().ComboBoxFor(m => m)
        // Use the "data-skip" attribute to prevent the default value binding and add the "data-bind" attribute for the custom binder
        .HtmlAttributes(new { data_skip = "true", data_bind = "defferedValue: Category" })
        .Placeholder("Select a category")
        .DataSource(source =>
        {
            source.Read("_GetCategories", "Home")
                    .ServerFiltering();
        })
        .MinLength(3)
        .AutoBind(false)
        .Filter(FilterType.Contains)
        .DataValueField("CategoryID")
        .DataTextField("CategoryName")
    )
    ```

To review the complete example, refer to the [project on how to use ComboBoxes with remote binding and server filtering as editors in the Grid](https://github.com/telerik/ui-for-aspnet-mvc-examples/tree/master/Telerik.Examples.Mvc/Telerik.Examples.Mvc/Areas/GridEditingWithComboBoxServerFiltering).

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