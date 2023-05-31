---
title: Adaptive Mode
page_title: Adaptive Mode
description: "Learn how to configure adaptive mode of the the Telerik UI DateTimePicker component for {{ site.framework }}."
slug: htmlhelpers_datetimepicker_adaptive_mode_aspnetcore
position: 5
---

# Adaptive Mode

The Telerik UI for {{ site.framework }} DateTimePicker supports an adaptive mode that provides a mobile-friendly rendering of its popup. Which will accommodate its content based on the current screen size.

To set the adaptive mode, use the `AdaptiveMode()` option.

```HtmlHelper
    @(Html.Kendo().DateTimePicker()
       .Name("dateTimePicker")
       .AdaptiveMode(AdaptiveMode.Auto)
    )
```
{% if site.core %}
```TagHelper
    <kendo-datetimepicker name="dateTimePicker" adaptive-mode="AdaptiveMode.Auto">
    </kendo-datetimepicker>
```
{% endif %}

## See Also

* [Server-Side API](https://docs.telerik.com/{{ site.platform }}/api/datetimepicker)