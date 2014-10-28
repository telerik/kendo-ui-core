<?php
require_once '../lib/DataSourceResult.php';
require_once '../lib/SchedulerDataSourceResult.php';
require_once '../lib/Kendo/Autoload.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    header('Content-Type: application/json');

    $request = json_decode(file_get_contents('php://input'));

    $result = new SchedulerDataSourceResult('sqlite:..//sample.db');

    $type = $_GET['type'];

    $columns = array('TaskID', 'Title', 'Start', 'End', 'StartTimezone', 'EndTimezone', 'IsAllDay', 'Description', 'RecurrenceID', 'RecurrenceRule', 'RecurrenceException');

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
            $result = $result->read('Tasks', array('TaskID'), $request);
            break;
    }

    echo json_encode($result, JSON_NUMERIC_CHECK);

    exit;
}

require_once '../include/header.php';

$transport = new \Kendo\Data\DataSourceTransport();

$create = new \Kendo\Data\DataSourceTransportCreate();

$create->url('events.php?type=create')
     ->contentType('application/json')
     ->type('POST');

$read = new \Kendo\Data\DataSourceTransportRead();

$read->url('events.php?type=read')
     ->contentType('application/json')
     ->type('POST');

$update = new \Kendo\Data\DataSourceTransportUpdate();

$update->url('events.php?type=update')
     ->contentType('application/json')
     ->type('POST');

$destroy = new \Kendo\Data\DataSourceTransportDestroy();

$destroy->url('events.php?type=destroy')
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
    ->addField($isAllDayField);

$schema = new \Kendo\Data\DataSourceSchema();
$schema->data('data')
        ->errors('errors')
        ->model($model);

$dataSource = new \Kendo\Data\DataSource();

$dataSource->transport($transport)
    ->schema($schema)
    ->batch(true);

$scheduler = new \Kendo\UI\Scheduler('scheduler');
$scheduler->timezone("Etc/UTC")
    ->selectable(true)
    ->date(new DateTime('2013/6/13', new DateTimeZone('UTC')))
    ->height(600)
    ->addView(
        array('type' => 'day', 'startTime' => new DateTime('2013/6/13 7:00', new DateTimeZone('UTC'))),
        array('type' => 'week', 'selected' => true, 'startTime' => new DateTime('2013/6/13 7:00', new DateTimeZone('UTC'))),
        'month', 'agenda', 'timeline')
    ->dataSource($dataSource)
    ->dataBinding('scheduler_dataBinding')
    ->dataBound('scheduler_dataBound')
    ->change('scheduler_change')
    ->save('scheduler_save')
    ->remove('scheduler_remove')
    ->cancel('scheduler_cancel')
    ->addEvent('scheduler_add')
    ->edit('scheduler_edit')
    ->resizeStart('scheduler_resizeStart')
    ->resize('scheduler_resize')
    ->resizeEnd('scheduler_resizeEnd')
    ->moveStart('scheduler_moveStart')
    ->move('scheduler_move')
    ->navigate('scheduler_navigate')
    ->moveEnd('scheduler_moveEnd');

echo $scheduler->render();
?>
<div class="console"></div>

<script>
    function scheduler_dataBinding(e) {
        kendoConsole.log("dataBinding");
    }

    function scheduler_dataBound(e) {
        kendoConsole.log("dataBound");
    }

    function scheduler_change(e) {
        var start = e.start; //selection start date
        var end = e.end; //selection end date
        var slots = e.slots; //list of selected slots
        var events = e.events; //list of selected Scheduler events

        var message = "change:: selection from {0:g} till {1:g}";

        if (events.length) {
            message += ". The selected event is '" + events[events.length - 1].title + "'";
        }

        kendoConsole.log(kendo.format(message, start, end));
    }

    function scheduler_save(e) {
        kendoConsole.log("save");
    }

    function scheduler_remove(e) {
        kendoConsole.log("remove");
    }

    function scheduler_cancel(e) {
        kendoConsole.log("cancel");
    }

    function scheduler_edit(e) {
        kendoConsole.log("edit");
    }

    function scheduler_add(e) {
        kendoConsole.log("add");
    }

    function scheduler_moveStart(e) {
        kendoConsole.log("moveStart");
    }

    function scheduler_move(e) {
        kendoConsole.log("move");
    }

    function scheduler_moveEnd(e) {
        kendoConsole.log("moveEnd");
    }

    function scheduler_resizeStart(e) {
        kendoConsole.log("resizeStart");
    }

    function scheduler_resize(e) {
        kendoConsole.log("resize");
    }

    function scheduler_resizeEnd(e) {
        kendoConsole.log("resizeEnd");
    }

    function scheduler_navigate(e) {
        kendoConsole.log(kendo.format("navigate:: action:{0}; view:{1}; date:{2:d};", e.action, e.view, e.date));
    }
</script>

<?php require_once '../include/footer.php'; ?>
