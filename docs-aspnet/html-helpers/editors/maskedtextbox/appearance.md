---
title: Appearance
page_title: Appearance
description: "Learn about the rendering and appearance options of the Telerik UI MaskedTextBox for {{ site.framework }}."
slug: appearance_maskedtextbox
position: 2
---

# MaskedTextBox Appearance

As of the R1 2022 release, the MaskedTextBox component uses a new rendering. To learn more about why we decided to create a new rendering for our components, see the [Components Rendering Overview]({% slug components_rendering_overview %}) article.

For a live example of the styling options of the MaskedTextBox, visit the [Appearance Demo of the MaskedTextBox](https://demos.telerik.com/{{ site.platform }}/maskedtextbox/appearance).

## Options

The MaskedTextBox supports the following styling options:

- [`Size`](#size)—configures the overall size of the component.
- [`Rounded`](#rounded)—configures the border radius of the component.
- [`FillMode`](#fillmode)—configures how the color is applied to the component.

### Size

The `Size` option controls the size of the MaskedTextBox. The `k-input-{size}` class, which is applied to the wrapping span element of the MaskedTextBox, reflects the value of the `Size` option.

The following values are available for the `Size` option:

- `Small`—small size (applies the `k-input-sm` class to the wrapping span element)
- `Medium`—medium size (applies the `k-input-md` class to the wrapping span element)
- `Large`—large size (applies the `k-input-lg` class to the wrapping span element)
- `None`—unset.

The following example demonstrates how to set `Size` in the declaration of the MaskedTextBox:

```HtmlHelper
  @(Html.Kendo().MaskedTextBox()
    .Name("maskedtextbox")
    .Mask("(999) 000-0000")
    .Size(ComponentSize.Large)
  )
```
{% if site.core %}
 ```TagHelper
    <kendo-maskedtextbox name="maskedtextbox" mask="(999) 000-0000" size="ComponentSize.Large">
    </kendo-maskedtextbox>
 ```
{% endif %}

The default size value is `Medium`.

```html
<span class="k-maskedtextbox k-input k-input-md">
</span>
```

### Rounded

The `Rounded` option controls the border radius of the MaskedTextBox. The class that corresponds to the `Rounded` option is `k-rounded-{rounded}`.

The following values are available for the `Rounded` option:

- `Small`—small border radius (applies the `k-rounded-sm` class to the wrapping span element)
- `Medium`—medium border radius (applies the `k-rounded-md` class to the wrapping span element)
- `Large`—large border radius (applies the `k-rounded-lg` class to the wrapping span element)
- `Full`—largest border radius (applies the `k-rounded-full` class to the wrapping span element)
- `None`—unset.

The following example demonstrates how to set `Rounded` in the declaration of the MaskedTextBox:

```HtmlHelper
  @(Html.Kendo().MaskedTextBox()
    .Name("maskedtextbox")
    .Mask("(999) 000-0000")
    .Rounded(Rounded.Large)
  )
```
{% if site.core %}
 ```TagHelper
    <kendo-maskedtextbox name="maskedtextbox" mask="(999) 000-0000" rounded="Rounded.Large">
    </kendo-maskedtextbox>
 ```
{% endif %}

The default rounded value is `Medium`.

```html
<span class="k-maskedtextbox k-input k-rounded-md">
</span>
```

### FillMode

The `FillMode` option controls the way color is applied to the rendered MaskedTextBox. The `k-input-{fillMode}` class, which is applied to the wrapping span element of the MaskedTextBox, reflects the value of the `FillMode` option.

The following values are available for the `FillMode` option:

- `Solid`—applies the `k-input-solid` class to the wrapping span element
- `Flat`—applies the `k-input-flat` class to the wrapping span element
- `Outline`—applies the `k-input-outline` class to the wrapping span element
- `None`—unset.

The following example demonstrates how to set `FillMode` in the declaration of the MaskedTextBox:
    
```HtmlHelper
  @(Html.Kendo().MaskedTextBox()
    .Name("maskedtextbox")
    .Mask("(999) 000-0000")
    .FillMode(FillMode.Outline)
  )
```
{% if site.core %}
 ```TagHelper
    <kendo-maskedtextbox name="maskedtextbox" mask="(999) 000-0000" fill-mode="FillMode.Outline">
    </kendo-maskedtextbox>
 ```
{% endif %}

The default fillMode value is `solid`.

```html
<span class="k-maskedtextbox k-input k-input-solid">
</span>
```

## Old vs New Rendering

The old rendering of the component consisted of a wrapping `span` element that contained a child `input` element.

```html
<span class="k-maskedtextbox">
    <input class="k-textbox" />
</span>
```

The new rendering of the component keeps the `span` element and the child `input` element, but changes the CSS classes that are applied to the two elements:

- The `span` element has the following classes:

  ```html
  <span class="k-maskedtextbox k-input k-input-md k-rounded-md k-input-solid">
  </span>
  ```

- The `input` element has the `k-input-inner` class:

  ```html
  <input type="text" class="k-input-inner" value="..." placeholder="..." />
  ```

The following example demonstrates how to configure the appearance of the component through configuration:

```HtmlHelper
  @(Html.Kendo().MaskedTextBox()
    .Name("maskedtextbox")
    .Mask("(999) 000-0000")
    .Size(ComponentSize.Medium)
    .Rounded(Rounded.Medium)
    .FillMode(FillMode.Solid)
  )
```
{% if site.core %}
 ```TagHelper
    <kendo-maskedtextbox name="maskedtextbox" 
                         mask="(999) 000-0000" 
                         size=ComponentSize.Medium 
                         rounded=Rounded.Medium 
                         fill-mode=FillMode.Solid>
    </kendo-maskedtextbox>
 ```
{% endif %}

The following HTML structure shows how the MaskedTextBox will render:

```html
<span class="k-maskedtextbox k-input k-input-md k-rounded-md k-input-solid">
  <input type="text" class="k-input-inner" value="..." placeholder="..." />
</span>
```

## Visual Backwards Compatibility

In order to achieve the same look and feel as the old rendering, make sure to use the classes available in the new rendering. Visit the [CSS Classes Migration]({% slug components_rendering_overview %}#css-classes-migration) and [JQuery Selectors Migration]({% slug components_rendering_overview %}#jquery-selectors-migration) sections of the [Appearance Overview]({% slug components_rendering_overview %}) article for additional information.

> If you use a LESS theme, the new rendering will support only the [default options](#options).

Previously, a reference to the MaskedTextBox element was obtainable through the `k-textbox` class.

```javascript
$(".k-textbox") // Returns a reference to the input element in the old rendering.
```

With the new rendering, the MaskedTextBox element must be targeted using the `k-input-inner` class.

```javascript
$(".k-input-inner") // Returns a reference to the input element in the new rendering.
```

The following example showcases how to apply a background color to the **MaskedTextBox** in both the new, and the old rendering:

```
    <style>
      /* Doesn't work AFTER R1 2022 */
      .k-textbox {
        background-color: #0071bc !important; /* Blue color in versions BEFORE R1 2022 */
      }
      /* Doesn't work BEFORE R1 2022 */
      .k-input-inner {
        background-color: #2e8540 !important; /* Green color in versions AFTER R1 2022 */
      }
    </style>
```

## See Also

* [Appearance Overview Article]({% slug components_rendering_overview %})
* [Appearance Demo of the MaskedTextBox](https://demos.telerik.com/{{ site.platform }}/maskedtextbox/appearance)
