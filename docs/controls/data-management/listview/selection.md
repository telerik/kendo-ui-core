---
title: Selection
page_title: jQuery ListView Documentation | Selection
description: "Get started with the jQuery ListView by Kendo UI and learn how to implement its selection functionality."
slug: selection_kendoui_listview
position: 4
---

# Selection

By default, the selection feature of the ListView is disabled.

## Getting Started

The ListView supports the item selection functionality by setting the `selectable` property to either `"single"` or `"multiple"`.

    $("#listView").kendoListView({
        dataSource: dataSource,
        selectable: "multiple",
        template: kendo.template($("#template").html())
    });

## Advanced Configuration

You can also detect when users pick up items through the `change` event which is triggered upon their selecting one or more items with the `Shift`+ select combination.

    $("#listView").kendoListView({
        change: function(e) {
            var data = dataSource.view();
            var selected = $.map(this.select(), function(item) {
                return data[$(item).index()].ProductName;
            });

            // Index selected or read item information through data.
        }
    });

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
    selectable: true,
    dataSource: dataSource,
    template: kendo.template($("#template").html())
});
</script>

<style>
    .alt { background-color: #EEE; }
</style>

```

## See Also

* [Basic Usage of the ListView (Demo)](https://demos.telerik.com/kendo-ui/listview/index)
* [JavaScript API Reference of the ListView](/api/javascript/ui/listview)
