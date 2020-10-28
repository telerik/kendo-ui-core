---
title: Localization
page_title: jQuery Pager Documentation | Localization
description: "Get started with the jQuery Pager by Kendo UI and learn how to localize the text of its messages."
slug: localization_kendoui_pager_widget
---

# Localization

The Pager provides options for defining the tooltips for its page and navigation links, information text and labels.

To localize the messages, set the desired strings in the [`messages`](/api/javascript/ui/pager/configuration/messages) field.

The example below shows how to change the tooltip of the refresh button and the information message.

```dojo
<div id="pager"></div>

<script>
    var dataSource = new kendo.data.DataSource({
      data: [
        { productName: "Tea", category: "Beverages" },
        { productName: "Coffee", category: "Beverages" },
        { productName: "Ham", category: "Food" },
        { productName: "Bread", category: "Food" }
      ],
      pageSize: 2
    });

    $("#pager").kendoPager({
      dataSource: dataSource,
      refresh: true,
      messages: {
        refresh: "Refresh data",
        display: "Showing {0}-{1} from {2} data items"
      }
    });

    dataSource.read();
</script>
<style>
  #pager {
   margin-top: 100px;
  }
</style>
```

## See Also

* [Basic Usage of the Pager (Demo)](https://demos.telerik.com/kendo-ui/pager/index)
* [JavaScript API Reference of the Pager](/api/javascript/ui/pager)
