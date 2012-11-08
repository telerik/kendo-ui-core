<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<demo:header />

<div class="configuration k-widget k-header" style="float:none;max-width:none;margin:0 0 2em;">
    <span class="infoHead">Information</span>
    <p>
        The following demo shows how to customize some of the native Editor tools (font size, font name and block format) by modifying the tools' item
        collections, as well as how to create completely custom tools.
    </p>
</div>

<kendo:editor name="editor" style="width:740px;height:440px">
    <kendo:editor-tools>
        <kendo:editor-tool name="custom" tooltip="Horizontal Rule">
            <kendo:editor-tool-exec>
                <script>
                function custom_tool_exec(e) {
                	var editor = $("#editor").data("kendoEditor");
                	
                	editor.exec("insertHTML", { value: "<hr />"});
                }
                </script>
            </kendo:editor-tool-exec>
        </kendo:editor-tool>
    </kendo:editor-tools>
    <kendo:editor-value>
         &lt;p&gt;
               &lt;img src="http://www.kendoui.com/Image/kendo-logo.png" alt="Editor for ASP.NET MVC logo" style="display:block;margin-left:auto;margin-right:auto;" /&gt;
            &lt;/p&gt;
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
                Read &lt;a href="http://www.kendoui.com/documentation/introduction.aspx"&gt;more details&lt;/a&gt; or send us your
                &lt;a href="http://www.kendoui.com/forums.aspx"&gt;feedback&lt;/a&gt;!
            &lt;/p&gt;
    </kendo:editor-value>
</kendo:editor>

<demo:footer />