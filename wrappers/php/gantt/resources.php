<?php
require_once '../lib/DataSourceResult.php';
require_once '../lib/Kendo/Autoload.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    header('Content-Type: application/json');

    $request = json_decode(file_get_contents('php://input'));

    $result = new DataSourceResult('sqlite:..//sample.db');

    $type = $_GET['type'];

    $operation = $_GET['operation'];

    switch($type) {
        case 'dependency':
            $columns = array('ID', 'PredecessorID', 'SuccessorID', 'Type');
            $table = "GanttDependencies";
            break;
        case 'assignment':
            $columns = array('ID', 'TaskID', 'ResourceID', 'Units');
            $table = "GanttResourceAssignments";
            break;
        case 'resource':
            $columns = array('ID', 'Name', 'Color');
            $table = "GanttResources";
            break;
        default:
            $columns = array('ID', 'ParentID', 'OrderID', 'Title', 'Start', 'End', 'PercentComplete', 'Expanded', 'Summary');
            $table = "GanttTasks";
            break;
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

$create->url('resources.php?type=task&operation=create')
     ->contentType('application/json')
     ->type('POST');

$read = new \Kendo\Data\DataSourceTransportRead();

$read->url('resources.php?type=task&operation=read')
     ->contentType('application/json')
     ->type('POST');

$update = new \Kendo\Data\DataSourceTransportUpdate();

$update->url('resources.php?type=task&operation=update')
     ->contentType('application/json')
     ->type('POST');

$destroy = new \Kendo\Data\DataSourceTransportDestroy();

$destroy->url('resources.php?type=task&operation=destroy')
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

$create->url('resources.php?type=dependency&operation=create')
     ->contentType('application/json')
     ->type('POST');

$read = new \Kendo\Data\DataSourceTransportRead();

$read->url('resources.php?type=dependency&operation=read')
     ->contentType('application/json')
     ->type('POST');

$update = new \Kendo\Data\DataSourceTransportUpdate();

$update->url('resources.php?type=dependency&operation=update')
     ->contentType('application/json')
     ->type('POST');

$destroy = new \Kendo\Data\DataSourceTransportDestroy();

$destroy->url('resources.php?type=dependency&operation=destroy')
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
    
// resources
$transport = new \Kendo\Data\DataSourceTransport();

$read = new \Kendo\Data\DataSourceTransportRead();

$read->url('resources.php?type=resource&operation=read')
     ->contentType('application/json')
     ->type('POST');
     
$transport->read($read);

$resourceModel = new \Kendo\Data\DataSourceSchemaModel();

$idField = new \Kendo\Data\DataSourceSchemaModelField('id');
$idField->from('ID')
        ->type('number');
        
$resourceModel->id("id")
    ->addField($idField);       

$schema = new \Kendo\Data\DataSourceSchema();
$schema->model($resourceModel)
    ->data("data");    
    
$dataSource = new \Kendo\Data\DataSource();

$dataSource->transport($transport)
    ->schema($schema)
    ->batch(false);
    
$resources = new \Kendo\UI\GanttResources();
$resources->field("resources")
          ->dataTextField("Name")
          ->dataColorField("Color")
          ->dataSource($dataSource);

// assignments
$transport = new \Kendo\Data\DataSourceTransport();

$create = new \Kendo\Data\DataSourceTransportCreate();

$create->url('resources.php?type=assignment&operation=create')
     ->contentType('application/json')
     ->type('POST');

$read = new \Kendo\Data\DataSourceTransportRead();

$read->url('resources.php?type=assignment&operation=read')
     ->contentType('application/json')
     ->type('POST');

$update = new \Kendo\Data\DataSourceTransportUpdate();

$update->url('resources.php?type=assignment&operation=update')
     ->contentType('application/json')
     ->type('POST');

$destroy = new \Kendo\Data\DataSourceTransportDestroy();

$destroy->url('resources.php?type=assignment&operation=destroy')
     ->contentType('application/json')
     ->type('POST');

$transport->create($create)
          ->read($read)
          ->update($update)
          ->destroy($destroy)
          ->parameterMap('function(data) {
              return kendo.stringify(data);
          }');

$assignmentModel = new \Kendo\Data\DataSourceSchemaModel();

$idField = new \Kendo\Data\DataSourceSchemaModelField('id');
$idField->type('number')
        ->from('ID');
        
$resourceIdField = new \Kendo\Data\DataSourceSchemaModelField('ResourceID');
$resourceIdField->type('number');      

$taskIdField = new \Kendo\Data\DataSourceSchemaModelField('TaskID');
$taskIdField->type('number');  

$unitsField = new \Kendo\Data\DataSourceSchemaModelField('Units');
$unitsField->type('number');  

$assignmentModel->id('id')
    ->addField($idField)
    ->addField($resourceIdField)
    ->addField($taskIdField)
    ->addField($unitsField);
    
$schema = new \Kendo\Data\DataSourceSchema();
$schema->model($assignmentModel)
    ->data("data");
    
$dataSource = new \Kendo\Data\DataSource();

$dataSource->transport($transport)
    ->schema($schema)
    ->batch(false);
    
$assignments = new \Kendo\UI\GanttAssignments();
$assignments->dataTaskIdField("TaskID")
          ->dataResourceIdField("ResourceID")
          ->dataValueField("Units")
          ->dataSource($dataSource);
          
// columns
$titleColumn = new \Kendo\UI\GanttColumn();
$titleColumn->field("title")
            ->title("Title")
            ->editable(true)
            ->sortable(true);

$resourcesColumn = new \Kendo\UI\GanttColumn();
$resourcesColumn->field("resources")
            ->title("Assigned Resources")           
            ->editable(true);

// gantt
$gantt = new \Kendo\UI\Gantt('gantt');
$gantt->dataSource($tasks)
      ->dependencies($dependencies)
      ->assignments($assignments)
      ->resources($resources)
      ->height(700)
      ->addView(
          'day',
          'week',
          array('type' => 'month', 'selected' => true)    
      )
      ->addColumn($titleColumn, $resourcesColumn)
      ->showWorkHours(false)
      ->showWorkDays(false)
      ->snap(false);
?>

<?php
echo $gantt->render();
?>

<?php require_once '../include/footer.php'; ?>
