---
title: Overview
page_title: Overview 
description: "Get started with the BottomNavigation JSP tag in Kendo UI."
slug: overview_bottomnavigation_uiforjsp
position: 1
---

# BottomNavigation JSP Tag Overview

The BottomNavigation JSP tag is a server-side wrapper for the [Kendo UI BottomNavigation](/api/javascript/ui/bottomnavigation) widget.

## Getting Started

### Configuration

The BottomNavigation provides a set of default API configuration options that can be set during its initialization. Follow the steps below to configure the Kendo UI BottomNavigation for JSP:

**Step 1** Make sure you followed all the steps in the [introductory article on Telerik UI for JSP]({% slug overview_uiforjsp %}).

**Step 2** Create a new action method to render the view:

        @RequestMapping(value = {"index"}, method = RequestMethod.GET)
        public String index() {

            return "web/bottomnavigation/index";
        }

**Step 3** Add the Kendo UI `taglib` mapping to the page:

        <%@taglib prefix="kendo" uri="https://www.telerik.com/kendo-ui/jsp/tags"%>

**Step 4** Add the `bottomNavigation` tag and configure the component:

        <kendo:bottomNavigation name="bottomNavigation" positionMode="absolute">
	            <kendo:bottomNavigation-items>
	            	<kendo:bottomNavigation-item text="Inbox"  icon="email" data="<%=inboxData %>" selected="true" template='<span class="k-bottom-nav-item-icon k-icon k-i-email"></span><span class="k-bottom-nav-item-text">Inbox</span><span id="badgeInbox" style="top: 2px; left: 55px"></span>'></kendo:bottomNavigation-item>
	            	<kendo:bottomNavigation-item text="Calendar"  icon="calendar-date" data="<%=calendarData %>"></kendo:bottomNavigation-item>
	            	<kendo:bottomNavigation-item text="Profile"  icon="user" data="<%=profileData %>"></kendo:bottomNavigation-item>
	           	</kendo:bottomNavigation-items>
        </kendo:bottomNavigation>

## Items

The Kendo UI BottomNavigation's items configuration allows setting various properties. For the full set, refer to the [API reference](api/javascript/ui/bottomnavigation/configuration/items). 

> **Note:** When the `items.url` configuration is set, the items will be rendered as `<a>` tags. Otherwise, they will be rendered as `<span>` tags.

        <kendo:bottomNavigation name="bottomNavigation" positionMode="absolute">
	            <kendo:bottomNavigation-items>
	            	<kendo:bottomNavigation-item text="Inbox" url="#inbox" icon="email" data="<%=inboxData %>" selected="true" template='<span class="k-bottom-nav-item-icon k-icon k-i-email"></span><span class="k-bottom-nav-item-text">Inbox</span><span id="badgeInbox" style="top: 2px; left: 55px"></span>'></kendo:bottomNavigation-item>
	            	<kendo:bottomNavigation-item text="Calendar" url="#calendar" enabled="false" icon="calendar-date" data="<%=calendarData %>"></kendo:bottomNavigation-item>
	            	<kendo:bottomNavigation-item text="Profile" icon="user" data="<%=profileData %>"></kendo:bottomNavigation-item>
	           	</kendo:bottomNavigation-items>
        </kendo:bottomNavigation>

## Appearance

The Kendo UI BottomNavigation for JSP allows you to alter the appearance of the component by setting the `itemFlow`, `themeColor`, `shadow` `border` and `fill`. 

        <kendo:bottomNavigation name="bottomNavigation" positionMode="absolute" itemFlow="horizontal" themeColor="secondary" border="false" shadow="true" fill="solid">
	            <kendo:bottomNavigation-items>
	            	<kendo:bottomNavigation-item text="Inbox"  icon="email" data="<%=inboxData %>" selected="true" template='<span class="k-bottom-nav-item-icon k-icon k-i-email"></span><span class="k-bottom-nav-item-text">Inbox</span><span id="badgeInbox" style="top: 2px; left: 55px"></span>'></kendo:bottomNavigation-item>
	            	<kendo:bottomNavigation-item text="Calendar" icon="calendar-date" data="<%=calendarData %>"></kendo:bottomNavigation-item>
	            	<kendo:bottomNavigation-item text="Profile" icon="user" data="<%=profileData %>"></kendo:bottomNavigation-item>
	           	</kendo:bottomNavigation-items>
        </kendo:bottomNavigation>

## Event Handling

### Subscribe to Events

You can subscribe to the [events exposed by Kendo UI BottomNavigation](/api/javascript/ui/bottomnavigation#events) by the handler name.

    <kendo:bottomNavigation name="bottomNavigation" positionMode="absolute" select="onSelect">
            <kendo:bottomNavigation-items>
                <kendo:bottomNavigation-item text="Inbox"  icon="email" data="<%=inboxData %>" selected="true"></kendo:bottomNavigation-item>
                <kendo:bottomNavigation-item text="Calendar"  icon="calendar-date" data="<%=calendarData %>"></kendo:bottomNavigation-item>
                <kendo:bottomNavigation-item text="Profile"  icon="user" data="<%=profileData %>"></kendo:bottomNavigation-item>
            </kendo:bottomNavigation-items>
    </kendo:bottomNavigation>
    <script>
	    function onSelect(e) {
	       // handle the BottomNavigation select event
	    }
      
    </script>
## Reference

### Existing Instances

You are able to reference an existing BottomNavigation instance via the [`jQuery.data()`](https://api.jquery.com/jQuery.data/). Once a reference is established, you are able to use the [BottomNavigation API](/api/javascript/ui/bottomnavigation#methods) to control its behavior.

    <kendo:bottomNavigation name="bottomNavigation" positionMode="absolute" select="onSelect">
            <kendo:bottomNavigation-items>
                <kendo:bottomNavigation-item text="Inbox"  icon="email" data="<%=inboxData %>" selected="true"></kendo:bottomNavigation-item>
                <kendo:bottomNavigation-item text="Calendar"  icon="calendar-date" data="<%=calendarData %>"></kendo:bottomNavigation-item>
                <kendo:bottomNavigation-item text="Profile"  icon="user" data="<%=profileData %>">
            </kendo:bottomNavigation-item>
    </kendo:bottomNavigation-items>
    
    // Put this after your Kendo BottomNavigation tag declaration
    <script>
    $(function() {
        // Notice that the Name() of the BottomNavigation is used to get its client-side instance
        var bottomNavigation = $("#bottomNavigation").data("kendoBottomNavigation");
    });
    </script>

## See Also

* [Telerik UI for JSP API Reference Folder](/api/jsp/bottomnavigation)
