<?php
require_once '../lib/DataSourceResult.php';
require_once '../lib/Kendo/Autoload.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    header('Content-Type: application/json');

    $request = json_decode(file_get_contents('php://input'));

    $result = new DataSourceResult('sqlite:..//sample.db');

    echo json_encode($result->read('EmployeeDirectory', array('EmployeeID', 'ReportsTo', 'FirstName', 'LastName', 'Extension' => array('type' => 'number'), 'HireDate'), $request));

    exit;
}

require_once '../include/header.php';

$transport = new \Kendo\Data\DataSourceTransport();

$read = new \Kendo\Data\DataSourceTransportRead();

$read->url('api.php')
     ->contentType('application/json')
     ->type('POST');

$transport ->read($read)
          ->parameterMap('function(data) {
              return kendo.stringify(data);
          }');

$model = new \Kendo\Data\DataSourceSchemaModel();

$firstNameField = new \Kendo\Data\DataSourceSchemaModelField('FirstName');
$firstNameField->type('string');

$lastNameField = new \Kendo\Data\DataSourceSchemaModelField('LastName');
$lastNameField->type('string');

$extentionField = new \Kendo\Data\DataSourceSchemaModelField('Extension');
$extentionField->type('number');

$hireDateField = new \Kendo\Data\DataSourceSchemaModelField('HireDate');
$hireDateField->type('date');

$employeeIDField = new \Kendo\Data\DataSourceSchemaModelField('EmployeeID');
$employeeIDField->type('number');

$parentIdField = new \Kendo\Data\DataSourceSchemaModelField('parentId');
$parentIdField->from("ReportsTo")
    ->nullable(true)
    ->type('number');

$model->id("EmployeeID")
    ->addField($employeeIDField)
    ->addField($parentIdField)
    ->addField($firstNameField)
    ->addField($lastNameField)
    ->addField($extentionField)
    ->addField($hireDateField);

$schema = new \Kendo\Data\DataSourceSchema();
$schema->data('data')
       ->model($model);

$dataSource = new \Kendo\Data\DataSource();

$dataSource->transport($transport)
           ->schema($schema);

$treeList = new \Kendo\UI\TreeList('treelist');

$firstName = new \Kendo\UI\TreeListColumn();
$firstName->field('FirstName')
            ->title('First Name')
            ->width(250);

$lastName = new \Kendo\UI\TreeListColumn();
$lastName->field('LastName')
            ->title('Last Name');

$extension = new \Kendo\UI\TreeListColumn();
$extension->field('Extension')
            ->title('Ext')
            ->format('{0:#}');

$hireDate = new \Kendo\UI\TreeListColumn();
$hireDate->field('HireDate')
            ->format('{0:MMMM d, yyyy}')
            ->title('Hire Date');

$treeList->addColumn($firstName, $lastName, $hireDate, $extension)
     ->dataSource($dataSource)
     ->selectable(true)
     ->attr('style', 'height:540px');

?>

<div class="box">
    <div class="box-col">
    <h4>Selection</h4>
    <ul class="options">
        <li>
            <input type="text" value="0" id="selectRow" class="k-textbox"/>
            <button class="selectRow k-button">Select row</button>
        </li>
        <li>
            <button class="clearSelection k-button">Clear selected rows</button>
        </li>
    </ul>
    </div>
    <div class="box-col">
    <h4>Expand / Collapse</h4>
    <ul class="options">
        <li>
            <input type="text" value="0" id="groupRow" class="k-textbox"/>
            <button class="toggleGroup k-button">Collapse/Expand group</button>
        </li>
    </ul>
    </div>
</div>

<div id="treelist"></div>

<script>
    $(document).ready(function () {
        $(".clearSelection").click(function () {
            $("#treelist").data("kendoTreeList").clearSelection();
        });

        var selectRow = function (e) {
            if (e.type != "keypress" || kendo.keys.ENTER == e.keyCode) {
                var treelist = $("#treelist").data("kendoTreeList"),
                    rowIndex = $("#selectRow").val(),
                    row = treelist.content.find("tr:visible").eq(rowIndex);

                treelist.select(row);
            }
        };

        var toggleGroup = function (e) {
            if (e.type != "keypress" || kendo.keys.ENTER == e.keyCode) {
                var treelist = $("#treelist").data("kendoTreeList"),
                    rowIndex = $("#groupRow").val(),
                    row = treelist.content.find("tr:visible").eq(rowIndex);

                if (row.has(".k-i-collapse").length) {
                    treelist.collapse(row);
                } else {
                    treelist.expand(row);
                }
            }
        };


        $(".selectRow").click(selectRow);
        $("#selectRow").keypress(selectRow);

        $(".toggleGroup").click(toggleGroup);
        $("#groupRow").keypress(toggleGroup);
    });
</script>
<?php
echo $treeList->render();
?>

<?php require_once '../include/footer.php'; ?>
