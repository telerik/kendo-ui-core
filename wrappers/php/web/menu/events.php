<?php

require_once '../../include/header.php';
require_once '../../lib/Kendo/Autoload.php';

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
         ->close('onClose');

    echo $menu->render();
?>

<script>
    function onOpen(e) {
        kendoConsole.log("Opened: " + $(e.item).children(".k-link").text());
    }

    function onClose(e) {
        kendoConsole.log("Closed: " + $(e.item).children(".k-link").text());
    }

    function onSelect(e) {
        kendoConsole.log("Selected: " + $(e.item).children(".k-link").text());
    }
</script>

<div class="console"></div>

<?php require_once '../../include/footer.php'; ?>

