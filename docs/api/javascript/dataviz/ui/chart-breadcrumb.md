---
title: Chart Breadcrumb
page_title: Configuration, methods and events of Kendo UI DataViz Chart Breadcrumb
description: Learn how to configure Kendo UI Javascript chart breadcrumb widget in a few easy steps, use and change methods and events.
res_type: api
component: charts
---

# kendo.dataviz.ui.ChartBreadcrumb

## Configuration

### chart `String|Object`

The `kendo.dataviz.ui.Chart` instance to control or a CSS selector to its element.

#### Example - attach to a Chart instance

  <nav id="breadcrumb"></nav>
  <div id="chart"></div>
  <script>
    $('#chart').kendoChart({
      series: [{
        type: 'column',
        name: 'Total Sales By Company',
        field: 'sales',
        categoryField: 'company',
        drilldownField: 'details',
        data: [{
            company: 'Company A',
            sales: 100,
            details: {
                name: 'Company A Sales By Product',
                type: 'column',
                field: 'sales',
                categoryField: 'product',
                data: [{
                  product: 'Product 1',
                  sales: 80
                }, {
                  product: 'Product 2',
                  sales: 20
                }]
            }
        }]
      }]
    });

    $('#breadcrumb').kendoChartBreadcrumb({
      chart: '#chart'
    });
  </script>

### rootItem `Object`

The root item to be rendered by the **Chart Breadcrumb**.

The default root item is `{ type: 'rootitem', icon: 'home', text: 'Home', showIcon: true }`.

#### Example - set custom rootItem

  <nav id="breadcrumb"></nav>
  <div id="chart"></div>
  <script>
    $('#chart').kendoChart({
      series: [{
        type: 'column',
        name: 'Total Sales By Company',
        field: 'sales',
        categoryField: 'company',
        drilldownField: 'details',
        data: [{
            company: 'Company A',
            sales: 100,
            details: {
                name: 'Company A Sales By Product',
                type: 'column',
                field: 'sales',
                categoryField: 'product',
                data: [{
                  product: 'Product 1',
                  sales: 80
                }, {
                  product: 'Product 2',
                  sales: 20
                }]
            }
        }]
      }]
    });

    $('#breadcrumb').kendoChartBreadcrumb({
      chart: '#chart',
      rootItem: { type: 'rootitem', text: 'Home', showIcon: false, showText: true }
    });
  </script>

### rootItem.encoded `Boolean` _(default: true)_

Defines whether to encode the item's text. To render entities or HTML, set it to `false`.

### rootItem.type `String`

Defines the type of the item "rootitem" or "item".

### rootItem.href `String`

Defines the navigation link's url of the item (rendered if `navigation` is `true`).

### rootItem.text `String`

Defines the text of the item.

### rootItem.icon `String`

Defines the icon to be rendered.

### rootItem.itemClass `String`

Defines the item classes (the `li` element).

### rootItem.linkClass `String`

Defines the link classes (the `a` element).

### rootItem.iconClass `String`

Defines the icon classes (the `span` element).

### rootItem.showIcon `Boolean`

Defines whether to show the icon. Default value is *true* for `rootItem` and *false* for `item`.

### rootItem.showText `Boolean`

Defines whether to show the text. Default value is *false* for `rootItem` and *true* for `item`.
