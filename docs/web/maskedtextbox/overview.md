---
title: Overview
page_title: MaskedTextBox UI widget - documentation overview
description: How to create MaskedTextBox widget and deal with proper configuration of its behaviors.
---

# MaskedTextBox Overview

The MaskedTextBox widget allows controlled text input based on a specific format.
It can be defined using the [mask](/api/web/maskedtextbox#configuration-mask) option of the widget. Every mask can contain mask rules and
mask literals. The mask literals will be automatically entered for the user and they cannot be removed.
Widget also has predefined rules specifying:

- required/optional digit input
- required/optional letter input
- required/optional character input (allow any character)

For a complete overview of the MaskedTextBox's methods and configuration options, [review the MaskedTextBox API Reference](/api/web/maskedtextbox).

## Getting Started

### MaskedTextBox initialization
    
    <input id="maskedtextbox" />
    <script>
        $(document).ready(function(){
            $("#maskedtextbox").kendoMaskedTextBox({
                mask: "000000"
            });
        });
    </script>

When a MaskedTextBox is initialized, it will decorate the input element with a "k-textbox" CSS class.

> The default *mask* is an empty string, which allows any input. If you need to restrict user input, define a mask value.

### Configure MaskedTextBox behavior

The MaskedTextBox provides configuration options that can be
easily set during initialization. Some of the properties that can be
controlled are:

*   Value of the widget
*   Mask value
*   Define custom mask rules
*   Prompt char
*   Culture name

For a complete overview of the MaskedTextBox's methods and configuration options, [review the MaskedTextBox API Reference](/api/web/maskedtextbox).

### Predefined Mask Rules

The following mask rules are available:

- **0** - Digit. Accepts any digit between 0 and 9.
- **9** - Digit or space. Accepts any digit between 0 and 9 or space.
- **#** - Digit or space. Like **9** rule, but allows also (+) and (-) sings.
- **L** - Letter. Restricts input to letters a-z and A-Z. This rule is equivalent to [a-zA-Z] in regular expressions.
- **?** - Letter or space. Restricts input to letters a-z and A-Z. This rule is equivalent to [a-zA-Z] in regular expressions.
- **&** - Character. Accepts any character. The rule is equivalent to *\S* in regular expressions.
- **C** - Character or space. Accepts any character. The rule is equivalent to *.* in regular expressions.
- **A** - Alphanumeric. Accepts letters and digits only.
- **a** - Alphanumeric or space. Accepts letters, digits and space only.

> Any mask rule can be escaped using the "\" character. Escaped rule is turned into a literal.

### Globalized mask literals

The following mask literals are globalized based on the current culture:

- **.** - Decimal placeholder. The decimal separator will be set according to the current culture used by Kendo UI.
- **,** - Thousands placeholder. The display character will be set according to current culture used by Kendo UI.
- **$** - Currency symbol. The display character will be set according to current culture used by Kendo UI.

> Any of the aforementioned literals can be escaped using the "\" character.

### Define a custom mask rule

The MaskedTextBox widget provides the ability to define custom mask rules during initialization.
To accomplish this task define a rule in the [rules](/api/web/maskedtextbox#configuration-rules)
option. Widget supports rules defined as regular expression or a function:
    
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

> Any of the predefined rules can be overridden through the [rules](/api/web/maskedtextbox#configuration-rules) option.