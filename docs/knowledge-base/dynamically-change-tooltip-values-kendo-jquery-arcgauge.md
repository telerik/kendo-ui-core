---
title: Dynamically Changing Tooltip Values in Kendo UI for jQuery ArcGauge
description: Learn how to dynamically change the tooltip values based on the ArcGauge value in Kendo UI for jQuery.
type: how-to
page_title: Update Tooltip Values Based on ArcGauge Values in Kendo UI for jQuery
meta_title: Update Tooltip Values Based on ArcGauge Values in Kendo UI for jQuery
slug: dynamically-change-tooltip-values-kendo-jquery-arcgauge
tags: kendo-ui, jquery, arcgauge, tooltip, dynamic-tooltip, refresh-method
res_type: kb
ticketid: 1696114
---

## Environment

<table>
<tbody>
<tr>
<td> Product </td>
<td> Kendo UI for jQuery ArcGauge </td>
</tr>
<tr>
<td> Version </td>
<td> 2025.2.702 </td>
</tr>
</tbody>
</table>

## Description

I want to create a tooltip for the [ArcGauge](https://docs.telerik.com/kendo-ui/api/javascript/dataviz/ui/arcgauge) that dynamically changes its values based on the ArcGauge data. For example, when hovering over the blue section, the tooltip should show "65% utilized," and when hovering over the light grey section, it should show "35 %" The tooltip values must update dynamically as the ArcGauge values change.

This knowledge base article also answers the following questions:
- How to add a tooltip to Kendo UI for jQuery ArcGauge?
- How to update tooltip values dynamically in ArcGauge?
- How to filter tooltip content in Kendo UI for jQuery ArcGauge?

## Solution

To achieve this functionality, create a tooltip for the ArcGauge using the `kendoTooltip` widget and dynamically update the tooltip values based on the ArcGauge data.

### Steps to Implement Tooltip with Dynamic Values

1. Create the ArcGauge with the desired values and configuration.
2. Initialize the `kendoTooltip` widget.
3. Use the `filter` property to target specific segments of the ArcGauge.
4. Define the `content` function to return dynamic values based on the target element.
5. Use the `refresh` method of the tooltip to update its values dynamically.

### Example Code Snippet

```dojo
 <div id="example">
      <div id="gauge-container">
        <div id="gauge"></div>
        <input id="gauge-value" title="slider" value="65" />
      </div>

      <script>
        function createGauge() {
          $("#gauge").kendoArcGauge({
            value: $("#gauge-value").val(),
            centerTemplate:
              '<span style="color: #: color #;">#: value #%</span>',
            scale: {
              min: 0,
              max: 100,
            },
            colors: [
              {
                to: 25,
                color: "#0058e9",
              },
              {
                from: 25,
                to: 50,
                color: "#37b400",
              },
              {
                from: 50,
                to: 75,
                color: "#ffc000",
              },
              {
                from: 75,
                color: "#f31700",
              },
            ],
          });
        }

        $(document).ready(function () {
          createGauge();

          function updateValue() {
            $("#gauge").data("kendoArcGauge").value($("#gauge-value").val());
            $("#gauge").data("kendoTooltip").refresh();
          }

          $("#gauge-value").kendoSlider({
            min: 0,
            max: 100,
            showButtons: false,
            change: updateValue,
          });

          $("#gauge").kendoTooltip({
            filter: "g path",
            content: function (e) {
              let index = e.target.index();
              if (index == 1) {
                return $("#gauge-value").data("kendoSlider").value() + '%';
              } else {
                return 100 - $("#gauge-value").data("kendoSlider").value() + '%';
              }
            },
            showOn: "mouseenter",
            position: "right",
            callout: false,
          });

          $(document).bind("kendo:skinChange", function (e) {
            createGauge();
          });
        });
      </script>
    </div>

    <style>
      #gauge-container {
        width: 300px;
        text-align: center;
        margin: 0 auto 30px auto;
      }

      .k-arcgauge-label {
        font-size: 30px;
      }
    </style>
```

### Explanation

- The `filter: "g path"` property ensures the tooltip is applied only to the gauge segments.
- The `content` function dynamically calculates the tooltip text based on the hovered segment.
- Use the `refresh` method to update the tooltip values if the ArcGauge's data changes dynamically.

## See Also

- [ArcGauge Documentation](https://docs.telerik.com/kendo-ui/api/javascript/dataviz/ui/arcgauge)
- [Tooltip Configuration API](https://docs.telerik.com/kendo-ui/api/javascript/ui/tooltip/configuration/filter)
- [Tooltip Refresh Method](https://docs.telerik.com/kendo-ui/api/javascript/ui/tooltip/methods/refresh)
