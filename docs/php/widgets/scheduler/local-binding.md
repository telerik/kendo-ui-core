---
title: Local binding
page_title: How to bind Kendo Scheduler for PHP to PHP array
description: Learn how to bind Kendo UI Scheduler for PHP to array of data
---

# Local Binding to Array

This help topic shows how to bind Kendo Scheduler for PHP to a PHP [array](http://php.net/manual/en/language.types.array.php). This array
can be populated from a data base or declared inline (in the page).

## Binding to array returned by PDO

PHP Data Objects ([PDO](http://www.php.net/manual/en/intro.pdo.php)) is an interface for accessing various databases in PHP. Here is how to bind Kendo Scheduler to array
returned by PDO.

First we will configure a Kendo Scheduler for PHP binding and then we will implement the remote service which will return JSON.


> The following demo is using the sample SQLite database shipped with the Telerik UI for PHP** demos (**/wrappers/php/sample.db).

1. Follow the steps from the [introduction](/php/introduction) - include the autoloader, JavaScript and CSS files.
1. Create a PDO connection

        <?php
        $db = new PDO('sqlite:../sample.db');
        ?>
1. Retrieve all records from the `Tasks` table (format the Dates as UTC)

        <?php
        $statement = $db->prepare('SELECT *, strftime(\'%Y-%m-%dT%H:%M:%SZ\', Start) as Start, strftime(\'%Y-%m-%dT%H:%M:%SZ\', End) as End FROM Tasks');
        $statement->execute();
        $data = $statement->fetchAll(PDO::FETCH_ASSOC);
        ?>
1. Create a [data source](/api/wrappers/php/Kendo/Data/DataSource) and set its [data](/api/wrappers/php/Kendo/Data/DataSource#data) and [schema](/api/wrappers/php/Kendo/Data/DataSource#schema). Setting the schema is required
to specify the model fields.

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
1. Create a [scheduler](/api/wrappers/php/Kendo/UI/Scheduler), configure its initial [date](/api/wrappers/php/Kendo/UI/Scheduler#date) and set its [data source](/api/wrappers/php/Kendo/UI/Scheduler#datasource).

        <?php
        $scheduler = new \Kendo\UI\Scheduler('scheduler');

        $scheduler->date(new DateTime('2013/6/13')
                ->dataSource(dataSource);
        ?>
1. Output the scheduler by echo-ing the result of the [render](/api/wrappers/php/Kendo/UI/Widget#render) method.

        <?php
        echo $scheduler->render();
        ?>

## Using the DataSourceResult Helper

The `DataSourceResult` class is a helper utility on top of PDO which simplifies common CRUD operations.
It is distributed with the Telerik UI for PHP** demos and can be found in the **/wrappers/php/lib/** directory of the **Telerik UI for PHP distribution.

1. Follow the steps from the [introduction](/php/introduction) - include the autoloader, JavaScript and CSS files.
1. Copy **/wrappers/php/lib/DataSourceResult.php** to your web site root and include it.

        <?php require_once 'lib/DataSourceResult.php'; ?>
1. Create a new instance of the DataSourceResult and use its read method to retrieve data from the database.

        <?php
        // The constructor accepts the PDO DSN for the target database
        $result = new DataSourceResult('sqlite:../sample.db');

        // The 'read' method accepts table name and array of columns to select.
        $data = $result->read('Tasks', array('Title', 'strftime(\'%Y-%m-%dT%H:%M:%SZ\', Start) as Start', 'strftime(\'%Y-%m-%dT%H:%M:%SZ\', End) as End', 'IsAllDay', 'Description'));
        // The result of the 'read' method is an array with two elements 'data' and 'total'.
        ?>
1. Configure a data source and schema.

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
1. Create a scheduler, configure its initial date and set its data source.

        <?php
        $scheduler = new \Kendo\UI\Scheduler('scheduler');

        $scheduler->date(new DateTime('2013/6/13')
                ->dataSource(dataSource);
        ?>
1. Output the scheduler by echo-ing the result of the render method.

        <?php
        echo $scheduler->render();
        ?>
