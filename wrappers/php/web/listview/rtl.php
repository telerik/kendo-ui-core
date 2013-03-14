<?php

require_once '../../lib/DataSourceResult.php';
require_once '../../lib/Kendo/Autoload.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    header('Content-Type: application/json');

    $request = json_decode(file_get_contents('php://input'));

    $result = new DataSourceResult('sqlite:../../sample.db');

    echo json_encode($result->read('Products', array('ProductID', 'ProductName', 'UnitPrice', 'UnitsInStock'), $request));

    exit;
}

require_once '../../include/header.php';

?>

<script type="text/x-kendo-tmpl" id="template">
    <div class="product">
        <img src="../../content/web/foods/#:ProductID#.jpg" alt="#:ProductName# image" />
        <h3>#:ProductName#</h3>
    </div>
</script>

<div class="demo-section k-rtl">

<?php

    $transport = new \Kendo\Data\DataSourceTransport();

    $read = new \Kendo\Data\DataSourceTransportRead();

    $read->url('rtl.php')
         ->contentType('application/json')
         ->type('POST');

    $transport->read($read)
              ->parameterMap('function(data) {
                return kendo.stringify(data); }');

    $model = new \Kendo\Data\DataSourceSchemaModel();

    $productNameField = new \Kendo\Data\DataSourceSchemaModelField('ProductName');
    $productNameField->type('string');

    $unitPriceField = new \Kendo\Data\DataSourceSchemaModelField('UnitPrice');
    $unitPriceField->type('number');

    $unitsInStockField = new \Kendo\Data\DataSourceSchemaModelField('UnitsInStock');
    $unitsInStockField->type('number');

    $model->addField($productNameField)
          ->addField($unitPriceField)
          ->addField($unitsInStockField);

    $schema = new \Kendo\Data\DataSourceSchema();
    $schema->data('data')
           ->model($model)
           ->total('total');

    $dataSource = new \Kendo\Data\DataSource();

    $dataSource->transport($transport)
               ->schema($schema)
               ->pageSize(12);

    $listview = new \Kendo\UI\ListView('listView');
    $listview->dataSource($dataSource)
             ->templateId('template')
             ->selectable('multiple')
             ->pageable(true);

    echo $listview->render();
?>

</div>

<style scoped>
    .demo-section {
        padding: 15px;
        width: 692px;
    }
    .demo-section h2 {
        font-size: 1.2em;
        margin-bottom: 10px;
        text-transform: uppercase;
    }
    .demo-section .console {
        margin: 0;
    }
    .product
    {
        float: right;
        width: 220px;
        height: 110px;
        margin: 0;
        padding: 5px;
        cursor: pointer;
    }
    .product img
    {
        float: right;
        width: 110px;
        height: 110px;
    }
    .product h3
    {
        margin: 0;
        padding: 10px 10px 0 0;
        font-size: .9em;
        overflow: hidden;
        font-weight: normal;
        float: right;
        max-width: 100px;
        text-transform: uppercase;
    }
	.k-pager-wrap
    {
        border-top: 0;
    }
    .k-listview:after
    {
        content: ".";
        display: block;
        height: 0;
        clear: both;
        visibility: hidden;
    }
	.k-listview
    {
        padding: 0;
        min-width: 690px;
        min-height: 360px;
    }
</style>

<?php require_once '../../include/footer.php'; ?>
