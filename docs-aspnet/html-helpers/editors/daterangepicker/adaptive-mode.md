---
title: Adaptive Mode
page_title: Adaptive Mode
description: "Learn how to configure adaptive mode of the the Telerik UI DateRangePicker component for {{ site.framework }}."
slug: htmlhelpers_daterangepicker_adaptive_mode_aspnetcore
position: 5
---

# Adaptive Mode

The Telerik UI for {{ site.framework }} DateRangePicker supports an adaptive mode that provides a mobile-friendly rendering of its popup. Which will accommodate its content based on the current screen size.

To set the adaptive mode, use the `AdaptiveMode()` option.

```HtmlHelper
    @(Html.Kendo().DateRangePicker()
        .Name("daterangepicker") 
        .AdaptiveMode(AdaptiveMode.Auto)
        .Range(r => r.Start(DateTime.Now).End(DateTime.Now.AddDays(10)))
    )
```
{% if site.core %}
```TagHelper
     <kendo-daterangepicker name="daterangepicker" adaptive-mode="AdaptiveMode.Auto">
             <range start="DateTime.Now" end="DateTime.Now.AddDays(10)"/>
     </kendo-daterangepicker>
```
{% endif %}

## See Also

* [Server-Side API](https://docs.telerik.com/{{ site.platform }}/api/daterangepicker)