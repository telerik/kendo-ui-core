---
title: Pane Types
page_title: Pane Types
description: "Learn how to configure different pane types for the Telerik UI DockManager component for {{ site.framework }}"
slug: pane_types_dockmanager_aspnetcore
position: 1
---

## Pane Types

The Telerik UI for {{ site.framework }} DockManager component exposes the ability to configure different pane types. The following types are as follows.

* `Tab`&mdash;panes of tab type will group panes in a tab strip way, similar to the `TabStrip` component, users can navigate through panes via tabs in the header.
* `Split`&mdash; with split panes, you are able to group panes in a Splitter fashion, by splitting the container pane either `horizontally` or `vertically`.
* `Content`&mdash; with content panes, you have full control on explicitly specifying arbitrary content that will be rendered for a given pane as per your requirements.

> The root pane can either be of type `Split` or `Tab`.

The following example illustrates configure the pane types.

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


## See Also

* [Server-Side API](/api/dockmanager)
