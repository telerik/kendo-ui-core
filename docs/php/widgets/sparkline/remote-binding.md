---
title: Remote Binding
page_title: Remote Binding | Sparkline PHP Class
description: "Bind Kendo UI Sparkline PHP class to JSON."
slug: remotebinding_sparkline_uiforphp
position: 3
---

# Remote Binding

This article shows how to bind Kendo UI Sparkline for PHP to a JSON response.

> **Important**
>
> The following demos are using the sample SQLite database shipped with the Telerik UI for PHP demos (`/wrappers/php/sample.db`).

## Bind to PDO-Returned Arrays

### Configuration

Below are listed the steps for you to follow when configuring the Kendo UI Sparkline for PHP for remote binding.

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

**Step 3** Create a Sparkline, configure its columns and set its data source.

###### Example

        <?php
        $sparkline = new \Kendo\Dataviz\UI\Sparkline('sparkline');

        $tmaxSeries = new \Kendo\Dataviz\UI\SparklineSeriesItem();
        $tmaxSeries->field('TMax');

        $sparkline->addSeriesItem($tmaxSeries)
              ->dataSource($dataSource);
        ?>

**Step 4** Output the Sparkline by echoing the result of the `render` method.

###### Example

        <?php
        echo $sparkline->render();
        ?>

### Create PHP file which returns JSON

**Step 1** Create a new PHP file called `weather.php`. This file will return data in JSON format. The data source is configured to request it via the [`url`](/api/php/Kendo/Data/DataSourceTransportRead#url) setting.

**Step 2** Create a PDO connection.

###### Example

        <?php
        $db = new PDO('sqlite:../sample.db');
        ?>

**Step 3** Retrieve records from the **Weather** table.

###### Example

        <?php
        $statement = $db->prepare('SELECT TMax FROM Weather LIMIT 10');
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

Other articles on Telerik UI for PHP and on the Sparkline:

* [Overview of the Sparkline PHP Class]({% slug overview_sparkline_uiforphp %})
* [Local Binding of the Sparkline PHP Class]({% slug localbinding_sparkline_uiforphp %})
* [Overview of the Kendo UI Sparkline Widget]({% slug overview_kendoui_sparklinescharts %})
* [Telerik UI for PHP API Reference Folder](/api/php/Kendo/UI/AutoComplete)
* [Telerik UI for PHP Classes Folder]({% slug overview_autocomplete_uiforphp %})
