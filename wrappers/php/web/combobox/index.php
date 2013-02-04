<?php
require_once '../../include/header.php';
require_once '../../lib/Kendo/Autoload.php';
?>

<div id="tshirt-view" class="k-header">
    <h2>Customize your Kendo T-shirt</h2>
    <img id="tshirt" src="../../content/web/combobox/tShirt.png" />
    <div id="options">
        <h3>T-shirt Fabric</h3>
<?php
$fabrics = new \Kendo\Data\DataSource();
$fabrics->data(array(
    array('text' => 'Cotton', 'value'=> 1),
    array('text' => 'Polyester', 'value'=> 2),
    array('text' => 'Cotton/Polyester', 'value'=> 3),
    array('text' => 'Rib Knit', 'value'=> 4)
));

$input = new \Kendo\UI\ComboBox('input');
$input->dataSource($fabrics)
      ->dataTextField('text')
      ->dataValueField('value')
      ->filter('contains')
      ->placeholder('Select fabric ...')
      ->suggest(true)
      ->index(3);

echo $input->render();
?>
        <h3>T-shirt Size</h3>
<?php

$select = new \Kendo\UI\ComboBox('select');
$select->dataSource(array('X-Small', 'Small', 'Medium', 'Large', 'X-Large', '2X-Large'))
       ->placeholder('Select size ...')
       ->index(0);

echo $select->render();
?>
        <button class="k-button" id="get">Customize</button>
    </div>
</div>
<style scoped>
#example h2 {
    font-weight: normal;
}
#tshirt-view {
    border-radius: 10px 10px 10px 10px;
    border-style: solid;
    border-width: 1px;
    overflow: hidden;
    width: 500px;
    margin: 30px auto;
    padding: 20px 20px 0 20px;
    background-position: 0 -255px;
}
#tshirt {
    float: left;
    margin: 30px 40px 30px 20px;
}
#options {
    padding: 30px;
}
#options h3 {
    font-size: 1em;
    font-weight: bold;
    margin: 25px 0 8px 0;
}
#get {
    margin-top: 25px;
}

.k-readonly
{
    color: gray;
}
</style>

<script>
    $(document).ready(function() {
        // create ComboBox from select HTML element
        var input = $("#input").data("kendoComboBox");
        var select = $("#select").data("kendoComboBox");

        $("#get").click(function() {
            alert('Thank you! Your Choice is:\n\nFabric ID: '+input.value()+' and Size: '+select.value());
        });
    });
</script>

<?php require_once '../../include/footer.php'; ?>
