---
title: Appearance
page_title: jQuery DropDownList Documentation - Appearance
description: "Learn how to apply different styling options to the DropDownList widget."
slug: appearance_kendoui_dropdownlist_widget
position: 9
---

# Appearance

> As of Kendo UI R1 2022, the jQuery DropDownList widget has new rendering and styling options.

In this article, you will find information about the rendering of the Kendo UI DropDownList.

For additional information regarding the decision behind these changes, visit the [Styling Overview]({% slug components_rendering_overview %}) article.

For a live example, visit the [Appearance Demo of the DropDownList](https://demos.telerik.com/kendo-ui/dropdownlist/appearance).

## Options

The Kendo UI DropDownList supports the following styling options:

- [`size`](#size)—configures the overall size of the component.
- [`rounded`](#rounded)—configures the border radius for the tags.
- [`fillMode`](#fillMode)—controls how the color is applied.

### Size

The `size` option controls how big or small the DropDownList component looks. The structure of the class is `k-picker-{size}`.

The following values are available for the [`size`](/api/javascript/ui/dropdownlist/configuration/size) option:

- `sm`—small size
- `md`—medium size
- `lg`—large size
- `none`—unset

The default size value is `medium` and it is applied to the `span` wrapping element through the `k-picker-md` class.

The example below shows a basic configuration and how to set `size` to "large":

```dojo
<input id="dropdownlist" />
<script>
    $("#dropdownlist").kendoDropDownList({
      size: "large"
    });
</script>
```

Below is the HTML that is affected from the configuration. The changes are applied to the `span.k-dropdownlist` wrapping element:

```html
<span class="k-dropdownlist k-picker k-picker-lg">
    ...
</span>
```

### Rounded

The `rounded` option controls how much border radius is applied to the tags for the selected items in the widget. The structure of the class is `k-rounded-{size}`.

The following values are available for the [`rounded`](/api/javascript/ui/dropdownlist/configuration/rounded) option:

- `sm`—small border radius
- `md`—medium border radius
- `lg`—large border radius
- `full`—ellipse-like border radius
- `none`—unset

The default value is `medium` and it is applied to the `span.k-dropdownlist` wrapping element through the `k-rounded-md` class.

The example below shows a basic DropDownList configuration and how to set `rounded` to "full":

```dojo
<input id="dropdownlist" />
<script>
    $("#dropdownlist").kendoDropDownList({
      rounded: "full"
    });
</script>
```

The changes are applied to the `span.k-dropdownlist` wrapping element:

```html
<span class="k-dropdownlist k-picker k-rounded-full">
    ...
</span>
```

### FillMode

The `fillMode` option controls how the color is applied. The structure of the class is `k-picker-{fillMode}`.

The following values are available for the [`fillMode`](/api/javascript/ui/dropdownlist/configuration/fillMode) option:

- `solid`
- `flat`
- `outline`
- `none`

The default value is `solid` and it is applied to the `span.k-dropdownlist` wrapping element through the `k-picker-solid` class.

The example below shows a basic DropDownList configuration and how to set `fillMode` to "outline":

```dojo
<input id="dropdownlist" />
<script>
    $("#dropdownlist").kendoDropDownList({
      fillMode: "outline"
    });
</script>
```

The changes are applied to the `span.k-dropdownlist` wrapping element:

```html
<span class="k-dropdownlist k-picker k-picker-outline">
    ...
</span>
```

## Old vs New Rendering

The old rendering of the component consisted of several wrapping elements:

- The outer `span` wrapper with the `k-dropdown` and `k-widget` classes.

  ```html
  <span class="k-widget k-dropdown">
  </span>
  ```

- The inner `span` wrapper with the `k-dropdown-wrap` class.

  ```html
  <span class="k-dropdown-wrap k-state-default">
  </span>
  ```

- The `input` element with the `k-input` class. This element is a child of the `k-dropdown-wrap` span.

  ```html
  <input class="k-input" role="combobox" >
  </span>
  ```

- The button `span` element with `k-select` class. This element is a child of the `k-dropdown-wrap` span and renders the button which expands the dropdown on click.

  ```html
  <span unselectable="on" class="k-select" role="button">
  </span>
  ```

- The icon `span` element with the `k-icon` class. This element is a child of the `k-select` span and renders the dropdown arrow icon.

  ```html
  <span class="k-icon k-i-arrow-60-down">
  ```

The new rendering of the component consists of a single wrapping `span` element that contains the child `input` and `button` elements:

- The `span` element controls the overall appearance of the widget and has the following class structure:

  ```html
  <span class="k-picker k-dropdownlist k-picker-solid k-picker-md k-rounded-md">
  </span>
  ```

- The `span` element controls the appearance of the DropDownList itself and has the following class structure:

  ```html
  <span class="k-input-inner"></span>
  ```

- The `button` element controls the appearance of the button that expands the dropdown popup and has the following class structure:

  ```html
  <button type="button" class="k-select k-input-button k-button k-icon-button k-button-md k-button-solid k-button-solid-base k-icon-button">
  </button>
  ```

- The inner `span` element renders the dropdown arrow icon of the DropDownList and has the following class structure:

  ```html
  <span class="k-icon k-i-arrow-s k-button-icon"></span>
  ```

With the previous versions, when the filtering was enabled, the search icon in the DropDownList popup was rendered on the right side. With the new rendering, the search icon is rendered on the left side.

The examples below demonstrates the full version of the old and new rendering:

Wrapper Rendering:

```html
<!-- OLD WRAPPER-->
<span class="k-widget k-dropdown">
    <input id="dropdownlist" type="text" class="k-input" placeholder="...">
</span>

<!-- NEW WRAPPER -->
<span class="k-picker k-dropdownlist k-picker-solid k-picker-md k-rounded-md">
    <span class="k-input-inner">
        <span class="k-input-value-text">Patricio Simpson</span>
    </span>
    <button class="k-select k-input-button k-button k-button-md k-rounded-md k-button-solid k-button-solid-base k-icon-button">
        <span class="k-icon k-i-arrow-s k-button-icon"></span>
    </button>
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

<!-- NEW POPUP NO VIRTUALIZATION -->
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

To achieve the same look and feel as the old rendering, you must update the element references.

> When you use a LESS theme, the new styling and rendering supports only the [default options](#options).

Previously, a reference to the DropDownList input element was obtainable through the `k-input` class.

```javascript
$(".k-input") // Returns a reference to the input element in the old rendering.
```

With the new rendering, you must target the DropDownList input element by using the `k-input-inner` class.

```javascript
$('.k-dropdownlist .k-input-inner') // Returns a reference to the input element in the new rendering.
```

Previously, a reference to the dropdown button element was obtainable through the `k-select` class.

```javascript
$(".k-select") // Returns a reference to the dropdown button element in the old rendering.
```

With the new rendering, you can obtain a reference to the dropdown button element through the `k-button` and `k-input-button` classes.

```javascript
$(".k-button") // Returns a reference to the dropdown button element in the new rendering.
$(".k-input-button") // Returns a reference to the dropdown button element in the new rendering.
```

Previously, a reference to the items in the DropDownList popup was obtainable through the `k-item` class.

```javascript
$(".k-item") // Returns a reference to the items rendered in the DropDownList popup.
```

With the new rendering, the DropDownList item elements must be targeted by using the `k-list-item` class.

```javascript
$('.k-list-item') // Returns a reference to the items rendered in the DropDownList popup.
```

The following example showcases how to customize the styles of the **DropDownList** in both the new, and the old rendering:

```dojo
    <!-- Open the example in Dojo and select version prior to 2022 R1 to see the difference in the appearance -->
    <input id="products" style="width: 100%" />
    <script>
      var dataSource = new kendo.data.DataSource({
        transport: {
          read: {
            url: "https://demos.telerik.com/kendo-ui/service/products",
            dataType: "jsonp"
          }
        }
      });
      $("#products").kendoDropDownList({
        dataSource: dataSource,
        dataTextField: "ProductName",
        dataValueField: "ProductID",         
        value: [5]
      });

    </script>
    <style>
      /*  NEW RENDERING */
      /*  The style below will works with versions R1 2022 and later*/ 

      .k-dropdownlist .k-input-inner{ /* customize the style input */
        background: lightgreen;
      }

      .k-list-item{ /* customize the styles of the items in the popup */
        background-color: #FFDFDD;
      }    

      #products_list .k-selected{ /* applies orange background and border to the selected item in the popup */
        background-color: #FBBBB9;
        border: 2px solid #E56E94;
      }   

      /*  OLD RENDERING */
      /*  The style below will works with versions prior to R1 2022 */ 


      #products-list .k-item{ /* customize the styles of the items in the popup */
        background-color: #FFE5B4 !important;
      }

      #products-list .k-state-selected{ /* customize the styles of the selected items in the popup */      
        border: 2px solid orange !important;
        color: brown !important;
      }

      #products-list .k-state-selected:hover{ /* customize the styles of the selected items in the popup */
        background-color: orange !important;
        color: white !important;
      }
    </style>
