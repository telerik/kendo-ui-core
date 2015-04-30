---
title: Overview
---

# Menu

The Menu JSP tag is a server-side wrapper for the [Kendo UI Menu](/api/web/menu) widget.

## Getting Started

Here is how to configure a simple Kendo Menu:

1.  Make sure you have followed all the steps from the [Introduction](/jsp/introduction) help topic.

2.  Create a new action method which renders the view:

        @RequestMapping(value = {"index"}, method = RequestMethod.GET)
        public String index() {

            return "web/menu/index";
        }

3. Add kendo taglib mapping to the page

        <%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>

4.  Add a menu tag:

        <kendo:menu name="menu">
            <kendo:menu-items>
                <kendo:menu-item text="Products">
                    <kendo:menu-items>
                        <kendo:menu-item text="Tables & Chairs"></kendo:menu-item>
                        <kendo:menu-item text="Sofas"></kendo:menu-item>
                    </kendo:menu-items>
                </kendo:menu-item>
                <kendo:menu-item text="Stores">
                    <kendo:menu-items>
                        <kendo:menu-item>
                            <kendo:menu-item-content>
                                <h2>Around the Globe</h2>
                                <button class="k-button">See full list</button>
                            </kendo:menu-item-content>
                        </kendo:menu-item>
                    </kendo:menu-items>
                </kendo:menu-item>
                <kendo:menu-item text="Blog"></kendo:menu-item>
                <kendo:menu-item text="News" enabled="false"></kendo:menu-item>
            </kendo:menu-items>
        </kendo:menu>

## Accessing an Existing Menu

You can reference an existing Menu instance via [jQuery.data()](http://api.jquery.com/jQuery.data/).
Once a reference has been established, you can use the [API](/api/web/menu#methods) to control its behavior.

### Accessing an existing Menu instance

    //Put this after your Kendo Menu tag declaration
    <script>
    $(function() {
        // Notice that the Name() of the menu is used to get its client-side instance
        var menu = $("#menu").data("kendoMenu");
    });
    </script>

## Handling Kendo UI Menu events

You can subscribe to all [events](/api/web/menu#events) exposed by Kendo UI Menu:

### Subscribe by handler name

    <kendo:menu name="menu" open="menu_open" close="menu_close">
        <kendo:menu-items>
            <kendo:menu-item text="Blog"></kendo:menu-item>
            <kendo:menu-item text="News" enabled="false"></kendo:menu-item>
        </kendo:menu-items>
    </kendo:menu>

    <script>
        function menu_open() {
            //Handle the open event
        }

        function menu_close() {
            //Handle the close event
        }
    </script>
