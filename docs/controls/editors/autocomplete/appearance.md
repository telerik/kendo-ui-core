---
title: Appearance
page_title: jQuery AutoComplete Documentation - Appearance
description: "Get started with the jQuery AutoComplete by Kendo UI and set its list and popup widths, access the list elements, and remove its input values."
slug: sizedimensions_kendoui_autocomplete
position: 7
---

# Appearance

> As of Kendo UI R1 2022, the jQuery AutoComplete widget has new rendering and styling options.

In this article, you will find information about the rendering of the Kendo UI AutoComplete.

For additional information regarding the decision behind these changes, visit the [Styling Overview]({% slug components_rendering_overview %}) article.

For a live example, visit the [Appearance Demo of the AutoComplete](https://demos.telerik.com/kendo-ui/autocomplete/appearance).

## Options

The Kendo UI AutoComplete supports the following styling options:

- [`size`](#size)—configures the overall size of the component.
- [`rounded`](#rounded)—configures the border radius for the tags.
- [`fillMode`](#fillMode)—controls how the color is applied.

### Size

The `size` option controls how big or small the AutoComplete component looks. The structure of the class is `k-input-{size}`.

The following values are available for the [`size`](/api/javascript/ui/autocomplete/configuration/size) option:

- `sm`—small size
- `md`—medium size
- `lg`—large size
- `none`—unset

The default size value is `medium` and it is applied to the `span` wrapping element through the `k-input-md` class.

The example below shows a basic configuration and how to set `size` to "large":

```dojo
<input id="autocomplete" />
<script>
    $("#autocomplete").kendoAutoComplete({
      size: "large"
    });
</script>
```

Below is the HTML that is affected from the configuration. The changes are applied to the `span.k-autocomplete` wrapping element:

```html
<span class="k-autocomplete k-input k-input-lg">
    ...
</span>
```

### Rounded

The `rounded` option controls how much border radius is applied to the tags for the selected items in the widget. The structure of the class is `k-rounded-{size}`.

The following values are available for the [`rounded`](/api/javascript/ui/autocomplete/configuration/rounded) option:

- `sm`—small border radius
- `md`—medium border radius
- `lg`—large border radius
- `full`—ellipse-like border radius
- `none`—unset

The default value is `medium` and it is applied to the `span.k-autocomplete` wrapping element through the `k-rounded-md` class. 

The example below shows a basic AutoComplete configuration and how to set `rounded` to "full":

```dojo
<input id="autocomplete" />
<script>
    $("#autocomplete").kendoAutoComplete({
      rounded: "full"
    });
</script>
```
The changes are applied to the `span.k-autocomplete` wrapping element:

```html
<span class="k-autocomplete k-input k-rounded-full">
    ...    
</span>
```

### FillMode

The `fillMode` option controls how the color is applied. The structure of the class is `k-input-{fillMode}`.

The following values are available for the [`fillMode`](/api/javascript/ui/autocomplete/configuration/fillMode) option:

- `solid`
- `flat`
- `outline`
- `none`

The default value is `solid` and it is applied to the `span.k-autocomplete` wrapping element through the `k-input-solid` class.

The example below shows a basic AutoComplete configuration and how to set `fillMode` to "outline":

```dojo
<input id="autocomplete" />
<script>
    $("#autocomplete").kendoAutoComplete({
      fillMode: "outline"
    });
</script>
```
The changes are applied to the `span.k-autocomplete` wrapping element:

```html
<span class="k-autocomplete k-input k-input-outline">
    ...    
</span>
```

## Old vs New Rendering

Below you will find the differences between the old and the new rendering. 

The following example shows the wrapper rendering.

```html
<!-- OLD WRAPPER-->
<span class="k-widget k-autocomplete">
    <input id="autocomplete" type="text" class="k-input" placeholder="...">      
</span>

<!-- NEW WRAPPER -->
<span class="k-autocomplete k-input k-input-md k-rounded-md k-input-solid">
    <input type="text" class="k-input-inner" value="..." placeholder="..." />
</span>
```

The following example shows the popup rendering without virtualization.

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

The following example shows the popup rendering with virtualization.


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

Previously, a reference to the AutoComplete input element was obtainable through the `k-input` class.

```javascript
$(".k-input") // Returns a reference to the input element in the old rendering.
```

With the new rendering, you must target the AutoComplete input element by using the `k-input-inner` class.

```javascript
$(".k-input-inner") // Returns a reference to the input element in the new rendering.
```

The following example showcases how to customize the styles of the **AutoComplete** in both the new, and the old rendering:

```dojo
    <input id="autocomplete" />
    <script>
      $("#autocomplete").kendoAutoComplete({
        dataSource: [
          { id: 1, name: "Apples" },
          { id: 1, name: "Tomatoes" },
          { id: 1, name: "Strawberry" },
          { id: 1, name: "Cherry" },
          { id: 1, name: "Melon" },
          { id: 2, name: "Oranges" }
        ],
        dataTextField: "name",
        value: "Oranges"
      });
    </script>
    <style>
      /*  NEW RENDERING */
      /*  The style below will works with versions R1 2022 and later*/ 

      #autocomplete.k-input-inner{ /* customize the style input */
        background: lightgreen;
      }

      #autocomplete-list .k-list-item{ /* customize the styles of the items in the popup */
        background-color: #FFDFDD;
      }    

      /*  OLD RENDERING */
      /*  The style below will works with versions prior to R1 2022 */ 

      #autocomplete-list .k-item{ /* customize the styles of the items in the popup */
        background-color: #FFE5B4 !important;
      }
    </style>
```

With the new rendering different classes should be used in order to customize the [AutoComplete templates](/controls/editors/autocomplete/templates).

```dojo
    <!-- Open the example in Dojo and select version prior to 2022 R1 to see the difference in the appearance -->
    <input id="customers" style="width: 100%" />
    <script>
      $(document).ready(function() {
        $("#customers").kendoAutoComplete({          
          dataTextField: "ContactName",        
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


The AutoComplete also provides options for setting the widths of its [list](#setting-the-list-width) and [popup](#setting-the-popup-width), [accessing its `list` elements](#accessing-the-list-elements), and [removing its input value](#removing-the-input-value).

## Setting the List Width

To customize the width of the AutoComplete list and change its dimensions, use the jQuery `width()` method.

    <input id="autoComplete" />

    <script>
        $("#autoComplete").kendoAutoComplete();
        var autoComplete = $("#autocomplete").data("kendoAutoComplete");
        // Set the width of the drop-down list.
        autoComplete.list.width(400);
    </script>

## Setting the Popup Width

You can enable the `popup` element to automatically adjust its width according to the length of the item label it displays. When the `autoWidth` option is set to `true`, the popup will display the content on a single line and will not wrap it up.

    <input id="autocomplete" style="width: 100px;" />
    <script>
    $("#autocomplete").kendoAutoComplete({
      autoWidth: true,
      dataSource: {
        data: ["Short item", "An item with really, really long text"]
      }
    });
    </script>

## Accessing list Elements

The AutoComplete list renders an `ID` attribute which is generated from the ID of the widget and the `-list` suffix. You can use the `ID` to style the element or to access a specific element inside the popup element.

> If the AutoComplete has no ID, the `list` element will have no `ID` either.

    <input id="autocomplete">
    <script>
      $(document).ready(function() {
        $("#autocomplete").kendoAutoComplete({
            dataSource: ["Item1", "Item2"]
        });

        // The DIV popup element that holds the header and footer templates, and the suggestion options.
        var popupElement = $("#autocomplete-list");

        console.log(popupElement);
      });
    </script>

## Removing Input Values

The AutoComplete enables you to remove the values from its input area by using the `clearButton` configuration option. As a result, an **X** button appears in the input area on hover and when clicked, it resets the value of the widget and triggers the `change` event. By default, `clearButton` is enabled and is set to `true`.

## See Also

* [Basic Usage of the AutoComplete (Demo)](https://demos.telerik.com/kendo-ui/autocomplete/index)
* [Using the API of the AutoComplete (Demo)](https://demos.telerik.com/kendo-ui/autocomplete/api)
* [Appearance Demo of the AutoComplete](https://demos.telerik.com/kendo-ui/autocomplete/appearance)
* [JavaScript API Reference of the AutoComplete](/api/javascript/ui/autocomplete)
