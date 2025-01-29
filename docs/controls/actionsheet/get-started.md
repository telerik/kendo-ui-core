---
title: Getting Started
page_title: jQuery ActionSheet Documentation - Getting Started with the ActionSheet
description: "Get started with the jQuery ActionSheet by Kendo UI and learn how to create, initialize, and enable the component."
slug: getting_started_kendoui_actionsheet_widget
position: 1
---

# Getting Started with the ActionSheet

This guide demonstrates how to get up and running with the Kendo UI for jQuery ActionSheet.

After the completion of this guide, you will be able to achieve the following end result:

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
</script>
```

## 1. Create an Empty Div Element

First, create an empty `<div>` element on the page.

```html
<div id="actionsheet"></div>
```

## 2. Initialize the ActionSheet

In this step, you will initialize the ActionSheet from the empty `<div>` element. All settings of the ActionSheet will be provided in the initialization script statement and you have to describe its layout and configuration in JavaScript.

```html
<div id="actionsheet"></div>

<script>
    // Target the div element by using jQuery and then call the kendoActionSheet() method.
    $("#actionsheet").kendoActionSheet({
        title:'Select item',
    });
</script>
```

## 3. Add Action Items

You can add all the action items you need through the [`items`](/api/javascript/ui/actionsheet/configuration/items) configuration.

```html
    <div id="actionsheet"></div>
    <script>
        function onClick(e) {
            e.preventDefault();
            actionsheet.close();
        }

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
                }
            ]
    });

    actionsheet.open();
    </script>
```

## Next Steps

* [Referencing Existing Component Instances]({% slug widget_methodsand_events_kendoui_installation %})
* [Demo Page for the Kendo UI for jQuery ActionSheet](https://demos.telerik.com/kendo-ui/actionsheet/index)

## See Also

* [JavaScript API Reference of the jQuery ActionSheet](/api/javascript/ui/actionsheet)
* [Knowledge Base Section](/knowledge-base)

<script>
  window.onload = function() {
    document.getElementsByClassName("btn-run")[0].click();
  }
</script>
