---
title: Overview
page_title: Overview
description: "Learn the basics when working with the Telerik UI DockManager component for {{ site.framework }}."
slug: overview_dockmanagerhelper_aspnetcore
position: 0
---

# {{ site.framework }} DockManager Overview

{% if site.core %}
The Telerik UI DockManager TagHelper and HtmlHelper for {{ site.framework }} are server-side wrappers for the Kendo UI DockManager widget.
{% else %}
The Telerik UI DockManager HtmlHelper for {{ site.framework }} is a server-side wrapper for the Kendo UI DockManager widget.
{% endif %}

The DockManager is a UI component that replicates the docks, along with their behaviors. It gives you the ability to have full control over the layout of your application through panes. This allows end users to alter the existing layout by pinning, resizing and moving panes.

* [Demo page for the DockManager HtmlHelper](https://demos.telerik.com/{{ site.platform }}/dockmanager/index)

## Initializing the DockManager

The following example demonstrates how to define the DockManager.

```HtmlHelper
    @(Html.Kendo().DockManager()
        .Name("dockmanager")
        .RootPane(root =>
        {
            root.Id("root")
            .Panes(panes  => {
                panes.Add().Type(PaneType.Split).Panes(top => {
                     top.Add().Id("tools")
                        .Type(PaneType.Content)
                        .Title("Tools")
                        .Content("Content");
                });
            });
        })
    )
```

{% if site.core %}
```TagHelper
  <kendo-dockmanager name="dockmanager">
    <root-pane id="root" type="RootPaneType.Split">
        <panes>
            <pane id="nested" type="PaneType.Split">
                <panes>
                    <pane id="tools" type="PaneType.Content" title="Tools" content="Tools Content"></pane>
                </panes>
            </pane>
        </panes>
    </root-pane>
  </kendo-dockmanager>
```
{% endif %}

## Basic Configuration

The DockManager provides a variety of options for configuring the pane hierarchy. The following example shows how to configure the panes.

> It is mandatory to define a root pane that will contain all other panes.

```HtmlHelper
    @(Html.Kendo().DockManager()
        .Name("dockmanager")
        .RootPane(root =>
        {
            root.Id("root")
            .Type(RootPaneType.Split)
            .Orientation(DockSplitterOrientation.Vertical)
            .Panes(panes  => {
                panes.Add().Type(PaneType.Split).Size("80%").Orientation(DockSplitterOrientation.Horizontal).Panes(top => {
                    top.Add().Id("tools").Type(PaneType.Content).Title("Tools").Content("Content").Size("20%");
                    top.Add().Id("files").Type(PaneType.Tab).Size("40%").Panes(tabs =>
                    {
                        tabs.Add().Id("file1").Type(PaneType.Content).Title("File 1").Content("File 1");
                        tabs.Add().Id("file2").Type(PaneType.Content).Title("File 2").Content("File 2");
                        tabs.Add().Id("file3").Type(PaneType.Content).Title("File 3").Unpinnable(u=>u.Unpinned(true)).Content("File 3");
                    });
                });
            });
        })
    )
```
{% if site.core %}
```TagHelper
   @addTagHelper *, Kendo.Mvc

  <kendo-dockmanager name="dockmanager">
    <root-pane id="root" type="RootPaneType.Split" orientation="DockSplitterOrientation.Vertical">
        <panes>
            <pane id="nested" type="PaneType.Split" size="80%" orientation="DockSplitterOrientation.Vertical">
                <panes>
                    <pane id="tools" type="PaneType.Content" size="20%" title="Tools" content="Tools Content"></pane>
                    <pane id="files" type="PaneType.Tab" size="40%" title="Tools">
                        <panes>
                            <pane id="file1" 
                                  type="PaneType.Content" 
                                  title="File 1"
                                  content="File 1">
                            </pane>
                            <pane id="file2" 
                                  type="PaneType.Content" 
                                  title="File 2"
                                  content="File 2">
                            </pane>
                            <pane id="file3"
                                  type="PaneType.Content"
                                  title="File 3"
                                  content="File 3">
                            </pane>
                        </panes>
                    </pane>
                </panes>
            </pane>
        </panes>
    </root-pane>
  </kendo-dockmanager>
```
{% endif %}

## Using a Template

You can set the DockManager pane content through the `Content()`, `ContentHandler()` and `ContentTemplate()` methods. The `ContentTemplate()` method allos you to use the [`Template` component]({% slug htmlhelpers_overview_template %}) to define the content of the pane.

```HtmlHelper
    @(Html.Kendo().DockManager()
        .Name("dockmanager")
        .RootPane(root =>
        {
            root.Id("root")
                .Type(RootPaneType.Split)
                .Orientation(DockSplitterOrientation.Vertical)
                .Panes(panes  => {
                    panes.Add().Type(PaneType.Split).Size("80%").Orientation(DockSplitterOrientation.   Horizontal).Panes(top => {
                        top.Add().Id("tools")
                           .Type(PaneType.Content)
                           .Title("Tools")
                           .ContentTemplate(Html.Kendo().Template()
                               .AddHtml("<div id='tools-content'>Some Content")
                               .AddComponent(btn => btn.Button().Name("toolBtn").Content("Tools"))
                               .AddHtml("</div>")
                           )
                           .Size("20%");
                    });
                });
        })
    )
```
{% if site.core %}
```TagHelper
    <kendo-dockmanager name="dockmanager">
        <root-pane id="root" type="RootPaneType.Split" orientation="DockSplitterOrientation.Vertical">
            <panes>
                <pane id="nested" type="PaneType.Split" size="80%" orientation="DockSplitterOrientation.    Vertical">
                    <panes>
                        <pane id="tools" type="PaneType.Content" size="20%" title="Tools">
                            <pane-template>
                                <div id="tools-content">
                                    <kendo-button name="tools-btn">
                                        Tools
                                    </kendo-button>
                                </div>
                            </pane-template>
                        </pane>
                    </panes>
                </pane>
            </panes>
        </root-pane>
    </kendo-dockmanager>
```
{% endif %}

## Functionality and Features

* [Docking Panes]({% slug dock_types_dockmanager_aspnetcore %})&mdash;You can dock panes globally or within other inner panes.
* [Pane Types]({% slug pane_types_dockmanager_aspnetcore %})&mdash;Use different pane types depending on the hierarchical structure you want to achieve.
* [Events](% slug events_dockmanager_aspnetcore%)&mdash;You can explicitly handle a variety of event in order to manipulate the component.

## Next Steps

* [Basic Usage of the DockManager HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/dockmanager/index)

## See Also

* [Using the API of the DockManager HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/dockmanager/api)
* [Server-Side API](/api/dockmanager)
* [Knowledge Base Section](/knowledge-base)
