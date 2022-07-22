---
title: Appearance
page_title: Appearance
description: "Learn about the rendering and appearance options of the Telerik UI AutoComplete for {{ site.framework }}."
slug: appearance_autocomplete_aspnetcore
position: 2
---

# AutoComplete Appearance

As of the R1 2022 release, the AutoComplete component uses a new rendering. To learn more about the reasons for this decision, see the [Components Appearance]({% slug components_rendering_overview %}) article.

For a live example of the AutoComplete styling options, visit the [AutoComplete Appearance Demo](https://demos.telerik.com/{{ site.platform }}/autocomplete/appearance).

## Options

The AutoComplete supports the following styling options:

- [`Size`](#size)—configures the overall size of the component.
- [`Rounded`](#rounded)—configures the border radius of the component.
- [`FillMode`](#fillmode)—configures how the color is applied to the component.

### Size

The `Size` option controls the size of the AutoComplete. The `k-input-{size}` class, which is applied to the wrapping span element of the AutoComplete, reflects the value of the `Size` option.

The following values are available for the `Size` option:

- `Small`—small size (applies the `k-input-sm` class to the wrapping span element).
- `Medium`—medium size (applies the `k-input-md` class to the wrapping span element).
- `Large`—large size (applies the `k-input-lg` class to the wrapping span element).
- `None`—unset.

The following example demonstrates how to set `Size` in the declaration of the AutoComplete:

```HtmlHelper
    @(Html.Kendo().AutoComplete()
            .Name("input")
            .Size(ComponentSize.Medium)
            .BindTo(new string[]
            {
                "Red-violet",
                "Red",
                "Red-orange",
                "Orange",
                "Yellow-orange",
                "Yellow",
                "Yellow-green",
                "Green",
                "Blue-green",
                "Blue",
                "Blue-violet",
                "Violet"
            })
            .HtmlAttributes(new { style = "width:100%;" })
    )
```
{% if site.core %}
```TagHelper
@{
    var Colors = new string[]
            {
                "Red-violet",
                "Red",
                "Red-orange",
                "Orange",
                "Yellow-orange",
                "Yellow",
                "Yellow-green",
                "Green",
                "Blue-green",
                "Blue",
                "Blue-violet",
                "Violet"
            };
}
<kendo-autocomplete name="input"
                    size="ComponentSize.Medium"
                    bind-to="Colors"
                    style="width:100%">

</kendo-autocomplete>
```
{% endif %}

The default `Size` value is `Medium` and it is applied to the wrapping span element through the `k-input-md` class.

```html
<span class="k-autocomplete k-input k-input-md">
</span>
```

### Rounded

The `Rounded` option controls the border radius of the AutoComplete. The class that corresponds to the `Rounded` option is `k-rounded-{rounded}`.

The following values are available for the `Rounded` option:

- `Small`—small border radius (applies the `k-rounded-sm` class to the wrapping span element).
- `Medium`—medium border radius (applies the `k-rounded-md` class to the wrapping span element).
- `Large`—large border radius (applies the `k-rounded-lg` class to the wrapping span element).
- `Full`—largest border radius (applies the `k-rounded-full` class to the wrapping span element).
- `None`—unset.

The following example demonstrates how to set `Rounded` in the declaration of the AutoComplete:

```HtmlHelper
    @(Html.Kendo().AutoComplete()
            .Name("input")
            .Rounded(Rounded.Medium)
            .BindTo(new string[]
            {
                "Red-violet",
                "Red",
                "Red-orange",
                "Orange",
                "Yellow-orange",
                "Yellow",
                "Yellow-green",
                "Green",
                "Blue-green",
                "Blue",
                "Blue-violet",
                "Violet"
            })
            .HtmlAttributes(new { style = "width:100%;" })
    )
```
{% if site.core %}
```TagHelper
@{
    var Colors = new string[]
            {
                "Red-violet",
                "Red",
                "Red-orange",
                "Orange",
                "Yellow-orange",
                "Yellow",
                "Yellow-green",
                "Green",
                "Blue-green",
                "Blue",
                "Blue-violet",
                "Violet"
            };
}
<kendo-autocomplete name="input"
                    rounded="Rounded.Medium"
                    bind-to="Colors"
                    style="width:100%">

</kendo-autocomplete>
```
{% endif %}


The default `Rounded` value is `Medium` and it is applied to the wrapping span element through the `k-rounded-md` class.

```html
<span class="k-autocomplete k-input k-rounded-md">
</span>
```

### FillMode

The `FillMode` option controls the way color is applied to the rendered AutoComplete. The `k-input-{fillMode}` class, which is applied to the wrapping span element of the AutoComplete, reflects the value of the `FillMode` option.

The following values are available for the `FillMode` option:

- `Solid`—applies the `k-input-solid` class to the wrapping span element.
- `Flat`—applies the `k-input-flat` class to the wrapping span element.
- `Outline`—applies the `k-input-outline` class to the wrapping span element.
- `None`—unset.

The following example demonstrates how to set `FillMode` in the declaration of the AutoComplete:

```HtmlHelper
    @(Html.Kendo().AutoComplete()
            .Name("input")
            .FillMode(FillMode.Solid)
            .BindTo(new string[]
            {
                "Red-violet",
                "Red",
                "Red-orange",
                "Orange",
                "Yellow-orange",
                "Yellow",
                "Yellow-green",
                "Green",
                "Blue-green",
                "Blue",
                "Blue-violet",
                "Violet"
            })
            .HtmlAttributes(new { style = "width:100%;" })
    )
```
{% if site.core %}
```TagHelper
@{
    var Colors = new string[]
            {
                "Red-violet",
                "Red",
                "Red-orange",
                "Orange",
                "Yellow-orange",
                "Yellow",
                "Yellow-green",
                "Green",
                "Blue-green",
                "Blue",
                "Blue-violet",
                "Violet"
            };
}
<kendo-autocomplete name="input"
                    fill-mode="FillMode.Solid"
                    bind-to="Colors"
                    style="width:100%">

</kendo-autocomplete>
```
{% endif %}

The default `FillMode` value is `Solid` and it is applied to the wrapping span element through the `k-input-solid` class.

```html
<span class="k-autocomplete k-input k-input-solid">
</span>
```

## Old vs New Rendering

Below you will find the differences between the old and the new rendering.

Wrapper Rendering:

<!-- OLD WRAPPER-->
```html
<span class="k-widget k-autocomplete">
    <input id="autocomplete" type="text" class="k-input" placeholder="...">      
</span>
```

<!-- NEW WRAPPER -->
```html
<span class="k-autocomplete k-input k-input-md k-rounded-md k-input-solid">
    <input type="text" class="k-input-inner" value="..." placeholder="..." />
</span>
```

Popup rendering without virtualization:

<!-- OLD POPUP WITHOUT VIRTUALIZATION-->
```html
<div class="k-list-container k-popup k-group k-reset k-state-border-up" id="products-list" data-role="popup">
    [Header template]
    <div class="k-group-header">Argentina</div>
    <div class="k-list-scroller">
      <ul class="k-list k-reset">
        <li class="k-item">Patricio Simpson</li>
        ...
        <li class="k-item k-first"> 
            Ann Devon 
            <div class="k-group">UK</div>
        </li>
      </ul>
    </div>
    <div class="k-nodata">
      <div>No Data!</div>
    </div>
    <div class="k-footer"> 
      [Footer template]
    </div>
</div>
```

<!-- NEW POPUP WITHOUT VIRTUALIZATION -->
```html
<div class="k-popup k-group k-reset">
    <div class="k-list k-list-md">
        <div class="k-list-header">
            [header template]
        </div>
        <div class="k-list-group-sticky-header">Argentina</div>
        <div class="k-list-content k-list-scroller">
            <ul class="k-list-ul">
                <li class="k-list-item">
                    <span class="k-list-item-text">Patricio Simpson</span>
                </li>
                ...
                <li class="k-list-item k-first">
                    <span class="k-list-item-text">Roland Mendel</span>
                    <div class="k-list-item-group-label">Austria</div>
                </li>
                ...
            </ul>
        </div>
        <div class="k-nodata">
            <div>No data found.</div>
        </div>
        <div class="k-list-footer">
            [Footer template]
        </div>
    </div>
</div>
```

Popup rendering with virtualization:

<!-- OLD POPUP WITH VIRTUALIZATION-->
```html
<div class="k-list-container k-popup k-group k-reset">
    <div>
       [Header template]
    </div>
    <div class="k-virtual-wrap">
        <div class="k-group-header"></div>
        <div class="k-virtual-content">
          <ul class="k-list k-reset k-virtual-list">
            <li class="k-virtual-item k-item">
              Vins et alcools Chevalier
            </li>
            ...
            <li class="k-virtual-item k-item">
              Toms Spezialitäten
            </li>
            ...
          </ul>
          <div class="k-height-container">
            <div style="height: ....;"></div>
          </div>
        </div>
    </div>
    <div class="k-nodata">
        <div>No data found.</div>
    </div>
    <div class="k-footer">
        [Footer template]
    </div>
</div>
```

<!-- NEW POPUP WITH VIRTUALIZATION-->
```html
<div class="k-popup k-group k-reset">
    <div class="k-list k-list-md k-virtual-list">
        <div class="k-list-header">
            [Header template]
        </div>
        <div class="k-list-group-sticky-header">Argentina</div>
        <div class="k-list-content k-virtual-content">
            <ul class="k-list-ul">
                <li class="k-list-item">
                    <span class="k-list-item-text">
                        Text
                    </span>
                </li>
                ...
                <li class="k-list-item k-first">
                    <span class="k-list-item-text">
                        Ernst Handel, Austria 
                    </span>
                    <div class="k-list-item-group-label">Austria</div>
                </li>
                ...
            </ul>
            <div class="k-height-container">
                <div style="height: ...;"></div>
            </div>
        </div>
        <div class="k-nodata">
            <div>No data found.</div>
        </div>
        <div class="k-list-footer">
            [Footer template]
        </div>
    </div>
</div>
```

## Visual Backwards Compatibility

In order to achieve the same look and feel as the old rendering, the element references must be updated. Visit the [CSS Classes Migration]({% slug components_rendering_overview %}#css-classes-migration) and [JQuery Selectors Migration]({% slug components_rendering_overview %}#jquery-selectors-migration) sections of the [Styling Overview]({% slug components_rendering_overview %}) article for additional information.

>The new styling and rendering supports only the default options when you use a LESS theme.

Previously, a reference to the AutoComplete input element was obtainable through the `k-input` class.

$(".k-input") // Returns a reference to the input element in the old rendering.

With the new rendering, the AutoComplete input element must be targeted by using the k-input-inner class.

$(".k-input-inner") // Returns a reference to the input element in the new rendering.

The following example showcases how to change the background colors of the input and button elements of the **AutoComplete** in both the new, and the old rendering:

```
    <style>
      /* Doesn't work BEFORE R1 2022 */
        .k-input-inner{ /* change the input field style */
            background-color:red;
        }
        .k-list-item{ /* change the style of the items */
            background-color:red;
        }

      /* Doesn't work AFTER R1 2022 */
        .k-input{ /* change the input field style */
            background-color:red;
        }
        .k-item{ /* change the style of the items */
            background-color:red;
        }
    </style>
```

## See Also

* [Appearance Overview Article]({% slug components_rendering_overview %})
* [Appearance Demo of the AutoComplete](https://demos.telerik.com/aspnet-mvc/autocomplete/appearance)
