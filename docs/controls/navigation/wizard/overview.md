---
title: Overview
page_title: jQuery Wizard Documentation | Wizard Overview
description: "Get started with the jQuery Wizard by Kendo UI and learn how to initialize the widget."
slug: overview_wizard_widget
position: 1
---

# Overview

The Wizard displays content in sequential, stepwise order. Each step of the Kendo UI Wizard has content, which can be a form or any other type of HTML content.

* [Demo page for the Wizard](https://demos.telerik.com/kendo-ui/wizard/index)

## Initializing the Wizard

The Wizard can be initialized from a `div` element or a `form` element. The following example demonstrates how to initialize the Wizard from a `<div>` element.

```dojo
    <div id="wizard"></div>

    <script>
        $("#wizard").kendoWizard({
            steps: ["Initial step", "Second step", "Third step"]
        });
    </script>
```

## Functionality and Features

* [Form Integration]({% slug form_integration_wizard_widget  %})
* [Content]({% slug content_wizard_widget  %})
* [Layout]({% slug layout_wizard_widget %})
* [Accessibility]({% slug accessibility_kendoui_wizard_widget %})

## See Also

* [Basic usage of the Wizard](https://demos.telerik.com/kendo-ui/wizard/index)
* [JavaScript API Reference of the Wizard](/api/javascript/ui/wizard)
