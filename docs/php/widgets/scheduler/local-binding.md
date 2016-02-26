---
title: Local Binding
page_title: Local Binding | Scheduler PHP Class
description: "Bind Kendo UI Scheduler PHP class to an array of data."
slug: localbinding_scheduler_uiforphp
position: 2
---

# Local Binding

This article shows how to bind Kendo UI Scheduler for PHP to a PHP [array](http://php.net/manual/en/language.types.array.php).

## Approaches

This PHP array can be populated from a database or declared inline (in the page).

### Bind to PDO-Returned Arrays

[PHP Data Objects (PDO)](http://www.php.net/manual/en/intro.pdo.php) is an interface for accessing various databases in PHP.

Below are listed the steps for you to follow when binding the Kendo UI Scheduler for PHP to an array returned by PDO.

> **Important**
>
> The following demo is using the sample SQLite database shipped with the Telerik UI for PHP demos (`/wrappers/php/sample.db`).

**Step 1** Make sure you followed all the steps from the [introductory article on Telerik UI for PHP]({% slug overview_uiforphp %})&mdash;include the autoloader, JavaScript, and CSS files.

**Step 2** Create a PDO connection.

###### Example

        <?php
        $db = new PDO('sqlite:../sample.db');
        ?>

**Step 3** Retrieve all records from the **Tasks** table (format the Dates as UTC).

###### Example

        <?php
        $statement = $db->prepare('SELECT *, strftime(\'%Y-%m-%dT%H:%M:%SZ\', Start) as Start, strftime(\'%Y-%m-%dT%H:%M:%SZ\', End) as End FROM Tasks');
        $statement->execute();
        $data = $statement->fetchAll(PDO::FETCH_ASSOC);
        ?>

<!--*-->        
**Step 4** Create a [data source](/api/php/Kendo/Data/DataSource) and set its [`data`](/api/php/Kendo/Data/DataSource#data) and [`schema`](/api/php/Kendo/Data/DataSource#schema). Setting the `schema` is required to specify the model fields.

###### Example

        <?php
        // Create the schema model
        $model = new \Kendo\Data\DataSourceSchemaModel();

        // Map the 'TaskID' column of the 'Tasks' table to 'taskID' field
        $taskIDField = new \Kendo\Data\DataSourceSchemaModelField('taskID');
        $taskIDField->type('number')
                    ->from('TaskID')
                    ->nullable(true);

        // Map the 'Title' column of the 'Tasks' table to 'title' field and configure it options
        $titleField = new \Kendo\Data\DataSourceSchemaModelField('title');
        $titleField->from('Title')
                ->defaultValue('No title')
                ->validation(array('required' => true));

        // Map the 'Start' column of the 'Tasks' table to 'start' field
        $startField = new \Kendo\Data\DataSourceSchemaModelField('start');
        $startField->type('date')
                ->from('Start');

        // Map the 'End' column of the 'Tasks' table to 'end' field
        $endField = new \Kendo\Data\DataSourceSchemaModelField('end');
        $endField->type('date')
                ->from('End');

        // Map the 'IsAllDay' column of the 'Tasks' table to 'isAllDay' field
        $isAllDayField = new \Kendo\Data\DataSourceSchemaModelField('isAllDay');
        $isAllDayField->type('boolean')
                ->from('IsAllDay');

        // Map the 'Description' column of the 'Tasks' table to 'description' field
        $descriptionField = new \Kendo\Data\DataSourceSchemaModelField('description');
        $descriptionField->type('string')
                ->from('Description');

        // Map the 'RecurrenceID' column of the 'Tasks' table to 'recurrenceId' field
        $recurrenceIdField = new \Kendo\Data\DataSourceSchemaModelField('recurrenceId');
        $recurrenceIdField->from('RecurrenceID');

        // Map the 'RecurrenceRule' column of the 'Tasks' table to 'recurrenceRule' field
        $recurrenceRuleField = new \Kendo\Data\DataSourceSchemaModelField('recurrenceRule');
        $recurrenceRuleField->from('RecurrenceRule');

        // Map the 'RecurrenceException' column of the 'Tasks' table to 'recurrenceException' field
        $recurrenceExceptionField = new \Kendo\Data\DataSourceSchemaModelField('recurrenceException');
        $recurrenceExceptionField->from('RecurrenceException');

        $model->id('taskID')
            ->addField($taskIDField)
            ->addField($titleField)
            ->addField($startField)
            ->addField($endField)
            ->addField($descriptionField)
            ->addField($recurrenceIdField)
            ->addField($recurrenceRuleField)
            ->addField($recurrenceExceptionField)
            ->addField($isAllDayField);

        // Create the schema
        $schema = new \Kendo\Data\DataSourceSchema();

        // Set its model
        $schema->model($model)

        // Create the data source
        $dataSource = new \Kendo\Data\DataSource();

        // Specify the schema and data
        $dataSource->data($products)
                   ->schema($schema);
        ?>

**Step 5** Create a [Scheduler](/api/php/Kendo/UI/Scheduler), configure its initial [`date`](/api/php/Kendo/UI/Scheduler#date) and set its [`dataSource`](/api/php/Kendo/UI/Scheduler#datasource).

###### Example

        <?php
        $scheduler = new \Kendo\UI\Scheduler('scheduler');

        $scheduler->date(new DateTime('2013/6/13')
                ->dataSource(dataSource);
        ?>

**Step 6** Output the Scheduler by echoing the result of the `render` method.

###### Example

        <?php
        echo $scheduler->render();
        ?>

### Use DataSourceResult Helpers

The `DataSourceResult` class is a helper utility on top of PDO which simplifies common CRUD operations. It is distributed with the Telerik UI for PHP demos and can be found in the `/wrappers/php/lib/` directory of the Telerik UI for PHP distribution.

**Step 1** Make sure you followed all the steps from the [introductory article on Telerik UI for PHP]({% slug overview_uiforphp %})&mdash;include the autoloader, JavaScript, and CSS files.

**Step 2** Copy `/wrappers/php/lib/DataSourceResult.php` to your web site root and include it.

###### Example

        <?php require_once 'lib/DataSourceResult.php'; ?>

**Step 3** Create a new instance of the `DataSourceResult` and use its `read` method to retrieve data from the database.

###### Example

        <?php
        // The constructor accepts the PDO DSN for the target database
        $result = new DataSourceResult('sqlite:../sample.db');

        // The 'read' method accepts table name and array of columns to select.
        $data = $result->read('Tasks', array('Title', 'strftime(\'%Y-%m-%dT%H:%M:%SZ\', Start) as Start', 'strftime(\'%Y-%m-%dT%H:%M:%SZ\', End) as End', 'IsAllDay', 'Description'));
        // The result of the 'read' method is an array with two elements 'data' and 'total'.
        ?>

**Step 4** Configure a `DataSource` and `schema`.

###### Example

        <?php
        // Create the schema model
        $model = new \Kendo\Data\DataSourceSchemaModel();

        // Map the 'TaskID' column of the 'Tasks' table to 'taskID' field
        $taskIDField = new \Kendo\Data\DataSourceSchemaModelField('taskID');
        $taskIDField->type('number')
                    ->from('TaskID')
                    ->nullable(true);

        // Map the 'Title' column of the 'Tasks' table to 'title' field and configure it options
        $titleField = new \Kendo\Data\DataSourceSchemaModelField('title');
        $titleField->from('Title')
                ->defaultValue('No title')
                ->validation(array('required' => true));

        // Map the 'Start' column of the 'Tasks' table to 'start' field
        $startField = new \Kendo\Data\DataSourceSchemaModelField('start');
        $startField->type('date')
                ->from('Start');

        // Map the 'End' column of the 'Tasks' table to 'end' field
        $endField = new \Kendo\Data\DataSourceSchemaModelField('end');
        $endField->type('date')
                ->from('End');

        // Map the 'IsAllDay' column of the 'Tasks' table to 'isAllDay' field
        $isAllDayField = new \Kendo\Data\DataSourceSchemaModelField('isAllDay');
        $isAllDayField->type('boolean')
                ->from('IsAllDay');

        // Map the 'Description' column of the 'Tasks' table to 'description' field
        $descriptionField = new \Kendo\Data\DataSourceSchemaModelField('description');
        $descriptionField->type('string')
                ->from('Description');

        $model->id('taskID')
            ->addField($taskIDField)
            ->addField($titleField)
            ->addField($startField)
            ->addField($endField)
            ->addField($descriptionField)
            ->addField($isAllDayField);

        // Create the schema
        $schema = new \Kendo\Data\DataSourceSchema();

        // Set its model and describe the data format.
        $schema->model($model)
               ->data('data')
               ->total('total');

        // Create the data source
        $dataSource = new \Kendo\Data\DataSource();

        // Specify the schema and data
        $dataSource->data($data)
                   ->schema($schema);
        ?>

**Step 5** Create a Scheduler, configure its initial date and set its `dataSource`.

###### Example

        <?php
        $scheduler = new \Kendo\UI\Scheduler('scheduler');

        $scheduler->date(new DateTime('2013/6/13')
                ->dataSource(dataSource);
        ?>

**Step 6** Output the Scheduler by echoing the result of the `render` method.

###### Example

        <?php
        echo $scheduler->render();
        ?>

## See Also

Other articles on Telerik UI for PHP and on the Scheduler:

* [Overview of the Scheduler PHP Class]({% slug overview_scheduler_uiforphp %})
* [Remote Binding of the Scheduler PHP Class]({% slug remotebinding_scheduler_uiforphp %})
* [Overview of the Kendo UI Scheduler Widget]({% slug overview_kendoui_scheduler_widget %})
* [Telerik UI for PHP API Reference Folder](/api/php/Kendo/UI/AutoComplete)
* [Telerik UI for PHP Classes Folder]({% slug overview_autocomplete_uiforphp %})
