---
title: Button Styling
page_title: Button Styling
description: "Learn about styling HTML elements by applying classes, through which you can achieve the appearance of the Button for {{ site.framework }}."
slug: button_styling
---

# Button Styling

In this article, you will find information on how to apply predefined classes to HTML elements, to achieve the appearance of the Button for {{ site.framework }}.

> As of the R1 2022 release, the Button component uses a new rendering.

For more details on the decision behind the new rendering, visit the [Components Rendering Overview]({% slug components_rendering_overview %}) article.


## Old vs New Rendering

In the old rendering the `k-button` was used to style an element to look like a Button component. Applying `k-button` class to an HTML element was enough to style a native element like the Button component. 

```html
 <!-- OLD -->
<button class='k-button'></button>
```

In the current rendering, we use multiple classes. Each class is responsible for a single button appearance property:

```html
<!-- NEW -->
<button class="k-button k-button-solid-base k-button-solid k-button-rectangle k-button-md k-rounded-md" >
</button>
```

### Button with Icon

In the old rendering, the `k-button-icon` class was used for the buttons with icons. The `k-button-icon` class is now used on the icon element itself. In case the button contains only an icon and no text, the `k-icon-button` is applied to the `button` element.

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

In order to achieve the same look and feel as the old rendering, make sure to use the classes available in the new rendering. Visit the [CSS Classes Migration]({% slug components_rendering_overview %}#css-classes-migration) and [JQuery Selectors Migration]({% slug components_rendering_overview %}#jquery-selectors-migration) sections of the [Appearance Overview]({% slug components_rendering_overview %}) article for additional information.

## See Also

* [Components Rendering Overview]({% slug components_rendering_overview %})
