---
title: Forms
page_title: Forms | Telerik UI Window HtmlHelper for ASP.NET MVC
description: "Insert complete forms and handle form views in a popup when working with a Telerik UI Window for ASP.NET MVC."
slug: using_formsinwindow_aspnetmvc
position: 3
---

# Forms

The Window enables you to [insert complete forms](#inserting-complete-forms) and to [handle form views in a popup](#using-popup-forms).

## Inserting Complete Forms

To insert a complete form inside a Window, end the Window declaration with `.Render();` and wrap it in a non-rendering code block. This requirement does not apply if the form is defined through plain HTML tags (`&lt;form&gt;...&lt;/form&gt;`). For more information, refer to the article on [using the Kendo UI for jQuery Window with a form](http://docs.telerik.com/kendo-ui/controls/layout/window/overview#using-kendo-ui-window-with-a-form).

The following example demonstrates how to insert a complete form inside the Window.

```ASPX
    <% Html.Kendo().Window()
        .Content(() =>
        {
            using (Html.BeginForm(...)) { %>
                .........
            <% }
        })
        .Render();
    %>
```
```Razor
    @{Html.Kendo().Window()
        .Content(@<text>
            @using (Html.BeginForm(...))
            {
                .........
            }
        </text>)
        .Render();
    }
```

## Using Popup Forms

The Window enables you to handle views with forms in a Window popup, show validation messages from the state of the model and close the Window on a valid model. The Telerik UI Window for ASP.NET MVC enables you to use the `LoadContentFrom` method to [load content from a view to the popup content]({% slug content_windowhelper_aspnetmvc %}).

> For more information on using Ajax forms, refer to the article on [updating the Window with Ajax]({%slug howto_update_ajax_forms_windowaspnetmv%}).

Though the Window allows the creation of popup forms, you need to consider the conceptual differences during their implementation. Typically, if you load a view to a Window, it does not act as a separate browser window. This means that any returned data from the form `submit` action loads into the main page and eventually might lead to unexpected results.

To handle this behavior, render the content in an iframe.

```Index.cshtml
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
```HomeController.cs
public ActionResult GetForm()
{
    // Return the view with the form.
    return View("Form");
}
```
```Form.cshtml
@* As this is loaded in an iframe, the view needs to have a layout so that it loads an entire HTML page. *@
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
```MyModel.cs
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
```MyModelController.cs
[HttpPost]
public ActionResult MyModel_Create(MyModel model)
{
    if (!ModelState.IsValid)
    {
        /* If model is invalid as expected, return the same
        view and send the invalid model to update validation. */
        return View("Form", model);
    }

    // Return a script that runs the window close method of the parent.
    return Content("<script>window.parent.closeFormPopup()</script>");
}
```

## See Also

* [Basic Usage of the Window HtmlHelper for ASP.NET MVC (Demo)](https://demos.telerik.com/aspnet-mc/window)
* [WindowBuilder Server-Side API](http://docs.telerik.com/aspnet-mvc/api/Kendo.Mvc.UI.Fluent/WindowBuilder)
* [Window Server-Side API](/api/window)
