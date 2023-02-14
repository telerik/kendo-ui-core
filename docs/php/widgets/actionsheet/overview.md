---
title: Overview
page_title: Overview - ActionSheet PHP Class
description: "How to configure and use the ActionSheet PHP class in Kendo UI."
slug: overview_actionsheet_uiforphp
---

# ActionSheet PHP Class Overview

The Kendo UI ActionSheet for PHP is a server-side wrapper for the [Kendo UI ActionSheet](https://demos.telerik.com/kendo-ui/actionsheet/index) widget.

The Kendo UI ActionSheet is a dialog that displays a set of options for the user to choose from. It appears on top of the app's content, and the user must manually dismiss it before resuming the interaction with the app.

## Getting Started

### Configuration

The ActionSheet provides a set of [default API configuration options](/api/php/Kendo/UI/actionsheet) that can be set during its initialization. Follow the steps below to configure the Kendo UI ActionSheet for PHP:

**Step 1** Make sure you followed all the steps in the [introductory article on Telerik UI for PHP]({% slug overview_uiforphp %})&mdash;include the autoloader, JavaScript, and CSS files.

**Step 2** Create an [ActionSheet](/api/php/Kendo/UI/actionsheet):
    
        $actionSheet = new \Kendo\UI\ActionSheet('actionSheet');
        $actionSheet->title("Select item");

        $editItem = new \Kendo\UI\ActionSheetItem();
        $editItem->text('Edit Item')
            ->iconClass('k-icon k-i-edit')
            ->click("onClick");

        $favoritesItem = new \Kendo\UI\ActionSheetItem();
        $favoritesItem->text('Add to Favorites')
            ->iconClass('k-icon k-i-heart')
            ->click("onClick");

        $cancelItem = new \Kendo\UI\ActionSheetItem();
        $cancelItem->text('Upload New')
            ->iconClass('k-icon k-i-cancel')
            ->click("onClick");

        $actionSheet->addItem($editItem);
        $actionSheet->addItem($favoritesItem);
        $actionSheet->addItem($cancelItem);


**Step 3** Output the ActionSheet by echoing the result of the `render` method:

       <?= $actionSheet->render() ?>

## Items

The Kendo UI ActionSheet's items configuration allows you to set specific attributes of the ActionSheet items. You can set their:

- text
- icon
- group (items can be segregated in two groups - top and bottom.)
- description 
- click event handler name

For the full set, refer to the [API reference](api/javascript/ui/actionsheet/configuration/items). 

The following example demonstrates the possible options for the *items* configuration of the ActionSheet: 

        $actionSheet = new \Kendo\UI\ActionSheet('actionSheet');
        $actionSheet->title("Select item");

        $editItem = new \Kendo\UI\ActionSheetItem();
        $editItem->text('Edit Item')
            ->description("Select to enter edit mode.")
            ->iconClass('k-icon k-i-edit')
            ->click("onClick");

        $favoritesItem = new \Kendo\UI\ActionSheetItem();
        $favoritesItem->text('Add to Favorites')
            ->iconClass('k-icon k-i-heart')
            ->click("onClick");

        $cancelItem = new \Kendo\UI\ActionSheetItem();
        $cancelItem->text('Upload New')
            ->iconClass('k-icon k-i-cancel')
            ->click("onClick");

        $actionSheet->addItem($editItem);
        $actionSheet->addItem($favoritesItem);
        $actionSheet->addItem($cancelItem);

## Events

You can subscribe to the [open](/api/javascript/ui/actionsheet/events/open) and [close](/api/javascript/ui/actionsheet/events/close )events by the handler names.

### Specify Function Names

        $actionSheet = new \Kendo\UI\ActionSheet('actionSheet');
        $actionSheet->title("Select item");

        $editItem = new \Kendo\UI\ActionSheetItem();
        $editItem->text('Edit Item')
            ->iconClass('k-icon k-i-edit')
            ->click("onClick");

        $favoritesItem = new \Kendo\UI\ActionSheetItem();
        $favoritesItem->text('Add to Favorites')
            ->iconClass('k-icon k-i-heart')
            ->click("onClick");

        $cancelItem = new \Kendo\UI\ActionSheetItem();
        $cancelItem->text('Upload New')
            ->iconClass('k-icon k-i-cancel')
            ->click("onClick");

        $actionSheet->addItem($editItem);
        $actionSheet->addItem($favoritesItem);
        $actionSheet->addItem($cancelItem);
        $actionSheet->open("onOpen");
        $actionSheet->close("onClose");

        <script>
            function onOpen(e) {
                //handle open event
            }

            function onClose(e) {
                //handle close event
            }
        </script> 


## Reference

### Client-Side Instances

To reference to an existing ActionSheet instance, use the [`jQuery.data()`](https://api.jquery.com/jQuery.data/) method. Once a reference is established, use the [API](/api/javascript/ui/ActionSheet) to control its behavior.

The following example demonstrates how to access an existing ActionSheet instance.

        $actionsheet = new \Kendo\UI\ActionSheet('actionaheet');

        <script>
            $(function() {
                // The constructor parameter is used as the 'id' HTML attribute of the ActionSheet
                var actionSheet = $("#actionsheet").data("kendoActionSheet");
            });
        </script>

## See Also

* [Telerik UI for PHP API Reference Folder](/api/php/Kendo/UI/ActionSheet)
