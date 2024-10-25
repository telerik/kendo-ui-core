---
title: Overview
page_title: Overview - Menu JSP Tag
description: "Get started with the Menu JSP tag in Kendo UI."
slug: overview_menu_uiforjsp
position: 1
---

# Menu JSP Tag Overview

The Menu JSP tag is a server-side wrapper for the [Kendo UI Menu](/api/javascript/ui/menu) widget.

## Getting Started

### Configuration

Below are listed the steps for you to follow when configuring the Kendo UI AutoComplete for binding to data, passed as a model attribute in Spring MVC.

**Step 1** Make sure you followed all the steps from the [introductory article on Telerik UI for JSP]({% slug overview_uiforjsp %}).

**Step 2** Create a new action method which renders the view.



        @RequestMapping(value = {"index"}, method = RequestMethod.GET)
        public String index() {

            return "web/menu/index";
        }

**Step 3** Add the Kendo UI `taglib` mapping to the page.



        <%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>

**Step 4** Add the `menu` tag.



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

## Event Handling

### Specify Function Names

You can subscribe to all [events exposed by Kendo UI Menu](/api/javascript/ui/menu#events) by the handler name.



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


### Attach to select Events of Single Menu Items

The following example demonstrates how to subscribe to the `select` event of a single Menu item.



        <kendo:menu name="menu">
            <kendo:menu-items>
                <kendo:menu-item text="item 1" select="alert('select');">
                </kendo:menu-item>
            </kendo:menu-items>
        </kendo:menu>


## Reference

### Existing Instances

You are able to reference an existing Menu instance via the [`jQuery.data()`](https://api.jquery.com/jQuery.data/). Once a reference is established, you are able to use the [Menu API](/api/javascript/ui/menu#methods) to control its behavior.



        //Put this after your Kendo Menu tag declaration
        <script>
        $(function() {
            // Notice that the Name() of the menu is used to get its client-side instance
            var menu = $("#menu").data("kendoMenu");
        });
        </script>

## See Also

* [Overview of the Kendo UI Menu Widget]({% slug overview_kendoui_menu_widget %})
* [Telerik UI for JSP API Reference Folder](/api/jsp/autocomplete/animation)
* [Telerik UI for JSP Tags Folder]({% slug overview_autocomplete_uiforjsp %})
