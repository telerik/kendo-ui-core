---
title: Items
page_title: jQuery DropDownButton Documentation - Items
description: "Get started with the jQuery DropDownButton by Kendo UI and use the items options it provides."
slug: items_kendoui_dropdownbutton_widget
position: 2
---

# Items

The Kendo UI DropDownButton provides a various set of options for its [items](/api/javascript/ui/dropdownbutton/configuration/items).

The following example demonstrates how to configure the DropDownButton items:

```dojo
    <button id="dropDownButton"></button>

    <script>
        $(document).ready(function () {

            $("#dropDownButton").kendoDropDownButton({                  
                icon: "clipboard",
                items: [
                    { id: "keep-text", text: "Keep Text Only", icon: "clipboard-text" },
                    { id: "paste-html", text: "Paste as HTML", imageUrl: "paste-as-html", hidden:true },
                    { id: "paste-markdown", text: "Paste Markdown", icon: "clipboard-markdown", enabled:false },
                    { id: "favourite", text: "Mark As Favourite", imageUrl: '../content/shared/icons/16/star.png', attributes: { "data-context": "some arbitrary data" } },
                    { id: "telerik", text: "Go to DropDownButton Demos", url: "https://demos.telerik.com/kendo-ui/dropdownbutton/items"  }
                ]
            });
        });
    </script>
```

## See Also

* [Items of the DropDownButton (Demo)](https://demos.telerik.com/kendo-ui/dropdownbutton/items)
* [JavaScript API Reference of the DropDownButton](/api/javascript/ui/dropdownbutton)
