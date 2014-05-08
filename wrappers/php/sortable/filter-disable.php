<?php
require_once '../lib/Kendo/Autoload.php';

require_once '../include/header.php';

$sortableDisable = new \Kendo\UI\Sortable('#sortable-disable'); // select the container for the Sortable
$sortableDisable->disabled('.disabled');

echo $sortableDisable->render();

$sortableFilter = new \Kendo\UI\Sortable('#sortable-filter'); // select the container for the Sortable
$sortableFilter->filter('.sortable');

echo $sortableFilter->render();
?>

    <div class="demo-section sortable-wrapper">
        <h3>Disable</h3>
        <p>Disabled items cannot be dragged but are valid drop targets.</p>
        <div id="sortable-disable">
            <div class="sortable disabled">Disabled item 1</div>
            <div class="sortable disabled">Disabled item 2</div>
            <div class="sortable">Item 3</div>
            <div class="sortable">Item 4</div>
            <div class="sortable">Item 5</div>
            <div class="sortable">Item 6</div>
        </div>
    </div>

    <div class="demo-section sortable-wrapper">
        <h3>Filter</h3>
        <p>Filtered items cannot be dragged and are not valid drop targets.</p>
        <div id="sortable-filter">
            <div class="not-sortable">Not sortable item 1</div>
            <div class="not-sortable">Not sortable item 2</div>
            <div class="sortable">Item 3</div>
            <div class="sortable">Item 4</div>
            <div class="sortable">Item 5</div>
            <div class="sortable">Item 6</div>
        </div>
    </div>

    <style>
        #example {
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
        }

        .sortable-wrapper {
            width: 35%;
            margin: 20px 40px;
            padding: 20px;
            float: left;
        }

        .sortable-wrapper p {
            margin: 5px auto 20px;
        }

        .sortable, .not-sortable {
            padding: 10px 0;
            margin: 1px 0;
            width: 315px;
            text-align: center;
            color: #ffffff;
        }

        .sortable {
            background-color: #51A0ED;
        }

        .not-sortable {
            background-color: #8E8E8E;
            opacity: 0.5;
        }

        .disabled {
            background-color: #FF0000;
            opacity: 0.5;
        }

    </style>
<?php require_once '../include/footer.php'; ?>
