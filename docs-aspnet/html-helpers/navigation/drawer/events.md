---
title: Events
page_title: Events
description: "Learn how to handle the events of the Telerik UI Drawer component for {{ site.framework }}."
slug: events_drawer
position: 7
---

# Events

The Drawer for {{ site.framework }} exposes the `Show`, `Hide`, and `ItemClick` events that you can handle to customize the functions of the component.

For a complete example on basic Drawer events, refer to the [demo on using the events of the Drawer](https://demos.telerik.com/{{ site.platform }}/drawer/events). More details about the Drawer events are available in the [Drawer API](https://docs.telerik.com/aspnet-core/api/Kendo.Mvc.UI.Fluent/DrawerEventBuilder).

The next example shows how to use the `ItemClick()` event to display the content in the selected Drawer item. To hide the content for the items that aren't currently selected, you will apply the `hidden` CSS style.

```HtmlHelper
    @using Kendo.Mvc.UI

    @(Html.Kendo().Drawer()
        .Name("drawer")
        .Mini(true)
        .Mode("push")
        .AutoCollapse(false)
        .Template(@"
            <ul>
                <li data-role='drawer-item' class='k-selected'><span class='k-icon k-i-inbox'></span><span class='k-item-text' data-id='Inbox'>Inbox</span></li>
                <li data-role='drawer-separator'></li>
                <li data-role='drawer-item'><span class='k-icon k-i-notification k-i-bell'></span><span class='k-item-text' data-id='Notifications'>Notifications</span></li>
                <li data-role='drawer-item'><span class='k-icon k-i-calendar'></span><span class='k-item-text' data-id='Calendar'>Calendar</span></li>
                <li data-role='drawer-separator'></li>
                <li data-role='drawer-item'><span class='k-icon k-i-star-outline k-i-bookmark-outline'></span><span class='k-item-text' data-id='Favorites'>Favorites</span></li>
                <li data-role='drawer-separator'></li>
            </ul>
        ")
        .Content(@"
            <div id='drawer-content'>
                <div id='Inbox' >
                    <p>You're all caught up.</p>
                </div>
                <div id='Notifications' class='hidden'>
                    <p>You don't have any notifications.</p>
                </div>
                <div id='Calendar' class='hidden'>
                    <p>Nothing scheduled for today.</p>
                </div>

                <div id='Favorites' class='hidden'>
                    <p>Your favorites will appear here.</p>                    
                </div>
            </div>
        ")
        .Events(x => x.ItemClick("onItemClick")))

    <script>
        function onItemClick(e) {
            if(!e.item.hasClass("k-drawer-separator")){
                e.sender.drawerContainer.find("#drawer-content > div").addClass("hidden");
                e.sender.drawerContainer.find("#drawer-content").find("#" + e.item.find(".k-item-text").attr("data-id")).removeClass("hidden");
            }
        }
    </script>

    <style>
        .hidden {
            display: none;
        }
    </style>

```
{% if site.core %}
```TagHelper
    @addTagHelper *, Kendo.Mvc

    <script id="template" type="text/x-kendo-template">
        <ul>
            <li data-role='drawer-item' class='k-selected'><span class='k-icon k-i-inbox'></span><span class='k-item-text' data-id='Inbox'>Inbox</span></li>
            <li data-role='drawer-separator'></li>
            <li data-role='drawer-item'><span class='k-icon k-i-notification k-i-bell'></span><span class='k-item-text' data-id='Notifications'>Notifications</span></li>
            <li data-role='drawer-item'><span class='k-icon k-i-calendar'></span><span class='k-item-text' data-id='Calendar'>Calendar</span></li>
            <li data-role='drawer-separator'></li>
            <li data-role='drawer-item'><span class='k-icon k-i-star-outline k-i-bookmark-outline'></span><span class='k-item-text' data-id='Favourites'>Favourites</span></li>
            <li data-role='drawer-separator'></li>
        </ul>
    </script>

    <kendo-drawer name="drawer"
                template-id="template" 
                mode="push" 
                auto-collapse="false" 
                on-item-click="onItemClick">
                <mini enabled="true"/>

                <content>
                    <div id='drawer-content'>
                        <div id='Inbox'>
                            <p>You're all caught up.</p>
                        </div>
                        <div id='Notifications' class='hidden'>
                            <p>You don't have any notifications.</p>
                        </div>
                        <div id='Calendar' class='hidden'>
                            <p>Nothing scheduled for today.</p>
                        </div>
    
                        <div id='Favorites' class='hidden'>
                            <p>Your favorites will appear here.</p> 
                        </div>
                    </div>
                </content>
    </kendo-drawer>

    <script>
        function onItemClick(e) {
            if(!e.item.hasClass("k-drawer-separator")){
                e.sender.drawerContainer.find("#drawer-content > div").addClass("hidden");
                e.sender.drawerContainer.find("#drawer-content").find("#" + e.item.find(".k-item-text").attr("data-id")).removeClass("hidden");
            }
        }
    </script>

    <style>
        .hidden {
            display: none;
        }
    </style>
```
{% endif %}

## Next Steps

* [Using the Drawer Events (Demo)](https://demos.telerik.com/{{ site.platform }}/drawer/events)

## See Also

* [Using the API of the Drawer for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/drawer/api)
* [Drawer Server-Side API](/api/drawer)
* [Drawer Client-Side API](https://docs.telerik.com/kendo-ui/api/javascript/ui/drawer)
