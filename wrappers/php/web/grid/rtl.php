<?php
require_once '../../lib/DataSourceResult.php';
require_once '../../lib/Kendo/Autoload.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    header('Content-Type: application/json');

    $request = json_decode(file_get_contents('php://input'));

    $result = new DataSourceResult('sqlite:../../sample.db');

    echo json_encode($result->read('Products', array('ProductName', 'UnitPrice', 'UnitsInStock', 'Discontinued'), $request));

    exit;
}

require_once '../../include/header.php';

$transport = new \Kendo\Data\DataSourceTransport();

$read = new \Kendo\Data\DataSourceTransportRead();

$read->url('rtl.php')
     ->contentType('application/json')
     ->type('POST');

$transport ->read($read)
          ->parameterMap('function(data) {
              return kendo.stringify(data);
          }');

$model = new \Kendo\Data\DataSourceSchemaModel();

$productNameField = new \Kendo\Data\DataSourceSchemaModelField('ProductName');
$productNameField->type('string');

$unitPriceField = new \Kendo\Data\DataSourceSchemaModelField('UnitPrice');
$unitPriceField->type('number');

$unitsInStockField = new \Kendo\Data\DataSourceSchemaModelField('UnitsInStock');
$unitsInStockField->type('number');

$discontinuedField = new \Kendo\Data\DataSourceSchemaModelField('Discontinued');
$discontinuedField->type('boolean');

$model->addField($productNameField)
      ->addField($unitPriceField)
      ->addField($discontinuedField)
      ->addField($unitsInStockField);

$schema = new \Kendo\Data\DataSourceSchema();
$schema->data('data')
       ->errors('errors')
       ->model($model)
       ->total('total');

$dataSource = new \Kendo\Data\DataSource();

$dataSource->transport($transport)
           ->pageSize(15)
           ->serverPaging(true)
           ->serverSorting(true)
           ->serverGrouping(true)
           ->schema($schema);

$grid = new \Kendo\UI\Grid('grid');

$productName = new \Kendo\UI\GridColumn();
$productName->field('ProductName')
            ->title('Product Name');

$unitPrice = new \Kendo\UI\GridColumn();
$unitPrice->field('UnitPrice')
          ->format('{0:c}')
          ->width(130)
          ->title('Unit Price');

$unitsInStock = new \Kendo\UI\GridColumn();
$unitsInStock->field('UnitsInStock')
          ->width(130)
          ->title('Units In Stock');

$discontinued = new \Kendo\UI\GridColumn();
$discontinued->field('Discontinued')
          ->width(130);

$grid->addColumn($productName, $unitPrice, $unitsInStock, $discontinued)
     ->dataSource($dataSource)
     ->height(430)
     ->sortable(true)
     ->resizable(true)
     ->pageable(true);
?>

<div class="k-rtl">
<?php
echo $grid->render();
?>
</div>

<?php require_once '../../include/footer.php'; ?>
