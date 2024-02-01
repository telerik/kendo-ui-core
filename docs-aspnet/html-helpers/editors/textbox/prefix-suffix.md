---
title: Prefix and Suffix
page_title: Prefix and Suffix
description: "Learn how to add custom items as prefix and suffix adornments to enhance the user interface interactivity when using the Telerik UI for {{ site.framework }} TextBox."
slug: prefix_suffix_textbox
position: 4
---

# Prefix and Suffix

The TextBox component provides options for enhancing the user interface interactivity by adding custom content as prefix and suffix adornments.

The prefix and suffix input adornments are elements positioned before and after the TextBox input element, commonly used to clarify the expected data in the input, such as currency symbols or unit indicators, and provide direct functionality for the entered data, like password visibility toggles, formatting, and more.

## Prefix

The prefix input adornment is placed before the TextBox field and provides an additional context that guides users in entering specific data, such as icons for currencies or unit indicators. To configure the Prefix functionality, use the `PrefixOptions()` configuration, which facilitates the following options:

* `Icon()`&mdash;Inserts an icon before the TextBox element. The option accepts the name of an existing icon in the Kendo UI theme or SVG content.
* `Template()`&mdash;Adds custom content before the TextBox element. You can use a variety of templating options like `TemplateId()`, `TemplateHandler()`, and more.
* `Separator()`&mdash;By default, the separator is visible. Disable the `Separator()` option to remove the default separator of the prefix content. 

The following example demonstrates how to add an icon as a prefix of the TextBox.

```HtmlHelper
    @(Html.Kendo().TextBox()
        .Name("email")
        .Placeholder("Enter your email...")
        .PrefixOptions(prefix => prefix.Icon("envelop"))
        .HtmlAttributes(new { style = "width: 100%" })
    )
```
{% if site.core %}
```TagHelper
    <kendo-textbox name="email" placeholder="Enter your email..." style="width: 100%">
        <prefix-options icon="envelop" />
    </kendo-textbox>
```
{% endif %}

## Suffix

The suffix input adornment is an element positioned after the input field. Usually, it offers direct functionality related to the entered data, such as toggles for password visibility, formatting options, or the ability to clear the input. Set up the Suffix functionality through the `SuffixOptions()` configuration that provides the following options:

* `Icon()`&mdash;Adds an icon after the TextBox element. The option accepts the name of an existing icon in the Kendo UI theme or SVG content.
* `Template()`&mdash;Adds custom content for the suffix adornment of the TextBox.
* `Separator()`&mdash;By default, the separator is visible. Disable the `Separator()` option to remove the default separator of the suffix content. 

The following example demonstrates how to insert a button after the TextBox element through the `TemplateId()` option.

```HtmlHelper
    <script type="text/x-kendo-template" id="suffixTemplate">
        @(Html.Kendo().Button()
            .Name("suffix-send-button")
            .Icon("paper-plane")
            .FillMode(ButtonFillMode.Flat)
            .ToClientTemplate()
        )
    </script>

    @(Html.Kendo().TextBox()
        .Name("email")
        .Placeholder("Enter your email...")
        .SuffixOptions(suffix => suffix.TemplateId("suffixTemplate"))
        .HtmlAttributes(new { style = "width: 100%" })
    )
```
{% if site.core %}
```TagHelper
    <script type="text/html" id="suffixTemplate">
        <kendo-button name="suffix-send-button" is-in-client-template="true"
            icon="paper-plane"
            fill-mode="ButtonFillMode.Flat">
        </kendo-button>
    </script>

    <kendo-textbox name="email" placeholder="Enter your email..." style="width: 100%">
        <suffix-options template-id="suffixTemplate" />
    </kendo-textbox>
```
{% endif %}

## See Also

* [Using the Prefix and Suffix of the TextBox for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/textbox/prefix-suffix)
* [Server-Side API](https://docs.telerik.com/{{ site.platform }}/api/textbox)
* [Client-Side API](https://docs.telerik.com/kendo-ui/api/javascript/ui/textbox)
