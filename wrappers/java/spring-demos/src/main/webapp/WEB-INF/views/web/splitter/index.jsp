<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>

<demo:header />

<kendo:splitter name="vertical">
    <kendo:splitter-panes>
        <kendo:splitter-pane collapsible="false" />
        <kendo:splitter-pane collapsible="false" size="100px" />
        <kendo:splitter-pane collapsible="false" resizable="false" size="100px" />
    </kendo:splitter-panes>
</kendo:splitter>

<demo:footer />