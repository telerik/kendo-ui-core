<?php

require_once '../lib/DataSourceResult.php';
require_once '../lib/Kendo/Autoload.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    header('Content-Type: application/json');

    $request = json_decode(file_get_contents('php://input'));

    $result = new DataSourceResult('sqlite:..//sample.db');

    $type = $_GET['type'];

    $operation = $_GET['operation'];

    if ($type == "dependency") {
        $columns = array('ID', 'PredecessorID', 'SuccessorID', 'Type');

        $table = "GanttDependencies";
    } else {
        $columns = array('ID', 'ParentID', 'OrderID', 'Title', 'Start', 'End', 'PercentComplete', 'Expanded', 'Summary');

        $table = "GanttTasks";
    }

    switch($operation) {
        case 'create':
            $result = $result->create($table, $columns, $request, 'ID');
            break;
        case 'update':
            $result = $result->update($table, $columns, $request, 'ID');
            break;
        case 'destroy':
            $result = $result->destroy($table, $request, 'ID');
            break;
        default:
            $result = $result->read($table, $columns, $request);
            break;
    }

    echo json_encode($result, JSON_NUMERIC_CHECK);

    exit;
}

require_once '../include/header.php';

// tasks datasource
$transport = new \Kendo\Data\DataSourceTransport();

$create = new \Kendo\Data\DataSourceTransportCreate();

$create->url('index.php?type=task&operation=create')
     ->contentType('application/json')
     ->type('POST');

$read = new \Kendo\Data\DataSourceTransportRead();

$read->url('index.php?type=task&operation=read')
     ->contentType('application/json')
     ->type('POST');

$update = new \Kendo\Data\DataSourceTransportUpdate();

$update->url('index.php?type=task&operation=update')
     ->contentType('application/json')
     ->type('POST');

$destroy = new \Kendo\Data\DataSourceTransportDestroy();

$destroy->url('index.php?type=task&operation=destroy')
     ->contentType('application/json')
     ->type('POST');

$transport->create($create)
          ->read($read)
          ->update($update)
          ->destroy($destroy)
          ->parameterMap('function(data) {
              return kendo.stringify(data);
          }');

$taskModel = new \Kendo\Data\DataSourceSchemaModel();

$idField = new \Kendo\Data\DataSourceSchemaModelField('id');
$idField->type('number')
        ->from('ID')
        ->nullable(true);

$orderIdField = new \Kendo\Data\DataSourceSchemaModelField('orderId');
$orderIdField->from('OrderID')
        ->type('number');

$parentIdField = new \Kendo\Data\DataSourceSchemaModelField('parentId');
$parentIdField->from('ParentID')
        ->defaultValue(null)
        ->type('number');

$startField = new \Kendo\Data\DataSourceSchemaModelField('start');
$startField->from('Start')
        ->type('date');

$endField = new \Kendo\Data\DataSourceSchemaModelField('end');
$endField->from('End')
        ->type('date');

$titleField = new \Kendo\Data\DataSourceSchemaModelField('title');
$titleField->from('Title')
        ->defaultValue('')
        ->type('string');

$percentCompleteField = new \Kendo\Data\DataSourceSchemaModelField('percentComplete');
$percentCompleteField->from('PercentComplete')
        ->type('number');

$summaryField = new \Kendo\Data\DataSourceSchemaModelField('summary');
$summaryField->from('Summary')
        ->type('boolean');

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

$schema = new \Kendo\Data\DataSourceSchema();
$schema->model($taskModel)
    ->data("data");

$tasks = new \Kendo\Data\DataSource();

$tasks->transport($transport)
    ->schema($schema)
    ->batch(false);

// dependencies datasource
$transport = new \Kendo\Data\DataSourceTransport();

$create = new \Kendo\Data\DataSourceTransportCreate();

$create->url('index.php?type=dependency&operation=create')
     ->contentType('application/json')
     ->type('POST');

$read = new \Kendo\Data\DataSourceTransportRead();

$read->url('index.php?type=dependency&operation=read')
     ->contentType('application/json')
     ->type('POST');

$update = new \Kendo\Data\DataSourceTransportUpdate();

$update->url('index.php?type=dependency&operation=update')
     ->contentType('application/json')
     ->type('POST');

$destroy = new \Kendo\Data\DataSourceTransportDestroy();

$destroy->url('index.php?type=dependency&operation=destroy')
     ->contentType('application/json')
     ->type('POST');

$transport->create($create)
          ->read($read)
          ->update($update)
          ->destroy($destroy)
          ->parameterMap('function(data) {
              return kendo.stringify(data);
          }');

$dependenciesModel = new \Kendo\Data\DataSourceSchemaModel();

$idField = new \Kendo\Data\DataSourceSchemaModelField('id');
$idField->from('ID')
        ->type('number');

$typeField = new \Kendo\Data\DataSourceSchemaModelField('type');
$typeField->from('Type')
        ->type('number');

$predecessorIdField = new \Kendo\Data\DataSourceSchemaModelField('predecessorId');
$predecessorIdField->from('PredecessorID')
        ->type('number');

$successorIdField = new \Kendo\Data\DataSourceSchemaModelField('successorId');
$successorIdField->from('SuccessorID')
        ->type('number');

$dependenciesModel->id('id')
    ->addField($idField)
    ->addField($typeField)
    ->addField($predecessorIdField)
    ->addField($successorIdField);

