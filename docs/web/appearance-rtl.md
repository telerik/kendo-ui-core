---
title: RTL Support
---

# RTL Support

## How to use it

In order to enable RTL support of the **Kendo UI** web widgets, please do the following:

1. Register the **kendo.rtl.css** stylesheet. It is found in the same folder as the `kendo.common.css` file. The RTL stylesheet should be registered after the common stylesheet and before the theme stylesheet.
2. Wrap the Kendo widgets in an HTML element with a **k-rtl** CSS class. You can assign this class to the `<body>` tag, so that no additional DOM elements are required.

The `k-rtl` class has the following effects:

1. It applies a `direction:rtl` style, so you don't have to set it yourself when creating right-to-left applications.
2. It causes the **Kendo UI** web widgets to change their layout in accordance with common RTL conventions. The `kendo.rtl.css` stylesheet is required for this to happen.
3. Widget scripts detect RTL mode via this class whenever necessary, so that the widgets change their behavior accordingly.

## Notes on layout

* Vertical scrollbar position may be on the left or right side, depending on the used browser. This cannot be controlled via CSS or script.
* The ListView layout depends entirely on the defined template. The widget itself does nothing to convert an existing LTR template to RTL layout. If a `k-rtl` CSS class
is present and applied to a wrapper element, text direction will be reversed, but not floats, margins, paddings, etc.
* The Splitter does not reverse the order of its panes in RTL mode.