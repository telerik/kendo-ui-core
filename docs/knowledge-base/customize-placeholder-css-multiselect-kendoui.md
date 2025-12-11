---
title: Customizing Placeholder CSS in MultiSelect
description: Learn how to change the placeholder text color in a Kendo UI MultiSelect.
type: how-to
page_title: How to Customize Placeholder CSS in Kendo UI MultiSelect
slug: customize-placeholder-css-multiselect-kendoui
tags: kendo ui, multiselect, css, customization, placeholder, style
res_type: kb
components: ["multiselect"]
ticketid: 1670626
---

## Environment

<table>
<tbody>
<tr>
<td>Product</td>
<td>MultiSelect for Progress® Kendo UI®</td>
</tr>
<tr>
<td>Version</td>
<td>2024.4.1112</td>
</tr>
</tbody>
</table>

## Description

Changing the CSS of the placeholder in the [MultiSelect](https://docs.telerik.com/kendo-ui/api/javascript/ui/multiselect) component is required to improve its appearance. Specifically, the goal is to modify the placeholder text color from black to red.

This KB article also answers the following questions:
- How can I customize the placeholder color in a Kendo UI MultiSelect?
- What is the method to change the style of a MultiSelect placeholder?
- Can I target a specific MultiSelect component for placeholder customization?

## Solution

To change the placeholder text color in the MultiSelect component, you can use CSS. There are two approaches to achieve this:

### Global Customization

To change the placeholder color globally for all MultiSelect components on the page, you can target the `.k-readonly` class used within the MultiSelect input. Add the following CSS to your page:

```css
<style>      
  .k-multiselect input.k-input-inner.k-readonly {
    color: red !important; /* Change 'red' to your preferred color */
  }
</style>
```

Below is an example:
```dojo
<style>      
      .k-multiselect input.k-input-inner.k-readonly{
        color: red !important;
      }
    </style>

    <select id="multiselect" multiple="multiple">
      <option>Item1</option>
      <option>Item2</option>
    </select>
    <script>
      $("#multiselect").kendoMultiSelect({
        placeholder: "Select..."
      });
    </script>
```

### Component-Specific Customization

To change the placeholder color for a specific MultiSelect component, use its ID to target it with JavaScript. This approach allows for fine-grained control over the styling of individual components. Implement the following JavaScript code:

```javascript
$('#multiselect').parent().find('.k-input-inner.k-readonly').css('color', 'green'); // Change 'green' to your preferred color
```

Replace `#multiselect` with the ID of your specific MultiSelect component.

Runnable example:

```dojo
<select id="multiselect" multiple="multiple">
      <option>Item1</option>
      <option>Item2</option>
    </select>
    <script>
      $("#multiselect").kendoMultiSelect({
        placeholder: "Select..."
      });

      $('#multiselect').parent().find('.k-input-inner.k-readonly').css('color', 'green')
    </script>
```


## See Also

- [MultiSelect Overview](https://docs.telerik.com/kendo-ui/controls/editors/multiselect/overview)
- [MultiSelect API Reference](https://docs.telerik.com/kendo-ui/api/javascript/ui/multiselect)
