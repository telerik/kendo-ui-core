<?php

require_once '../../lib/DataSourceResult.php';
require_once '../../lib/Kendo/Autoload.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    header('Content-Type: application/json');

    $result = new DataSourceResult('sqlite:../../northwind.db');

    echo json_encode($result->read('SELECT ProductName from Products'));

    exit;
}

require_once '../../include/header.php';

$transport = new \Kendo\Data\DataSourceTransport();

$read = new \Kendo\Data\DataSourceTransportRead();

$read->url('serverfiltering.php')
     ->contentType('application/json')
     ->type('POST');

$transport->read($read);

$schema  = new \Kendo\Data\DataSourceSchema();
$schema->data('data')
       ->total('total');

$dataSource = new \Kendo\Data\DataSource();

$dataSource->transport($transport)
           ->schema($schema)
           ->serverFiltering(false);

$autoComplete = new \Kendo\UI\AutoComplete('products');

$autoComplete->dataSource($dataSource)
             ->dataTextField('ProductName')
             ->ignoreCase(false);

echo $autoComplete->render();
?>
<div>
    <label for="products">Choose product:</label>
</div>
<style scoped="scoped">
    .k-autocomplete
    {
        width: 250px;
    }
</style>
<?php require_once '../../include/footer.php'; ?>
