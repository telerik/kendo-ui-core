---
title: Razor Pages
page_title: Razor Pages
description: "Telerik UI MaskedTextBox for {{ site.framework }} in a RazorPages application."
slug: razorpages_maskedtextboxhelper_aspnetcore
position: 6
---

# MaskedTextBox in Razor Pages

Razor Pages is an alternative to the MVC pattern that makes page-focused coding easier and more productive. This approach consists of a `cshtml` file and a `cshtml.cs` file (by design, the two files have the same name). 

You can seamlessly integrate the Telerik UI MaskedTextBox for {{ site.framework }} in Razor Pages applications.

This article describes how to configure the MaskedTextBox component in a Razor Pages scenario.

For the complete project, refer to the [MaskedTextBox in Razor Pages example](https://github.com/telerik/ui-for-aspnet-core-examples/blob/master/Telerik.Examples.RazorPages/Telerik.Examples.RazorPages/Pages/MaskedTextBox/MaskedTextBoxEditing.cshtml).

## Getting Started

To bind the Telerik UI MaskedTextBox within a `RazorPage`:

1. Declare the `PageModel` at the top of the `RazorPage`:


    ```
        @page
        @model Telerik.Examples.RazorPages.Pages.MaskedTextBox.MaskedTextBoxEditingModel
    ```

1. Declare the widget either in a form or as a stand-alone widget:


    ```HtmlHelper
        <form method="post">
            <label for="phone_number">Phone number:</label>
            @(Html.Kendo().MaskedTextBoxFor(c=>c.PhoneNumber)
                        .Mask("(999) 000-0000")
                )
            <br />
            <input type="submit" name="name" value="Submit Form" />
        </form>
    ```
    {% if site.core %}
    ```TagHelper
        <form method="post">
            <label for="phone_number">Phone number:</label>
            <kendo-maskedtextbox for="PhoneNumber" mask="(999) 000-0000" >
            </kendo-maskedtextbox>
            <br />
            <input type="submit" name="name" value="Submit Form" />
        </form>
    ```
    {% endif %}

1. Bind the property values in the backend:

    ```
        public class MaskedTextBoxEditingModel : PageModel
        {
            [BindProperty]
            public string PhoneNumber { get; set; }

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

* [Server-Side API](/api/maskedtextbox)
