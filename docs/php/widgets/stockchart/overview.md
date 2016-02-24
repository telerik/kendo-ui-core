---
title: Overview
page_title: Overview | StockChart PHP Class
description: "Get started with the StockChart PHP class in Kendo UI."
slug: overview_stockchart_uiforphp
position: 1
---

# StockChart PHP Class Overview

The Kendo UI StockChart for PHP is a server-side wrapper for the [Kendo UI StockChart](/api/javascript/dataviz/ui/stock-chart) widget.

## Getting Started

### The Basics

There are two ways to bind a Kendo UI StockChart for PHP:

* [Locally]({% slug localbinding_chart_uiforphp %})&mdash;Local binding binds the StockChart to a PHP array.
* [Remotely]({% slug remotebinding_chart_uiforphp %})&mdash;During remote binding the StockChart makes AJAX requests and is bound to the JSON result.

### Configuration

Below are listed the steps for you to follow when configuring the Kendo UI StockChart for PHP.

**Step 1** Make sure you followed all the steps from the [introductory article on Telerik UI for PHP]({% slug overview_uiforphp %})&mdash;include the autoloader, JavaScript, and CSS files.

**Step 2** Create an array to which the [StockChart](/api/php/Kendo/Dataviz/UI/StockChart) will be bound to.

###### Example

        <?php
        $data = array(
            array('Date' => '2014-04-01', 'Open' => 10, 'High' => 20, 'Low' => 9, 'Close' => 12),
            array('Date' => '2014-04-02', 'Open' => 12, 'High' => 19, 'Low' => 10, 'Close' => 14)
        );
        ?>

**Step 3** Create the [`dataSource`](/api/php/Kendo/Data/DataSource) and set its [`data`](/api/php/Kendo/Data/DataSource#data).

###### Example

        <?php
        $dataSource = new \Kendo\Data\DataSource();
        $dataSource->data($data);
        ?>

**Step 4** Create a [StockChart](/api/php/Kendo/Dataviz/UI/StockChart) and configure it.

###### Example

        <?php
        $chart = new \Kendo\Dataviz\UI\StockChart('stock-chart');

        $series = new \Kendo\Dataviz\UI\StockChartSeriesItem();
        $series->type('candlestick')
               ->openField('Open')
               ->highField('High')
               ->lowField('Low')
               ->closeField('Close');

        $navigator = new \Kendo\Dataviz\UI\StockChartNavigator();
        $navigator->addSeriesItem(array('type' => 'area', 'field' => 'Close'));

        $chart->dataSource($dataSource)
              ->dateField('Date')
              ->addSeriesItem($series)
              ->navigator($navigator);
        ?>

**Step 5** Output the StockChart by echoing the result of the `render` method.

###### Example

        <?php echo $chart->render(); ?>

## Event Handling

You can subscribe to all StockChart [events](/api/javascript/dataviz/ui/stock-chart#events).

### Specify Function Names

The example below demonstrates how to subscribe for events by specifying a JavaScript function name.

###### Example

        <?php
        $chart = new \Kendo\Dataviz\UI\StockChart('stock-chart');

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

The example below demonstrates how to subscribe to events by providing inline JavaScript code.

###### Example

        <?php
        $chart = new \Kendo\Dataviz\UI\StockChart('stock-chart');

        // Provide inline JavaScript code that will handle the 'dataBound' event of the chart
        $chart->dataBound('function() { /* Handle the dataBound event */ }');

        echo $chart->render();
        ?>

<!--*-->
## Reference

### Client-Side Instances

You are able to reference an existing StockChart instance via the [`jQuery.data()`](http://api.jquery.com/jQuery.data/). Once a reference is established, use the [StockChart API](/api/javascript/dataviz/ui/stock-chart#methods) to control its behavior.

###### Example

          // Put this after your Kendo UI StockChart for PHP render() call
          <script>
              $(function() {
                  // Notice that the name of the chart is used to get its client-side instance
                  var chart = $("#stockChart").data("kendoStockChart");
              });
          </script>

## See Also

Other articles on Telerik UI for PHP and on the StockChart:

* [Overview of the Kendo UI StockChart Widget]({% slug overview_kendoui_stockcharts %})
* [Telerik UI for PHP API Reference Folder](/api/php/Kendo/UI/AutoComplete)
* [Telerik UI for PHP Classes Folder]({% slug overview_autocomplete_uiforphp %})
