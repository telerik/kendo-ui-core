---
title: Appearance
page_title: Appearance
description: "Learn about the rendering and appearance options of the Telerik UI MultiSelect for {{ site.framework }}."
slug: appearance_multiselect
position: 2
---

# MultiSelect Appearance

As of the R1 2022 release, the MultiSelect component uses a new rendering. To learn more about why we decided to create a new rendering for our components, see the [Components Rendering Overview]({% slug components_rendering_overview %}) article.

For a live example of the styling options of the MultiSelect, visit the [Appearance Demo of the MultiSelect](https://demos.telerik.com/{{ site.platform }}/multiselect/appearance).

## Options

The MultiSelect supports the following styling options:

- [`Size`](#size)—configures the overall size of the component.
- [`Rounded`](#rounded)—configures the border radius of the component.
- [`FillMode`](#fillmode)—configures how the color is applied to the component.

### Size

The `Size` option controls the size of the MultiSelect. The `k-input-{size}` class, which is applied to the wrapping span element of the MultiSelect, reflects the value of the `Size` option.

The following values are available for the `Size` option:

- `Small`—small size (applies the `k-input-sm` class to the wrapping span element)
- `Medium`—medium size (applies the `k-input-md` class to the wrapping span element)
- `Large`—large size (applies the `k-input-lg` class to the wrapping span element)
- `None`—unset.

The following example demonstrates how to set `Size` in the declaration of the MultiSelect:
```HtmlHelper
    @(Html.Kendo().MultiSelect()
        .Name("multiselect")
        .DownArrow()
        .Placeholder("Select...")
        .Size(ComponentSize.Large)
        .BindTo(new List<SelectListItem>()
        {
            new SelectListItem() {
            Text = "Item1", Value ="1"
            },
            new SelectListItem() {
            Text = "Item2", Value ="2"
            },
            new SelectListItem() {
            Text = "Item3", Value ="3"
            }
        })
    )
```
{% if site.core %}
```TagHelper
    @{
        var multiSelect_data = new List<SelectListItem>()
        {
            new SelectListItem() {Text = "Item1", Value ="1"},
            new SelectListItem() {Text = "Item2", Value ="2"},
            new SelectListItem() {Text = "Item3", Value ="3"}
        };
    }

    <kendo-multiselect name="multiselect"
                       down-arrow="true"
                       placeholder="Select..."
                       size="ComponentSize.Large"
                       bind-to="multiSelect_data">
    </kendo-multiselect>
```
{% endif %}

The default size value is `Medium` and it is applied to the `span` wrapping element through the `k-input-md` class.

Below is the HTML of the MultiSelect that is affected from the `Size` configuration. The changes are applied to the `span.k-multiselect` wrapping element and to the `span.k-chip` elements:

```html
<span class="k-multiselect k-input k-multiselect-clearable k-input-lg">
    ...
    <span class="k-chip k-chip-lg k-rounded-lg k-chip-solid k-chip-solid-base" aria-setsize="2"></span>
</span>
```

### Rounded

The `Rounded` option controls the border radius of the MultiSelect. The class that corresponds to the `Rounded` option is `k-rounded-{rounded}`.

The following values are available for the `Rounded` option:

- `Small`—small border radius (applies the `k-rounded-sm` class to the wrapping span element)
- `Medium`—medium border radius (applies the `k-rounded-md` class to the wrapping span element)
- `Large`—large border radius (applies the `k-rounded-lg` class to the wrapping span element)
- `Full`—largest (ellipse-like) border radius (applies the `k-rounded-full` class to the wrapping span element)
- `None`—unset.

The following example demonstrates how to set `Rounded` in the declaration of the MultiSelect:
```HtmlHelper
    @(Html.Kendo().MultiSelect()
        .Name("multiselect")
        .DownArrow()
        .Placeholder("Select...")
        .Rounded(Rounded.Medium)
        .BindTo(new List<SelectListItem>()
        {
            new SelectListItem() {
            Text = "Item1", Value ="1"
            },
            new SelectListItem() {
            Text = "Item2", Value ="2"
            },
            new SelectListItem() {
            Text = "Item3", Value ="3"
            }
        })
    )
```
{% if site.core %}
```TagHelper
    @{
        var multiSelect_data = new List<SelectListItem>()
        {
            new SelectListItem() {Text = "Item1", Value ="1"},
            new SelectListItem() {Text = "Item2", Value ="2"},
            new SelectListItem() {Text = "Item3", Value ="3"}
        };
    }

    <kendo-multiselect name="multiselect"
                       down-arrow="true"
                       placeholder="Select..."
                       rounded="Rounded.Medium"
                       bind-to="multiSelect_data">
    </kendo-multiselect>
```
{% endif %}

The default rounded value is `Full`. It applies the `k-rounded-full` class to the `span.k-multiselect` wrapping element that contains the HTML of the component. The class is also applied to the `span.k-chip` element which contains the HTML of the tags.

The rendering of the MultiSelect with `Rounded.Medium` set:

```html
<span class="k-multiselect k-input k-multiselect-clearable k-input-solid k-input-lg k-rounded-md">
    ...
    <span class="k-chip k-chip-lg k-rounded-md k-chip-solid k-chip-solid-base" aria-setsize="2"></span>
</span>
```

### FillMode

The `FillMode` option controls how the color of the tags is applied. The structure of the class is `k-input-{fillMode}`.

The following values are available for the `FillMode` option:

- `Solid`—applies the `k-input-solid` class to the wrapping span element
- `Flat`—applies the `k-input-flat` class to the wrapping span element
- `Outline`—applies the `k-input-outline` class to the wrapping span element
- `None`—unset.

The default value is `Solid` and it is applied to the `span.k-multiselect` wrapping element through the `k-input-solid` class and to the `span.k-chip` elements through the `.k-chip-solid .k-chip-solid-base` classes.

The following example demonstrates how to set `FillMode` in the declaration of the MultiSelect:
```HtmlHelper
    @(Html.Kendo().MultiSelect()
        .Name("multiselect")
        .DownArrow()
        .Placeholder("Select...")
        .FillMode(FillMode.Outline)
        .BindTo(new List<SelectListItem>()
        {
            new SelectListItem() {
            Text = "Item1", Value ="1"
            },
            new SelectListItem() {
            Text = "Item2", Value ="2"
            },
            new SelectListItem() {
            Text = "Item3", Value ="3"
            }
        })
    )
```
{% if site.core %}
```TagHelper
    @{
        var multiSelect_data = new List<SelectListItem>()
        {
            new SelectListItem() {Text = "Item1", Value ="1"},
            new SelectListItem() {Text = "Item2", Value ="2"},
            new SelectListItem() {Text = "Item3", Value ="3"}
        };
    }

    <kendo-multiselect name="multiselect"
                       down-arrow="true"
                       placeholder="Select..."
                       fill-mode="FillMode.Outline"
                       bind-to="multiSelect_data">
    </kendo-multiselect>
```
{% endif %}

The `FillMode.Outline` value is reflected through the respective classes applied to the `span.k-multiselect` wrapping element and to the `span.k-chip` elements:

```html
<span class="k-multiselect k-input k-multiselect-clearable k-input-outline k-input-lg k-rounded-md">
    ...
    <span class="k-chip k-chip-lg k-rounded-md k-chip-outline k-chip-outline-base" aria-setsize="2"></span>
</span>
```

## Old vs New Rendering

Below you will find the differences between the old and the new rendering of the MultiSelect. Some of the HTML elements rendered before are replaced with others in the new rendering.

Old Rendering:

```html
 <div class="k-widget k-multiselect k-multiselect-clearable" unselectable="on" title="" style="">
      <div class="k-multiselect-wrap k-floatwrap k-multiselect-wrap-arrow" unselectable="on" role="combobox"
          aria-expanded="false" aria-owns="multiselect_listbox" aria-controls="multiselect_listbox">
          <ul unselectable="on" class="k-reset" id="multiselect_taglist">
              <li class="k-button" unselectable="on" aria-setsize="1"><span unselectable="on">Item1</span><span
                      aria-hidden="true" unselectable="on" aria-label="delete" title="delete" class="k-select"><span
                          class="k-icon k-i-close"></span></span></li>
          </ul>
          <input class="k-input" style="width: 41px;" autocomplete="off" role="textbox" title=""
              aria-autocomplete="list" tabindex="0" aria-describedby="multiselect_taglist"
              aria-controls="multiselect_listbox" aria-disabled="false" aria-readonly="false" aria-busy="false">
          <span unselectable="on" class="k-select" title="select" role="button" tabindex="-1">
              <span class="k-icon k-i-arrow-60-down"></span>
          </span>
          <span unselectable="on" class="k-clear-value" title="clear" role="button" tabindex="-1"><span class="k-icon k-i-x"></span></span>
          <span class="k-icon k-i-loading k-hidden"></span>
      </div>
      <select id="multiselect" multiple="multiple" data-role="multiselect" style="display: none;">
          <option value="Item1">Item1</option>
          <option value="Item2">Item2</option>
      </select>
  </div>
```

New Rendering:

```html
<span class="k-multiselect k-input k-multiselect-clearable k-input-{fillMode} k-input-{size} k-rounded-{rounded}" unselectable="on"
        role="combobox" title="" aria-expanded="false" aria-owns="multiselect_listbox" aria-controls="multiselect_listbox"
        style="">
        <select id="multiselect" multiple="multiple" data-role="multiselect" style="display: none;">
            <option value="Item1">Item1</option>
            <option value="Item2">Item2</option>
        </select>
        <div unselectable="on" class="k-input-values k-selection-multiple k-chip-list k-chip-list-{size}"
            id="multiselect_taglist">
            <span class="k-chip k-chip-{size} k-rounded-md k-chip-solid k-chip-solid-base"
                aria-setsize="1">
                <span unselectable="on" class="k-chip-content">
                    <span class="k-chip-label">Item1</span>
                </span>
                <span class="k-chip-action k-chip-remove-action" unselectable="on" aria-hidden="true" aria-label="delete" title="delete">
                    <span class="k-icon k-i-x-circle"></span>
                </span>
            </span>
            <input class="k-input-inner" autocomplete="off" role="textbox" title=""
                aria-autocomplete="list" tabindex="0" aria-describedby="multiselect_taglist"
                aria-controls="multiselect_listbox" aria-disabled="false" aria-readonly="false" aria-busy="false">
        </div>
        <span unselectable="on" class="k-clear-value" title="clear" role="button" tabindex="-1">
            <span class="k-icon k-i-x"></span>
        </span>
        <span class="k-icon k-i-loading k-hidden"></span>
        <button type="button" title="select"
            class="k-input-button k-button k-icon-button k-button-md k-button-solid k-button-solid-base k-multiselect-toggle-button"
            role="button" tabindex="-1"><span class="k-button-icon k-icon k-i-arrow-s"></span></button>
</span>
```

## Visual Backwards Compatibility

In order to achieve the same look and feel as the old rendering, make sure to use the classes available in the new rendering. Visit the [CSS Classes Migration]({% slug components_rendering_overview %}#css-classes-migration) and [JQuery Selectors Migration]({% slug components_rendering_overview %}#jquery-selectors-migration) sections of the [Appearance Overview]({% slug components_rendering_overview %}) article for additional information.

> If you use a LESS theme, the new rendering will support only the [default options](#options).

The following example showcases how to change the background colors of the input elements of the **MultiSelect** in both the new, and the old rendering:

```
      <style>
        /* Doesn't work BEFORE R1 2022 */
        .k-chip{ /* customize the styles of the selected items in the input */
          background: lightgreen
        }
        .k-list-item{ /* customize the styles of the items in the popup */
          background-color: #FFDFDD !important;
        }    
        .k-selected{ /* customize the styles of the selected items in the popup */
          background-color: #FBBBB9 !important;
          border: 2px solid #E56E94 !important;
        }   

        /* Doesn't work AFTER R1 2022 */ 
        .k-item{ /* customize the styles of the items in the popup */
          background-color: #FFE5B4 !important;
        }
        .k-state-selected{ /* customize the styles of the selected items in the popup */
          background-color: #FED8B1 !important;
          border: 2px solid orange !important;
          color: brown !important;
        }
        .k-state-selected:hover{ /* customize the styles of the selected items in the popup */
          background-color: orange !important;
          color: white !important;
        }
        #multiselect_taglist li{ /* customize the styles of the selected items in the input */
          background-color: orange !important;
        }
      </style>
```

## See Also

* [Appearance Overview Article]({% slug components_rendering_overview %})
* [Appearance Demo of the MultiSelect](https://demos.telerik.com/{{ site.platform }}/multiselect/appearance)
