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

<div class="k-rtl">

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
    .product
    {
        float: right;
        width: 270px;
        height: 110px;
        margin: 5px;
        padding: 5px;
        -moz-box-shadow: inset 0 0 30px rgba(0,0,0,0.15);
        -webkit-box-shadow: inset 0 0 30px rgba(0,0,0,0.15);
        box-shadow: inset 0 0 30px rgba(0,0,0,0.15);
        -webkit-border-radius: 15px;
        -moz-border-radius: 15px;
        border-radius: 15px;
        background-image: none;
        cursor: pointer;
    }
    .product img
    {
        float: right;
        width: 110px;
        height: 110px;
        -webkit-border-radius: 10px;
        -moz-border-radius: 10px;
        border-radius: 10px;
    }
    .product h3
    {
        margin: 10px 0 0 0;
        padding: 10px 20px 10px 10px;
        font-size: 1em;
        float: right;
        max-width: 120px;
        text-transform: uppercase;
    }
    .k-state-selected h3
    {
        color: #fff;
        background-color: rgba(0,0,0,0.4);
        -moz-box-shadow: inset 0 0 20px rgba(0,0,0,0.2);
        -webkit-box-shadow: inset 0 0 20px rgba(0,0,0,0.2);
        box-shadow: inset 0 0 20px rgba(0,0,0,0.2);
        -moz-border-radius-topright: 5px;
        -moz-border-radius-bottomright: 5px;
        -webkit-border-top-right-radius: 5px;
        -webkit-border-bottom-right-radius: 5px;
        border-top-right-radius: 5px;
        border-bottom-right-radius: 5px;
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
        border: 0;
        padding: 0 0 20px 0;
        min-width: 0;
    }
</style>

<?php require_once '../../include/footer.php'; ?>
