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
        ->colors(array(
                    array("#0c81c5", "#c5dceb"), array("#3aa2de", "#d8ecf8"),
                    array("#449000", "#dae9cc"), array("#76b800", "#dae7c3"),
                    array("#ffae00", "#f5e5c3"), array("#ef4c00", "#f1b092"),
                    array("#9e0a61", "#eccedf")))
        ->attr('style', 'height: 600px;');

echo $treeMap->render();
?>
<style scoped>
    .k-leaf {
        color: #fff;
    }
    .k-leaf:hover {
        border: 0;
        color: #fff;
        padding: .7em;
    }
    .k-tile-inverse,
    .k-tile-inverse:hover {
        color: #000;
    }
</style>
<?php require_once '../include/footer.php'; ?>
