<?php

require_once '../../include/header.php';
require_once '../../lib/Kendo/Autoload.php';

?>

<div class="configuration k-widget k-header">
    <span class="configHead">API Functions</span>
    <ul class="options">
        <li>
            <input type="text" value="0" id="selectIndex" class="k-textbox"/> <button class="selectItem k-button">Select</button>
        </li>
        <li>
            <button class="toggleItem k-button">Enable/Disable</button>
        </li>
        <li>
            <button class="triggerItem k-button">Expand/Collapse</button>
        </li>
        <li>
            <button class="removeItem k-button">Remove</button>
        </li>
        <li>
            <input type="text" value="Item" id="appendText" class="k-textbox"/> <button class="appendItem k-button">Append</button>
        </li>
        <li>
            <input type="text" value="Item" id="beforeText" class="k-textbox"/> <button class="beforeItem k-button">Insert Before</button>
        </li>
        <li>
            <input type="text" value="Item" id="afterText" class="k-textbox"/> <button class="afterItem k-button">Insert After</button>
        </li>
    </ul>
</div>

<?php
    $panelbar = new \Kendo\UI\PanelBar('panelbar');

    $panelbar->attr('style', 'margin-right: 220px;');

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

    $fourth = new \Kendo\UI\PanelBarItem("Fourth Item");
    $fourth->addItem(
        new \Kendo\UI\PanelBarItem("Sub Item 1"),
        new \Kendo\UI\PanelBarItem("Sub Item 2"),
        new \Kendo\UI\PanelBarItem("Sub Item 3"),
        new \Kendo\UI\PanelBarItem("Sub Item 4")
    );
    $panelbar->addItem($fourth);

    $fifth = new \Kendo\UI\PanelBarItem("Fifth Item");
    $fifth->addItem(
        new \Kendo\UI\PanelBarItem("Sub Item 1"),
        new \Kendo\UI\PanelBarItem("Sub Item 2"),
        new \Kendo\UI\PanelBarItem("Sub Item 3"),
        new \Kendo\UI\PanelBarItem("Sub Item 4")
    );
    $panelbar->addItem($fifth);

    echo $panelbar->render();
?>

<script>
     $(document).ready(function() {
        var panelBar = $("#panelbar").data("kendoPanelBar");

        var getItem = function (target) {
                var itemIndexes = target.val().split(/[.,]/),
                    rootItem = panelBar.element.children("li").eq(itemIndexes[0]);

                return itemIndexes.length > 1 ?
                    rootItem.find(".k-group > .k-item").eq(itemIndexes[1]) :
                    rootItem;
            },
            select = function (e) {
                if (e.type != "keypress" || kendo.keys.ENTER == e.keyCode)
                    panelBar.select(getItem($("#selectIndex")));
            },
            append = function (e) {
                if (e.type != "keypress" || kendo.keys.ENTER == e.keyCode)
                    panelBar.append({
                            text: $("#appendText").val()
                        }, panelBar.select());
            },
            before = function (e) {
                if (e.type != "keypress" || kendo.keys.ENTER == e.keyCode)
                    panelBar.insertBefore({
                        text: $("#beforeText").val()
                    }, panelBar.select());
            },
            after = function (e) {
                if (e.type != "keypress" || kendo.keys.ENTER == e.keyCode)
                    panelBar.insertAfter({
                        text: $("#afterText").val()
                    }, panelBar.select());
            };

        $(".selectItem").click(select);
        $("#selectIndex").keypress(select);

        $(".appendItem").click(append);
        $("#appendText").keypress(append);

        $(".beforeItem").click(before);
        $("#beforeText").keypress(before);

        $(".afterItem").click(after);
        $("#afterText").keypress(after);

        $(".toggleItem").click(function (e) {
            var item = panelBar.select();
            panelBar.enable(item, item.hasClass("k-state-disabled"));
        });

        $(".triggerItem").click(function (e) {
            var item = panelBar.select();

            if (item.hasClass("k-state-active")) {
                panelBar.collapse(item);
            } else {
                panelBar.expand(item);
            }
        });

        $(".removeItem").click(function (e) {
            panelBar.remove(panelBar.select());
        });

    });
</script>
<style scoped>
    .configuration .k-textbox {
        width: 40px;
    }
</style>

<?php require_once '../../include/footer.php'; ?>
