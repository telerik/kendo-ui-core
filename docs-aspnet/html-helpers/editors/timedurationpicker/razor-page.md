---
title: Razor Pages
page_title: Razor Pages
description: "Learn how to use the Telerik UI TimeDurationPicker component for {{ site.framework }} in a Razor Pages application."
slug: htmlhelpers_timedurationpickerhelper_razorpage_aspnetcore
position: 7
---

# TimeDurationPicker in Razor Pages 

Razor Pages is an alternative to the MVC pattern that makes page-focused coding easier and more productive. This approach consists of a `cshtml` file and a `cshtml.cs` file (by design, the two files have the same name). 

You can seamlessly integrate the Telerik UI TimeDurationPicker for {{ site.framework }} in Razor Pages applications.

This article describes how to configure the TimeDurationPicker component in a Razor Pages scenario.

## Binding the TimeDurationPicker to a PageModel Property

To bind the TimeDurationPicker to a property from the `PageModel`, follow the next steps:

1. Add a property to the `PageModel` that must bind to the TimeDurationPicker.

    ```csharp Index.cshtml.cs
    public class IndexModel : PageModel
    {
        [BindProperty]
        public decimal? Duration { get; set; }

        public void OnGet()
        {
            // Assign a value in milliseconds (1h 30m = 5400000 ms)
            Duration = 5400000m;
        }

        public void OnPost()
        {
            // Duration will be populated with the submitted value
        }
    }
    ```

1. Declare the `PageModel` at the top of the page.

    ```Razor
    @page
    @model IndexModel
    ```

1. Bind the TimeDurationPicker to the property using the `TimeDurationPickerFor()` configuration.

    ```HtmlHelper
    @page
    @model IndexModel

    @(Html.Kendo().TimeDurationPickerFor(m => m.Duration)
          .InputMode("numeric")
          .Columns(c =>
          {
              c.Hours().Format("## hours ");
              c.Minutes().Format(" ## minutes");
          })
    )
    ```
    ```TagHelper
    @page
    @model IndexModel
    @addTagHelper *, Kendo.Mvc

    <kendo-timedurationpicker for="Duration" input-mode="numeric">
        <timedurationpicker-columns>
            <timedurationpicker-column name="hours" format="## hours "></timedurationpicker-column>
            <timedurationpicker-column name="minutes" format=" ## minutes"></timedurationpicker-column>
        </timedurationpicker-columns>
    </kendo-timedurationpicker>
    ```

## Notes

* The recommended binding type is `decimal?`.
* The unit of the value is milliseconds.
* Validation attributes such as `[BindProperty]` and data annotations like `[Required]` are supported.
* Use the `InputMode()` and `Columns()` configuration (or their TagHelper equivalents) to explicitly define how the duration values are displayed.

## See Also

* [Using Telerik UI for ASP.NET Core in Razor Pages](https://docs.telerik.com/aspnet-core/getting-started/razor-pages#using-telerik-ui-for-aspnet-core-in-razor-pages)
* [TimeDurationPicker Overview]({% slug htmlhelpers_timedurationpickerhelper_overview %})
* [Server-Side HtmlHelper API of the TimeDurationPicker](/api/timedurationpicker)
* [Server-Side TagHelper API of the TimeDurationPicker](/api/taghelpers/timedurationpicker)
* [Knowledge Base Section](/knowledge-base)
