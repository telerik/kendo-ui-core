---
title: Expand Modes
page_title: Expand Modes
description: "Use the single or multiple expand mode in the Telerik UI PanelBar HtmlHelper for {{ site.framework }}."
previous_url: /helpers/navigation/panelbar/expand-modes
slug: htmlhelpers_panelbar_expandmodes_aspnetcore
position: 2
---

# Expand Modes

The PanelBar supports a single and a multiple expand mode.

* If `ExpandMode` is set to `Single`, the user can expand only a single root item or a single child item of a specific parent item. Expanding another root item or another child of the parent of the currently expanded item will collapse the currently expanded item. This approach is also the only way to collapse an expanded item in the single expand mode.
* If `ExpandMode` is set to `Multiple`, the user can expand multiple root items or children of the same parent item at a time. Expanding an item does not collapse the currently expanded items. Expanded items can be collapsed by clicking on them.

```Razor
    @(Html.Kendo().PanelBar()
        .Name("panelbar")
        .ExpandMode(PanelBarExpandMode.Single)
        .Items(items =>
        {
            items.Add().Text("Root1")
                .Items(subitems =>
                {
                    subitems.Add().Text("Level2 1");
                    subitems.Add().Text("Level2 2");
                });
            items.Add().Text("Root2")
                .Items(subitems =>
                {
                    subitems.Add().Text("Level2 1");
                    subitems.Add().Text("Level2 2");
                });
        })
    )
```

## See Also

* [Basic Usage of the PanelBar HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/panelbar)
* [PanelBar Server-Side API](/api/panelbar)
