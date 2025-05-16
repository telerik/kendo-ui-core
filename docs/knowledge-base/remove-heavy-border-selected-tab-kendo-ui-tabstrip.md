---
title: Removing Heavy Border Around Selected Tab in Kendo UI TabStrip
description: Learn how to remove the heavy border around the selected tab in the Kendo UI TabStrip component using CSS.
type: how-to
page_title: Removing Focus Border from Selected Tab in Kendo UI TabStrip
slug: remove-heavy-border-selected-tab-kendo-ui-tabstrip
tags: kendo-ui, tabstrip, focus, border, css
res_type: kb
ticketid: 1682162
---

## Environment

<table>
<tbody>
<tr>
<td>Product</td>
<td>Kendo UI TabStrip</td>
</tr>
<tr>
<td>Version</td>
<td>2024.1.319 or newer</td>
</tr>
</tbody>
</table>

## Description

When using the [Kendo UI TabStrip](https://docs.telerik.com/kendo-ui/api/javascript/ui/tabstrip) component, a heavy gray border appears around the selected or focused tab. This style is applied by default to enhance accessibility but may not suit certain design preferences or themes, such as bootstrap-3 or classic themes. To remove this border, custom CSS can be applied.

This knowledge base article also answers the following questions:
- How to change the appearance of a selected tab in Kendo UI TabStrip?
- How to remove focus styling in Kendo UI TabStrip?
- How to update tab design in Kendo UI TabStrip?

## Solution

To remove the heavy border around the selected tab in Kendo UI TabStrip, apply the following CSS rule:

```css
.k-tabstrip-items-wrapper .k-item:focus,
.k-tabstrip-items-wrapper .k-item.k-focus {
    box-shadow: none;
}
```

### Steps:
1. Add the above CSS code to your stylesheet.
2. Ensure the stylesheet is properly linked to your application, so the rule takes effect.

### Example:

```dojo
        <div id="tabstrip">
          <ul>
            <li class="k-active">Paris</li>
            <li>New York</li>
            <li>London</li>
            <li>Moscow</li>
          </ul>
          <div>
            <div class="weather">
              <h2>17<span>&ordm;C</span></h2>
              <p>Rainy weather in Paris.</p>
            </div>
          </div>
          <div>
            <div class="weather">
              <h2>29<span>&ordm;C</span></h2>
              <p>Sunny weather in New York.</p>
            </div>
          </div>
          <div>
            <div class="weather">
              <h2>21<span>&ordm;C</span></h2>
              <p>Sunny weather in London.</p>
            </div>
          </div>
          <div>
            <div class="weather">
              <h2>16<span>&ordm;C</span></h2>
              <p>Cloudy weather in Moscow.</p>
            </div>
          </div>
        </div>
      <style>
        .k-tabstrip-items-wrapper .k-item:focus,
        .k-tabstrip-items-wrapper .k-item.k-focus {
          box-shadow: none;
        }
      </style>

      <script>
        $(document).ready(function () {
          $("#tabstrip").kendoTabStrip({
            animation: {
              open: {
                effects: "fadeIn",
              }
            }
          });
        });
      </script>
```

### Note:
This solution applies to all themes, including bootstrap-3 and classic themes.

## See Also

- [Kendo UI TabStrip Documentation](https://docs.telerik.com/kendo-ui/controls/tabstrip/overview)
- [Kendo UI TabStrip API Documentation](https://docs.telerik.com/kendo-ui/api/javascript/ui/tabstrip)

