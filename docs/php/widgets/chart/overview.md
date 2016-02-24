---
title: Overview
page_title: Overview | Chart PHP Class
description: "Get started with the Chart PHP class in Kendo UI."
slug: overview_chart_uiforphp
position: 1
---

# Chart PHP Class Overview

The Kendo UI Chart for PHP is a server-side wrapper for the [Kendo UI Chart](/api/javascript/dataviz/ui/chart) widget.

## Getting Started

### The Basics

There are two ways to bind a Kendo UI Chart for PHP:

* [Locally]({% slug localbinding_chart_uiforphp %})&mdash;Local binding binds the Chart to a PHP array.
* [Remotely]({% slug remotebinding_chart_uiforphp %})&mdash;During remote binding the Chart makes AJAX requests and is bound to the JSON result.

### Configuration

Below are listed the steps for you to follow when configuring the Kendo UI Chart for local binding.

**Step 1** Make sure you followed all the steps from the [introductory article on Telerik UI for PHP]({% slug overview_uiforphp %})&mdash;include the autoloader, JavaScript, and CSS files.

**Step 2** Create an array to which the Chart will be bound.

###### Example

        <?php
        $data = array(
            array('name' => 'John Doe', 'age' => 32),
            array('name' => 'Jane Doe', 'age' => 29)
        );
        ?>

**Step 3** Create a [data source](/api/php/Kendo/Data/DataSource) and set its [`data`](/api/php/Kendo/Data/DataSource#data).

###### Example

        <?php
        $dataSource = new \Kendo\Data\DataSource();
        $dataSource->data($data);
        ?>

**Step 4** Create a [Chart](/api/php/Kendo/Dataviz/UI/Chart), configure its [`series`](/api/php/Kendo/Dataviz/UI/Chart#addSeriesItem), [`categoryAxis`](/api/php/Kendo/Dataviz/UI/Chart#addCategoryAxisItem) and set its [`DataSource`](/api/php/Kendo/Dataviz/UI/Chart#datasource).

###### Example

        <?php
        $ageSeries = new \Kendo\Dataviz\UI\ChartSeriesItem();
        $ageSeries->field('age');

        $categoryAxis = new \Kendo\Dataviz\UI\ChartCategoryAxisItem();
        $categoryAxis->field('name');

        $chart = new \Kendo\Dataviz\UI\Chart('chart');
        $chart->addSeriesItem($ageSeries)
              ->addCategoryAxisItem($categoryAxis)
              ->dataSource($dataSource);
        ?>

**Step 5** Output the Chart by echoing the result of the `render` method.

###### Example

        <?php
        echo $chart->render();
        ?>

## Event Handling

You can subscribe to all Chart [events](/api/javascript/dataviz/ui/chart).

### Specify Function Names

The example below demonstrates how to subscribe for events by specifying a JavaScript function name.

###### Example

        <?php
        $chart = new \Kendo\Dataviz\UI\Chart('chart');

        // The 'chart_dataBound' JavaScript function will handle the 'dataBound' event of the chart
        $chart->dataBound('chart_dataBound');

        echo $chart->render();
        ?>
        <script>
        function chart_dataBound() {
            // Handle the dataBound event
        }
        </script>

### Provide Inline Code

The example below demonstrates how to provide inline JavaScript code.

###### Example

        <?php
        $chart = new \Kendo\Dataviz\UI\Chart('chart');

        // Provide inline JavaScript code that will handle the 'dataBound' event of the chart
        $chart->dataBound('function() { /* Handle the dataBound event */ }');

        echo $chart->render();
        ?>

<!--*-->
## Reference

### Client-Side Instances

You can reference the client-side Kendo UI Chart instance via [`jQuery.data()`](http://api.jquery.com/jQuery.data/). Once a reference is established, use the [Chart API](/api/javascript/dataviz/ui/chart#methods) to control its behavior.

###### Example

        <?php
        $chart = new \Kendo\Dataviz\UI\Chart('chart');
        echo $chart->render();
        ?>
        <script>
        $(function() {
            // The constructor parameter is used as the 'id' HTML attribute of the chart
            var chart = $("#chart").data("kendoChart")
        });
        </script>

## See Also

Other articles on Telerik UI for PHP and on the Chart:

* [Local Binding of the Chart PHP Class]({% slug localbinding_chart_uiforphp %})
* [Remote Binding of the Chart PHP Class]({% slug remotebinding_chart_uiforphp %})
* [Overview of the Kendo UI Chart Widget]({% slug overview_kendoui_charts_widget %})
* [Telerik UI for PHP API Reference Folder](/api/php/Kendo/UI/AutoComplete)
* [Telerik UI for PHP Classes Folder]({% slug overview_autocomplete_uiforphp %})
