<?php

require_once '../../include/header.php';
require_once '../../lib/Kendo/Autoload.php';

?>

<?php
    $splitter = new \Kendo\UI\Splitter('splitter');
    $splitter->attr('style', 'height: 400px;')
        ->orientation('vertical')
        ->resize('onResize')
        ->expand('onExpand')
        ->collapse('onCollapse')
        ->contentLoad('onContentLoad');

    $topPane = new \Kendo\UI\SplitterPane();
    $topPane->attr('id', 'top_pane')
        ->content('<p>Top pane</p>')
        ->collapsible(true)
        ->size(100);

    $splitter->addPane($topPane);

    $ajaxPane = new \Kendo\UI\SplitterPane();
    $ajaxPane->attr('id', 'ajax_pane')
             ->contentUrl('../../content/web/splitter/ajax/ajaxContent1.html')
             ->collapsible(false);
    $splitter->addPane($ajaxPane);

    $bottomPane = new \Kendo\UI\SplitterPane();
    $bottomPane->attr('id', 'top_pane')
               ->content('<p>Bottom pane</p>')
               ->collapsible(true)
               ->size('20%');
    $splitter->addPane($bottomPane);

    echo $splitter->render();
?>

<script>
    function onResize(e) {
        kendoConsole.log("Resized :: Splitter <b>#" + this.element[0].id + "</b>");
    }

    function onExpand(e) {
        kendoConsole.log("Expanded :: Pane <b>#" + e.pane.id + "</b> from splitter <b>#" + this.element[0].id + "</b> expanded");
    }

    function onCollapse(e) {
        kendoConsole.log("Collapsed :: Pane <b>#" + e.pane.id + "</b> from splitter <b>#" + this.element[0].id + "</b> collapsed");
    }

    function onContentLoad(e) {
        kendoConsole.log("Content loaded in <b>#"+ e.pane.id +
            "</b> and starts with <b>" + $(e.pane).text().substr(0, 20) + "...</b>");
    }
</script>

<div class="console"></div>

<?php require_once '../../include/footer.php'; ?>
