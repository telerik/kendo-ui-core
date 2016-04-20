---
title: TooltipOptions
page_title: API reference for Kendo UI Drawing API Tooltip options
---

# kendo.drawing.TooltipOptions
Shape tooltip configuration options.

## Fields

### autoHide `Boolean`*(default: true)*

Specifies if the tooltip will be hidden when mouse leaves the shape. If set to false a close button will be shown within the tooltip.

### content `String|Function`

The text or a function which result will be shown within the tooltip.

> If the content is not set or is an empty string then the tooltip will not be shown.

### position `String`*(default: "top")*

The position relative to the target shape, at which the Tooltip will be shown. Predefined values are:

* "top" - the tooltip will be shown above the shape.
* "bottom" - the tooltip will be shown below the shape.
* "left" - the tooltip will be shown on the left side of the shape.
* "right" - the tooltip will be shown on the right side of the shape.
* "cursor" - the tooltip will be shown on top of the current cursor position.

### height `Number|String`

The height of the Tooltip.

### hideDelay `Number`*(default: 0)*

Specifies the delay in milliseconds before the tooltip is hidden after leaving the shape.

### offset `Number`*(default: 7)*

Specifies the offset in pixels from the target position at which the tooltip should be shown.

### shared `Boolean`*(default: false)*

Specifies if the same tooltip should be used for elements within a group or multipath. If set to true, the group or multipath bounding box will be used for the position and the tooltip will not be hidden and shown when moving from one element to another.

### showAfter `Number`*(default: 100)*

Specifies the delay in milliseconds before the tooltip is shown.

### showOn `String`*(default: "mouseenter")*

The event on which the tooltip will be shown. The available values are "mouseenter" and "click".

### width `Number|String`

The width of the Tooltip.