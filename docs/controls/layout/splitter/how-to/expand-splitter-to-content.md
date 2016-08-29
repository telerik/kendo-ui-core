---
title: Expand to Content
page_title: Expand to Content | Kendo UI Splitter
description: "Learn how to expand the Kendo UI Splitter based on the height of the content."
slug: howto_expandtocontent_splitter
---

# Expand to Content

The example below demonstrates how to make the Kendo UI Splitter expand its height based on the content inside a pane.

To achieve this, take the following notable steps:

1. Set up the Kendo UI Splitter to expand to the height of its parent according to the article on how to [expand to 100% height and auto-resize]({% slug howto_expandto100heightandautoresize_splitter %}).
2. Make sure that the parent content is resized when the content of the pane is rendered.
3. Call the `resize` method to finalize the process.

###### Example

```html
<style>
    html,
    body,
    #splitter
    {
        height:100%;
        margin:0;
        padding:0;
    }
</style>

<div id="splitter">
  <div><div id="grid"></div></div>
  <div></div>
</div>

<script>
    $(function() {
        $("#splitter").kendoSplitter({
            panes: [ { resizable: true , scrollable: false }, {} ]
        });

        $("#grid").kendoGrid({
            dataSource: {
                type: "odata",
                transport: {
                read: "//demos.telerik.com/kendo-ui/service/Northwind.svc/Customers"
                }
            },
            columns: [{
                field: "ContactName",
                title: "Contact Name",
            }],
            dataBound: function(e) {
                var gridHeight = e.sender.wrapper.height();
                $(document).find("body").height(gridHeight);
                var splitter = $("#splitter").data("kendoSplitter");
                splitter.resize(true);
            }
        });
    });
</script>
```


## See Also

Other articles and how-to examples on the Kendo UI Splitter:

* [Splitter JavaScript API Reference](/api/javascript/ui/splitter)
* [How to Keep Pane Size in Percentages]({% slug howto_keeppanesizepercentages_splitter %})

For more runnable examples on the Kendo UI Splitter, browse its [**How To** documentation folder]({% slug howto_addautoresizingsplittertowindow_splitter %}).
