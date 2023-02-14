---
title: Add maxlength Validations
page_title: Add maxlength Validations
description: "Define custom Kendo UI validators to check the length of the text content through custom validation rules when working with the Editor HtmlHelper in ASP.NET MVC applications."
previous_url: /helpers/editors/editor/how-to/add-max-length-validation
slug: howto_addmaxlengthvalidation_editoraspnetmvc
position: 0
---

# Add maxlength Validations

The Editor provides options for checking the length of the text content or the length of the HTML content.

The following example demonstrates how to define custom Kendo UI validators through custom validation rules while working with the Editor HtmlHelper in ASP.NET MVC applications.

    <form>
        @(Html.Kendo().Editor()
            .Name("editor")
            .HtmlAttributes(new { data_maxtextlength="50", data_maxtextlength_msg="Text must be shorter than 50 chars" })
            .Value("Lorem ipsum dolor sit amet. Lorem ipsum dolor sit.")
        )

        <button class="k-button k-primary">Submit</button>
    </form>

    <script>
        // Register custom validation rules.
        (function ($, kendo) {
            $.extend(true, kendo.ui.validator, {
                rules: {
                    maxTextLength: function (textarea) {
                        if (textarea.is("[data-maxtextlength-msg]") && textarea.val() != "") {
                            var maxlength = textarea.attr("data-maxtextlength");
                            var value = textarea.data("kendoEditor").value();
                            return value.replace(/<[^>]+>/g, "").length <= maxlength;
                        }

                        return true;
                    },
                    maxHtmlLength: function (textarea) {
                        if (textarea.is("[data-maxhtmllength-msg]") && textarea.val() != "") {
                            var maxlength = textarea.attr("data-maxhtmllength");
                            var value = textarea.data("kendoEditor").value();
                            return value.length <= maxlength;
                        }

                        return true;
                    }
                }
            });

            $("form").kendoValidator();
        })(jQuery, kendo);
    </script>

## See Also

* [Basic Usage of the Editor HtmlHelper for ASP.NET MVC (Demo)](https://demos.telerik.com/aspnet-mvc/editor)
* [Using the API of the Editor HtmlHelper for ASP.NET MVC (Demo)](https://demos.telerik.com/aspnet-mvc/editor/api)
* [EditorBuilder Server-Side API](https://docs.telerik.com/aspnet-mvc/api/Kendo.Mvc.UI.Fluent/EditorBuilder)
* [Editor Server-Side API](/api/editor)
