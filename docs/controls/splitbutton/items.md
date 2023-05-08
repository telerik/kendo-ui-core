---
title: Items
page_title: jQuery SplitButton Documentation - Items
description: "Get started with the jQuery SplitButton by Kendo UI and use the items options it provides."
slug: items_kendoui_splitbutton_widget
position: 2
---

# Items

The Kendo UI SplitButton provides a various set of options for its [items](/api/javascript/ui/splitbutton/configuration/items).

The following example demonstrates how to configure the SplitButton items:

```dojo
    <button id="splitButton"></button>

    <script>
        $(document).ready(function () {

            $("#splitButton").kendoSplitButton({                  
                icon: "clipboard",
                items: [
                    { id: "keep-text", text: "Keep Text Only", icon: "clipboard-text" },
                    { id: "paste-html", text: "Paste as HTML", imageUrl: "paste-as-html", hidden:true },
                    { id: "paste-markdown", text: "Paste Markdown", icon: "clipboard-markdown", enabled:false },
                    { id: "favourite", text: "Mark As Favourite", imageUrl: '../content/shared/icons/16/star.png', attributes: { "data-context": "some arbitrary data" } },
                    { id: "telerik", text: "Go to SplitButton Demos", url: "https://demos.telerik.com/kendo-ui/splitbutton/items"  }
                ]
            });
        });
    </script>
```

## See Also

* [Items of the SplitButton (Demo)](https://demos.telerik.com/kendo-ui/splitbutton/items)
* [JavaScript API Reference of the SplitButton](/api/javascript/ui/splitbutton)
