---
title: Hiding Literal Mask Characters in Kendo MaskedTextBox for UI for ASP.NET Core
description: Learn how to handle literal mask characters in Kendo UI for ASP.NET Core MaskedTextBox by using JavaScript for custom behavior.
type: how-to
page_title: How to Hide Mask Literals in Kendo MaskedTextBox for ASP.NET Core
meta_title: How to Hide Mask Literals in Kendo MaskedTextBox for ASP.NET Core
slug: hide-mask-literals-kendo-maskedtextbox
tags: maskedtextbox, ui for asp.net core, mask, literals, custom behavior
res_type: kb
ticketid: 1719866
---

## Environment

<table>
<tbody>
<tr>
<td>Product</td>
<td>MaskedTextBox for UI for ASP.NET Core</td>
</tr>
<tr>
<td>Version</td>
<td>2026.1.212</td>
</tr>
</tbody>
</table>

## Description

The Kendo UI for ASP.NET Core [MaskedTextBox](https://docs.telerik.com/aspnet-core/html-helpers/editors/maskedtextbox/overview) does not support hiding literal mask characters (such as hyphens) when the input is blank or focused. By design, mask literals defined in the `mask` (e.g., `-`) are always visible in the input. This behavior is controlled by the component and cannot be altered using built-in configuration options.

To achieve a behavior where the masked text box appears blank initially and displays mask literals only upon typing, JavaScript is necessary for custom handling.

This knowledge base article also answers the following questions:
- How can I make mask literals invisible in Kendo MaskedTextBox?
- Can I hide the hyphen in a MaskedTextBox until a user starts typing?
- How to customize literal character display in Kendo MaskedTextBox?

## Solution

To implement a custom behavior where the MaskedTextBox appears blank and adds mask literals as the user types, use JavaScript. The following example demonstrates clearing the input on focus and applying mask formatting dynamically:

```csharp
@(Html.Kendo().MaskedTextBox()
    .Name("RFPNumber")
    .Mask("AAAAAA-00-L-AAAA") // Define the mask
    .PromptChar(" ") // Set the prompt character to a space
    .HtmlAttributes(new { style = "text-transform:uppercase;", id = "RNumber" }) // Apply additional attributes
    .Value("") // Initialize with an empty value
)
```

```javascript
$(document).ready(function() {
  let maskedInput = $("#RNumber").data("kendoMaskedTextBox");

  // Clear the input on focus
  $("#RNumber").focus(function() {
    maskedInput.value("");
  });

  // Mask literals will still appear as the user types
});
```

### Notes
1. This approach clears the input field when it gains focus.
2. Mask literals (e.g., `-`) will still appear as part of the mask when the user starts typing.
3. This solution requires JavaScript and does not fully hide literals as part of the MaskedTextBox's built-in functionality.


