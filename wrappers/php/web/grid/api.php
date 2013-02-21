
<?php
require_once '../../lib/DataSourceResult.php';
require_once '../../lib/Kendo/Autoload.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    header('Content-Type: application/json');

    $request = json_decode(file_get_contents('php://input'));

    $result = new DataSourceResult('sqlite:../../sample.db');

    echo json_encode($result->read('Products', array('ProductName', 'UnitPrice', 'UnitsInStock'), $request));

    exit;
}

require_once '../../include/header.php';

$transport = new \Kendo\Data\DataSourceTransport();

$read = new \Kendo\Data\DataSourceTransportRead();

$read->url('api.php')
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
$group->field('UnitsInStock');

$dataSource->transport($transport)
           ->pageSize(5)
           ->addGroupItem($group)
           ->schema($schema)
           ->serverSorting(true)
           ->serverGrouping(true)
           ->serverPaging(true);

$grid = new \Kendo\UI\Grid('grid');

$productName = new \Kendo\UI\GridColumn();
$productName->field('ProductName')
            ->title('Product Name');

$unitPrice = new \Kendo\UI\GridColumn();
$unitPrice->field('UnitPrice')
          ->format('{0:c}')
          ->title('Unit Price');

$unitsInStock = new \Kendo\UI\GridColumn();
$unitsInStock->field('UnitsInStock')
          ->title('Units In Stock');

$grid->addColumn($productName, $unitPrice, $unitsInStock)
     ->attr('style', 'width:700px')
     ->selectable('row multiple')
     ->pageable(true)
     ->sortable(true)
     ->groupable(true)
     ->dataSource($dataSource);
?>

<div class="configuration k-widget k-header" style="width:190px">
    <span class="configHead">API Functions</span>
    <ul class="options">
        <li>
            <input type="text" value="0" id="selectRow" class="k-textbox"/>
            <button class="selectRow k-button">Select row</button>
        </li>
        <li>
            <button class="clearSelection k-button">Clear selected rows</button>
        </li>
        <li>
            <input type="text" value="0" id="groupRow" class="k-textbox"/>
            <button class="toggleGroup k-button">Collapse/Expand group</button>
        </li>
    </ul>
</div>

<?php
echo $grid->render();
?>

<script>
    $(document).ready(function() {
        $(".clearSelection").click(function() {
            $("#grid").data("kendoGrid").clearSelection();
        });

        var selectRow = function(e) {
            if (e.type != "keypress" || kendo.keys.ENTER == e.keyCode) {
                var grid = $("#grid").data("kendoGrid"),
                    rowIndex = $("#selectRow").val(),
                                        row = grid.tbody.find(">tr:not(.k-grouping-row)").eq(rowIndex);

                grid.select(row);
            }
        },
        toggleGroup = function(e) {
            if (e.type != "keypress" || kendo.keys.ENTER == e.keyCode) {
                var grid = $("#grid").data("kendoGrid"),
                    rowIndex = $("#groupRow").val(),
                                    row = grid.tbody.find(">tr.k-grouping-row").eq(rowIndex);

                if(row.has(".k-i-collapse").length) {
                    grid.collapseGroup(row);
                } else {
                    grid.expandGroup(row);
                }
            }
        };

        $(".selectRow").click(selectRow);
        $("#selectRow").keypress(selectRow);

        $(".toggleGroup").click(toggleGroup);
        $("#groupRow").keypress(toggleGroup);
    });
</script>

<style scoped>
    .configuration .k-textbox
    {
        width: 23px;
    }
</style>

<?php require_once '../../include/footer.php'; ?>
