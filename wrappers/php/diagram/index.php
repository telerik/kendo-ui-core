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

<script>
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

<?php
$read = new \Kendo\Data\DataSourceTransportRead();
$read->url('index.php')
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
        ->connectionDefaults($connection_defaults);

echo $diagram->render();
?>

<?php require_once '../include/footer.php'; ?>
