<?php

require_once '../../include/header.php';
require_once '../../lib/Kendo/Autoload.php';

?>

<?php
    $tabstrip = new \Kendo\UI\TabStrip('tabstrip');
    $tabstrip->attr("style", "margin-right: 220px;");

    // attach events
    $tabstrip
        ->select("onSelect")
        ->activate("onActivate")
        ->contentLoad("onContentLoad")
        ->error("onError");

    // add items
    $item = new \Kendo\UI\TabStripItem();
    $item->text("First Tab")
        ->selected(true)
        ->startContent();
?>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer felis libero, lobortis ac rutrum quis, varius a velit. Donec lacus erat, cursus sed porta quis, adipiscing et ligula. Duis volutpat, sem pharetra accumsan pharetra, mi ligula cursus felis, ac aliquet leo diam eget risus. Integer facilisis, justo cursus venenatis vehicula, massa nisl tempor sem, in ullamcorper neque mauris in orci.</p>
<?php
    $item->endContent();
    $tabstrip->addItem($item);

    $item = new \Kendo\UI\TabStripItem();
    $item->text("Second Tab")
        ->startContent();
?>
    <p>Ut orci ligula, varius ac consequat in, rhoncus in dolor. Mauris pulvinar molestie accumsan. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Aenean velit ligula, pharetra quis aliquam sed, scelerisque sed sapien. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Aliquam dui mi, vulputate vitae pulvinar ac, condimentum sed eros.</p>
<?php
    $item->endContent();
    $tabstrip->addItem($item);

    $item = new \Kendo\UI\TabStripItem();
    $item->text("Third Tab")
        ->startContent();
?>
    <p>Aliquam at nisl quis est adipiscing bibendum. Nam malesuada eros facilisis arcu vulputate at aliquam nunc tempor. In commodo scelerisque enim, eget sodales lorem condimentum rutrum. Phasellus sem metus, ultricies at commodo in, tristique non est. Morbi vel mauris eget mauris commodo elementum. Nam eget libero lacus, ut sollicitudin ante. Nam odio quam, suscipit a fringilla eget, dignissim nec arcu. Donec tristique arcu ut sapien elementum pellentesque.</p>
<?php
    $item->endContent();
    $tabstrip->addItem($item);

    $item = new \Kendo\UI\TabStripItem();
    $item->text("Fourth Tab")
        ->startContent();
?>
    <p>Maecenas vitae eros vel enim molestie cursus. Proin ut lacinia ipsum. Nam at elit arcu, at porttitor ipsum. Praesent id viverra lorem. Nam lacinia elementum fermentum. Nulla facilisi. Nulla bibendum erat sed sem interdum suscipit. Vestibulum eget molestie leo. Aliquam erat volutpat. Ut sed nulla libero. Suspendisse id euismod quam. Aliquam interdum turpis vitae purus consectetur in pulvinar libero accumsan. In id augue dui, ac volutpat ante. Suspendisse purus est, ullamcorper id bibendum sed, placerat id leo.</p>
<?php
    $item->endContent();
    $tabstrip->addItem($item);

    $item = new \Kendo\UI\TabStripItem();
    $item->text("Fifth Tab")
        ->startContent();
?>
    <p>Fusce nec mauris enim, non pharetra neque. Etiam elementum nunc ut velit fermentum sed porta eros dignissim. Duis at nisl eros. Integer arcu nisl, accumsan non molestie at, elementum nec odio. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque arcu odio, aliquam vel viverra ac, varius at sapien. Nullam elementum nulla non libero interdum vestibulum at in lacus. Curabitur ac magna ac lacus dapibus convallis non at turpis.</p>
<?php
    $item->endContent();
    $tabstrip->addItem($item);

    $ajaxTab = new \Kendo\UI\TabStripItem();
    $ajaxTab
        ->text("Ajax Tab")
        ->contentUrl("../../content/web/tabstrip/ajax/ajaxContent1.html");
    $tabstrip->addItem($ajaxTab);

    $errorTab = new \Kendo\UI\TabStripItem();
    $errorTab
        ->text("Error Tab")
        ->contentUrl("error.html");
    $tabstrip->addItem($errorTab);

    // set animation
    $animation = new \Kendo\UI\TabStripAnimation();
    $openAnimation = new \Kendo\UI\TabStripAnimationOpen();
    $openAnimation->effects("fadeIn");
    $animation->open($openAnimation);

    $tabstrip->animation($animation);

    echo $tabstrip->render();
?>

<script>
    function onSelect(e) {
        kendoConsole.log("Selected: " + $(e.item).find("> .k-link").text());
    }

    function onActivate(e) {
        kendoConsole.log("Activated: " + $(e.item).find("> .k-link").text());
    }

    function onContentLoad(e) {
        kendoConsole.log("Content loaded in <b>"+ $(e.item).find("> .k-link").text() + "</b> and starts with <b>" + $(e.contentElement).text().substr(0, 20) + "...</b>");
    }

    function onError(e) {
        kendoConsole.error("Loading failed with " + e.xhr.statusText + " " + e.xhr.status);
    }
</script>

<div class="console"></div>

<?php require_once '../../include/footer.php'; ?>


