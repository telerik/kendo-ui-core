---
title: Prefix and Suffix
page_title: Prefix and Suffix
description: "Learn how to add custom items as prefix and suffix adornments to enhance the user interface interactivity when using the Telerik UI for {{ site.framework }} ComboBox."
slug: prefix_suffix_combobox
position: 8
---

# Prefix and Suffix

The ComboBox component provides options for enhancing the user interface interactivity by adding custom content as prefix and suffix adornments.

The prefix and suffix input adornments are elements positioned before and after the ComboBox input element, commonly used to clarify the expected data in the input, such as currency symbols or unit indicators, and provide direct functionality for the entered data, like password visibility toggles, formatting, and more.

## Prefix

The prefix input adornment is placed before the ComboBox field and provides an additional context that guides users in entering specific data, such as icons for currencies or unit indicators. To configure the Prefix functionality, use the `PrefixOptions()` configuration, which facilitates the following options:

* `Icon()`&mdash;Inserts an icon before the ComboBox element. The option accepts the name of an existing icon in the Kendo UI theme or SVG content.
* `Template()`&mdash;Adds custom content before the ComboBox element. You can use a variety of templating options like `TemplateId()`, `TemplateHandler()`, and more.
* `Separator()`&mdash;By default, the separator is visible. Disable the `Separator()` option to remove the default separator of the prefix content. 

The following example demonstrates how to set an icon as a prefix of the ComboBox component.

```HtmlHelper
    @(Html.Kendo().ComboBox()
        .Name("cities")
        .PrefixOptions(prefix => prefix.Icon("map-marker-target"))
        .Placeholder("Please select city...")
        .DataTextField("Text")
        .DataValueField("Value")
        .DataSource(dataSource =>
            dataSource.Read("ReadCountries", "ComboBox")
        )
        .HtmlAttributes(new { style = "width: 100%;" })
    )
```
{% if site.core %}
```TagHelper
    <kendo-combobox name="cities" style="width:100%;"
        placeholder="Please select city..."
        datatextfield="Text"
        datavaluefield="Value">
        <prefix-options icon="map-marker-target" />
        <datasource>
            <transport>
                <read url="@Url.Action("ReadCountries","ComboBox")" />
            </transport>
        </datasource>
    </kendo-combobox>
```
{% endif %}
```Controller
    public JsonResult ReadCountries()
    {
        List<SelectListItem> countries = GetCountries();
        return Json(countries);
    }

    private static List<SelectListItem> GetCountries()
    {
        return new List<SelectListItem>()
        {
            new SelectListItem{ Value = "1", Text = "Lisboa"},
            new SelectListItem{ Value = "2", Text = "Moscow"},
            new SelectListItem{ Value = "3", Text = "Napoli"},
            new SelectListItem{ Value = "4", Text = "Tokyo"},
            new SelectListItem{ Value = "5", Text = "Oslo"},
            new SelectListItem{ Value = "6", Text = "Pаris"},
            new SelectListItem{ Value = "7", Text = "Porto"},
            new SelectListItem{ Value = "8", Text = "Rome"},
            new SelectListItem{ Value = "9", Text = "Berlin"},
            new SelectListItem{ Value = "10",Text = "Nice"},
            new SelectListItem{ Value = "11",Text = "New York"},
            new SelectListItem{ Value = "12",Text = "Sao Paulo"},
            new SelectListItem{ Value = "13",Text = "Rio De Janeiro"},
            new SelectListItem{ Value = "14",Text = "Venice"},
            new SelectListItem{ Value = "15",Text = "Los Angeles"},
            new SelectListItem{ Value = "16",Text = "Madrid"},
            new SelectListItem{ Value = "17",Text = "Barcelona"},
            new SelectListItem{ Value = "18",Text = "Prague"},
            new SelectListItem{ Value = "19",Text = "Mexico City"},
            new SelectListItem{ Value = "20",Text = "Buenos Aires"}
        };
    }
```

## Suffix

