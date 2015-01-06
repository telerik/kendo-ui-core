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

<?php
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

$connectionsCreate->url('events.php?type=createConnection')
     ->contentType('application/json')
     ->type('POST');

$connectionsRead = new \Kendo\Data\DataSourceTransportRead();

$connectionsRead->url('events.php?type=readConnections')
     ->contentType('application/json')
     ->type('POST');

$connectionsUpdate = new \Kendo\Data\DataSourceTransportUpdate();

$connectionsUpdate->url('events.php?type=updateConnection')
     ->contentType('application/json')
     ->type('POST');

$connectionsDestroy = new \Kendo\Data\DataSourceTransportDestroy();

$connectionsDestroy->url('events.php?type=destroyConnection')
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
        ->connectionDefaults($connection_defaults)
        ->dataBound('onDataBound')
        ->edit('onEdit')
        ->addEvent('onAdd')
        ->remove('onRemove')
        ->cancel('onCancel')
        ->itemRotate('onItemRotate')
        ->pan('onPan')
        ->select('onSelect')
        ->zoomStart('onZoomStart')
        ->zoomEnd('onZoomEnd')
        ->click('onClick')
        ->mouseEnter('onMouseEnter')
        ->mouseLeave('onMouseLeave');

echo $diagram->render();
?>
<div class="box">
    <h4>Console log</h4>
    <div class="console"></div>
</div>

<script>
    function onDataBound(e) {
        kendoConsole.log("Diagram data bound");
    }

    function onEdit(e) {
        kendoConsole.log("Diagram edit");
    }

    function onAdd(e) {
        kendoConsole.log("Diagram add");
    }

    function onRemove(e) {
        kendoConsole.log("Diagram remove");
    }

    function onCancel(e) {
        kendoConsole.log("Diagram cancel");
    }

    function onItemRotate(e) {
        var rotation = e.item.rotate();
        kendoConsole.log("Rotate - angle: " + rotation.angle + " center: " + rotation.x + "," + rotation.y);
    }

    function onPan(e) {
        kendoConsole.log("Pan: " + e.pan.toString());
    }

    function onSelect(e) {
        var action;
        var items;
        if (e.selected.length) {
            action = "Selected";
            items = e.selected;
        } else if (e.deselected.length) {
            action = "Deselected";
            items = e.deselected;
        }

        kendoConsole.log(action + ": " + items.length);
    }

    function onZoomStart(e) {
        kendoConsole.log("Zoom start: " + e.zoom);
    }

    function onZoomEnd(e) {
        kendoConsole.log("Zoom end: " + e.zoom);
    }

    function onClick(e) {
        kendoConsole.log("Click: " + elementText(e.item));
    }

    function onMouseEnter(e) {
        kendoConsole.log("Mouse enter: " + elementText(e.item));
    }

    function onMouseLeave(e) {
        kendoConsole.log("Mouse leave: " + elementText(e.item));
    }

    var diagram = kendo.dataviz.diagram;
    var Shape = diagram.Shape;
    var Connection = diagram.Connection;
    var Point = diagram.Point;

    function elementText(element) {
        var text;
        if (element instanceof Shape) {
            text = element.dataItem.JobTitle;
        } else if (element instanceof Point) {
            text = "(" + element.x + "," + element.y + ")";
        } else if (element instanceof Connection) {
            var source = element.source();
            var target = element.target();
            var sourceElement = source.shape || source;
            var targetElement = target.shape || target;
            text = elementText(sourceElement) + " - " + elementText(targetElement);
        }
        return text;
    }

    function visualTemplate(options) {
        var dataviz = kendo.dataviz;
        var g = new dataviz.diagram.Group();
        var dataItem = options.dataItem;

        if (dataItem.JobTitle === "President") {
            g.append(new dataviz.diagram.Circle({
                radius: 60,
                stroke: {
                    width: 2,
                    color: dataItem.Color || "#586477"
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
</script>

<?php require_once '../include/footer.php'; ?>
