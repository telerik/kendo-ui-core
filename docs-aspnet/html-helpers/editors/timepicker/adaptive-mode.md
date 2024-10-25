---
title: Adaptive Mode
page_title: Adaptive Mode
description: "Learn how to configure adaptive mode of the the Telerik UI TimePicker component for {{ site.framework }}."
slug: htmlhelpers_timepicker_adaptive_mode_aspnetcore
position: 5
---

# Adaptive Mode

The Telerik UI for {{ site.framework }} TimePicker supports an adaptive mode that provides a mobile-friendly rendering of its popup. Which will accommodate its content based on the current screen size.

To set the adaptive mode, use the `AdaptiveMode()` option.

```HtmlHelper
     @(Html.Kendo().TimePicker()
		 .Name("timepicker")
         .AdaptiveMode(AdaptiveMode.Auto)
     )
```
{% if site.core %}
```TagHelper
     <kendo-timepicker name="timepicker"
                       adaptive-mode="AdaptiveMode.Auto">
     </kendo-timepicker>
```
{% endif %}

## See Also

* [Server-Side API](https://docs.telerik.com/{{ site.platform }}/api/timepicker)