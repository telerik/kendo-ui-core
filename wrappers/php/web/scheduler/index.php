<?php
require_once '../../lib/DataSourceResult.php';
require_once '../../lib/Kendo/Autoload.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    header('Content-Type: application/json');

    $request = json_decode(file_get_contents('php://input'));

    $result = new DataSourceResult('sqlite:../../sample.db');

    echo json_encode($result->read('Tasks', array('TaskID', 'Title', 'strftime(\'%Y-%m-%dT%H:%M:%S\', Start) as Start', 'strftime(\'%Y-%m-%dT%H:%M:%S\', End) as End'), $request));

    exit;
}

require_once '../../include/header.php';

$transport = new \Kendo\Data\DataSourceTransport();

$read = new \Kendo\Data\DataSourceTransportRead();

$read->url('index.php')
     ->contentType('application/json')
     ->type('POST');

$transport ->read($read)
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

$model->id('taskID')
    ->addField($taskIDField)
    ->addField($titleField)
    ->addField($startField)
    ->addField($endField);

$schema = new \Kendo\Data\DataSourceSchema();
$schema->data('data')
        ->errors('errors')
        ->model($model);

$dataSource = new \Kendo\Data\DataSource();

$dataSource->transport($transport)
    ->schema($schema);

$scheduler = new \Kendo\UI\Scheduler('scheduler');
$scheduler->timezone('Etc/UTC')
        ->date(new DateTime('2013/6/13'))
        ->addView('day', array('type' => 'week', 'selected' => true), 'month', 'agenda')
        ->dataSource($dataSource);

?>
<?= json_encode(date('2013/6/13'))?>
<div id="people">
    <input checked type="checkbox" id="alex" value="1">
    <input checked type="checkbox" id="bob" value="2">
    <input type="checkbox" id="charlie" value="3">
</div>

<?php
echo $scheduler->render();
?>

<style scoped>
    #people {
        background: url('../../content/web/scheduler/team-schedule.png') transparent no-repeat;
        height: 115px;
        position: relative;
    }
    #alex {
        position: absolute;
        left: 404px;
        top: 81px;
    }
    #bob {
        position: absolute;
        left: 519px;
        top: 81px;
    }
    #charlie {
        position: absolute;
        left: 634px;
        top: 81px;
    }
</style>
<?php require_once '../../include/footer.php'; ?>
