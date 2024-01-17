---
title: Overview
page_title: Overview
description: "Learn more about the Telerik UI Responsive Panel component for {{ site.framework }}, and use it in your project."
previous_url: /helpers/html-helpers/responsivepanel, /helpers/navigation/responsivepanel/overview
slug: htmlhelpers_responsivepanel_aspnetcore
position: 0
---

# {{ site.framework }} Responsive Panel Overview

{% if site.core %}
The Telerik UI Responsive Panel TagHelper and HtmlHelper for {{ site.framework }} are server-side wrappers for the Kendo UI Responsive Panel widget.
{% else %}
The Telerik UI Responsive Panel HtmlHelper for {{ site.framework }} is a server-side wrapper for the Kendo UI Responsive Panel widget.
{% endif %}

The Responsive Panel allows you to hide part of a page content on small screens. The component collapses a content element when a specified `breakpoint` is reached. The collapsed content is then expanded by a button with the `k-rpanel-toggle` class. To set the placement of the expandable content, use the `Orientation` option.

* [Demo page for the Responsive Panel HtmlHelper](https://demos.telerik.com/{{ site.platform }}/responsive-panel/index)
{% if site.core %}
* [Demo page for the Responsive Panel TagHelper](https://demos.telerik.com/aspnet-core/responsive-panel/tag-helper)
{% endif %}

## Initializing the Responsive Panel

The following example demonstrates how to define the Responsive Panel.

```HtmlHelper
    @(Html.Kendo().ResponsivePanel()
        .Name("sidebar")
        .Breakpoint(1000)
        .Content("<p>This content will collapse if the width is less than 1000px</p>")
    )
```
{% if site.core %}
```TagHelper
    <kendo-responsivepanel name="sidebar" breakpoint="1000">
        <p>This content will collapse if the width is less than 1000px</p>
    </kendo-responsivepanel>
```
{% endif %}

## Basic Configuration

The following example demonstrates a basic configuration of the Responsive Panel.

```HtmlHelper
    <div class="dash-head">
        <!-- toggle button for responsive panel, hidden on large screens -->
        <button class="k-rpanel-toggle"><span class="k-icon k-i-menu"></span></button>
    </div>
    <!-- responsive panel, collapsed on small screens -->
    @(Html.Kendo().ResponsivePanel()
        .Name("sidebar")
        .Breakpoint(1000)
        .Orientation(ResponsivePanelOrientation.Left)
        .Content("<div> <div id='profile' class='widget'> <h3>Profile</h3> <div> <div class='profile-photo'>" +
        " </div> <h4>Lynda Schleifer</h4> <p>Sales Associate</p> </div> </div> <div id='teammates' class='widget'> <h3>Teammates</h3>" +
        " <div> <div class='team-mate'> <img src='./shared/web/panelbar/andrew.jpg' alt='Andrew Fuller'> <h4>Andrew Fuller</h4> <p>Team Lead</p> </div> " +
        " <div class='team-mate'> <img src='./shared/web/panelbar/nancy.jpg' alt='Nancy Leverling'> <h4>Nancy Leverling</h4> <p>Sales Associate</p></div>" +
        " <div class='team-mate'> <img src='./shared/web/panelbar/robert.jpg' alt='Robert King'> <h4>Robert King</h4> <p>Business System Analyst</p> </div> </div> </div>")
    )
```
{% if site.core %}
```TagHelper
        <div class="dash-head">
            <!-- toggle button for responsive panel, hidden on large screens -->
            <button class="k-rpanel-toggle"><span class="k-icon k-i-menu"></span></button>
        </div>
        <!-- responsive panel, collapsed on small screens -->
        <kendo-responsivepanel name="slidebar" breakpoint="1000" orientation="left">
            <div id="profile" class="widget">
                <h3>Profile</h3>
                <div>
                    <div class="profile-photo"></div>
                    <h4>Lynda Schleifer</h4>
                    <p>Sales Associate</p>
                </div>
            </div>
            <div id="teammates" class="widget">
                <h3>Teammates</h3>
                <div>
                    <div class="team-mate">
                        <img src="@Url.Content("~/content/web/panelbar/andrew.jpg")" alt="Andrew Fuller">
                        <h4>Andrew Fuller</h4>
                        <p>Team Lead</p>
                    </div>
                    <div class="team-mate">
                        <img src="@Url.Content("~/content/web/panelbar/nancy.jpg")" alt="Nancy Leverling">
                        <h4>Nancy Leverling</h4>
                        <p>Sales Associate</p>
                    </div>
                    <div class="team-mate">
                        <img src="@Url.Content("~/content/web/panelbar/robert.jpg")" alt="Robert King">
                        <h4>Robert King</h4>
                        <p>Business System Analyst</p>
                    </div>
                </div>
            </div>
        </kendo-responsivepanel>
```
{% endif %}

> The Telerik UI Responsive Panel component accepts any HTML that is passed in the `Content` option. For more advanced scenarios, pass custom HTML of your choice.  

## Next Steps

* [Getting Started with the Responsive Panel]({% slug responsive_panel_getting_started %})
* [Basic Usage of the Responsive Panel HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/responsive-panel)
{% if site.core %}
* [Basic Usage of the Responsive Panel TagHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/responsive-panel/tag-helper)
{% endif %}

## See Also

* [Server-Side API of the Responsive Panel](/api/responsivepanel)
{% if site.core %}
* [Server-Side API of the Responsive Panel TagHelper](/api/taghelpers/responsivepanel)
{% endif %}
* [Knowledge Base Section](/knowledge-base)