---
title: Items
page_title: jQuery ActionSheet Documentation - Items
description: "Get started with the jQuery ActionSheet by Kendo UI and learn how to configure the items of the widget."
slug: items_actionsheet_widget
position: 2
---

# Items

The ActionSheet items are set of options that users can choose from.

The [`items`](/api/javascript/ui/actionsheet/configuration/items) configuration allows you to set specific attributes of the ActionSheet items. You can set their:

- text
- icon
- group (items can be segregated in two groups - top and bottom.)
- description 
- click event handler name


The following example demonstrates the possible options for the `items` configuration of the ActionSheet widget:

```dojo
    <div id="actionsheet"></div>
    <script>
        var actionsheet = $('#actionsheet').kendoActionSheet({
        title:'Select item',
        items:[
            {
              text: 'Edit Item',
              iconClass: 'k-icon k-i-edit',
              description: "Select to enter edit mode.",
              click: onClick
            },
            {
              text: 'Add to Favorites',
              iconClass: 'k-icon k-i-heart',
              click: onClick
            },
            {
              text: 'Cancel',
              iconClass: 'k-icon k-i-cancel',
              group: 'bottom',
              click: onClick
            },
        ]
        }).data('kendoActionSheet');

        function onClick(e) {
            e.preventDefault();
            actionsheet.close();
        }
        actionsheet.open();
        setTimeout(function(){actionsheet.close()},2000)
</script
```

## See Also

* [Items demo of the ActionSheet](https://demos.telerik.com/kendo-ui/actionsheet/items)
* [JavaScript API Reference of the ActionSheet](/api/javascript/ui/actionsheet)
