---
title: Razor Pages
page_title: Razor Pages
description: "Telerik UI DatePicker for {{ site.framework }} in a RazorPages application."
slug: razorpages_datepicker_aspnetcore
position: 13
---

# DatePicker in Razor Pages

Razor Pages is an alternative to the MVC pattern that makes page-focused coding easier and more productive. This approach consists of a `cshtml` file and a `cshtml.cs` file (by design, the two files have the same name). 

You can seamlessly integrate the Telerik UI DatePicker for {{ site.framework }} in Razor Pages applications.

This article describes how to configure the DatePicker component in a Razor Pages scenario.

For the complete project, refer to the [DatePicker in Razor Pages example](https://github.com/telerik/ui-for-aspnet-core-examples/blob/master/Telerik.Examples.RazorPages/Telerik.Examples.RazorPages/Pages/DateTimePicker/DateTimePickerIndex.cshtml).

```HtmlHelper
@page

<div>
    <h4>Select a date range</h4>
    @(Html.Kendo().DatePicker()
        .Name("datepicker")
    )
</div>

```
{% if site.core %}
```TagHelper
@page

<div>
    <h4>Select a date range</h4>
    <kendo-datepicker name="datepicker">
    </kendo-datepicker>
</div>

```
{% endif %}

```C# PageModel

 public void OnGet()
 {

 }
  
```

## Binding the DatePicker to a PageModel Property

To bind the DatePicker to a property from the `PageModel`, follow the next steps:

1. Add a property to the `PageModel` that must bind to the DatePicker.

    ```C# Index.cshtml.cs
        public class IndexModel : PageModel
        {
            [BindProperty]
            public DateTime DateCreated { get; set; }

            public void OnGet()
            {
                DateCreated = DateTime.Now; // Assign a value to the "DateCreated" property, if needed.
            }
        }
    ```
1. Declare the `PageModel` at the top of the page.

    ```Razor
        @page
        @model IndexModel
    ```

1. Bind the DatePicker to the property using the `DatePickerFor()` configuration.

    ```HtmlHelper
        @page
        @model IndexModel

        @inject Microsoft.AspNetCore.Antiforgery.IAntiforgery Xsrf
        @Html.AntiForgeryToken()
        
        @(Html.Kendo().DatePickerFor(m => m.DateCreated))
    ```
    ```TagHelper
        @page
        @model IndexModel

        @inject Microsoft.AspNetCore.Antiforgery.IAntiforgery Xsrf
        @Html.AntiForgeryToken()
        @addTagHelper *, Kendo.Mvc

        <kendo-datepicker for="DateCreated">
        </kendo-datepicker>
    ```

## See Also

* [Using Telerik UI for ASP.NET Core in Razor Pages](https://docs.telerik.com/aspnet-core/getting-started/razor-pages#using-telerik-ui-for-aspnet-core-in-razor-pages)
* [Client-Side API of the DatePicker](https://docs.telerik.com/kendo-ui/api/javascript/ui/datepicker)
* [Server-Side HtmlHelper API of the DatePicker](/api/datepicker)
* [Server-Side TagHelper API of the DatePicker](/api/taghelpers/datepicker)
* [Knowledge Base Section](/knowledge-base)
