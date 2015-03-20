---
title: Overview
page_title: How to use the Chart PHP class, server-side wrapper for Kendo UI Chart widget
description: Learn how to bind Kendo UI Chart for PHP, handle Kendo UI Chart Events, access an existing chart.
---

# Chart

The Kendo Chart for PHP is a server-side wrapper for the [Kendo UI Chart](/api/dataviz/chart) widget.

## Getting Started

There are two ways to bind Kendo Chart for PHP:

* [local](/php/widgets/chart/local-binding) - the chart is bound to PHP array
* [remote](/php/widgets/chart/remote-binding) - the chart makes AJAX requests and is bound to JSON result

Here is how to configure the chart for local binding:

1. Follow the steps from the [introduction](/php/introduction) - include the autoloader, JavaScript and CSS files.

2. Create an array which to which the chart will be bound to

        <?php
        $data = array(
            array('name' => 'John Doe', 'age' => 32),
            array('name' => 'Jane Doe', 'age' => 29)
        );
        ?>
3. Create a [data source](/api/wrappers/php/Kendo/Data/DataSource) and set its [data](/api/wrappers/php/Kendo/Data/DataSource#data):

        <?php
        $dataSource = new \Kendo\Data\DataSource();
        $dataSource->data($data);
        ?>
4. Create a [chart](/api/wrappers/php/Kendo/Dataviz/UI/Chart), configure its [series](/api/wrappers/php/Kendo/Dataviz/UI/Chart#addSeriesItem), [categoryAxis](/api/wrappers/php/Kendo/Dataviz/UI/Chart#addCategoryAxisItem) and set its [data source](/api/wrappers/php/Kendo/Dataviz/UI/Chart#datasource).

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
5. Output the chart by echo-ing the result of the [render](/api/wrappers/php/Kendo/UI/Widget#render) method.

        <?php
        echo $chart->render();
        ?>

## Getting Client-side Reference

You can reference the clien-side Kendo Chart instance via [jQuery.data()](http://api.jquery.com/jQuery.data/).
Once a reference has been established, you can use the [API](/api/dataviz/chart#methods) to control its behavior.

### Example

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

## Handling Events

You can subscribe to all Chart [events](/api/dataviz/chart#events).

### Example - subscribing by specifying JavaScript function name

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

### Example - providing inline JavaScript code

    <?php
    $chart = new \Kendo\Dataviz\UI\Chart('chart');

    // Provide inline JavaScript code that will handle the 'dataBound' event of the chart
    $chart->dataBound('function() { /* Handle the dataBound event */ }');

    echo $chart->render();
    ?>
