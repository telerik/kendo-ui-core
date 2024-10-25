---
title: Prefix and Suffix
page_title: Prefix and Suffix
description: "Learn how to add custom items as prefix and suffix adornments to enhance the user interface interactivity when using the Telerik UI for {{ site.framework }} NumericTextBox."
slug: prefix_suffix_numerictextbox
position: 5
---

# Prefix and Suffix

The NumericTextBox component provides options for enhancing the user interface interactivity by adding custom content as prefix and suffix adornments.

The prefix and suffix input adornments are elements positioned before and after the NumericTextBox input element, commonly used to clarify the expected data in the input, such as currency symbols or unit indicators, and provide direct functionality for the entered data, like password visibility toggles, formatting, and more.

## Prefix

The prefix input adornment is placed before the NumericTextBox field and provides an additional context that guides users in entering specific data, such as icons for currencies or unit indicators. To configure the Prefix functionality, use the `PrefixOptions()` configuration, which facilitates the following options:

* `Icon()`&mdash;Inserts an icon before the NumericTextBox element. The option accepts the name of an existing icon in the Kendo UI theme or SVG content.
* `Template()`&mdash;Adds custom content before the NumericTextBox element. You can use a variety of templating options like `TemplateId()`, `TemplateHandler()`, and more.
* `Separator()`&mdash;By default, the separator is visible. Disable the `Separator()` option to remove the default separator of the prefix content. 

The following example demonstrates how to add a DropDownList component before the NumericTextBox.

```HtmlHelper
    @(Html.Kendo().NumericTextBox()
        .Name("length")
        .Placeholder("Enter length")
        .PrefixOptions(prefix => prefix.TemplateId("prefixTemplate"))
    )

    <script type="text/x-kendo-template" id="prefixTemplate">
        @(Html.Kendo().DropDownList()
            .Name("length-units")
            .Size(ComponentSize.Small)
            .FillMode(FillMode.Flat)
            .Rounded(Rounded.None)
            .BindTo(new List<string>() {
                "mm",
                "cm",
                "m",
                "km"
            })
            .HtmlAttributes(new { style = "width: 70px;" })
            .ToClientTemplate()
        )
    </script>
```
{% if site.core %}
```TagHelper
    @{
        var length_units_data = new List<string>() {
            "mm",
            "cm",
            "m",
            "km"
        };
    }

    <kendo-numerictextbox name="length" placeholder="Enter length">
        <prefix-options template-id="prefixTemplate" />
    </kendo-numerictextbox>

    <script type="text/html" id="prefixTemplate">
        <kendo-dropdownlist name="length-units" is-in-client-template="true" style="width: 70px;"
            size="ComponentSize.Small"
            rounded="Rounded.None"
            fill-mode="FillMode.Flat"
            bind-to="length_units_data">
        </kendo-dropdownlist>
    </script>
```
{% endif %}

## Suffix

The suffix input adornment is an element positioned after the input field. Usually, it offers direct functionality related to the entered data, such as toggles for password visibility, formatting options, or the ability to clear the input. Set up the Suffix functionality through the `SuffixOptions()` configuration that provides the following options:

* `Icon()`&mdash;Adds an icon after the NumericTextBox element. The option accepts the name of an existing icon in the Kendo UI theme or SVG content.
* `Template()`&mdash;Adds custom content for the suffix adornment of the NumericTextBox.
* `Separator()`&mdash;By default, the separator is visible. Disable the `Separator()` option to remove the default separator of the suffix content. 

The following example demonstrates how to insert HTML content after the NumericTextBox element.

```HtmlHelper
    @(Html.Kendo().NumericTextBox()
        .Name("length")
        .Placeholder("Enter length")
        .SuffixOptions(suffix => suffix.Separator(false).Template("<div class='selected-length-unit' id='selected-unit'>mm</div>"))
    )
```
{% if site.core %}
```TagHelper
    <kendo-numerictextbox name="length" placeholder="Enter length">
        <suffix-options separator="false" template="<div class='selected-length-unit' id='selected-unit'>mm</div>" />
    </kendo-numerictextbox>
```
{% endif %}

## See Also

* [Using the Prefix and Suffix of the NumericTextBox for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/numerictextbox/prefix-suffix)
* [Server-Side API](https://docs.telerik.com/{{ site.platform }}/api/numerictextbox)
* [Client-Side API](https://docs.telerik.com/kendo-ui/api/javascript/ui/numerictextbox)
