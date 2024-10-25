---
title: Group
page_title: Group
description: "Discover the Kendo UI for jQuery ToggleButton widget  and learn how to group several ToggleButtons together."
slug: group_kendoui_togglebutton 
position: 3
---

# Group

The Kendo UI for jQuery ToggleButton component exposes the ability to group several instances into one distinguished group. This gives you the advantage of molding several ToggleButton instances and accessing them altogether via the `data-group` attribute, which will be rendered for the elements.

The following example illustrates how to enable the group functionality

```dojo
    <button id="togglebutton">
        Toggle Button
    </button>
    <script>
        $(document).ready(function(){
            $("#togglebutton").kendoToggleButton({
                group: "volumes"
            })
        })
    </script>
```

## See Also

* [ToggleButton API Kendo UI for jQuery (Demo)](https://demos.telerik.com/kendo-ui/togglebutton/api)
* [JavaScript API Reference of the ToggleButton HtmlHelper for {{ site.framework }}](https://docs.telerik.com/kendo-ui/api/javascript/ui/togglebutton)