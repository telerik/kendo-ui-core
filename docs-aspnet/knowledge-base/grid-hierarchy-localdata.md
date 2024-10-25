---
title: Configuring the Grid Hierarchy with Local Data
description: An example on how to configure the {{ site.product }} Grid hierarchy by using local data.
type: how-to
page_title: Grid Hierarchy with Local Data
slug: grid-hierarchy-localdata
tags: grid, hierarchy, asp, core, local data
res_type: kb
component: grid
---

## Description

I want to bind the parent Grid to a model that contains a list of elements and each of these elements has a list of child records and I want a Details Grid to bind to that list. How can I achieve this?

## Solution

To achieve the desired result follow the steps below:

 {% if site.core %}
  1. Configure the Grid for [Local Data Binding]({% slug htmlhelpers_grid_aspnetcore_localbinding %}).
{% else %}
  1. Configure the Grid for [Server Binding]({% slug serverbinding_grid_aspnetmvc %}).
{% endif %}
  1. Follwo the requirements for configuring the [Hierarchy funtionliaty]({% slug hierarchy_grid_htmlhelper_aspnetcore %})
  1. Define a ClientTemplate with DataSource configured for Ajax binding and set the AutoBind configuration to `false`
  1. Add an event handler to the [`DetailInit`](https://docs.telerik.com/{{ site.platform }}/api/kendo.mvc.ui.fluent/grideventbuilder#detailinitsystemstring) event and use it to set teh data for the child Grid

  Check this [REPL for a runnable example](https://netcorerepl.telerik.com/wPlFuylo00Q9Ch7J51).

  ```tab-Controller
        public ActionResult Index()
        {
            List<CategoryItem> data = new List<CategoryItem>
                {
                    new CategoryItem
                    {
                        CategoryName = "Storage",
                        SubCategories = new List<SubCategoryItem>
                        {
                            new SubCategoryItem()
                            {
                                SubCategoryName = "Wall Shelving"
                            },
                            new SubCategoryItem
                            {
                                 SubCategoryName = "Floor Shelving"
                            }
                        }
                    },
                    new CategoryItem
                    {
                        CategoryName = "Lights",
                        SubCategories = new List<SubCategoryItem>
                        {
                            new SubCategoryItem()
                            {
                                SubCategoryName = "Ceiling"
                            },
                            new SubCategoryItem
                            {
                                 SubCategoryName = "Table"
                            },
                            new SubCategoryItem
                            {
                                 SubCategoryName = "Floor"
                            }
                        }
                    },
                    new CategoryItem
                    {
                        CategoryName = "Flooring",
                        SubCategories = new List<SubCategoryItem>
                        {
                            new SubCategoryItem()
                            {
                                SubCategoryName = "Tiles"
                            },
                            new SubCategoryItem
                            {
                                 SubCategoryName = "Laminate Flooring"
                            }
                        }
                    },
                };

            return View(data);
        }
  ```
  ```tab-View
    @model IEnumerable<CategoryItem>

    <script>
        function onDetailInit(e) {
            var grid = e.detailCell.find("[data-role=grid]").data("kendoGrid");
            grid.dataSource.data(e.data.SubCategories);
        }
    </script>

    <script id="template" type="text/kendo-tmpl">
        @(Html.Kendo().Grid<SubCategoryItem>()
                .Name("grid_#=CategoryName#")
                .Columns(columns =>
                {
                    columns.Bound(o => o.SubCategoryName);
                })
                .DataSource(dataSource => dataSource
                    .Ajax()
                    .ServerOperation(false)
                    .PageSize(10)
                )
                .AutoBind(false)
                .Pageable()
                .Sortable()
                .ToClientTemplate()
        )
    </script>

    @(Html.Kendo().Grid<CategoryItem>(Model)
        .Name("grid")
        .DataSource(dataSource => dataSource
            .Ajax()
            .ServerOperation(false)
            .PageSize(2)
        )
        .Columns(columns =>
        {
            columns.Bound(e => e.CategoryName).Title("Category");
            columns.Template("#: data.SubCategories.length #").Title("Count of SubCategories");
        })
        .Sortable()
        .Pageable()
        .Scrollable()
        .ClientDetailTemplateId("template")
        .HtmlAttributes(new { style = "height:430px;" })
        .Events(events => events.DetailInit("onDetailInit"))
    )
  ```

## More {{ site.framework }} Grid Resources

* [{{ site.framework }} Grid Documentation]({%slug htmlhelpers_grid_aspnetcore_overview%})

* [{{ site.framework }} Grid Demos](https://demos.telerik.com/{{ site.platform }}/grid/index)

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
