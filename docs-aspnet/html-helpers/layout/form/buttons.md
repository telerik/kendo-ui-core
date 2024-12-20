---
title: Buttons
page_title: Buttons
description: "Get started with the Telerik UI for {{ site.framework }} Form and learn how to configure the buttons."
slug: form_aspnetcore_buttons
position: 7
---

# Buttons

The Buttons functionality of the {{ site.product }} Form allows you to alter both the Submit and Clear buttons.

## Setting the Buttons Template

The Form allows you to specify a template which will be used for the rendering of the Form buttons.

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