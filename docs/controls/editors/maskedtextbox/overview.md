---
title: Overview
page_title: Overview | Kendo UI MaskedTextBox
description: "Learn how to initialize the Kendo UI MaskedTextBox widget and configure its behaviors."
slug: overview_kendoui_maskedtextbox_widget
position: 1
---

# MaskedTextBox Overview

The [Kendo UI MaskedTextBox widget](http://demos.telerik.com/kendo-ui/maskedtextbox/index) enables a controlled text input that is based on a specific format.

This specific format can be defined by using the [`mask`](/api/web/maskedtextbox#configuration-mask) option of the widget. Each mask can contain mask rules and mask literals. The mask literals are automatically entered for the user and cannot be removed.

The widget also has predefined rules which specify:
- Required or optional digit input.
- Required or optional letter input.
- Required or optional character input (allows any character).

For more information on its methods and configuration options, review the [API Reference of the MaskedTextBox](/api/web/maskedtextbox).

## Getting Started

### Initialize the MaskedTextBox

To initialize the MaskedTextBox, use the following example.

    <input id="maskedtextbox" />
    <script>
        $(document).ready(function(){
            $("#maskedtextbox").kendoMaskedTextBox({
                mask: "000000"
            });
        });
    </script>

When a MaskedTextBox is initialized, it decorates the `<input>` element with a `k-textbox` CSS class.

> **Important**
>
> The default mask is an empty string which allows any input. To restrict user input, define a mask value.

## Configuration

The MaskedTextBox provides configuration options that can be set during initialization. The available properties are:

* Value of the widget
* Mask value
* Custom mask rules
* Prompt char
* Culture name

For more information on its methods and configuration options, review the [API Reference of the MaskedTextBox](/api/web/maskedtextbox).

### Rules

The following mask rules are available and predefined:

- `0`&mdash;Digit. Accepts any digit between 0 and 9.
- `9`&mdash;Digit or space. Accepts any digit between 0 and 9 or space.
- `#`&mdash;Digit or space. Identical to **Rule 9**. In addition, allows the `+` (plus) and `-` (minus) signs.
- `L`&mdash;Letter. Restricts the input to a-z and A-Z letters. This rule is equivalent to [a-zA-Z] in regular expressions.
- `?`&mdash;Letter or space. Restricts the input to letters a-z and A-Z. This rule is equivalent to [a-zA-Z]|\s in regular expressions.
- `&`&mdash;Character. Accepts any character except a space. The rule is equivalent to `\S` in regular expressions.
- `C`&mdash;Character or space. Accepts any character. The rule is equivalent to `.` in regular expressions.
- `A`&mdash;Alphanumeric. Accepts letters and digits only.
- `a`&mdash;Alphanumeric or space. Accepts only letters, digits, and space.

> **Important**
>
> You can escape any of the masks by using the `\` character. The escaped rules turn into literals.

### Literals

Based on the current culture, the following mask literals are globalized:

- `.`&mdash;Decimal placeholder. The decimal separator is set according to the current culture used by Kendo UI.
- `,`&mdash;Thousands placeholder. The display character is set according to the current culture used by Kendo UI.
- `$`&mdash;Currency symbol. The display character is set according to the current culture used by Kendo UI.

> **Important**
>
> You can escape any of the literals by using the `\` character.

### Customize Mask Rules

The MaskedTextBox enables you to define custom mask rules during initialization. To customize a mask rule, define it in the [`rules`](/api/web/maskedtextbox#configuration-rules) option. The widget supports rules defined as regular expression or a function.

###### Example

    <input id="maskedtextbox">

    <script>
      $(document).ready(function(){
        $("#maskedtextbox").kendoMaskedTextBox({
          mask: "~^",
          rules: {
            "~": /[+-]/,
            "^": function (char) {
              return char === "^"; //allow ony "^" symbol
            }
          }
        });
      });
    </script>

> **Important**
>
> You can escape any of the predefined rules by using the [`rules`](/api/web/maskedtextbox#configuration-rules) option.

## Known Limitations

### Mobile Editing

To restrict the typed value, the MaskedTextBox listens to input events such as `keydown` and `keypress`.

> **Important**
> * In some mobile browsers, mostly Android or the Windows Mobile OS built-in browsers, those events do not trigger at all. This prevents the normal behavior of the MaskedTextBox because they are fundamental for the typing restriction.
> * Recent tests show that the MaskedTextBox works in the latest iOS OS version.

You cannot work around these issues, because no other reliable way to detect typing in mobile browsers exist&mdash;virtual keyboard does not raise any other specific events.

## See Also

* [How to Customize Masks through MVVM Binding]({% slug howto_customize_masks_through_mvvmbinding_mvvm_maskedtextbox %})
* [How to Show Custom Placeholder on Blur]({% slug howto_show_custom_placeholderon_blur_maskedtextbox %})
* [How to Use Custom Directive to Set Model Value]({% slug howto_use_raw_methodtoset_modelvalue_angularjs_maskedtextbox %})
* [How to Use Custom MVVM Binding to Set Model Value]({% slug howto_use_custommvvm_bindingto_setmodel_value_maskedtextbox %})
* [Overview of the ASP.NET MVC HtmlHelper Extension for the MaskedTextBox Widget](/aspnet-mvc/helpers/maskedtextbox/overview)
* [Overview of the MaskedTextBox JSP Tag]({% slug overview_maskedtextbox_uiforjsp %})
* [Overview of the MaskedTextBox PHP Class](/php/widgets/maskedtextbox/overview)
* [JavaScript API Reference](/api/javascript/ui/maskedtextbox)
