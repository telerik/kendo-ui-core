---
title: Prefix and Suffix
page_title: Prefix and Suffix
description: "Learn how to add custom items as prefix and suffix adornments to enhance the user interface interactivity when using the Telerik UI for {{ site.framework }} AutoComplete."
slug: prefix_suffix_autocomplete
position: 10
---

# Prefix and Suffix

The AutoComplete component provides options for enhancing the user interface interactivity by adding custom content as prefix and suffix adornments.

The prefix and suffix input adornments are elements positioned before and after the AutoComplete input element, commonly used to clarify the expected data in the input, such as currency symbols or unit indicators, and provide direct functionality for the entered data, like password visibility toggles, formatting, and more.

## Prefix

The prefix input adornment is placed before the AutoComplete field and provides an additional context that guides users in entering specific data, such as icons for currencies or unit indicators. To configure the Prefix functionality, use the `PrefixOptions()` configuration, which facilitates the following options:

* `Icon()`&mdash;Inserts an icon before the AutoComplete element. The option accepts the name of an existing icon in the Kendo UI theme or SVG content.
* `Template()`&mdash;Adds custom content before the AutoComplete element. You can use a variety of templating options like `TemplateId()`, `TemplateHandler()`, and more.
* `Separator()`&mdash;By default, the separator is visible. Disable the `Separator()` option to remove the default separator of the prefix content. 

The following example demonstrates how to set an icon as a prefix of the AutoComplete component.

```HtmlHelper
    @(Html.Kendo().AutoComplete()
        .Name("autocomplete")
        .PrefixOptions(prefix => prefix.Icon("user"))
        .Placeholder("Select customers...")
        .DataTextField("ContactName")
        .DataSource(source =>
        {
            source.Read(read =>
            {
                read.Action("GetCustomers", "Home");
            });
        })
    )
```
{% if site.core %}
```TagHelper
    <kendo-autocomplete name="autocomplete"
        placeholder="Select customers..."
        datatextfield="ContactName">
        <prefix-options icon="user"/>
        <datasource type="DataSourceTagHelperType.Custom">
            <transport>
                <read url="@Url.Action("GetCustomers", "Home")" />
            </transport>
        </datasource>
    </kendo-autocomplete>
```
{% endif %}
```Controller
    public ActionResult GetCustomers()
    {
        List<CustomerViewModel> customers = GetData();
        return Json(customers);
    }
```

## Suffix

The suffix input adornment is an element positioned after the input field. Usually, it offers direct functionality related to the entered data, such as toggles for password visibility, formatting options, or the ability to clear the input. Set up the Suffix functionality through the `SuffixOptions()` configuration that provides the following options:

* `Icon()`&mdash;Adds an icon after the AutoComplete element. The option accepts the name of an existing icon in the Kendo UI theme or SVG content.
* `Template()`&mdash;Adds custom content for the suffix adornment of the AutoComplete.
* `Separator()`&mdash;By default, the separator is visible. Disable the `Separator()` option to remove the default separator of the suffix content. 

The following example demonstrates how to add a button as a suffix of the AutoComplete component.

```HtmlHelper
    @(Html.Kendo().AutoComplete()
        .Name("autocomplete")
        .SuffixOptions(suffix => suffix.TemplateId("suffixTemplate"))
        .Placeholder("Select customers...")
        .DataTextField("ContactName")
        .DataSource(source =>
        {
            source.Read(read =>
            {
                read.Action("GetCustomers", "Home");
            });
        })
    )

    <script type="text/x-kendo-template" id="suffixTemplate">
        @(Html.Kendo().Button()
            .Name("suffix-search-button")
            .Content("Search")
            .FillMode(ButtonFillMode.Flat)
            .ToClientTemplate()
        )
    </script>
```
{% if site.core %}
```TagHelper
    <kendo-autocomplete name="autocomplete"
        placeholder="Select customers..."
        datatextfield="ContactName">
        <suffix-options template-id="suffixTemplate" />
        <datasource type="DataSourceTagHelperType.Custom">
            <transport>
                <read url="@Url.Action("GetCustomers", "Home")" />
            </transport>
        </datasource>
    </kendo-autocomplete>

    <script type="text/html" id="suffixTemplate">
        <kendo-button name="suffix-search-button" is-in-client-template="true"
            fill-mode="ButtonFillMode.Flat">
            Search
        </kendo-button>
    </script>
```
{% endif %}
```Controller
    public ActionResult GetCustomers()
    {
        List<CustomerViewModel> customers = GetData();
        return Json(customers);
    }
```

## See Also

* [Using the Prefix and Suffix of the AutoComplete for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/autocomplete/prefix-suffix)
* [Server-Side API](https://docs.telerik.com/{{ site.platform }}/api/autocomplete)
* [Client-Side API](https://docs.telerik.com/kendo-ui/api/javascript/ui/autocomplete)
