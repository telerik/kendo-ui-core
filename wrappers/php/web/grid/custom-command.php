<?php
require_once '../../lib/DataSourceResult.php';
require_once '../../lib/Kendo/Autoload.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    header('Content-Type: application/json');

    $request = json_decode(file_get_contents('php://input'));

    $result = new DataSourceResult('sqlite:../../sample.db');

    echo json_encode($result->read('Employees', array('EmployeeID', 'FirstName', 'LastName', 'City', 'Title', 'Address'), $request));

    exit;
}

require_once '../../include/header.php';

$transport = new \Kendo\Data\DataSourceTransport();

$read = new \Kendo\Data\DataSourceTransportRead();

$read->url('custom-command.php')
     ->contentType('application/json')
     ->type('POST');

$transport->read($read)
          ->parameterMap('function(data) {
              return kendo.stringify(data);
          }');

$model = new \Kendo\Data\DataSourceSchemaModel();

$schema = new \Kendo\Data\DataSourceSchema();
$schema->data('data')
       ->total('total');

$dataSource = new \Kendo\Data\DataSource();

$dataSource->transport($transport)
           ->pageSize(10)
           ->schema($schema)
           ->serverPaging(true);

$grid = new \Kendo\UI\Grid('grid');

$firstName = new \Kendo\UI\GridColumn();
$firstName->field('FirstName')
    ->title('First Name');

$lastName = new \Kendo\UI\GridColumn();
$lastName->field('LastName')
    ->title('Last Name');

$title = new \Kendo\UI\GridColumn();
$title->field('Title');

$command = new \Kendo\UI\GridColumnCommandItem();
$command->click('commandClick')
        ->text('View Details');

$commandColumn = new \Kendo\UI\GridColumn();
$commandColumn->addCommandItem($command)
        ->title('&nbsp;')
        ->width(140);

$grid->addColumn($firstName, $lastName, $title, $commandColumn)
     ->dataSource($dataSource)
     ->height(260)
     ->pageable(true);

echo $grid->render();

$window = new \Kendo\UI\Window('details');
$window->title('Customer Details')
    ->modal(true)
    ->visible(false)
    ->resizable(false)
    ->width(300);

echo $window->render();
?>

<script type="text/x-kendo-template" id="template">
    <div id="details-container">
        <h2>#= FirstName # #= LastName #</h2>
        <em>#= Title #</em>
        <dl>
            <dt>City: #= City #</dt>
            <dt>Address: #= Address #</dt>
        </dl>
    </div>
</script>

<script>
    var detailsTemplate = kendo.template($("#template").html());

    function commandClick(e) {
        e.preventDefault();

        var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
        var wnd = $("#details").data("kendoWindow");

        wnd.content(detailsTemplate(dataItem));
        wnd.center().open();
    }
</script>
<?php require_once '../../include/footer.php'; ?>
