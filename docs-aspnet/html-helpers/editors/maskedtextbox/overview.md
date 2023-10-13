---
title: Overview
page_title: Overview
description: "Learn the basics when working with the Telerik UI MaskedTextBox for {{ site.framework }}."
previous_url: /helpers/html-helpers/maskedtextbox, /helpers/editors/maskedtextbox/overview
slug: htmlhelpers_maskedtextbox_aspnetcore
position: 0
---

# {{ site.framework }} MaskedTextBox Overview

{% if site.core %}
The Telerik UI MaskedTextBox TagHelper and HtmlHelper for {{ site.framework }} are server-side wrappers for the Kendo UI MaskedTextBox widget.
{% else %}
The Telerik UI MaskedTextBox HtmlHelper for {{ site.framework }} is a server-side wrapper for the Kendo UI MaskedTextBox widget.
{% endif %}

The MaskedTextBox enables a controlled text input that is based on a specific format. The helper enables you to define its value and mask value, and set custom mask rules, prompt characters, and culture names. Each mask can contain mask rules and mask literals. The mask literals are automatically entered for the user and cannot be removed. You can also use the MaskedTextBox predefined rules which specify the required or optional digit, letter, or character input.

* [Demo page for the MaskedTextBox HtmlHelper](https://demos.telerik.com/{{ site.platform }}/maskedtextbox/index)
{% if site.core %}
* [Demo page for the MaskedTextBox TagHelper](https://demos.telerik.com/aspnet-core/maskedtextbox/tag-helper)
{% endif %}

## Basic Configuration

The following example demonstrates the basic configuration for the MaskedTextBox.

```HtmlHelper
	@(Html.Kendo().MaskedTextBox()
		.Name("maskedtextbox") // The name of the MaskedTextBox is mandatory. It specifies the "id" attribute of the MaskedTextBox.
		.Mask("(000) 000-0000") // Set the mask value of the MaskedTextBox.
		.Value("(123) 345-6789") // Set the value of the MaskedTextBox.
	)
```
{% if site.core %}
```TagHelper
    <kendo-maskedtextbox name="phone_number" mask="(999) 000-0000" value="555 123 4567"></kendo-maskedtextbox>
```
{% endif %}

## Functionality and Features

* [Mask rules]({% slug validation_maskedtextbox_aspnetcore %})—You can configure a variety of predefined masks as well as custom masks in the MaskedTextBox.
* [Globalization]({% slug globalization_maskedtextbox_aspnetcore %})—The globalization process combines the translation of component messages (localization) with adapting them to specific cultures (internationalization and right-to-left support).
* [Accessibility]({% slug accessibility_maskedtextbox_aspnetcore %})—The MaskedTextBox is accessible by screen readers and provides WAI-ARIA, Section 508, WCAG 2.2, and keyboard support.

>tip To learn more about the appearance, anatomy, and accessibility of the MaskedTextBox, visit the [Progress Design System documentation](https://www.telerik.com/design-system/docs/components/maskedtextbox/)—an information portal offering rich component usage guidelines, descriptions of the available style variables, and globalization support details.

## Next Steps
* [Basic Usage of the MaskedTextBox HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/maskedtextbox/index)
{% if site.core %}
* [Basic Usage of the MaskedTextBox TagHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/maskedtextbox/tag-helper)
{% endif %}

## See Also
* [Using the API of the MaskedTextBox for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/maskedtextbox/api)
* [Knowledge Base Section](/knowledge-base)


