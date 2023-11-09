---
title: Overview
page_title: Overview
description: "Learn more about the Telerik UI RadioButton component for {{ site.framework }} and its built-in features like model binding, initially checked state, and a setting to disable the button."
previous_url: /helpers/navigation/radiobutton/overview
slug: htmlhelpers_radiobutton_aspnetcore
position: 0
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

* [Disabled RadioButton]({% slug disabledstate_radiobutton_aspnetcore %})—You can disable the RadioButton through its `.Enable(false)` configuration. 
* [Checked RadioButton]({% slug modelbinding_radiobutton_aspnetcore %})—The `Checked(true)` option allows you to initially check the component.
* [Model binding]({% slug modelbinding_radiobutton_aspnetcore %})—The RadioButton supports binding to a model.

>tip To learn more about the appearance, anatomy, and accessibility of the RadioButton, visit the [Progress Design System documentation](https://www.telerik.com/design-system/docs/components/radiobutton/)—an information portal offering rich component usage guidelines, descriptions of the available style variables, and globalization support details.


## Next Steps

* [Getting Started with the RadioButton]({% slug  aspnetcore_radiobutton_getting_started %})
* [Basic Usage of the RadioButton for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/radiobutton)

## See Also

* [RadioButton Server-Side API](/api/radiobutton)
{% if site.core %}
* [RadioButton in Razor Pages]({% slug razor_page_radiobutton_aspnetcore %})
{% endif %}
* [RadioButtonBuilder Server-Side API](https://docs.telerik.com/{{ site.platform }}/api/kendo.mvc.ui.fluent/radiobuttonbuilder)
* [Knowledge Base Section](/knowledge-base)

