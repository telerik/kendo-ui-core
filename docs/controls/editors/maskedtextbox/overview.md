---
title: Overview
page_title: Overview | Kendo UI MaskedTextBox
description: "Learn how to initialize the Kendo UI MaskedTextBox widget and configure its behaviors."
slug: overview_kendoui_maskedtextbox_widget
position: 1
---

# MaskedTextBox Overview

The [Kendo UI MaskedTextBox widget](http://demos.telerik.com/kendo-ui/maskedtextbox/index) allows controlled text input based on a specific format. This specific format can be defined using the [mask](/api/web/maskedtextbox#configuration-mask) option of the widget. Each mask can contain mask rules and mask literals. The mask literals will be automatically entered for the user and they cannot be removed. The widget also has predefined rules which specify:

- Required/optional digit input.
- Required/optional letter input.
- Required/optional character input (allow any character).

For a complete overview of the methods and configuration options MaskedTextBox applies, [review its API Reference](/api/web/maskedtextbox).

## Getting Started

### Initialize the MaskedTextBox

    <input id="maskedtextbox" />
    <script>
        $(document).ready(function(){
            $("#maskedtextbox").kendoMaskedTextBox({
                mask: "000000"
            });
        });
    </script>

When a MaskedTextBox is initialized, it will decorate the `<input>` element with a `k-textbox` CSS class.

> **Important**
>
> The default mask is an empty string, which allows any input. If you need to restrict user input, define a mask value.

## Configuration

MaskedTextBox provides configuration options that can be easily set during initialization. Some of the properties that can be controlled are:

*   Value of the widget
*   Mask value
*   Custom mask rules
*   Prompt char
*   Culture name

For a complete overview of the methods and configuration options MaskedTextBox applies, [review its API Reference](/api/web/maskedtextbox).

### Rules

The following mask rules are available and predefined:

- `0` - Digit. Accepts any digit between 0 and 9.
- `9` - Digit or space. Accepts any digit between 0 and 9 or space.
- `#` - Digit or space. Like **9** rule, but allows also the + (plus) and - (minus) signs.
- `L` - Letter. Restricts input to letters a-z and A-Z. This rule is equivalent to [a-zA-Z] in regular expressions.
- `?` - Letter or space. Restricts input to letters a-z and A-Z. This rule is equivalent to [a-zA-Z] in regular expressions.
- `&` - Character. Accepts any character except space. The rule is equivalent to *\S* in regular expressions.
- `C` - Character or space. Accepts any character. The rule is equivalent to *.* in regular expressions.
- `A` - Alphanumeric. Accepts letters and digits only.
- `a` - Alphanumeric or space. Accepts letters, digits and space only.

> **Important**
>
> Any mask rule can be escaped using the `\` character. An escaped rule is turned into a literal.

### Literals

The following mask literals are globalized based on the current culture:

- `.` - Decimal placeholder. The decimal separator will be set according to the current culture used by Kendo UI.
- `,` - Thousands placeholder. The display character will be set according to current culture used by Kendo UI.
- `$` - Currency symbol. The display character will be set according to current culture used by Kendo UI.

> **Importnat**
>
> Any of the aforementioned literals can be escaped using the `\` character.

### Customize Mask Rules

The MaskedTextBox widget provides the option to define custom mask rules during initialization. To customize a mask rule, define it in the [`rules`](/api/web/maskedtextbox#configuration-rules) option. The widget supports rules defined as regular expression or a function.

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
> Any of the predefined rules can be overridden through the [`rules`](/api/web/maskedtextbox#configuration-rules) option.

## Known Limitations

### Mobile Editing

The MaskedTextBox widget listens to input events, like `keydown` and `keypress`, to restrict the typed value.

> **Important**
> * In some mobile browsers, mostly Android or Windows Mobile OS built-in browsers, those events are not triggered at all. This prevents the normal behavior of the MaskedTextBox, as they are fundamental for the typing restriction.
> * Recent tests show that the MaskedTextBox works in the latest iOS OS.

Unfortunately, in those cases not much can be done, because there is no other reliable way to detect typing in mobile browsers&mdash;the virtual keyboard does not rise any other specific events.

## See Also

Other articles on Kendo UI MaskedTextBox and how-to examples:

* [How to Customize Masks through MVVM Binding]({% slug howto_customize_masks_through_mvvmbinding_mvvm_maskedtextbox %})
* [How to Show Custom Placeholder on Blur]({% slug howto_show_custom_placeholderon_blur_maskedtextbox %})
* [How to Use Custom Directive to Set Model Value]({% slug howto_use_raw_methodtoset_modelvalue_angularjs_maskedtextbox %})
* [How to Use Custom MVVM Binding to Set Model Value]({% slug howto_use_custommvvm_bindingto_setmodel_value_maskedtextbox %})
* [Overview of the ASP.NET MVC HtmlHelper Extension for the MaskedTextBox Widegt](/aspnet-mvc/helpers/maskedtextbox/overview)
* [Overview of the MaskedTextBox JSP Tag]({% slug overview_maskedtextbox_uiforjsp %})
* [Overview of the MaskedTextBox PHP Class](/php/widgets/maskedtextbox/overview)
* [JavaScript API Reference](/api/javascript/ui/maskedtextbox)
