---
title: Overview
page_title: Overview
description: "How to configure and use the Breadcrumb PHP class in Kendo UI."
slug: overview_breadcrumb_uiforphp
---

# Breadcrumb PHP Class Overview

The Kendo UI Breadcrumb for PHP is a server-side wrapper for the [Kendo UI Breadcrumb](https://demos.telerik.com/kendo-ui/breadcrumb/index) widget.

## Getting Started

### Configuration

The Breadcrumb provides a set of [default API configuration options](/api/php/Kendo/UI/Breadcrumb) that can be set during its initialization. Follow the steps below to configure the Kendo UI Breadcrumb for PHP:

**Step 1** Make sure you followed all the steps in the [introductory article on Telerik UI for PHP]({% slug overview_uiforphp %})&mdash;include the autoloader, JavaScript, and CSS files.

**Step 2** Create a [Breadcrumb](/api/php/Kendo/UI/Breadcrumb):
    
        $breadcrumb = new \Kendo\UI\Breadcrumb('breadcrumb');

        $rootItem = new \Kendo\UI\BreadcrumbItem();
        $rootItem->type("rootItem")
             ->href("https://demos.telerik.com/php-ui/")
             ->text("All Components")
             ->showText(true)
             ->icon("home")
             ->showIcon(true);

        $firstItem = new \Kendo\UI\BreadcrumbItem();
        $firstItem->type("item")
                    ->href("/breadcrumb")
                    ->text("Breadcrumb")
                    ->showText(true);

        $secondItem = new \Kendo\UI\BreadcrumbItem();
        $secondItem->type("item")
                    ->href("/index")
                    ->text("Basic Usage")
                    ->showText(true);

        $breadcrumb->addItem($rootItem);
        $breadcrumb->addItem($firstItem);
        $breadcrumb->addItem($secondItem);

**Step 3** Output the Breadcrumb by echoing the result of the `render` method:

       <?= $breadcrumb->render() ?>

## Navigational

The [`navigational`](/api/javascript/ui/breadcrumb/configuration/navigational) configuration determines whether automatic navigation will be enabled. The default value is false. When set to true, the url will be added to the `href` attribute of the Breadcrumb items.

        <?php
            $breadcrumb = new \Kendo\UI\Breadcrumb('breadcrumb');

            $breadcrumb
            ->bindToLocation(true)
            ->navigational(true);

            echo $breadcrumb->render();
        ?>

The [`bindToLocation`](/api/javascript/ui/breadcrumb/configuration/bindtolocation) configuration sets the value ot the widget to the current url ( the location object). In addition, that url will be added to the `href` attribute of the Breadcrumb items through the `navigational` configuration.

## Icons

The Breadcrumb allows to configure the icons of the items and the delimiters.

### Root Icon

The root icon is the first icon and is rendered as a `home` icon. It can be changed through the [`items.icon`](/api/javascript/ui/breadcrumb/configuration/items) configuration. It is also clickable and it will reset the value of the component.

### Item Icon

The icons rendered for each element after the root icon. It is also clickable and can be configured through the [`items.icon`](/api/javascript/ui/breadcrumb/configuration/items).

### Delimiter Icon

The icons that separate the items of the Breadcrumb. 

The example below demonstrates how you can alter the different icons.

        <?php
            $breadcrumb = new \Kendo\UI\Breadcrumb('breadcrumb');

            $rootItem = new \Kendo\UI\BreadcrumbItem();
            $rootItem->type("rootItem")
                ->href("https://demos.telerik.com/php-ui/")
                ->text("All Components")
                ->showText(true)
                ->icon("globe")
                ->showIcon(true);

            $firstItem = new \Kendo\UI\BreadcrumbItem();
            $firstItem->type("item")
                        ->href("/breadcrumb")
                        ->text("Breadcrumb")
                        ->showText(true)
                        ->icon("gear")
                        ->showIcon(true);

            $secondItem = new \Kendo\UI\BreadcrumbItem();
            $secondItem->type("item")
                        ->href("/icons")
                        ->text("Icons")
                        ->icon("cloud")
                        ->showIcon(true)
                        ->showText(true);

            $breadcrumb->addItem($rootItem);
            $breadcrumb->addItem($firstItem);
            $breadcrumb->addItem($secondItem);
            $breadcrumb->delimiterIcon("line");

            echo $breadcrumb->render();
     ?>

## Editing

You can edit the path set through the Breadcrumb widget if the [`editable`](/api/javascript/ui/breadcrumb/configuration/editable) configuration is enabled. When you click in an empty area of the component or on the current page, the Breadcrumb will enter into editing mode. That will also happen when you `enter` press if the Breadcrumb is focused.

Editing mode shows an input field containing the current value of the widget. Users are allowed to type a new path.

The below example demonstrates how to enable editing of the Breadcrumb.

        <?php
            $breadcrumb = new \Kendo\UI\Breadcrumb('breadcrumb');

            $rootItem = new \Kendo\UI\BreadcrumbItem();
            $rootItem->type("rootItem")
                ->href("https://demos.telerik.com/php-ui/")
                ->text("All Components")
                ->showText(true)
                ->icon("home")
                ->showIcon(true);

            $firstItem = new \Kendo\UI\BreadcrumbItem();
            $firstItem->type("item")
                        ->href("/breadcrumb")
                        ->text("Breadcrumb")
                        ->showText(true);

            $secondItem = new \Kendo\UI\BreadcrumbItem();
            $secondItem->type("item")
                        ->href("/editing")
                        ->text("Editing")
                        ->icon("edit")
                        ->showIcon(true)
                        ->showText(true);

            $breadcrumb->addItem($rootItem);
            $breadcrumb->addItem($firstItem);
            $breadcrumb->addItem($secondItem);
            $breadcrumb->editable("true");

            echo $breadcrumb->render();
        ?>

## Event Handling

You can subscribe to the [events](/api/javascript/ui/breadcrumb#events) handler name. 

### Specify Function Names

The example below demonstrates how to subscribe for events by specifying a JavaScript function name.

        <?php
            $breadcrumb = new \Kendo\UI\Breadcrumb('breadcrumb');

            $rootItem = new \Kendo\UI\BreadcrumbItem();
            $rootItem->type("rootItem")
                ->href("https://demos.telerik.com/php-ui/")
                ->text("All Components")
                ->showText(true)
                ->icon("home")
                ->showIcon(true);

            $firstItem = new \Kendo\UI\BreadcrumbItem();
            $firstItem->type("item")
                        ->href("/breadcrumb")
                        ->text("Breadcrumb")
                        ->showText(true);

            $secondItem = new \Kendo\UI\BreadcrumbItem();
            $secondItem->type("item")
                        ->href("/events")
                        ->text("Events")
                        ->showText(true);

            $breadcrumb->addItem($rootItem);
            $breadcrumb->addItem($firstItem);
            $breadcrumb->addItem($secondItem);
            $breadcrumb->editable("true");
            $breadcrumb->click("onClick");
            $breadcrumb->change("onChange");

            echo $breadcrumb->render();
        ?>

        <script>
            function onClick(e) {
                kendoConsole.log("Clicked. :: target: " + e.item.text + ". Type :: " + e.item.type);
            }

            function onChange(e) {
                kendoConsole.log("Changed. New Value :: " + e.value);
            }
        </script>


## Reference

### Client-Side Instances

To reference to an existing Breadcrumb instance, use the [`jQuery.data()`](https://api.jquery.com/jQuery.data/) method. Once a reference is established, use the [API](/api/javascript/ui/Breadcrumb) to control its behavior.

The following example demonstrates how to access an existing BottomNavigation instance.

        $breadcrumb = new \Kendo\UI\Breadcrumb('breadcrumb');

        <script>
            $(function() {
                // The constructor parameter is used as the 'id' HTML attribute of the Breadcrumb
                var breadcrumb = $("#breadcrumb").data("kendoBreadcrumb");
            });
        </script>

## See Also

* [Telerik UI for PHP API Reference Folder](/api/php/Kendo/UI/Breadcrumb)