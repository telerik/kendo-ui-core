---
title: Prefix and Suffix
page_title: Prefix and Suffix
description: "Learn how to add custom items as prefix and suffix adornments to enhance the user interface interactivity when using the Telerik UI for {{ site.framework }} MaskedTextBox."
slug: prefix_suffix_maskedtextbox
position: 5
---

# Prefix and Suffix

The MaskedTextBox component provides options for enhancing the user interface interactivity by adding custom content as prefix and suffix adornments.

The prefix and suffix input adornments are elements positioned before and after the MaskedTextBox input element, commonly used to clarify the expected data in the input, such as currency symbols or unit indicators, and provide direct functionality for the entered data, like password visibility toggles, formatting, and more.

## Prefix

The prefix input adornment is placed before the MaskedTextBox field and provides an additional context that guides users in entering specific data, such as icons for currencies or unit indicators. To configure the Prefix functionality, use the `PrefixOptions()` configuration, which facilitates the following options:

* `Icon()`&mdash;Inserts an icon before the MaskedTextBox element. The option accepts the name of an existing icon in the Kendo UI theme or SVG content.
* `Template()`&mdash;Adds custom content before the MaskedTextBox element. You can use a variety of templating options like `TemplateId()`, `TemplateHandler()`, and more.
* `Separator()`&mdash;By default, the separator is visible. Disable the `Separator()` option to remove the default separator of the prefix content. 

The following example demonstrates how to set an icon as a prefix of the MaskedTextBox component.

```HtmlHelper
    @(Html.Kendo().MaskedTextBox()
        .Name("card")
        .Mask("0000-0000-0000-0000")
        .PrefixOptions(prefix => prefix.Icon("lock"))
    )
```
{% if site.core %}
```TagHelper
    <kendo-maskedtextbox name="card"
        mask="0000-0000-0000-0000">
        <prefix-options icon="lock" />
    </kendo-maskedtextbox>
```
{% endif %}

## Suffix

The suffix input adornment is an element positioned after the input field. Usually, it offers direct functionality related to the entered data, such as toggles for password visibility, formatting options, or the ability to clear the input. Set up the Suffix functionality through the `SuffixOptions()` configuration that provides the following options:

* `Icon()`&mdash;Adds an icon after the MaskedTextBox element. The option accepts the name of an existing icon in the Kendo UI theme or SVG content.
* `Template()`&mdash;Adds custom content for the suffix adornment of the MaskedTextBox.
* `Separator()`&mdash;By default, the separator is visible. Disable the `Separator()` option to remove the default separator of the suffix content. 

The following example demonstrates how to add a button as a suffix of the MaskedTextBox component.

```HtmlHelper
    @(Html.Kendo().MaskedTextBox()
        .Name("card")
        .Mask("0000-0000-0000-0000")
        .SuffixOptions(suffix => suffix.TemplateId("suffixTemplate"))
    )

    <script type="text/x-kendo-template" id="suffixTemplate">
        @(Html.Kendo().Button()
            .Name("suffix-button")
            .Content("Verify")
            .FillMode(ButtonFillMode.Flat)
            .ToClientTemplate()
        )
    </script>
```
{% if site.core %}
```TagHelper
    <kendo-maskedtextbox name="card"
        mask="0000-0000-0000-0000">
        <suffix-options template-id="suffixTemplate"/>
    </kendo-maskedtextbox>

    <script type="text/html" id="suffixTemplate">
        <kendo-button name="suffix-button" is-in-client-template="true"
            fill-mode="ButtonFillMode.Flat">
            Verify
        </kendo-button>
    </script>
```
{% endif %}

## See Also

* [Using the Prefix and Suffix of the MaskedTextBox for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/maskedtextbox/prefix-suffix)
* [Server-Side API](https://docs.telerik.com/{{ site.platform }}/api/maskedtextbox)
* [Client-Side API](https://docs.telerik.com/kendo-ui/api/javascript/ui/maskedtextbox)
