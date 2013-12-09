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
<div class="dropdown-header"><span class="k-widget k-header">Photo</span><span class="k-widget k-header">Contact info</span></div>
TEMPLATE
            )
             ->template(<<<TEMPLATE
<span class="k-state-default"><img src="../../content/web/Customers/#= CustomerID #.jpg" alt="#= CustomerID #" /></span><span class="k-state-default"><h3>#: data.ContactName #</h3><p>#: data.CompanyName #</p></span>
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

<style>
    .dropdown-header {
        font-size: 1.2em;
    }

    .dropdown-header > span {
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        text-align: left;
        display: inline-block;
        border-style: solid;
        border-width: 0 0 1px 1px;
        padding: .3em .6em;
        width: 312px;
    }

    .dropdown-header > span:first-child {
        width: 82px;
        border-left-width: 0;
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

    #customers-list .k-item > span{
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        display: inline-block;
        border-style: solid;
        border-width: 0 0 1px 1px;
        vertical-align: top;
        min-height: 95px;
        width: 79%;
        padding: .6em 0 0 .6em;
    }

    #customers-list .k-item > span:first-child{
        width: 77px;
        border-left-width: 0;
        padding: .6em 0 0 0;
    }

    #customers-list img {
        -moz-box-shadow: 0 0 2px rgba(0,0,0,.4);
        -webkit-box-shadow: 0 0 2px rgba(0,0,0,.4);
        box-shadow: 0 0 2px rgba(0,0,0,.4);
        width: 70px;
        height: 70px;
    }

    #customers-list h3 {
        font-size: 1.6em;
        margin: 0;
        padding: 0;
    }

    #customers-list p {
        margin: 0;
        padding: 0;
    }
</style>
<?php require_once '../../include/footer.php'; ?>
