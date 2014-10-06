<?php
require_once '../include/header.php';
require_once '../lib/Kendo/Autoload.php';
?>

<div class="demo-section k-header">
    <div>
        <h4>Basic Button</h4>
        <p>
            <?php
                echo (new \Kendo\UI\Button('primaryTextButton'))
                    ->attr('class', 'k-primary')
                    ->content('Primary button')
                    ->render();
            ?>

            <?php
                echo (new \Kendo\UI\Button('textButton'))
                    ->content('Button')
                    ->render();
            ?>
        </p>
    </div>

     <div>
        <h4>Disabled buttons</h4>
        <p>
            <?php
                echo (new \Kendo\UI\Button('primaryDisabledButton'))
                    ->tag('a')
                    ->enable(false)
                    ->attr('class', 'k-primary')
                    ->content('Disabled primary button')
                    ->render();
            ?>

            <?php
                echo (new \Kendo\UI\Button('disabledButton'))
                    ->enable(false)
                    ->content('Disabled Button')
                    ->render();
            ?>
        </p>
    </div>

    <div>
       <h4>Buttons with icons</h4>
        <p>
            <?php
                echo (new \Kendo\UI\Button('iconTextButton'))
                    ->tag('a')
                    ->spriteCssClass('k-icon k-i-funnel')
                    ->content('Filter')
                    ->render();
            ?>

            <?php
                echo (new \Kendo\UI\Button('kendoIconTextButton'))
                    ->tag('a')
                    ->icon('funnel-clear')
                    ->content('Clear Filter')
                    ->render();
            ?>

            <?php
                echo (new \Kendo\UI\Button('iconButton'))
                    ->tag('em')
                    ->spriteCssClass('k-icon k-i-refresh')
                    ->render();
            ?>
        </p>
    </div>


    <style scoped>
        .demo-section {
            width: 400px;
        }
        .demo-section p {
            margin: 0 0 30px;
            line-height: 40px;
        }
        .k-primary {
            width: 150px;
        }
    </style>
</div>

<?php require_once '../include/footer.php'; ?>
