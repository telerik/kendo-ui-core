---
title: Overview
page_title: jQuery ButtonGroup Documentation | ButtonGroup Overview
description: "Get started with the jQuery ButtonGroup by Kendo UI, initialize single or multiple buttons, and reference existing Button instances."
slug: overview_kendoui_buttongroup_widget
position: 1
---

# ButtonGroup Overview

The ButtonGroup groups a series of buttons together on a single line.

* [Demo page for the ButtonGroup](https://demos.telerik.com/kendo-ui/buttongroup/index)

## Initializing the ButtonGroup

You can initialize the ButtonGroup from HTML markup or from a JSON `data` object.

### From HTML

The following example demonstrates how to initialize Kendo UI ButtonGroup from HTML markup.

    <ul id="buttongroup">
        <li>Option 1</li>
        <li>Option 2</li>
        <li>Option 3</li>
      </ul>

    <script>
		$("#buttongroup").kendoButtonGroup();
    </script>

### From JSON

The following example demonstrates how to initialize Kendo UI ButtonGroup from a JSON `data` object.

    <div id="buttongroup"></div>

    <script>
		$("#buttongroup").kendoButtonGroup({
            items: [
                { text: "Option1" },
                { text: "Option2" },
                { text: "Option3" }
            ]
        });
    </script>

## Functionality and Features

* [Disabled ButtonGroup]({% slug disabled_kendoui_buttongroup %})
* [Icon ButtonGroup]({% slug icon_kendoui_buttongroup %})
* [Index]({% slug index_kendoui_buttongroup %})
* [Badges]({% slug badges_kendoui_buttongroup %})
* [Selection]({% slug selection_kendoui_buttongroup %})
* [Accessibility]({% slug accessibility_buttongroup_jquery %})

## See Also

* [Basic Usage of the ButtonGroup (Demo)](https://demos.telerik.com/kendo-ui/buttongroup/index)
* [Using the API of the ButtonGroup (Demo)](https://demos.telerik.com/kendo-ui/buttongroup/api)
* [JavaScript API Reference of the ButtonGroup](/api/javascript/ui/buttongroup)
