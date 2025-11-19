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


<div class="meta-api-description">
How do I link a breadcrumb navigation component to a specific Kendo UI chart instance? Bind, link, attach, or connect the breadcrumb navigation component to a specific chart by referencing the chart instance directly or targeting its DOM element using a CSS selector; configure the association to enable synchronized navigation, control breadcrumb behavior in relation to the chart data visualization, set the chart source dynamically, and manage interaction between navigation elements and chart updates by specifying either the chart object or a selector string identifying the chart container in the UI.
</div>

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


<div class="meta-api-description">
How to customize the main breadcrumb item in a chart-based Kendo UI for jQuery? Customize the main or top-level breadcrumb element by controlling its type, icon, label text, and whether to display the icon, enabling you to set or override the root breadcrumb item’s appearance and behavior such as changing its icon from default home, modifying the display text, toggling icon visibility, or defining a specific item type for navigation hierarchy clarity in chart-based breadcrumbs.
</div>

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


<div class="meta-api-description">
How do I configure HTML encoding for chart breadcrumb root items in Kendo UI? Control whether breadcrumb root item labels in charts render raw HTML, entities, or escaped text by enabling or disabling HTML encoding or escaping for the root label. Configure encoding options to allow rendering of unescaped HTML markup, special characters, or sanitized plain text in the main breadcrumb element. Adjust settings for encoding root breadcrumb items to manage how labels handle HTML entities, raw tags, or text content, ensuring precise control over label display, escaping, and safe HTML rendering in chart breadcrumb navigation components.
</div>

#### Example

    <div id="chart"></div>
    <div id="breadcrumb"></div>
    <script>
    $("#chart").kendoChart({
        categoryAxis: {
            categories: ["A", "B", "C"]
        },
        series: [{
            type: "column",
            data: [1, 2, 3]
        }]
    });
    
    $("#breadcrumb").kendoChartBreadcrumb({
        chart: "#chart",
        rootItem: {
            text: "&lt;Home&gt;",
            encoded: false // Allows HTML entities to be rendered
        }
    });
    </script>

### rootItem.type `String`

Defines the type of the item "rootitem" or "item".


<div class="meta-api-description">
How do I configure the root item type in Kendo UI Chart breadcrumb navigation? Set or configure the main breadcrumb entry type in chart navigation to define whether it acts as the primary root node or a standard breadcrumb step, influencing how the chart renders, styles, and handles user interaction with breadcrumb elements, including customizing templates and controlling the hierarchical representation of chart paths.
</div>

#### Example

    <div id="chart"></div>
    <div id="breadcrumb"></div>
    <script>
    $("#chart").kendoChart({
        categoryAxis: {
            categories: ["A", "B", "C"]
        },
        series: [{
            type: "column",
            data: [1, 2, 3]
        }]
    });
    
    $("#breadcrumb").kendoChartBreadcrumb({
        chart: "#chart",
        rootItem: {
            type: "rootitem", // Specifies this is the root item
            text: "Home"
        }
    });
    </script>

### rootItem.href `String`

Defines the navigation link's url of the item (rendered if `navigation` is `true`).


<div class="meta-api-description">
How do I set the URL for a chart's breadcrumb root item in Kendo UI for jQuery? Set or customize the URL for a breadcrumb's main navigation link to enable clickable paths directing users to specific internal routes or external websites; control or configure the root breadcrumb item's hyperlink target to manage navigation behavior and link destinations within breadcrumb components, including setting href attributes for root-level navigation links, enabling interactive breadcrumb trail elements that respond to user clicks and facilitate seamless transitions to desired pages or resources.
</div>

#### Example

    <div id="chart"></div>
    <div id="breadcrumb"></div>
    <script>
    $("#chart").kendoChart({
        categoryAxis: {
            categories: ["A", "B", "C"]
        },
        series: [{
            type: "column",
            data: [1, 2, 3]
        }]
    });
    
    $("#breadcrumb").kendoChartBreadcrumb({
        chart: "#chart",
        navigation: true,
        rootItem: {
            text: "Dashboard",
            href: "/dashboard" // Navigation URL for the root item
        }
    });
    </script>

