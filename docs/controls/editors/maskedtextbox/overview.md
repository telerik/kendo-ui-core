---
title: Overview
page_title: jQuery MaskedTextBox Documentation | MaskedTextBox Overview
description: "Get started with the jQuery MaskedTextBox by Kendo UI and learn how to create, initialize, and enable the widget."
slug: overview_kendoui_maskedtextbox_widget
position: 1
---

# MaskedTextBox Overview

The MaskedTextBox enables a controlled text input that is based on a specific format.

The widget enables you to define its value and mask value, and set custom mask rules, prompt characters, and culture names. Each mask can contain mask rules and mask literals. The mask literals are automatically entered for the user and cannot be removed. You can also use the MaskedTextBox predefined rules which specify the required or optional digit, letter, or character input.

* [Demo page for the MaskedTextBox](https://demos.telerik.com/kendo-ui/maskedtextbox/index)

## Initializing the MaskedTextBox

The following example demonstrates how to initialize the MaskedTextBox. When initialized, the MaskedTextBox decorates the `<input>` element with a `k-textbox` CSS class.

    <input id="maskedtextbox" />
    <script>
        $(document).ready(function(){
            $("#maskedtextbox").kendoMaskedTextBox({
                mask: "000000"
            });
        });
    </script>

## Functionality and Features

The MaskedTextBox supports the implementation of [mask rules]({% slug masks_kendoui_maskedtextbox_widget %}) to validate its input value.

## Known Limitations

To restrict the typed value, the MaskedTextBox "listens" to input events such as `keydown` and `keypress`.

> * In some mobile browsers, mostly Android or the Windows Mobile OS built-in browsers, those events do not trigger at all. As a result, the normal behavior of the MaskedTextBox is prevented because they are fundamental for the typing restriction.
> * Recent tests show that the MaskedTextBox works in the latest iOS OS version.

You cannot work around these issues, because no other reliable way to detect typing in mobile browsers exist&mdash;virtual keyboard does not raise any other specific events.

## See Also

* [Basic Usage of the MaskedTextBox (Demo)](https://demos.telerik.com/kendo-ui/maskedtextbox/index)
* [Using the API of the MaskedTextBox (Demo)](https://demos.telerik.com/kendo-ui/maskedtextbox/api)
* [JavaScript API Reference of the MaskedTextBox](/api/javascript/ui/maskedtextbox)
