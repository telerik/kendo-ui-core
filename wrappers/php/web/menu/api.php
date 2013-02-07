<?php

require_once '../../include/header.php';
require_once '../../lib/Kendo/Autoload.php';

?>

<div class="configuration k-widget k-header">
    <span class="configHead">API Functions</span>
    <ul class="options">
        <li>
            <input type="text" id="toggleIndex" class="k-textbox"/> <button class="toggleItem k-button">Enable/Disable</button>
        </li>
        <li>
            <input type="text" id="triggerIndex" class="k-textbox"/> <button class="triggerItem k-button">Open/Close</button>
        </li>
        <li>
            <input type="text" id="removeIndex" class="k-textbox"/> <button class="removeItem k-button">Remove</button>
        </li>
        <li>
            <input type="text" value="Item" id="appendText" class="k-textbox"/> <input type="text" value="0.0" id="appendIndex" class="k-textbox"/> <button class="appendItem k-button">Append</button>
        </li>
        <li>
            <input type="text" value="Item" id="beforeText" class="k-textbox"/> <input type="text" value="0" id="beforeIndex" class="k-textbox"/> <button class="beforeItem k-button">Before</button>
        </li>
        <li>
            <input type="text" value="Item" id="afterText" class="k-textbox"/> <input type="text" value="0" id="afterIndex" class="k-textbox"/> <button class="afterItem k-button">After</button>
        </li>
    </ul>
</div>

<?php
    $menu = new \Kendo\UI\Menu('menu');

    $menu->attr('style', 'margin-right: 220px');

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

    echo $menu->render();
?>

<script>
    $(document).ready(function() {
        var menu = $("#menu").data("kendoMenu");

        var getItem = function (target) {
                var itemIndexes = target.val().split(/[.,]/),
                    item = menu.element;

                if (itemIndexes[0] !== "") {
                    for (var i = 0, len = itemIndexes.length; i < len; i++) {
                        item = item.children("li").eq(itemIndexes[i]);
                        if (i < len-1) {
                            item = item.find("ul:first");
                        }
                    }
                }

                return item;
            },
            toggle = function (e) {
                if (e.type != "keypress" || kendo.keys.ENTER == e.keyCode) {
                    var item = getItem($("#toggleIndex"));
                    menu.enable(item, item.hasClass("k-state-disabled"));
                }
            },
            trigger =  function (e) {
                if (e.type != "keypress" || kendo.keys.ENTER == e.keyCode) {
                    var item = getItem($("#triggerIndex"));

                    if (item.hasClass("k-state-active"))
                        menu.close(item);
                    else
                        menu.open(item);
                }
            },
            remove = function (e) {
                if (e.type != "keypress" || kendo.keys.ENTER == e.keyCode)
                    menu.remove(getItem($("#removeIndex")));
            },
            append = function (e) {
                if (e.type != "keypress" || kendo.keys.ENTER == e.keyCode) {
                    menu.append({
                            text: $("#appendText").val()
                        }, getItem($("#appendIndex")));
                }
            },
            before = function (e) {
                if (e.type != "keypress" || kendo.keys.ENTER == e.keyCode) {
                    menu.insertBefore({
                            text: $("#beforeText").val()
                        }, getItem($("#beforeIndex")));
                }
            },
            after = function (e) {
                if (e.type != "keypress" || kendo.keys.ENTER == e.keyCode) {
                    menu.insertAfter({
                            text: $("#afterText").val()
                        }, getItem($("#afterIndex")));
                }
            };

        $(".toggleItem").click(toggle);
        $("#toggleIndex").keypress(toggle);

        $(".triggerItem").click(trigger);
        $("#triggerIndex").keypress(trigger);

        $(".removeItem").click(remove);
        $("#removeIndex").keypress(remove);

        $(".appendItem").click(append);
        $("#appendText,#appendIndex").keypress(append);

        $(".beforeItem").click(before);
        $("#beforeText,#beforeIndex").keypress(before);

        $(".afterItem").click(after);
        $("#afterText,#afterIndex").keypress(after);
    });
</script>
<style scoped>
    .configuration .k-textbox {
        width: 40px;
    }
</style>

<?php require_once '../../include/footer.php'; ?>

