---
title: Local Binding
page_title: Local Binding | Chart PHP Class
description: "Bind Kendo UI Chart PHP class to an array of data."
slug: localbinding_chart_uiforphp
position: 2
---

# Local Binding

This article shows how to bind Kendo UI Chart for PHP to a PHP [array](http://php.net/manual/en/language.types.array.php).

## Approaches

This PHP array can be populated from a database or declared inline (in the page).

### Bind to PDO-Returned Arrays

[PHP Data Objects (PDO)](http://www.php.net/manual/en/intro.pdo.php) is an interface for accessing various databases in PHP.

Below are listed the steps for you to follow when binding the Kendo UI AutoComplete for PHP to an array returned by PDO.

> **Important**
>
> The following demo is using the sample SQLite database shipped with the Telerik UI for PHP demos (`/wrappers/php/sample.db`).

**Step 1** Make sure you followed all the steps from the [introductory article on Telerik UI for PHP]({% slug overview_uiforphp %})&mdash;include the autoloader, JavaScript, and CSS files.

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

**Step 4** Create a [`dataSource`](/api/php/Kendo/Data/DataSource) and set its [`data`](/api/php/Kendo/Data/DataSource#data) and [`schema`](/api/php/Kendo/Data/DataSource#schema). Setting the schema is required to specify the model fields. Those fields are required for filtering and editing.

###### Example

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

**Step 5** Create a [Chart](/api/php/Kendo/Dataviz/UI/Chart), configure its [`series`](/api/php/Kendo/Dataviz/UI/Chart#addSeriesItem), [`categoryAxis`](/api/php/Kendo/Dataviz/UI/Chart#addCategoryAxisItem) and set its [`dataSource`](/api/php/Kendo/Dataviz/UI/Chart#datasource).

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

**Step 6** Output the Chart by echoing the result of the `render` method.

###### Example

        <?php
        echo $chart->render();
        ?>

## See Also

Other articles on Telerik UI for PHP and on the Chart:

* [Overview of the Chart PHP Class]({% slug overview_chart_uiforphp %})
* [Remote Binding of the Chart PHP Class]({% slug remotebinding_chart_uiforphp %})
* [Overview of the Kendo UI Chart Widget]({% slug overview_kendoui_charts_widget %})
* [Telerik UI for PHP API Reference Folder](/api/php/Kendo/UI/AutoComplete)
* [Telerik UI for PHP Classes Folder]({% slug overview_autocomplete_uiforphp %})
