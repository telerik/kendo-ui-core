<?php

require_once '../../include/header.php';
require_once '../../lib/Kendo/Autoload.php';

?>

<div class="demo-section">
    <div id="background">
        <div class="column">
            <h3 class="title">Select Wall Paint</h3>
<?php
    $palette = new \Kendo\UI\ColorPalette('palette');

    $tileSize = new \Kendo\UI\ColorPickerTileSize();
    $tileSize->width(34)
             ->height(19);

    $palette->columns(4)
            ->tileSize($tileSize)
            ->change('preview')
            ->palette(array(
                '#f0d0c9', '#e2a293', '#d4735e', '#65281a',
                '#eddfda', '#dcc0b6', '#cba092', '#7b4b3a',
                '#fcecd5', '#f9d9ab', '#f6c781', '#c87d0e',
                '#e1dca5', '#d0c974', '#a29a36', '#514d1b',
                '#c6d9f0', '#8db3e2', '#548dd4', '#17365d'
            ));

    echo $palette->render();
?>
        </div>

        <div class="column">
            <h3 class="title">Choose Custom Color</h3>
<?php
    $picker = new \Kendo\UI\ColorPicker('picker');

    $picker->value('#ffffff')
           ->buttons(false)
           ->select('preview');

    echo $picker->render();
?>
        </div>
    </div>
</div>


<script>
    function preview(e) {
        $("#background").css("background-color", e.value);
    }
</script>

<style scoped>

    .demo-section {
        width: 600px;
        height: 600px;
    }

    #background {
        background-image: url(../../content/web/colorpicker/interior-bg.png);
        background-color: transparent;
        width: 100%;
        height: 100%;
        overflow: hidden;
    }

    .column {
        margin-top: 384px;
        float: left;
        width: 300px;
        text-align: center;
    }

    .column .title {
        color: #a3a3a3;
        text-transform: uppercase;
        font-size: 11px;
        font-weight: normal;
        padding: 41px 0 20px;
    }

    #palette {
        vertical-align: top;
        display: inline-block;
    }

    .k-colorpicker {
        vertical-align: top;
        margin: 20px 0;
    }
</style>

<?php require_once '../../include/footer.php'; ?>

