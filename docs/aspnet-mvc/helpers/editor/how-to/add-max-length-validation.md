---
title: Add max-length validation
page_title: Add max-length validation
description: Add max-length validation
---

# Add max-length validation

The snippet below demonstrates how to define custom kendo validators to check the length of the text content, or the length of the HTML content, via custom validation rules.

#### Example

    <form>
        @(Html.Kendo().Editor()
              .Name("editor")
              .HtmlAttributes(new { data_maxtextlength="50", data_maxtextlength_msg="Text must be shorter than 50 chars" })
              .Value("Lorem ipsum dolor sit amet. Lorem ipsum dolor sit.")
        )

        <button class="k-button k-primary">Submit</button>
    </form>

    <script>

        // register custom validation rules
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

