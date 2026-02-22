---
title: Buttons
page_title: Buttons
description: "Get started with the Telerik UI for {{ site.framework }} Form and learn how to configure the buttons."
components: ["form"]
slug: form_aspnetcore_buttons
position: 7
---

{% if site.core %}
    {% assign ButtonsTemplateViewType = "IHtmlContent templateView" %}
{% else %}
    {% assign ButtonsTemplateViewType = "MvcHtmlString templateView" %}
{% endif %}

# Buttons

By default, the Form renders **Submit** and **Clear** buttons. To customize the default buttons, use the following customization options:

| Option | Description | When to Use |
|--------|-------------|-------------|
| [Templates](#setting-the-buttons-template) | Specify a custom template for rendering the Form buttons | When you need complete control over buttons appearance, layout, or behavior |
| [**Clear** Button Visibility](#toggling-the-clear-button) | Toggles the visibility of the default **Clear** button | When you want to hide the default **Clear** button or implement a custom clearing functionality |

## Setting the Buttons Template

The Form allows you to specify a template that will render of the Form **Submit** and **Clear** buttons. You can use any of the available [`ButtonsTemplate*`](/api/form) overloads{% if site.core %} or the `<buttons-template>` child tag or [`buttons-template*`](/api/taghelpers/form) TagHelper attributes{% endif %}.

```HtmlHelper
     @(Html.Kendo().Form()
          .Name("form")
          .ButtonsTemplate("<button>Submit</button>")
     )
```
{% if site.core %}
```TagHelper
    <kendo-form name="form">
        <buttons-template>
            <button>Submit</button>
        </buttons-template>
    </kendo-form>
```
{% endif %}

## Toggling the Clear Button

As of the 2025 Q1 release, the Form enables you to toggle the visibility state of the Clear Button.

```HtmlHelper
     @(Html.Kendo().Form()
          .Name("form")
          .ClearButton(false)
     )
```
{% if site.core %}
```TagHelper
    <kendo-form name="form"
                clear-button="false">
    </kendo-form>
```
{% endif %}

## See Also

* [API Demo of the Form HtmlHelper for {{ site.framework }}](https://demos.telerik.com/{{ site.platform }}/form/api)
* [Form Server-Side API](/api/form)
{% if site.core %}
* [Form TagHelper API](https://docs.telerik.com/aspnet-core/api/taghelpers/form)
{% endif %}