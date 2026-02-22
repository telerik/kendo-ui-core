---
title: Override Theme Styles
page_title: Override Theme Styles
description: "General rules of thumb to override Kendo UI themes."
components: ["general"]
slug: themes-override-kendoui
position: 4
---

# Override Theme Styles

Often you may need to implement a minor change to the appearance of a component, while still using the same [built-in]({%slug sassbasedthemes_kendoui%}) or [custom]({%slug sassbasedthemes_customization_kendoui%}) theme.

This article provides high-level guidance about the knowledge and tools required to override existing CSS styles without changing the theme's CSS file. In scenarios with a larger number of customizations, it may be [more practical to use a different approach, for example, a custom theme]({%slug sassbasedthemes_customization_kendoui%}).

## CSS Knowledge

To override an existing style, you implement another [conflicting style](https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Cascade_and_inheritance#conflicting_rules). To make sure the new style takes precedence, it must have a *higher specificity*. If it has the same specificity, then the style must come later in the order of CSS rules and files on the page.

* [MDN Documentation for CSS Specificity](https://developer.mozilla.org/en-US/docs/Web/CSS/Specificity). You may prefer a [less formal explanation](https://www.smashingmagazine.com/2007/07/css-specificity-things-you-should-know/).
* How to easily [calculate CSS Specificity](https://stuffandnonsense.co.uk/blog/css-specisithity).
* [CSS Combinators](https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Selectors/Combinators) provide different ways to target an element, depending on its place in the DOM structure. Combinators are often called ["selectors"](https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Selectors), which is something different. Developers most commonly use *descendant* or *child* combinators, but there are many other options.

## Tools

To see what CSS styles are applied on an HTML element, use the browser's developer tools.

* [Inspect the HTML output of a page](https://www.telerik.com/blogs/improve-your-debugging-skills-with-chrome-devtools#inspect-the-generated-html-of-a-control)
* [See the applied styles for a specific element](https://www.telerik.com/blogs/improve-your-debugging-skills-with-chrome-devtools#see-the-applied-styles)
* [Inspect elements that hide automatically and disappear from the DOM](https://www.telerik.com/blogs/improve-your-debugging-skills-with-chrome-devtools-(part-2)#inspect-auto-hiding-tooltips-and-elements)

## Best Practices

When implementing CSS overrides, it's usually best to set custom CSS classes through the exposed component parameters and event arguments. This brings the following benefits:

* It reduces the need to be familiar with the components' HTML rendering and built-in CSS styles, although some knowledge is recommended and may still be necessary.
* The custom CSS code in the application is more future-proof if a [rendering change]({%slug components_rendering_overview%}) occurs.
* The custom CSS classes can follow the naming convention of the app, rather than those of the Telerik themes.

The example below demonstrates using custom CSS classes with the Grid and the ComboBox.

````dojo
<div id="grid"></div>

<style>
  .custom-grid-column {
    border-color: #00f;
    background: #8f9779;
  }
  .custom-grid-header {
    font-weight: bold;
    color: #fff;
    background: #dd855c;
    font-style: italic;
  }

</style>
<script>
  $(document).ready(function() {

    $("#grid").kendoGrid({
      columns: [{
        field: "name",
        attributes: {
          "class": "custom-grid-column",
        },
        headerAttributes: {
          "class": "custom-grid-header",
          style: "font-size: 14px"
        }
      }],
      dataSource: [ { name: "Jane Doe" }, { name: "John Doe" } ]
    });
  });
</script>
````

## CSS Primitives

The Kendo UI components use primitives, meaning that different HTML elements in different components use the same CSS classes to provide a level of abstraction and allow common styling.

You can use some CSS classes to apply borders and background colors to containers&mdash;for example, `k-info-colored`, `k-success-colored`, and `k-error-colored`. For more examples, refer to the [Styling Panels demo](https://demos.telerik.com/kendo-ui/styling/panels).

### Common CSS Classes

| CSS Class   | Behavior  |
|:---         |:---       |
| `k-widget`  | The class is applied to the component wrapper to set a border, text and background color. In addition to `k-widget`, every component has its own specific CSS class, such as `k-menu`, `k-panelbar`, `k-tabstrip`, and so on.|
| `k-header`  | Applied to Grid headers, Menu top level items, PanelBar top level items, TabStrip items, and DropDownLists to set a background image and a background color. |
| `k-link`    | Applied to hyperlinks and clickable text items to set a text color.|
| `k-button`  | Applied to elements that are expected to look like push buttons. The class sets a text color, background color, background image, and hover styling. This is the recommended class for styling form buttons.|
| `k-input`   | Applied to textboxes inside input components like ComboBox and AutoComplete to set border, text and background color.|
| `k-textbox` | Same as `k-input`, but used for standalone (generic) `input` elements that are not part of a component. This is the recommended class for styling form `input` elements as it provides the same look, height, and vertical alignment as the Kendo UI input components.|
| `k-checkbox`| Applied to checkboxes inside the TreeView component, when checkboxes are enabled for it.|
| `k-group` and `k-content`| Applied to various containers to set a background and border color. |
| `k-popup`   | Applied to popup containers that are detached from their opener component and are placed in the `body` element. |
| `k-icon` and `k-sprite`| Applied to elements that display part of a sprite image as background to initialize their dimensions. |
| `k-image`   | Applied to inline images to set their dimensions. |
| `k-item`    | Applied to various repeating component items, for example, Menu, TabStrip, TreeView, PanelBar, ComboBox, DropDownList, and so on. This CSS class does not apply any particular global styles and sports `display: block`.|
| `k-first` and `k-last` | Set on the first and the last `k-item` respectively, where a special type of styling is needed, for example, rounded corners and removing borders. |

### The k-state Classes

The appearance of a component may well depend on its state, which is also tied to CSS classes.

| `k-state` Class   | Behavior  |
|:---               |:---       |
| `k-state-default` | This class is applied on items to set their default appearance background and colors. |
| `k-state-hover`   | Set to items when they are hovered to apply their hovered look. |
| `k-state-focused` | Applied on focused, mostly `input` elements and the DropDownList. |
| `k-state-active`  | Set on activated `k-link` elements. |
| `k-state-selected`| Set to selected items to apply their selected look like in the PanelBar and TabStrip. |
| `k-state-disabled` | Applied to disabled items. |
| `k-state-error`   | Can be used with form fields that have an invalid value. |

## See Also

* [Customizing the look of Kendo UI components]({%slug sassbasedthemes_customization_kendoui%})