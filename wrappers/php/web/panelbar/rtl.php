<?php

require_once '../../include/header.php';
require_once '../../lib/Kendo/Autoload.php';

?>

<div class="k-rtl">

<?php
    $panelbar = new \Kendo\UI\PanelBar('panelbar');

    $first = new \Kendo\UI\PanelBarItem("First Item");
    $first->expanded(true);
    $first->addItem(
        new \Kendo\UI\PanelBarItem("Sub Item 1"),
        new \Kendo\UI\PanelBarItem("Sub Item 2"),
        new \Kendo\UI\PanelBarItem("Sub Item 3"),
        new \Kendo\UI\PanelBarItem("Sub Item 4")
    );
    $panelbar->addItem($first);

    $second = new \Kendo\UI\PanelBarItem("Second Item");
    $second->addItem(
        new \Kendo\UI\PanelBarItem("Sub Item 1"),
        new \Kendo\UI\PanelBarItem("Sub Item 2"),
        new \Kendo\UI\PanelBarItem("Sub Item 3"),
        new \Kendo\UI\PanelBarItem("Sub Item 4")
    );
    $panelbar->addItem($second);

    $third = new \Kendo\UI\PanelBarItem("Third Item");
    $third->addItem(
        new \Kendo\UI\PanelBarItem("Sub Item 1"),
        new \Kendo\UI\PanelBarItem("Sub Item 2"),
        new \Kendo\UI\PanelBarItem("Sub Item 3"),
        new \Kendo\UI\PanelBarItem("Sub Item 4")
    );
    $panelbar->addItem($third);

    echo $panelbar->render();
?>

</div>

<?php require_once '../../include/footer.php'; ?>
