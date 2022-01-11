---
title: Styling
page_title: jQuery ComboBox Documentation | Styling
description: "Learn how to apply different styling options to the ComboBox widget."
slug: styling_kendoui_combobox_widget
position: 9
---

# ComboBox Styling

> As of Kendo UI R1 2022, the jQuery ComboBox widget has new rendering and styling options.

In this article, you will find information about the rendering of the Kendo UI ComboBox.

For additional information regarding the decision behind these changes, visit the [Styling Components]({% slug components_rendering_overview %}) article.

For a live example, visit the [Styling Demo of the ComboBox](https://demos.telerik.com/kendo-ui/combobox/styling).

## Options

The Kendo UI ComboBox supports the following styling options:

- [`size`](#size)—configures the overall size of the component.
- [`rounded`](#rounded)—configures the border radius for the tags.
- [`fillMode`](#fillMode)—controls how the color is applied.

### Size

The `size` option controls how big or small the ComboBox component looks. The structure of the class is `k-input-{size}`.

The following values are available for the [`size`](/api/javascript/ui/combobox/configuration/size) option:

- `sm`—small size
- `md`—medium size
- `lg`—large size

The default size value is `medium` and it is applied to the `span` wrapping element through the `k-input-md` class.

The example below shows a basic configuration and how to set `size` to "large":

```dojo
<input id="combobox" />
<script>
    $("#combobox").kendoComboBox({
      size: "large"
    });
</script>
```

Below is the HTML that is affected from the configuration. The changes are applied to the `span.k-combobox` wrapping element:

```html
<span class="k-combobox k-input k-input-lg">
    ...
</span>
```

### Rounded

The `rounded` option controls how much border radius is applied to the tags for the selected items in the widget. The structure of the class is `k-rounded-{size}`.

The following values are available for the [`rounded`](/api/javascript/ui/combobox/configuration/rounded) option:

- `sm`—small border radius
- `md`—medium border radius
- `lg`—large border radius
- `full`—ellipse-like border radius

The default value is `medium` and it is applied to the `span.k-combobox` wrapping element through the `k-rounded-md` class. 

The example below shows a basic ComboBox configuration and how to set `rounded` to "full":

```dojo
<input id="combobox" />
<script>
    $("#combobox").kendoComboBox({
      rounded: "full"
    });
</script>
```
The changes are applied to the `span.k-combobox` wrapping element:

```html
<span class="k-combobox k-input k-rounded-full">
    ...    
</span>
```

### FillMode

The `fillMode` option controls how the color is applied. The structure of the class is `k-input-{fillMode}`.

The following values are available for the [`fillMode`](/api/javascript/ui/combobox/configuration/fillMode) option:

- `solid`
- `flat`
- `outline`

The default value is `solid` and it is applied to the `span.k-combobox` wrapping element through the `k-input-solid` class.

The example below shows a basic ComboBox configuration and how to set `fillMode` to "outline":

```dojo
<input id="combobox" />
<script>
    $("#combobox").kendoComboBox({
      fillMode: "outline"
    });
</script>
```
The changes are applied to the `span.k-combobox` wrapping element:

```html
<span class="k-combobox k-input k-input-outline">
    ...    
</span>
```

## Old vs New Rendering

Below you will find the differences between the old and the new rendering. 

Wrapper Rendering:

```html
<!-- OLD WRAPPER-->
<span class="k-widget k-combobox">
    <input id="combobox" type="text" class="k-input" placeholder="...">      
</span>

<!-- NEW WRAPPER -->
<span class="k-combobox k-input k-input-md k-rounded-md k-input-solid">
    <input type="text" class="k-input-inner" value="..." placeholder="..." />
</span>
```

Popup rendering without virtualization:

```html
<!-- OLD POPUP WITHOUT VIRTUALIZATION-->
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
        ...
      </ul>
    </div>
    <div class="k-nodata">
      <div>No Data!</div>
    </div>
    <div class="k-footer"> 
      [Footer template]
    </div>
</div>

<!-- NEW POPUP WITHOUT VIRTUALIZATION -->
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

```html
<!-- OLD POPUP WITH VIRTUALIZATION-->
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

<!-- NEW POPUP WITH VIRTUALIZATION-->
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

> The new styling and rendering supports only the [default options](#options) when you use a LESS theme.

## See Also

* [Styling Overview Article]({% slug components_rendering_overview %})
* [Styling Demo of the ComboBox](https://demos.telerik.com/kendo-ui/combobox/styling)
* [JavaScript API Reference of the ComboBox](/api/javascript/ui/combobox)
