<?php

require_once '../lib/DataSourceResult.php';
require_once '../lib/Kendo/Autoload.php';


if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    header('Content-Type: application/json');

    $request = json_decode(file_get_contents('php://input'));

    $result = new DataSourceResult('sqlite:..//sample.db');

    $type = $_GET['type'];

    $fields = array('Id', 'JobTitle', 'Color');
    $connectionFields = array('Id', 'FromShapeId', 'ToShapeId', 'Text', 'FromPointX', 'FromPointY', 'ToPointX', 'ToPointY');

    switch($type) {
        case 'create':
            $result = $result->create('OrgChartShapes', $fields, $request, 'Id');
            break;
        case 'read':
            $result = $result->read('OrgChartShapes', $fields, $request);
            break;
        case 'update':
            $result = $result->update('OrgChartShapes', $fields, $request, 'Id');
            break;
        case 'destroy':
            $result = $result->destroy('OrgChartShapes', $request, 'Id');
            break;
        case 'createConnection':             
            $result = $result->create('OrgChartConnections', $connectionFields, $request, 'Id');
            break;
        case 'readConnections':
            $result = $result->read('OrgChartConnections', $connectionFields, $request);
            break;
        case 'updateConnection':     
            $result = $result->update('OrgChartConnections', $connectionFields, $request, 'Id');
            break;
        case 'destroyConnection':
            $result = $result->destroy('OrgChartConnections', $request, 'Id');
            break;
    }

    echo json_encode($result, JSON_NUMERIC_CHECK);

    exit;
}

require_once '../include/header.php';
?>

<script type="text/javascript">
	function visualTemplate(options) {
	    var dataviz = kendo.dataviz;
	    var g = new dataviz.diagram.Group();
	    var dataItem = options.dataItem;

	    if (dataItem.JobTitle === "President") {
	        g.append(new dataviz.diagram.Circle({
	            radius: 60,
	            stroke: {
	                width: 2,
	                color: "#586477"
	            },
	            fill: "#e8eff7"
	        }));
	    } else {
	        g.append(new dataviz.diagram.Rectangle({
	            width: 240,
	            height: 67,
	            stroke: {
	                width: 0
	            },
	            fill: "#e8eff7"
	        }));

	        g.append(new dataviz.diagram.Rectangle({
	            width: 8,
	            height: 67,
	            fill: dataItem.Color,
	            stroke: {
	                width: 0
	            }
	        }));
	    }

	    return g;
	}

	function onDataBound(e) {
	    var that = this;
	    setTimeout(function () {
	        that.bringIntoView(that.shapes);
	    }, 0);
	}
</script>

<?php
$transport = new \Kendo\Data\DataSourceTransport();

$create = new \Kendo\Data\DataSourceTransportCreate();

$create->url('editing.php?type=create')
     ->contentType('application/json')
     ->type('POST');

$read = new \Kendo\Data\DataSourceTransportRead();

$read->url('editing.php?type=read')
     ->contentType('application/json')
     ->type('POST');

$update = new \Kendo\Data\DataSourceTransportUpdate();

$update->url('editing.php?type=update')
     ->contentType('application/json')
     ->type('POST');

$destroy = new \Kendo\Data\DataSourceTransportDestroy();

$destroy->url('editing.php?type=destroy')
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

$shapeIDField = new \Kendo\Data\DataSourceSchemaModelField('Id');
$shapeIDField->type('number')
               ->editable(false);
$jobTitleField = new \Kendo\Data\DataSourceSchemaModelField('JobTitle');
$jobTitleField->type('string');

$colorField = new \Kendo\Data\DataSourceSchemaModelField('Color');
$colorField->type('string');

$model->id('Id')
    ->addField($shapeIDField)
    ->addField($jobTitleField)
    ->addField($colorField);

$schema = new \Kendo\Data\DataSourceSchema();
$schema->model($model)
        ->data('data')
        ->total('total');

$dataSource = new \Kendo\Data\DataSource();
$dataSource->transport($transport)
           ->schema($schema);


$connectionsTransport = new \Kendo\Data\DataSourceTransport();

