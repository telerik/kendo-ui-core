---
title: Customizing the Grid Pager's DropDown
description: Learn how to customize the pagination DropDownL in the {{ site.product }} Grid footer to load all pages by default.
type: how-to
page_title: How to Customize {{ site.product }} Grid Footer Pagination to Load All Pages by Default
slug: customize-kendo-ui-grid-footer-pagination-load-all-pages
tags: kendo-ui-grid, pagination, customization, drop-down, default, telerik, aspnet-mvc, aspnet-core
res_type: kb
components: ["general"]
---

## Environment
| Property | Value |
| --- | --- |
| Product | {{ site.product }} Grid |
| Version | 2022.2.621 |

## Description
I would like to customize the pagination drop-down in the {{ site.product }} Grid Grid footer to load all pages by default. How can I achieve this?

## Solution
To customize the pagination drop-down in the {{ site.product }} Grid Grid footer to load all pages by default, follow these steps:

1. Hide the default pager by adding the following CSS code:

```css
.k-grid-pager {
    display: none;
}
```

2. Implement a custom div element that will serve as the custom pager. For example:

```html
<div id="customPager"></div>
```

3. In the [`document.ready`](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/configuration/datasource) scope, retrieve the [`dataSource`](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/configuration/datasource) instance of the {{ site.product }} Grid Grid.

4. Handle the [`dataBound`](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/events/databound) Event of the Grid.

5. In the Event handler, Use the [`totalPages`](https://docs.telerik.com/kendo-ui/api/javascript/data/datasource/methods/totalpages) method of the `dataSource` to get the page count of the Grid.

6. Implement a DropDownList using the custom div element from step 2, with items ranging from 1 to the page count obtained in step 4.

7. Attach a [`change`](https://docs.telerik.com/kendo-ui/api/javascript/ui/dropdownlist/events/change) event handler to the DropDownList.

8. In the event handler, retrieve the current value of the DropDownList and set it as the current page of the Grid using the [`page`](https://docs.telerik.com/kendo-ui/api/javascript/data/datasource/methods/page) method of the `dataSource`.

Here is an example implementation:

```html
<!-- Custom div element for our pager and hiding the default one -->
<div id="customPager"></div>

<style>
    .k-grid-pager {
        display: none;
    }
</style>

<script>
$(document).ready(function () {
    var grid = $("#grid").data("kendoGrid");

    // Attach an event handler to the dataBound event
    grid.bind("dataBound", function(e) {
        var pages = e.sender.dataSource.totalPages();
        var ddlData = [];

        for (var i = 1; i <= pages; i++) {
            ddlData.push(i);
        }

        // Check if the dropdown is already initialized to avoid re-initializing
        var customPager = $("#customPager").data("kendoDropDownList");
        if (!customPager) {
            $("#customPager").kendoDropDownList({
                dataSource: ddlData,
                change: onChange
            });
        } else {
            // If already initialized, just update its data
            customPager.setDataSource(ddlData);
            customPager.refresh();
        }
    });
});

function onChange() {
    var ddl = this;
    var currPage = ddl.value();
    var grid = $("#grid").data("kendoGrid");
    grid.dataSource.page(currPage);
}
</script>
```

## REPL examples

* [HtmlHelper](https://netcorerepl.telerik.com/GekHvdFq26Yj5vdj54)
* [TagHelper](https://netcorerepl.telerik.com/cekRPHlK28SgNOy332)

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

* [Client-Side API Reference of the Grid  for {{ site.framework }}](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid)
* [Server-Side API Reference of the Grid  for {{ site.framework }}](https://docs.telerik.com/{{ site.platform }}/api/grid)
* [Telerik REPL: Change the Grid Pager to a Slider](https://netcorerepl.telerik.com/cnOGGPlA21RzEjkG12)
* [Telerik UI for {{ site.framework }} Breaking Changes]({%slug breakingchanges_2023%})
* [Telerik UI for {{ site.framework }} Knowledge Base](https://docs.telerik.com/{{ site.platform }}/knowledge-base)
