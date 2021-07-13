---
title: Items
page_title: jQuery ListView Documentation | Items
description: "Get started with the jQuery ListView by Kendo UI and learn how to alternate its items."
previous_url: /controls/data-management/listview/basic-usage
slug: items_kendoui_listview
position: 2
---

# Items

Your project might require you to visually differentiate each alternating item in a ListView.

For example, you might need to render each second item in a slightly darker background (banded rows). To render alternating items in the ListView, set of a template by defining the `altTemplate` property.

    <div id="listView"></div>
    <div class="k-page-wrap">
        <div id="pager"></div>
    </div>

    <script type="text/x-kendo-tmpl" id="template">
        <div class="product">
            <img src="https://demos.telerik.com/kendo-ui/content/web/foods/#= ProductID #.jpg" alt="#: ProductName # image" />
            <h3>#:ProductName#</h3>
            <p>#:kendo.toString(UnitPrice, "c")#</p>
        </div>
    </script>

    <script type="text/x-kendo-tmpl" id="altTemplate">
        <div class="product alt">
            <img src="https://demos.telerik.com/kendo-ui/content/web/foods/#= ProductID #.jpg" alt="#: ProductName # image" />
            <h3>#:ProductName#</h3>
            <p>#:kendo.toString(UnitPrice, "c")#</p>
        </div>
    </script>

The following example demonstrates the full implementation of the suggested approach.

```dojo
<div id="listView" style="max-height:400px;overflow:auto;"></div>
<div class="k-pager-wrap">
    <div id="pager"></div>
</div>

<script type="text/x-kendo-tmpl" id="template">
    <div class="product">
        <img src="https://demos.telerik.com/kendo-ui/content/web/foods/#= ProductID #.jpg" alt="#: ProductName # image" />
        <h3>#:ProductName#</h3>
        <p>#:kendo.toString(UnitPrice, "c")#</p>
    </div>
</script>

    <script type="text/x-kendo-tmpl" id="altTemplate">
        <div class="product alt">
            <img src="https://demos.telerik.com/kendo-ui/content/web/foods/#= ProductID #.jpg" alt="#: ProductName # image" />
            <h3>#:ProductName#</h3>
            <p>#:kendo.toString(UnitPrice, "c")#</p>
        </div>
    </script>

<script>
var dataSource = new kendo.data.DataSource({
    transport: {
        read: {
            url: "https://demos.telerik.com/kendo-ui/service/Products",
            dataType: "jsonp"
        }
    },
    pageSize: 3
});

$("#pager").kendoPager({
    dataSource: dataSource
});

$("#listView").kendoListView({
    dataSource: dataSource,
    template: kendo.template($("#template").html()),
    altTemplate: kendo.template($("#altTemplate").html()),
});
</script>

<style>
    .alt { background-color: #EEE; }
</style>

```

## See Also

* [Basic Usage of the ListView (Demo)](https://demos.telerik.com/kendo-ui/listview/index)
* [JavaScript API Reference of the ListView](/api/javascript/ui/listview)
