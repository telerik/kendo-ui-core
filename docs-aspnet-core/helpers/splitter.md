---
title: Splitter
page_title: Splitter | UI for ASP.NET Core Tag Helpers
description: "Learn the basics when working with the Splitter tag helper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
slug: taghelpers_splitter_aspnetcore
---

# Splitter Tag Helper

The Splitter tag helper helps you configure the Kendo UI Splitter widget in ASP.NET Core applications.

## Basic Usage

The Splitter pane tags do not automatically render `div` elements. Therefore, the container elements have to be explicitly defined and the whole pane content has to be placed inside these parent wrappers in the way demonstrated in the following example. To check the result of the declarative definition, refer to the [live sample on the Splitter Tag Helper](http://demos.telerik.com/aspnet-core/splitter/tag-helper).

The following example demonstrates how to define the Splitter by using the Splitter tag helper.

###### Example

    <kendo-splitter name="vertical" orientation="SplitterOrientation.Vertical">
        <kendo-splitter-pane scrollable="false" collapsible="false">
            <div id="top-pane">
                <kendo-splitter name="horizontal" style="height: 100%; width:100%;" orientation="SplitterOrientation.Horizontal">
                    <kendo-splitter-pane size="220px" collapsible="true">
                        <div id="left-pane">
                            <div class="pane-content">
                                <h3>Inner splitter / left pane</h3>
                                <p>Resizable and collapsible.</p>
                            </div>
                        </div>
                    </kendo-splitter-pane>
                    <kendo-splitter-pane>
                        <div id="center-pane">
                            <div class="pane-content">
                                <h3>Inner splitter / center pane</h3>
                                <p>Resizable only.</p>
                            </div>
                        </div>
                    </kendo-splitter-pane>
                    <kendo-splitter-pane size="220px" collapsible="true">
                        <div id="right-pane">
                            <div class="pane-content">
                                <h3>Inner splitter / right pane</h3>
                                <p>Resizable and collapsible.</p>
                            </div>
                        </div>
                    </kendo-splitter-pane>
                </kendo-splitter>
            </div>
        </kendo-splitter-pane>
        <kendo-splitter-pane size="100px" collapsible="false">
            <div id="middle-pane">
                <div class="pane-content">
                    <h3>Outer splitter / middle pane</h3>
                    <p>Resizable only.</p>
                </div>
            </div>
        </kendo-splitter-pane>
        <kendo-splitter-pane size="100px" collapsible="false" resizable="false">
            <div id="bottom-pane">
                <div class="pane-content">
                    <h3>Outer splitter / bottom pane</h3>
                    <p>Non-resizable and non-collapsible.</p>
                </div>
            </div>
        </kendo-splitter-pane>
    </kendo-splitter>


### Configuration

The Splitter tag helper supports all the configuration options that the HtmlHelper does. They are passed as attributes of the tag.

###### Example

```tab-cshtml

        @(Html.Kendo().Splitter()
            .Name("splitter1")
            .Orientation(SplitterOrientation.Vertical)
            .Panes(p =>
            {
                p.Add()
                .HtmlAttributes(new { id = "top-pane" })
                .Collapsed(false)
                .CollapsedSize("240px")
                .Collapsible(true)
                .LoadContentFrom("optionalUrl")
                .MaxSize("240px")
                .MinSize("240px")
                .Resizable(true)
                .Scrollable(true)
                .Size("240px")
                .Content(@<div class="pane-content">
                    Top Pane Content
                </div>);
            })
        )
```
```tab-tagHelper

        <kendo-splitter name="splitter1" orientation="SplitterOrientation.Vertical">
            <kendo-splitter-pane collapsed="false" collapsed-size="240px" collapsible="true"
                                 content-url="optionalUrl" max-size="240px" min-size="240px"
                                 resizable="true" scrollable="true" size="240px">
                <div id="top-pane">
                    <div class="pane-content">
                        Top Pane Content
                    </div>
                </div>
            </kendo-splitter-pane>
        </kendo-splitter>
```

## See Also

* [Overview of Telerik UI for ASP.NET Core - RC1]({% slug overview_aspnetmvc6_aspnetmvc %})
* [Get Started with Telerik UI for ASP.NET MVC in ASP.NET Core Projects]({% slug gettingstarted_aspnetmvc6_aspnetmvc %})
* [Get Started with Telerik UI for ASP.NET MVC in ASP.NET Core Projects on Linux]({% slug gettingstartedlinux_aspnetmvc6_aspnetmvc %})
* [Known Issues with Telerik UI for ASP.NET Core]({% slug knownissues_aspnetmvc6_aspnetmvc %})
