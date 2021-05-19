---
title: Validation
page_title: jQuery MaskedTextBox Documentation | Validation
description: "Get started with the jQuery MaskedTextBox by Kendo UI and use its predefined and custom masks."
slug: masks_kendoui_maskedtextbox_widget
position: 2
---

# Validation

The MaskedTextBox provides a set of predefined mask rules and enables you to modify them.

The default MaskedTextBox mask is an empty string which allows for any type of user input. To restrict user input, define a mask value.

## Predefined Masks

The MaskedTextBox supports the following predefined mask rules:
- `0`&mdash;Digit. Accepts any digit between 0 and 9.
- `9`&mdash;Digit or space. Accepts any digit between 0 and 9 or space.
- `#`&mdash;Digit or space. Identical to **Rule 9**. In addition, allows the `+` (plus) and `-` (minus) signs.
- `L`&mdash;Letter. Restricts the input to a-z and A-Z letters. This rule is equivalent to [a-zA-Z] in regular expressions.
- `?`&mdash;Letter or space. Restricts the input to letters a-z and A-Z. This rule is equivalent to [a-zA-Z]|\s in regular expressions.
- `&`&mdash;Character. Accepts any character except a space. The rule is equivalent to `\S` in regular expressions.
- `C`&mdash;Character or space. Accepts any character. The rule is equivalent to `.` in regular expressions.
- `A`&mdash;Alphanumeric. Accepts letters and digits only.
- `a`&mdash;Alphanumeric or space. Accepts only letters, digits, and space.

> To escape any of the masks, use the `\` character. The escaped rules are transformed into literals.

## Literals

Based on the current culture, the following mask literals are globalized:
- `.`&mdash;Decimal placeholder. The decimal separator is set according to the current culture used by Kendo UI.
- `,`&mdash;Thousands placeholder. The display character is set according to the current culture used by Kendo UI.
- `$`&mdash;Currency symbol. The display character is set according to the current culture used by Kendo UI.

> To escape any of the literals, use the `\` character.

## Custom Masks

The MaskedTextBox enables you to define custom mask rules during initialization. To customize a mask rule, define it in the [`rules`](/api/web/maskedtextbox#configuration-rules) option. The widget supports rules that are defined as a regular expression or a function.

> To escape any of the predefined rules, use the [`rules`](/api/web/maskedtextbox#configuration-rules) option.

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

## See Also

* [Validating User Input in the MaskedTextBox (Demo)](https://demos.telerik.com/kendo-ui/maskedtextbox/validation)
* [JavaScript API Reference of the MaskedTextBox](/api/javascript/ui/maskedtextbox)
