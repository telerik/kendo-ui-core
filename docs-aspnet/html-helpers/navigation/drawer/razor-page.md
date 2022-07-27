---
title:  Razor Pages
page_title: Configure a Telerik UI Drawer in Razor Pages.
description: "An example on how to configure a Drawer in Razor Pages."
slug: htmlhelpers_drawer_razorpage_aspnetcore
position: 5
---

# Razor Page

This article demonstrates how to set up the Drawer component in a Razor Pages scenario.

See the implementation details in the example below and for the full project with Razor Pages examples, visit our [GitHub repository](https://github.com/telerik/ui-for-aspnet-core-examples/tree/master/Telerik.Examples.RazorPages).

```tab-HtmlHelper(csthml)
@page
@model Telerik.Examples.RazorPages.Pages.Drawer.DrawerIndexModel
@{
    ViewData["Title"] = "DrawerIndex";
}


@(Html.Kendo().ToolBar()
                .Name("ToolBar")
                .Items(items =>
                {
                    items.Add().Type(CommandType.Button).Icon("menu").Click("toggleDrawer").HtmlAttributes(new { @class = "k-flat" });
                    items.Add().Template("<h3 style='margin-left: 20px;'>Mail Box</h3>");
                })
)
@(Html.Kendo().Drawer()
                .Name("drawer")
                .Template(@"
    <ul>
        <li data-role='drawer-item' class='k-selected'><span class='k-icon k-i-inbox'></span><span class='k-item-text' data-id='Inbox'>Inbox</span></li>
        <li data-role='drawer-separator'></li>
        <li data-role='drawer-item'><span class='k-icon k-i-notification k-i-bell'></span><span class='k-item-text' data-id='Notifications'>Notifications</span></li>
        <li data-role='drawer-item'><span class='k-icon k-i-calendar'></span><span class='k-item-text' data-id='Calendar'>Calendar</span></li>
        <li data-role='drawer-item'><span class='k-icon k-i-hyperlink-email'></span><span class='k-item-text' data-id='Attachments'>Attachments</span></li>
        <li data-role='drawer-separator'></li>
        <li data-role='drawer-item'><span class='k-icon k-i-star-outline k-i-bookmark-outline'></span><span class='k-item-text' data-id='Favourites'>Favourites</span></li>
    </ul>
")
        .Mode("push")
        .Mini(true)
        .Position("left")
        .MinHeight(330)
        .SwipeToOpen(true)
        .Content(@"
    <div id='drawer-content'>
        <div id='Inbox'>
            <ul class='inboxList'>
                <li>
                    <h6>Monday meeting</h6>
                    <p>Hi Tom, Since Monday I'll be out of office, I'm rescheduling the meeting for Tuesday.</p>
                </li>
                <li>
                    <h6>I'm sorry, Tom</h6>
                    <p>Hi Tom, my aunt comes for a visit this Saturday, so I can't come back to St. Pete...</p>
                </li>
            </ul>
        </div>
        <div id='Notifications' class='hidden'>
            <ul>
                <li>Monday meeting</li>
                <li>Regarding org chart changes</li>
                <li>Meeting with Cliff</li>
                <li>Global Marketing Meeting</li>
                <li>Out tonight with collegues?</li>
            </ul>
        </div>
        <div id='Calendar' class='hidden'>
            <ul>
                <li>
                    <h6>11/5 Monday</h6>
                    <p>Martha Birthday</p>
                </li>
                <li>
                    <h6>15/6 Sunday</h6>
                    <p>Job interview for internal position</p>
                </li>
            </ul>
        </div>
        <div id='Attachments' class='hidden'>
            <ul>
                <li>Build enterprise apps</li>
                <li>Fw: Regarding Multiline textbox</li>
                <li>Away next week</li>
                <li>Fw: Your Costume is ready</li>
                <li>Update completed</li>
            </ul>
        </div>
        <div id='Favourites' class='hidden'>
            <ul>
                <li>90% Discount!</li>
                <li>90% Discount!</li>
                <li>One time offer!</li>
            </ul>
        </div>
    </div>
")
.Events(x => x.ItemClick("onItemClick")))

<script>
    function onItemClick(e) {
        if (!e.item.hasClass("k-drawer-separator")) {
            e.sender.drawerContainer.find("#drawer-content > div").addClass("hidden");
            e.sender.drawerContainer.find("#drawer-content").find("#" + e.item.find(".k-item-text").attr("data-id")).removeClass("hidden");
        }
    }
    function toggleDrawer() {
        var drawerInstance = $("#drawer").data().kendoDrawer;
        var drawerContainer = drawerInstance.drawerContainer;
        if (drawerContainer.hasClass("k-drawer-expanded")) {
            drawerInstance.hide();
        } else {
            drawerInstance.show();
        }
    }
</script>

<style>
    #drawer-content li {
        font-size: 1.2em;
        padding-left: .89em;
        background: 0 0;
        border-radius: 0;
        border-width: 0 0 1px;
        border-color: rgba(33, 37, 41, 0.125);
        border-style: solid;
        line-height: 1.5em;
        padding: 1.09em .84em 1.23em .84em;
    }
    #drawer-content li:last-child {
        border: 0;
    }
    .hidden {
        display: none;
    }
    .k-toolbar .k-icon {
        font-size: 18px;
    }
</style>
```
{% if site.core %}
```TagHelper
        @(Html.Kendo().ToolBar()
                        .Name("ToolBar")
                        .Items(items =>
                        {
                            items.Add().Type(CommandType.Button).Icon("menu").Click("toggleDrawer").HtmlAttributes(new { @class = "k-flat" });
                            items.Add().Template("<h3 style='margin-left: 20px;'>Mail Box</h3>");
                        })
        )
        <kendo-drawer name="drawer"
                      template="drawer-template"
                      mode="push"
                      navigatable="true"
                      position="left"
                      min-height="330"
                      swipe-to-open="true"
                      on-item-click="onItemClick">
            <mini enabled="true"/>
            <content>
                <div id='drawer-content'>
                    <div id='Inbox'>
                        <ul class='inboxList'>
                            <li>
                                <h6>Monday meeting</h6>
                                <p>Hi Tom, Since Monday I'll be out of office, I'm rescheduling the meeting for Tuesday.</p>
                            </li>
                            <li>
                                <h6>I'm sorry, Tom</h6>
                                <p>Hi Tom, my aunt comes for a visit this Saturday, so I can't come back to St. Pete...</p>
                            </li>
                        </ul>
                    </div>
                    <div id='Notifications' class='hidden'>
                        <ul>
                            <li>Monday meeting</li>
                            <li>Regarding org chart changes</li>
                            <li>Meeting with Cliff</li>
                            <li>Global Marketing Meeting</li>
                            <li>Out tonight with collegues?</li>
                        </ul>
                    </div>
                    <div id='Calendar' class='hidden'>
                        <ul>
                            <li>
                                <h6>11/5 Monday</h6>
                                <p>Martha Birthday</p>
                            </li>
                            <li>
                                <h6>15/6 Sunday</h6>
                                <p>Job interview for internal position</p>
                            </li>
                        </ul>
                    </div>
                    <div id='Attachments' class='hidden'>
                        <ul>
                            <li>Build enterprise apps</li>
                            <li>Fw: Regarding Multiline textbox</li>
                            <li>Away next week</li>
                            <li>Fw: Your Costume is ready</li>
                            <li>Update completed</li>
                        </ul>
                    </div>
                    <div id='Favourites' class='hidden'>
                        <ul>
                            <li>90% Discount!</li>
                            <li>90% Discount!</li>
                            <li>One time offer!</li>
                        </ul>
                    </div>
                </div>
            </content>
        </kendo-drawer>
        <script id="drawer-template" type="text/x-kendo-template">
            <ul>
              <li data-role='drawer-item'><span class='k-icon k-i-information'></span><span class='k-item-text' data-id='GettingStarted'>Getting Started</span><span class='k-spacer'></span><span class='k-icon k-i-arrow-chevron-right'></span></li>
              <li data-role='drawer-separator'></li>
              <li data-role='drawer-item' class='hidden'><span class='k-icon k-i-none'></span><span class='k-icon k-i-question'></span><span class='k-item-text' data-id='Kendo'>About Kendo UI</span></li>
              <li data-role='drawer-item' class='hidden'><span class='k-icon k-i-none'></span><span class='k-icon k-i-palette'></span><span class='k-item-text' data-id='ThemeSupport'>Supported Themes</span></li>
              <li data-role='drawer-separator'></li>
              <li data-role='drawer-item' class='k-selected'><span class='k-icon k-i-zoom'></span><span class='k-item-text' data-id='Overview'>Overview</span><span class='k-spacer'></span><span class='k-icon k-i-arrow-chevron-down'></li>
              <li data-role='drawer-item'><span class='k-icon k-i-none'></span><span class='k-icon k-i-js'></span><span class='k-item-text' data-id='About'>About Kendo</span></li>
              <li data-role='drawer-item'><span class='k-icon k-i-none'></span><span class='k-icon k-i-style-builder'></span><span class='k-item-text' data-id='All'>All Kendo Components</span></li>
              <li data-role='drawer-separator'></li>
              <li data-role='drawer-item'><span class='k-icon k-i-star'></span><span class='k-item-text' data-id='Popular'>Most popular components</span></li>
            </ul>
        </script>
    </div>

    @section scripts {
        <script>
            $(document).on("kendoReady", function () {
                $(document).on("keydown.examples", function (e) {
                    if (e.altKey && e.keyCode === 87) {
                        $("#drawer").data("kendoDrawer").element.focus();
                    }
                });
            });
            function onItemClick(e) {
                if (!e.item.hasClass("k-drawer-separator")) {
                    e.sender.drawerContainer.find("#drawer-content > div").addClass("hidden");
                    e.sender.drawerContainer.find("#drawer-content").find("#" + e.item.find(".k-item-text").text()).removeClass("hidden");
                }
            }
            function toggleDrawer() {
                var drawerInstance = $("#drawer").data().kendoDrawer;
                var drawerContainer = drawerInstance.drawerContainer;
                if (drawerContainer.hasClass("k-drawer-expanded")) {
                    drawerInstance.hide();
                } else {
                    drawerInstance.show();
                }
            }
        </script>
    }

    <style>
        #drawer-content li {
            font-size: 1.2em;
            padding-left: .89em;
            background: 0 0;
            border-radius: 0;
            border-width: 0 0 1px;
            border-color: rgba(33, 37, 41, 0.125);
            border-style: solid;
            line-height: 1.5em;
            padding: 1.09em .84em 1.23em .84em;
        }
            #drawer-content li:last-child {
                border: 0;
            }
        .hidden {
            display: none;
        }
        #example .demo-section {
            max-width: 640px;
        }
        .k-toolbar .k-icon {
            font-size: 18px;
        }
    </style>
```
{% endif %}

```tab-PageModel(cshtml.cs)
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace Telerik.Examples.RazorPages.Pages.Drawer
{
    public class DrawerIndexModel : PageModel
    {
        public void OnGet()
        {
        }
    }
}
```

* [Server-Side API](/api/drawer)
