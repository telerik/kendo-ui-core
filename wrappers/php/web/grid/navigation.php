<?php
require_once '../../lib/DataSourceResult.php';
require_once '../../lib/Kendo/Autoload.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    header('Content-Type: application/json');

    $request = json_decode(file_get_contents('php://input'));

    $result = new DataSourceResult('sqlite:../../sample.db');

    echo json_encode($result->read('Employees', array('FirstName', 'LastName', 'City', 'Address', 'HomePhone'), $request));

    exit;
}

require_once '../../include/header.php';

$transport = new \Kendo\Data\DataSourceTransport();

$read = new \Kendo\Data\DataSourceTransportRead();

$read->url('navigation.php')
     ->contentType('application/json')
     ->type('POST');

$transport->read($read)
          ->parameterMap('function(data) {
              return kendo.stringify(data);
          }');

$schema = new \Kendo\Data\DataSourceSchema();
$schema->data('data')
       ->groups('groups')
       ->total('total');

$dataSource = new \Kendo\Data\DataSource();
$group = new \Kendo\Data\DataSourceGroupItem();
$group->field('City');

$dataSource->transport($transport)
           ->pageSize(5)
           ->addGroupItem($group)
           ->schema($schema)
           ->serverSorting(true)
           ->serverFiltering(true)
           ->serverGrouping(true)
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

$address = new \Kendo\UI\GridColumn();
$address->field('Address');

$phone = new \Kendo\UI\GridColumn();
$phone->field('HomePhone');

$grid->addColumn($firstName, $lastName, $city, $address, $phone)
     ->selectable('cell multiple')
     ->pageable(true)
     ->navigatable(true)
     ->sortable(true)
     ->filterable(true)
     ->dataSource($dataSource);

echo $grid->render();
?>
    <ul class="keyboard-legend" style="padding-top: 25px">
        <li>
            <span class="button-preview">
                <span class="key-button leftAlign">Alt</span>
                +
                <span class="key-button">w</span>
            </span>
            <span class="button-descr">
                focuses the widget
            </span>
        </li>
    </ul>

    <h4>Actions applied on Grid header</h4>
    <ul class="keyboard-legend">
        <li>
            <span class="button-preview">
                <span class="key-button">Enter</span>
            </span>
            <span class="button-descr">
                sort by the column
            </span>
        </li>
        <li>
            <span class="button-preview">
                <span class="key-button leftAlign">Alt</span>
                +
                <span class="key-button">Down</span>
            </span>
            <span class="button-descr">
                opens the filter menu
            </span>
        </li>
        <li>
            <span class="button-preview">
                <span class="key-button">Esc</span>
            </span>
            <span class="button-descr">
                closes the filter menu
            </span>
        </li>
        <li>
            <span class="button-preview">
                <span class="key-button">Tab</span>
            </span>
            <span class="button-descr">
                navigates through the elements in the filter menu(default browser behavior)
            </span>
        </li>
        <li>
            <span class="button-preview">
                <span class="key-button leftAlign">Shift</span>
                +
                <span class="key-button">Tab</span>
            </span>
            <span class="button-descr">
                same as Tab, but in reverse order
            </span>
        </li>
    </ul>

    <h4>Actions applied on Grid data table</h4>
    <ul class="keyboard-legend">
        <li>
            <span class="button-preview">
                <span class="key-button wider">Arrow Keys</span>
            </span>
            <span class="button-descr">
                to navigate over the cells
            </span>
        </li>
        <li>
            <span class="button-preview">
                <span class="key-button">Enter</span>
            </span>
            <span class="button-descr">
                on group row will toggle expand/collapse
            </span>
        </li>
        <li>
            <span class="button-preview">
                <span class="key-button wider">Page Up</span>
            </span>
            <span class="button-descr">
                pages on previouse page
            </span>
        </li>
        <li>
            <span class="button-preview">
                <span class="key-button wider">Page Down</span>
            </span>
            <span class="button-descr">
                pages on next page
            </span>
        </li>
        <li>
            <span class="button-preview">
                <span class="key-button">Space</span>
            </span>
            <span class="button-descr">
                selects currently highlighted cell
            </span>
        </li>
        <li>
            <span class="button-preview">
                <span class="key-button leftAlign">Ctrl</span>
                +
                <span class="key-button">Space</span>
            </span>
            <span class="button-descr">
                same as Space, but perists previously selected cells(only for selection mode "multiple")
            </span>
        </li>
    </ul>
<script>
    $(document.body).keydown(function(e) {
        if (e.altKey && e.keyCode == 87) {
            $("#grid").data("kendoGrid").table.focus();
        }
    });
</script>

<?php require_once '../../include/footer.php'; ?>
