---
title: Local binding
page_title: How to bind Kendo Chart for PHP to PHP array
description: Learn how to bind Kendo UI Chart for PHP to array of data
---

# Local Binding to Array

This help topic shows how to bind Kendo Chart for PHP to a PHP [array](http://php.net/manual/en/language.types.array.php). This array
can be populated from a data base or declared inline (in the page).

## Binding to array returned by PDO

PHP Data Objects ([PDO](http://www.php.net/manual/en/intro.pdo.php)) is an interface for accessing various databases in PHP. Here is how to bind Kendo Chart to array
returned by PDO.

First we will configure a Kendo Chart for PHP binding and then we will implement the remote service which will return JSON.


> The following demo is using the sample SQLite database shipped with the Telerik UI for PHP** demos (**/wrappers/php/sample.db).

1. Follow the steps from the [introduction](/php/introduction) - include the autoloader, JavaScript and CSS files.
1. Create a PDO connection

        <?php
        $db = new PDO('sqlite:../sample.db');
        ?>
1. Retrieve all records from the `Weather` table

        <?php
        $statement = $db->prepare('SELECT Date, TMax FROM Weather LIMIT 10');
        $statement->execute();
        $weather = $statement->fetchAll(PDO::FETCH_ASSOC);
        ?>
1. Create a [data source](/api/wrappers/php/Kendo/Data/DataSource) and set its [data](/api/wrappers/php/Kendo/Data/DataSource#data) and [schema](/api/wrappers/php/Kendo/Data/DataSource#schema). Setting the schema is required to specify the model fields. Those fields are required for filtering and editing.

        <?php
        // Create the schema model
        $model = new \Kendo\Data\DataSourceSchemaModel();

        // Create a field for the 'Date' column of the 'Weather' table
        $dateField = new \Kendo\Data\DataSourceSchemaModelField('Date');
        $dateField->type('date');

        // Create a field for the 'TMax' column of the 'Weather' table
        $tmaxField = new \Kendo\Data\DataSourceSchemaModelField('TMax');
        $tmaxField->type('number');

        $model->addField($dateField, $tmaxField);

        // Create the schema
        $schema = new \Kendo\Data\DataSourceSchema();

        // Set its model
        $schema->model($model);

        // Create the data source
        $dataSource = new \Kendo\Data\DataSource();

        // Specify the schema and data
        $dataSource->data($weather)
                   ->schema($schema);
        ?>
1. Create a [chart](/api/wrappers/php/Kendo/Dataviz/UI/Chart), configure its [series](/api/wrappers/php/Kendo/Dataviz/UI/Chart#addSeriesItem), [categoryAxis](/api/wrappers/php/Kendo/Dataviz/UI/Chart#addCategoryAxisItem) and set its [data source](/api/wrappers/php/Kendo/Dataviz/UI/Chart#datasource).

        <?php
        $chart = new \Kendo\Dataviz\UI\Chart('chart');

        $tmaxSeries = new \Kendo\Dataviz\UI\ChartSeriesItem();
        $tmaxSeries->field('TMax');

        $categoryAxis = new \Kendo\Dataviz\UI\ChartCategoryAxisItem();
        $categoryAxis->field('Date');

        $chart->addSeriesItem($tmaxSeries)
              ->addCategoryAxisItem($categoryAxis)
              ->dataSource($dataSource);
        ?>
1. Output the chart by echo-ing the result of the [render](/api/wrappers/php/Kendo/UI/Widget#render) method.

        <?php
        echo $chart->render();
        ?>

