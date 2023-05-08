---
title: Overview
page_title: jQuery ActionSheet Documentation - ActionSheet Overview
description: "Get started with the jQuery ActionSheet by Kendo UI and learn how to initialize the widget."
slug: overview_kendoui_actionsheet_widget
position: 1
CTAControlName: ActionSheet
---

# {{ site.product }} ActionSheet Overview

The Kendo UI ActionSheet is a dialog that displays a set of options for the user to choose from. It appears on top of the app's content, and the user must manually dismiss it before resuming the interaction with the app.

## Initializing the ActionSheet

To initialize the ActionSheet, use the `<div>` tag.

The following example demonstrates how to initialize the ActionSheet from an existing `<div>` element:

```dojo
    <div id="actionsheet"></div>
    <script>
        var actionsheet = $('#actionsheet').kendoActionSheet({
        title:'Select item',
        items:[
            {
              text: 'Edit Item',
              iconClass: 'k-icon k-i-edit',
              click: onClick
            },
            {
              text: 'Add to Favorites',
              iconClass: 'k-icon k-i-heart',
              click: onClick
            },
            {
              text: 'Upload New',
              iconClass: 'k-icon k-i-upload',
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


## Functionality and Features

* [Items]({% slug items_actionsheet_widget %})&mdash;The configuration allows you to set various attributes like icons and text.
* [Events]({% slug events_actionsheet_widget %})&mdash;The exposed events of the component.
* [Accessibility]({% slug accessibility_kendoui_actionsheet_widget %})&mdash;The ActionSheet supports various accessibility standards.

## See Also

* [Overview of the ActionSheet (Demo)](https://demos.telerik.com/kendo-ui/actionsheet/index)
* [JavaScript API Reference of the ActionSheet](/api/javascript/ui/actionsheet)
