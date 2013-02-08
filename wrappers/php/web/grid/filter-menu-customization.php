<?php
require_once '../../lib/DataSourceResult.php';
require_once '../../lib/Kendo/Autoload.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    header('Content-Type: application/json');

    $request = json_decode(file_get_contents('php://input'));

    $result = new DataSourceResult('sqlite:../../sample.db');

    if (array_key_exists('details', $_GET)) {
        echo json_encode($result->read('Employees', array('DISTINCT('.$_GET['details'].')'), $request));
    } else {
        echo json_encode($result->read('Employees', array('FirstName', 'LastName', 'City', 'Title'), $request));
    }

    exit;
}

require_once '../../include/header.php';

$transport = new \Kendo\Data\DataSourceTransport();

$read = new \Kendo\Data\DataSourceTransportRead();

$read->url('filter-menu-customization.php')
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
           ->pageSize(15)
           ->schema($schema)
           ->serverSorting(true)
           ->serverPaging(true);

$grid = new \Kendo\UI\Grid('grid');

$name = new \Kendo\UI\GridColumn();
$name
    ->template("#=FirstName# #=LastName#")
    ->filterable(false)
    ->title('Name');

$cityFilterable = new \Kendo\UI\GridColumnFilterable();
$cityFilterable->ui(new \Kendo\JavaScriptFunction('cityFilter'));

$city = new \Kendo\UI\GridColumn();
$city->field('City')
    ->filterable($cityFilterable)
    ->width(200);

$titleFilterable = new \Kendo\UI\GridColumnFilterable();
$titleFilterable->ui(new \Kendo\JavaScriptFunction('titleFilter'));

$title = new \Kendo\UI\GridColumn();
$title->field('Title')
    ->filterable($titleFilterable)
    ->width(300);

$stringOperators = new \Kendo\UI\GridFilterableOperatorsString();
$stringOperators
        ->startsWith('Starts with')
        ->eq('Is equal to')
        ->neq('Is not equal to');

$operators = new \Kendo\UI\GridFilterableOperators();
$operators->string($stringOperators);

$filterable = new \Kendo\UI\GridFilterable();
$filterable->extra(false)
    ->operators($operators);

$grid->addColumn($name, $city, $title)
     ->dataSource($dataSource)
     ->filterable($filterable);

echo $grid->render();
?>

<script>
    function cityFilter(element) {
        element.kendoDropDownList({
            dataSource: {
                transport: {
                    read: {
                        url: "filter-menu-customization.php?details=city",
                        type: "POST"
                    }
                },
                schema: {
                    data: "data"
                }
            },
            dataTextField: "City",
            dataValueField: "City",
            optionLabel: "--Select Value--"
        });
    }

    function titleFilter(element) {
        element.kendoAutoComplete({
            dataSource: {
                transport: {
                    read: {
                        url: "filter-menu-customization.php?details=title",
                        type: "POST"
                    }
                },
                schema: {
                    data: "data"
                }
            },
            dataTextField: "Title",
            dataValueField: "Title",
            optionLabel: "--Select Value--"
        });
    }
</script>

<?php require_once '../../include/footer.php'; ?>
