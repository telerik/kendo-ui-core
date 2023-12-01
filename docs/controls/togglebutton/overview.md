---
title: Overview
page_title: Overview
description: "Discover the Kendo UI ToggleButton component for jQuery that provides features like Badges, Icons, and numerous built-in configuration options."
slug: overview_kendoui_togglebutton
position: 0
---

# {{ site.framework }} ToggleButton Overview


The Kendo UI for jQuery ToggleButton provides a styled clickable UI functionality with arbitrary content. Apart from consistent Kendo UI for jQuery styling, the ToggleButton enables you to indicate whether it is active or inactive, as well as group related options between various ToggleButton components. 

* [Demo page for the ToggleButton HtmlHelper](https://demos.telerik.com/kendo-ui/togglebutton/index)

## Initializing the ToggleButton

The following example demonstrates how to define the ToggleButton.

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

## Functionality and Features

* [Group ToggleButton]({% slug group_kendoui_togglebutton %})&mdash;You can group the ToggleButton together.
* [Icon ToggleButton]({% slug icons_kendoui_togglebutton %})&mdash;The variety of icons allow you to enhance the appearance of the ToggleButton. 
* [Badge ToggleButton]({% slug badges_kendoui_togglebutton %})&mdash;You can add a Badge to the ToggleButton to conveniently show its status, a notification, or a short message.
* [Events]({% slug events_kendoui_togglebutton %})&mdash;The ToggleButton allows you to handle its toggle event and implement custom functionality.

## Next Steps

* [Basic Usage of the ToggleButton HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/kendo-ui/togglebutton/index)

## See Also

* [Using the API of the Kendo UI ToggleButton for jQuery (Demo)](https://demos.telerik.com/kendo-ui/togglebutton/api)
* [Knowledge Base Section](/knowledge-base)