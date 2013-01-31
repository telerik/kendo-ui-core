<?php

require_once '../../include/header.php';
require_once '../../lib/Kendo/Autoload.php';

    $panelbar = new \Kendo\UI\PanelBar('panelbar');

    $panelbar->attr('style', 'width: 250px; margin: 20px auto;')
             ->expandMode("single");

    $metallica = new \Kendo\UI\PanelBarItem("Metallica - Master of Puppets 1986");
    $metallica->expanded(true);
    $metallica->addItem(
        new \Kendo\UI\PanelBarItem("Battery"),
        new \Kendo\UI\PanelBarItem("Master of Puppets"),
        new \Kendo\UI\PanelBarItem("The Thing That Should Not Be"),
        new \Kendo\UI\PanelBarItem("Welcome Home (Sanitarium)"),
        new \Kendo\UI\PanelBarItem("Disposable Heroes"),
        new \Kendo\UI\PanelBarItem("Leper Messiah"),
        new \Kendo\UI\PanelBarItem("Orion (Instrumental)"),
        new \Kendo\UI\PanelBarItem("Damage, Inc.")
    );
    $panelbar->addItem($metallica);

    $ironmaiden = new \Kendo\UI\PanelBarItem("Iron Maiden - Brave New World 2000");
    $ironmaiden->addItem(
        new \Kendo\UI\PanelBarItem("The Wicker Man"),
        new \Kendo\UI\PanelBarItem("Ghost Of The Navigator"),
        new \Kendo\UI\PanelBarItem("Brave New World"),
        new \Kendo\UI\PanelBarItem("Blood Brothers"),
        new \Kendo\UI\PanelBarItem("The Mercenary"),
        new \Kendo\UI\PanelBarItem("Dream Of Mirrors"),
        new \Kendo\UI\PanelBarItem("The Fallen Angel"),
        new \Kendo\UI\PanelBarItem("The Nomad"),
        new \Kendo\UI\PanelBarItem("Out Of The Silent Planet"),
        new \Kendo\UI\PanelBarItem("The Thin Line Between Love And Hate")
    );
    $panelbar->addItem($ironmaiden);

    $empty = new \Kendo\UI\PanelBarItem("Empty Item");
    $panelbar->addItem($empty);

    $ajax = new \Kendo\UI\PanelBarItem("Ajax Item");
    $ajax->contentUrl("../../content/web/panelbar/ajax/ajaxContent1.html");
    $panelbar->addItem($ajax);

    $error = new \Kendo\UI\PanelBarItem("Error Item");
    $error->contentUrl("error.html");
    $panelbar->addItem($error);

    $panelbar
        ->select("onSelect")
        ->expand("onExpand")
        ->expand("onExpand")
        ->collapse("onCollapse")
        ->activate("onActivate")
        ->contentLoad("onContentLoad")
        ->error("onError");

    echo $panelbar->render();
?>


<script>
    function onSelect(e) {
        kendoConsole.log("Select: " + $(e.item).find("> .k-link").text());
    }

    function onExpand(e) {
        kendoConsole.log("Expand: " + $(e.item).find("> .k-link").text());
    }

    function onCollapse(e) {
        kendoConsole.log("Collapse: " + $(e.item).find("> .k-link").text());
    }

    function onActivate(e) {
        kendoConsole.log("Activate: " + $(e.item).find("> .k-link").text());
    }

    function onContentLoad(e) {
        kendoConsole.log("Content loaded in <b>"+ $(e.item).find("> .k-link").text() +
                         "</b> and starts with <b>" + $(e.contentElement).text().substr(0, 20) + "...</b>");
    }

    function onError(e) {
        kendoConsole.error("Loading failed with " + e.xhr.statusText + " " + e.xhr.status);
    }

</script>
<div class="console"></div>

<?php require_once '../../include/footer.php'; ?>
