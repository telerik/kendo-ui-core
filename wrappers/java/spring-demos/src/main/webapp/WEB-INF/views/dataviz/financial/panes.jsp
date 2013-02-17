<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>

<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<c:url value="/dataviz/financial/index/read" var="readUrl" />

<demo:header />
     <kendo:stockChart name="stockChart" dateField="date">
        <kendo:dataSource>
             <kendo:dataSource-transport>
                 <kendo:dataSource-transport-read url="${readUrl}" dataType="json" type="POST" contentType="application/json" />
             </kendo:dataSource-transport>
        </kendo:dataSource>
        <kendo:stockChart-title text="The Boeing Company (NYSE:BA)" />
        <kendo:stockChart-panes>
            <kendo:stockChart-pane title="Value" />
            <kendo:stockChart-pane name="volumePane" title="Volume" height="150" />
        </kendo:stockChart-panes>
        <kendo:stockChart-categoryAxis>
            <kendo:stockChart-categoryAxisItem pane="volumePane" />
        </kendo:stockChart-categoryAxis>
        <kendo:stockChart-valueAxis>
            <kendo:stockChart-valueAxisItem>
            	<kendo:stockChart-valueAxisItem-line visible="false"/>
            </kendo:stockChart-valueAxisItem>
            <kendo:stockChart-valueAxisItem name="volumeAxis" pane="volumePane" visible="false" />
        </kendo:stockChart-valueAxis>
        <kendo:stockChart-series>
            <kendo:stockChart-seriesItem type="candlestick" openField="open" highField="high" lowField="low" closeField="close" />
            <kendo:stockChart-seriesItem type="column" field="volume" axis="volumeAxis">
                <kendo:stockChart-seriesItem-tooltip format="{0:C0}" />
            </kendo:stockChart-seriesItem>
        </kendo:stockChart-series>
        <kendo:stockChart-navigator>
            <kendo:stockChart-navigator-series>
                <kendo:stockChart-navigator-seriesItem type="area" field="close" />
            </kendo:stockChart-navigator-series>
            <kendo:stockChart-navigator-select from="${from}" to="${to}" />
        </kendo:stockChart-navigator>
     </kendo:stockChart>
     <style>
	    #stockChart {
	    	height: 500px;
	    }
	</style>
<demo:footer />
