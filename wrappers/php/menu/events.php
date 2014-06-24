<?php

require_once '../include/header.php';
require_once '../lib/Kendo/Autoload.php';

?>

<div class="demo-section k-header">
    <h4>Menu</h4>
<?php
    $menu = new \Kendo\UI\Menu('menu');

    $first = new \Kendo\UI\MenuItem("First Item");
    $first->addItem(
        new \Kendo\UI\MenuItem("Sub Item 1"),
        new \Kendo\UI\MenuItem("Sub Item 2"),
        new \Kendo\UI\MenuItem("Sub Item 3"),
        new \Kendo\UI\MenuItem("Sub Item 4")
    );
    $menu->addItem($first);

    $second = new \Kendo\UI\MenuItem("Second Item");
    $second->addItem(
        new \Kendo\UI\MenuItem("Sub Item 1"),
        new \Kendo\UI\MenuItem("Sub Item 2"),
        new \Kendo\UI\MenuItem("Sub Item 3"),
        new \Kendo\UI\MenuItem("Sub Item 4")
    );
    $menu->addItem($second);

    $third = new \Kendo\UI\MenuItem("Third Item");
    $third->addItem(
        new \Kendo\UI\MenuItem("Sub Item 1"),
        new \Kendo\UI\MenuItem("Sub Item 2"),
        new \Kendo\UI\MenuItem("Sub Item 3"),
        new \Kendo\UI\MenuItem("Sub Item 4")
    );
    $menu->addItem($third);

    $fourth = new \Kendo\UI\MenuItem("Fourth Item");
    $fourth->addItem(
        new \Kendo\UI\MenuItem("Sub Item 1"),
        new \Kendo\UI\MenuItem("Sub Item 2"),
        new \Kendo\UI\MenuItem("Sub Item 3"),
        new \Kendo\UI\MenuItem("Sub Item 4")
    );
    $menu->addItem($fourth);

    $fifth = new \Kendo\UI\MenuItem("Fifth Item");
    $fifth->addItem(
        new \Kendo\UI\MenuItem("Sub Item 1"),
        new \Kendo\UI\MenuItem("Sub Item 2"),
        new \Kendo\UI\MenuItem("Sub Item 3"),
        new \Kendo\UI\MenuItem("Sub Item 4")
    );
    $menu->addItem($fifth);

    $menu->select('onSelect')
         ->open('onOpen')
         ->close('onClose')
         ->activate('onActivate')
         ->deactivate('onDeactivate');

    echo $menu->render();
?>
</div>
<div class="demo-section k-header">
    <h4>Context Menu</h4>
<?php
    $contextMenu = new \Kendo\UI\ContextMenu('context-menu-events');

    $first = new \Kendo\UI\ContextMenuItem("Item 1");
    $first->addItem(
        new \Kendo\UI\ContextMenuItem("Sub Item 1"),
        new \Kendo\UI\ContextMenuItem("Sub Item 2"),
        new \Kendo\UI\ContextMenuItem("Sub Item 3"),
        new \Kendo\UI\ContextMenuItem("Sub Item 4")
    );
    $contextMenu->addItem($first);

    $second = new \Kendo\UI\ContextMenuItem("Item 2");
    $second->addItem(
        new \Kendo\UI\ContextMenuItem("Sub Item 1"),
        new \Kendo\UI\ContextMenuItem("Sub Item 2"),
        new \Kendo\UI\ContextMenuItem("Sub Item 3"),
        new \Kendo\UI\ContextMenuItem("Sub Item 4")
    );
    $contextMenu->addItem($second);

    $third = new \Kendo\UI\ContextMenuItem("Item 3");
    $third->addItem(
        new \Kendo\UI\ContextMenuItem("Sub Item 1"),
        new \Kendo\UI\ContextMenuItem("Sub Item 2"),
        new \Kendo\UI\ContextMenuItem("Sub Item 3"),
        new \Kendo\UI\ContextMenuItem("Sub Item 4")
    );
    $contextMenu->addItem($third);

    $contextMenu->target('#context-target')
                ->showOn('click')
                ->alignToAnchor(true)
                ->select('onSelect')
                ->open('onOpen')
                ->close('onClose')
                ->activate('onActivate')
                ->deactivate('onDeactivate');

    echo $contextMenu->render();
?>
    <p>A collection of <span id="context-target">Animation (?)</span> objects, used to change default animations. A value of false will disable all animations in the widget.</p>
</div>

<script>
    function onOpen(e) {
        kendoConsole.log("Opened: " + ($(e.item).children(".k-link").text() || "ContextMenu"));
    }

    function onClose(e) {
        kendoConsole.log("Closed: " + ($(e.item).children(".k-link").text() || "ContextMenu"));
    }

    function onSelect(e) {
        kendoConsole.log("Selected: " + $(e.item).children(".k-link").text());
    }

    function onActivate(e) {
        kendoConsole.log("Activated: " + ($(e.item).children(".k-link").text() || "ContextMenu"));
    }

    function onDeactivate(e) {
        kendoConsole.log("Deactivated: " + ($(e.item).children(".k-link").text() || "ContextMenu"));
    }
</script>

<div class="box">
    <h4>Console log</h4>
    <div class="console"></div>
</div>

<style scoped>
    .demo-section .box-col li {
        margin-bottom: 0;
    }
    #context-target {
        cursor: pointer;
        color: red;
    }
    #context-target:hover {
        text-decoration: underline;
    }
</style>

<?php require_once '../include/footer.php'; ?>

