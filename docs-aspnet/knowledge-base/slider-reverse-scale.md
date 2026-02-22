---
title: Reversing the Slider Labels to be Displayed from Maximum to Minimum
description: An example on how to reverse the scale of the Slider for {{ site.framework }}.
type: how-to
page_title: Reversing the Slider Labels to be Displayed from Maximum to Minimum
slug: slider-reverse-scale
tags: slider, reverse, scale, decrement, steps
ticketid: 1672392
res_type: kb
components: ["general"]
component: slider
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>{{ site.product }} Slider</td>
 </tr>
 <tr>
  <td>Product Version</td>
  <td>2024.4.1112</td>
 </tr>
</table>

## Description

By design, the Slider values are positioned from the minimum value to the maximum value (left to right).
How can I reverse the minimum and maximum values of the Slider so the maximum value is displayed on the left and the minimum on the right?

## Solution

1. Set the `Min()` option to **-10** and the `Max()` value to **-1**.
1. Set the initial value to **-10**.
1. Update the default Tooltip template to show the absolute value (for example, **10** instead of **-10**).
1. Update the Slider labels to show the absolute values when the page with the Slider is loaded.

```HtmlHelper
    @(Html.Kendo().Slider()
        .Name("reversedSlider")
        .Min(-10)
        .Max(-1)
        .LargeStep(1)
        .Value(-10)
        .Tooltip(x => x.Template("#= Math.abs(value)#"))
    )
```
{% if site.core %}
```TagHelper
    @addTagHelper *, Kendo.Mvc

    <kendo-slider name="reversedSlider"
        large-step="1"
        max="-1"
        min="-10"
        value="-10">
        <slider-tooltip template="#= Math.abs(value)#"/>
    </kendo-slider>
```
{% endif %}
```JS scripts
    <script>
        $(document).ready(function(){
            var list = $('.k-slider ul.k-slider-items');
            var listItems = list.children('li'); // Select the Slider label element.
            $.each(listItems, function(){ // Loop through them.
                let title = parseInt($(this).attr("title")); // Get the respective value.
                let updatedTitle = Math.abs(title); // Get its absolute value.
                $(this).attr("title", updatedTitle); // Update the "title" attribute.
                $(this).find(".k-label").text(updatedTitle); // Update the label text.
            });
        });
    </script>
```

When you need to get the Slider's value, use its absolute value:

```JS scripts
    <script>
        var slider = $("#reversedSlider").data("kendoSlider");
        var sliderValue = Math.abs(slider.value());
    </script>
```

{% if site.core %}
For a runnable example based on the code above, refer to the following REPL samples:

* [Sample code with the Slider HtmlHelper](https://netcorerepl.telerik.com/mePcYfPK06mnizlY50)
* [Sample code with the Slider TagHelper](https://netcorerepl.telerik.com/GIbQOzPU0819vLLs50)
{% else %}
For a runnable example based on the code above, refer to the [REPL example on displaying the Slider scale from maximum to minimum](https://netcorerepl.telerik.com/mePcYfPK06mnizlY50).
{% endif %}

## More {{ site.framework }} Slider Resources

* [{{ site.framework }} Slider Documentation]({%slug overview_sliderhelper_aspnetcore%})

* [{{ site.framework }} Slider Demos](https://demos.telerik.com/{{ site.platform }}/slider)

{% if site.core %}
* [{{ site.framework }} Slider Product Page](https://www.telerik.com/aspnet-core-ui/slider)

* [Telerik UI for {{ site.framework }} Video Onboarding Course (Free for trial users and license holders)]({%slug virtualclass_uiforcore%})

* [Telerik UI for {{ site.framework }} Forums](https://www.telerik.com/forums/aspnet-core-ui)

{% else %}
* [{{ site.framework }} Slider Product Page](https://www.telerik.com/aspnet-mvc/slider)

* [Telerik UI for {{ site.framework }} Video Onboarding Course (Free for trial users and license holders)]({%slug virtualclass_uiformvc%})

* [Telerik UI for {{ site.framework }} Forums](https://www.telerik.com/forums/aspnet-mvc)
{% endif %}

## See Also

* [Client-Side API Reference of the Slider for {{ site.framework }}](https://docs.telerik.com/kendo-ui/api/javascript/ui/slider)
* [Server-Side API Reference of the Slider for {{ site.framework }}](https://docs.telerik.com/{{ site.platform }}/api/slider)
{% if site.core %}
* [Server-Side TagHelper API Reference of the Slider for {{ site.framework }}](https://docs.telerik.com/{{ site.platform }}/api/taghelpers/slider)
{% endif %}
* [Telerik UI for {{ site.framework }} Breaking Changes]({%slug breakingchanges_2024%})
* [Telerik UI for {{ site.framework }} Knowledge Base](https://docs.telerik.com/{{ site.platform }}/knowledge-base)