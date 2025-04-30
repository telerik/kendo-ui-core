---
title: Configure Grids to Edit TimeSpan Properties
page_title: Configure Grids to Edit the TimeSpan Property
description: "Configure the {{ site.product }} Grids to use the TimePicker or NumericTextBox editor to edit TimeSpan properties."
previous_url: /helpers/data-management/grid/how-to/editing/grid-timespan-editor, /html-helpers/data-management/grid/how-to/editing/grid-timespan-editor
slug: howto_configuretoedittimespanproperty_gridaspnetmvc
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

How can I use `TimeSpan` fields in an editable Grid?

## Solution

Follow the next steps to implement a TimePicker editor for the `TimeSpan` field in an InLine editable Grid:

1. Define the editable Grid:

    ```HtmlHelper
    @(Html.Kendo().Grid<Telerik.Examples.Mvc.Areas.GridEditTimespan.Models.ViewModel>()
        .Name("grid")
        .Columns(columns =>
        {
            columns.Command(comm =>
            {
                comm.Edit();
            });
            columns.Bound(o => o.ID);
            columns.Bound(o => o.Time).ClientTemplate("#if (data.Time) {# #:kendo.toString(Time.Hours, '00')#:#:kendo.toString(Time.Minutes, '00')#:#:kendo.toString(Time.Seconds, '00')# #}#").EditorTemplateName("TimePickerEditor");
        })
        .ToolBar(tools => tools.Create())
        .DataSource(dataSource => dataSource
            .Ajax()
            .ServerOperation(false)
            .Model(model =>
            {
                model.Id(o => o.ID);
                model.Field(o => o.ID).Editable(false);
            })
            .Read(read => read.Action("Read", "Home"))
            .Update(update => update.Action("Update", "Home"))
            .Create(create => create.Action("Create", "Home"))
        )
    )
    ```
    ```C# ViewModel
    public class ViewModel
    {
        public int ID { get; set; }
        [Required]
        public TimeSpan Time { get; set; }
    }
    ```
1. Add the following custom JavaScript logic before the Grid definition:

    ```JS
    <script>
        kendo.data.binders.widget.timespan = kendo.data.Binder.extend({
            init: function (widget, bindings, options) {
                kendo.data.Binder.fn.init.call(this, widget.element[0], bindings, options);
                this.widget = widget;
                this._change = $.proxy(this.change, this);
                this.widget.bind("change", this._change);
            },
            refresh: function () {
                var value = this.bindings.timespan.get();
                var date = null;
            
                if (value) {
                    date = new Date();
                    if (value.Ticks) {
                        date.setHours(value.Hours);
                        date.setMinutes(value.Minutes);
                        date.setSeconds(value.Seconds);
                    }
                    else {
                        var parts = value.split(':');
                        date.setHours(parts[0]);
                        date.setMinutes(parts[1]);
                        date.setSeconds(parts[2]);
                    }
                }

                this.widget.value(date);
            },
            change: function () {
                var date = this.widget.value();
                var value = null;
                if (date) {
                    value = {
                        Hours: date.getHours(),
                        Minutes: date.getMinutes(),
                        Seconds: date.getSeconds()
                    };
                }
                var input = $('input[data-bind="value:Time"]');
                input.val(value.Hours + ":" + value.Minutes + ":" + value.Seconds);
                input.trigger("change");
            },
            destroy: function () {
                this.widget.unbind("change", this._change);
            }
        });
    </script>
    ```

1. Create a custom editor template for the **Time** property:

    ```HtmlHelper
    @model TimeSpan?

    @(Html.Kendo().TimePicker()
        .HtmlAttributes(new { data_skip=true, data_bind = "timespan:Time" })
        .Name("timepicker")
        .Format("HH:mm:ss")
    )
    @Html.HiddenFor(model => model)
    ```

To review the complete example, refer to the [project on how to configure the Grid to use a TimePicker editor to edit `TimeSpan` properties](https://github.com/telerik/ui-for-aspnet-mvc-examples/tree/master/Telerik.Examples.Mvc/Telerik.Examples.Mvc/Areas/GridEditTimespan).

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