<?php
require_once '../lib/Kendo/Autoload.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    header('Content-Type: application/json');

    $result = json_decode(file_get_contents('../content/dataviz/js/population-usa.json'));

    echo json_encode($result);

    exit;
}

require_once '../include/header.php';

$transport = new \Kendo\Data\DataSourceTransport();
$transport->read(array('url' => 'index.php', 'type' => 'POST', 'dataType' => 'json'));

$model = new \Kendo\Data\HierarchicalDataSourceSchemaModel();
$model->children("items");

$schema = new \Kendo\Data\HierarchicalDataSourceSchema();
$schema->model($model);

$dataSource = new \Kendo\Data\HierarchicalDataSource();
$dataSource->transport($transport)
           ->schema($schema);

$treeMap = new \Kendo\Dataviz\UI\TreeMap('treeMap');

$treeMap->dataSource($dataSource)
        ->valueField('value')
        ->textField('name')
        ->dataBound('onDataBound')
		->itemCreated('onItemCreated')
        ->attr('style', 'height: 600px;');

echo $treeMap->render();
?>
<div class="demo-section">
    <h3 class="title">Console log</h3>
    <div class="console"></div>
</div>

<script>

function onDataBound(e) {
    kendoConsole.log("Data bound");
}

function onItemCreated(e) {
    kendoConsole.log("Item is created");
}

</script>
<?php require_once '../include/footer.php'; ?>
