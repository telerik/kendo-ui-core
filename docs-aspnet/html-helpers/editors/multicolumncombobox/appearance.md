---
title: Appearance
page_title: Appearance
description: "Learn about the rendering and appearance options of the Telerik UI MultiColumnComboBox for {{ site.framework }}."
slug: appearance_multicolumncombobox
position: 2
---

# Appearance

As of the R1 2022 release, the MultiColumnComboBox component uses a new rendering. To learn more about why we decided to create a new rendering for our components, see the [Components Rendering Overview]({% slug components_rendering_overview %}) article.

For a live example of the styling options of the MultiColumnComboBox, visit the [Appearance Demo of the MultiColumnComboBox](https://demos.telerik.com/{{ site.platform }}/multicolumncombobox/appearance).

## Options

The MultiColumnComboBox supports the following styling options:

- [`Size`](#size)—configures the overall size of the component.
- [`Rounded`](#rounded)—configures the border radius of the component.
- [`FillMode`](#fillmode)—configures how the color is applied to the component.

### Size

The `Size` option controls the size of the MultiColumnComboBox. The `k-input-{size}` class, which is applied to the wrapping span element of the MultiColumnComboBox, reflects the value of the `Size` option.

The following values are available for the `Size` option:

- `Small`—small size (applies the `k-input-sm` class to the wrapping span element)
- `Medium`—medium size (applies the `k-input-md` class to the wrapping span element)
- `Large`—large size (applies the `k-input-lg` class to the wrapping span element)
- `None`—unset.

The default size value is `Medium`.

The example below shows a basic configuration and how to set `size` to "large":

```HtmlHelper
    @(Html.Kendo().MultiColumnComboBox()
        .Name("movies")
        .DataTextField("Text")
        .DataValueField("Value")
        .Size(ComponentSize.Large)
        .Columns(columns =>
        {
            columns.Add().Field("Text").Title("Text").Width("300px");
            columns.Add().Field("Value").Title("Value").Width("100px");
        })
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
        var movies_data = new List<SelectListItem>()
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
        };
    }

    <kendo-multicolumncombobox datatextfield="Text" datavaluefield="Value" name="movies" 
    size="ComponentSize.Large"
    bind-to="movies_data">
        <multicolumncombobox-columns>
            <column field="Text" title="Text" width="400px">
            </column>
            <column field="Value" title="Value" width="100px">
            </column>
        </multicolumncombobox-columns>
    </kendo-multicolumncombobox>
```
{% endif %}

Below is the HTML of the MultiColumnComboBox that is affected from the `Size` configuration. The `ComponentSize.Large` value is reflected through the `k-input-lg` class applied to the `span.k-dropdowngrid` wrapping element:

```html
<span class="k-input k-combobox k-widget k-dropdowngrid k-combobox-clearable k-input-solid k-input-lg k-rounded-full">
</span>
```

### Rounded

The `Rounded` option controls the border radius of the MultiColumnComboBox. The class that corresponds to the `Rounded` option is `k-rounded-{rounded}`.

The following values are available for the `Rounded` option:

- `Small`—small border radius (applies the `k-rounded-sm` class to the wrapping span element)
- `Medium`—medium border radius (applies the `k-rounded-md` class to the wrapping span element)
- `Large`—large border radius (applies the `k-rounded-lg` class to the wrapping span element)
- `Full`—largest (ellipse-like) border radius (applies the `k-rounded-full` class to the wrapping span element)
- `None`—unset.

The default value is `Full`.

The following example demonstrates how to set `Rounded` in the declaration of the MultiColumnComboBox:

```HtmlHelper
    @(Html.Kendo().MultiColumnComboBox()
        .Name("movies")
        .DataTextField("Text")
        .DataValueField("Value")
        .Rounded(Rounded.Medium)
        .Columns(columns =>
        {
            columns.Add().Field("Text").Title("Text").Width("300px");
            columns.Add().Field("Value").Title("Value").Width("100px");
        })
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
        var movies_data = new List<SelectListItem>()
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
        };
    }

    <kendo-multicolumncombobox datatextfield="Text" datavaluefield="Value" name="movies" 
    rounded="Rounded.Medium"
    bind-to="movies_data">
        <multicolumncombobox-columns>
            <column field="Text" title="Text" width="400px">
            </column>
            <column field="Value" title="Value" width="100px">
            </column>
        </multicolumncombobox-columns>
    </kendo-multicolumncombobox>
```
{% endif %}

The `Rounded.Medium` value is reflected through the `k-rounded-md` class applied to the `span.k-dropdowngrid` wrapping element:

```html
<span class="k-input k-combobox k-widget k-dropdowngrid k-combobox-clearable k-input-solid k-input-lg k-rounded-md">
    ...
</span>
```

### FillMode

The `FillMode` option controls how color is applied to the component. The structure of the class is `k-input-{fillMode}`.

The following values are available for the `FillMode` option:

- `Solid`—applies the `k-input-solid` class to the wrapping span element
- `Flat`—applies the `k-input-flat` class to the wrapping span element
- `Outline`—applies the `k-input-outline` class to the wrapping span element
- `None`—unset.

The default value is `Solid` and it is applied to the `span.k-dropdowngrid` wrapping element through the `k-input-solid` class.

The following example demonstrates how to set `FillMode` in the declaration of the MultiColumnComboBox:

```HtmlHelper
    @(Html.Kendo().MultiColumnComboBox()
        .Name("movies")
        .DataTextField("Text")
        .DataValueField("Value")
        .FillMode(FillMode.Outline)
        .Columns(columns =>
        {
            columns.Add().Field("Text").Title("Text").Width("300px");
            columns.Add().Field("Value").Title("Value").Width("100px");
        })
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
        var movies_data = new List<SelectListItem>()
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
        };
    }

    <kendo-multicolumncombobox datatextfield="Text" datavaluefield="Value" name="movies" 
    fill-mode="FillMode.Outline"
    bind-to="movies_data">
        <multicolumncombobox-columns>
            <column field="Text" title="Text" width="400px">
            </column>
            <column field="Value" title="Value" width="100px">
            </column>
        </multicolumncombobox-columns>
    </kendo-multicolumncombobox>
```
{% endif %}

The `FillMode.Outline` value is reflected through the `k-input-outline` class applied to the `span.k-dropdowngrid` wrapping element:

```html
<span class="k-input k-combobox k-widget k-dropdowngrid k-combobox-clearable k-input-outline k-input-md k-rounded-full">
</span>
```

## Old vs New Rendering

The differences between the old and the new rendering of the MultiColumnComboBox are shown below. Some of the HTML elements rendered before are replaced with other elements in the new rendering.

Old Wrapper Rendering:

```html
 <span class="k-widget k-combobox k-dropdowngrid k-combobox-clearable" style="width: 100%;">
    <span tabindex="-1" unselectable="on" class="k-dropdown-wrap k-state-default">
        <input class="k-input sessioncamexclude" type="text" autocomplete="off" title="" role="combobox" aria-expanded="false" style="" tabindex="0" aria-disabled="false" aria-readonly="false" aria-autocomplete="list" aria-owns="customers_listbox" aria-controls="customers_listbox" aria-labelledby="customers_label" aria-busy="false" aria-activedescendant="ecee8835-b68f-45b5-9a5d-b6fff8c30b09">
        <span unselectable="on" class="k-clear-value k-hidden" title="clear" role="button" tabindex="-1">
            <span class="k-icon k-i-x"></span>
        </span>
        <span unselectable="on" class="k-select" aria-label="select" role="button" tabindex="-1" aria-controls="customers_listbox">
            <span class="k-icon k-i-arrow-60-down"></span>
        </span>
    </span>
    <input id="customers" style="width: 100%; display: none;" data-role="multicolumncombobox" aria-disabled="false" aria-readonly="false">
</span>
```

Old Popup Rendering without virtualization:

```html
<div class="k-list-container k-popup k-group k-reset k-dropdowngrid-popup k-popup-flush" id="multicolumncombobox-list" data-role="popup" aria-hidden="true" style="position: absolute; font-size: 14px; font-family: &quot;Times New Roman&quot;; font-stretch: 100%; font-style: normal; font-weight: 400; line-height: 20px; width: 173.597px; min-width: 173.597px; white-space: normal; height: auto; display: none; transform: translateY(-110px);">
  <div class="k-grid-header" style="padding-right: 0px;">
    <div class="k-grid-header-wrap">
      <table role="presentation">
        <colgroup>
          <col>
          <col>
        </colgroup>
        <tbody>
          <tr>
            <th class="k-header"></th>
            <th class="k-header"></th>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <div class="k-group-header" style="display:none"></div>
  <div class="k-list-scroller" unselectable="on" style="height: auto;">
    <ul unselectable="on" class="k-reset k-grid-list" tabindex="-1" aria-hidden="true" id="multicolumncombobox_listbox" aria-live="off" data-role="staticlist" role="listbox">
      <li tabindex="-1" role="option" unselectable="on" class="k-item k-state-focused" aria-selected="false" data-offset-index="0" id="a2ccd9ae-e206-49af-b205-86619abac6c3">
        <span class="k-cell"></span>
        <span class="k-cell"></span>
      </li>
      <li tabindex="-1" role="option" unselectable="on" class="k-item" aria-selected="false" data-offset-index="1">
        <span class="k-cell"></span>
        <span class="k-cell"></span>
      </li>
    </ul>
  </div>
  <div class="k-nodata" style="display:none">
    <div>No data found.</div>
  </div>
</div>
```

Old Popup Rendering with virtualization:

```html
<div class="k-list-container k-popup k-group k-reset k-dropdowngrid-popup k-popup-flush" id="orders-list" data-role="popup" style="position: absolute; width: 617px; font-size: 14px; font-family: Arial, Helvetica, sans-serif; font-stretch: 100%; font-style: normal; font-weight: 400; line-height: 20px; display: none; transform: translateY(-698px);" aria-hidden="true">
  <div class="k-grid-header" style="padding-right: 17px;">
    <div class="k-grid-header-wrap">
      <table role="presentation">
        <colgroup>
          <col>
          ...
        </colgroup>
        <tbody>
          <tr>
            <th class="k-header"></th>
            ...
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <div class="k-virtual-wrap">
    <div class="k-group-header" style="display: none;"></div>
    <div unselectable="on" class="k-virtual-content" style="height: 660px;">
      <ul unselectable="on" class="k-reset k-grid-list k-virtual-list" tabindex="-1" aria-hidden="true" id="orders_listbox" aria-live="polite" data-role="virtuallist" role="listbox">
        <li tabindex="-1" class="k-virtual-item k-item" role="option" data-uid="c1b3ca35-709f-4a60-9be3-62bd7dc4adb3" data-offset-index="0" id="efe261e3-c721-45e7-8d8a-3a9f397dbb2c" style="height: 33px; min-height: 33px; transform: translateY(0px);">
          <span class="k-cell" style="width:100px;">10248</span>
          <span class="k-cell" style="width:300px;">Vins et alcools Chevalier</span>
          <span class="k-cell" style="width:200px;">France</span>
        </li>
        ...
      </ul>
      <div class="k-height-container">
        <div style="height: 27390px;"></div>
      </div>
    </div>
  </div>
  <div class="k-nodata" style="display:none">
    <div>No data found.</div>
  </div>
</div>
```

New Wrapper Rendering:

```html
<span class="k-input k-combobox k-widget k-dropdowngrid k-combobox-clearable k-input-solid k-input-md k-rounded-md">
    <input class="k-input-inner">
    <span class="k-clear-value k-hidden" title="clear" role="button" tabindex="-1">
        <span class="k-icon k-i-x"></span>
    </span>
    <button class="k-select k-input-button k-button k-button-md k-rounded-md k-button-solid k-button-solid-base k-icon-button">
        <span class="k-icon k-i-arrow-s k-button-icon"></span>
    </button>
</span>
```

New Popup Rendering without virtualization:

```html
<div class="k-popup k-group k-reset k-dropdowngrid-popup k-popup-flush">
    <div class="k-data-table k-table-md">
        <div class="k-list-header">
            [Header template]
        </div>
        <div class="k-table-header">
            <div class="k-table-header-wrap">
                <table class="k-table">
                    <colgroup>
                        <col>
                        <col>
                        ...
                    </colgroup>
                    <thead class="k-table-thead">
                        <tr class="k-table-row">
                            <th class="k-table-th">Name</th>
                            <th class="k-table-th">ID</th>
                            ...
                        </tr>
                        <tr class="k-table-group-row">
                            <th class="k-table-th" colspan="2">Argentina</th>
                        </tr>
                    </thead>
                </table>
            </div>
        </div>
        <div class="k-table-body k-table-scroller" >
            <ul class="k-table k-table-list">
                <li class="k-table-row k-focus">
                    <span class="k-table-td">Patricio Simpson</span>
                    <span class="k-table-td">CACTU</span>
                    <span class="k-table-td k-table-spacer-td"></span>
                </li>
                ...
                <li class="k-table-row k-table-alt-row k-first">
                    <span class="k-table-td">Roland Mendel</span>
                    <span class="k-table-td">ERNSH</span>
                    <span class="k-table-td k-table-group-td">
                    <span>Austria</span>
                    </span>
                </li>
                ...
            </ul>
        </div>
        <div class="k-nodata" style="display:none">
            <div>No data found.</div>
        </div>
        <div class="k-list-footer">
            [Footer template]
        </div>
    </div>
</div>
```

New Popup Rendering with virtualization:

```html
<div class="k-popup k-group k-reset k-dropdowngrid-popup k-popup-flush">
    <div class="k-data-table k-table-md k-virtual-table">
        <div class="k-list-header">
            [Header template]
        </div>
        <div class="k-table-header">
            <div class="k-table-header-wrap">
                <table class="k-table">
                    <colgroup>
                        <col>
                        <col>
                        ...
                    </colgroup>
                    <thead class="k-table-thead">
                        <tr class="k-table-row">
                            <th class="k-table-th">Name</th>
                            <th class="k-table-th">ID</th>
                            ...
                        </tr>
                        <tr class="k-table-group-row">
                            <th class="k-table-th" colspan="2">Argentina</th>
                        </tr>
                    </thead>
                </table>
            </div>
        </div>
        <div class="k-table-body k-table-scroller k-virtual-content">
            <ul class="k-table k-table-list">
                <li class="k-table-row k-first">
                    <span class="k-table-td">Océano Atlántico Ltda.</span>
                    <span class="k-table-td">10409</span>
                    <span class="k-table-td k-table-spacer-td"></span>
                </li>
                ...
                <li class="k-table-row k-first">
                    <span class="k-table-td">Ernst Handel</span>
                    <span class="k-table-td">10258</span>
                    <span class="k-table-td k-table-group-td">
                    <span>Austria</span>
                    </span>
                </li>
                ...
            </ul>
            <div class="k-height-container">
                <div style="..."></div>
            </div>
        </div>
        <div class="k-nodata" style="display:none">
            <div>No data found.</div>
        </div>
        <div class="k-list-footer">
            [Footer template]
        </div>
    </div>
</div>
```

## Visual Backwards Compatibility

In order to achieve the same look and feel as the old rendering, use the classes available in the new rendering. Visit the [CSS Classes Migration]({% slug components_rendering_overview %}#css-classes-migration) and [JQuery Selectors Migration]({% slug components_rendering_overview %}#jquery-selectors-migration) sections of the [Appearance Overview]({% slug components_rendering_overview %}) article for additional information.

> If you use a LESS theme, the new rendering will support only the [default options](#options).

The following example showcases how to change the background colors of the input and button elements of the **MultiColumnComboBox** in both the new, and the old rendering:

```
    <style>
      /* Doesn't work BEFORE R1 2022 */
        .k-input-inner{ /* change the input field style */
            background-color:red;
        }
        .k-input-button{ /* changes the button style */
            background-color:orange;
        }
        .k-table-thead{ /* changes the style of the column headers */
            background-color:green;
        }
        .k-table-td{ /* changes the style of the cells */
            background-color:purple;
        }

      /* Doesn't work AFTER R1 2022 */
        .k-input{ /* change the input field style */
            background-color:red;
        }
        .k-select{ /* changes the button style */
            background-color:orange;
        }
        .k-header{ /* changes the style of the column headers */
            background-color:green !important;
        }
        .k-cell{ /* changes the style of the cells */
            background-color:purple;
        }
    </style>
```

## See Also

* [Appearance Overview Article]({% slug components_rendering_overview %})
* [Appearance Demo of the MultiColumnComboBox](https://demos.telerik.com/{{ site.platform }}/multicolumncombobox/appearance)
