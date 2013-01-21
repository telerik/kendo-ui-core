<?php

if ($_SERVER['REQUEST_METHOD'] == 'POST' && $_SERVER['CONTENT_TYPE'] == 'application/json') {
    $db = new PDO('sqlite:../../northwind.db');
    $products = $db->query('SELECT ProductName from Products')->fetchAll();

    header('Content-Type: application/json');
    echo json_encode($products);
    exit;
}

?>
<?php require_once '../../include/header.php' ?>

<?php require_once '../../lib/Kendo/Autoload.php' ?>
<?php
    $transport = new \Kendo\Data\DataSourceTransport();

    $read = new \Kendo\Data\DataSourceTransportRead();

    $read->url('serverfiltering.php')
         ->contentType('application/json')
         ->type('POST');

    $transport->read($read);

    $dataSource = new \Kendo\Data\DataSource();

    $dataSource->transport($transport)
               ->serverFiltering(true);

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
<?php require_once '../../include/footer.php' ?>
