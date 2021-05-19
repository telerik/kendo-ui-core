---
title: Overview
page_title: Overview
description: "How to configure and use the BottomNavigation PHP class in Kendo UI."
slug: overview_bottomnavigation_uiforphp
---

# BottomNavigation PHP Class Overview

The Kendo UI BottomNavigation for PHP is a server-side wrapper for the [Kendo UI BottomNavigation](https://demos.telerik.com/kendo-ui/bottomnavigation/index) widget.

## Getting Started

### Configuration

The BottomNavigation provides a set of [default API configuration options](/api/php/Kendo/UI/BottomNavigation) that can be set during its initialization. Follow the steps below to configure the Kendo UI BottomNavigation for PHP:

**Step 1** Make sure you followed all the steps in the [introductory article on Telerik UI for PHP]({% slug overview_uiforphp %})&mdash;include the autoloader, JavaScript, and CSS files.

**Step 2** Create a [BottomNavigation](/api/php/Kendo/UI/BottomNavigation):
    
        $bottomNav = new \Kendo\UI\BottomNavigation('bottomNav');

        $inboxItem = new \Kendo\UI\BottomNavigationItem();
        $inboxItem->text("Inbox")
            ->template('<span class="k-bottom-nav-item-icon k-icon k-i-email"></span><span class="k-bottom-nav-item-text">Inbox</span><span id="badgeInbox" style="top:2px; left:55px"></span>')
            ->data(array('view' => 'inbox'))
            ->icon("email")
            ->selected(true);

        $calendarItem = new \Kendo\UI\BottomNavigationItem();
        $calendarItem->text("Calendar")
            ->data(array('view' => 'calendar'))
            ->icon("calendar-date");

        $profileItem = new \Kendo\UI\BottomNavigationItem();
        $profileItem->text("Profile")
            ->data(array('view' => 'profile'))
            ->icon("user");

        $bottomNav->addItem($inboxItem);
        $bottomNav->addItem($calendarItem);
        $bottomNav->addItem($profileItem);
        $bottomNav->positionMode("absolute");


**Step 3** Output the BottomNavigation by echoing the result of the `render` method:

       <?= $BottomNavigation->render() ?>

## Items

The Kendo UI BottomNavigation's items configuration allows setting various properties. For the full set, refer to the [API reference](api/javascript/ui/bottomnavigation/configuration/items). 

> **Note:** When the `items.url` configuration is set, the items will be rendered as `<a>` tags. Otherwise, they will be rendered as `<span>` tags.

        $bottomNav = new \Kendo\UI\BottomNavigation('bottomNav');

        $inboxItem = new \Kendo\UI\BottomNavigationItem();
        $inboxItem->text("Inbox")
            ->template('<span class="k-bottom-nav-item-icon k-icon k-i-email"></span><span class="k-bottom-nav-item-text">Inbox</span><span id="badgeInbox" style="top:2px; left:55px"></span>')
            ->data(array('view' => 'inbox'))
            ->icon("email")
            ->selected(true);

        $calendarItem = new \Kendo\UI\BottomNavigationItem();
        $calendarItem->text("Calendar")
            ->data(array('view' => 'calendar'))
            ->icon("calendar-date")
            ->enabled(false);

        $profileItem = new \Kendo\UI\BottomNavigationItem();
        $profileItem->text("Profile")
            ->data(array('view' => 'profile'))
            ->icon("user");

        $bottomNav->addItem($inboxItem);
        $bottomNav->addItem($calendarItem);
        $bottomNav->addItem($profileItem);
        $bottomNav->positionMode("absolute");

## Appearance

The Kendo UI BottomNavigation for PHP allows you to alter the appearance of the component by setting the `itemFlow`, `themeColor`, `shadow` `border` and `fill`. 

        $bottomNav = new \Kendo\UI\BottomNavigation('bottomNav');

        $inboxItem = new \Kendo\UI\BottomNavigationItem();
        $inboxItem->text("Inbox")           
            ->data(array('view' => 'inbox'))
            ->icon("email")
            ->selected(true);

        $calendarItem = new \Kendo\UI\BottomNavigationItem();
        $calendarItem->text("Calendar")
            ->data(array('view' => 'calendar'))
            ->icon("calendar-date");

        $profileItem = new \Kendo\UI\BottomNavigationItem();
        $profileItem->text("Profile")
            ->data(array('view' => 'profile'))
            ->icon("user");

        $bottomNav->addItem($inboxItem);
        $bottomNav->addItem($calendarItem);
        $bottomNav->addItem($profileItem);
        $bottomNav->positionMode("absolute");
        $bottomNav->itemFlow("horizontal");
        $bottomNav->themeColor("secondary");
        $bottomNav->border("false");
        $bottomNav->fill("solid");
        $bottomNav->shadow("true");

## Event Handling

You can subscribe to the [select](/api/javascript/ui/bottomnavigation/events/select) event by the handler name. 

### Specify Function Names

The example below demonstrates how to subscribe for events by specifying a JavaScript function name.

        $bottomNavigation = new \Kendo\UI\BottomNavigation('bottomNavigation');

        $inboxItem = new \Kendo\UI\BottomNavigationItem();
        $inboxItem->text("Inbox")
            ->data(array('view' => 'inbox'))
            ->icon("email")
            ->selected(true);

        $calendarItem = new \Kendo\UI\BottomNavigationItem();
        $calendarItem->text("Calendar")
            ->data(array('view' => 'calendar'))
            ->icon("calendar-date");

        $profileItem = new \Kendo\UI\BottomNavigationItem();
        $profileItem->text("Profile")
            ->data(array('view' => 'profile'))
            ->icon("user");

        $bottomNavigation->addItem($inboxItem);
        $bottomNavigation->addItem($calendarItem);
        $bottomNavigation->addItem($profileItem);
        $bottomNavigation->positionMode("absolute");
        $bottomNavigation->select("onSelect");
        echo $bottomNavigation->render();

        <script>
            function onSelect(e) {
                //handle select event
            }
        </script>

## Reference

### Client-Side Instances

To reference to an existing BottomNavigation instance, use the [`jQuery.data()`](https://api.jquery.com/jQuery.data/) method. Once a reference is established, use the [API](/api/javascript/ui/BottomNavigation) to control its behavior.

The following example demonstrates how to access an existing BottomNavigation instance.

        $bottomNav = new \Kendo\UI\BottomNavigation('bottomNav');

        <script>
            $(function() {
                // The constructor parameter is used as the 'id' HTML attribute of the BottomNavigation
                var bottomNav = $("#bottomNav").data("kendoBottomNavigation");
            });
        </script>

## See Also

* [Telerik UI for PHP API Reference Folder](/api/php/Kendo/UI/BottomNavigation)
