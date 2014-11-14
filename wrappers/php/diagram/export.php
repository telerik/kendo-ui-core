<?php
require_once '../lib/Kendo/Autoload.php';
require_once '../include/diagram_data.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $type = $_GET['type'];
    if ($type == 'save') {
        $fileName = $_POST['fileName'];
        $contentType = $_POST['contentType'];
        $base64 = $_POST['base64'];

        $data = base64_decode($base64);

        header('Content-Type:' . $contentType);
        header('Content-Length:' . strlen($data));
        header('Content-Disposition: attachment; filename=' . $fileName);

        echo $data;
    } else {
        header('Content-Type: application/json');

        $result = orgchart_items();

        echo json_encode($result);
    }

    exit;
}

require_once '../include/header.php';
?>

<div class="box">
    <h4>Export diagram content</h4>
    <div class="box-col">
        <button class='export-pdf k-button'>Export as PDF</button>
    </div>
    <div class="box-col">
        <button class='export-img k-button'>Export as Image</button>
    </div>
    <div class="box-col">
        <button class='export-svg k-button'>Export as SVG</button>
    </div>
</div>

<script>
    $(".export-pdf").click(function() {
        var diagram = $("#diagram").getKendoDiagram();
        diagram.exportPDF({ paperSize: "auto", margin: { left: "1cm", top: "1cm", right: "1cm", bottom: "1cm" } }).done(function(data) {
            kendo.saveAs({
                dataURI: data,
                fileName: "diagram.pdf",
                proxyURL: "export.php?type=save"
            });
        });
    });

    $(".export-img").click(function() {
        var diagram = $("#diagram").getKendoDiagram();
        diagram.exportImage().done(function(data) {
            kendo.saveAs({
                dataURI: data,
                fileName: "diagram.png",
                proxyURL: "export.php?type=save"
            });
        });
    });

    $(".export-svg").click(function() {
        var diagram = $("#diagram").getKendoDiagram();
        diagram.exportSVG().done(function(data) {
            kendo.saveAs({
                dataURI: data,
                fileName: "diagram.svg",
                proxyURL: "export.php?type=save"
            });
        });
    });
</script>

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
