---
title: Use RangeSliderFor method 
page_title: Use RangeSliderFor method  | Kendo UI RangeSlider HtmlHelper
description: "This article shows how you can use RangeSliderFor method to update a model in ASP.NET MVC applications."
slug: howto_userangesliderfor_slideraspnetmv
---

# Use RangeSliderFor method 

The RangeSlider helper renders two hidden inputs behind the scenes. That helps you to consume and process a model property that holds an array of two numbers (start and end).

The following example showcases a very basic example of how such model can be used, consumed and updated with the RangeSliderFor method.

##### Example

**MyModel.cs**
```CSharp
public class MyModel
{
    public int ID { get; set; }
    public double[] values { get; set; }
}
```

**HomeController.cs**
```CSharp
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

Other articles on Telerik UI for ASP.NET MVC and on the Slider:

* [ASP.NET MVC API Reference: SliderBuilder](/api/Kendo.Mvc.UI.Fluent/SliderBuilder)
* [Overview of Telerik UI for ASP.NET MVC]({% slug overview_aspnetmvc %})
* [Fundamentals of Telerik UI for ASP.NET MVC]({% slug fundamentals_aspnetmvc %})
* [Scaffolding in Telerik UI for ASP.NET MVC]({% slug scaffolding_aspnetmvc %})
* [Overview of the Kendo UI Slider Widget](http://docs.telerik.com/kendo-ui/controls/editors/slider/overview)
* [Telerik UI for ASP.NET MVC API Reference Folder](/api/Kendo.Mvc/AggregateFunction)
* [Telerik UI for ASP.NET MVC HtmlHelpers Folder]({% slug overview_autocompletehelper_aspnetmvc %})
* [Tutorials on Telerik UI for ASP.NET MVC]({% slug overview_timeefficiencyapp_aspnetmvc6 %})
* [Telerik UI for ASP.NET MVC Troubleshooting]({% slug troubleshooting_aspnetmvc %})
