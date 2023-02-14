---
title: Use the RangeSliderFor Method
page_title: Use the RangeSliderFor Method
description: "Use the RangeSliderFor method to update a model in ASP.NET MVC applications."
previous_url: /helpers/editors/slider/how-to/update-dialog-ajax-forms
slug: howto_userangesliderfor_slideraspnetmv
---

# Use the RangeSliderFor Method

The RangeSlider HtmlHelper renders two hidden inputs behind the scenes.

This behavior helps you consume and process a model property that holds an array of two numbers&mdash;start and end.

The following example demonstrates a very basic approach for using, consuming, and updating such a model with the `RangeSliderFor` method.

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
    // ToDo: Update the model in the database.
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

* [Basic Usage by the Slider HtmlHelper for ASP.NET MVC (Demo)](https://demos.telerik.com/aspnet-mvc/slider)
* [Using the API of the Slider HtmlHelper for ASP.NET MVC (Demo)](https://demos.telerik.com/aspnet-mvc/slider/api)
* [SliderBuilder Server-Side API](https://docs.telerik.com/aspnet-mvc/api/Kendo.Mvc.UI.Fluent/SliderBuilder)
* [Slider Server-Side API](/api/slider)
