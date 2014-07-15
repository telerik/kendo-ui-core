<?php

require_once '../include/header.php';
require_once '../lib/Kendo/Autoload.php';

?>

<div class="box">
    <p>Allowed file types for the Image browser are: jpg, jpeg, gif, png</p>
    <p>Allowed file types for the File browser for this demo are: txt, doc, docx, xls, xlsx, ppt, pptx, zip, rar, jpg, jpeg, gif, png</p>
</div>

<?php
    $editor = new \Kendo\UI\Editor('editor');

    $editor->addTool(
        "insertImage", "insertFile"
    );

    // configure image browser
    $imageBrowser = new \Kendo\UI\EditorImageBrowser();

    $imageBrowser_transport = new \Kendo\UI\EditorImageBrowserTransport();
    $imageBrowser_transport->thumbnailUrl('../lib/ImageBrowser.php?action=thumbnail');
    $imageBrowser_transport->uploadUrl('../lib/ImageBrowser.php?action=upload');
    $imageBrowser_transport->imageUrl('../lib/ImageBrowser.php?action=image&path={0}');

    $imageBrowser_transport->read('../lib/ImageBrowser.php?action=read');
    $imageBrowser_destroy = new \Kendo\UI\EditorImageBrowserTransportDestroy();
    $imageBrowser_destroy
        ->url('../lib/ImageBrowser.php?action=destroy')
        ->type('POST');
    $imageBrowser_transport->destroy($imageBrowser_destroy);
    $imageBrowser_create = new \Kendo\UI\EditorImageBrowserTransportCreate();
    $imageBrowser_create
        ->url('../lib/ImageBrowser.php?action=create')
        ->type('POST');
    $imageBrowser_transport->create($imageBrowser_create);
    $imageBrowser->transport($imageBrowser_transport);

    $editor->imageBrowser($imageBrowser);

    // configure file browser
    $fileBrowser = new \Kendo\UI\EditorFileBrowser();

    $fileBrowser_transport = new \Kendo\UI\EditorFileBrowserTransport();
    $fileBrowser_transport->uploadUrl('../lib/FileBrowser.php?action=upload');
    $fileBrowser_transport->fileUrl('../lib/FileBrowser.php?action=file&path={0}');

    $fileBrowser_transport->read('../lib/FileBrowser.php?action=read');
    $fileBrowser_destroy = new \Kendo\UI\EditorFileBrowserTransportDestroy();
    $fileBrowser_destroy
        ->url('../lib/FileBrowser.php?action=destroy')
        ->type('POST');
    $fileBrowser_transport->destroy($fileBrowser_destroy);
    $fileBrowser_create = new \Kendo\UI\EditorFileBrowserTransportCreate();
    $fileBrowser_create
        ->url('../lib/FileBrowser.php?action=create')
        ->type('POST');
    $fileBrowser_transport->create($fileBrowser_create);
    $fileBrowser->transport($fileBrowser_transport);

    $editor->fileBrowser($fileBrowser);

    // add content
    $editor
        ->attr('style', 'width:740px;height:440px')
        ->startContent();
?>
    &lt;p&gt;&lt;img src=&quot;../content/web/editor/kendo-ui-web.png&quot; alt=&quot;Editor for ASP.NET MVC logo&quot; style=&quot;display:block;margin-left:auto;margin-right:auto;&quot; /&gt;&lt;/p&gt;
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
        Read &lt;a href=&quot;http://docs.telerik.com/kendo-ui&quot;&gt;more details&lt;/a&gt; or send us your
        &lt;a href=&quot;http://www.telerik.com/forums&quot;&gt;feedback&lt;/a&gt;!
    &lt;/p&gt;

<?php
    $editor->endContent();

    echo $editor->render();
?>

<?php require_once '../include/footer.php'; ?>


