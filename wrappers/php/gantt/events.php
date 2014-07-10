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
      ->height(700)
      ->addView(
          'day',
          array('type' => 'week', 'selected' => true),
          'month'
      )
      ->addColumn($idColumn, $titleColumn, $startColumn, $endColumn)
      ->showWorkHours(false)
      ->showWorkDays(false)
      ->snap(false);

// attach event handlers

$gantt
    ->dataBound("onDataBound")
    ->dataBinding("onDataBinding")
    ->change("onChange")
    ->addEvent("onAdd")
    ->edit("onEdit")
    ->cancel("onCancel")
    ->change("onChange")
    ->remove("onRemove")
    ->save("onSave")
    ->navigate("onNavigate")
    ->moveStart("onMoveStart")
    ->move("onMove")
    ->moveEnd("onMoveEnd")
    ->resizeStart("onResizeStart")
    ->resize("onResize")
    ->resizeEnd("onResizeEnd");
?>

<?php
echo $gantt->render();
?>

<script>
    function onChange(e) {
        var gantt = e.sender;
        var selection = gantt.select();

        if (selection.length) {
            var dataItem = gantt.dataItem(selection);
            kendoConsole.log("Gantt selection change :: " + dataItem.title);
        }
    }

    function onAdd(e) {
        kendoConsole.log("Task added");
    }

    function onEdit(e) {
        kendoConsole.log("Task about to be edited :: " + e.task.title);
    }

    function onCancel(e) {
        kendoConsole.log("Cancel task edit :: " + e.task.title);
    }

    function onRemove(e) {
        kendoConsole.log("Task removed :: " + e.task.title);
    }

    function onSave(e) {
        kendoConsole.log("Task saved :: " + e.task.title);
    }

    function onDataBound() {
        kendoConsole.log("Gantt data bound");
    }

    function onDataBinding() {
        kendoConsole.log("Gantt data binding");
    }

    function onNavigate(e) {
        kendoConsole.log(kendo.format("navigate:: view:{0};", e.view));
    }

    function onMoveStart(e) {
        kendoConsole.log("moveStart");
    }

    function onMove(e) {
        kendoConsole.log("move");
    }

    function onMoveEnd(e) {
        kendoConsole.log("moveEnd");
    }

    function onResizeStart(e) {
        kendoConsole.log("resizeStart");
    }

    function onResize(e) {
        kendoConsole.log("resize");
    }

    function onResizeEnd(e) {
        kendoConsole.log("resizeEnd");
    }
</script>


<div class="box">
    <h4>Console log</h4>
    <div class="console"></div>
</div>

<?php require_once '../include/footer.php'; ?>

