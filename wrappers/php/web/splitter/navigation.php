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

    $outer->addPane($topPane, $bottomPane);

    echo $outer->render();
?>

<ul id="keyboard-nav" class="keyboard-legend">
    <li>
        <span class="button-preview">
            <span class="key-button leftAlign wider">Alt</span>
            <span class="key-button">w</span>
        </span>
        <span class="button-descr">
            focuses first splitbar
        </span>
    </li>
</ul>

<ul class="keyboard-legend">
    <li>
        <span class="button-preview">
            <span class="key-button wider leftAlign">left arrow</span>
        </span>
        <span class="button-descr">
            moves focused splitbar to the left (if horizontal splitter)
        </span>
    </li>
    <li>
        <span class="button-preview">
            <span class="key-button wider leftAlign">right arrow</span>
        </span>
        <span class="button-descr">
            moves focused splitbar to the right (if horizontal splitter)
        </span>
    </li>
    <li>
        <span class="button-preview">
            <span class="key-button wider leftAlign">up arrow</span>
        </span>
        <span class="button-descr">
            moves focused splitbar up (if vertical splitter)
        </span>
    </li>
    <li>
        <span class="button-preview">
            <span class="key-button wider leftAlign">down arrow</span>
        </span>
        <span class="button-descr">
            moves focused splitbar down (if vertical splitter)
        </span>
    </li>
    <li>
        <span class="button-preview">
            <span class="key-button wider rightAlign">enter</span>
        </span>
        <span class="button-descr">
            accepts current position of the splitbar
        </span>
    </li>
    <li>
        <span class="button-preview">
            <span class="key-button">esc</span>
        </span>
        <span class="button-descr">
            returns splitbar to its initial position
        </span>
    </li>
    <li>
        <span class="button-preview">
            <span class="key-button">ctrl</span>
            <span class="key-button wider leftAlign">left arrow</span>
        </span>
        <span class="button-descr">
            collapses the left pane or expands the right one
        </span>
    </li>
    <li>
        <span class="button-preview">
            <span class="key-button">ctrl</span>
            <span class="key-button wider leftAlign">right arrow</span>
        </span>
        <span class="button-descr">
            collapses the right pane or expands the left one
        </span>
    </li>
    <li>
        <span class="button-preview">
            <span class="key-button">ctrl</span>
            <span class="key-button wider leftAlign">down arrow</span>
        </span>
        <span class="button-descr">
            collapses the upper pane or expands the lower one
        </span>
    </li>
    <li>
        <span class="button-preview">
            <span class="key-button">ctrl</span>
            <span class="key-button wider leftAlign">up arrow</span>
        </span>
        <span class="button-descr">
            collapses the lower pane or expands the upper one
        </span>
    </li>
</ul>

<script>
    $(document).on("keydown.examples", function(e) {
        if (e.altKey && e.keyCode === 87 /* w */) {
            $("#horizontal").find(".k-splitbar:first").focus();
        }
    });
</script>

<style scoped>
    #vertical {
        height: 200px;
        width: 700px;
        margin: 0 auto;
    }

    #middle-pane { background-color: rgba(60, 70, 80, 0.10); }
    #bottom-pane { background-color: rgba(60, 70, 80, 0.15); }
    #left-pane, #center-pane, #right-pane  { background-color: rgba(60, 70, 80, 0.05); }

    .pane-content {
        padding: 0 10px;
    }

    #keyboard-nav
    {
        padding-top: 35px;
    }

    ul.keyboard-legend li
    {
        margin: 5px 0 15px 5px;
    }

    div.demo-section
    {
        margin: 0px auto;
    }
</style>

<?php require_once '../../include/footer.php'; ?>
