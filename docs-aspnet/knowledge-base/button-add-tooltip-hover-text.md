---
title: Adding Tooltips to Buttons
description: An example on how to set a tooltip for a Button in {{ site.product }}.
type: how-to
page_title: Adding Tooltips to Buttons
slug: button-add-tooltip-hover-text
tags: button, add, tooltip, hover, text
ticketid: 1413806
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Button for Progress® Telerik® {{ site.product_short }}</td>
 </tr>
 <tr>
  <td>Product Version</td>
  <td>2019.2.514</td>
 </tr>
</table>

## Description

How can I add a {{ site.product }}Tooltip to a Button?

## Solution

To associate a tooltip with a Button in {{ site.product }}, follow the approach demonstrated in the [demo on the {{ site.product }} Tooltip](https://demos.telerik.com/{{ site.platform }}/tooltip/index).  

```javascript
    @(Html.Kendo().Button()
        .Name("myButton")
        .Tag("a")
        .Content("My Button")
    )

    @(Html.Kendo().Tooltip()
        .For("#myButton")
        .Position(TooltipPosition.Top)
        .Animation(e => e.Open(o => o.Zoom(ZoomDirection.In).Duration(150)))
        .Width(120)
        .Content("My Tooltip")
    )
```

## More {{ site.framework }} Button Resources

* [{{ site.framework }} Button Documentation]({%slug htmlhelpers_button_aspnetcore%})

* [{{ site.framework }} Button Demos](https://demos.telerik.com/{{ site.platform }}/button/index)

{% if site.core %}
* [{{ site.framework }} Button Product Page](https://www.telerik.com/aspnet-core-ui/button)

* [Telerik UI for {{ site.framework }} Video Onboarding Course (Free for trial users and license holders)]({%slug virtualclass_uiforcore%})

* [Telerik UI for {{ site.framework }} Forums](https://www.telerik.com/forums/aspnet-core-ui)

{% else %}
* [{{ site.framework }} Button Product Page](https://www.telerik.com/aspnet-mvc/button)

* [Telerik UI for {{ site.framework }} Video Onboarding Course (Free for trial users and license holders)]({%slug virtualclass_uiformvc%})

* [Telerik UI for {{ site.framework }} Forums](https://www.telerik.com/forums/aspnet-mvc)
{% endif %}

## See Also

* [Client-Side API Reference of the Button for {{ site.framework }}](https://docs.telerik.com/kendo-ui/api/javascript/ui/button)
* [Server-Side API Reference of the Button for {{ site.framework }}](https://docs.telerik.com/{{ site.platform }}/api/button)
* [Telerik UI for {{ site.framework }} Breaking Changes]({%slug breakingchanges_2023%})
* [Telerik UI for {{ site.framework }} Knowledge Base](https://docs.telerik.com/{{ site.platform }}/knowledge-base)
