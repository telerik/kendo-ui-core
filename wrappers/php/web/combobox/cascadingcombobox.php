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
<p>
    <label for="categories">Categories:</label>
<?php
$categories = new \Kendo\UI\ComboBox('categories');
$categories->dataSource(array('transport' => $transport, 'schema' => $schema, 'serverFiltering' => true))
           ->dataTextField('CategoryName')
           ->dataValueField('CategoryID')
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
         ->placeholder('Select order ...');

echo $products->render();
?>
</p>
<?php require_once '../../include/footer.php'; ?>
