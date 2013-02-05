<?php
require_once '../../lib/DataSourceResult.php';
require_once '../../lib/Kendo/Autoload.php';

require_once '../../include/header.php';

$result = new DataSourceResult('sqlite:../../sample.db');

$data = $result->read('Products', array('ProductName', 'UnitPrice', 'UnitsInStock', 'Discontinued'));


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
      ->addField($unitsInStockField)
      ->addField($discontinuedField);

$schema = new \Kendo\Data\DataSourceSchema();
$schema->data('data')
       ->model($model)
       ->total('total');

$dataSource = new \Kendo\Data\DataSource();

$dataSource->data($data)
           ->pageSize(20)
           ->schema($schema);

$grid = new \Kendo\UI\Grid('grid');

$productName = new \Kendo\UI\GridColumn();
$productName->field('ProductName')
            ->title('Product Name');

$unitPrice = new \Kendo\UI\GridColumn();
$unitPrice->field('UnitPrice')
          ->width('130px')
          ->format('{0:c}')
          ->title('Unit Price');

$unitsInStock = new \Kendo\UI\GridColumn();
$unitsInStock->field('UnitsInStock')
          ->width('130px')
          ->title('Units In Stock');

$discontinued = new \Kendo\UI\GridColumn();
$discontinued->field('Discontinued')
          ->width('130px');

$pageable = new \Kendo\UI\GridPageable();
$pageable->input(true)
        ->numeric(false);

$grid->addColumn($productName)
     ->addColumn($unitPrice)
     ->addColumn($unitsInStock)
     ->addColumn($discontinued)
     ->dataSource($dataSource)
     ->height(430)
     ->sortable(true)
     ->filterable(true)
     ->pageable($pageable);

echo $grid->render();
?>

<?php require_once '../../include/footer.php'; ?>
