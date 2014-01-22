<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<demo:header />

<kendo:editor name="topEditor" tag="div">
    <kendo:editor-value>
        &lt;h2&gt;
            Comprehensive &lt;br /&gt;HTML5/JavaScript framework &lt;br /&gt;
            for modern web and mobile app development
        &lt;/h2&gt;
        &lt;p&gt;
            Kendo UI is everything professional developers need
            to build HTML5 sites and mobile apps. Today, productivity
            of an average HTML/jQuery developer is hampered by
            assembling a Frankenstein framework of disparate
            JavaScript libraries and plug-ins.
        &lt;/p&gt;
        &lt;p&gt;
            Kendo UI has it all: rich jQuery-based widgets,
            a simple and consistent programming interface,
            a rock-solid DataSource, validation, internationalization,
            a MVVM framework, themes, templates and the list goes on.
        &lt;/p&gt;
    </kendo:editor-value>
</kendo:editor>

<kendo:editor name="leftColumn" tag="div">
    <kendo:editor-value>
        &lt;img src=&quot;../../content/web/editor/web.png&quot; /&gt;
        &lt;h3&gt;Web app &lt;br /&gt;development &lt;br /&gt;framework&lt;/h3&gt;
        &lt;p&gt;
            Kendo UI Web provides you with a simple and consistent
            programming interface, polished and innovative
            UI widgets for the web, powered by jQuery, HTML5 &amp;amp; CSS3,
            a MVVM framework, themes which are easily customizable to
            fit the widgets to your web application, templates
            and much more. All that's left to do is to develop modern
            desktop and mobile web applications by leveraging your web
            development skills while unlocking the power of JavaScript,
            HTML5 &amp;amp; CSS3, and using the intuitive &lt;br /&gt;
            &lt;a href=&quot;http://www.telerik.com/kendo-ui-web&quot; title=&quot;Kendo UI Web&quot;&gt;Kendo UI Web&lt;/a&gt;.
        &lt;/p&gt;
    </kendo:editor-value>
</kendo:editor>

<kendo:editor name="centerColumn" tag="div">
    <kendo:editor-value>
        &lt;img src=&quot;../../content/web/editor/mobile.png&quot; /&gt;
        &lt;h3&gt;Mobile app &lt;br /&gt;development &lt;br /&gt;framework&lt;/h3&gt;
        &lt;p&gt;
            Build native-like mobile apps for iPhone, Android and Blackberry,
            and deliver unmatched user experience without any extra coding.
        &lt;/p&gt;
        &lt;p&gt;
            &lt;a href=&quot;http://www.telerik.com/kendo-ui-mobile&quot; title=&quot;Kendo UI Mobile&quot;&gt;Kendo UI Mobile&lt;/a&gt;
            is packed with easy-to-use jQuery-based widgets and built-in
            rich components for your fast mobile application development.
        &lt;/p&gt;
    </kendo:editor-value>
</kendo:editor>

<kendo:editor name="rightColumn" tag="div">
    <kendo:editor-value>
        &lt;img src=&quot;../../content/web/editor/dataviz.png&quot; /&gt;
        &lt;h3&gt;Rich UI widgets &lt;br /&gt;for interactive &lt;br /&gt;data visualization &lt;/h3&gt;
        &lt;p&gt;
            Create interactive data visualization with HTML5 and JavaScript,
            build rich web apps that look and behave native on any platform or device.
            Kendo UI DataViz uses SVG, and brings you a collection of UI widgets,
            including jQuery charts, gauges, and more.
        &lt;/p&gt;
        &lt;p&gt;
            &lt;a href=&quot;http://www.telerik.com/kendo-ui-dataviz&quot; title=&quot;Kendo UI DataViz&quot;&gt;Kendo UI DataViz&lt;/a&gt;
            uses automatic hardware acceleration for all animations and rendering,
            maximizing performance and minimizing the impact on CPU resources.
        &lt;/p&gt;
    </kendo:editor-value>
</kendo:editor>

<style scoped>
    .demo-section {
        padding: 40px;
    }

    #example .configuration {
        max-width: none;
        margin: 0;
        float: none;
    }

    .configuration a {
        color: inherit;
    }

    .configuration a:hover {
        text-decoration: none;
    }

    .k-editor-inline {
        margin: 0;
        padding: 21px 21px 11px;
        border-width: 0;
        box-shadow: none;
        background: none;
    }

    .k-editor-inline.k-state-active {
        border-width: 1px;
        padding: 20px 20px 10px;
        background: none;
    }

    #topEditor h2, .column h3 {
        font-size: 24px;
        color: #e15613;
        font-family: "Droid Sans",DroidSansWeb,"Segoe UI","Lucida Sans Unicode",Arial,Helvetica,sans-serif;
    }

    .k-editor-inline p {
        font-size: 13px;
    }

    .column {
        display: inline-block;
        vertical-align: top;
        width: 170px;
    }

    .column a {
        color: #e15613;
    }

    .column h3 {
        padding-top: 10px;
        font-size: 15px;
    }

    .k-table {
        border-spacing: 0;
        border-collapse: collapse;
        border: 1px solid #999;
        width: 100%;
    }

    .k-table td, .k-table th {
        border: 1px solid #999;
        padding: 3px;
    }
</style>

<demo:footer />
