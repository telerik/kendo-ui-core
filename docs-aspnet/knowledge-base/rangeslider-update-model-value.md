---
title: Update a Model Field with the RangeSlider
description: Learn how to update a model field with the Telerik UI for {{ site.framework }} RangeSlider.
type: how-to
page_title: Update a Model Field with the RangeSlider
slug: rangeslider-update-model-value
tags: slider, range, rangeslider, start, end, update, model, field, value, form, submit, core, mvc, telerik
previous_url: /helpers/editors/slider/how-to/update-dialog-ajax-forms, /html-helpers/editors/slider/how-to/update-dialog-ajax-forms
res_type: kb
components: ["general"]
component: rangeslider
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>{{ site.product }} RangeSlider</td>
 </tr>
 <tr>
  <td>Progress {{ site.product }} version</td>
  <td>2024.4.1112</td>
 </tr>
</table>

## Description

When submitting a form, how can I update a model field with the RangeSlider's start and end values?

## Solution

The RangeSlider renders two hidden inputs behind the scene.

This behavior helps you consume and process a model property that holds an array of two numbers&mdash;start and end.  

1. Add a field of type `double[]` in the view model.  
1. Bind the RangeSlider to the field.

```Model
public class OrderViewModel
{
    public int OrderID { get; set; }

    public double[] Products { get; set; }
}
```
```Controller
public ActionResult Index()
{
    OrderViewModel model = new OrderViewModel() 
    { 
        OrderID = 1, 
        Products = new double[] { 2, 4 } 
    };

    return View(model);
}

[HttpPost]
public ActionResult Submit(OrderViewModel model)
{
    // model.Products contains the updated values

    return View("Success");
}
```
```Razor
@model MyApp.Models.OrderViewModel

@using (Html.BeginForm("Submit", "Home"))
{
    @Html.HiddenFor(model => model.OrderID)
    @(Html.Kendo().RangeSliderFor(model => model.Products))
    <br />
    <input type="submit"  value="Submit" />
} 
```
{% if site.core %}
```TagHelper
    @model MyApp.Models.OrderViewModel

    @addTagHelper *, Kendo.Mvc

    <form asp-action="Submit" asp-controller="/Home" asp-controller="Home">
        <input asp-for="OrderID" type="hidden" name="OrderID" value="@Model.OrderID" />
        <kendo-rangeslider for="Products" values="@Model.Products">
        </kendo-rangeslider>
        <br />
        <input type="submit" name="submit" value="Submit" />
    </form> 
```
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
* [Server-Side TagHelper API Reference of the Slider for {{ site.framework }}](https://docs.telerik.com/aspnet-core/api/taghelpers/slider)
{% endif %}
* [Telerik UI for {{ site.framework }} Breaking Changes]({%slug breakingchanges_2024%})
* [Telerik UI for {{ site.framework }} Knowledge Base](https://docs.telerik.com/{{ site.platform }}/knowledge-base)