<?php

require_once '../include/header.php';
require_once '../lib/Kendo/Autoload.php';

?>

<?php
    $menu = new \Kendo\UI\Menu('menu');

    $menu->attr('style', 'margin-bottom: 200px');

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

<div id="context-target">
    Context Menu Target
</div>

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
                ->select('onSelect')
                ->open('onOpen')
                ->close('onClose')
                ->activate('onActivate')
                ->deactivate('onDeactivate');

    echo $contextMenu->render();

?>

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

<div class="console"></div>

<style scoped>
    #context-target
    {
        height: 50px;
        border: 1px solid red;
        margin-bottom: 20px;
    }
</style>

<?php require_once '../include/footer.php'; ?>

