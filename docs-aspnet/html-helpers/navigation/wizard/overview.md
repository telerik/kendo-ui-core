---
title: Overview
page_title: Overview
description: "Learn the basics when working with the Telerik UI Wizard HtmlHelper for {{ site.framework }}."
slug: htmlhelpers_wizard_aspnetcore_overview
position: 1
---

# Wizard HtmlHelper Overview

The Telerik UI Wizard HtmlHelper for {{ site.framework }} is a server-side wrapper for the Kendo UI Wizard widget.

The Wizard displays content in sequential, stepwise order. Each step of the Kendo UI Wizard has content, which can be a form or any other type of HTML content.

* [Demo page for the Wizard](https://demos.telerik.com/{{ site.platform }}/wizard/index)

## Initializing the Wizard

The following example demonstrates how to define the Wizard by using the Wizard HtmlHelper.

```Razor
    @(Html.Kendo().Wizard()
        .Name("wizard")
        .Steps(s=> {
            s.Add().Content("Initial Step");
            s.Add().Content("Second Step");
            s.Add().Content("Final Step");
        })
    )

    <script>
    $(function() {
        // The Name() of the Wizard is used to get its client-side instance.
        var wizard = $("#wizard").data("kendoWizard");
    });
    </script>
```

## Functionality and Features

* [Form Integration]({% slug htmlhelpers_wizard_aspnetcore_form_integration %})
* [Content]({% slug htmlhelpers_wizard_aspnetcore_content %})
* [Layout]({% slug htmlhelpers_wizard_aspnetcore_layout %})
* [Accessibility]({% slug accessibility_aspnetcore_wizard %})

## See Also

* [Basic Usage of the Wizard HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/wizard/index)
