---
title: Styling MultiSelect Tags with Background Colors
description: Learn how to fully style the tags in MultiSelect for Progress® Kendo UI® for jQuery with custom background colors using JavaScript.
type: how-to
page_title: Applying Full Background Color to MultiSelect Tags in Progress® Kendo UI® for jQuery
slug: multiselect-tag-background-color
tags: multiselect, kendo ui, tagtemplate, styling, javascript, events
res_type: kb
ticketid: 1688326
---

## Environment

<table>
<tbody>
<tr>
<td>Product</td>
<td>MultiSelect for Progress® Kendo UI® for jQuery</td>
</tr>
<tr>
<td>Version</td>
<td>2025.1.227</td>
</tr>
</tbody>
</table>

## Description

When using the MultiSelect component in Progress® Kendo UI® for jQuery, the tags may appear partially styled if you use the [`tagTemplate`](/api/javascript/ui/multiselect/configuration/tagtemplate) to set a background color. This happens because only the inner `<span>` element is affected by the custom template, while the outer frame remains styled with the default gray color. I want to apply the background color to the entire tag, including its frame.

This knowledge base article also answers the following questions:  
- How to style the entire MultiSelect tag in Kendo UI?  
- How to apply dynamic background colors to tags in MultiSelect?  
- Can I use JavaScript events to change MultiSelect tag colors?  

## Solution

To fully style the tags in the MultiSelect component, use the following approach:

1. Add a custom class to the `tagTemplate`.
2. Use JavaScript to dynamically set the background color of the closest parent element with the `k-button` class, which represents the tag's container.

### Steps

1. **Define `tagTemplate` with a custom class:**
   ```html
   <script id="tagTemplate" type="text/x-kendo-template">
       <span class="custom">
           #: name #
       </span>
   </script>
   ```

2. **Handle the [`change`](/api/javascript/ui/multiselect/events/change) and [`dataBound`](/api/javascript/ui/multiselect/events/databound) events to apply styles:**
   Use JavaScript to find the parent element of the inner `span` and apply the desired background color. Example:

   ```javascript
   change: function (e) {
       $(".custom").closest(".k-button").css("background-color", "salmon");
   },
   dataBound: function (e) {
       $(".custom").closest(".k-button").css("background-color", "salmon");
   }
   ```

3. **Ensure initial values are styled:**
   The `dataBound` event is particularly useful for styling tags when the MultiSelect has initial values.

### Example

Here is an example demonstrating the implementation:

```dojo
    <select id="multiSelect" multiple="multiple"></select>

    <script id="tagTemplate" type="text/x-kendo-template">
        <span class="custom">#: data.name #</span>
    </script>

    <script>
        $("#multiSelect").kendoMultiSelect({
            dataTextField: "name",
            dataValueField: "id",
            dataSource: [
                { name: "Red", id: 1 },
                { name: "Blue", id: 2 },
                { name: "Green", id: 3 }
            ],
            tagTemplate: $("#tagTemplate").html(),
            change: function (e) {
                $(".custom").closest(".k-button").css("background-color", "salmon");
            },
            dataBound: function (e) {
                $(".custom").closest(".k-button").css("background-color", "salmon");
            }
        });
    </script>
```

### Notes

- As the inner `span` is part of the custom `tagTemplate`, styling the entire tag requires JavaScript to target the `k-button` parent element.
- You can modify the background color dynamically based on your requirements.

## See Also

- [MultiSelect Overview](https://docs.telerik.com/kendo-ui/controls/editors/multiselect/overview)
- [Kendo UI Templates Documentation](https://docs.telerik.com/kendo-ui/framework/templates/overview)
