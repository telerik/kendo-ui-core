---
title: Use the RangeSliderFor Method
page_title: Use the RangeSliderFor Method | Kendo UI Slider HtmlHelper for ASP.NET MVC
description: "Use the RangeSliderFor method to update a model in ASP.NET MVC applications."
slug: howto_userangesliderfor_slideraspnetmv
---

# Use the RangeSliderFor Method

The RangeSlider HtmlHelper renders two hidden inputs behind the scenes.

This behavior helps you consume and process a model property that holds an array of 2 numbers&mdash;start and end.

The following example demonstrates a very basic approach for using, consuming, and updating such a model with the `RangeSliderFor` method.

##### Example

```Model
public class MyModel
{
    public int ID { get; set; }
    public double[] values { get; set; }
}
```
```Controller
public ActionResult Index()
{
    return View(new MyModel { ID = 1, values=new double[] { 1, 2 } });
}

public ActionResult UpdateMyModel(MyModel model)
{
    // ToDo: Update the model in the database
    return View("Index", model);
}
```
```Razor
@model TelerikMvcApp.Models.MyModel

@using (Html.BeginForm("UpdateMyModel", "Home"))
{
    @Html.HiddenFor(model => model.ID)
    @(Html.Kendo().RangeSliderFor(model => model.values))
    <input type="submit"  value="Submit" />
}
```

## See Also

* [Telerik UI for ASP.NET MVC API Reference: SliderBuilder](http://docs.telerik.com/aspnet-mvc/api/Kendo.Mvc.UI.Fluent/SliderBuilder)
* [Overview of Telerik UI for ASP.NET MVC]({% slug overview_aspnetmvc %})
* [Fundamentals of Telerik UI for ASP.NET MVC]({% slug fundamentals_aspnetmvc %})
* [Scaffolding in Telerik UI for ASP.NET MVC]({% slug scaffolding_aspnetmvc %})
* [Overview of the Kendo UI Slider Widget](http://docs.telerik.com/kendo-ui/controls/editors/slider/overview)
* [Telerik UI for ASP.NET MVC API Reference Folder](http://docs.telerik.com/aspnet-mvc/api/Kendo.Mvc/AggregateFunction)
* [Telerik UI for ASP.NET MVC HtmlHelpers Folder]({% slug overview_autocompletehelper_aspnetmvc %})
* [Tutorials on Telerik UI for ASP.NET MVC]({% slug overview_timeefficiencyapp_aspnetmvc6 %})
* [Telerik UI for ASP.NET MVC Troubleshooting]({% slug troubleshooting_aspnetmvc %})
