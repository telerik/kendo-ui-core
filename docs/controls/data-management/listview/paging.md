---
title: Paging
page_title: jQuery ListView Documentation | Paging
description: "Get started with the jQuery ListView by Kendo UI and learn how to implement a separate pager and split its content into pages."
slug: paging_kendoui_listview
position: 5
---

# Paging

By default, the paging functionality of the ListView is disabled.  

## Getting Started

To enable paging, instantiate a separate pager control and bind it to the same DataSource.

    <div id="listview"></div>
    <div id="pager"></div>
    <script>
        var dataSource = new kendo.data.DataSource({
            data: [
                { id: 1, item: "Item 1" },
                { id: 2, item: "Item 2" },
                { id: 3, item: "Item 3" },
                { id: 4, item: "Item 4" },
                { id: 5, item: "Item 5" },
                { id: 6, item: "Item 6" }
            ],
            pageSize: 2
        });

        $("#listview").kendoListView({
            dataSource: dataSource,
            template: "<div>#: item #</div>"
        });

        $("#pager").kendoPager({
            dataSource: dataSource
        });
    </script>

## Advanced Configuration

When the number of items that are bound to a ListView is larger than expected, the `pager` will control the items that are displayed.

1. Create a target element for its rendering. It is typically placed near the ListView.

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

1. Update the ListView configuration through its `pageable` property to state that the widget supports paging and to initialize the `pager`.

        var dataSource = new kendo.data.DataSource({
            transport: {
                read: {
                    url: "https://demos.telerik.com/kendo-ui/service/Products",
                    dataType: "jsonp"
                }
            },
            pageSize: 4
        });

        $("pager").kendoPager({
            dataSource: dataSource
        });

        $("#listView").kendoListView({
            dataSource: dataSource,
            pageable: true,
            template: kendo.template($("#template").html())
        });

The following example demonstrates the full implementation of the suggested approach.

```dojo
<div id="listView" style="max-height:400px;overflow:auto;"></div>
<div id="pager"></div>

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
    }
});

$("pager").kendoPager({
    dataSource: dataSource
});

$("#listView").kendoListView({
    dataSource: dataSource,
    pageable: true,
    template: kendo.template($("#template").html())
});
</script>

```

## See Also

* [Basic Usage of the ListView (Demo)](https://demos.telerik.com/kendo-ui/listview/index)
* [JavaScript API Reference of the ListView](/api/javascript/ui/listview)
