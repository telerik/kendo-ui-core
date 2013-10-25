<?php
require_once '../../lib/Kendo/Autoload.php';
require_once '../../lib/DataSourceResult.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    header('Content-Type: application/json');

    $result = new DataSourceResult('sqlite:../../sample.db');

    echo json_encode($result->read('Customers', array('ContactName', 'CustomerID', 'CompanyName')));

    exit;
}
?>
<?php
require_once '../../include/header.php';

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

$autoComplete = new \Kendo\UI\AutoComplete('customers');
$autoComplete->minLength(1)
             ->dataTextField('ContactName')
             ->dataSource($dataSource)
             ->height(370)
             ->attr('style', 'width:400px')
             ->headerTemplate(<<<TEMPLATE
                <div class="k-widget k-header dropdown-header">
                    <span class="first">photo</span>
                    <span class="last">contact info</span>
                </div>
TEMPLATE
            )
             ->template(<<<TEMPLATE
                <img src="../../content/web/Customers/#= CustomerID #.jpg" alt="#= CustomerID #" />
                <dl>
                    <dt>Contact:</dt><dd>#: ContactName #</dd>
                    <dt>Company:</dt><dd>#: CompanyName #</dd>
                </dl>
TEMPLATE
            );
?>

<div class="demo-section">
<h2>Customers</h2>
<?php
echo $autoComplete->render();
?>
    <p>
        Start typing to find a customer.
    </p>
</div>

<style scoped>
    .dropdown-header {
        overflow:hidden;
        font-size: 1.3em;
        padding: 5px 2px;
        margin: -2px -2px 0;
        border-width: 0 0 1px;
    }

    .dropdown-header .first {
        width: 65px;
        margin-left:4px;
        display: block;
        float: left;
        text-align: left;
    }

    .dropdown-header .last {
        margin-left: 22px;
        float: left;
    }

    .demo-section {
        width: 400px;
        margin: 35px auto 50px;
        padding: 30px;
    }
    .demo-section h2 {
        text-transform: uppercase;
        font-size: 1.2em;
        margin-bottom: 10px;
    }
    #customers-list {
        padding-bottom: 30px;
    }
    #customers-list .k-item {
        overflow: hidden; /* clear floated images */
    }
    #customers-list img {
        -moz-box-shadow: 0 0 2px rgba(0,0,0,.4);
        -webkit-box-shadow: 0 0 2px rgba(0,0,0,.4);
        box-shadow: 0 0 2px rgba(0,0,0,.4);
        float: left;
        width: 70px;
        height: 70px;
        margin: 5px 20px 5px 0px;
    }
    #customers-list h3 {
        margin: 20px 0 5px 0;
        font-size: 1.6em;
    }
    #customers-list p {
        margin: 0;
    }
</style>
<?php require_once '../../include/footer.php'; ?>
