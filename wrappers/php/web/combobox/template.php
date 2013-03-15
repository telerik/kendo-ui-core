<?php
require_once '../../lib/DataSourceResult.php';
require_once '../../lib/Kendo/Autoload.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    header('Content-Type: application/json');

    $result = new DataSourceResult('sqlite:../../sample.db');

    echo json_encode($result->read('Customers', array('ContactName', 'CustomerID', 'CompanyName')));

    exit;
}

require_once '../../include/header.php';
?>
<div class="demo-section">
    <h2>Customers</h2>
<?php
$read = new \Kendo\Data\DataSourceTransportRead();
$read->url('template.php')
     ->type('POST');

$transport = new \Kendo\Data\DataSourceTransport();
$transport->read($read);

$schema = new \Kendo\Data\DataSourceSchema();
$schema->data('data')
       ->total('total');

$dataSource = new \Kendo\Data\DataSource();
$dataSource->transport($transport)
           ->schema($schema);

$comboBox = new \Kendo\UI\ComboBox('customers');
$comboBox->minLength(1)
         ->dataTextField('ContactName')
         ->dataSource($dataSource)
         ->attr("style", "width:400px")
         ->template(<<<TEMPLATE
            <img src="../../content/web/Customers/#= CustomerID #.jpg" alt="#= CustomerID #" />
            <dl>
                <dt>Contact:</dt><dd>#: ContactName #</dd>
                <dt>Company:</dt><dd>#: CompanyName #</dd>
            </dl>
TEMPLATE
            );

echo $comboBox->render();
?>
</div>

<div class="demo-section">
    <h2>Information</h2>
    <p>
        Open the ComboBox to see the customized appearance of the items.
    </p>
</div>

<style scoped>
    .demo-section {
        width: 400px;
        padding: 30px;
    }
    .demo-section h2 {
        text-transform: uppercase;
        font-size: 1.2em;
        margin-bottom: 10px;
    }
    #customers-list .k-item {
        overflow: hidden; /* clear floated images */
    }
    #customers-list img {
        -moz-box-shadow: 0 0 2px rgba(0,0,0,.4);
        -webkit-box-shadow: 0 0 2px rgba(0,0,0,.4);
        box-shadow: 0 0 2px rgba(0,0,0,.4);
        float: left;
        margin: 5px 20px 5px 0px;
    }
    #customers-list h3 {
        margin: 30px 0 10px 0;
        font-size: 2em;
    }
    #customers-list p {
        margin: 0;
    }
</style>

<?php require_once '../../include/footer.php'; ?>
