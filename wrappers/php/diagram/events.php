<?php
require_once '../lib/Kendo/Autoload.php';
require_once '../include/diagram_data.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    header('Content-Type: application/json');

    $result = orgchart_items();

    echo json_encode($result);

    exit;
}

require_once '../include/header.php';
?>

<?php
$read = new \Kendo\Data\DataSourceTransportRead();
$read->url('events.php')
     ->contentType('application/json')
     ->type('POST');

$transport = new \Kendo\Data\DataSourceTransport();
$transport->read($read);

$model = new \Kendo\Data\HierarchicalDataSourceSchemaModel();
$model->children("items");

$schema = new \Kendo\Data\HierarchicalDataSourceSchema();
$schema->model($model);

$dataSource = new \Kendo\Data\HierarchicalDataSource();
$dataSource->transport($transport)
           ->schema($schema);

$layout = new \Kendo\Dataviz\UI\DiagramLayout();
$layout->type('layered');

$shape_defaults = new \Kendo\Dataviz\UI\DiagramShapeDefaults();
$shape_defaults->visual(new \Kendo\JavaScriptFunction('visualTemplate'));

$stroke = new \Kendo\Dataviz\UI\DiagramConnectionDefaultsStroke();
$stroke->color('#979797')
       ->width(2);

$connection_defaults = new \Kendo\Dataviz\UI\DiagramConnectionDefaults();
$connection_defaults->stroke($stroke);

$diagram = new \Kendo\Dataviz\UI\Diagram('diagram');
$diagram->dataSource($dataSource)
        ->layout($layout)
        ->shapeDefaults($shape_defaults)
        ->connectionDefaults($connection_defaults)
        ->itemRotate('onItemRotate')
        ->pan("onPan")
        ->select("onSelect")
        ->zoomStart("onZoomStart")
        ->zoomEnd("onZoomEnd")
        ->click("onClick");

echo $diagram->render();
?>
<div class="box">
    <h4>Console log</h4>
    <div class="console"></div>
</div>

<script>
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

    var diagram = kendo.dataviz.diagram;
    var Shape = diagram.Shape;
    var Connection = diagram.Connection;
    var Point = diagram.Point;

    function elementText(element) {
        var text;
        if (element instanceof Shape) {
            text = dataItemName(element.dataItem);
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

    function dataItemName(dataItem) {
        return dataItem.firstName + " " + dataItem.lastName;
    }

    function visualTemplate(options) {
        var dataviz = kendo.dataviz;
        var g = new dataviz.diagram.Group();
        var dataItem = options.dataItem;

        g.append(new dataviz.diagram.Rectangle({
            width: 210,
            height: 75,
            stroke: {
                width: 0
            },
            fill: dataItem.colorScheme
        }));

        g.append(new dataviz.diagram.TextBlock({
            text: dataItem.firstName + " " + dataItem.lastName,
            x: 85,
            y: 20,
            color: "#fff"
        }));

        g.append(new dataviz.diagram.TextBlock({
            text: dataItem.title,
            x: 85,
            y: 40,
            color: "#fff"
        }));

        g.append(new dataviz.diagram.Image({
            source: "../content/dataviz/diagram/people/" + dataItem.image,
            x: 3,
            y: 3,
            width: 68,
            height: 68
        }));

        return g;
    }
</script>

<?php require_once '../include/footer.php'; ?>
