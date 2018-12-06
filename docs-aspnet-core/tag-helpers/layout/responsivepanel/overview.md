---
title: Overview
page_title: ResponsivePanel | Telerik UI for ASP.NET Core Tag Helpers
description: "Learn the basics when working with the Knedo UI ResponsivePanel tag helper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
previous_url: /aspnet-core/helpers/responsive-panel, /aspnet-core/helpers/tag-helpers/responsive-panel
slug: taghelpers_responsivepanel_aspnetcore
position: 1
---

# ResponsivePanel Tag Helper Overview

The ResponsivePanel tag helper helps you configure the Kendo UI ResponsivePanel widget in ASP.NET Core applications.

## Basic Usage

The following example demonstrates how to define the ResponsivePanel by using the ResponsivePanel tag helper.

###### Example

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


## Configuration

The configuration options of the ResponsivePanel tag helper are passed as attributes of the tag.

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

* [Overview of Telerik UI for ASP.NET Core]({% slug overview_aspnetmvc6_aspnetmvc %})
* [Get Started with Telerik UI for ASP.NET Core in ASP.NET Core Projects]({% slug gettingstarted_aspnetmvc6_aspnetmvc %})
* [Get Started with Telerik UI for ASP.NET Core in ASP.NET Core Projects with the CLI]({% slug gettingstartedcli_aspnetmvc6_aspnetmvc %})
* [Known Issues with Telerik UI for ASP.NET Core]({% slug knownissues_aspnetmvc6_aspnetmvc %})