$connectionsCreate = new \Kendo\Data\DataSourceTransportCreate();

$connectionsCreate->url('editing.php?type=createConnection')
     ->contentType('application/json')
     ->type('POST');

$connectionsRead = new \Kendo\Data\DataSourceTransportRead();

$connectionsRead->url('editing.php?type=readConnections')
     ->contentType('application/json')
     ->type('POST');

$connectionsUpdate = new \Kendo\Data\DataSourceTransportUpdate();

$connectionsUpdate->url('editing.php?type=updateConnection')
     ->contentType('application/json')
     ->type('POST');

$connectionsDestroy = new \Kendo\Data\DataSourceTransportDestroy();

$connectionsDestroy->url('editing.php?type=destroyConnection')
     ->contentType('application/json')
     ->type('POST');

$connectionsTransport->create($connectionsCreate)
          ->read($connectionsRead)
          ->update($connectionsUpdate)
          ->destroy($connectionsDestroy)
          ->parameterMap('function(data) {
              return kendo.stringify(data);
          }');

$connectionsModel = new \Kendo\Data\DataSourceSchemaModel();

$connectionIDField = new \Kendo\Data\DataSourceSchemaModelField('Id');
$connectionIDField->type('number')
               ->editable(false);
$textField = new \Kendo\Data\DataSourceSchemaModelField('Text');
$textField->type('string');

$fromField = new \Kendo\Data\DataSourceSchemaModelField('from');
$fromField->type('number')
          ->from('FromShapeId');

$toField = new \Kendo\Data\DataSourceSchemaModelField('to');
$toField->type('number')
        ->from('ToShapeId');
        
$fromXField = new \Kendo\Data\DataSourceSchemaModelField('fromX');
$fromXField->type('number')
          ->from('FromPointX');
$fromYField = new \Kendo\Data\DataSourceSchemaModelField('fromY');
$fromYField->type('number')
          ->from('FromPointY');

$toXField = new \Kendo\Data\DataSourceSchemaModelField('toX');
$toXField->type('number')
        ->from('ToPointX');

$toYField = new \Kendo\Data\DataSourceSchemaModelField('toY');
$toYField->type('number')
        ->from('ToPointY');

$connectionsModel->id('Id')
    ->addField($connectionIDField)
    ->addField($textField)
    ->addField($fromField)
    ->addField($toField)
    ->addField($fromXField)
    ->addField($fromYField)
    ->addField($toXField)
    ->addField($toYField);

$connectionsSchema = new \Kendo\Data\DataSourceSchema();
$connectionsSchema->model($connectionsModel)
                  ->data('data')
                  ->total('total');

$connectionsDataSource = new \Kendo\Data\DataSource();
$connectionsDataSource->transport($connectionsTransport)
           ->schema($connectionsSchema);


$layout = new \Kendo\Dataviz\UI\DiagramLayout();
$layout->type('tree')
       ->subtype('tipover')
       ->underneathHorizontalOffset(140);

       
$shapeContent = new \Kendo\Dataviz\UI\DiagramShapeDefaultsContent();
$shapeContent->template('#:dataItem.JobTitle#')
             ->fontSize(17);

$shape_defaults = new \Kendo\Dataviz\UI\DiagramShapeDefaults();
$shape_defaults->visual(new \Kendo\JavaScriptFunction('visualTemplate'))
               ->content($shapeContent);

$stroke = new \Kendo\Dataviz\UI\DiagramConnectionDefaultsStroke();
$stroke->color('#586477')
       ->width(2);

$connection_defaults = new \Kendo\Dataviz\UI\DiagramConnectionDefaults();
$connection_defaults->stroke($stroke);

$diagram = new \Kendo\Dataviz\UI\Diagram('diagram');
$diagram->dataSource($dataSource)
        ->connectionsDataSource($connectionsDataSource)
        ->layout($layout)
        ->dataBound('onDataBound')
        ->shapeDefaults($shape_defaults)
        ->connectionDefaults($connection_defaults);

echo $diagram->render();
?>

<?php require_once '../include/footer.php'; ?>
