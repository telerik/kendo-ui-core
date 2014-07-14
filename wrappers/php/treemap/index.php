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
<div class="configuration-horizontal">
    <div class="config-section">
        <h4>TreeMap rendering types</h4>
        <ul class="options">
            <li>
                <input id="typeSquarified" name="type"
                            type="radio" value="squarified" checked="checked" autocomplete="off" />
                <label for="typeSquarified">Squarified</label>
            </li>
            <li>
                <input id="typeVertical" name="type"
                            type="radio" value="vertical" autocomplete="off" />
                <label for="typeVertical">Vertical(Slice and Dice)</label>
            </li>
            <li>
                <input id="typeHorizontal" name="type"
                            type="radio" value="horizontal" autocomplete="off" />
                <label for="typeHorizontal">Horizontal(Slice and Dice)</label>
            </li>
        </ul>
    </div>
</div>
<script>
    $(document).ready(function() {
        $(".options").bind("change", refresh);
    });

    function refresh() {
        $("#treeMap").getKendoTreeMap().setOptions({
            type: $("input[name=type]:checked").val()
        });
    }
</script>
<?php require_once '../include/footer.php'; ?>
