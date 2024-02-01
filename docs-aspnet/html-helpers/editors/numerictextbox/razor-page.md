---
title: Razor Pages
page_title: Razor Pages
description: "Telerik UI NumericTextBox for {{ site.framework }} in a RazorPages application."
slug: razorpages_numerictextboxhelper_aspnetcore
position: 7
---

# NumericTextBox in Razor Pages

Razor Pages is an alternative to the MVC pattern that makes page-focused coding easier and more productive. This approach consists of a `cshtml` file and a `cshtml.cs` file (by design, the two files have the same name). 

You can seamlessly integrate the Telerik UI NumericTextBox for {{ site.framework }} in Razor Pages applications.

This article describes how to configure the NumericTextBox component in a Razor Pages scenario.

For the complete project, refer to the [NumericTextBox in Razor Pages example](https://github.com/telerik/ui-for-aspnet-core-examples/blob/master/Telerik.Examples.RazorPages/Telerik.Examples.RazorPages/Pages/NumericTextBox/NumericTextBoxBinding.cshtml).

## Getting Started

To bind the Telerik UI NumericTextBox within a `RazorPage`:

1. Declare the `PageModel` at the top of the `RazorPage`:


    ```
        @page
        @model Telerik.Examples.RazorPages.Pages.NumericTextBoxBindingModel
    ```

1. Declare the widget either in a form or as a stand-alone widget:


    ```HtmlHelper
        <form method="post">
            <label for="Price">Price:</label>
            @(Html.Kendo().NumericTextBoxFor(c=>c.Price)
                        .Step(1)
                        .Min(0)
                        .Decimals(0)
                )
            <br />
            <input type="submit" name="name" value="Submit Form" />
        </form>
    ```

1. Bind the property values in the backend:

    ```
        public class NumericTextBoxBindingModel : PageModel
        {
            [BindProperty]
            public int Price { get; set; }

            public void OnGet()
            {
                //omitted for clarity
            }
            public void OnPost()
            {
                //omitted for clarity
            }
        }
    ```

## See Also

* [Server-Side API](/api/numerictextbox)
