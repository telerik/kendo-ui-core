<?php
require_once '../lib/DataSourceResult.php';
require_once '../lib/Kendo/Autoload.php';

$result = new DataSourceResult('sqlite:..//sample.db');

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    header('Content-Type: application/json');

    $request = json_decode(file_get_contents('php://input'));

    $type = $_GET['type'];

    $columns = array('ProductID', 'ProductName', 'UnitPrice', 'CategoryID');

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
        case 'categories':
            $result = $result->read('Categories', array('CategoryID', 'CategoryName'));
            break;
    }

    if ($type != 'categories') {
        $categories = new DataSourceResult('sqlite:..//sample.db');

        $categories = $categories->read('Categories', array('CategoryID', 'CategoryName'));

        $data = &$result['data'];

        for ($index = 0, $count = count($data); $index < $count; $index++) {
            $categoryId = $data[$index]['CategoryID'];

            foreach ($categories['data'] as $category) {
                if ($category['CategoryID'] == $categoryId) {
                    $data[$index]['Category'] = $category;
                    break;
                }
            }
        }
    }

    echo json_encode($result);

    exit;
}

require_once '../include/header.php';

$transport = new \Kendo\Data\DataSourceTransport();

$create = new \Kendo\Data\DataSourceTransportCreate();

$create->url('editing-custom.php?type=create')
     ->contentType('application/json')
     ->type('POST');

$read = new \Kendo\Data\DataSourceTransportRead();

$read->url('editing-custom.php?type=read')
     ->contentType('application/json')
     ->type('POST');

$update = new \Kendo\Data\DataSourceTransportUpdate();

$update->url('editing-custom.php?type=update')
     ->contentType('application/json')
     ->type('POST');

$destroy = new \Kendo\Data\DataSourceTransportDestroy();

$destroy->url('editing-custom.php?type=destroy')
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

$categoryField = new \Kendo\Data\DataSourceSchemaModelField('Category');
$categoryField->defaultValue(array('CategoryID' => 1, 'CategoryName' => 'Beverages'));

$model->id('ProductID')
    ->addField($productIDField)
    ->addField($productNameField)
    ->addField($unitPriceField)
    ->addField($categoryField);

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

$category = new \Kendo\UI\GridColumn();
$category->field('Category')
         ->title('Category')
         ->template('#=Category.CategoryName#')
         ->editor('categoryDropDownEditor')
         ->width(180);

$command = new \Kendo\UI\GridColumn();
$command->addCommandItem('destroy')
        ->title('&nbsp;')
        ->width(110);

$grid->addColumn($productName, $category, $unitPrice, $command)
     ->dataSource($dataSource)
     ->addToolbarItem(new \Kendo\UI\GridToolbarItem('create'),
        new \Kendo\UI\GridToolbarItem('save'), new \Kendo\UI\GridToolbarItem('cancel'))
     ->height(400)
     ->navigatable(true)
     ->editable(true)
     ->groupable(true)
     ->save('save')
     ->pageable(true);

echo $grid->render();
?>

<script>
function save(e) {
    if (e.values.Category) {
        e.model.set("CategoryID", e.values.Category.CategoryID);
    }
}
function categoryDropDownEditor(container, options) {
    $('<input data-text-field="CategoryName" data-value-field="CategoryID" data-bind="value:' + options.field + '"/>')
        .appendTo(container)
        .kendoDropDownList({
            autoBind: false,
            dataSource: {
                schema: {
                    data: "data"
                },
                transport: {
                    read: {
                        url: "editing-custom.php?type=categories",
                        type: "POST",
                        dataType: "json"
                    }
                }
            }
        });
    }
</script>

<?php require_once '../include/footer.php'; ?>
