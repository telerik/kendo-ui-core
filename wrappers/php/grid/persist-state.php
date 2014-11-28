<?php
require_once '../lib/DataSourceResult.php';
require_once '../lib/Kendo/Autoload.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    header('Content-Type: application/json');

    $request = json_decode(file_get_contents('php://input'));

    $result = new DataSourceResult('sqlite:..//sample.db');

    echo json_encode($result->read('Customers', array('ContactName', 'ContactTitle', 'CompanyName', 'Country'), $request));

    exit;
}

require_once '../include/header.php';

$transport = new \Kendo\Data\DataSourceTransport();

$read = new \Kendo\Data\DataSourceTransportRead();

$read->url('index.php')
     ->contentType('application/json')
     ->type('POST');

$transport ->read($read)
          ->parameterMap('function(data) {
              return kendo.stringify(data);
          }');

$model = new \Kendo\Data\DataSourceSchemaModel();

$contactNameField = new \Kendo\Data\DataSourceSchemaModelField('ContactName');
$contactNameField->type('string');

$contactTitleField = new \Kendo\Data\DataSourceSchemaModelField('ContactTitle');
$contactTitleField->type('string');

$companyNameField = new \Kendo\Data\DataSourceSchemaModelField('CompanyName');
$companyNameField->type('string');

$countryField = new \Kendo\Data\DataSourceSchemaModelField('Country');
$countryField->type('string');

$model->addField($contactNameField)
      ->addField($contactTitleField)
      ->addField($companyNameField)
      ->addField($countryField);

$schema = new \Kendo\Data\DataSourceSchema();
$schema->data('data')
       ->errors('errors')
       ->groups('groups')
       ->model($model)
       ->total('total');

$dataSource = new \Kendo\Data\DataSource();

$dataSource->transport($transport)
           ->pageSize(20)
           ->serverPaging(true)
           ->serverSorting(true)
           ->serverGrouping(true)
           ->schema($schema);

$grid = new \Kendo\UI\Grid('grid');

$contactName = new \Kendo\UI\GridColumn();
$contactName->field('ContactName')
            ->title('Contact Name')
            ->locked(true)
            ->width(250);

$contactTitle = new \Kendo\UI\GridColumn();
$contactTitle->field('ContactTitle')
            ->title('Contact Title')
            ->width(350);

$companyName = new \Kendo\UI\GridColumn();
$companyName->field('CompanyName')
            ->width(350)
            ->title('Company Name');

$Country = new \Kendo\UI\GridColumn();
$Country->field('Country')
        ->width(420);

$pageable = new Kendo\UI\GridPageable();
$pageable->refresh(true)
      ->pageSizes(true)
      ->buttonCount(5);

$gridFilterable = new \Kendo\UI\GridFilterable();
$gridFilterable->mode("row");

$grid->addColumn($contactName, $contactTitle, $companyName, $Country)
     ->dataSource($dataSource)
     ->sortable(true)
     ->resizable(true)
     ->filterable($gridFilterable)
     ->columnMenu(true)
     ->groupable(true)
     ->pageable($pageable)
     ->attr('style', 'height:550px');

?>

<a href="#" class="k-button" id="save">Save State</a>
<a href="#" class="k-button" id="load">Load State</a>
<?php
echo $grid->render();
?>

<script>
    $(function() {
        var grid = $("#grid").data("kendoGrid");

        $("#save").click(function (e) {
            e.preventDefault();
            localStorage["kendo-grid-options"] = kendo.stringify(grid.getOptions());
        });

        $("#load").click(function (e) {
            e.preventDefault();
            var options = localStorage["kendo-grid-options"];
            if (options) {
                grid.setOptions(JSON.parse(options));
            }
        });
    });
</script>

<?php require_once '../include/footer.php'; ?>
