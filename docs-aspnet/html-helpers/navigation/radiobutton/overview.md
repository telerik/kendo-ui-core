---
title: Overview
page_title: Overview
description: "Learn the basics when working with the Telerik UI RadioButton component for {{ site.framework }}."
previous_url: /helpers/navigation/radiobutton/overview
slug: htmlhelpers_radiobutton_aspnetcore
position: 1
---

# {{ site.framework }} RadioButton Overview

{% if site.core %}
The Telerik UI RadioButton TagHelper and HtmlHelper for {{ site.framework }} are server-side wrappers for the Kendo UI RadioButton widget.
{% else %}
The Telerik UI RadioButton HtmlHelper for {{ site.framework }} is a server-side wrapper for the Kendo UI RadioButton widget.
{% endif %}

The RadioButton is rendered as an `input type='radio'` element that is immediately followed by a `label` element. The styling is implemented with the `k-radio` class that is attached to the `input` element and the `k-radio-label` class that is attached to the `label` element.

* [Demo page for the RadioButton](https://demos.telerik.com/{{ site.platform }}/radiobutton/index)

## Initializing the RadioButton

The following example demonstrates how to initialize the RadioButton.

```HtmlHelper
    @(Html.Kendo().RadioButton()
        .Name("MyRadioButton")
        .Label("I agree")
        .Checked(true))
```
{% if site.core %}
```TagHelper
    <kendo-radiobutton name="MyRadioButton" label="I agree" checked="true"></kendo-radiobutton>
```
{% endif %}

## Functionality and Features

* [Disabled RadioButton]({% slug disabledstate_radiobutton_aspnetcore %})
* [Checked RadioButton]({% slug modelbinding_radiobutton_aspnetcore %})
* [Model binding]({% slug modelbinding_radiobutton_aspnetcore %})

## See Also

* [RadioButton Server-Side API](/api/radiobutton)
* [RadioButtonBuilder Server-Side API](https://docs.telerik.com/{{ site.platform }}/api/Kendo.Mvc.UI.Fluent/RadioButtonBuilder)
