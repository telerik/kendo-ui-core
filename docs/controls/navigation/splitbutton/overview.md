---
title: Overview
page_title: jQuery SplitButton Documentation - Overview
description: "Get started with the jQuery SplitButton by Kendo UI and learn how to initialize it and what its key features are."
slug: overview_kendoui_splitbutton_widget
position: 1
---

# {{ site.product }} SplitButton Overview

The Kendo UI for jQuery SplitButton widget combines the functionality of a button with that of a dropdown element. It allows users to either click on the primary button and run its default behavior, or to open the drop-down popup and choose from a list of additional actions.

* [Demo page for the SplitButton](https://demos.telerik.com/kendo-ui/splitbutton/index) 

## Initializing the SplitButton

The following example demonstrates how to initialize the SplitButton from a `<button>` element.

```dojo
    <button id="splitButton"></button>

    <script>
        $(document).ready(function () {

            $("#splitButton").kendoSplitButton({                  
                icon: "clipboard",
                items: [
                    { id: "keep-text", text: "Keep Text Only", icon: "clipboard-text" },
                    { id: "paste-html", text: "Paste as HTML", icon: "clipboard-code" },
                    { id: "paste-markdown", text: "Paste Markdown", icon: "clipboard-markdown" },
                    { id: "paste-default", text: "Set Default Paste"  }
                ]
            });
        });
    </script>
```

## Functionality and Features

* [Items]({% slug items_kendoui_splitbutton_widget %})
* [Appearance]({% slug appearance_kendoui_splitbutton_widget %})
* [Icons]({% slug icons_kendoui_splitbutton_widget %})
* [Accessibility]({% slug accessibility_kendoui_splitbutton_widget %})

## See Also

* [Overview of the SplitButton (Demo)](https://demos.telerik.com/kendo-ui/splitbutton/index)
* [Using the Basic Events of the SplitButton (Demo)](https://demos.telerik.com/kendo-ui/splitbutton/events)
* [Binding the SplitButton over MVVM (Demo)](https://demos.telerik.com/kendo-ui/splitbutton/mvvm)
* [Applying the SplitButton API (Demo)](https://demos.telerik.com/kendo-ui/splitbutton/api)
* [JavaScript API Reference of the SplitButton](/api/javascript/ui/splitbutton)
