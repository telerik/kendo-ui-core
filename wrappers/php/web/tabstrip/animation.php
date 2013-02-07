<?php

require_once '../../include/header.php';
require_once '../../lib/Kendo/Autoload.php';

?>

<div class="configuration k-widget k-header">
    <span class="configHead">Animation Settings</span>
    <ul class="options">
        <li>
            <input id="toggle" name="animation" type="radio" /> <label for="toggle">toggle animation</label>
        </li>
        <li>
            <input id="expand" name="animation" type="radio" checked="checked" /> <label for="expand">expand animation</label>
        </li>
        <li>
            <input id="opacity" type="checkbox" checked="checked" /> <label for="opacity">animate opacity</label>
        </li>
    </ul>
</div>

<?php
    $tabstrip = new \Kendo\UI\TabStrip('tabstrip');
    $tabstrip->attr("style", "margin-right: 220px;");

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

    // set animation
    $animation = new \Kendo\UI\TabStripAnimation();
    $openAnimation = new \Kendo\UI\TabStripAnimationOpen();
    $openAnimation->effects("fadeIn");
    $animation->open($openAnimation);

    $tabstrip->animation($animation);

    echo $tabstrip->render();
?>

<script>
    var original = $("#tabstrip").clone(true);
    original.find(".k-state-active").removeClass("k-state-active");

    $(document).ready(function() {

        var getEffects = function () {
            return (($("#expand")[0].checked ? "expand:vertical " : "") + ($("#opacity")[0].checked ? "fadeIn" : "")) || false;
        };

        var initTabStrip = function () {
            $("#tabstrip").kendoTabStrip({ animation: { open: { effects: getEffects() } } });
        };

        $(".configuration input").change( function() {
            var tabStrip = $("#tabstrip"),
                selectedIndex = tabStrip.data("kendoTabStrip").select().index(),
                clone = original.clone(true);

            clone.children("ul")
                 .children("li")
                 .eq(selectedIndex)
                 .addClass("k-state-active")
                 .end();

            tabStrip.replaceWith(clone);

            initTabStrip();
        });
    });
</script>

<?php require_once '../../include/footer.php'; ?>


