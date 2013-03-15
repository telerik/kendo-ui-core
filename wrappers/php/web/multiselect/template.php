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
    <h2>Select Customers</h2>
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

$multiselect = new \Kendo\UI\MultiSelect('customers');
$multiselect->minLength(1)
            ->dataTextField('ContactName')
            ->dataValueField('CustomerID')
            ->dataSource($dataSource)
            ->itemTemplate(<<<TEMPLATE
                <img src="../../content/web/Customers/#= CustomerID #.jpg" alt="#= CustomerID #" />
                <h3>#: ContactName #</h3>
                <h3>#: CompanyName #</h3>
TEMPLATE
            )
            ->tagTemplate(<<<TEMPLATE
                <img class="tag-image" src="../../content/web/Customers/#= CustomerID #.jpg" alt="#= CustomerID #" />
                #: ContactName #
TEMPLATE
);

echo $multiselect->render();
?>
</div>
<div class="demo-section">
    <h2>Information</h2>
    <p>
        Click the MultiSelect to see the customized appearance of the items.
    </p>
</div>
<script>
    $(function() {
        var customers = $("#customers").data("kendoMultiSelect");
        customers.wrapper.attr("id", "customers-wrapper");
    });
</script>
<style scoped>
    .demo-section {
        width: 400px;
        margin: 30px auto 50px;
        padding: 30px;
    }
    .demo-section h2 {
        text-transform: uppercase;
        font-size: 1.2em;
        margin-bottom: 10px;
    }
    .tag-image {
        width: auto;
        height: 18px;
        margin-right: 5px;
        vertical-align: top;
    }
    #customers-list .k-item {
        overflow: hidden; /* clear floated images */
    }
    #customers-list img {
        -moz-box-shadow: 0 0 2px rgba(0,0,0,.4);
        -webkit-box-shadow: 0 0 2px rgba(0,0,0,.4);
        box-shadow: 0 0 2px rgba(0,0,0,.4);
        float: left;
        margin: 5px 20px 5px 0;
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
