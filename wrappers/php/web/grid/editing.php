<?php
require_once '../../lib/DataSourceResult.php';
require_once '../../lib/Kendo/Autoload.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    header('Content-Type: application/json');

    $request = json_decode(file_get_contents('php://input'));

    $result = new DataSourceResult('sqlite:../../northwind.db');

    $type = $_GET['type'];

    $columns = array('ProductID', 'ProductName', 'UnitPrice', 'UnitsInStock', 'Discontinued');

    switch($type) {
        case 'create':
            $result = $result->create('Products', $columns, $request->models, 'ProductID');
            break;
        case 'read':
            $result = $result->read('Products', $columns, $request);
            break;
        case 'update':
            $result = $result->update('Products', $columns, $request->models, 'ProductID');
            break;
        case 'destroy':
            $result = $result->destroy('Products', $request->models, 'ProductID');
            break;
    }

    echo json_encode($result);

    exit;
}

require_once '../../include/header.php';

$transport = new \Kendo\Data\DataSourceTransport();

$create = new \Kendo\Data\DataSourceTransportCreate();

$create->url('editing.php?type=create')
     ->contentType('application/json')
     ->type('POST');

$read = new \Kendo\Data\DataSourceTransportRead();

$read->url('editing.php?type=read')
     ->contentType('application/json')
     ->type('POST');

$update = new \Kendo\Data\DataSourceTransportUpdate();

$update->url('editing.php?type=update')
     ->contentType('application/json')
     ->type('POST');

$destroy = new \Kendo\Data\DataSourceTransportDestroy();

$destroy->url('editing.php?type=destroy')
     ->contentType('application/json')
     ->type('POST');

$transport->create($create)
          ->read($read)
          ->update($update)
          ->destroy($destroy)
          ->parameterMap('function(data) {
              return kendo.stringify(data);
          }');

$model = new \Kendo\Data\DataSourceSchemaModel();

$productIDField = new \Kendo\Data\DataSourceSchemaModelField('ProductID');
$productIDField->type('number')
               ->editable(false)
               ->nullable(true);

$productNameField = new \Kendo\Data\DataSourceSchemaModelField('ProductName');
$productNameField->type('string')
                 ->validation(array('required' => true));


$unitPriceValidation = new \Kendo\Data\DataSourceSchemaModelFieldValidation();
$unitPriceValidation->required(true)
                    ->min(1);

$unitPriceField = new \Kendo\Data\DataSourceSchemaModelField('UnitPrice');
$unitPriceField->type('number')
               ->validation($unitPriceValidation);

$unitsInStockField = new \Kendo\Data\DataSourceSchemaModelField('UnitsInStock');
$unitsInStockField->type('number');

$discontinuedField = new \Kendo\Data\DataSourceSchemaModelField('Discontinued');
$discontinuedField->type('boolean')
                  ->validation(array('required' => true, 'min' => 0));

$model->id('ProductID')
      ->addField($productIDField, $productNameField, $unitPriceField, $unitsInStockField, $discontinuedField);

$schema = new \Kendo\Data\DataSourceSchema();
$schema->data('data')
       ->errors('errors')
       ->model($model)
       ->total('total');

$dataSource = new \Kendo\Data\DataSource();

$dataSource->transport($transport)
           ->batch(true)
           ->pageSize(30)
           ->schema($schema);

$grid = new \Kendo\UI\Grid('grid');

$productName = new \Kendo\UI\GridColumn();
$productName->field('ProductName')
            ->title('Product Name');

$unitPrice = new \Kendo\UI\GridColumn();
$unitPrice->field('UnitPrice')
          ->format('{0:c}')
          ->width(150)
          ->title('Unit Price');

$unitsInStock = new \Kendo\UI\GridColumn();
$unitsInStock->field('UnitsInStock')
          ->width(150)
          ->title('Units In Stock');

$discontinued = new \Kendo\UI\GridColumn();
$discontinued->field('Discontinued')
          ->width(100);

$command = new \Kendo\UI\GridColumn();
$command->addCommandItem('destroy')
        ->title('&nbsp;')
        ->width(110);

$grid->addColumn($productName, $unitPrice, $unitsInStock, $discontinued, $command)
     ->dataSource($dataSource)
     ->addToolbarItem(new \Kendo\UI\GridToolbarItem('create'),
        new \Kendo\UI\GridToolbarItem('save'), new \Kendo\UI\GridToolbarItem('cancel'))
     ->height(400)
     ->navigatable(true)
     ->editable(true)
     ->pageable(true);

echo $grid->render();
?>

<?php require_once '../../include/footer.php'; ?>
