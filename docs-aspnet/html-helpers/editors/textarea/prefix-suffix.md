---
title: Prefix and Suffix
page_title: Prefix and Suffix
description: "Learn how to add custom items as prefix and suffix adornments to enhance the user interface interactivity when using the Telerik UI for {{ site.framework }} TextArea."
slug: prefix_suffix_textarea
position: 3
---

# Prefix and Suffix

The TextArea component provides options for enhancing the user interface interactivity by adding custom content as prefix and suffix adornments.

The prefix and suffix input adornments are elements positioned before and after the TextArea input element, commonly used to clarify the expected data in the input, such as currency symbols or unit indicators, and provide direct functionality for the entered data, like password visibility toggles, formatting, and more.

## Prefix

The prefix input adornment is placed before the TextArea field and provides an additional context that guides users in entering specific data, such as icons for currencies or unit indicators. To configure the Prefix functionality, use the `PrefixOptions()` configuration, which facilitates the following options:

* `Icon()`&mdash;Inserts an icon before the TextArea element. The option accepts the name of an existing icon in the Kendo UI theme or SVG content.
* `Template()`&mdash;Adds custom content before the TextArea element. You can use a variety of templating options like `TemplateId()`, `TemplateHandler()`, and more.
* `Separator()`&mdash;By default, the separator is visible. Disable the `Separator()` option to remove the default separator of the prefix content. 

The following example demonstrates how to add an icon before the TextArea element.

```HtmlHelper
    @(Html.Kendo().TextArea()
        .Name("comment")
        .Placeholder("Add comment...")
        .Rows(5)
        .PrefixOptions(prefix => prefix.TemplateHandler("prefixTemplate"))
    )

    <script>
        function prefixTemplate() {
            return `${ kendo.ui.icon("plus") }${ kendo.ui.icon("comment") }`;
        }
    </script>
```
{% if site.core %}
```TagHelper
    <kendo-textarea name="comment"
        rows="5"
        placeholder="Add comment...">
        <prefix-options template-handler="prefixTemplate" />
    </kendo-textarea>

    <script>
        function prefixTemplate() {
            return `${ kendo.ui.icon("plus") }${ kendo.ui.icon("comment") }`;
        }
    </script>
```
{% endif %}

## Suffix

The suffix input adornment is an element positioned after the input field. Usually, it offers direct functionality related to the entered data, such as toggles for password visibility, formatting options, or the ability to clear the input. Set up the Suffix functionality through the `SuffixOptions()` configuration that provides the following options:

* `Icon()`&mdash;Adds an icon after the TextArea element. The option accepts the name of an existing icon in the Kendo UI theme or SVG content.
* `Template()`&mdash;Adds custom content for the suffix adornment of the TextArea.
* `Separator()`&mdash;By default, the separator is visible. Disable the `Separator()` option to remove the default separator of the suffix content. 

The following example demonstrates how to add an icon after the TextArea element.

```HtmlHelper
    @(Html.Kendo().TextArea()
        .Name("comment")
        .Placeholder("Add comment...")
        .Rows(5)
        .SuffixOptions(suffix => suffix.TemplateHandler("suffixTemplate"))
    )

    <script>
        function suffixTemplate() {
            return `${kendo.ui.icon("volume-up")}`;
        }
    </script>
```
{% if site.core %}
```TagHelper
    <kendo-textarea name="comment"
        rows="5"
        placeholder="Add comment...">
        <suffix-options template-handler="suffixTemplate" />
    </kendo-textarea>

    <script>
        function suffixTemplate() {
            return `${kendo.ui.icon("volume-up")}`;
        }
    </script>
```
{% endif %}


## See Also

* [Using the Prefix and Suffix of the TextArea for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/textarea/prefix-suffix)
* [Server-Side API](https://docs.telerik.com/{{ site.platform }}/api/textarea)
* [Client-Side API](https://docs.telerik.com/kendo-ui/api/javascript/ui/textarea)
