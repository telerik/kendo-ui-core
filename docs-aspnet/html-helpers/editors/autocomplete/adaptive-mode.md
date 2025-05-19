---
title: Adaptiveness
page_title: Adaptiveness
description: "Learn how to configure the adaptive behavior of the the Telerik UI AutoComplete component for {{ site.framework }}."
slug: htmlhelpers_autocomplete_adaptive_mode_aspnetcore
position: 5
---

# Adaptiveness

Adaptiveness is an advanced capability that enhances the Telerik UI for {{ site.framework }} AutoComplete by enabling a completely new layout based on the screen size. It also allows you to adjust the displayed on-screen keyboard for a more user-friendly interaction on touchscreen devices.

<demo metaUrl="autocomplete/adaptive_mode/" height="600"></demo>

## Adaptive Mode

The AutoComplete supports an adaptive mode that provides a mobile-friendly rendering of its popup. To enable the adaptive rendering mode, set the [`AdaptiveMode()`](/api/kendo.mvc.ui.fluent/autocompletebuilder#adaptivemodekendomvcuiadaptivemode) property to `AdaptiveMode.Auto`.

> Starting with the 2025 Q2 release, when the adaptive rendering mode is enabled and the component is accessed on a mobile device, the popup will open as soon as the component receives focus. In previous versions, the popup only opened once the user began typing.

The AutoComplete component automatically adapts to the current screen size and changes its rendering accordingly. On medium-sized screens, the suggestion list is displayed as docked to the bottom of the screen, while on smaller screens, it is rendered as a full-screen modal dialog. In all other scenarios, including when the `AdaptiveMode()` option is not specified or is set to its default value of `AdaptiveMode.None`, the standard popup is rendered docked to the input of the component.

The adaptive mode changes the rendering of the AutoComplete popup element based on the screen resolution of the device (the horizontal value in `px`) with the following breakpoints:

* Small screens&mdash;up to 500 px.
* Medium screens&mdash;between 501 px and 768 px.
* Large screens&mdash;over 768 px.

The following example demonstrates how to enable the adaptive mode of the AutoComplete by using the `AdaptiveMode()` option.

```HtmlHelper
     @(Html.Kendo().AutoComplete()
        .Name("autocomplete")
        .DataTextField("ProductName")
        .Filter("contains")
        .AdaptiveMode(AdaptiveMode.Auto)
        .DataSource(source =>
        {
            source.Read(read =>
            {
                read.Action("Products_Read", "AutoComplete");
            })
            .ServerFiltering(true);
        })
    )
```
{% if site.core %}
```TagHelper
    @addTagHelper *, Kendo.Mvc

    <kendo-autocomplete name="autocomplete" 
        datatextfield="ProductName"
        filter="FilterType.Contains"
        adaptive-mode="AdaptiveMode.Auto"
        <datasource type="DataSourceTagHelperType.Custom" server-filtering="true">
            <transport>
                <read url="@Url.Action("Products_Read", "AutoComplete")" />
            </transport>
        </datasource>
    </kendo-autocomplete>
```
{% endif %}

## On-Screen Keyboard

To enhance the user experience of your application on mobile devices, you can configure the type of the on-screen keyboard for the AutoComplete component.

To display an on-screen keyboard when the user focuses the AutoComplete input, set the `InputMode()` property to any of the supported <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/inputmode#values" target="_blank">`inputmode`</a> HTML attribute values. Based on the defined value, the browser displays the respective virtual keyboard on the screen.

The following example demonstrates how to configure the most appropriate on-screen keyboard for the AutoComplete.

```HtmlHelper
     @(Html.Kendo().AutoComplete()
        .Name("autocomplete")
        .DataTextField("ProductName")
        .Filter("contains")
        .InputMode("search")
        .DataSource(source =>
        {
            source.Read(read =>
            {
                read.Action("Products_Read", "AutoComplete");
            })
            .ServerFiltering(true);
        })
    )
```
{% if site.core %}
```TagHelper
    @addTagHelper *, Kendo.Mvc

    <kendo-autocomplete name="autocomplete" 
        datatextfield="ProductName"
        filter="FilterType.Contains"
        input-mode="search"
        <datasource type="DataSourceTagHelperType.Custom" server-filtering="true">
            <transport>
                <read url="@Url.Action("Products_Read", "AutoComplete")" />
            </transport>
        </datasource>
    </kendo-autocomplete>
```
{% endif %}

## See Also

* [Adaptive Rendering of the Components]({% slug adaptive_rendering%})
* [Server-Side API of the AutoComplete HtmlHelper](/api/autocomplete)
{% if site.core %}
* [Server-Side API of the AutoComplete TagHelper](/api/taghelpers/autocomplete)
{% endif %}