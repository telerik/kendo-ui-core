---
title: Using Both Multi-Checkbox and Default Grid Filtering
description: An example on how to modify the Grid for {{ site.framework }} to use both its multi-checkbox and default filtering.
type: how-to
page_title: Using Multi-Checkbox and Default Filtering
slug: use-both-multi-and-default-filtering
tags: grid, filtering, multi, default
ticketid: 1120044
res_type: kb
component: grid
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Telerik® UI Grid for UI for {{ site.framework }}</td>
 </tr>
 <tr>
  <td>Progress Telerik UI version</td>
  <td>2021.3.1207</td>
 </tr>
</table>

## Description

How can I modify the {{ site.product }} Grid to use both multi-checkbox and default filtering?

## Solution

When the [`filterMenuInit`](https://docs.telerik.com/aspnet-core/api/kendo.mvc.ui.fluent/grideventbuilder#filtermenuinitsystemfuncsystemobjectsystemobject) event fires, append a Kendo UI ListView, which contains the checkboxes, to the filtering menu.

Refer to [this REPL](https://netcorerepl.telerik.com/wPFGcEYD51rmjpQ837) for a runnable sample of the snippet below.

```dojo
    //Grid definition also available in the Custom data source Demo
    @(Html.Kendo().Grid<Kendo.Mvc.Examples.Models.ProductViewModel>()
        .Name("Grid")
        .Columns(columns => {
            columns.Bound(p => p.ProductName);
            columns.Bound(p => p.UnitPrice).Width(140);
            columns.Bound(p => p.UnitsInStock).Width(140);
            columns.Bound(p => p.Discontinued).Width(100);
            columns.Command(command => command.Destroy()).Width(110);
        })
        .ToolBar(toolbar => {
            toolbar.Create();
            toolbar.Save();
        })
        .Editable(editable => editable.Mode(GridEditMode.InLine))
        .Pageable()
        .Navigatable()
        .Sortable()
        .Scrollable()
        .Event(events=>events.FilterMenuInit("onFilterMenuInit"))
        .DataSource(dataSource => dataSource
            .Custom()
            .Batch(true)
            .PageSize(20)
            .Schema(schema => schema.Model(m => m.Id(p => p.ProductID)))
            .Transport(transport =>
            {
                transport.Read(read =>
                read.Url("https://demos.telerik.com/kendo-ui/service/products")
                    .DataType("jsonp")
                );
                transport.Create(create =>
                create.Url("https://demos.telerik.com/kendo-ui/service/products/create")
                        .DataType("jsonp")
                );
                transport.Update(update =>
                update.Url("https://demos.telerik.com/kendo-ui/service/products/update")
                        .DataType("jsonp")
                );
                transport.Destroy(destroy =>
                destroy.Url("https://demos.telerik.com/kendo-ui/service/products/destroy")
                        .DataType("jsonp")
                );
                transport.ParameterMap("parameterMap");
            })
        )
    )
    <script>
        function parameterMap(options, operation) {
            if (operation !== "read" && options.models) {
                return { models: kendo.stringify(options.models) };
            }
        }

        function onFilterMenuInit(e) {
            if (e.field == "ProductName") {
                initCheckboxFilter.call(this, e);
            }
        }
        function initCheckboxFilter(e) {
            var popup = e.container.data("kendoPopup");
            var dataSource = this.dataSource;
            var field = e.field;
            var checkboxesDataSource = new kendo.data.DataSource({
                data: uniqueForField(dataSource.data(), field)
            });
            var helpTextElement = e.container.children(":first").children(":first");
            // helpTextElement.nextUntil(":has(.k-button)").remove();
            var element = $("<div class='checkbox-ontainer'></div>").insertAfter(helpTextElement).kendoListView({
                dataSource: checkboxesDataSource,
                template: "<div><input type='checkbox' value='#:" + field + "#'/>#:" + field + "#</div>"
            });
            e.container.find("[type='submit']").click(function (e) {
                e.preventDefault();
                e.stopPropagation();
                var filter = dataSource.filter() || { logic: "and", filters: [] };
                var fieldFilters = $.map(element.find(":checkbox:checked"), function (input) {
                    return {
                        field: field,
                        operator: "eq",
                        value: input.value
                    };
                });
                if (fieldFilters.length) {
                removeFiltersForField(filter, field);
                    filter.filters.push({
                        logic: "or",
                        filters: fieldFilters
                    });
                dataSource.filter(filter);
                }
                popup.close();
                });
        }
        function removeFiltersForField(expression, field) {
            if (expression.filters) {
                expression.filters = $.grep(expression.filters, function (filter) {
                removeFiltersForField(filter, field);
                    if (filter.filters) {
                        return filter.filters.length;
                    } else {
                        return filter.field != field;
                    }
                });
            }
        }
        function uniqueForField(data, field) {
            var map = {};
            var result = [];
            var item;
            for (var i = 0; i < data.length; i++) {
                item = data[i];
                if (!map[item[field]]) {
                result.push(item.toJSON());
                map[item[field]] = true;
                }
            }
            return result;
        }
    </script>
    <style type="text/css">
        .checkbox-ontainer
        {
        max-height: 200px;
        overflow:auto;
        }
    </style>
```

## More {{ site.framework }} Grid Resources

* [{{ site.framework }} Grid Documentation]({%slug htmlhelpers_grid_aspnetcore_overview%})

* [{{ site.framework }} Grid Demos](https://demos.telerik.com/{{ site.platform }}/grid)

{% if site.core %}
* [{{ site.framework }} Grid Product Page](https://www.telerik.com/aspnet-core-ui/grid)

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
