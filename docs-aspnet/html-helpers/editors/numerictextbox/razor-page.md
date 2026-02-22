---
title: Razor Pages
page_title: Razor Pages
description: "Telerik UI NumericTextBox for {{ site.framework }} in a RazorPages application."
slug: razorpages_numerictextboxhelper_aspnetcore
components: ["numerictextbox"]
position: 10
---

# NumericTextBox in Razor Pages

This article describes how to seamlessly integrate and configure the Telerik UI NumericTextBox for {{ site.framework }} in Razor Pages applications.

@[template](/_contentTemplates/core/razor-pages-general-info.md#referencing-handler-methods)

## Binding to a PageModel Property

To bind the NumericTextBox to a property from the `PageModel`, follow the next steps:

1. Declare the `PageModel` at the top of the `RazorPage`:

    ```
        @page
        @model NumericTextBoxBindingModel
    ```

1. Declare the component either in a form or as a stand-alone component:

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
    ```TagHelper
        <form method="post">
            <label for="Price">Price:</label>
            <kendo-numerictextbox for="Price" step="1" min="0" decimals="0">
            </kendo-numerictextbox>
            <br />
            <input type="submit" name="name" value="Submit Form" />
        </form>
    ```

1. Bind the property values in the backend:

    ```C#
        public class NumericTextBoxBindingModel : PageModel
        {
            [BindProperty]
            public int Price { get; set; }

            public void OnGet()
            {
                Price = 20; // Assign value to the "Price" property, if needed.
            }
            public void OnPost()
            {
                //omitted for clarity
            }
        }
    ```

For the complete project, refer to the [NumericTextBox in Razor Pages example](https://github.com/telerik/ui-for-aspnet-core-examples/blob/master/Telerik.Examples.RazorPages/Telerik.Examples.RazorPages/Pages/NumericTextBox/NumericTextBoxBinding.cshtml).

## See Also

* [Using Telerik UI for ASP.NET Core in Razor Pages](https://docs.telerik.com/aspnet-core/getting-started/razor-pages#using-telerik-ui-for-aspnet-core-in-razor-pages)
* [Client-Side API of the NumericTextBox](https://www.telerik.com/kendo-jquery-ui/documentation/api/javascript/ui/numerictextbox)
* [Server-Side HtmlHelper API of the NumericTextBox](/api/numerictextbox)
* [Server-Side TagHelper API of the NumericTextBox](/api/taghelpers/numerictextbox)
* [Knowledge Base Section](/knowledge-base)
