---
title: Adaptive Mode
page_title: Adaptive Mode
description: "Learn how to configure adaptive mode of the the Telerik UI TimeDurationPicker component for {{ site.framework }}."
slug: htmlhelpers_timedurationpicker_adaptive_mode_aspnetcore
position: 5
---

# Adaptive Mode

The Telerik UI for {{ site.framework }} TimeDurationPicker supports an adaptive mode that provides a mobile-friendly rendering of its popup. Which will accommodate its content based on the current screen size.

To set the adaptive mode, use the `AdaptiveMode()` option.

```HtmlHelper
     @(Html.Kendo().TimeDurationPicker()
		 .Name("timeDurationPicker")
         .AdaptiveMode(AdaptiveMode.Auto)
     )
```
{% if site.core %}
```TagHelper
     <kendo-timedurationpicker name="timeDurationPicker"
                               adaptive-mode="AdaptiveMode.Auto">
     </kendo-timedurationpicker>
```
{% endif %}

## See Also

* [Server-Side API](https://docs.telerik.com/{{ site.platform }}/api/timedurationpicker)