---
title: Overview
page_title: Overview
description: "Learn the basics when working with the Telerik UI Splitter TagHelper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
previous_url: /helpers/splitter, /helpers/tag-helpers/splitter
slug: taghelpers_splitter_aspnetcore
position: 1
---

# Splitter TagHelper Overview

The Telerik UI Splitter TagHelper for ASP.NET Core is a server-side wrapper for the Kendo UI Splitter widget.

The Splitter provides a dynamic layout of resizable and collapsible panes. It converts the children of an HTML element into an interactive layout by adding resize and collapse handles depending on its configuration. The vertical and horizontal orientation of the Splitter can be combined to build complex layouts.

* [Demo page for the Splitter](https://demos.telerik.com/aspnet-core/splitter/tag-helper)

## Initializing the Splitter

The Splitter pane tags do not automatically render `div` elements. Therefore, the container elements have to be explicitly defined and the whole pane content has to be placed inside these parent wrappers.

> To ensure the tag-naming consistency across the Telerik UI for ASP.NET Core suite, the Kendo UI for jQuery R1 2018 release introduces a change in the tag names of the Splitter. Previously, the tag name of the pane was `<kendo-splitter-pane>` while now, after the release, it is changed to `<pane>`.

The following example demonstrates how to define the Splitter by using the Splitter TagHelper.

    <kendo-splitter name="vertical" orientation="SplitterOrientation.Vertical">
        <pane scrollable="false" collapsible="false">
            <div id="top-pane">
                <kendo-splitter name="horizontal" style="height: 100%; width:100%;" orientation="SplitterOrientation.Horizontal">
                    <pane size="220px" collapsible="true">
                        <div id="left-pane">
                            <div class="pane-content">
                                <h3>Inner splitter / left pane</h3>
                                <p>Resizable and collapsible.</p>
                            </div>
                        </div>
                    </pane>
                    <pane>
                        <div id="center-pane">
                            <div class="pane-content">
                                <h3>Inner splitter / center pane</h3>
                                <p>Resizable only.</p>
                            </div>
                        </div>
                    </pane>
                    <pane size="220px" collapsible="true">
                        <div id="right-pane">
                            <div class="pane-content">
                                <h3>Inner splitter / right pane</h3>
                                <p>Resizable and collapsible.</p>
                            </div>
                        </div>
                    </pane>
                </kendo-splitter>
            </div>
        </pane>
        <pane size="100px" collapsible="false">
            <div id="middle-pane">
                <div class="pane-content">
                    <h3>Outer splitter / middle pane</h3>
                    <p>Resizable only.</p>
                </div>
            </div>
        </pane>
        <pane size="100px" collapsible="false" resizable="false">
            <div id="bottom-pane">
                <div class="pane-content">
                    <h3>Outer splitter / bottom pane</h3>
                    <p>Non-resizable and non-collapsible.</p>
                </div>
            </div>
        </pane>
    </kendo-splitter>

## Basic Configuration

The Splitter TagHelper supports all the configuration options that the HtmlHelper does. They are passed as attributes of the tag.

```cshtml

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
```tagHelper

        <kendo-splitter name="splitter1" orientation="SplitterOrientation.Vertical">
            <pane collapsed="false" collapsed-size="240px" collapsible="true"
                                 content-url="optionalUrl" max-size="240px" min-size="240px"
                                 resizable="true" scrollable="true" size="240px">
                <div id="top-pane">
                    <div class="pane-content">
                        Top Pane Content
                    </div>
                </div>
            </pane>
        </kendo-splitter>
```

## See Also

* [Basic Usage of the Splitter TagHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/splitter/tag-helper)
* [Server-Side API](/api/splitter)
