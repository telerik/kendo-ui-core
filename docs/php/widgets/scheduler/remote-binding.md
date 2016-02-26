---
title: Remote Binding
page_title: Remote Binding | Scheduler PHP Class
description: "Bind Kendo UI Scheduler PHP class to JSON."
slug: remotebinding_scheduler_uiforphp
position: 3
---

# Remote Binding

This article shows how to bind Kendo UI Scheduler for PHP to a JSON response.

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

        // Configure the remote service - a PHP file called 'tasks.php'
        // The query string parameter 'type' specifies the type of CRUD operation

        $create = new \Kendo\Data\DataSourceTransportCreate();

        $create->url('tasks.php?type=create')
             ->contentType('application/json')
             ->type('POST');

        $read = new \Kendo\Data\DataSourceTransportRead();

        $read->url('tasks.php?type=read')
             ->contentType('application/json')
             ->type('POST');

        $update = new \Kendo\Data\DataSourceTransportUpdate();

        $update->url('tasks.php?type=update')
             ->contentType('application/json')
             ->type('POST');

        $destroy = new \Kendo\Data\DataSourceTransportDestroy();

        $destroy->url('tasks.php?type=destroy')
             ->contentType('application/json')
             ->type('POST');

        // Configure the transport. Send all data source parameters as JSON using the parameterMap setting
        $transport->create($create)
                  ->read($read)
                  ->update($update)
                  ->destroy($destroy)
                  ->parameterMap('function(data) {
                      return kendo.stringify(data);
                  }');

        $model = new \Kendo\Data\DataSourceSchemaModel();

        $taskIDField = new \Kendo\Data\DataSourceSchemaModelField('taskID');
        $taskIDField->type('number')
                    ->from('TaskID')
                    ->nullable(true);

        $titleField = new \Kendo\Data\DataSourceSchemaModelField('title');
        $titleField->from('Title')
                ->defaultValue('No title')
                ->validation(array('required' => true));

        $startField = new \Kendo\Data\DataSourceSchemaModelField('start');
        $startField->type('date')
                ->from('Start');

        $endField = new \Kendo\Data\DataSourceSchemaModelField('end');
        $endField->type('date')
                ->from('End');

        $isAllDayField = new \Kendo\Data\DataSourceSchemaModelField('isAllDay');
        $isAllDayField->type('boolean')
                ->from('IsAllDay');

        $descriptionField = new \Kendo\Data\DataSourceSchemaModelField('description');
        $descriptionField->type('string')
                ->from('Description');

        $recurrenceIdField = new \Kendo\Data\DataSourceSchemaModelField('recurrenceId');
        $recurrenceIdField->from('RecurrenceID');

        $recurrenceRuleField = new \Kendo\Data\DataSourceSchemaModelField('recurrenceRule');
        $recurrenceRuleField->from('RecurrenceRule');

        $recurrenceExceptionField = new \Kendo\Data\DataSourceSchemaModelField('recurrenceException');
        $recurrenceExceptionField->from('RecurrenceException');

        $ownerIdField = new \Kendo\Data\DataSourceSchemaModelField('ownerId');
        $ownerIdField->from('OwnerID')
                ->defaultValue(1);

        $model->id('taskID')
            ->addField($taskIDField)
            ->addField($titleField)
            ->addField($startField)
            ->addField($endField)
            ->addField($descriptionField)
            ->addField($recurrenceIdField)
            ->addField($recurrenceRuleField)
            ->addField($recurrenceExceptionField)
            ->addField($ownerIdField)
            ->addField($isAllDayField);

        $schema = new \Kendo\Data\DataSourceSchema();
        $schema ->errors('errors')
                ->model($model);

        $dataSource = new \Kendo\Data\DataSource();

        $dataSource->transport($transport)
            ->schema($schema)
            ->batch(true);
        ?>

**Step 3** Create a Scheduler, configure its resources and set its data source.

