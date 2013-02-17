<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>

<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<c:url value="/dataviz/financial/index/read" var="readUrl" />

<demo:header />
     <kendo:stockChart name="stockChart" dateField="date">
        <kendo:stockChart-title text="The Boeing Company (NYSE:BA)" />
        <kendo:dataSource>
             <kendo:dataSource-transport>
                 <kendo:dataSource-transport-read url="${readUrl}" dataType="json" type="POST" contentType="application/json" />
             </kendo:dataSource-transport>
        </kendo:dataSource>
        <kendo:stockChart-series>
            <kendo:stockChart-seriesItem type="candlestick" openField="open" highField="high" lowField="low" closeField="close" />
        </kendo:stockChart-series>
        <kendo:stockChart-navigator>
            <kendo:stockChart-navigator-series>
                <kendo:stockChart-navigator-seriesItem type="area" field="close" />
            </kendo:stockChart-navigator-series>
            <kendo:stockChart-navigator-select from="${from}" to="${to}" />
        </kendo:stockChart-navigator>
     </kendo:stockChart>
<demo:footer />
