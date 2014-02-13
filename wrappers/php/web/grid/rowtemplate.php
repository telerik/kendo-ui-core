<?php
require_once '../../lib/DataSourceResult.php';
require_once '../../lib/Kendo/Autoload.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    header('Content-Type: application/json');

    $request = json_decode(file_get_contents('php://input'));

    $result = new DataSourceResult('sqlite:../../sample.db');

    echo json_encode($result->read('Employees', array('EmployeeID', 'FirstName', 'LastName', 'Title', 'Country'), $request));

    exit;
}

require_once '../../include/header.php';

$transport = new \Kendo\Data\DataSourceTransport();

$read = new \Kendo\Data\DataSourceTransportRead();

$read->url('rowtemplate.php')
     ->contentType('application/json')
     ->type('POST');

$transport->read($read)
          ->parameterMap('function(data) {
              return kendo.stringify(data);
          }');

$model = new \Kendo\Data\DataSourceSchemaModel();

$employeeIDField = new \Kendo\Data\DataSourceSchemaModelField('EmployeeID');
$employeeIDField->type('number');

$firstNameField = new \Kendo\Data\DataSourceSchemaModelField('FirstName');
$firstNameField->type('string');

$lastNameField = new \Kendo\Data\DataSourceSchemaModelField('LastName');
$lastNameField->type('string');

$countryField = new \Kendo\Data\DataSourceSchemaModelField('Country');
$countryField->type('string');

$photoField = new \Kendo\Data\DataSourceSchemaModelField('Photo');
$photoField->type('string');

$model->addField($employeeIDField)
      ->addField($firstNameField)
      ->addField($lastNameField)
      ->addField($countryField)
      ->addField($photoField);

$schema = new \Kendo\Data\DataSourceSchema();
$schema->data('data')
       ->model($model)
       ->total('total');

$dataSource = new \Kendo\Data\DataSource();

$dataSource->transport($transport)
           ->schema($schema);

$picture = new \Kendo\UI\GridColumn();
$picture->field('EmployeeID')
        ->width(110)
        ->title('Picture');


$details = new \Kendo\UI\GridColumn();
$details->width(600)
        ->title('Details');

$id = new \Kendo\UI\GridColumn();
$id->title('ID');

$grid = new \Kendo\UI\Grid('grid');

$grid->dataSource($dataSource)
     ->addColumn($picture,$details,$id)
     ->rowTemplateId('row-template')
     ->altRowTemplateId('alt-row-template')
     ->height(430);

echo $grid->render();
?>

<script id="row-template" type="text/x-kendo-template">
  <tr data-uid="#: uid #">
    <td class="photo">
      <img src="../../content/web/Employees/#:EmployeeID#.jpg" alt="#: EmployeeID #" />
    </td>
    <td class="details">
      <span class="title">#: Title #</span>
      <span class="description">Name : #: FirstName# #: LastName#</span>
      <span class="description">Country : #: Country# </span>
    </td>
    <td class="employeeID">
      #: EmployeeID #
    </td>
  </tr>
</script>

<script id="alt-row-template" type="text/x-kendo-template">
  <tr class="k-alt" data-uid="#: uid #">
    <td class="photo">
      <img src="../../content/web/Employees/#:EmployeeID#.jpg" alt="#: EmployeeID #" />
    </td>
    <td class="details">
      <span class="title">#: Title #</span>
      <span class="description">Name : #: FirstName# #: LastName#</span>
      <span class="description">Country : #: Country# </span>
    </td>
    <td class="employeeID">
      #: EmployeeID #
    </td>
  </tr>
</script>

<style scoped="scoped">
  .photo {
  width: 140px;
  }
  .details {
  width: 400px;
  }
  .title {
  display: block;
  font-size: 1.6em;
  }
  .description {
  display: block;
  padding-top: 1.6em;
  }
  .employeeID {
  font-family: "Segoe UI", "Helvetica Neue", Arial, sans-serif;
  font-size: 50px;
  font-weight: bold;
  color: #898989;
  }
  td.photo, .employeeID {
  text-align: center;
  }
  .k-grid-header .k-header {
  padding: 10px 20px;
  }
  .k-grid td {
  background: -moz-linear-gradient(top,  rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.15) 100%);
  background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,rgba(0,0,0,0.05)), color-stop(100%,rgba(0,0,0,0.15)));
  background: -webkit-linear-gradient(top,  rgba(0,0,0,0.05) 0%,rgba(0,0,0,0.15) 100%);
  background: -o-linear-gradient(top,  rgba(0,0,0,0.05) 0%,rgba(0,0,0,0.15) 100%);
  background: -ms-linear-gradient(top,  rgba(0,0,0,0.05) 0%,rgba(0,0,0,0.15) 100%);
  background: linear-gradient(to bottom,  rgba(0,0,0,0.05) 0%,rgba(0,0,0,0.15) 100%);
  padding: 20px;
  }
  .k-grid .k-alt td {
  background: -moz-linear-gradient(top,  rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.1) 100%);
  background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,rgba(0,0,0,0.2)), color-stop(100%,rgba(0,0,0,0.1)));
  background: -webkit-linear-gradient(top,  rgba(0,0,0,0.2) 0%,rgba(0,0,0,0.1) 100%);
  background: -o-linear-gradient(top,  rgba(0,0,0,0.2) 0%,rgba(0,0,0,0.1) 100%);
  background: -ms-linear-gradient(top,  rgba(0,0,0,0.2) 0%,rgba(0,0,0,0.1) 100%);
  background: linear-gradient(to bottom,  rgba(0,0,0,0.2) 0%,rgba(0,0,0,0.1) 100%);
  }
</style>

<?php require_once '../../include/footer.php'; ?>
