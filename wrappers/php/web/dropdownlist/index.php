<?php

require_once '../../lib/Kendo/Autoload.php';
require_once '../../include/header.php';
?>
<div id="cap-view" class="k-header">
    <h2>Customize your Kendo Cap</h2>
    <div id="cap" class="black-cap"></div>
    <div id="options">
    <h3>Cap Color</h3>
<?php
$color = new \Kendo\UI\DropDownList('color');

$color->value(1)
      ->change('onChange')
      ->dataTextField('text')
      ->dataValueField('value')
      ->dataSource(array(
          array('text' => 'Black', 'value' => 1),
          array('text' => 'Orange', 'value' => 2),
          array('text' => 'Grey', 'value' => 3)
      ));

echo $color->render();
?>
    <h3>Cap Size</h3>
<?php
$size = new \Kendo\UI\DropDownList('size');

$size->index(0)
     ->dataSource(array('S - 6 3/4"', 'M - 7 1/4"', 'L - 7 1/8"', 'XL - 7 5/8"'));

echo $size->render();
?>
    <button class="k-button" id="get">Customize</button>
</div>

<script>
    function onChange() {
        var value = $("#color").val();
        $("#cap")
            .toggleClass("black-cap", value == 1)
            .toggleClass("orange-cap", value == 2)
            .toggleClass("grey-cap", value == 3);
    };

    $(document).ready(function() {
        var color = $("#color").data("kendoDropDownList");
        var size = $("#size").data("kendoDropDownList");

        $("#get").click(function() {
            alert('Thank you! Your Choice is:\n\nColor ID: '+color.value()+' and Size: '+size.value());
        });
    });
</script>
<style scoped>
    #example h2 {
        font-weight: normal;
    }
    #cap-view {
        border-radius: 10px 10px 10px 10px;
        border-style: solid;
        border-width: 1px;
        overflow: hidden;
        width: 500px;
        margin: 30px auto;
        padding: 20px 20px 0 20px;
        background-position: 0 -255px;
    }
    #cap {
        float: left;
        width: 242px;
        height: 225px;
        margin: 30px 40px 30px 20px;
        background-image: url('../../content/web/dropdownlist/cap.png');
        background-repeat: no-repeat;
        background-color: transparent;
    }
    .black-cap {
        background-position: 0 0;
    }
    .grey-cap {
        background-position: 0 -225px;
    }
    .orange-cap {
        background-position: 0 -450px;
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
</style>
<?php require_once '../../include/footer.php'; ?>
