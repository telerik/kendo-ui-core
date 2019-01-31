---
title: Forms Integration
page_title: Forms Integration | Kendo UI Window HtmlHelper for ASP.NET Core
description: "Learn how to use forms in the Kendo UI Window HtmlHelper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
slug: htmlhelpers_window_forms_aspnetcore
position: 7
---

# Forms Integration

The Window HtmlHelper provides various approaches to load a `<form>` element as its content.

## Html.BeginForm inside Window

To insert a complete form inside a Window, end the Window declaration with `.Render();` and wrap it in a non-rendering code block. This requirement does not apply if the form is defined through plain HTML tags (`&lt;form&gt;...&lt;/form&gt;`). For more information, refer to the [article on using the Kendo UI Window with a form](http://docs.telerik.com/kendo-ui/controls/layout/window/overview#using-kendo-ui-window-with-a-form).

The following example demonstrates how to insert a complete form inside the Window.

###### Example

    @{Html.Kendo().Window()
        .Name("window")
        .Content(@<text>
            @using (Html.BeginForm("FormSubmit", "Home"))
            {
                //...
            }
        </text>)
        .Render();
    }

## Loading External Form

The Kendo UI Window for ASP.NET MVC enables you to use the `LoadContentFrom()` method to load content from a view into the popup content. For more information, refer to the article on [loading content on demand]({% slug htmlhelpers_window_loadingcontent_aspnetcore %}#load-on-demand-content)).

Though the Window allows the creation of popup forms, you need to consider the conceptual differences during their implementation. Typically, if you load a view into a Kendo UI Window, it does not act as a separate browser window. This means that any returned data from the form submit action loads into the main page and eventually might lead to unexpected results.

To handle this behavior, render the content in an `iframe`.

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
public IActionResult GetForm()
{
    // Return the view with the form.
    return View("Form");
}
```
```Form.cshtml
@* As this is loaded in an iframe, the view will have a layout to load an entire HTML page. *@
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
public IActionResult MyModel_Create(MyModel model)
{
    if (!ModelState.IsValid)
    {
        /* If the model is invalid, as expected, return the same
        view and send the invalid model to update validation. */
        return View("Form", model);
    }

    // Return a script that runs the close method of the parent window.
    return Content("<script>window.parent.closeFormPopup()</script>");
}
```

## See Also

* [Overview of Window HTML helper]({% slug htmlhelpers_window_aspnetcore %})
* [Dimensions]({% slug htmlhelpers_window_dimensions_aspnetcore %})
* [Positioning]({% slug htmlhelpers_window_positioning_aspnetcore %})
* [Constraining Position]({% slug htmlhelpers_window_constrain_aspnetcore %})
* [Loading Content]({% slug htmlhelpers_window_loadingcontent_aspnetcore %})
* [Using iframe]({% slug htmlhelpers_window_iframe_aspnetcore %})
