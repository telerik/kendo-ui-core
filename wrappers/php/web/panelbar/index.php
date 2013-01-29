<?php

require_once '../../include/header.php';
require_once '../../lib/Kendo/Autoload.php';

$panelbar = new \Kendo\UI\PanelBar('panelbar');

$panelbar->attr('style', 'width: 300px')
         ->expandMode('single');

$teamMates = new \Kendo\UI\PanelBarItem();

$teamMates->text('My Teammates')
          ->expanded(true)
          ->startContent();
?>

<div style="padding: 10px;">
    <div class="teamMate">
        <img src="../../content/web/panelbar/andrew.jpg" alt="Andrew Fuller">
        <h2>Andrew Fuller</h2>
        <p>Team Lead</p>
    </div>
    <div class="teamMate">
        <img src="../../content/web/panelbar/nancy.jpg" alt="Nancy Leverling">
        <h2>Nancy Leverling</h2>
        <p>Sales Associate</p>
    </div>
    <div class="teamMate">
        <img src="../../content/web/panelbar/robert.jpg" alt="Robert King">
        <h2>Robert King</h2>
        <p>Business System Analyst</p>
    </div>
</div>

<?php
$teamMates->endContent();

$panelbar->addItem($teamMates);

$projects = new \Kendo\UI\PanelBarItem();

$projects->text('Projects')
         ->addItem(new \Kendo\UI\PanelBarItem('New Business Plan'));

$panelbar->addItem($projects);

$forecasts = new \Kendo\UI\PanelBarItem();

$forecasts->text('Sales Forecasts')
        ->addItem(new \Kendo\UI\PanelBarItem('Q1 Forecast'))
        ->addItem(new \Kendo\UI\PanelBarItem('Q2 Forecast'))
        ->addItem(new \Kendo\UI\PanelBarItem('Q3 Forecast'))
        ->addItem(new \Kendo\UI\PanelBarItem('Q4 Forecast'));

$projects->addItem($forecasts)
         ->addItem(new \Kendo\UI\PanelBarItem('Sales Reports'));

$programs = new \Kendo\UI\PanelBarItem('Programs');

$programs->addItem(new \Kendo\UI\PanelBarItem('Monday'))
         ->addItem(new \Kendo\UI\PanelBarItem('Tuesday'))
         ->addItem(new \Kendo\UI\PanelBarItem('Wednesday'))
         ->addItem(new \Kendo\UI\PanelBarItem('Thursday'))
         ->addItem(new \Kendo\UI\PanelBarItem('Friday'));

$panelbar->addItem($programs);

$communication = new \Kendo\UI\PanelBarItem();

$communication->text('Communication')
              ->enabled(false);

$panelbar->addItem($communication);
?>

<div id="organizer">
<?php
    echo $panelbar->render();
?>
</div>

<style scoped="scoped">
    #organizer {
        width: 300px;
        margin: 0 auto;
        padding: 47px 0 0 0;
        background: url('../../content/web/panelbar/orgHead.png') transparent no-repeat 0 0;
    }
    #bottom {
        width: 300px;
        height: 90px;
        background: url('../../content/web/panelbar/orgFoot.png') transparent no-repeat 0 0;
    }
    .teamMate:after {
        content: ".";
        display: block;
        height: 0;
        line-height: 0;
        clear: both;
        visibility: hidden;
    }
    .teamMate h2 {
        font-size: 1.4em;
        font-weight: normal;
        padding-top: 20px;
    }
    .teamMate p {
        margin: 5px 0;
    }
    .teamMate img {
        float: left;
        margin: 5px 15px 5px 5px;
        border: 1px solid #ccc;
    }
</style>
<?php require_once '../../include/footer.php'; ?>