### rootItem.text `String`

Defines the text of the item.


<div class="meta-api-description">
How to set the initial breadcrumb text in Kendo UI chart navigation? Customize the main breadcrumb label or caption shown at the root level within a chart’s navigation path by setting the initial breadcrumb text, enabling control over the displayed root item name, customizing chart breadcrumb titles, adjusting the top-level breadcrumb caption, configuring the starting item label in chart navigation, specifying the root breadcrumb text, and tailoring the chart’s primary breadcrumb item to fit user interface or localization needs in charts with hierarchical navigation.
</div>

#### Example

    <div id="chart"></div>
    <div id="breadcrumb"></div>
    <script>
    $("#chart").kendoChart({
        categoryAxis: {
            categories: ["A", "B", "C"]
        },
        series: [{
            type: "column",
            data: [1, 2, 3]
        }]
    });
    
    $("#breadcrumb").kendoChartBreadcrumb({
        chart: "#chart",
        rootItem: {
            text: "Root Category" // Text displayed for the root item
        }
    });
    </script>

### rootItem.icon `String`

Defines the icon to be rendered.


<div class="meta-api-description">
How do I change the icon for the root item in a Kendo UI Chart breadcrumb? Configure or customize the top-level breadcrumb icon in a chart to visually represent the root item, enabling control over the navigation hierarchy symbol, setting or changing the displayed graphic for the main breadcrumb element, adjusting the icon for better user orientation within chart structures, specifying or replacing the root indicator icon to improve contextual clarity, and managing the breadcrumb appearance to reflect the starting point or highest-level node in charts or hierarchical visualizations.
</div>

#### Example

    <div id="chart"></div>
    <div id="breadcrumb"></div>
    <script>
    $("#chart").kendoChart({
        categoryAxis: {
            categories: ["A", "B", "C"]
        },
        series: [{
            type: "column",
            data: [1, 2, 3]
        }]
    });
    
    $("#breadcrumb").kendoChartBreadcrumb({
        chart: "#chart",
        rootItem: {
            text: "Home",
            icon: "home", // Icon name to be rendered
            showIcon: true
        }
    });
    </script>

### rootItem.itemClass `String`

Defines the item classes (the `li` element).


<div class="meta-api-description">
How do I customize the CSS class of the root breadcrumb item in a Kendo UI chart? Customize or define custom CSS classes, style selectors, or class names applied to the root breadcrumb list item in charts, enabling control over the root list item element's appearance or behavior, including configuring, setting, or assigning class attributes for targeted styling, scripting, or theming of the top-level breadcrumb node in chart navigation or hierarchical displays.
</div>

#### Example

    <div id="chart"></div>
    <div id="breadcrumb"></div>
    <script>
    $("#chart").kendoChart({
        categoryAxis: {
            categories: ["A", "B", "C"]
        },
        series: [{
            type: "column",
            data: [1, 2, 3]
        }]
    });
    
    $("#breadcrumb").kendoChartBreadcrumb({
        chart: "#chart",
        rootItem: {
            text: "Home",
            itemClass: "custom-breadcrumb-item highlighted" // Custom CSS classes for the li element
        }
    });
    </script>

### rootItem.linkClass `String`

Defines the link classes (the `a` element).


<div class="meta-api-description">
How do I customize the CSS classes for the root breadcrumb link in a Kendo UI chart? Customize or set CSS classes for the root breadcrumb link element in charts to control styling, apply custom icons, add CSS hooks, or enable event handler targeting on the top-level breadcrumb anchor tag, including configuring class names for the main breadcrumb link to adjust appearance, behavior, or selectors in navigation elements within chart components.
</div>

