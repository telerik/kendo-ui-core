<?php

require_once '../../include/header.php';
require_once '../../lib/Kendo/Autoload.php';

?>

<?php
    $treeview = new \Kendo\UI\TreeView('treeview');
    $treeview->attr('class', 'demo-section')
             ->attr('style', 'width: 200px');

    $treeview->dragAndDrop(true);

    // build DataSource
    $furniture = new \Kendo\UI\TreeViewItem('Furniture');
    $furniture->expanded(true);
    $furniture->addItem(
        new \Kendo\UI\TreeViewItem('Tables & Chairs'),
        new \Kendo\UI\TreeViewItem('Sofas'),
        new \Kendo\UI\TreeViewItem('Occasional Furniture'),
        new \Kendo\UI\TreeViewItem('Childerns Furniture'),
        new \Kendo\UI\TreeViewItem('Beds')
    );

    $decor = new \Kendo\UI\TreeViewItem('Decor');
    $decor->addItem(
        new \Kendo\UI\TreeViewItem('Bed Linen'),
        new \Kendo\UI\TreeViewItem('Throws'),
        new \Kendo\UI\TreeViewItem('Curtains & Blinds'),
        new \Kendo\UI\TreeViewItem('Rugs'),
        new \Kendo\UI\TreeViewItem('Carpets')
    );

    $storage = new \Kendo\UI\TreeViewItem('Storage');

    $dataSource = new \Kendo\Data\HierarchicalDataSource();

    $dataSource->data(array($furniture, $decor, $storage));

    $treeview->dataSource($dataSource);

    // attach client-side events
    $treeview->select("onSelect")
             ->collapse("onCollapse")
             ->expand("onExpand")
             ->dragStart("onDragStart")
             ->drag("onDrag")
             ->drop("onDrop")
             ->dragEnd("onDragEnd")
             ->navigate("onNavigate");

    echo $treeview->render();
?>

<script>
    function onSelect(e) {
        kendoConsole.log("Selected: " + this.text(e.node));
    }

    function onCollapse(e) {
        kendoConsole.log("Collapsing " + this.text(e.node));
    }

    function onExpand(e) {
        kendoConsole.log("Expanding " + this.text(e.node));
    }

    function onDragStart(e) {
        kendoConsole.log("Started dragging " + this.text(e.sourceNode));
    }

    function onDrag(e) {
        kendoConsole.log("Dragging " + this.text(e.sourceNode));
    }

    function onDrop(e) {
        kendoConsole.log(
        "Dropped " + this.text(e.sourceNode) +
        " (" + (e.valid ? "valid" : "invalid") + ")"
        );
    }

    function onDragEnd(e) {
        kendoConsole.log("Finished dragging " + this.text(e.sourceNode));
    }

    function onNavigate(e) {
        kendoConsole.log("Navigate " + this.text(e.node));
    }
</script>

<div class="console"></div>

<?php require_once '../../include/footer.php'; ?>
