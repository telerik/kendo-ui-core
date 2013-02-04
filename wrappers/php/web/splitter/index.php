<?php

require_once '../../include/header.php';
require_once '../../lib/Kendo/Autoload.php';

?>

<?php
    // create inner splitter
    $inner = new \Kendo\UI\Splitter('horizontal');
    $inner->attr("style", "height: 100%; width: 100%;");

    $leftPane = new \Kendo\UI\SplitterPane();
    $leftPane->attr("id", "left-pane")
             ->collapsible(true)
             ->size(220)
             ->startContent();
?>
    <div class="pane-content">
        <h3>Inner splitter / left pane</h3>
        <p>Resizable and collapsible.</p>
    </div>
<?php
    $leftPane->endContent();
    $inner->addPane($leftPane);

    $centerPane = new \Kendo\UI\SplitterPane();
    $centerPane->attr("id", "center-pane")
             ->collapsible(false)
             ->startContent();
?>
    <div class="pane-content">
        <h3>Inner splitter / center pane</h3>
        <p>Resizable only.</p>
    </div>
<?php
    $centerPane->endContent();
    $inner->addPane($centerPane);

    $rightPane = new \Kendo\UI\SplitterPane();
    $rightPane->attr("id", "center-pane")
             ->collapsible(true)
             ->size(220)
             ->startContent();
?>
    <div class="pane-content">
        <h3>Inner splitter / right pane</h3>
        <p>Resizable and collapsible.</p>
    </div>
<?php
    $rightPane->endContent();
    $inner->addPane($rightPane);


    // create outer splitter
    $outer = new \Kendo\UI\Splitter('vertical');
    $outer->orientation("vertical");

    $topPane = new \Kendo\UI\SplitterPane();
    $topPane->attr("id", "top-pane")
            ->collapsible(false)
            ->content($inner->render());

    $middlePane = new \Kendo\UI\SplitterPane();
    $middlePane->attr("id", "middle-pane")
               ->collapsible(false)
               ->size(100)
               ->startContent();
?>
    <div class="pane-content">
        <h3>Outer splitter / middle pane</h3>
        <p>Resizable only.</p>
    </div>
<?php
    $middlePane->endContent();

    $bottomPane = new \Kendo\UI\SplitterPane();
    $bottomPane->attr("id", "bottom-pane")
               ->collapsible(false)
               ->resizable(false)
               ->size(100)
               ->startContent();
?>
    <div class="pane-content">
        <h3>Outer splitter / bottom pane</h3>
        <p>Non-resizable and non-collapsible.</p>
    </div>
<?php
    $bottomPane->endContent();

    $outer->addPane($topPane, $middlePane, $bottomPane);

    echo $outer->render();
?>

<style scoped>
    #vertical {
        height: 380px;
        width: 700px;
        margin: 0 auto;
    }

    #middle-pane { background-color: rgba(60, 70, 80, 0.10); }
    #bottom-pane { background-color: rgba(60, 70, 80, 0.15); }
    #left-pane, #center-pane, #right-pane  { background-color: rgba(60, 70, 80, 0.05); }

    .pane-content {
        padding: 0 10px;
    }
</style>

<?php require_once '../../include/footer.php'; ?>
