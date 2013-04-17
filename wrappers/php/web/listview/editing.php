<?php

require_once '../../lib/DataSourceResult.php';
require_once '../../lib/Kendo/Autoload.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    header('Content-Type: application/json');

    $request = json_decode(file_get_contents('php://input'));

    $result = new DataSourceResult('sqlite:../../sample.db');

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

    echo json_encode($result, JSON_NUMERIC_CHECK);

    exit;
}

require_once '../../include/header.php';

?>

    <script type="text/x-kendo-tmpl" id="template">
        <div class="product-view k-widget">
            <div class="edit-buttons">
                <a class="k-button k-button-icontext k-edit-button" href="\\#"><span class="k-icon k-edit"></span></a>
                <a class="k-button k-button-icontext k-delete-button" href="\\#"><span class="k-icon k-delete"></span></a>
            </div>
            <dl>
                <dt>Product Name</dt>
                <dd>#:ProductName#</dd>
                <dt>Unit Price</dt>
                <dd>#:kendo.toString(UnitPrice, "c")#</dd>
                <dt>Units In Stock</dt>
                <dd>#:UnitsInStock#</dd>
                <dt>Discontinued</dt>
                <dd>#:Discontinued#</dd>
            </dl>
        </div>
    </script>

    <script type="text/x-kendo-tmpl" id="editTemplate">
        <div class="product-view k-widget">
            <div class="edit-buttons">
                <a class="k-button k-button-icontext k-update-button" href="\\#"><span class="k-icon k-update"></span></a>
                <a class="k-button k-button-icontext k-cancel-button" href="\\#"><span class="k-icon k-cancel"></span></a>
            </div>
            <dl>
                <dt>Product Name</dt>
                <dd>
                    <input type="text" class="k-textbox" data-bind="value:ProductName" name="ProductName" required="required" validationMessage="required" />
                    <span data-for="ProductName" class="k-invalid-msg"></span>
                </dd>
                <dt>Unit Price</dt>
                <dd>
                    <input type="text" data-bind="value:UnitPrice" data-role="numerictextbox" data-type="number" name="UnitPrice" required="required" min="1" validationMessage="required" />
                    <span data-for="UnitPrice" class="k-invalid-msg"></span>
                </dd>
                <dt>Units In Stock</dt>
                <dd>
                    <input type="text" data-bind="value:UnitsInStock" data-role="numerictextbox" name="UnitsInStock" required="required" data-type="number" min="0" validationMessage="required" />
                    <span data-for="UnitsInStock" class="k-invalid-msg"></span>
                </dd>
                <dt>Discontinued</dt>
                <dd><input type="checkbox" name="Discontinued" data-bind="checked:Discontinued"></dd>
            </dl>
        </div>
    </script>

<div class="demo-section">
    <a class="k-button k-button-icontext k-add-button" href="#"><span class="k-icon k-add"></span>Add new record</a>
</div>

<div class="demo-section">
<?php

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
    $productNameField->type('string');

    $unitPriceField = new \Kendo\Data\DataSourceSchemaModelField('UnitPrice');
    $unitPriceField->type('number');

    $unitsInStockField = new \Kendo\Data\DataSourceSchemaModelField('UnitsInStock');
    $unitsInStockField->type('number');

    $discontinuedField = new \Kendo\Data\DataSourceSchemaModelField('Discontinued');
    $discontinuedField ->type('boolean');

    $model->id('ProductID')
          ->addField($productIDField)
          ->addField($productNameField)
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
               ->batch(true)
               ->schema($schema)
               ->pageSize(4);

    $listview = new \Kendo\UI\ListView('listView');
    $listview->dataSource($dataSource)
             ->templateId('template')
             ->editTemplateId('editTemplate')
             ->pageable(true);

    echo $listview->render();
?>
</div>

<script>
    $(function() {
        $(".k-add-button").click(function(e) {
            var listView = $("#listView").data("kendoListView");

            listView.add();
            e.preventDefault();
        });
    });
</script>

 <style scoped>
        .demo-section {
            width: 605px;
        }
        .product-view
        {
            float: left;
            position: relative;
            width: 301px;
            margin: -1px -1px 0 0;
        }

        .product-view dl
        {
            margin: 10px 0;
            padding: 0;
            min-width: 0;
        }
        .product-view dt, dd
        {
            float: left;
            margin: 0;
            padding: 3px;
            height: 26px;
            width: 160px;
            line-height: 26px;
            overflow: hidden;
        }
        .product-view dt
        {
            clear: left;
            padding: 3px 5px 3px 0;
            text-align: right;
        opacity: 0.6;
        width: 100px;
    }
    .k-listview
    {
        border: 0;
        padding: 0;
        min-width: 605px;
        min-height: 298px;
    }
    .k-listview:after, .product-view dl:after
    {
        content: ".";
        display: block;
        height: 0;
        clear: both;
        visibility: hidden;
    }
    .edit-buttons
    {
        position: absolute;
        top: 0;
        right: 0;
        width: 26px;
        height: 146px;
        padding: 2px 2px 0 3px;
        background-color: rgba(0,0,0,0.1);
    }
    .edit-buttons .k-button
    {
        width: 26px;
        margin-bottom: 1px;
    }
    .k-pager-wrap
    {
        border-top: 0;
    }
    span.k-invalid-msg
    {
        position: absolute;
        margin-left: 6px;
    }
</style>

<?php require_once '../../include/footer.php'; ?>