```

With the new rendering different classes should be used in order to customize the [DropDownList templates](/controls/editors/dropdownlist/templates).

```dojo
    <!-- Open the example in Dojo and select version prior to 2022 R1 to see the difference in the appearance -->
    <input id="customers" style="width: 100%" />
    <script>
      $(document).ready(function() {
        $("#customers").kendoDropDownList({          
          dataTextField: "ContactName", 
          dataValueField: "CustomerID",
          groupTemplate: "Group template: #: data #",
          fixedGroupTemplate: "Fixed header: #: data #",
          footerTemplate: 'Total <strong>#: instance.dataSource.total() #</strong> items found',
          noDataTemplate: 'No Data!',
          height: 400,
          filter: 'contains',
          dataSource: {
            type: "odata",
            transport: {
              read: "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Customers"
            },
            group: { field: "Country" }
          }
        });
      });
    </script>
    <style>

      /*  NEW RENDERING */
      /*  The styles below will work with versions R1 2022 or later*/ 

      /*customize groupTemplate */
      #customers-list .k-list-item-group-label{
        background: blue !important;
        color: yellow !important;
        font-size: 18px;
      }

      /*customize fixedGroupTemplate */
      #customers-list .k-list-group-sticky-header{
        background: turquoise !important;
      }

      /*customize footerTemplate */
      #customers-list .k-list-footer{
        background: darkCyan !important;
        color: white;
      }

      /*customize nodataTemplate */
      #customers-list .k-no-data{
        color: green !important;
        font-weight: bold;
      }

      /*  OLD RENDERING */
      /*  The styles below will work with versions prior to R1 2022 */ 

      /*customize groupTemplate */
      #customers-list .k-item>.k-group{
        background: red !important;
        color: white !important;
      }

      /*customize fixedGroupTemplate */
      #customers-list .k-group-header{
        background: salmon !important;
      }

      /*customize footerTemplate */
      #customers-list .k-footer{
        background: tomato !important;
        color: white;
      }

      /*customize nodataTemplate */
      #customers-list .k-nodata{        
        color: red;
      }
    </style>
```

## See Also

* [Styling Overview Article]({% slug components_rendering_overview %})
* [Appearance Demo of the DropDownList](https://demos.telerik.com/kendo-ui/dropdownlist/appearance)
* [JavaScript API Reference of the DropDownList](/api/javascript/ui/dropdownlist)
