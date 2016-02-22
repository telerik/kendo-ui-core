---
title: Remote Binding
page_title: Remote Binding | Chart PHP Class
description: "Bind Kendo UI Chart PHP class to JSON."
slug: remotebinding_chart_uiforphp
position: 3
---

# Remote Binding

This article shows how to bind Kendo UI AutoComplete for PHP to a JSON response.

> **Important**
>
> The following demos are using the sample SQLite database shipped with the Telerik UI for PHP demos (`/wrappers/php/sample.db`).

## Bind to PDO-Returned Arrays

### Configuration

Below are listed the steps for you to follow when configuring the Kendo UI AutoComplete for PHP for remote binding.

**Step 1** Make sure you followed all the steps from the [introductory article on Telerik UI for PHP]({% slug overview_uiforphp %})&mdash;include the autoloader, JavaScript, and CSS files.

**Step 2** Create a data source and configure it.

###### Example

        <?php
        $transport = new \Kendo\Data\DataSourceTransport();

        $read = new \Kendo\Data\DataSourceTransportRead();

        // Specify the url of the PHP page which will act as the remote service
        $read->url('weather.php')
             ->type('POST');

        $transport->read($read);

        // Configure the model
        $model = new \Kendo\Data\DataSourceSchemaModel();

        // Create a field for the 'Date' column of the 'Weather' table
        $dateField = new \Kendo\Data\DataSourceSchemaModelField('Date');
        $dateField->type('date');

        // Create a field for the 'TMax' column of the 'Weather' table
        $tmaxField = new \Kendo\Data\DataSourceSchemaModelField('TMax');
        $tmaxField->type('number');

        $model->addField($dateField, $tmaxField);

        $schema = new \Kendo\Data\DataSourceSchema();

        $schema->model($model);

        $dataSource = new \Kendo\Data\DataSource();

        // Configure data source
        $dataSource->transport($transport)
                   ->schema($schema);
        ?>

**Step 3** Create an Chart, configure its `series` option and set its data source.

###### Example

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

**Step 4** Output the Chart by echoing the result of the `render` method.

###### Example

        <?php
        echo $chart->render();
        ?>

### JSON-Returning File Creation

Below are listed the steps for you to follow when creating a PHP file which returns JSON.

**Step 1** Create a new PHP file called `weather.php`. This file will return data in JSON format. The data source is configured to request it via the [`url`](/api/php/Kendo/Data/DataSourceTransportRead#url) setting.

**Step 2** Create a PDO connection.

###### Example

        <?php
        $db = new PDO('sqlite:../sample.db');
        ?>

**Step 3** Retrieve all records from the **Weather** table.

###### Example

        <?php
        $statement = $db->prepare('SELECT Date, TMax FROM Weather LIMIT 10');
        $statement->execute();
        $weather = $statement->fetchAll(PDO::FETCH_ASSOC);
        ?>

**Step 4** Return the records as JSON.

###### Example

        <?php
        // Set response content type
        header('Content-Type: application/json');
        // Return JSON

        echo json_encode($weather);
        ?>

## See Also

Other articles on Telerik UI for PHP and on the Chart:

* [Overview of the Chart PHP Class]({% slug overview_chart_uiforphp %})
* [Local Binding of the Chart PHP Class]({% slug localbinding_chart_uiforphp %})
* [Overview of the Kendo UI Chart Widget]({% slug overview_kendoui_charts_widget %})
* [Telerik UI for PHP API Reference Folder](/api/php/Kendo/UI/AutoComplete)
* [Telerik UI for PHP Classes Folder]({% slug overview_autocomplete_uiforphp %})
