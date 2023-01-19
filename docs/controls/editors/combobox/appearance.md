---
title: Appearance
page_title: jQuery ComboBox Documentation - Appearance
description: "Get started with the jQuery ComboBox by Kendo UI and learn how to create, initialize, and enable the component."
slug: appearance_kendoui_combobox
position: 8
---

# Appearance

> As of Kendo UI R1 2022, the jQuery ComboBox component has new rendering and styling options.

In this article, you will find information about the rendering of the Kendo UI ComboBox.

For additional information regarding the decision behind these changes, visit the [Styling Overview]({% slug components_rendering_overview %}) article.

For a live example, visit the [Appearance Demo of the ComboBox](https://demos.telerik.com/kendo-ui/combobox/appearance).

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
- `none`—unset

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

The `rounded` option controls how much border radius is applied to the tags for the selected items in the component. The structure of the class is `k-rounded-{size}`.

The following values are available for the [`rounded`](/api/javascript/ui/combobox/configuration/rounded) option:

- `sm`—small border radius
- `md`—medium border radius
- `lg`—large border radius
- `full`—ellipse-like border radius
- `none`—unset

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
- `none`

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

The old rendering of the component consisted of several wrapping elements:

- The outer `span` wrapper with the `k-combobox` and `k-widget` classes.

  ```html
  <span class="k-widget k-combobox">
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


The new rendering of the component consists of a wrapping `span` element that contains the child `input` and `button` elements:

- The `span` element controls the overall appearance of the component and has the following class structure:

  ```html
  <span class="k-input k-combobox k-widget k-input-solid k-input-md k-rounded-md">
  </span>
  ```

- The `input` element controls the appearance of the Combobox itself and has the following class structure:

  ```html
  <input type="text" class="k-input-inner" value="..." placeholder="..." />
  ```

- The `button` element controls the appearance of the button that expands the dropdown popup and has the following class structure:

  ```html
  <button type="button" class="k-select k-input-button k-button k-icon-button k-button-md k-button-solid k-button-solid-base k-icon-button">
  </button>
  ```

- The inner `span` element renders the dropdown arrow icon of the ComboBox and has the following class structure:

  ```html
  <span class="k-icon k-i-arrow-s k-button-icon"></span>
  ```

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

To achieve the same look and feel as the old rendering, you must update the element references. 

> When you use a LESS theme, the new styling and rendering supports only the [default options](#options).

Previously, a reference to the ComboBox input element was obtainable through the `k-input` class.

```javascript
$(".k-input") // Returns a reference to the input element in the old rendering.
```

With the new rendering, you must target the ComboBox input element by using the `k-input-inner` class.

```javascript
$(".k-input-inner") // Returns a reference to the input element in the new rendering.
```

The following example showcases how to customize the styles of the **ComboBox** in both the new, and the old rendering:

```dojo
    <!-- Open the example in Dojo and select version prior to 2022 R1 to see the difference in the appearance -->
    <select id="products" style="width: 100%"></select>
    <script>
      var dataSource = new kendo.data.DataSource({
        transport: {
          read: {
            url: "https://demos.telerik.com/kendo-ui/service/products",
            dataType: "jsonp"
          }
        }
      });
      $("#products").kendoComboBox({
        dataSource: dataSource,
        dataTextField: "ProductName",
        dataValueField: "ProductID",         
        value: [5]
      });

    </script>
    <style>
      /*  NEW RENDERING */
      /*  The style below will works with versions R1 2022 and later*/ 

      .k-combobox .k-input-inner{ /* customize the style input */
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
        background-color: #FED8B1 !important;
        border: 2px solid orange !important;
        color: brown !important;
      }

      #products-list .k-state-selected:hover{ /* customize the styles of the selected items in the popup */
        background-color: orange !important;
        color: white !important;
      }
    </style>
```

With the new rendering different classes should be used in order to customize the [ComboBox templates](/controls/editors/combobox/templates).

```dojo
    <!-- Open the example in Dojo and select version prior to 2022 R1 to see the difference in the appearance -->
    <select id="customers" style="width: 100%;"></select>
    <script>
      $(document).ready(function() {
        $("#customers").kendoComboBox({          
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

## Setting the List Width

To customize the width of the ComboBox list and change its dimensions, use the jQuery `width()` method.

    <input id="comboBox" />

    <script>
        var combobox = $("#combobox").data("kendoComboBox");
        // Set the width of the drop-down list.
        combobox.list.width(400);
    </script>

## Setting the Popup Width

You can enable the `popup` element to automatically adjust its width according to the length of the item label it displays. When the `autoWidth` option is set to `true`, the popup will display the content on a single line and will not wrap it up.

> Virtualized lists do not support the auto-width functionality.

    <input id="combobox" style="width: 100px;" />
    <script>
    $("#combobox").kendoComboBox({
      autoWidth: true,
      dataSource: {
        data: ["Short item", "An item with really, really long text"]
      }
    });
    </script>

## Accessing list Elements

The ComboBox list renders an `ID` attribute which is generated from the ID of the component and the `-list` suffix. You can use the `ID` to style the element or to access a specific element inside the popup element.

> If the ComboBox has no ID, the `list` element will have no `ID` either.

    <input id="combobox">
    <script>
      $(document).ready(function() {
        $("#combobox").kendoComboBox({
            dataSource: ["Item1", "Item2"]
        });

        // The DIV popup element that holds header and footer templates and the suggestion options.
        var popupElement = $("#combobox-list");

        console.log(popupElement);
      });
    </script>

## Supporting label Elements

Because of its complex rendering, the focusing of the component by using a `label` element requires additional implementation. For a runnable example, refer to [this Kendo UI Dojo demo](https://dojo.telerik.com/uSeho).

## Removing Input Values

The ComboBox enables you to remove the values from its input area by using the `clearButton` configuration option. As a result, an **X** button appears in the input area on hover and when clicked, it resets the value of the component and triggers the `change` event. By default, `clearButton` is enabled and is set to `true`.

## See Also

* [Basic Usage of the ComboBox (Demo)](https://demos.telerik.com/kendo-ui/combobox/index)
* [Using the API of the ComboBox (Demo)](https://demos.telerik.com/kendo-ui/combobox/api)
* [Appearance Demo of the ComboBox](https://demos.telerik.com/kendo-ui/combobox/appearance)
* [JavaScript API Reference of the ComboBox](/api/javascript/ui/combobox)
