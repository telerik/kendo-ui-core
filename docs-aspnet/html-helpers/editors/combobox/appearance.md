---
title: Appearance
page_title: Appearance
description: "Learn about the rendering and appearance options of the Telerik UI ComboBox for {{ site.framework }}."
slug: appearance_combobox_aspnetcore
position: 2
---

# ComboBox Appearance

As of the R1 2022 release, the ComboBox component uses a new rendering. To learn more about the reasons for this decision, see the [Components Appearance]({% slug components_rendering_overview %}) article.

For a live example of the ComboBox styling options, visit the [ComboBox Appearance Demo](https://demos.telerik.com/{{ site.platform }}/combobox/appearance).

## Options

The ComboBox supports the following styling options:

- [`Size`](#size)—configures the overall size of the component.
- [`Rounded`](#rounded)—configures the border radius of the component.
- [`FillMode`](#fillmode)—configures how the color is applied to the component.

### Size

The `Size` option controls the size of the ComboBox. The `k-input-{size}` class, which is applied to the wrapping span element of the ComboBox, reflects the value of the `Size` option.

The following values are available for the `Size` option:

- `Small`—small size (applies the `k-input-sm` class to the wrapping span element)
- `Medium`—medium size (applies the `k-input-md` class to the wrapping span element)
- `Large`—large size (applies the `k-input-lg` class to the wrapping span element)
- `None`—unset.

The following example demonstrates how to set `Size` in the declaration of the ComboBox:

```HtmlHelper
    @(Html.Kendo().ComboBox()
                .Name("combobox")
                .Size(ComponentSize.Medium)
                .DataTextField("Text")
                .DataValueField("Value")
                .Filter("startswith")
                .HtmlAttributes(new { style = "width:100%;" })
                .BindTo(new List<SelectListItem>()
                {
                    new SelectListItem() {
                        Text = "Item 1", Value = "1"
                    },
                    new SelectListItem() {
                        Text = "Item 2", Value = "2"
                    },
                    new SelectListItem() {
                        Text = "Item 3", Value = "3"
                    }
                })
        )
```
{% if site.core %}
```TagHelper

@{
    var items = new List<SelectListItem>()
{
        new SelectListItem()
        {
            Text = "Item 1", Value = "1"
        },
         new SelectListItem()
        {
            Text = "Item 2", Value = "2"
        },
          new SelectListItem()
        {
            Text = "Item 3", Value = "3"
        }
    };
}
<kendo-combobox name="combobox"
                size="ComponentSize.Medium"
                datatextfield="Text"
                datavaluefield="Value"
                filter="FilterType.StartsWith"
                bind-to="items">

</kendo-combobox>
```
{% endif %}

The default `Size` value is `Medium` and it is applied to the wrapping span element through the `k-input-md` class.

```html
<span class="k-combobox k-input k-input-md">
</span>
```

### Rounded

The `Rounded` option controls the border radius of the ComboBox. The class that corresponds to the `Rounded` option is `k-rounded-{rounded}`.

The following values are available for the `Rounded` option:

- `Small`—small border radius (applies the `k-rounded-sm` class to the wrapping span element)
- `Medium`—medium border radius (applies the `k-rounded-md` class to the wrapping span element)
- `Large`—large border radius (applies the `k-rounded-lg` class to the wrapping span element)
- `Full`—largest border radius (applies the `k-rounded-full` class to the wrapping span element)
- `None`—unset.

The following example demonstrates how to set `Rounded` in the declaration of the ComboBox:

```HtmlHelper
    @(Html.Kendo().ComboBox()
                .Name("combobox")
                .Rounded(Rounded.Medium)
                .DataTextField("Text")
                .DataValueField("Value")
                .Filter("startswith")
                .HtmlAttributes(new { style = "width:100%;" })
                .BindTo(new List<SelectListItem>()
                {
                    new SelectListItem() {
                        Text = "Item 1", Value = "1"
                    },
                    new SelectListItem() {
                        Text = "Item 2", Value = "2"
                    },
                    new SelectListItem() {
                        Text = "Item 3", Value = "3"
                    }
                })
    )
```
{% if site.core %}
```TagHelper

@{
    var items = new List<SelectListItem>()
{
        new SelectListItem()
        {
            Text = "Item 1", Value = "1"
        },
         new SelectListItem()
        {
            Text = "Item 2", Value = "2"
        },
          new SelectListItem()
        {
            Text = "Item 3", Value = "3"
        }
    };
}
<kendo-combobox name="combobox"
                rounded="Rounded.Medium"
                datatextfield="Text"
                datavaluefield="Value"
                filter="FilterType.StartsWith"
                bind-to="items">

</kendo-combobox>
```
{% endif %}
The default `Rounded` value is `Medium` and it is applied to the wrapping span element through the `k-rounded-md` class.

```html
<span class="k-combobox k-input k-rounded-md">
</span>
```

### FillMode

The `FillMode` option controls the way color is applied to the rendered ComboBox. The `k-input-{fillMode}` class, which is applied to the wrapping span element of the ComboBox, reflects the value of the `FillMode` option.

The following values are available for the `FillMode` option:

- `Solid`—applies the `k-input-solid` class to the wrapping span element
- `Flat`—applies the `k-input-flat` class to the wrapping span element
- `Outline`—applies the `k-input-outline` class to the wrapping span element
- `None`—unset.

The following example demonstrates how to set `FillMode` in the declaration of the ComboBox:

```HtmlHelper
    @(Html.Kendo().ComboBox()
                .Name("combobox")
                .FillMode(FillMode.Solid)
                .DataTextField("Text")
                .DataValueField("Value")
                .Filter("startswith")
                .HtmlAttributes(new { style = "width:100%;" })
                .BindTo(new List<SelectListItem>()
                {
                    new SelectListItem() {
                        Text = "Item 1", Value = "1"
                    },
                    new SelectListItem() {
                        Text = "Item 2", Value = "2"
                    },
                    new SelectListItem() {
                        Text = "Item 3", Value = "3"
                    }
                })
        )
```
{% if site.core %}
```TagHelper

@{
    var items = new List<SelectListItem>()
{
        new SelectListItem()
        {
            Text = "Item 1", Value = "1"
        },
         new SelectListItem()
        {
            Text = "Item 2", Value = "2"
        },
          new SelectListItem()
        {
            Text = "Item 3", Value = "3"
        }
    };
}
<kendo-combobox name="combobox"
                fill-mode="FillMode.Solid"
                datatextfield="Text"
                datavaluefield="Value"
                filter="FilterType.StartsWith"
                bind-to="items">

</kendo-combobox>
```
{% endif %}

The default `FillMode` value is `Solid` and it is applied to the wrapping span element through the `k-input-solid` class.

```html
<span class="k-combobox k-input k-input-outline">   
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

The following example demonstrates how to configure the appearance of the component through configuration:

```HtmlHelper
    @(Html.Kendo().ComboBox()
                .Name("combobox")
                .Size(ComponentSize.Medium)
                .Rounded(Rounded.Medium)
                .FillMode(FillMode.Solid)
                .DataTextField("Text")
                .DataValueField("Value")
                .Filter("startswith")
                .HtmlAttributes(new { style = "width:100%;" })
                .BindTo(new List<SelectListItem>()
                {
                    new SelectListItem() {
                        Text = "Item 1", Value = "1"
                    },
                    new SelectListItem() {
                        Text = "Item 2", Value = "2"
                    },
                    new SelectListItem() {
                        Text = "Item 3", Value = "3"
                    }
                })
        )
```
{% if site.core %}
```TagHelper

@{
    var items = new List<SelectListItem>()
{
        new SelectListItem()
        {
            Text = "Item 1", Value = "1"
        },
         new SelectListItem()
        {
            Text = "Item 2", Value = "2"
        },
          new SelectListItem()
        {
            Text = "Item 3", Value = "3"
        }
    };
}
<kendo-combobox name="combobox"
                size="ComponentSize.Medium"
                rounded="Rounded.Medium"
                fill-mode="FillMode.Solid"
                datatextfield="Text"
                datavaluefield="Value"
                filter="FilterType.StartsWith"
                bind-to="items">

</kendo-combobox>
```
{% endif %}

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

The following example showcases how to change the background colors of the input and button elements of the **ComboBox** in both the new, and the old rendering:

```
    <style>
      /* Doesn't work BEFORE R1 2022 */
        .k-input-inner{ /* change the input field style */
            background-color:red;
        }
        .k-input-button{ /* changes the button style */
            background-color:orange;
        }
        .k-list-item{ /* change the style of the items */
            background-color:red;
        }

      /* Doesn't work AFTER R1 2022 */
        .k-input{ /* change the input field style */
            background-color:red;
        }
        .k-select{ /* changes the button style */
            background-color:orange;
        }
        .k-item{ /* change the style of the items */
            background-color:red;
        }
    </style>
```

## See Also

* [Appearance Overview Article]({% slug components_rendering_overview %})
* [Appearance Demo of the ComboBox](https://demos.telerik.com/aspnet-mvc/combobox/appearance)
