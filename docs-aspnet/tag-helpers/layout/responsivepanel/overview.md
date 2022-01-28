---
title: Overview
page_title: Overview
description: "Learn more about the Telerik UI Responsive Panel TagHelper for {{ site.framework }}, and use it your next project."
previous_url: /helpers/responsivepanel, /helpers/tag-helpers/responsivepanel
slug: taghelpers_responsivepanel_aspnetcore
position: 1
---

# Responsive Panel TagHelper Overview

The Telerik UI Responsive Panel TagHelper for {{ site.framework }} is a server-side wrapper for the Kendo UI ResponsivePanel widget.

The Responsive Panel allows you to hide part of a page content on small screens. The Component collapses a content element when a `breakpoint` is reached. The collapsed content is then expanded by a button with the `k-rpanel-toggle` class. To set the placement of the expandable content, use the 
`orientation` option.

* [Demo page for the Responsive Panel](https://demos.telerik.com/aspnet-core/responsive-panel/tag-helper)

## Initializing the Responsive Panel

The following example demonstrates how to define the Responsive Panel by using the Responsive Panel TagHelper.

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


## Basic Configuration

The configuration options of the ResponsivePanel TagHelper are passed as attributes of the tag.

```cshtml

        @(Html.Kendo().ResponsivePanel()
            .Name("sidebar")
            .Breakpoint(1000)
            .Orientation("left")
            .Content(@<text>
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
            </text>)
        )
```
```tagHelper
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

## See Also

* [The Responsive Panel Tag Helper for {{ site.framework }} Demo](https://demos.telerik.com/aspnet-core/responsive-panel/tag-helper)
[The Responsive Panel Client-Side API](https://docs.telerik.com/kendo-ui/api/javascript/ui/responsivepanel)
