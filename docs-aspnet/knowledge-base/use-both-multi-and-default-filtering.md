---
title: Using Both Multi-Checkbox and Default Grid Filtering
description: An example on how to modify the Grid for {{ site.framework }} to use both multi-checkbox and default filtering.
type: how-to
page_title: Using Multi-Checkbox and Default Filtering
slug: use-both-multi-and-default-filtering
tags: grid, filtering, multi, checkbox, default, menu, column
ticketid: 1120044
res_type: kb
components: ["general"]
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

By design, the Grid column does not support the multi-checkbox and the default menu filter. How can I modify the Grid to use both multi-checkbox and default filtering?

## Solution

1. Enable the `Filterable()` option of the Grid.
1. Handle the [`FilterMenuInit`](https://docs.telerik.com/{{ site.platform }}/api/kendo.mvc.ui.fluent/grideventbuilder#filtermenuinitsystemstring) event of the Grid that fires when the column filter menu is initialized and opens for the first time.
1. Within the `FilterMenuInit` event handler, check the name of the filtered column and append a [Kendo UI for jQuery ListView](https://docs.telerik.com/kendo-ui/controls/listview/overview) to the default filter menu that will display the checkboxes.
1. Handle the `submit` event of the column filer menu, prevent its default action, and filter the Grid manually based on the selected checkboxes and filter menu values.

```HtmlHelper
    @(Html.Kendo().Grid<OrderViewModel>()
        .Name("grid")
        .Columns(columns =>
        {
            columns.Bound(p => p.ShipName);
            columns.Bound(e => e.ShipCity).Filterable(ftb => ftb.Multi(true).Search(true));
        })
        .Filterable()
        .Events(ev => ev.FilterMenuInit("onFilterMenuInit"))
        ... // Other configuration.
        .DataSource(dataSource => dataSource
            .Ajax()
            .PageSize(10)
            .Read(read => read.Action("Read", "Grid"))
        )
    )
```
{% if site.core %}
```TagHelper
    @addTagHelper *, Kendo.Mvc

    <kendo-grid name="grid" on-filter-menu-init="onFilterMenuInit">
        <datasource type="DataSourceTagHelperType.Ajax" page-size="10">
            <transport>
                <read url="@Url.Action("Read","Grid")"/>
            </transport>
        </datasource>
        <columns>
            <column field="ShipName"/>
            <column field="ShipCity">
                <filterable enabled="true" multi="true" search="true"/>
            </column>
        </columns>
        <filterable enabled="true"/>
        <!-- Other configuration-->
    </kendo-grid>
```
{% endif %}
```JS scripts
    <script>
        function onFilterMenuInit(e) {
            if (e.field == "ShipName") { // Check if the "ShipName" column filter menu opens.
                initCheckboxFilter.call(this, e); // Initialize the ListView widget to display the checkboxes.
            }
        }

        function initCheckboxFilter(e) {
            var popup = e.container.data("kendoPopup");
            var dataSource = this.dataSource;
            var field = e.field;
            var checkboxesDataSource = new kendo.data.DataSource({ // Set up the DataSource for the ListView by using the "ShipName" column data.
                data: uniqueForField(dataSource.data(), field)
            });


            var helpTextElement = e.container.children(":first").children(":first");
            // Define the ListView and insert it to the filter menu container element.
            var element = $("<div class='checkbox-container'></div>").insertAfter(helpTextElement).kendoListView({
                dataSource: checkboxesDataSource,
                template: "<div><input type='checkbox' class='k-checkbox' value='#:" + field + "#'/> #:" + field + "#</div>"
            });
            // Handle the "submit" event of the column filter menu.
            e.container.find("[type='submit']").click(function (e) {
                e.preventDefault();
                e.stopPropagation();
                var filter = dataSource.filter() || { logic: "or", filters: [] };
                var fieldFilters = $.map(element.find(":checkbox:checked"), function (input) {
                    return {
                        field: field,
                        operator: "eq",
                        value: input.value
                    };
                });


                // Default filter menu options.
                var defaultFilters = {};
                var defaultFilterValue1 = $(".k-filter-menu-container").find("input[title='Value']").val();
                var defaultFilterValue2 = $(".k-filter-menu-container").find("input[title='Additional value']").val();
                var operator1 = $(".k-filter-menu-container").find("[data-role='dropdownlist']").eq(0).getKendoDropDownList().value();
                var operator2 = $(".k-filter-menu-container").find("[data-role='dropdownlist']").eq(2).getKendoDropDownList().value();
                var defaultFilterLogic = $(".k-filter-menu-container").find("[data-role='dropdownlist']").eq(1).getKendoDropDownList().value();

                if (defaultFilterValue1 != "") {
                    defaultFilters = {
                        logic: defaultFilterLogic,
                        filters: [
                            { field: "ShipName", operator: operator1, value: defaultFilterValue1 }
                        ]
                    };
                };
                if (defaultFilterValue2 != "") {
                    defaultFilters.filters.push({ field: "ShipName", operator: operator2, value: defaultFilterValue2 });
                }


                if (fieldFilters.length || defaultFilters.filters) {
                    removeFiltersForField(filter, field);

                    if (fieldFilters.length) {
                        filter.filters.push({
                            logic: "or",
                            filters: fieldFilters
                        });
                    }

                    if (defaultFilters.filters) {
                        filter.filters.push({
                            logic: defaultFilters.logic,
                            filters: defaultFilters.filters
                        });
                    }

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
```
```CSS Styles
<style>
    .checkbox-container {
        max-height: 200px;
        overflow:auto;
    }
</style>
```

{% if site.core %}
For a runnable example based on the code above, refer to the following REPL samples:

* [Sample code with the Grid HtmlHelper](https://netcorerepl.telerik.com/GIuLmTlS349rHfcH42)
* [Sample code with the Grid TagHelper](https://netcorerepl.telerik.com/GeOVQfFo36nEVORY20)
{% else %}
For a runnable example based on the code above, refer to the [REPL example on using both multi-checkbox and default filter menu of a Grid column](https://netcorerepl.telerik.com/GIuLmTlS349rHfcH42).
{% endif %}

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
{% if site.core %}
* [Server-Side TagHelper API Reference of the Grid for {{ site.framework }}](https://docs.telerik.com/{{ site.platform }}/api/taghelpers/grid)
{% endif %}
* [Telerik UI for {{ site.framework }} Breaking Changes]({%slug breakingchanges_2023%})
* [Telerik UI for {{ site.framework }} Knowledge Base](https://docs.telerik.com/{{ site.platform }}/knowledge-base)
