<?php
require_once '../../lib/Kendo/Autoload.php';
require_once '../../include/diagram_data.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    header('Content-Type: application/json');

    $result = diagram_nodes();

    echo json_encode($result);

    exit;
}

require_once '../../include/header.php';
?>

<?php
$read = new \Kendo\Data\DataSourceTransportRead();
$read->url('layout.php')
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
$layout->type('tree')
       ->subtype('down')
       ->horizontalSeparation(30)
       ->verticalSeparation(20);

$shape_defaults = new \Kendo\Dataviz\UI\DiagramShapeDefaults();
$shape_defaults->width(40)
               ->height(40);

$diagram = new \Kendo\Dataviz\UI\Diagram('diagram');
$diagram->dataSource($dataSource)
        ->layout($layout)
        ->shapeDefaults($shape_defaults);

echo $diagram->render();
?>

<div class="configuration-horizontal">
    <div class="config-section">
        <label for="subtype">Layout: </label>
        <input id="subtype" value="1" />
    </div>
</div>
<script>
    function subtypeChange() {
        $("#diagram").getKendoDiagram().layout({
            subtype: this.value(),
            type: "tree",
            horizontalSeparation: 30,
            verticalSeparation: 20
        });
    }

    function init() {
        var subtypeData = [{
            text: "TreeDown", value: "down"
        },{
            text: "TreeUp", value: "up"
        },{
            text: "TipoverTree", value: "tipover"
        }];

        $("#subtype").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: subtypeData,
            change: subtypeChange
        });

        createDiagram();
    }
</script>

<?php require_once '../../include/footer.php'; ?>