###### Example

        <?php
        //create Resource configuration
        $resource = new \Kendo\UI\SchedulerResource();
        $resource->field('ownerId')
            ->title('Owner')
            ->dataSource(array(
                    array('text'=> 'Alex', 'value' => 1, 'color' => '#ef701d'),
                    array('text'=> 'Bob', 'value' => 2, 'color' => '#5fb1f7'),
                    array('text'=> 'Charlie', 'value' => 3, 'color' => '#35a964')
                ));

        $scheduler = new \Kendo\UI\Scheduler('scheduler');
        $scheduler->timezone("Etc/UTC") // set timezone
            ->addResource($resource) // add resource configuration
            ->addView('day', 'week', 'month', 'agenda') // configure views
            ->dataSource($dataSource);// add dataSource
        ?>

**Step 4** Output the Scheduler by echoing the result of the `render` method.

###### Example

        <?php
        echo $scheduler->render();
        ?>

### JSON-Returning File Creation

Below are listed the steps for you to follow when creating a PHP file which returns JSON.

**Step 1** Create a new PHP file called `tasks.php`. This file will return data in JSON format. The data source is configured to request it via the [`url`](/api/php/Kendo/Data/DataSourceTransportRead#url) setting.

**Step 2** Create a PDO connection.

###### Example

        <?php
        $db = new PDO('sqlite:../sample.db');
        ?>

**Step 3** Retrieve all records from the **Tasks** table.

###### Example

        <?php
        $statement = $db->prepare('SELECT * FROM Products');
        $statement->execute();
        $products = $statement->fetchAll(PDO::FETCH_ASSOC);
        ?>

**Step 4** Return the records as JSON.

###### Example

        <?php
        // Set response content type
        header('Content-Type: application/json');
        // Return JSON

        echo json_encode($products);
        ?>

### CRUD-Performing File Creation

**Step 1** Create a new PHP file called `tasks.php`. This file will perform CRUD data operations.

**Step 2** Create a PDO connection.

###### Example

        <?php
        $db = new PDO('sqlite:../sample.db');
        ?>

**Step 3** Read the request body and parse it as JSON. In the previous example, the Kendo UI DataSource is configured to submit its parameters as JSON via the [`parameterMap`](/api/php/Kendo/Data/DataSourceTransport#parametermap).

###### Example

        <?php
        $request = json_decode(file_get_contents('php://input'));
        ?>

**Step 4** Get the current operation type, available as the `type` query string parameter.

###### Example

        <?php
        $type = $_GET['type'];
        ?>

<!--_-->        
**Step 5** Declare a variable which will be returned as a result of the operation.

###### Example

        <?php
        $result = null;
        ?>

**Step 6** Implement `create`.

###### Example

        <?php
        if ($type == 'create') {
            // In batch mode the inserted records are available in the 'models' field
            $createdTasks = $request->models;

            // Will store the TaskID fields of the inserted records
            $result = array();

            foreach($createdTasks as $task) {
                // Create SQL INSERT statement
                $statement = $db->prepare('INSERT INTO Tasks (Title, Start, End, IsAllDay, Description, RecurrenceID, RecurrenceRule, RecurrenceException, OwnerID) VALUES (:title, :start, :end, :isAllDay, :descrip    tion, :recurrenceID, :recurrenceRule, :recurrenceException, :ownerID)');

                // Bind parameter values
                $statement->bindValue(':title', $task->Title);
                $statement->bindValue(':start', $task->Start);
                $statement->bindValue(':end', $task->End);
                $statement->bindValue(':isAllDay', $task->IsAllDay);
                $statement->bindValue(':description', $task->Description);
                $statement->bindValue(':recurrenceID', $task->RecurrenceID);
                $statement->bindValue(':recurrenceRule', $task->RecurrenceRule);
                $statement->bindValue(':recurrenceException', $task->RecurrenceException);
                $statement->bindValue(':ownerID', $task->OwnerID);

                // Execute the statement
                $statement->execute();

                // Set TaskID to the last inserted ID (TaskID is auto-incremented column)
                $task->TaskID = $db->lastInsertId();

                // The result of the 'create' operation is all inserted tasks
                $result[] = $task;
            }
        }
        ?>

**Step 7** Implement `read`.

###### Example

        <?php
        if ($type == 'read') {
            $statement = $db->prepare('SELECT *, strftime(\'%Y-%m-%dT%H:%M:%SZ\', Start) as Start, strftime(\'%Y-%m-%dT%H:%M:%SZ\', End) as End FROM Tasks');
            $statement->execute();
            $result = $statement->fetchAll(PDO::FETCH_ASSOC);
        }
        ?>

<!--*-->
**Step 8** Implement `update`.

###### Example

        <?php
        if ($type == 'update') {
            // in batch mode the updated records are available in the 'models' field
            $updatedTasks = $request->models;

            foreach($updatedTasks as $task) {
                // Create UPDATE SQL statement
                $statement = $db->prepare('UPDATE Tasks SET Title = :title, Start = :start, End = :end, IsAllDay = :isAllDay, Description = :description, RecurrenceID = :recurrenceID, RecurrenceRule = :recurrenceR    ule, RecurrenceException = :recurrenceException, OwnerID = :ownerID WHERE TaskID = :taskID');

                // Bind parameter values
                $statement->bindValue(':title', $task->Title);
                $statement->bindValue(':start', $task->Start);
                $statement->bindValue(':end', $task->End);
                $statement->bindValue(':isAllDay', $task->IsAllDay);
                $statement->bindValue(':description', $task->Description);
                $statement->bindValue(':recurrenceID', $task->RecurrenceID);
                $statement->bindValue(':recurrenceRule', $task->RecurrenceRule);
                $statement->bindValue(':recurrenceException', $task->RecurrenceException);
                $statement->bindValue(':ownerID', $task->OwnerID);
                $statement->bindValue(':taskID', $task->TaskID);

                // Execute the statement
                $statement->execute();
            }
        }
       ?>

**Step 9** Implement `destroy`.

###### Example

        <?php
        if ($type == 'destroy') {
            // in batch mode the destroyed records are available in the 'models' field
            $destroyedTasks = $request->models;

            foreach($destroyedTasks as $task) {
                // Create DELETE SQL statement
                $statement = $db->prepare('DELETE FROM Tasks WHERE TaskID = :taskID');

                // Bind parameter values
                $statement->bindValue(':taskID', $task->TaskID);

                // Execute the statement
                $statement->execute();
            }
        }
        ?>

**Step 10** Return the result of the operation as JSON.

###### Example

        <?php
        // Set response content type
        header('Content-Type: application/json');

        echo json_encode($result);
        ?>

## Use DataSourceResult Helpers

The `DataSourceResult` class is a helper utility on top of PDO which simplifies common CRUD operations. It is distributed with the Telerik UI for PHP demos and can be found in the `/wrappers/php/lib/` directory of the Telerik UI for PHP distribution.

> **Important**
>
> The following demo is using the sample SQLite database shipped with the Telerik UI for PHP** demos (`/wrappers/php/sample.db`).

First, configure a Kendo UI Scheduler for PHP binding and then implement the remote service which will return JSON.

### Configuration (DataSourceResult)

Below are listed the steps for you to follow when configuring the Scheduler for remote binding, using `DataSourceResult`.

**Step 1** Follow the steps from the [introductory article on Telerik UI for PHP]({% slug overview_uiforphp %})&mdash;include the autoloader, JavaScript and CSS files.

**Step 2** Create a data source and configure it.

###### Example

        <?php
        // Configure the remote service - a PHP file called 'tasks.php'
        // The query string parameter 'type' specifies the type of CRUD operation
        $transport = new \Kendo\Data\DataSourceTransport();

        $create = new \Kendo\Data\DataSourceTransportCreate();

        $create->url('tasks.php?type=create')
             ->contentType('application/json')
             ->type('POST');

        $read = new \Kendo\Data\DataSourceTransportRead();

        $read->url('tasks.php?type=read')
             ->contentType('application/json')
             ->type('POST');

        $update = new \Kendo\Data\DataSourceTransportUpdate();

        $update->url('tasks.php?type=update')
             ->contentType('application/json')
             ->type('POST');

        $destroy = new \Kendo\Data\DataSourceTransportDestroy();

        $destroy->url('tasks.php?type=destroy')
             ->contentType('application/json')
             ->type('POST');

        // Configure the transport. Send all data source parameters as JSON using the parameterMap setting.
        $transport->create($create)
                  ->read($read)
                  ->update($update)
                  ->destroy($destroy)
                  ->parameterMap('function(data) {
                      return kendo.stringify(data);
                  }');

        $model = new \Kendo\Data\DataSourceSchemaModel();

        $taskIDField = new \Kendo\Data\DataSourceSchemaModelField('taskID');
        $taskIDField->type('number')
                    ->from('TaskID')
                    ->nullable(true);

        $titleField = new \Kendo\Data\DataSourceSchemaModelField('title');
        $titleField->from('Title')
                ->defaultValue('No title')
                ->validation(array('required' => true));

        $startField = new \Kendo\Data\DataSourceSchemaModelField('start');
        $startField->type('date')
                ->from('Start');

        $endField = new \Kendo\Data\DataSourceSchemaModelField('end');
        $endField->type('date')
                ->from('End');

        $isAllDayField = new \Kendo\Data\DataSourceSchemaModelField('isAllDay');
        $isAllDayField->type('boolean')
                ->from('IsAllDay');

        $descriptionField = new \Kendo\Data\DataSourceSchemaModelField('description');
        $descriptionField->type('string')
                ->from('Description');

        $recurrenceIdField = new \Kendo\Data\DataSourceSchemaModelField('recurrenceId');
        $recurrenceIdField->from('RecurrenceID');

        $recurrenceRuleField = new \Kendo\Data\DataSourceSchemaModelField('recurrenceRule');
        $recurrenceRuleField->from('RecurrenceRule');

        $recurrenceExceptionField = new \Kendo\Data\DataSourceSchemaModelField('recurrenceException');
        $recurrenceExceptionField->from('RecurrenceException');

        $ownerIdField = new \Kendo\Data\DataSourceSchemaModelField('ownerId');
        $ownerIdField->from('OwnerID')
                ->defaultValue(1);

        $model->id('taskID')
            ->addField($taskIDField)
            ->addField($titleField)
            ->addField($startField)
            ->addField($endField)
            ->addField($descriptionField)
            ->addField($recurrenceIdField)
            ->addField($recurrenceRuleField)
            ->addField($recurrenceExceptionField)
            ->addField($ownerIdField)
            ->addField($isAllDayField);

        // Configure the schema to accept the format returned by DataSourceResult
        $schema = new \Kendo\Data\DataSourceSchema();
        $schema->data('data')
               ->errors('errors')
               ->model($model)
               ->total('total');

        $dataSource = new \Kendo\Data\DataSource();

        $dataSource->transport($transport)
                   ->batch(true)
                   ->schema($schema);
        ?>

**Step 3** Create a Scheduler, configure its resources and set its data source.

###### Example

        <?php
        //create Resource configuration
        $resource = new \Kendo\UI\SchedulerResource();
        $resource->field('ownerId')
            ->title('Owner')
            ->dataSource(array(
                    array('text'=> 'Alex', 'value' => 1, 'color' => '#ef701d'),
                    array('text'=> 'Bob', 'value' => 2, 'color' => '#5fb1f7'),
                    array('text'=> 'Charlie', 'value' => 3, 'color' => '#35a964')
                ));

        $scheduler = new \Kendo\UI\Scheduler('scheduler');
        $scheduler->timezone("Etc/UTC") // set timezone
            ->addResource($resource) // add resource configuration
            ->addView('day', 'week', 'month', 'agenda') // configure views
            ->dataSource($dataSource);// add dataSource
        ?>

**Step 4** Output the Scheduler by echoing the result of the `render` method.

###### Example

        <?php
        echo $scheduler->render();
        ?>

#### CRUD-Performing File Creation (DataSourceResult)

Below are listed the steps for you to follow when creating a PHP file which performs CRUD data operations, using DataSourceResult.

**Step 1** Create a new PHP file called `tasks.php`. This file will perform CRUD data operations.

**Step 2** Copy `/wrappers/php/lib/DataSourceResult.php` to your web site root and include it.

###### Example

        <?php require_once 'lib/DataSourceResult.php'; ?>

**Step 3** Read the request body and parse it as JSON. In the previous example, the Kendo UI DataSource is configured to submit its parameters as JSON via the [`parameterMap`](/api/php/Kendo/Data/DataSourceTransport#parametermap).

###### Example

        <?php
        $request = json_decode(file_get_contents('php://input'));
        ?>

**Step 4** Create a new instance of the `DataSourceResult`.

###### Example

        <?php
        $result = new DataSourceResult('sqlite:../sample.db');
        ?>

**Step 5** Get the current operation type, available as the `type` query string parameter.

###### Example

        <?php
        $type = $_GET['type'];
        ?>

<!--_-->        
**Step 6** Declare a variable which will be returned as a result of the operation.

###### Example

        <?php
        $data = null;
        ?>

**Step 7** Implement `create`.

###### Example

        <?php
        if ($type == 'create') {
            // The 'create' method of DataSourceResult accepts table name, array of column names, array of models and the name of the primary key column
            $data = $result->create('Tasks',
                array('TaskID', 'Title', 'Start', 'End', 'IsAllDay', 'Description', 'RecurrenceID', 'RecurrenceRule', 'RecurrenceException', 'OwnerID'),
                $request->models, 'TaskID');
        }
        ?>

**Step 8** Implement `read`.

###### Example

        <?php
        if ($type == 'read') {
            // The 'read' method accepts table name, array of columns to select and request parameters as array
            $data = $result->read('Tasks',
                    array('TaskID', 'Title', 'strftime(\'%Y-%m-%dT%H:%M:%SZ\', Start) as Start', 'strftime(\'%Y-%m-%dT%H:%M:%SZ\', End) as End', 'IsAllDay', 'Description', 'RecurrenceID', 'RecurrenceRule', 'RecurrenceException', 'OwnerID'), $request));
        }
        ?>

**Step 9** Implement `update`.

###### Example

        <?php
        if ($type == 'update') {
            // The 'update' method of DataSourceResult accepts table name, array of column names, array of models and the name of the primary key column
            $data = $result->update('Tasks',
                array('TaskID', 'Title', 'Start', 'End', 'IsAllDay', 'Description', 'RecurrenceID', 'RecurrenceRule', 'RecurrenceException', 'OwnerID'),
                $request->models, 'TaskID');
        }
        ?>

**Step 10** Implement `destroy`.

###### Example

        <?php
        if ($type == 'destroy') {
            // The 'destroy' method of DataSourceResult accepts table name, array of models and the name of the primary key column
            $data = $result->update('Tasks', $request->models, 'TaskID');
        }
        ?>

**Step 11** Return the result of the operation as JSON.

###### Example

        <?php
        // Set response content type
        header('Content-Type: application/json');

        echo json_encode($data);
        ?>

## See Also

Other articles on Telerik UI for PHP and on the Scheduler:

* [Overview of the Scheduler PHP Class]({% slug overview_scheduler_uiforphp %})
* [Local Binding of the Scheduler PHP Class]({% slug localbinding_scheduler_uiforphp %})
* [Overview of the Kendo UI Scheduler Widget]({% slug overview_kendoui_scheduler_widget %})
* [Telerik UI for PHP API Reference Folder](/api/php/Kendo/UI/AutoComplete)
* [Telerik UI for PHP Classes Folder]({% slug overview_autocomplete_uiforphp %})
