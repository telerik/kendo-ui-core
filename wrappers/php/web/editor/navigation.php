<?php

require_once '../../include/header.php';
require_once '../../lib/Kendo/Autoload.php';

?>

<?php
    $editor = new \Kendo\UI\Editor('editor');

    $editor
        ->attr('style', 'width:740px;height:240px')
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

<ul id="keyboard-nav" class="keyboard-legend">
    <li>
        <span class="button-preview">
            <span class="key-button">Tab</span>
        </span>
        <span class="button-descr">
            focuses next tool icon
        </span>
    </li>
    <li>
        <span class="button-preview">
            <span class="key-button wide rightAlign">Shift</span>
            +
            <span class="key-button">Tab</span>
        </span>
        <span class="button-descr">
            focuses previous tool icon
        </span>
    </li>
</ul>

<style scoped>
    #keyboard-nav
    {
        padding-top: 35px;
    }
</style>

<?php require_once '../../include/footer.php'; ?>

