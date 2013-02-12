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
                <dl>
                    <dt>Contact:</dt><dd>#: ContactName #</dd>
                    <dt>Company:</dt><dd>#: CompanyName #</dd>
                </dl>
TEMPLATE
            )
            ->tagTemplate(<<<TEMPLATE
                <img src="../../content/web/Customers/#= CustomerID #.jpg" alt="#= CustomerID #" />
                <dl>
                    <dt>Contact:</dt><dd>#: ContactName #</dd>
                </dl>
TEMPLATE
);

echo $multiselect->render();

?>

<script>
    $(function() {
        $("#customers").data("kendoMultiSelect").list.width(400);
    });
</script>

<style scoped>
    #customers-list .k-item {
        overflow: hidden; /* clear floated images */
    }

    #customers-list img {
        box-shadow: 0 0 4px rgba(255,255,255,.7);
        float: left;
        margin: 5px;
    }

    #customers-list dl {
        margin-left: 85px;
    }

    #customers-list dt,
    #customers-list dd {
        margin: 0;
        padding: 0;
    }

    #customers-list dt {
        font-weight: bold;
        padding-top: .5em;
    }

    #customers-list dd {
        padding-bottom: .3em;
    }
</style>
<?php require_once '../../include/footer.php'; ?>
