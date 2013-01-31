<?php

require_once '../../include/header.php';
require_once '../../lib/Kendo/Autoload.php';

?>

<div class="demo-section">

<?php
    $panelbar = new \Kendo\UI\PanelBar('panelbar');

    $panelbar->attr('accesskey', 'w')
             ->expandMode("multiple");

    $salesforecasts = new \Kendo\UI\PanelBarItem("Sales Forecasts");
    $salesforecasts->addItem(
        new \Kendo\UI\PanelBarItem("Q1 Forecast"),
        new \Kendo\UI\PanelBarItem("Q2 Forecast"),
        new \Kendo\UI\PanelBarItem("Q3 Forecast"),
        new \Kendo\UI\PanelBarItem("Q4 Forecast")
    );

    $projects = new \Kendo\UI\PanelBarItem("Projects");
    $projects->addItem(
        new \Kendo\UI\PanelBarItem("New Business Plan"),
        $salesforecasts,
        new \Kendo\UI\PanelBarItem("Sales Reports")
    );
    $panelbar->addItem($projects);

    $programs = new \Kendo\UI\PanelBarItem("Programs");
    $programs->addItem(
        new \Kendo\UI\PanelBarItem("Monday"),
        new \Kendo\UI\PanelBarItem("Tuesday"),
        new \Kendo\UI\PanelBarItem("Wednesday"),
        new \Kendo\UI\PanelBarItem("Thursday"),
        new \Kendo\UI\PanelBarItem("Friday")
    );
    $panelbar->addItem($programs);

    $communication = new \Kendo\UI\PanelBarItem("Communication");
    $communication->enabled(false);
    $panelbar->addItem($communication);

    echo $panelbar->render();
?>

</div>

<ul class="keyboard-legend">
    <li>
        <span class="button-preview">
            <span class="key-button leftAlign wider"><a target="_blank" href="http://en.wikipedia.org/wiki/Access_key">Access key</a></span>
            +
            <span class="key-button">w</span>
        </span>
        <span class="button-descr">
            focuses the widget
        </span>
    </li>
</ul>

<ul class="keyboard-legend">
    <li>
        <span class="button-preview">
            <span class="key-button wider leftAlign">up arrow</span>
        </span>
        <span class="button-descr">
            highlights previous item
        </span>
    </li>
    <li>
        <span class="button-preview">
            <span class="key-button wider leftAlign">left arrow</span>
        </span>
        <span class="button-descr">
            highlights previous item
        </span>
    </li>
    <li>
        <span class="button-preview">
            <span class="key-button wider leftAlign">down arrow</span>
        </span>
        <span class="button-descr">
            highlights next item
        </span>
    </li>
    <li>
        <span class="button-preview">
            <span class="key-button wider leftAlign">right arrow</span>
        </span>
        <span class="button-descr">
            highlights next item
        </span>
    </li>
    <li>
        <span class="button-preview">
            <span class="key-button">home</span>
        </span>
        <span class="button-descr">
            selects first item in the list
        </span>
    </li>
    <li>
        <span class="button-preview">
            <span class="key-button">end</span>
        </span>
        <span class="button-descr">
            selects last item in the list
        </span>
    </li>
    <li>
        <span class="button-preview">
            <span class="key-button wider rightAlign">enter</span>
        </span>
        <span class="button-descr">
            selects highlighted item / toggles item's group
        </span>
    </li>
    <li>
        <span class="button-preview">
            <span class="key-button widest">space</span>
        </span>
        <span class="button-descr">
            selects highlighted item / toggles item's group
        </span>
    </li>
</ul>

<style scoped>
    .demo-section
    {
        width: 200px;
    }
</style>

<?php require_once '../../include/footer.php'; ?>
