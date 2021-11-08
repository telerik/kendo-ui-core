---
title: Overview
page_title: Overview
description: "Learn more about the Telerik UI Responsive Panel HtmlHelper for {{ site.framework }}, and use it in your next project."
previous_url: /helpers/html-helpers/responsivepanel, /helpers/navigation/responsivepanel/overview
slug: htmlhelpers_responsivepanel_aspnetcore
position: 1
---

# ResponsivePanel HtmlHelper Overview

The Telerik UI Responsive Panel HtmlHelper for {{ site.framework }} is a server-side wrapper for the Kendo UI Responsive Panel widget.

The Responsive Panel allows you to hide part of a page content on small screens. The Component collapses a content element when a `breakpoint` is reached. The collapsed content is then expanded by a button with the `k-rpanel-toggle` class. To set the placement of the expandable content, use the `orientation` option.


* [Demo page for the Responsive Panel](https://demos.telerik.com/{{ site.platform }}/responsivepanel/index)

## Initializing the Responsive Panel

The following example demonstrates how to define the Responsive Panel.

    @(Html.Kendo().ResponsivePanel()
        .Name("sidebar")
        .Breakpoint(1000)
        .Content("<p>This content will collapse if the width is less than 1000px</p>")
    )

## Basic Configuration

The following example demonstrates the basic configuration of the Responsive Panel HtmlHelper.

```Razor
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

> The Telerik UI ResponsivePanel accepts any HTML that is passed in the `Content` option. For more advanced scenarios, pass custom HTML of your choice.  

## See Also

* [ResponsivePanel Client-Side API](https://docs.telerik.com/kendo-ui/api/javascript/ui/responsivepanel)


