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

    echo json_encode($result);

    exit;
}

require_once '../../include/header.php';

?>

<script type="text/x-kendo-tmpl" id="template">
    <div class="product-view">
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
        <div class="edit-buttons">
            <a class="k-button k-button-icontext k-edit-button" href="\\#"><span class="k-icon k-edit"></span>Edit</a>
            <a class="k-button k-button-icontext k-delete-button" href="\\#"><span class="k-icon k-delete"></span>Delete</a>
        </div>
    </div>
</script>

<script type="text/x-kendo-tmpl" id="editTemplate">
    <div class="product-view">
        <dl>
            <dt>Product Name</dt>
            <dd>
                <input type="text" data-bind="value:ProductName" name="ProductName" required="required" validationMessage="required" />
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
        <div class="edit-buttons">
            <a class="k-button k-button-icontext k-update-button" href="\\#"><span class="k-icon k-update"></span>Save</a>
            <a class="k-button k-button-icontext k-cancel-button" href="\\#"><span class="k-icon k-cancel"></span>Cancel</a>
        </div>
    </div>
</script>

<div class="k-toolbar k-grid-toolbar">
    <a class="k-button k-button-icontext k-add-button" href="#"><span class="k-icon k-add"></span>Add new record</a>
</div>

<?php

    $transport = new \Kendo\Data\DataSourceTransport();

    $create = new \Kendo\Data\DataSourceTransportCreate();

    $create->url('navigation.php?type=create')
         ->contentType('application/json')
         ->type('POST');

    $read = new \Kendo\Data\DataSourceTransportRead();

    $read->url('navigation.php?type=read')
         ->contentType('application/json')
         ->type('POST');

    $update = new \Kendo\Data\DataSourceTransportUpdate();

    $update->url('navigation.php?type=update')
         ->contentType('application/json')
         ->type('POST');

    $destroy = new \Kendo\Data\DataSourceTransportDestroy();

    $destroy->url('navigation.php?type=destroy')
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
             ->selectable(true)
             ->navigatable(true)
             ->pageable(true);

    echo $listview->render();
?>

<script>
    $(function() {
        $(".k-add-button").click(function(e) {
            var listView = $("#listView").data("kendoListView");

            listView.add();
            e.preventDefault();
        });

        $(document.body).keydown(function(e) {
            if (e.altKey && e.keyCode == 87) {
                $("#listView").focus();
            }
        });
    });
</script>

<ul class="keyboard-legend" style="padding-top: 25px">
    <li>
        <span class="button-preview">
            <span class="key-button leftAlign">Alt</span>
            +
            <span class="key-button">W</span>
        </span>
        <span class="button-descr">
            Focus the ListView
        </span>
    </li>
</ul>

<h4>Supported keys and user actions</h4>
<ul class="keyboard-legend">
    <li>
        <span class="button-preview">
            <span class="key-button">Right</span>
        </span>
        <span class="button-descr">
            Goes to the next item (same as Down)
        </span>
    </li>
    <li>
        <span class="button-preview">
            <span class="key-button">Left</span>
        </span>
        <span class="button-descr">
            Goes to the previous item (same as Up)
        </span>
    </li>
    <li>
        <span class="button-preview">
            <span class="key-button">Home</span>
        </span>
        <span class="button-descr">
            Goes to the first item
        </span>
    </li>
    <li>
        <span class="button-preview">
            <span class="key-button">End</span>
        </span>
        <span class="button-descr">
            Goes to the last item
        </span>
    </li>
    <li>
        <span class="button-preview">
            <span class="key-button">Enter</span>
        </span>
        <span class="button-descr">
            Enter Edit mode or Apply changes
        </span>
    </li>
    <li>
        <span class="button-preview">
            <span class="key-button">Esc</span>
        </span>
        <span class="button-descr">
            Exit Edit mode and Cancel changes
        </span>
    </li>
    <li>
        <span class="button-preview">
            <span class="key-button">Tab</span>
        </span>
        <span class="button-descr">
            Tabs away from the ListView on the next focusable page element
        </span>
    </li>
    <li>
        <span class="button-preview">
            <span class="key-button leftAlign">Shift</span>
            +
            <span class="key-button">Tab</span>
        </span>
        <span class="button-descr">
            Tabs away from the ListView on the previous focusable page element
        </span>
    </li>
    <li>
        <span class="button-preview">
            <span class="key-button">Space</span>
        </span>
        <span class="button-descr">
            Select item
        </span>
    </li>
</ul>


<style scoped>
    .product-view
    {
        float: left;
        width: 320px;
        margin: 5px;
        padding: 3px;
        -moz-box-shadow: inset 0 0 50px rgba(0,0,0,0.1);
        -webkit-box-shadow: inset 0 0 50px rgba(0,0,0,0.1);
        box-shadow: inset 0 0 50px rgba(0,0,0,0.1);
        border-top: 1px solid rgba(0,0,0,0.1);
        -webkit-border-radius: 8px;
        -moz-border-radius: 8px;
        border-radius: 8px;
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
        padding: 0;
        height: 30px;
        line-height: 30px;
    }
    .product-view dt
    {
        clear: left;
        padding: 0 5px 0 15px;
        text-align: right;
        opacity: 0.6;
        width: 100px;
    }
    .k-listview
    {
        border: 0;
        padding: 0;
        min-width: 0;
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
        text-align: right;
        padding: 5px;
        min-width: 100px;
        border-top: 1px solid rgba(0,0,0,0.1);
        -webkit-border-radius: 8px;
        -moz-border-radius: 8px;
        border-radius: 8px;
    }

    .k-toolbar, #listView, .k-pager-wrap
    {
        width: 660px;
        margin: 0 auto;
        -webkit-border-radius: 11px;
        -moz-border-radius: 11px;
        border-radius: 11px;
    }
    #listView
    {
        width: 674px;
    }
    span.k-invalid-msg
    {
        position: absolute;
        margin-left: 160px;
        margin-top: -26px;
    }
</style>

<?php require_once '../../include/footer.php'; ?>
