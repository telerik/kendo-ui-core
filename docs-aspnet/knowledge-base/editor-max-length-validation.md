---
title: Adding a Maximum Length Validation to the Editor
description: Learn how to use custom validation rules to check the length of the text content in the Telerik UI for {{ site.framework }} Editor.
type: how-to
page_title: Adding a Maximum Length Validation to the Editor
slug: editor-max-length-validation
tags: editor, maxlength, max, maximum, length, text, validate, validation, core, mvc, telerik
previous_url: /helpers/editors/editor/how-to/add-max-length-validation, /html-helpers/editors/editor/how-to/add-max-length-validation
res_type: kb
component: editor
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>{{ site.product }} Editor</td>
 </tr>
 <tr>
  <td>Progress {{ site.product }} version</td>
  <td>2024.4.1112</td>
 </tr>
</table>

## Description

How can I validate that the value of the Editor does not exceed a pre-defined maximum length?

## Solution

To validate the Editor value, use the [Kendo UI for jQuery Validator](https://docs.telerik.com/kendo-ui/controls/validator/overview) component with custom validation rules.

1. Set the  `data_maxtextlength` and `data_maxtextlength_msg` attributes through the [`HtmlAttributes`](/api/kendo.mvc.ui.fluent/editorbuilder#htmlattributessystemobject) option of the Editor.
1. Extend the Validator with custom rules.

```HtmlHelper
    <form>
        @(Html.Kendo().Editor()
            .Name("editor")
            .HtmlAttributes(new { data_maxtextlength="50", data_maxtextlength_msg="Text must be shorter than 50 chars" })
            .Value("Lorem ipsum dolor sit amet. Lorem ipsum dolor sit.")
        )

        <button class="k-button k-button-md k-rounded-md k-button-solid k-button-solid-primary">Submit</button>
    </form>
```
```JS script
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
```

## More {{ site.framework }} Editor Resources

* [{{ site.framework }} Editor Documentation]({%slug htmlhelpers_editor_aspnetcore%})

* [{{ site.framework }} Editor Demos](https://demos.telerik.com/{{ site.platform }}/editor/index)

{% if site.core %}
* [{{ site.framework }} Editor Product Page](https://www.telerik.com/aspnet-core-ui/editor)

* [Telerik UI for {{ site.framework }} Video Onboarding Course (Free for trial users and license holders)]({%slug virtualclass_uiforcore%})

* [Telerik UI for {{ site.framework }} Forums](https://www.telerik.com/forums/aspnet-core-ui)

{% else %}
* [{{ site.framework }} Editor Product Page](https://www.telerik.com/aspnet-mvc/editor)

* [Telerik UI for {{ site.framework }} Video Onboarding Course (Free for trial users and license holders)]({%slug virtualclass_uiformvc%})

* [Telerik UI for {{ site.framework }} Forums](https://www.telerik.com/forums/aspnet-mvc)
{% endif %}

## See Also

* [Client-Side API Reference of the Editor for {{ site.framework }}](https://docs.telerik.com/kendo-ui/api/javascript/ui/editor)
* [Server-Side API Reference of the Editor for {{ site.framework }}](https://docs.telerik.com/{{ site.platform }}/api/editor)
{% if site.core %}
* [Server-Side TagHelper API Reference of the Editor for {{ site.framework }}](https://docs.telerik.com/aspnet-core/api/taghelpers/editor)
{% endif %}
* [Telerik UI for {{ site.framework }} Breaking Changes]({%slug breakingchanges_2024%})
* [Telerik UI for {{ site.framework }} Knowledge Base](https://docs.telerik.com/{{ site.platform }}/knowledge-base)