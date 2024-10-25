---
title: Overview
page_title: jQuery MaskedTextBox Documentation - MaskedTextBox Overview
description: "Get started with the jQuery MaskedTextBox by Kendo UI and learn how to create, initialize, and enable the widget."
slug: overview_kendoui_maskedtextbox_widget
position: 0
---

# {{ site.product }} MaskedTextBox Overview

The MaskedTextBox enables a controlled text input that is based on a specific format.

The widget enables you to define its value and mask value, and set custom mask rules, prompt characters, and culture names. Each mask can contain mask rules and mask literals. The mask literals are automatically entered for the user and cannot be removed. You can also use the MaskedTextBox predefined rules which specify the required or optional digit, letter, or character input.

![Kendo UI for jQuery MaskedTextBox Overview](maskedtextbox-overview.png)

## Functionality and Features

* [Validation]({% slug masks_kendoui_maskedtextbox_widget %})&mdash;Check how to use the pre-defined rules and how to customize them.
* [Appearance]({% slug maskedtextbox_appearance %})&mdash;Explore the styling options of the MaskedTextBox component.
* [Labels]({% slug labels_maskedtextbox %})&mdash;Check how you can use the label feature of the component.
* [Prefix and suffix]({% slug prefix_suffix_maskedtextbox %})&mdash;The MaskedTextBox component provides options to add custom content as prefix and suffix adornments.

>tip To learn more about the appearance, anatomy, and accessibility of the MaskedTextBox, visit the [Progress Design System documentation](https://www.telerik.com/design-system/docs/components/maskedtextbox/)—an information portal offering rich component usage guidelines, descriptions of the available style variables, and globalization support details.

## Known Limitations

To restrict the typed value, the MaskedTextBox "listens" to input events such as `keydown` and `keypress`.

> * In some mobile browsers, mostly Android or the Windows Mobile OS built-in browsers, those events do not trigger at all. As a result, the normal behavior of the MaskedTextBox is prevented because they are fundamental for the typing restriction.
> * Recent tests show that the MaskedTextBox works in the latest iOS OS version.

You cannot work around these issues, because no other reliable way to detect typing in mobile browsers exist&mdash;virtual keyboard does not raise any other specific events.

## Next Steps 

* [Getting Started with the Kendo UI MaskedTextBox for jQuery]({% slug getting_started_kendoui_maskedtextbox %})
* [Overview of the MaskedTextBox (Demo)](https://demos.telerik.com/kendo-ui/maskedtextbox/index)
* [JavaScript API Reference of the MaskedTextBox](/api/javascript/ui/maskedtextbox)

## See Also

* [Overview of the MaskedTextBox (Demo)](https://demos.telerik.com/kendo-ui/maskedtextbox/index)
* [Using the API of the MaskedTextBox (Demo)](https://demos.telerik.com/kendo-ui/maskedtextbox/api)
* [JavaScript API Reference of the MaskedTextBox](/api/javascript/ui/maskedtextbox)
