---
title: Changing Marker Colors in Kendo UI Map
description: Learn how to customize marker colors in the Kendo UI Map component.
type: how-to
page_title: How to Customize Marker Colors in Kendo UI Map
slug: how-to-change-marker-colors-kendo-ui-map
tags: kendo, ui, map, markers, color, customization
res_type: kb
components: ["map"]
ticketid: 1675893
---

## Environment

<table>
<tbody>
<tr>
<td>Product</td>
<td>Progress® Kendo UI® Map</td>
</tr>
<tr>
<td>Version</td>
<td>2024.4.1112</td>
</tr>
</tbody>
</table>

## Description

How can I change the colors of the markers in the Kendo UI Map?

This knowledge base article also answers the following questions:
- How to set custom colors for map markers in Kendo UI?
- Can I use CSS to change the color of a marker in Kendo UI Map?
- Is it possible to assign different colors to each marker in Kendo UI Map?

## Solution

To customize the color of markers in the [Progress® Kendo UI® Map](https://docs.telerik.com/kendo-ui/controls/diagrams-and-maps/map/overview), you need to follow two main steps. First, define a custom property for markers to specify their colors. Then, use the `markerActivate` event to apply these colors.

1. Define the markers with a custom color field in the Map's configuration:

```javascript
$("#map").kendoMap({
  markers: [{
    shape: "pinTarget",
    location: [30.2675, -97.7409],
    colorField: "green"
  },{
    shape: "pinTarget",
    location: [30.2707, -97.749],
    colorField: "red"
  },{
    shape: "pinTarget",
    location: [30.2705, -97.7409],
    colorField: "#333999"
  },{
    shape: "pinTarget",
    location: [30.2686, -97.7494],
    colorField: "#48B6A2"
  }],
  // Additional config...
});
```

2. Use the `markerActivate` event to dynamically apply the color to the marker's element:

```javascript
markerActivate: function(e) {
  e.marker.element.css("color", e.marker.options.colorField);
}
```

Implementing these steps allows you to set custom colors for each marker on your Kendo UI Map. For a practical demonstration, refer to this [Progress Kendo UI Dojo example](https://dojo.telerik.com/LFrdmYZf).

## See Also

- [Kendo UI Map Overview](https://docs.telerik.com/kendo-ui/controls/diagrams-and-maps/map/overview)
- [Kendo UI Map MarkerActivate Event Documentation](https://docs.telerik.com/kendo-ui/api/javascript/dataviz/ui/map/events/markeractivate)
