---
title: Overview
page_title: Overview
description: "Learn the basics when working with the Telerik UI Stepper HtmlHelper for {{ site.framework }}."
slug: htmlhelpers_stepper_aspnetcore_overview
position: 1
---

# Stepper HtmlHelper Overview

The Telerik UI Stepper HtmlHelper for {{ site.framework }} is a server-side wrapper for the Kendo UI Stepper widget.

The Stepper is an intuitive UI component that visualizes progress by displaying a sequence of logical steps. The Stepper widget could also be used for navigational purposes.

* [Demo page for the Stepper](https://demos.telerik.com/{{ site.platform }}/stepper/index)

## Initializing the Stepper

The following example demonstrates how to define the Stepper by using the Stepper HtmlHelper.

```Razor
    @(Html.Kendo().Stepper()
        .Name("stepper")
    )
```

## Basic Configuration

The following example demonstrates the basic configuration for the Stepper HtmlHelper.

```Razor
    @(Html.Kendo().Stepper()
        .Name("stepper")
        .Steps(s =>
        {
            s.Add().Label("First Step");
            s.Add().Label("Second Step").Selected(true);
            s.Add().Label("Last Step").Icon("save");
        })
    )

    <script>
    $(function() {
        // The Name() of the Stepper is used to get its client-side instance.
        var stepper = $("#stepper").data("kendoStepper");
    });
    </script>
```

## Functionality and Features

* [Icons]({% slug htmlhelpers_stepper_aspnetcore_icons %})
* [Steps]({% slug htmlhelpers_stepper_aspnetcore_steps %})
* [Appearance]({% slug htmlhelpers_stepper_aspnetcore_appearance %})
* [Operation modes]({% slug htmlhelpers_stepper_aspnetcore_operation_modes %})
* [Accessibility]({% slug accessibility_aspnetcore_stepper %})

## See Also

* [Basic Usage of the Stepper HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/stepper/index)
* [Using the API of the Stepper HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/stepper/api)
