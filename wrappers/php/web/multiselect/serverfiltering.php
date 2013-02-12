<?php

require_once '../../lib/DataSourceResult.php';
require_once '../../lib/Kendo/Autoload.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    header('Content-Type: application/json');

    $request = json_decode(file_get_contents('php://input'));

    $result = new DataSourceResult('sqlite:../../sample.db');

    echo json_encode($result->read('Products', array('ProductID', 'ProductName'), $request));

    exit;
}

require_once '../../include/header.php';

$transport = new \Kendo\Data\DataSourceTransport();

$read = new \Kendo\Data\DataSourceTransportRead();

$read->url('serverfiltering.php')
     ->contentType('application/json')
     ->type('POST');

$transport->read($read)
          ->parameterMap('function(data) {
              return kendo.stringify(data);
           }');

$schema = new \Kendo\Data\DataSourceSchema();
$schema->data('data')
       ->total('total');

$dataSource = new \Kendo\Data\DataSource();

$dataSource->transport($transport)
           ->schema($schema)
           ->serverFiltering(true);

$multiselect = new \Kendo\UI\MultiSelect('products');

$multiselect->dataSource($dataSource)
            ->dataTextField('ProductName')
            ->dataValueField('ProductID')
            ->filter('contains')
            ->ignoreCase(false);

?>
<div class="demo-section" style="width: 250px;">
    <label for="products">Select product:</label>

<?php
echo $multiselect->render();
?>
</div>
<?php require_once '../../include/footer.php'; ?>
