---
title: Paging
page_title: jQuery ListView Documentation - Paging
description: "Get started with the jQuery ListView by Kendo UI and learn how to implement a separate pager and split its content into pages."
slug: paging_kendoui_listview
position: 5
---

# Paging

By default, the paging functionality of the ListView is disabled. 

To enable it, use either of the following approaches: 

* (Available as of the R3 2021 release) Use the built-in paging functionality by setting the [`pageable`](/api/javascript/ui/listview/configuration/pageable) property.
* Use the [Kendo UI Pager](/controls/data-management/pager/overview) widget.

## Using the Built-in Paging Functionality

Enabling the built-in paging renders the Pager as part of the ListView widget.

To enable paging, set [`pageable`](/api/javascript/ui/listview/configuration/pageable) to `true`. For more information about the `pageable` properties, refer to the [API documentation](/api/javascript/ui/listview/configuration/pageable#related-properties).

The following example demonstrates how to implement the suggested approach. 

```dojo
<div id="listView"></div>

<script type="text/x-kendo-tmpl" id="template">
  <div class="product-view k-widget">
      <dl>
          <dt>Product Name</dt>
          <dd>#:ProductName#</dd>
      </dl>
  </div>
</script>

<script>
  $(document).ready(function () {
    var crudServiceBaseUrl = "https://demos.telerik.com/kendo-ui/service",
        dataSource = new kendo.data.DataSource({
          transport: {
            read:  {
              url: crudServiceBaseUrl + "/Products",
              dataType: "jsonp"
            }
          },
          pageSize: 10
        });

    var listView = $("#listView").kendoListView({
      dataSource: dataSource,
      template: kendo.template($("#template").html()),
      navigatable: true,
      pageable: true
    }).data("kendoListView");
  });
</script>
```

## Integrating the Pager Widget

Using the Pager renders the widget as a separate element from the ListView.

To enable paging, instantiate a separate Pager control and bind it to the same DataSource.

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

When you use the Pager widget and when the number of items, which are bound to a ListView, is larger than expected, the displayed items will be controlled by the `pager` setting.

1. Create a target element for rendering the `pager`. It is typically placed near the ListView.

        <div id="listView"></div>
        <div class="k-page-wrap">
            <div id="pager"></div>
        </div>

        <script type="text/x-kendo-tmpl" id="template">
            <div class="product">
                <img src="https://demos.telerik.com/kendo-ui/content/web/foods/#= ProductID #.jpg" alt="Kendo UI for jQuery ListView #: ProductName # " />
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
        <img src="https://demos.telerik.com/kendo-ui/content/web/foods/#= ProductID #.jpg" alt="Kendo UI for jQuery ListView #: ProductName # " />
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
