<?php

require_once '../../lib/DataSourceResult.php';
require_once '../../lib/Kendo/Autoload.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    header('Content-Type: application/json');

    $request = json_decode(file_get_contents('php://input'));

    $result = new DataSourceResult('sqlite:../../sample.db');

    $type = $_GET['type'];

    switch($type) {
        case 'categories':
            $result = $result->read('Categories', array('CategoryID', 'CategoryName'), $request);
            break;
        case 'products':
            $result = $result->read('Products', array('ProductID', 'ProductName', 'CategoryID'), $request);
            break;
        case 'orders':
            $result = $result->read('[Order Details]', array('OrderID', 'ProductID', 'Quantity'), $request);
            break;
    }

    echo json_encode($result);

    exit;
}

require_once '../../include/header.php';

$transport = new \Kendo\Data\DataSourceTransport();

$read = new \Kendo\Data\DataSourceTransportRead();

$read->url('cascadingcombobox.php?type=categories')
     ->contentType('application/json')
     ->type('POST');

$transport->read($read)
          ->parameterMap('function(data) {
              return kendo.stringify(data);
           }');

$schema = new \Kendo\Data\DataSourceSchema();
$schema->data('data')
       ->total('total');

?>
<div class="demo-section">
    <h2>View Order Details</h2>
    <p>
        <label for="categories">Categories:</label>
<?php
$categories = new \Kendo\UI\ComboBox('categories');
$categories->dataSource(array('transport' => $transport, 'schema' => $schema, 'serverFiltering' => true))
           ->dataTextField('CategoryName')
           ->dataValueField('CategoryID')
           ->attr('style', 'width:300px')
           ->filter('contains')
           ->placeholder('Select category ...');

echo $categories->render();
?>
    </p>
    <p>
        <label for="products">Products:</label>
<?php

$read->url('cascadingcombobox.php?type=products');
$transport->read($read);

$products = new \Kendo\UI\ComboBox('products');
$products->dataSource(array('transport' => $transport, 'schema' => $schema, 'serverFiltering' => true))
         ->autoBind(false)
         ->cascadeFrom('categories')
         ->dataTextField('ProductName')
         ->dataValueField('ProductID')
         ->attr('style', 'width:300px')
         ->filter('contains')
         ->placeholder('Select product ...');

echo $products->render();
?>
    </p>
    <p>
        <label for="orders">Orders:</label>
<?php

$read->url('cascadingcombobox.php?type=orders');
$transport->read($read);

$products = new \Kendo\UI\ComboBox('orders');
$products->dataSource(array('transport' => $transport, 'schema' => $schema, 'serverFiltering' => true))
         ->autoBind(false)
         ->cascadeFrom('products')
         ->dataTextField('OrderID')
         ->dataValueField('OrderID')
         ->attr('style', 'width:300px')
         ->filter('contains')
         ->placeholder('Select order ...');

echo $products->render();
?>
    </p>
    <button class="k-button" id="get">View Order</button>
</div>
<script>
    $(document).ready(function () {
        var categories = $("#categories").data("kendoComboBox"),
            products = $("#products").data("kendoComboBox"),
            orders = $("#orders").data("kendoComboBox");

        $("#get").click(function () {
            var categoryInfo = "\nCategory: { id: " + categories.value() + ", name: " + categories.text() + " }",
                productInfo = "\nProduct: { id: " + products.value() + ", name: " + products.text() + " }",
                orderInfo = "\nOrder: { id: " + orders.value() + ", name: " + orders.text() + " }";

            alert("Order details:\n" + categoryInfo + productInfo + orderInfo);
        });
    });
</script>
<style scoped>
    .demo-section {
        width: 460px;
        padding: 30px;
    }
    .demo-section h2 {
        text-transform: uppercase;
        font-size: 1.2em;
        margin-bottom: 30px;
    }
    .demo-section label {
        display: inline-block;
        width: 120px;
        padding-right: 5px;
        text-align: right;
    }
    .demo-section .k-button {
        margin: 20px 0 0 125px;
    }
    .k-readonly
    {
        color: gray;
    }
</style>
<?php require_once '../../include/footer.php'; ?>
