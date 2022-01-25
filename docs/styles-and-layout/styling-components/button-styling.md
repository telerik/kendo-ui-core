---
title: Button Styling
page_title: jQuery Button Documentation | Button Styling
description: "Learn how to apply different styling options to the Button widget."
slug: button_styling
---

# Button Styling

In this article, you will find information about how to style HTML elements so that to achieve the same appearance as Kendo Button. 

> As of Kendo UI R1 2022, the Kendo Button uses brand new rendering.

For additional information regarding the decision behind these changes, visit the [Styling Components]({% slug components_rendering_overview %}) article.


## Old vs New Rendering

With the old rendering the `k-button` held all the styling information related to the button styling. Applying `k-button` class to an HTML element was enough to style a native element and to achieve the same appearance as Kendo Button. 

```html
 <!-- OLD -->
<button class='k-button'></button>
```

Currently, styles are split in multiple class names. Each class is scoped to a single button appearance property:

```html
<!-- NEW -->
<button class="k-button k-button-solid-base k-button-solid k-button-rectangle k-button-md k-rounded-md" >
</button>
```

### Primary Button

With the old rendering, the `k-primary` class was used in order to style a button as primary. With the new rendering the `k-primary` class is substituted with the appropriate `themeColor` class. 
The example below demonstrates how a `button` element can be styled in order to achieve a primary button appearance. 

```html
 <!-- OLD -->
<button class="k-button k-primary">        
        Primary Button
</button>

 <!-- NEW -->
<button class="k-button k-button-md k-button-rectangle k-rounded-md k-button-solid k-button-solid-primary">
        Primary Button
</button>
```

### Flat Button

The `k-flat` class is substituted with the appropriate `fillMode` and `themeColor` classes. 
The example below demonstrates how a `button` element can be styled in order to achieve a flat button appearance. 

```html
 <!-- OLD -->
<button class="k-button k-flat">        
        Flat Button
</button>

 <!-- NEW -->
<button class="k-button k-button-md k-button-rectangle k-rounded-md k-button-flat k-button-flat-base">
        Flat Button
</button>
```

### Button with Icon

With the old rendering, the `k-button-icon` class was used for the buttons with icons. The `k-button-icon` class is now used on the icon element itself. In case the button contains only an icon and no text, the `k-icon-button` is used for the `button` element.

The example below demonstrates the old rendering:

```html
 <!-- OLD -->
<button class="k-button k-button-icontext">
        <span class=" k-icon k-i-folder"></span>
        Button
</button>

<button class="k-button k-button-icon">
        <span class="k-icon k-i-folder"></span>
</button>
```

The example below demonstrates the new rendering:

```html
<!-- NEW -->
<button class="k-button k-button-solid k-button-md k-button-rectangle k-rounded-md k-button-solid-base">
    <span class="k-button-icon k-icon k-i-folder"></span>
    <span class="k-button-text">Button</span>
</button>

<button class="k-button k-button-solid k-button-md k-button-rectangle k-rounded-md k-button-solid-base k-icon-button">
    <span class="k-button-icon k-icon k-i-folder"></span>
</button>
```


## Visual Backwards Compatibility

In order to achieve the same look and feel as the old rendering, the element references must be updated. Visit the [CSS Classes Migration]({% slug components_rendering_overview %}#css-classes-migration) and [JQuery Selectors Migration]({% slug components_rendering_overview %}#jquery-selectors-migration) sections of the [Styling Overview]({% slug components_rendering_overview %}) article for additional information.

## See Also

* [Styling Overview Article]({% slug components_rendering_overview %})
