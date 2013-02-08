<?php
require_once '../../lib/DataSourceResult.php';
require_once '../../lib/Kendo/Autoload.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    header('Content-Type: application/json');

    $request = json_decode(file_get_contents('php://input'));

    $result = new DataSourceResult('sqlite:../../sample.db');

    echo json_encode($result->read('Employees', array('FirstName', 'LastName', 'City', 'Title'), $request));

    exit;
}

require_once '../../include/header.php';

$transport = new \Kendo\Data\DataSourceTransport();

$read = new \Kendo\Data\DataSourceTransportRead();

$read->url('events.php')
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
           ->pageSize(5)
           ->schema($schema)
           ->serverSorting(true)
           ->serverPaging(true);

$grid = new \Kendo\UI\Grid('grid');

$firstName = new \Kendo\UI\GridColumn();
$firstName->field("FirstName")
    ->title('First Name');

$lastName = new \Kendo\UI\GridColumn();
$lastName->field("LastName")
    ->title('Last Name');

$city = new \Kendo\UI\GridColumn();
$city->field('City');

$grid->addColumn($firstName, $lastName, $city)
     ->selectable('cell multiple')
     ->pageable(true)
     ->sortable(true)
     ->dataSource($dataSource)
     ->change('onChange')
     ->dataBound('onDataBound')
     ->dataBinding('onDataBinding');

echo $grid->render();
?>

<script>
    function onChange(arg) {
        var selected = $.map(this.select(), function(item) {
            return $(item).text();
        });

        kendoConsole.log("Selected: " + selected.length + " item(s), [" + selected.join(", ") + "]");
    }

    function onDataBound(arg) {
        kendoConsole.log("Grid data bound");
    }

    function onDataBinding(arg) {
        kendoConsole.log("Grid data binding");
    }
</script>

<div class="console"></div>

<?php require_once '../../include/footer.php'; ?>
