<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<demo:header />

<kendo:editor name="editor" style="width:740px;height:440px">
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
    </kendo:editor-value>
</kendo:editor>

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

<demo:footer />