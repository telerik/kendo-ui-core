---
title: How to Load All Pages in Kendo UI Grid Footer Pagination Dropdown
description: Learn how to implement a custom pagination dropdown in the footer of a Kendo UI Grid for ASP.NET MVC that allows loading all pages by default.
type: how-to
page_title: Load All Pages in Kendo UI Grid Footer Pagination Dropdown
slug: load-all-pages-kendo-ui-grid-footer-pagination-dropdown
tags: kendo-ui, grid, pagination, dropdown, custom
res_type: kb
components: ["grid"]
---

## Environment
| Product | Version |
|---|---|
| Progress® Kendo UI® Grid for ASP.NET MVC | 2022.2.621 |

## Description
I want to implement a custom pagination dropdown in the footer of a Kendo UI Grid for ASP.NET MVC that loads all pages by default.

## Solution
To achieve this behavior, you need to implement a custom pagination dropdown in the footer of the Kendo UI Grid. Here are the steps:

1. Hide the default pager.
2. Implement a custom `<div>` element that will be used for the custom pager.
3. In the "document.ready" scope, get the [`dataSource`](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/configuration/datasource) instance of the Kendo UI Grid.
4. Use the [`totalPages`](https://docs.telerik.com/kendo-ui/api/javascript/data/datasource/methods/totalpages) method of the `dataSource` to get the page count of the Grid.
5. Implement a DropDownList using the custom `<div>` element from step 2, with items from 1 to the page count obtained in step 4.
6. Use the [`change`](https://docs.telerik.com/kendo-ui/api/javascript/ui/dropdownlist/events/change) event of the DropDownList.
7. In the event handler, get the current value of the DropDownList and set it as the current page of the Grid using the [`page`](https://docs.telerik.com/kendo-ui/api/javascript/data/datasource/methods/page) method of the `dataSource`.

Here is an example implementation:

```html
<!-- Custom div element for the custom pager and hiding the default pager -->
<div id="customPager"></div>

<style>
    .k-grid-pager {
        display: none;
    }
</style>

<script>
    $(document).ready(function() {
        var gridDs = $("#grid").data("kendoGrid").dataSource;
        var ddlData = [];

        setTimeout(function() {
            var pages = gridDs.totalPages();

            for (var i = 1; i <= pages; i++) {
                ddlData.push(i);
            }

            $("#customPager").kendoDropDownList({
                dataSource: ddlData,
                change: onChange
            });

        }, 100)
    })

    function onChange() {
        var ddl = this;
        var currPage = ddl.value();
        var gridDs = $("#grid").data("kendoGrid").dataSource;
        gridDs.page(currPage)
    }
</script>
```

Note: The `#grid` selector in the code represents the ID of your Kendo UI Grid element. Make sure to replace it with the actual ID of your Grid element.
