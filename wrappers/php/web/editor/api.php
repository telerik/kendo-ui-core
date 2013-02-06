<?php

require_once '../../include/header.php';
require_once '../../lib/Kendo/Autoload.php';

?>

<div class="configuration k-widget k-header">
    <span class="configHead">Get value</span>
    <ul class="options">
        <li>
            <button id="get" class="k-button">Get value</button>
        </li>
    </ul>
    <span class="configTitle">Set value</span>
    <ul class="options">
        <li>
            <textarea id="value" style="width: 200px;" rows="4" cols="20">new value</textarea>
            <button id="set" class="k-button">Set value</button>
        </li>
    </ul>
</div>

<?php
    $editor = new \Kendo\UI\Editor('editor');

    $editor
        ->attr('style', 'width:490px;height:400px')
        ->startContent();
?>
    &lt;p&gt;&lt;img src=&quot;http://www.kendoui.com/Image/kendo-logo.png&quot; alt=&quot;Editor for ASP.NET MVC logo&quot; style=&quot;display:block;margin-left:auto;margin-right:auto;&quot; /&gt;&lt;/p&gt;
    &lt;p&gt;
        Kendo UI Editor allows your users to edit HTML in a familiar, user-friendly way.&lt;br /&gt;
        In this version, the Editor provides the core HTML editing engine, which includes basic text formatting, hyperlinks, lists,
        and image handling. The widget &lt;strong&gt;outputs identical HTML&lt;/strong&gt; across all major browsers, follows
        accessibility standards and provides API for content manipulation.
    &lt;/p&gt;
    &lt;p&gt;Features include:&lt;/p&gt;
    &lt;ul&gt;
        &lt;li&gt;Text formatting &amp; alignment&lt;/li&gt;
        &lt;li&gt;Bulleted and numbered lists&lt;/li&gt;
        &lt;li&gt;Hyperlink and image dialogs&lt;/li&gt;
        &lt;li&gt;Cross-browser support&lt;/li&gt;
        &lt;li&gt;Identical HTML output across browsers&lt;/li&gt;
        &lt;li&gt;Gracefully degrades to a &lt;code&gt;textarea&lt;/code&gt; when JavaScript is turned off&lt;/li&gt;
    &lt;/ul&gt;
    &lt;p&gt;
        Read &lt;a href=&quot;http://docs.kendoui.com&quot;&gt;more details&lt;/a&gt; or send us your
        &lt;a href=&quot;http://www.kendoui.com/forums.aspx&quot;&gt;feedback&lt;/a&gt;!
    &lt;/p&gt;

<?php
    $editor->endContent();

    echo $editor->render();
?>

<script>
    $(document).ready(function() {
        var editor = $("#editor").data("kendoEditor");

        var setValue = function () {
            editor.value($("#value").val());
        };

        $("#get").click(function() {
            alert(editor.value());
        });

        $("#set").click(setValue);
    });
</script>

<style scoped>
    .configuration {
        height: 376px;
        width: 200px;
        margin-bottom: -21px;
    }
    .configuration .console {
        background-color: transparent;
        border: 0;
        height: 342px;
        overflow: auto;
    }
</style>

<?php require_once '../../include/footer.php'; ?>

