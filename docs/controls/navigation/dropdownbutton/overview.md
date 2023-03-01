---
title: Overview
page_title: jQuery DropDownButton Documentation - Overview
description: "Get started with the jQuery DropDownButton by Kendo UI and learn how to initialize it and what its key features are."
slug: overview_kendoui_dropdownbutton_widget
position: 1
---

# {{ site.product }} DropDownButton Overview

The Kendo UI for jQuery DropDownButton widget combines a button with a drop-down element. It allows users to click the primary button and open the drop-down popup to choose from a list of additional actions.

* [Demo page for the DropDownButton](https://demos.telerik.com/kendo-ui/dropdownbutton/index) 

## Initializing the DropDownButton

The following example demonstrates how to initialize the DropDownButton from a `<button>` element.

```dojo
    <button id="dropDownButton"></button>

    <script>
        $(document).ready(function () {

            $("#dropDownButton").kendoDropDownButton({                  
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

* [Items]({% slug items_kendoui_dropdownbutton_widget %})
* [Appearance]({% slug appearance_kendoui_dropdownbutton_widget %})
* [Icons]({% slug icons_kendoui_dropdownbutton_widget %})
* [Accessibility]({% slug accessibility_kendoui_dropdownbutton_widget %})

## See Also

* [Overview of the DropDownButton (Demo)](https://demos.telerik.com/kendo-ui/dropdownbutton/index)
* [Using the Basic Events of the DropDownButton (Demo)](https://demos.telerik.com/kendo-ui/dropdownbutton/events)
* [Binding the DropDownButton over MVVM (Demo)](https://demos.telerik.com/kendo-ui/dropdownbutton/mvvm)
* [Applying the DropDownButton API (Demo)](https://demos.telerik.com/kendo-ui/dropdownbutton/api)
* [JavaScript API Reference of the DropDownButton](/api/javascript/ui/dropdownbutton)
