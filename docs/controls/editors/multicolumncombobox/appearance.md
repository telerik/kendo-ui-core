---
title: Appearance
page_title: jQuery MultiColumnComboBox Documentation - MultiColumnComboBox Appearance
description: "Learn how to apply different styling options to the MultiColumnComboBox widget."
slug: appearance_kendoui_multicolumncombobox_widget
position: 9
---

# Appearance

> As of Kendo UI R1 2022, the jQuery MultiColumnComboBox widget has new rendering and styling options.

In this article, you will find information about the rendering of the Kendo UI MultiColumnComboBox.

For additional information regarding the decision behind these changes, visit the [Styling Overview]({% slug components_rendering_overview %}) article.

For a live example, visit the [Appearance Demo of the MultiColumnComboBox](https://demos.telerik.com/kendo-ui/multicolumncombobox/appearance).

## Options

The Kendo UI MultiColumnComboBox supports the following styling options:

- [`size`](#size)—configures the overall size of the component.
- [`rounded`](#rounded)—configures the border radius.
- [`fillMode`](#fillMode)—controls how the color is applied.

### Size

The `size` option controls how big or small the MultiColumnComboBox looks. The structure of the class is `k-input-{size}`.

The following values are available for the [`size`](/api/javascript/ui/multicolumncombobox/configuration/size) option:

- `sm`—small size
- `md`—medium size
- `lg`—large size
- `none`—unset

The default size value is `medium` and it is applied to the `span` wrapping element through the `k-input-md` class.

The example below shows a basic configuration and how to set `size` to "large":

```dojo
<input id="multicolumncombobox" />
<script>
    $("#multicolumncombobox").kendoMultiColumnComboBox({
      size: "large",
      dataSource: [
        { id: 1, name: "Apples" },
        { id: 2, name: "Oranges" }
      ],
      columns: [
            { field: "name" },
            { field: "id" }
      ],
      dataTextField: "name",
      dataValueField: "id",
    });
</script>
```

Below is the HTML that is affected from the configuration. The changes are applied to the `span.k-combobox` wrapping element:

```html
<span class="k-input k-combobox k-widget k-dropdowngrid k-combobox-clearable k-input-outline k-input-lg k-rounded-full">
</span>
```

### Rounded

The `rounded` option controls how much border radius is applied to the widget. The structure of the class is `k-rounded-{size}`.

The following values are available for the [`rounded`](/api/javascript/ui/multicolumncombobox/configuration/rounded) option:

- `sm`—small border radius
- `md`—medium border radius
- `lg`—large border radius
- `full`—ellipse-like border radius
- `none`—unset

The default value is `full` and it is applied to the `span.k-combobox` wrapping element that contains the whole HTML through the `k-rounded-full` class.

The example below shows a basic MultiColumnComboBox configuration and how to set `rounded` to "medium":

```dojo
<input id="multicolumncombobox" />
<script>
    $("#multicolumncombobox").kendoMultiColumnComboBox({
      rounded: "medium",
      dataSource: [
        { id: 1, name: "Apples" },
        { id: 2, name: "Oranges" }
      ],
      columns: [
            { field: "name" },
            { field: "id" }
      ],
      dataTextField: "name",
      dataValueField: "id",
    });
</script>
```

The changes are applied to the `span.k-combobox` wrapping element:

```html
<span class="k-input k-combobox k-widget k-dropdowngrid k-combobox-clearable k-input-outline k-input-lg k-rounded-md">
    ...
</span>
```

### FillMode

The `fillMode` option controls how the color is applied. The structure of the class is `k-input-{fillMode}`.

The following values are available for the [`fillMode`](/api/javascript/ui/multicolumncombobox/configuration/fillMode) option:

- `solid`
- `flat`
- `outline`
- `none`

The default value is `solid` and it is applied to the `span.k-combobox` wrapping element through the `k-input-solid` class.

The example below shows a basic MultiColumnComboBox configuration and how to set `fillMode` to "outline":

```dojo
<input id="multicolumncombobox" />
<script>
    $("#multicolumncombobox").kendoMultiColumnComboBox({
      fillMode: "outline",
      dataSource: [
        { id: 1, name: "Apples" },
        { id: 2, name: "Oranges" }
      ],
      columns: [
            { field: "name" },
            { field: "id" }
      ],
      dataTextField: "name",
      dataValueField: "id",
    });
</script>
```
The changes are applied to the `span.k-combobox` wrapping element:

```html
<span class="k-input k-combobox k-widget k-dropdowngrid k-combobox-clearable k-input-outline k-input-medium k-rounded-full">
</span>
```

## Old vs New Rendering

Below you will find the differences between the old and the new rendering. Some of the HTML elements rendered before are replaced with others in the new rendering.

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
      <li tabindex="-1" role="option" unselectable="on" class="k-item k-focus" aria-selected="false" data-offset-index="0" id="a2ccd9ae-e206-49af-b205-86619abac6c3">
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

To achieve the same look and feel as the old rendering, you must update the element references.

> When you use a LESS theme, the new styling and rendering supports only the [default options](#options).

The following example showcases how to customize the styles of the **MultiColumnComboBox** in both the new, and the old rendering:

```dojo
    <!-- Open the example in Dojo and select version prior to 2022 R1 to see the difference in the appearance -->
    <select id="customers" style="width: 100%"></select>
    <script>     
      $("#customers").kendoMultiColumnComboBox({
        dataTextField: "ContactName",
        dataValueField: "CustomerID",
        height: 400,
        columns: [
          {
            field: "ContactName", title: "Contact Name"},
          { field: "ContactTitle", title: "Contact Title" },         
          { field: "Country", title: "Country"}
        ],        
        filter: "contains",
        filterFields: ["ContactName", "ContactTitle", "CompanyName", "Country"],
        value: 'ANTON',       
        dataSource: {
          type: "odata",
          transport: {
            read: "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Customers"
          }
        }
      });

    </script>
    <style>
      /*  NEW RENDERING */
      /*  The style below will works with versions R1 2022 and later*/ 

      .k-combobox .k-input-inner{ /* customize the style input */
        background: lightgreen;
      }

      .k-dropdowngrid-popup .k-table-row{ /* customize the styles of the items in the popup */
        background-color: #FFDFDD !important;
      }    

      .k-dropdowngrid-popup .k-selected{ /* customize the styles of the selected items in the popup */
        background-color: #FBBBB9 !important;
        border: 2px solid #E56E94 !important;
      }   

      .k-dropdowngrid-popup .k-table-th{ /* customize the styles of the table header */
        background-color: violet !important;
      }


      /*  OLD RENDERING */
      /*  The style below will works with versions prior to R1 2022 */ 


      #customers-list .k-item{ /* customize the styles of the items in the popup */
        background-color: #FFE5B4 !important;
      }

      #customers-list .k-state-selected{ /* customize the styles of the selected items in the popup */
        background-color: #FED8B1 !important;
        border: 2px solid orange !important;
        color: brown !important;
      }

      #customers-list .k-state-selected:hover{ /* customize the styles of the selected items in the popup */
        background-color: orange !important;
        color: white !important;
      }

      #customers-list .k-header{ /* customize the styles of the table header */
        background-color: salmon !important;
      }
    </style>
```

With the new rendering different classes should be used in order to customize the [MultiColumnComboBox templates](/controls/editors/multicolumncombobox/templates).

```dojo
    <!-- Open the example in Dojo and select version prior to 2022 R1 to see the difference in the appearance -->
    <input id="customers" style="width: 100%;" />
    <script>
      $(document).ready(function() {
        $("#customers").kendoMultiColumnComboBox({
          dataTextField: "ContactName",
          dataValueField: "CustomerID",
          columns: [
            { field: "ContactName", title: "Contact Name"},
            { field: "ContactTitle", title: "Contact Title" },         
            { field: "Country", title: "Country"}
          ],
          groupTemplate: "Group template: #: data #",
          fixedGroupTemplate: "Fixed header: #: data #",
          footerTemplate: 'Total <strong>#: instance.dataSource.total() #</strong> items found',
          noDataTemplate: 'No Data!',           
          height: 400,
          filter: "contains",
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
      #customers-list .k-table-group-td span{
        background: blue !important;
        color: yellow !important;
        font-size: 18px;
      }

      /*customize fixedGroupTemplate */
      #customers-list .k-table-group-row{
        background: turquoise !important;
      }

      /*customize footerTemplate */
      #customers-list .k-table-footer{
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
      #customers-list .k-item>.k-group-cell span{
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

* [Appearance Overview Article]({% slug components_rendering_overview %})
* [Appearance Demo of the MultiColumnComboBox](https://demos.telerik.com/kendo-ui/multicolumncombobox/appearance)
* [JavaScript API Reference of the MultiColumnComboBox](/api/javascript/ui/multicolumncombobox)
