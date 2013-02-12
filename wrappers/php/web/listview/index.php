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
        <p>#:kendo.toString(UnitPrice, "c")#</p>
    </div>
</script>

<?php

    $transport = new \Kendo\Data\DataSourceTransport();

    $read = new \Kendo\Data\DataSourceTransportRead();

    $read->url('index.php')
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
               ->pageSize(15);

    $listview = new \Kendo\UI\ListView('listView');
    $listview->dataSource($dataSource)
             ->templateId('template')
             ->pageable(true);

    echo $listview->render();
?>

<style scoped>
    #listView {
        min-height: 610px;
    }

    .product {
        float: left;
        position: relative;
        width: 110px;
        height: 160px;
        margin: 10px;
        padding: 7px 7px 0 7px;
        -moz-box-shadow: 0 1px 2px 0 rgba(0,0,0,0.2);
        -webkit-box-shadow: 0 1px 2px 0 rgba(0,0,0,0.2);
        box-shadow: 0 1px 2px 0 rgba(0,0,0,0.2);
        background-color: rgba(255,255,255,0.8)
    }

    .product img {
        width: 110px;
        height: 110px;
    }

    .product h3 {
        margin: 0;
        padding: 0;
        line-height: 1.1em;
        font-size: .9em;
        font-weight: normal;
        text-transform: uppercase;
        color: #777;
    }

    .product p {
        visibility: hidden;
    }

    .product:hover p {
        visibility: visible;
        position: absolute;
        width: 100px;
        height: 34px;
        top: 77px;
        margin: 0;
        padding: 3px 5px;
        line-height: 34px;
        vertical-align: middle;
        text-align: center;
        color: #fff;
        background-color: rgba(0,0,0,0.65);
        transition: background .2s linear, color .2s linear;
        -moz-transition: background .2s linear, color .2s linear;
        -webkit-transition: background .2s linear, color .2s linear;
        -o-transition: background .2s linear, color .2s linear;
    }

    .k-listview:after, .product dl:after {
        content: ".";
        display: block;
        height: 0;
        clear: both;
        visibility: hidden;
    }

    .k-listview {
        border: 0;
        padding: 0 0 20px 0;
        min-width: 0;
    }
</style>

<?php require_once '../../include/footer.php'; ?>
