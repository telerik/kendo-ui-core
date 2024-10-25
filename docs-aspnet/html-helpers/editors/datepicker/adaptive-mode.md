---
title: Adaptive Mode
page_title: Adaptive Mode
description: "Learn how to configure adaptive mode of the the Telerik UI DatePicker component for {{ site.framework }}."
slug: htmlhelpers_datepicker_adaptive_mode_aspnetcore
position: 5
---

# Adaptive Mode

The Telerik UI for {{ site.framework }} DatePicker supports an adaptive mode that provides a mobile-friendly rendering of its popup. Which will accommodate its content based on the current screen size.

To set the adaptive mode, use the `AdaptiveMode()` option.

```HtmlHelper
    @(Html.Kendo().DatePicker()
        .Name("datepicker")
        .AdaptiveMode(AdaptiveMode.Auto)
    )
```
{% if site.core %}
```TagHelper
    <kendo-datepicker name="datepicker" adaptive-mode="AdaptiveMode.Auto">
    </kendo-datepicker>
```
{% endif %}

## See Also

* [Server-Side API](https://docs.telerik.com/{{ site.platform }}/api/datepicker)