---
title: Removing Unexpected Spacing Caused by Kendo Validator Elements
description: Learn how to prevent extra spacing caused by Kendo Validator elements when validation messages are inactive.
type: how-to
page_title: Preventing Layout Shifts with Kendo Validator Elements
meta_title: Preventing Layout Shifts with Kendo Validator Elements
slug: prevent-layout-shifts-kendo-validator-elements
tags: kendo-ui, validator, spacing, layout, css
res_type: kb
ticketid: 1715768
---

## Environment

<table>
<tbody>
<tr>
<td>Product</td>
<td>Kendo UI for jQuery Validator</td>
</tr>
<tr>
<td>Version</td>
<td>2026.2.520</td>
</tr>
</tbody>
</table>

## Description

When using the [Kendo UI for jQuery Validator](https://docs.telerik.com/kendo-ui/controls/editors/validator/overview), you may notice unexpected spacing in the layout. This issue occurs when the validation message elements (`.k-invalid-msg` or `.k-tooltip-validation`) introduce extra space even when no validation errors are present. This behavior can disrupt the alignment of adjacent elements, such as labels, inputs, or checkboxes.

This knowledge base article also answers the following questions:
- How to fix layout shifts caused by Kendo Validator?
- Why does Kendo Validator add extra spacing when no error is displayed?
- How to style Kendo Validator elements to avoid spacing issues?

## Solution

To prevent additional spacing caused by hidden validation messages, override the default CSS styles for the `.k-invalid-msg` element. Follow these steps:

1. Add the following CSS to ensure the validation message element takes up no space when hidden:

```css
.k-invalid-msg {
    display: none !important;
    margin: 0 !important;
    padding: 0 !important;
    height: 0 !important;
}
```

2. If your container uses `display: flex`, ensure the hidden validation message does not affect the layout:

```css
.k-invalid-msg {
    flex-shrink: 0;
    flex-grow: 0;
}
```

These changes remove any reserved space for inactive validation messages and ensure consistent layout spacing.

Example:

```dojo
 <style>     
      .k-invalid-msg {
        display: none !important;
        margin: 0 !important;
        padding: 0 !important;
        height: 0 !important;
      }
    </style>
    <div id="example">
      <div class="demo-section">
        <div id="validation-summary"></div>

        <form id="ticketsForm" class="k-form k-form-vertical">
          <ul class="k-form-group">
            <li class="k-form-field">
              <label for="fullname" class="k-form-label">Your Name</label>
              <span class="k-form-field-wrap">
                <input
                  type="text"
                  id="fullname"
                  name="fullname"
                  placeholder="Full name"
                  required
                  validationMessage="Enter {0}"
                />
              </span>
            </li>
            <li class="k-form-field">
              <div>
                <input
                  id="accept"
                  name="accept"
                  type="checkbox"
                  value="acceptPolicy"
                  required
                />
                <label
                  for="acceptPolicy"
                  >Label Text</label
                >
              </div>
            </li>

            <li class="k-form-buttons">
              <button class="k-button k-button-primary" type="submit">
                Submit
              </button>
            </li>
          </ul>
        </form>
      </div>
    </div>

    <style></style>

    <script>
      $(document).ready(function () {
        $("#fullname").kendoTextBox();
        $("#accept").kendoCheckBox();

        var validator = $("#ticketsForm")
          .kendoValidator()
          .data("kendoValidator");
        var validationSummary = $("#validation-summary");

        $("form").submit(function (event) {
          event.preventDefault();
          validator.validate();
        });
      });
    </script>
```

## See Also

- [Kendo UI for jQuery Validator Documentation](https://docs.telerik.com/kendo-ui/controls/editors/validator/overview)