The suffix input adornment is an element positioned after the input field. Usually, it offers direct functionality related to the entered data, such as toggles for password visibility, formatting options, or the ability to clear the input. Set up the Suffix functionality through the `SuffixOptions()` configuration that provides the following options:

* `Icon()`&mdash;Adds an icon after the ComboBox element. The option accepts the name of an existing icon in the Kendo UI theme or SVG content.
* `Template()`&mdash;Adds custom content for the suffix adornment of the ComboBox.
* `Separator()`&mdash;By default, the separator is visible. Disable the `Separator()` option to remove the default separator of the suffix content. 

The following example demonstrates how to add a button as a suffix of the ComboBox component.

```HtmlHelper
    @(Html.Kendo().ComboBox()
        .Name("cities")
        .SuffixOptions(suffix => suffix.TemplateId("suffixTemplate"))
        .Placeholder("Please select city...")
        .DataTextField("Text")
        .DataValueField("Value")
        .DataSource(dataSource =>
            dataSource.Read("ReadCountries", "ComboBox")
        )
        .HtmlAttributes(new { style = "width: 100%;" })
    )

    <script type="text/x-kendo-template" id="suffixTemplate">
        @(Html.Kendo().Button()
            .Name("suffix-copy-button")
            .Icon("copy")
            .FillMode(ButtonFillMode.Flat)  
            .ToClientTemplate()
        )
    </script>
```
{% if site.core %}
```TagHelper
    <kendo-combobox name="cities" style="width:100%;"
        placeholder="Please select city..."
        datatextfield="Text"
        datavaluefield="Value">
        <suffix-options template-id="suffixTemplate" />
        <datasource>
            <transport>
                <read url="@Url.Action("ReadCountries","ComboBox")" />
            </transport>
        </datasource>
    </kendo-combobox>

    <script type="text/html" id="suffixTemplate">
        <kendo-button name="suffix-copy-button" is-in-client-template="true"
            icon="copy"
            fill-mode="ButtonFillMode.Flat">
        </kendo-button>
    </script>
```
{% endif %}
```Controller
    public JsonResult ReadCountries()
    {
        List<SelectListItem> countries = GetCountries();
        return Json(countries);
    }

    private static List<SelectListItem> GetCountries()
    {
        return new List<SelectListItem>()
        {
            new SelectListItem{ Value = "1", Text = "Lisboa"},
            new SelectListItem{ Value = "2", Text = "Moscow"},
            new SelectListItem{ Value = "3", Text = "Napoli"},
            new SelectListItem{ Value = "4", Text = "Tokyo"},
            new SelectListItem{ Value = "5", Text = "Oslo"},
            new SelectListItem{ Value = "6", Text = "Pаris"},
            new SelectListItem{ Value = "7", Text = "Porto"},
            new SelectListItem{ Value = "8", Text = "Rome"},
            new SelectListItem{ Value = "9", Text = "Berlin"},
            new SelectListItem{ Value = "10",Text = "Nice"},
            new SelectListItem{ Value = "11",Text = "New York"},
            new SelectListItem{ Value = "12",Text = "Sao Paulo"},
            new SelectListItem{ Value = "13",Text = "Rio De Janeiro"},
            new SelectListItem{ Value = "14",Text = "Venice"},
            new SelectListItem{ Value = "15",Text = "Los Angeles"},
            new SelectListItem{ Value = "16",Text = "Madrid"},
            new SelectListItem{ Value = "17",Text = "Barcelona"},
            new SelectListItem{ Value = "18",Text = "Prague"},
            new SelectListItem{ Value = "19",Text = "Mexico City"},
            new SelectListItem{ Value = "20",Text = "Buenos Aires"}
        };
    }
```

## See Also

* [Using the Prefix and Suffix of the ComboBox for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/combobox/prefix-suffix)
* [Server-Side API](https://docs.telerik.com/{{ site.platform }}/api/combobox)
* [Client-Side API](https://docs.telerik.com/kendo-ui/api/javascript/ui/combobox)
