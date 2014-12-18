<?php
require_once '../lib/DataSourceResult.php';
require_once '../lib/SchedulerDataSourceResult.php';
require_once '../lib/Kendo/Autoload.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    header('Content-Type: application/json');

    $request = json_decode(file_get_contents('php://input'));

    $result = new SchedulerDataSourceResult('sqlite:..//sample.db');

    $type = $_GET['type'];

    $columns = array('TaskID', 'Title', 'Start', 'End', 'StartTimezone', 'EndTimezone', 'IsAllDay', 'Description', 'RecurrenceID', 'RecurrenceRule', 'RecurrenceException', 'OwnerID');

     if ($type == 'save') {
        $fileName = $_POST['fileName'];
        $contentType = $_POST['contentType'];
        $base64 = $_POST['base64'];

        $data = base64_decode($base64);

        header('Content-Type:' . $contentType);
        header('Content-Length:' . strlen($data));
        header('Content-Disposition: attachment; filename=' . $fileName);

        echo $data;
    }

    switch($type) {
        case 'create':
            $result = $result->create('Tasks', $columns, $request->models, 'TaskID');
            break;
        case 'update':
            $result = $result->update('Tasks', $columns, $request->models, 'TaskID');
            break;
        case 'destroy':
            $result = $result->destroy('Tasks', $request->models, 'TaskID');
            break;
        default:
            $result = $result->read('Tasks', array('TaskID', 'OwnerID'), $request);
            break;
    }

    echo json_encode($result, JSON_NUMERIC_CHECK);

    exit;
}

require_once '../include/header.php';

$transport = new \Kendo\Data\DataSourceTransport();

$create = new \Kendo\Data\DataSourceTransportCreate();

$create->url('index.php?type=create')
     ->contentType('application/json')
     ->type('POST');

$read = new \Kendo\Data\DataSourceTransportRead();

$read->url('index.php?type=read')
     ->contentType('application/json')
     ->type('POST');

$update = new \Kendo\Data\DataSourceTransportUpdate();

$update->url('index.php?type=update')
     ->contentType('application/json')
     ->type('POST');

$destroy = new \Kendo\Data\DataSourceTransportDestroy();

$destroy->url('index.php?type=destroy')
     ->contentType('application/json')
     ->type('POST');

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
        ->type('string')
        ->validation(array('required' => true));

$startField = new \Kendo\Data\DataSourceSchemaModelField('start');
$startField->type('date')
        ->from('Start');

$startTimezoneField = new \Kendo\Data\DataSourceSchemaModelField('startTimezone');
$startTimezoneField->from('StartTimezone');

$endField = new \Kendo\Data\DataSourceSchemaModelField('end');
$endField->type('date')
        ->from('End');

$endTimezoneField = new \Kendo\Data\DataSourceSchemaModelField('endTimezone');
$endTimezoneField->from('EndTimezone');

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
    ->addField($startTimezoneField)
    ->addField($endTimezoneField)
    ->addField($descriptionField)
    ->addField($recurrenceIdField)
    ->addField($recurrenceRuleField)
    ->addField($recurrenceExceptionField)
    ->addField($ownerIdField)
    ->addField($isAllDayField);

$schema = new \Kendo\Data\DataSourceSchema();
$schema->data('data')
        ->errors('errors')
        ->model($model);

$dataSource = new \Kendo\Data\DataSource();

$dataSource->transport($transport)
    ->schema($schema)
    ->batch(true);

$resource = new \Kendo\UI\SchedulerResource();
$resource->field('ownerId')
    ->title('Owner')
    ->dataSource(array(
        array('text'=> 'Alex', 'value' => 1, 'color' => '#f8a398'),
        array('text'=> 'Bob', 'value' => 2, 'color' => '#51a0ed'),
        array('text'=> 'Charlie', 'value' => 3, 'color' => '#56ca85')
    ));

$pdf = new \Kendo\UI\SchedulerPdf();
$pdf->fileName('Kendo UI Scheduler Export.pdf')
    ->proxyURL('pdf-export.php?type=save');

$scheduler = new \Kendo\UI\Scheduler('scheduler');
$scheduler->timezone("Etc/UTC")
        ->date(new DateTime('2013/6/13'))
        ->pdf($pdf)
        ->addToolbarItem(new \Kendo\UI\SchedulerToolbarItem('pdf'))
        ->height(600)
        ->addResource($resource)
        ->addView(array('type' => 'day', 'startTime' => new DateTime('2013/6/13 7:00')),
            array('type' => 'workWeek', 'selected' => true, 'startTime' => new DateTime('2013/6/13 7:00')),
            array('type' => 'week', 'startTime' => new DateTime('2013/6/13 7:00')), 'month', 'agenda', 'timeline')
        ->dataSource($dataSource);

?>

<?php
echo $scheduler->render();
?>

<style scoped>
    /*
        Use the DejaVu Sans font for display and embedding in the PDF file.
        The standard PDF fonts have no support for Unicode characters.
    */
    .k-scheduler {
        font-family: "DejaVu Sans", "Arial", sans-serif;
    }
</style>

<!-- Load Pako ZLIB library to enable PDF compression -->
<script src="../content/shared/js/pako.min.js"></script>

<?php require_once '../include/footer.php'; ?>
