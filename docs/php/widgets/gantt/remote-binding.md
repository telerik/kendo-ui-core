---
title: Remote Binding
page_title: Remote Binding | Gantt PHP Class
description: "Bind Kendo UI Gantt PHP class to JSON."
slug: remotebinding_gantt_uiforphp
position: 3
---

# Remote Binding

This article shows how to bind Kendo UI Gantt for PHP to a JSON response.

> **Important**
>
> The following demos are using the sample SQLite database shipped with the Telerik UI for PHP demos (`/wrappers/php/sample.db`).

## Bind to PDO-Returned Arrays

### Configuration

Below are listed the steps for you to follow when configuring the Kendo UI AutoComplete for PHP for remote binding.

**Step 1** Make sure you followed all the steps from the [introductory article on Telerik UI for PHP]({% slug overview_uiforphp %})&mdash;include the autoloader, JavaScript, and CSS files.

**Step 2** Create a [data source](/api/php/Kendo/Data/DataSource) for the tasks and set its [`transport`](/api/php/Kendo/Data/DataSource#transport) and [`schema`](/api/php/Kendo/Data/DataSource#schema).

###### Example

        <?php
        $taskTransport = new \Kendo\Data\DataSourceTransport();

        // Configure the remote service - a PHP file called 'tasks.php'
        // The query string parameter 'type' specifies the type of CRUD operation

        $taskCreate = new \Kendo\Data\DataSourceTransportCreate();

        $taskCreate->url('tasks.php?type=create')
             ->contentType('application/json')
             ->type('POST');

        $taskRead = new \Kendo\Data\DataSourceTransportRead();

        $taskRead->url('tasks.php?type=read')
             ->contentType('application/json')
             ->type('POST');

        $taskUpdate = new \Kendo\Data\DataSourceTransportUpdate();

        $taskUpdate->url('tasks.php?type=update')
             ->contentType('application/json')
             ->type('POST');

        $taskDestroy = new \Kendo\Data\DataSourceTransportDestroy();

        $taskDestroy->url('tasks.php?type=destroy')
             ->contentType('application/json')
             ->type('POST');

        // Configure the transport. Send all data source parameters as JSON using the parameterMap setting
        $taskTransport->create($taskCreate)
                  ->read($taskRead)
                  ->update($taskUpdate)
                  ->destroy($taskDestroy)
                  ->parameterMap('function(data) {
                      return kendo.stringify(data);
                  }');

        $taskModel = new \Kendo\Data\DataSourceSchemaModel();

        // Map the 'ID' column of the 'GanttTasks' table to 'id' field
        $idField = new \Kendo\Data\DataSourceSchemaModelField('id');
        $idField->type('number')
                ->from('ID')
                ->nullable(true);

        // Map the 'OrderID' column of the 'GanttTasks' table to 'orderId' field
        $orderIdField = new \Kendo\Data\DataSourceSchemaModelField('orderId');
        $orderIdField->from('OrderID')
                ->type('number');

        // Map the 'ParentID' column of the 'GanttTasks' table to 'parentId' field
        $parentIdField = new \Kendo\Data\DataSourceSchemaModelField('parentId');
        $parentIdField->from('ParentID')
                ->defaultValue(null)
                ->type('number');

        // Map the 'Start' column of the 'GanttTasks' table to 'start' field
        $startField = new \Kendo\Data\DataSourceSchemaModelField('start');
        $startField->from('Start')
                ->type('date');

        // Map the 'End' column of the 'GanttTasks' table to 'end' field
        $endField = new \Kendo\Data\DataSourceSchemaModelField('end');
        $endField->from('End')
                ->type('date');

        // Map the 'OrderID' column of the 'GanttTasks' table to 'orderId' field
        $titleField = new \Kendo\Data\DataSourceSchemaModelField('title');
        $titleField->from('Title')
                ->defaultValue('')
                ->type('string');

        // Map the 'PercentComplete' column of the 'GanttTasks' table to 'percentComplete' field
        $percentCompleteField = new \Kendo\Data\DataSourceSchemaModelField('percentComplete');
        $percentCompleteField->from('PercentComplete')
                ->type('number');

        // Map the 'Summary' column of the 'GanttTasks' table to 'summary' field
        $summaryField = new \Kendo\Data\DataSourceSchemaModelField('summary');
        $summaryField->from('Summary')
                ->type('boolean');

        // Map the 'Expanded' column of the 'GanttTasks' table to 'expanded' field
        $expandedField = new \Kendo\Data\DataSourceSchemaModelField('expanded');
        $expandedField->from('Expanded')
                ->defaultValue(true)
                ->type('boolean');

        $taskModel->id('id')
            ->addField($idField)
            ->addField($parentIdField)
            ->addField($orderIdField)
            ->addField($startField)
            ->addField($endField)
            ->addField($titleField)
            ->addField($percentCompleteField)
            ->addField($summaryField)
            ->addField($expandedField);

        // Create the schema
        $taskSchema = new \Kendo\Data\DataSourceSchema();
        $taskSchema ->errors('errors')
                ->model($taskModel);

        // Create a data source
        $tasksDataSource = new \Kendo\Data\DataSource();
        $tasksDataSource->transport($taskTransport)
            ->schema($taskSchema)
            ->batch(true);
        ?>

**Step 3** Create a [data source](/api/php/Kendo/Data/DataSource) for the dependencies and set its [`transport`](/api/php/Kendo/Data/DataSource#transport) and [`schema`](/api/php/Kendo/Data/DataSource#schema).

###### Example

        <?php
        $dependencyTransport = new \Kendo\Data\DataSourceTransport();

        // Configure the remote service - a PHP file called 'dependencies.php'
        // The query string parameter 'type' specifies the type of CRUD operation

        $dependencyCreate = new \Kendo\Data\DataSourceTransportCreate();

        $dependencyCreate->url('dependencies.php?type=create')
             ->contentType('application/json')
             ->type('POST');

        $dependencyRead = new \Kendo\Data\DataSourceTransportRead();

        $dependencyRead->url('dependencies.php?type=read')
             ->contentType('application/json')
             ->type('POST');

        $dependencyUpdate = new \Kendo\Data\DataSourceTransportUpdate();

        $dependencyUpdate->url('dependencies.php?type=update')
             ->contentType('application/json')
             ->type('POST');

        $dependencyDestroy = new \Kendo\Data\DataSourceTransportDestroy();

        $dependencyDestroy->url('dependencies.php?type=destroy')
             ->contentType('application/json')
             ->type('POST');

        // Configure the transport. Send all data source parameters as JSON using the parameterMap setting
        $dependencyTransport->create($dependencyCreate)
                  ->read($dependencyRead)
                  ->update($dependencyUpdate)
                  ->destroy($dependencyDestroy)
                  ->parameterMap('function(data) {
                      return kendo.stringify(data);
                  }');

        $dependencyModel = new \Kendo\Data\DataSourceSchemaModel();

        // Map the 'ID' column of the 'GanttDependencies' table to 'id' field
        $idField = new \Kendo\Data\DataSourceSchemaModelField('id');
        $idField->from('ID')
                ->type('number');

        // Map the 'Type' column of the 'GanttDependencies' table to 'type' field
        $typeField = new \Kendo\Data\DataSourceSchemaModelField('type');
        $typeField->from('Type')
                ->type('number');

        // Map the 'PredecessorID' column of the 'GanttDependencies' table to 'predecessorId' field
        $predecessorIdField = new \Kendo\Data\DataSourceSchemaModelField('predecessorId');
        $predecessorIdField->from('PredecessorID')
                ->type('number');

        // Map the 'SuccessorID' column of the 'GanttDependencies' table to 'successorId' field
        $successorIdField = new \Kendo\Data\DataSourceSchemaModelField('successorId');
        $successorIdField->from('SuccessorID')
                ->type('number');

        $dependencyModel->id('id')
            ->addField($idField)
            ->addField($typeField)
            ->addField($predecessorIdField)
            ->addField($successorIdField);

        // Create the schema
        $dependencySchema = new \Kendo\Data\DataSourceSchema();
        $dependencySchema ->errors('errors')
                ->model($dependencyModel);

        // Create a data source
        $dependenciesDataSource = new \Kendo\Data\DataSource();
        $dependenciesDataSource->transport($dependencyTransport)
            ->schema($dependencySchema)
            ->batch(true);
        ?>

**Step 4** Create a [Gantt](/api/php/Kendo/UI/Gantt) and set its [data source](/api/php/Kendo/UI/Gantt#datasource) and  [dependencies data source](/api/php/Kendo/UI/Gantt#dependencies).

###### Example

        <?php
        $gantt = new \Kendo\UI\Gantt('gantt');

        $gantt->dataSource($tasksDataSource)
            ->dependencies($dependenciesDataSource);
        ?>

**Step 5** Output the gantt by echo-ing the result of the [render](/api/php/Kendo/UI/Widget#render) method.

###### Example

        <?php
        echo $gantt->render();
        ?>

### Creation of Files Returning Tasks as JSON

Below are listed the steps for you to follow when creating a PHP file which returns JSON.

**Step 1** Create a new PHP file called `tasks.php`. This file will return data in JSON format. The data source is configured to request it via the [`url`](/api/php/Kendo/Data/DataSourceTransportRead#url) setting.

**Step 2** Create a PDO connection.

###### Example

        <?php
        $db = new PDO('sqlite:../sample.db');
        ?>

**Step 3** Retrieve all records from the `GanttTasks` table.

###### Example

        <?php
        $statement = $db->prepare('SELECT *, strftime(\'%Y-%m-%dT%H:%M:%SZ\', Start) as Start, strftime(\'%Y-%m-%dT%H:%M:%SZ\', End) as End FROM GanttTasks');
        $statement->execute();
        $tasks = $statement->fetchAll(PDO::FETCH_ASSOC);
        ?>

<!--*-->
**Step 4** Return the records as JSON.

###### Example

        <?php
        // Set response content type
        header('Content-Type: application/json');

        // Return JSON
        echo json_encode($tasks, JSON_NUMERIC_CHECK);
        ?>

### Creation of Files Returning Dependencies as JSON

**Step 1** Create a new PHP file called `dependencies.php`. This file will return data in JSON format. The data source is configured to request it via the [`url`](/api/php/Kendo/Data/DataSourceTransportRead#url) setting.

**Step 2** Create a PDO connection.

###### Example

        <?php
        $db = new PDO('sqlite:../sample.db');
        ?>

**Step 3** Retrieve all records from the `GanttDependencies` table.

###### Example

        <?php
        $statement = $db->prepare('SELECT * FROM GanttDependencies');
        $statement->execute();
        $dependencies = $statement->fetchAll(PDO::FETCH_ASSOC);
        ?>

**Step 4** Return the records as JSON.

###### Example

        <?php
        // Set response content type
        header('Content-Type: application/json');

        // Return JSON
        echo json_encode($dependencies, JSON_NUMERIC_CHECK);
        ?>

### Creation of Files Performing CRUD on Tasks

**Step 1** Create a new PHP file called `tasks.php`. This file will perform CRUD operations.

**Step 2** Create a PDO connection.

###### Example

        <?php
        $db = new PDO('sqlite:../sample.db');
        ?>

**Step 3** Read the request body and parse it as JSON. In the previous example, the Kendo UI DataSource is configured so as to submit its parameters as JSON via the [`parameterMap`](/api/php/Kendo/Data/DataSourceTransport#parametermap).

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

            $result = array();

            foreach($createdTasks as $task) {
                // Create SQL INSERT statement
                $statement = $db->prepare('INSERT INTO GanttTasks (Title, Start, End, ParentID, OrderID, PercentComplete, Summary, Expanded) VALUES (:title, :start, :end, :parentId, :orderId, :percentComplete, :summary, :expanded)');

                // Bind parameter values
                $statement->bindValue(':title', $task->Title);
                $statement->bindValue(':start', $task->Start);
                $statement->bindValue(':end', $task->End);
                $statement->bindValue(':parentId', $task->ParentID);
                $statement->bindValue(':orderId', $task->OrderID);
                $statement->bindValue(':percentComplete', $task->PercentComplete);
                $statement->bindValue(':summary', $task->Summary);
                $statement->bindValue(':expanded', $task->Expanded);

                // Execute the statement
                $statement->execute();

                // Set ID to the last inserted ID (ID is auto-incremented column)
                $task->ID = $db->lastInsertId();

                // The result of the 'create' operation is all inserted tasks
                $result[] = $task;
            }
        }
        ?>

**Step 7** Implement `read`.

###### Example

        <?php
        if ($type == 'read') {
            $statement = $db->prepare('SELECT *, strftime(\'%Y-%m-%dT%H:%M:%SZ\', Start) as Start, strftime(\'%Y-%m-%dT%H:%M:%SZ\', End) as End FROM GanttTasks');
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

            $result = array();

            foreach($updatedTasks as $task) {
                // Create UPDATE SQL statement
                $statement = $db->prepare('UPDATE GanttTasks SET Title = :title, Start = :start, End = :end, ParentID = :parentId, OrderID = :orderId, PercentComplete = :percentComplete, Summary = :summary, Expanded = :expanded WHERE ID = :id');

                // Bind parameter values
                $statement->bindValue(':title', $task->Title);
                $statement->bindValue(':start', $task->Start);
                $statement->bindValue(':end', $task->End);
                $statement->bindValue(':parentId', $task->ParentID);
                $statement->bindValue(':orderId', $task->OrderID);
                $statement->bindValue(':percentComplete', $task->PercentComplete);
                $statement->bindValue(':summary', $task->Summary);
                $statement->bindValue(':expanded', $task->Expanded);
                $statement->bindValue(':id', $task->ID);

                // Execute the statement
                $statement->execute();

                // The result of the 'update' operation is all udpated tasks
                $result[] = $task;
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
                $statement = $db->prepare('DELETE FROM GanttTasks WHERE ID = :id');

                // Bind parameter values
                $statement->bindValue(':id', $task->ID);

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

        echo json_encode($result, JSON_NUMERIC_CHECK);
        ?>

### Creation of Files Performing CRUD on Dependencies

**Step 1** Create a new PHP file called `dependencies.php`. This file will perform CRUD operations.

**Step 2** Create a PDO connection.

###### Example

        <?php
        $db = new PDO('sqlite:../sample.db');
        ?>

**Step 3** Read the request body and parse it as JSON. In the previous example, the Kendo UI DataSource is configured so as to submit its parameters as JSON via the [`parameterMap`](/api/php/Kendo/Data/DataSourceTransport#parametermap).

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
            $createdDependencies = $request->models;

            $result = array();

            foreach($createdDependencies as $dependency) {
                // Create SQL INSERT statement
                $statement = $db->prepare('INSERT INTO GanttDependencies (Type, PredecessorID, SuccessorID) VALUES (:type, :predecessorId, :successorId)');

                // Bind parameter values
                $statement->bindValue(':type', $dependency->Type);
                $statement->bindValue(':predecessorId', $dependency->PredecessorID);
                $statement->bindValue(':successorId', $dependency->SuccessorID);

                // Execute the statement
                $statement->execute();

                // Set ID to the last inserted ID (ID is auto-incremented column)
                $dependency->ID = $db->lastInsertId();

                // The result of the 'create' operation is all inserted dependencies
                $result[] = $dependency;
            }
        }
        ?>

**Step 7** Implement `read`.

###### Example

        <?php
        if ($type == 'read') {
            $statement = $db->prepare('SELECT * FROM GanttDependencies');
            $statement->execute();
            $result = $statement->fetchAll(PDO::FETCH_ASSOC);
        }
        ?>

**Step 8** Implement `destroy`.

###### Example

        <?php
        if ($type == 'destroy') {
            // in batch mode the destroyed records are available in the 'models' field
            $destroyedDependencies = $request->models;

            foreach($destroyedDependencies as $dependency) {
                // Create DELETE SQL statement
                $statement = $db->prepare('DELETE FROM GanttDependencies WHERE ID = :id');

                // Bind parameter values
                $statement->bindValue(':id', $dependency->ID);

                // Execute the statement
                $statement->execute();
            }
        }
        ?>

**Step 9** Return the result of the operation as JSON.

###### Example

        <?php
        // Set response content type
        header('Content-Type: application/json');

        echo json_encode($result, JSON_NUMERIC_CHECK);
        ?>

## Use DataSourceResult Helpers

The `DataSourceResult` class is a helper utility on top of PDO which simplifies common CRUD operations. The `DataSourceResult` can also perform paging, sorting, filtering, grouping and aggregate calculation on the server side by generating SQL executed via PDO. It is distributed with the Telerik UI for PHP demos and can be found in the `/wrappers/php/lib/` directory of the Telerik UI for PHP distribution.

First, configure a Kendo UI Gantt for PHP binding and then implement the remote service which will return JSON.

### Configuration (DataSourceResult)

Below are listed the steps for you to follow when configuring the Gantt for remote binding, using `DataSourceResult`.

**Step 1** Follow the steps from the [introductory article on Telerik UI for PHP]({% slug overview_uiforphp %})&mdash;include the autoloader, JavaScript and CSS files.

**Step 2** Create a data source and configure it.

###### Example

        <?php
        $taskTransport = new \Kendo\Data\DataSourceTransport();

        // Configure the remote service - a PHP file called 'tasks.php'
        // The query string parameter 'type' specifies the type of CRUD operation

        $taskCreate = new \Kendo\Data\DataSourceTransportCreate();

        $taskCreate->url('tasks.php?type=create')
             ->contentType('application/json')
             ->type('POST');

        $taskRead = new \Kendo\Data\DataSourceTransportRead();

        $taskRead->url('tasks.php?type=read')
             ->contentType('application/json')
             ->type('POST');

        $taskUpdate = new \Kendo\Data\DataSourceTransportUpdate();

        $taskUpdate->url('tasks.php?type=update')
             ->contentType('application/json')
             ->type('POST');

        $taskDestroy = new \Kendo\Data\DataSourceTransportDestroy();

        $taskDestroy->url('tasks.php?type=destroy')
             ->contentType('application/json')
             ->type('POST');

        // Configure the transport. Send all data source parameters as JSON using the parameterMap setting
        $taskTransport->create($taskCreate)
                  ->read($taskRead)
                  ->update($taskUpdate)
                  ->destroy($taskDestroy)
                  ->parameterMap('function(data) {
                      return kendo.stringify(data);
                  }');

        $taskModel = new \Kendo\Data\DataSourceSchemaModel();

        // Map the 'ID' column of the 'GanttTasks' table to 'id' field
        $idField = new \Kendo\Data\DataSourceSchemaModelField('id');
        $idField->type('number')
                ->from('ID')
                ->nullable(true);

        // Map the 'OrderID' column of the 'GanttTasks' table to 'orderId' field
        $orderIdField = new \Kendo\Data\DataSourceSchemaModelField('orderId');
        $orderIdField->from('OrderID')
                ->type('number');

        // Map the 'ParentID' column of the 'GanttTasks' table to 'parentId' field
        $parentIdField = new \Kendo\Data\DataSourceSchemaModelField('parentId');
        $parentIdField->from('ParentID')
                ->defaultValue(null)
                ->type('number');

        // Map the 'Start' column of the 'GanttTasks' table to 'start' field
        $startField = new \Kendo\Data\DataSourceSchemaModelField('start');
        $startField->from('Start')
                ->type('date');

        // Map the 'End' column of the 'GanttTasks' table to 'end' field
        $endField = new \Kendo\Data\DataSourceSchemaModelField('end');
        $endField->from('End')
                ->type('date');

        // Map the 'OrderID' column of the 'GanttTasks' table to 'orderId' field
        $titleField = new \Kendo\Data\DataSourceSchemaModelField('title');
        $titleField->from('Title')
                ->defaultValue('')
                ->type('string');

        // Map the 'PercentComplete' column of the 'GanttTasks' table to 'percentComplete' field
        $percentCompleteField = new \Kendo\Data\DataSourceSchemaModelField('percentComplete');
        $percentCompleteField->from('PercentComplete')
                ->type('number');

        // Map the 'Summary' column of the 'GanttTasks' table to 'summary' field
        $summaryField = new \Kendo\Data\DataSourceSchemaModelField('summary');
        $summaryField->from('Summary')
                ->type('boolean');

        // Map the 'Expanded' column of the 'GanttTasks' table to 'expanded' field
        $expandedField = new \Kendo\Data\DataSourceSchemaModelField('expanded');
        $expandedField->from('Expanded')
                ->defaultValue(true)
                ->type('boolean');

        $taskModel->id('id')
            ->addField($idField)
            ->addField($parentIdField)
            ->addField($orderIdField)
            ->addField($startField)
            ->addField($endField)
            ->addField($titleField)
            ->addField($percentCompleteField)
            ->addField($summaryField)
            ->addField($expandedField);

        // Create the schema
        $taskSchema = new \Kendo\Data\DataSourceSchema();
        $taskSchema ->data('data')
                ->errors('errors')
                ->model($taskModel)
                ->total('total');

        // Create a data source
        $tasksDataSource = new \Kendo\Data\DataSource();
        $tasksDataSource->transport($taskTransport)
            ->schema($taskSchema)
            ->batch(true);
        ?>

**Step 3** Create a [data source](/api/php/Kendo/Data/DataSource) for the dependencies and configure it.

###### Example

        <?php
        $dependencyTransport = new \Kendo\Data\DataSourceTransport();

        // Configure the remote service - a PHP file called 'dependencies.php'
        // The query string parameter 'type' specifies the type of CRUD operation

        $dependencyCreate = new \Kendo\Data\DataSourceTransportCreate();

        $dependencyCreate->url('dependencies.php?type=create')
             ->contentType('application/json')
             ->type('POST');

        $dependencyRead = new \Kendo\Data\DataSourceTransportRead();

        $dependencyRead->url('dependencies.php?type=read')
             ->contentType('application/json')
             ->type('POST');

        $dependencyUpdate = new \Kendo\Data\DataSourceTransportUpdate();

        $dependencyUpdate->url('dependencies.php?type=update')
             ->contentType('application/json')
             ->type('POST');

        $dependencyDestroy = new \Kendo\Data\DataSourceTransportDestroy();

        $dependencyDestroy->url('dependencies.php?type=destroy')
             ->contentType('application/json')
             ->type('POST');

        // Configure the transport. Send all data source parameters as JSON using the parameterMap setting
        $dependencyTransport->create($dependencyCreate)
                  ->read($dependencyRead)
                  ->update($dependencyUpdate)
                  ->destroy($dependencyDestroy)
                  ->parameterMap('function(data) {
                      return kendo.stringify(data);
                  }');

        $dependencyModel = new \Kendo\Data\DataSourceSchemaModel();

        // Map the 'ID' column of the 'GanttDependencies' table to 'id' field
        $idField = new \Kendo\Data\DataSourceSchemaModelField('id');
        $idField->from('ID')
                ->type('number');

        // Map the 'Type' column of the 'GanttDependencies' table to 'type' field
        $typeField = new \Kendo\Data\DataSourceSchemaModelField('type');
        $typeField->from('Type')
                ->type('number');

        // Map the 'PredecessorID' column of the 'GanttDependencies' table to 'predecessorId' field
        $predecessorIdField = new \Kendo\Data\DataSourceSchemaModelField('predecessorId');
        $predecessorIdField->from('PredecessorID')
                ->type('number');

        // Map the 'SuccessorID' column of the 'GanttDependencies' table to 'successorId' field
        $successorIdField = new \Kendo\Data\DataSourceSchemaModelField('successorId');
        $successorIdField->from('SuccessorID')
                ->type('number');

        $dependencyModel->id('id')
            ->addField($idField)
            ->addField($typeField)
            ->addField($predecessorIdField)
            ->addField($successorIdField);

        // Create the schema
        $dependencySchema = new \Kendo\Data\DataSourceSchema();
        $dependencySchema ->data('data')
                ->errors('errors')
                ->model($dependencyModel)
                ->total('total');

        // Create a data source
        $dependenciesDataSource = new \Kendo\Data\DataSource();
        $dependenciesDataSource->transport($dependencyTransport)
            ->schema($dependencySchema)
            ->batch(true);
        ?>

**Step 4** Create a [Gantt](/api/php/Kendo/UI/Gantt) and set its [data source](/api/php/Kendo/UI/Gantt#datasource) and  [dependencies data source](/api/php/Kendo/UI/Gantt#dependencies).

###### Example

        <?php
        $gantt = new \Kendo\UI\Gantt('gantt');

        $gantt->dataSource($tasksDataSource)
            ->dependencies($dependenciesDataSource);
        ?>

**Step 5** Output the Gantt by echoing the result of the `render` method.

###### Example

        <?php
        echo $gantt->render();
        ?>

### Creation of Files Performing CRUD on Tasks (DataSourceResult)

**Step 1** Create a new PHP file called `tasks.php`. This file will perform CRUD operations.

**Step 2** Read the request body and parse it as JSON. In the previous example, the Kendo UI DataSource is configured to submit its parameters as JSON via the [`parameterMap`](/api/php/Kendo/Data/DataSourceTransport#parametermap).

###### Example

        <?php
        $request = json_decode(file_get_contents('php://input'));
        ?>

**Step 3** Create a new instance of the `DataSourceResult`.

###### Example

        <?php
        $result = new DataSourceResult('sqlite:../sample.db');
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
        $data = null;
        ?>

**Step 6** Implement `create`.

###### Example

        <?php
        if ($type == 'create') {
            // The 'create' method of DataSourceResult accepts table name, array of column names, array of models and the name of the primary key column
            $data = $result->create('GanttTasks',
                array('ID', 'Title', 'Start', 'End', 'OrderID', 'ParentID', 'PercentComplete', 'Summary', 'Expanded'),
                $request->models, 'ID');
        }
        ?>

**Step 7** Implement `read`.

###### Example

        <?php
        if ($type == 'read') {
            // The 'read' method accepts table name, array of columns to select and request parameters as array
            $data = $result->read('GanttTasks',
                    array('Title', 'strftime(\'%Y-%m-%dT%H:%M:%SZ\', Start) as Start', 'strftime(\'%Y-%m-%dT%H:%M:%SZ\', End) as End', 'ID', 'OrderID', 'ParentID', 'PercentComplete', 'Summary', 'Expanded'),
                    $request);
        }
        ?>

**Step 8** Implement `update`.

###### Example

        <?php
        if ($type == 'update') {
            // The 'update' method of DataSourceResult accepts table name, array of column names, array of models and the name of the primary key column
            $data = $result->update('GanttTasks',
                array('ID', 'Title', 'Start', 'End', 'OrderID', 'ParentID', 'PercentComplete', 'Summary', 'Expanded'),
                $request->models, 'ID');
        }
        ?>

**Step 9** Implement `destroy`.

###### Example

        <?php
        if ($type == 'destroy') {
            // The 'destroy' method of DataSourceResult accepts table name, array of models and the name of the primary key column
            $data = $result->update('GanttTasks', $request->models, 'ID');
        }
        ?>

**Step 10** Return the result of the operation as JSON.

###### Example

        <?php
        // Set response content type
        header('Content-Type: application/json');

        echo json_encode($data, JSON_NUMERIC_CHECK);
        ?>

### Creation of Files Performing CRUD on Dependencies (DataSourceResult)

**Step 1** Create a new PHP file called `dependencies.php`. This file will perform CRUD operations.

**Step 2** Copy `/wrappers/php/lib/DataSourceResult.php` to your web site root and include it.

###### Example

        <?php require_once '../lib/DataSourceResult.php'; ?>

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
            $data = $result->create('GanttDependencies',
                array('ID', 'Type', 'PredecessorID', 'SuccessorID'),
                $request->models, 'ID');
        }
        ?>

**Step 8** Implement `read`.

###### Example

        <?php
        if ($type == 'read') {
            // The 'read' method accepts table name, array of columns to select and request parameters as array
            $data = $result->read('GanttDependencies',
                    array('ID', 'Type', 'PredecessorID', 'SuccessorID'), $request);
        }
        ?>

**Step 9** Implement `destroy`.

###### Example

        <?php
        if ($type == 'destroy') {
            // The 'destroy' method of DataSourceResult accepts table name, array of models and the name of the primary key column
            $data = $result->update('GanttDependencies', $request->models, 'ID');
        }
        ?>

**Step 10** Return the result of the operation as JSON.

###### Example

        <?php
        // Set response content type
        header('Content-Type: application/json');

        echo json_encode($data, JSON_NUMERIC_CHECK);
        ?>

## See Also

Other articles on Telerik UI for PHP and on the Gantt:

* [Overview of the Gantt PHP Class]({% slug overview_gantt_uiforphp %})
* [Local Binding of the Gantt PHP Class]({% slug localbinding_gantt_uiforphp %})
* [Overview of the Kendo UI Gantt Widget]({% slug overview_kendoui_gantt_widget %})
* [Telerik UI for PHP API Reference Folder](/api/php/Kendo/UI/AutoComplete)
* [Telerik UI for PHP Classes Folder]({% slug overview_autocomplete_uiforphp %})
