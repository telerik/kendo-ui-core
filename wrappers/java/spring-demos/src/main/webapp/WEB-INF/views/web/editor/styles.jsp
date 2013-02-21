<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>

<demo:header />

<kendo:editor name="editor" stylesheets="<%= new String[]{request.getContextPath() + \"/resources/web/editor/editorStyles.css\"}%>" 
	style="width:740px;height:440px">
    <kendo:editor-tools>
   		 <kendo:editor-tool name="style">
	         <kendo:editor-tool-items>
	         	<kendo:editor-tool-item value="hlError" text="Highlight Error" />
	         	<kendo:editor-tool-item value="hlOK" text="Highlight OK" />
	         	<kendo:editor-tool-item value="inlineCode" text="Inline Code" />
	         </kendo:editor-tool-items>
         </kendo:editor-tool>     
    </kendo:editor-tools>
    <kendo:editor-value>
            <p>
               <img src="http://www.kendoui.com/Image/kendo-logo.png" alt="Editor for ASP.NET MVC logo" style="display:block;margin-left:auto;margin-right:auto;" />
            </p>
            <p>
                Kendo UI Editor allows your users to edit HTML in a familiar, user-friendly way.<br />
                In this version, the Editor provides the core HTML editing engine, which includes basic text formatting, hyperlinks, lists,
                and image handling. The widget <strong>outputs identical HTML</strong> across all major browsers, follows
                accessibility standards and provides API for content manipulation.
            </p>
            <p>Features include:</p>
            <ul>
                <li>Text formatting &amp; alignment</li>
                <li>Bulleted and numbered lists</li>
                <li>Hyperlink and image dialogs</li>
                <li>Cross-browser support</li>
                <li>Identical HTML output across browsers</li>
                <li>Gracefully degrades to a <code>textarea</code> when JavaScript is turned off</li>
            </ul>
            <p>
                Read <a href="http://www.kendoui.com/documentation/introduction.aspx">more details</a> or send us your
                <a href="http://www.kendoui.com/forums.aspx">feedback</a>!
            </p>
    </kendo:editor-value>
</kendo:editor>

<demo:footer />