#### Example

    <div id="chart"></div>
    <div id="breadcrumb"></div>
    <script>
    $("#chart").kendoChart({
        categoryAxis: {
            categories: ["A", "B", "C"]
        },
        series: [{
            type: "column",
            data: [1, 2, 3]
        }]
    });
    
    $("#breadcrumb").kendoChartBreadcrumb({
        chart: "#chart",
        navigation: true,
        rootItem: {
            text: "Home",
            href: "/home",
            linkClass: "custom-breadcrumb-link bold-link" // Custom CSS classes for the a element
        }
    });
    </script>

### rootItem.iconClass `String`

Defines the icon classes (the `span` element).


<div class="meta-api-description">
How can I customize the appearance of the root breadcrumb icon in a Kendo UI chart? Set or configure custom CSS class names to control the visual style, icon fonts, or styling of the leading breadcrumb icon in charts, enabling customization of root breadcrumb icons through applying one or multiple CSS classes to the relevant span element, useful for developers seeking to style, override, or manipulate breadcrumb root icons via CSS selectors or scripting by targeting the icon container.
</div>

#### Example

    <div id="chart"></div>
    <div id="breadcrumb"></div>
    <script>
    $("#chart").kendoChart({
        categoryAxis: {
            categories: ["A", "B", "C"]
        },
        series: [{
            type: "column",
            data: [1, 2, 3]
        }]
    });
    
    $("#breadcrumb").kendoChartBreadcrumb({
        chart: "#chart",
        rootItem: {
            text: "Home",
            icon: "home",
            iconClass: "custom-icon large-icon", // Custom CSS classes for the icon span element
            showIcon: true
        }
    });
    </script>

### rootItem.showIcon `Boolean`

Defines whether to show the icon. Default value is *true* for `rootItem` and *false* for `item`.


<div class="meta-api-description">
How to show or hide the icon in Kendo UI chart breadcrumb navigation? Control the visibility of the root icon in breadcrumb navigation for charts by enabling or disabling the display of the primary root entry's icon, allowing customization of whether the main breadcrumb item shows its symbol or remains icon-free, supporting scenarios where you want to visually indicate the root or keep the navigation clean without the root icon. Adjust this setting to show, hide, toggle, or configure the root breadcrumb icon independently from other items in the breadcrumb trail, useful for UI clarity, icon management, or breadcrumb customization in chart navigation components.
</div>

#### Example

    <div id="chart"></div>
    <div id="breadcrumb"></div>
    <script>
    $("#chart").kendoChart({
        categoryAxis: {
            categories: ["A", "B", "C"]
        },
        series: [{
            type: "column",
            data: [1, 2, 3]
        }]
    });
    
    $("#breadcrumb").kendoChartBreadcrumb({
        chart: "#chart",
        rootItem: {
            text: "Home",
            icon: "home",
            showIcon: false // Hide the icon for the root item
        }
    });
    </script>

### rootItem.showText `Boolean`

Defines whether to show the text. Default value is *false* for `rootItem` and *true* for `item`.


<div class="meta-api-description">
How to show root breadcrumb item text in Kendo UI chart? Control whether the root breadcrumb item in a chart displays its text label or stays hidden, enabling configuration of the initial breadcrumb element’s visibility with options to show or hide the root label independently from other breadcrumb items, useful for customizing breadcrumb navigation appearance, toggling the root item’s text display during rendering, and managing label visibility in hierarchical chart navigation including initialization settings for root versus regular items.
</div>

#### Example

    <div id="chart"></div>
    <div id="breadcrumb"></div>
    <script>
    $("#chart").kendoChart({
        categoryAxis: {
            categories: ["A", "B", "C"]
        },
        series: [{
            type: "column",
            data: [1, 2, 3]
        }]
    });
    
    $("#breadcrumb").kendoChartBreadcrumb({
        chart: "#chart",
        rootItem: {
            text: "Home",
            icon: "home",
            showText: true, // Show the text for the root item
            showIcon: true
        }
    });
    </script>
