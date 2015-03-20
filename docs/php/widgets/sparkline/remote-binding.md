---
title: Remote binding
page_title: How to bind Kendo Sparkline for PHP to remote service which returns JSON
description: Learn how to bind Kendo UI Sparkline for PHP to JSON
---
# Remote Binding

This help topic shows how to bind Kendo Sparkline for PHP to JSON response.

> The following demos are using the sample SQLite database shipped with the Telerik UI for PHP** demos (**/wrappers/php/sample.db).

## Binding to array returned by PDO

### Configure Sparkline for Remote Binding

1. Follow the steps from the [introduction](/php/introduction) - include the autoloader, JavaScript and CSS files.
1. Create a data source and configure it:

        <?php
        $transport = new \Kendo\Data\DataSourceTransport();

        $read = new \Kendo\Data\DataSourceTransportRead();

        // Specify the url of the PHP page which will act as the remote service
        $read->url('weather.php')
             ->type('POST');

        $transport->read($read);

        // Configure the model
        $model = new \Kendo\Data\DataSourceSchemaModel();

        // Create a field for the 'TMax' column of the 'Weather' table
        $tmaxField = new \Kendo\Data\DataSourceSchemaModelField('TMax');
        $tmaxField->type('number');

        $model->addField($tmaxField);

        $schema = new \Kendo\Data\DataSourceSchema();

        $schema->model($model);

        $dataSource = new \Kendo\Data\DataSource();

        // Configure data source
        $dataSource->transport($transport)
                   ->schema($schema);
        ?>
1. Create a sparkline, configure its columns and set its data source.

        <?php
        $sparkline = new \Kendo\Dataviz\UI\Sparkline('sparkline');

        $tmaxSeries = new \Kendo\Dataviz\UI\SparklineSeriesItem();
        $tmaxSeries->field('TMax');

        $sparkline->addSeriesItem($tmaxSeries)
              ->dataSource($dataSource);
        ?>
1. Output the sparkline by echo-ing the result of the render method.

        <?php
        echo $sparkline->render();
        ?>

### Create PHP file which returns JSON

1. Create a new php file called **weather.php**. This file will return data in JSON format. The data source is configured to request it via the [url](/api/wrappers/php/Kendo/Data/DataSourceTransportRead#url) setting.
1. Create a PDO connection

        <?php
        $db = new PDO('sqlite:../sample.db');
        ?>
1. Retrieve records from the `Weather` table

        <?php
        $statement = $db->prepare('SELECT TMax FROM Weather LIMIT 10');
        $statement->execute();
        $weather = $statement->fetchAll(PDO::FETCH_ASSOC);
        ?>
1. Return the records as JSON

        <?php
        // Set response content type
        header('Content-Type: application/json');
        // Return JSON

        echo json_encode($weather);
        ?>

