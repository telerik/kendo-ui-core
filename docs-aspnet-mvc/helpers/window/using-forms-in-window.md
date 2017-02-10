---
title: Using Forms
page_title: Using Forms | Kendo UI Window HtmlHelper
description: "Handle forms in when working with a Kendo UI Window in ASP.NET MVC applications."
slug: using_formsinwindow_aspnetmvc
position: 2
---

# Using Forms

This article provides basic information about handling views with forms in a Kendo UI Window popup, showing validation messages from the state of the model, and closing the Window on a valid model.

The Kendo UI Window widget for ASP.NET MVC enables you to use the `LoadContentFrom` method to load content from a view into the popup content ([Load-on-Demand Content]({%slug overview_windowhelper_aspnetmvc%}#load-on-demand-content)).

> **Important**
>
> If you use AJAX forms, refer to the article on [updating the Kendo UI Window with AJAX forms]({%slug howto_update_ajax_forms_windowaspnetmv%}).

Though the Window allows the creation of popup forms, you need to consider the conceptual differences during their implementation. Typically, if you load a view into a Kendo UI Window, it does not act as a separate browser window. This means that any returned data from the form submit action loads into the main page and eventually might lead to unexpected results.

To handle this behavior, render the content in an iframe.

###### Example

```tab-Index.cshtml
@(Html.Kendo().Window()
    .Name("PopupForm")
    .Title("My Form")
    .LoadContentFrom("GetForm","Home")
    .Iframe(true)
    .Resizable()
    .Draggable()
)

<script>
    // Implement a script that will close the popup when model is valid.
    function closeFormPopup() {
        $("#PopupForm").data("kendoWindow").close();
    }
</script>
```
```tab-HomeController.cs
public ActionResult GetForm()
{
    // Return the view with the form
    return View("Form");
}
```
```tab-Form.cshtml
@* As this is loaded in an iframe, the view should have a layout in order to load an entire HTML page. *@
@{
    Layout = "~/Views/Shared/_Layout.cshtml";
}

@model TelerikMvcApp.Models.MyModel

@using (Html.BeginForm("MyModel_Create", "MyModel", FormMethod.Post))
{
    @Html.ValidationSummary()

    @Html.EditorForModel(Model);

    @(Html.Kendo().Button()
        .Name("SubmitBtn")
        .HtmlAttributes(new { type = "submit" })
        .Content("Submit")
    )
}
```
```tab-MyModel.cs
public class MyModel
{
    [Required]
    [Url(ErrorMessage = "Please enter a valid url")]
    public string Url { get; set; }
    [Required]
    [StringLength(10)]
    public string Description { get; set; }
}
```
```tab-MyModelController.cs
[HttpPost]
public ActionResult MyModel_Create(MyModel model)
{
    if (!ModelState.IsValid)
    {
        /* If model is invalid, as expected, return the same
        view and send the invalid model to update validation. */
        return View("Form", model);
    }

    // Return a script that runs the parent's window close method.
    return Content("<script>window.parent.closeFormPopup()</script>");
}
```

## See Also

* [ASP.NET MVC API Reference: WindowBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/WindowBuilder)
* [Overview of Telerik UI for ASP.NET MVC]({% slug overview_aspnetmvc %})
* [Fundamentals of Telerik UI for ASP.NET MVC]({% slug fundamentals_aspnetmvc %})
* [Scaffolding in Telerik UI for ASP.NET MVC]({% slug scaffolding_aspnetmvc %})
* [Overview of the Kendo UI Window Widget](http://docs.telerik.com/kendo-ui/controls/layout/window/overview)
* [Telerik UI for ASP.NET MVC API Reference Folder](/api/aspnet-mvc/Kendo.Mvc/AggregateFunction)
* [Telerik UI for ASP.NET MVC HtmlHelpers Folder]({% slug overview_autocompletehelper_aspnetmvc %})
* [Tutorials on Telerik UI for ASP.NET MVC]({% slug overview_timeefficiencyapp_aspnetmvc6 %})
* [Telerik UI for ASP.NET MVC Troubleshooting]({% slug troubleshooting_aspnetmvc %})
