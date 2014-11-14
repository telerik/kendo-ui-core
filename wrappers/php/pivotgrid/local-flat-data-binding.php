<?php
require_once '../lib/DataSourceResult.php';
require_once '../lib/Kendo/Autoload.php';

require_once '../include/header.php';

$db = new PDO('sqlite:..//sample.db');
$statement = $db->prepare("SELECT p.ProductName, p.UnitPrice, p.Discontinued, c.CategoryName FROM Products as p JOIN Categories c ON c.CategoryID = p.CategoryID");
$statement->execute();
$data = $statement->fetchAll(PDO::FETCH_ASSOC);

$model = new \Kendo\Data\DataSourceSchemaModel();
$productNameField = new \Kendo\Data\DataSourceSchemaModelField('ProductName');
$productNameField->type('string');

$unitPriceField = new \Kendo\Data\DataSourceSchemaModelField('UnitPrice');
$unitPriceField->type('number');

$discontinuedField = new \Kendo\Data\DataSourceSchemaModelField('Discontinued');
$discontinuedField->type('boolean');

$model->addField($productNameField)
      ->addField($unitPriceField)
      ->addField($discontinuedField);

$productNameDimension = new \Kendo\Data\PivotDataSourceSchemaCubeDimension('ProductName');
$productNameDimension->caption('All Products');

$categoryNameDimension = new \Kendo\Data\PivotDataSourceSchemaCubeDimension('CategoryName');
$categoryNameDimension->caption('All Categories');

$discontinuedDimension = new \Kendo\Data\PivotDataSourceSchemaCubeDimension('Discontinued');
$discontinuedDimension->caption('Discontinued');

$sumMeasure = new \Kendo\Data\PivotDataSourceSchemaCubeMeasure('Sum');
$sumMeasure->format('{0:c}')
            ->field('UnitPrice')
            ->aggregateName('sum');

$averageMeasure = new \Kendo\Data\PivotDataSourceSchemaCubeMeasure('Average');
$averageMeasure->format('{0:c}')
            ->field('UnitPrice')
            ->aggregateName('average');

$cube = new \Kendo\Data\PivotDataSourceSchemaCube();
$cube->addDimension($productNameDimension)
    ->addDimension($categoryNameDimension)
    ->addDimension($discontinuedDimension)
    ->addMeasure($sumMeasure)
    ->addMeasure($averageMeasure);

$schema = new \Kendo\Data\PivotDataSourceSchema();
$schema->model($model)
       ->cube($cube);

$categoryColumn = new \Kendo\Data\PivotDataSourceColumn();
$categoryColumn->name('CategoryName')
            ->expand(true);

$productNameColumn = new \Kendo\Data\PivotDataSourceColumn();
$productNameColumn->name('ProductName');

$discontinuedRow = new \Kendo\Data\PivotDataSourceRow();
$discontinuedRow->name('Discontinued')
                ->expand(true);

$dataSource = new \Kendo\Data\PivotDataSource();

$dataSource ->addColumn($categoryColumn, $productNameColumn)
            ->addRow($discontinuedRow)
            ->addMeasure('Sum')
            ->data($data)
            ->schema($schema);

$pivotgrid = new \Kendo\UI\PivotGrid('pivotgrid');
$pivotgrid->dataSource($dataSource)
    ->configurator("#configurator")
    ->columnWidth(120)
    ->height(570);

$configurator = new \Kendo\UI\PivotConfigurator('configurator');
$configurator->height(570);
?>

<?php
echo $configurator->render();
echo $pivotgrid->render();
?>

<style>
    #pivotgrid
    {
        display: inline-block;
        vertical-align: top;
        width: 60%;
    }

    #configurator
    {
        display: inline-block;
        vertical-align: top;
    }
</style>
<?php require_once '../include/footer.php'; ?>
