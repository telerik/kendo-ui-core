---
title: Using Forms in Kendo Window
page_title: Overview | Kendo UI Window HtmlHelper
description: "This article illustrates an option to handle forms in MVC loaded in Kendo Window."
slug: using_formsinwindow_aspnetmvc
position: 2
---

# Using Forms in Kendo Window

In this article you can learn the basic concepts to handle views with forms in a **Kendo Window** popup, show validation messages from the model's state and close the window on valid model.

With **Kendo Window for MVC** you can use the `LoadContentFrom` method to load content from a view into the popup's content ([Load-on-Demand Content]({%slug overview_windowhelper_aspnetmvc%}#load-on-demand-content). This is a typical situation render forms and show validation on the page.

> **Tip**
>
> If you are going to use AJAX forms you can follow the [Update Window with AJAX Forms]({%slug howto_update_ajax_forms_windowaspnetmv%}) article.

With **Kendo Window** you can create a popup form, but there are conceptual differences that should be considered during the implementation of such a popup.

Typically, Loading a view in **Kendo Window** does not make it to act as a separate browser window. Thus, any returned data from the form submit action will load into the main page and eventually lead you to an unexpected result. This can be handled by rendering the content in an iframe.

###### Index.cshtml

```cshtml
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

###### HomeController.cs

```cs
public ActionResult GetForm()
{
    // Return the view with the form
    return View("Form");
}
```

###### Form.cshtml

```cshtml
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

###### MyModel.cs

```cs
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

###### MyModelController.cs

```cs
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
* [Overview of the Kendo UI Window Widget](http://docs.telerik.com/kendo-ui/controls/layout/window/overview)
* [Telerik UI for ASP.NET MVC API Reference Folder](/api/aspnet-mvc/Kendo.Mvc/AggregateFunction)
* [Telerik UI for ASP.NET MVC HtmlHelpers Folder]({% slug overview_autocompletehelper_aspnetmvc %})
* [Tutorials on Telerik UI for ASP.NET MVC]({% slug overview_timeefficiencyapp_aspnetmvc6 %})
* [Telerik UI for ASP.NET MVC Troubleshooting]({% slug troubleshooting_aspnetmvc %})