$schema = new \Kendo\Data\DataSourceSchema();
$schema->model($dependenciesModel)
    ->data("data");

$dependencies = new \Kendo\Data\DataSource();

$dependencies->transport($transport)
    ->schema($schema)
    ->batch(false);

// columns
$idColumn = new \Kendo\UI\GanttColumn();
$idColumn->field("id")
         ->title("ID")
         ->width(50);

$titleColumn = new \Kendo\UI\GanttColumn();
$titleColumn->field("title")
            ->title("Title")
            ->editable(true)
            ->sortable(true);

$startColumn = new \Kendo\UI\GanttColumn();
$startColumn->field("start")
            ->title("Start Time")
            ->format("{0:MM/dd/yyyy}")
            ->width(100)
            ->editable(true)
            ->sortable(true);
            
$endColumn = new \Kendo\UI\GanttColumn();
$endColumn->field("end")
          ->title("End Time")
          ->format("{0:MM/dd/yyyy}")
          ->width(100)
          ->editable(true)
          ->sortable(true);

// gantt
$gantt = new \Kendo\UI\Gantt('gantt');
$gantt->dataSource($tasks)
      ->dependencies($dependencies)
      ->height(400)
      ->addView(
          'day',
          array('type' => 'week', 'selected' => true),
          'month'
      )
      ->addColumn($idColumn, $titleColumn, $startColumn, $endColumn)
      ->navigatable(true)
      ->showWorkHours(false)
      ->showWorkDays(false)
      ->snap(false);
?>

<?php
echo $gantt->render();
?>

    <h4>Focus</h4>
    <ul class="keyboard-legend" style="margin-bottom: 1em;">
        <li>
            <span class="button-preview">
                <span class="key-button leftAlign">Alt</span>
                +
                    <span class="key-button">w</span>
            </span>
            <span class="button-descr">focuses the widget
            </span>
        </li>
    </ul>

    <h4>Actions applied on Gantt's Timeline</h4>
    <ul class="keyboard-legend" style="margin-bottom: 1em;">
        <li>
            <span class="button-preview">
                <span class="key-button">Delete</span>
            </span>
            <span class="button-descr">deletes currently selected task and/or dependency
            </span>
        </li>
    </ul>

    <h4>Actions applied on Gantt's TreeList header</h4>
    <ul class="keyboard-legend">
        <li>
            <span class="button-preview">
                <span class="key-button">Enter</span>
            </span>
            <span class="button-descr">sort by the column
            </span>
        </li>
    </ul>

    <h4>Actions applied on Gantt's TreeList data table</h4>
    <ul class="keyboard-legend">
        <li>
            <span class="button-preview">
                <span class="key-button wider">Arrow Keys</span>
            </span>
            <span class="button-descr">to navigate over the cells.
            </span>
        </li>
        <li>
            <span class="button-preview">
                <span class="key-button">Enter</span>
            </span>
            <span class="button-descr">opens cell editor.
            </span>
        </li>
        <li>
            <span class="button-preview">
                <span class="key-button">Esc</span>
            </span>
            <span class="button-descr">closes cell editor.
            </span>
        </li>
        <li>
            <span class="button-preview">
                <span class="key-button">Space</span>
            </span>
            <span class="button-descr">selects currently highlighted cell's row.
            </span>
        </li>
        <li>
            <span class="button-preview">
                <span class="key-button">Delete</span>
            </span>
            <span class="button-descr">deletes currently selected task.
            </span>
        </li>
        <li>
            <span class="button-preview">
                <span class="key-button">1</span>
                -
                <span class="key-button">3</span>
            </span>
            <span class="button-descr">moves between the available views.
            </span>
        </li>
        <li>
            <span class="button-preview">
                <span class="key-button">Alt Left Arrow</span>
                /
                <span class="key-button">Alt Right Arrow</span>
            </span>
            <span class="button-descr">scrolls timeline.
            </span>
        </li>
        <li>
            <span class="button-preview">
                <span class="key-button">Ctrl Right Arrow</span>
                /
                <span class="key-button">Ctrl Left Arrow</span>
            </span>
            <span class="button-descr">expand/collapse summary row.
            </span>
        </li>
    </ul>

    <h4>Actions applied on 'Add Task' action DropDown</h4>
    <ul class="keyboard-legend">
        <li>
            <span class="button-preview">
                <span class="key-button wider leftAlign">Up Arrow</span>
            </span>
            <span class="button-descr">highlights previous item.
            </span>
        </li>
        <li>
            <span class="button-preview">
                <span class="key-button wider leftAlign">Down Arrow</span>
            </span>
            <span class="button-descr">highlights next item.
            </span>
        </li>
        <li>
            <span class="button-preview">
                <span class="key-button wider rightAlign">Enter</span>
            </span>
            <span class="button-descr">selects highlighted item.
            </span>
        </li>
        <li>
            <span class="button-preview">
                <span class="key-button">Esc</span>
            </span>
            <span class="button-descr">closes the dropdown.
            </span>
        </li>
    </ul>

<script>
    $(document.body).keydown(function(e) {
        if (e.altKey && e.keyCode == 87) {
            $("#gantt").data("kendoGantt").list.content.find("table").focus();
        }
    });
</script>

<?php require_once '../include/footer.php'; ?>

