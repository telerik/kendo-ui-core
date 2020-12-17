---
title: Overview
page_title: Overview
description: "How to configure and use the FloatingActionButton PHP class in Kendo UI."
slug: overview_floatingactionbutton_uiforphp
---

# FloatingActionButton PHP Class Overview

The Kendo UI FloatingActionButton for PHP is a server-side wrapper for the [Kendo UI FloatingActionButton](https://demos.telerik.com/kendo-ui/floatinactionbutton/index) widget.

## Getting Started

### Configuration

The FloatingActionButton provides a set of [default API configuration options](/api/php/Kendo/UI/FloatingActionButton) that can be set during its initialization such as size, shape, themeColor, align, positionMode, and so on. Below are listed the steps for you to follow when configuring the Kendo UI FloatingActionButton for PHP.

**Step 1** Make sure you followed all the steps from the [introductory article on Telerik UI for PHP]({% slug overview_uiforphp %})&mdash;include the autoloader, JavaScript, and CSS files.

**Step 2** Create a [FloatingActionButton](/api/php/Kendo/UI/FloatingActionButton).
    
        $fab = new \Kendo\UI\FloatingActionButton('fab');

        $fab->positionMode("absolute")
            ->alignOffset(array(x => 50, y => 50))
            ->icon("plus")
            ->themeColor("primary")
            ->size("medium");


**Step 3** Output the FloatingActionButton by echoing the result of the `render` method.

       <?= $FloatingActionButton->render() ?>

## Alignment

The Kendo UI FloatingActionButton exposes the `align`,`alignOffset` and `positionMode` configuration options. These three options work in conjunction allowing you to position the FloatingActionButton component precisely as per the application requirements. The example below demonstrates how to configure the alignment and positioning of the FloatingActionButton

        $fab = new \Kendo\UI\FloatingActionButton('fab');

        $fab->positionMode("fixed") //positions the button relative to the viewport
            ->align("top end")
            ->alignOffset(array(x => 100, y => 100));

## Appearance

The Kendo UI FloatingActionButton for PHP allows you to customize the appearance of the component by setting the size, shape, color, icon and text of the FloatingActionButton. Following the Material Design guidelines we advise when configuring the FloatingActionButton to display additional related actions or "speed dial actions" to set only the icon option for the button and use labels to dispay additional information for the related actions, if needed. Alternatively, if you would like to have an icon and text for the Kendo UI FloatingActionButton consider omitting the display of additional actions. The example below demonstrates how to configure the speed dial action items of the FloatingActionButton:

        $fab = new \Kendo\UI\FloatingActionButton('fab');

        $twitter = new \Kendo\UI\FloatingActionButtonItem();
        $twitter->icon("twitter")
            ->label("Twitter")
            ->click(onItemClick);

        $email = new \Kendo\UI\FloatingActionButtonItem();
        $email->icon("email")
            ->label("Email")
            ->click(onItemClick);

        $fab->positionMode("absolute")
                ->align("bottom end")
                ->icon("share")
                ->themeColor("success")
                ->size("medium")
                ->addItem($twitter,$email);

        <script>
            function onItemClick(e) {
                console.log(e.item.label + " clicked");
            };
        </script>

## Event Handling

You can subscribe to the [click](/api/javascript/ui/FloatingActionButton/events/click) event by the handler name. For a full list of events, refer to the FloatingActionButton events documentation in the API section.

### Specify Function Names

The example below demonstrates how to subscribe for events by specifying a JavaScript function name.

        $fab = new \Kendo\UI\FloatingActionButton('fab');

        $fab->align("bottom center")
                ->text("Bookmark")
                ->icon("bookmark")
                ->click("onClick");

        <script>
            function onClick(e) {
                //handle click event
            }
        </script>

## Reference

### Client-Side Instances

To reference to an existing FloatingActionButton instance, use the [`jQuery.data()`](https://api.jquery.com/jQuery.data/) method. Once a reference is established, use the [API](/api/javascript/ui/FloatingActionButton) to control its behavior.

The following example demonstrates how to access an existing FloatingActionButton instance.

        $FloatingActionButton = new \Kendo\UI\FloatingActionButton('fab');

        <script>
            $(function() {
                // The constructor parameter is used as the 'id' HTML attribute of the FloatingActionButton
                var fab = $("#fab").data("kendoFloatingActionButton");
            });
        </script>

## See Also

* [Overview of the Kendo UI FloatingActionButton Widget]({% slug overview_kendoui_floatingactionbutton_widget %})
* [Telerik UI for PHP API Reference Folder](/api/php/Kendo/UI/FloatingActionButton)
