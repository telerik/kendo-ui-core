---
title: Using Forms
page_title: Using Forms | Kendo UI Window HtmlHelper
description: "This article illustrates an option to handle forms in MVC loaded in Kendo Window."
slug: using_formsinwindow_aspnetmvc
position: 2
---

# Using Forms in Kendo UI Window

This article provides information on the basic concepts for handling views with forms in a Kendo UI Window popup, showing validation messages from the model state, and closing the Window on a valid model.

To load content from a view into the popup content ([Load-on-Demand Content]({%slug overview_windowhelper_aspnetmvc%}#load-on-demand-content) in a Kendo UI Window for MVC, you can use the `LoadContentFrom` method. This is a common scenario for rendering forms and showing validation on a page.

> **Important**
>
> To use AJAX forms, follow the article on [updating the Window with AJAX forms]({% slug howto_update_ajax_forms_windowaspnetmv %}).

While the Window allows you to create popup forms, you need to consider the conceptual differences during the implementation of the popup itself.

Typically, when you load a view into the Window, the Window does not act as a separate browser window. Any returned data from the form submit action loads into the main page and eventually causes unexpected results. To handle this behavior, render the content in an iframe.

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

Other articles on Telerik UI for ASP.NET MVC and on the Window:

* [ASP.NET MVC API Reference: WindowBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/WindowBuilder)
* [Overview of Telerik UI for ASP.NET MVC]({% slug overview_aspnetmvc %})
* [Fundamentals of Telerik UI for ASP.NET MVC]({% slug fundamentals_aspnetmvc %})
* [Scaffolding in Telerik UI for ASP.NET MVC]({% slug scaffolding_aspnetmvc %})
* [Overview of the Kendo UI Window Widget]({% slug overview_kendoui_window_widget %})
* [Telerik UI for ASP.NET MVC API Reference Folder](/api/aspnet-mvc/Kendo.Mvc/AggregateFunction)
* [Telerik UI for ASP.NET MVC HtmlHelpers Folder]({% slug overview_autocompletehelper_aspnetmvc %})
* [Tutorials on Telerik UI for ASP.NET MVC]({% slug overview_timeefficiencyapp_aspnetmvc6 %})
* [Telerik UI for ASP.NET MVC Troubleshooting]({% slug troubleshooting_aspnetmvc %})
