---
title: Dock Types
page_title: Dock Types
description: "Learn the specifics of the Telerik UI DockManager component for {{ site.framework }} Dock Types."
components: ["dockmanager"]
slug: dock_types_dockmanager_aspnetcore
position: 1
---

# Docking Panes

The Telerik UI for {{ site.framework }} DockManager component exposes the ability to dock panes globally or within other panes.  

## Dock Types

The following dock types are supported:

- Global Docking
- Inner Docking

### Global Docking

When the user drags a pane a global docking navigator is always shown. The user has the option to dock the dragged pane to one of the component's edges, thus the dragged pane will become one of the root panes.

### Inner Docking

When the user drags a pane and hovers over another pane a dock navigator for the pane is shown. The user can choose to drop a pane on any of the parent's outer edges splitting the parent pane, or dropping it in the middle of the navigator to as a tab of the parent pane.

## Control the Docking Behavior

You can explicitly configure the docking behavior for a desired pane by using the `Dockable()` configuration method. The following example illustrates how to alter the behavior of the docking panes.

```HtmlHelper
    @(Html.Kendo().DockManager()
        .Name("dockmanager")
        .RootPane(root =>
        {
            root.Id("root")
            .Type(RootPaneType.Split)
            .Orientation(DockSplitterOrientation.Vertical)
            .Panes(panes  => {
                panes.Add().Type(PaneType.Split).Panes(top => {
                    top.Add().Id("tools")
                       .Type(PaneType.Content)
                       .Title("Tools")
                       .Dockable(dockable => dockable.InnerDock(false))
                       .Content("Content");

                    top.Add().Id("files")
                        .Type(PaneType.Tab)
                        .Dockable(dockable => dockable.Dock(false))
                        .Panes(tabs =>
                        {
                            tabs.Add().Id("file1").Type(PaneType.Content).Title("File 1").Content("File 1");
                            tabs.Add().Id("file2").Type(PaneType.Content).Title("File 2").Content("File 2");
                            tabs.Add().Id("file3").Type(PaneType.Content).Title("File 3").Unpinnable(u=>u.Unpinned(true)).  Content("File 3");
                        });
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
            <pane id="nested" type="PaneType.Split">
                <dockable inner-dock="false" />
                <panes>
                    <pane id="tools" type="PaneType.Content" title="Tools" content="Tools Content"></pane>
                    <pane id="files" type="PaneType.Tab" title="Tools">
                        <dockable dock="false" />
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


## See Also

* [Server-Side API](/api/dockmanager)









