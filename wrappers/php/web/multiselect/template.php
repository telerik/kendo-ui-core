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
<div class="configuration k-widget k-header">
    <span class="infoHead">Information</span>
    <p>
        Open the ComboBox to see the customized appearance of the items.
    </p>
</div>
<div class="demo-section">
    <h3 class="title">Select customers</h3>
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
<script>
    $(function() {
        var customers = $("#customers").data("kendoMultiSelect");
        customers.wrapper.attr("id", "customers-wrapper");
    });
</script>
<style scoped>
    .demo-section {
        width: 450px;
        margin-top: 40px;
    }

    .tag-image {
        width: auto;
        height: 1.4em;
        margin-right: 3px;
    }

    #customers-wrapper .k-multiselect-wrap .k-input {
        height: 1.8em;
        line-height: 1.8em;
    }

    #customers-list .k-item {
        overflow: hidden; /* clear floated images */
    }

    #customers-list img {
        -moz-box-shadow: 0 0 2px rgba(0,0,0,.4);
        -webkit-box-shadow: 0 0 2px rgba(0,0,0,.4);
        box-shadow: 0 0 2px rgba(0,0,0,.4);
        float: left;
        margin: 5px 20px 5px 5px;
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
