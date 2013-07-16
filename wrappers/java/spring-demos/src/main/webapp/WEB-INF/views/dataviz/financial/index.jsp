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
        <kendo:stockChart-categoryAxis>
        	<kendo:stockChart-categoryAxisItem>
        		<kendo:stockChart-categoryAxisItem-notes>
        			<kendo:stockChart-categoryAxisItem-notes-data>
        				<kendo:stockChart-categoryAxisItem-notes-dataItem value="2001/01/01" >
        					<kendo:stockChart-categoryAxisItem-notes-dataItem-label text="01" />
        				</kendo:stockChart-categoryAxisItem-notes-dataItem>
        				<kendo:stockChart-categoryAxisItem-notes-dataItem value="2002/01/01" >
        					<kendo:stockChart-categoryAxisItem-notes-dataItem-label text="02" />
        				</kendo:stockChart-categoryAxisItem-notes-dataItem>
        				<kendo:stockChart-categoryAxisItem-notes-dataItem value="2003/01/01" >
        					<kendo:stockChart-categoryAxisItem-notes-dataItem-label text="03" />
        				</kendo:stockChart-categoryAxisItem-notes-dataItem>
        				<kendo:stockChart-categoryAxisItem-notes-dataItem value="2004/01/01" >
        					<kendo:stockChart-categoryAxisItem-notes-dataItem-label text="04" />
        				</kendo:stockChart-categoryAxisItem-notes-dataItem>
        				<kendo:stockChart-categoryAxisItem-notes-dataItem value="2005/01/01" >
        					<kendo:stockChart-categoryAxisItem-notes-dataItem-label text="05" />
        				</kendo:stockChart-categoryAxisItem-notes-dataItem>
        				<kendo:stockChart-categoryAxisItem-notes-dataItem value="2006/01/01" >
        					<kendo:stockChart-categoryAxisItem-notes-dataItem-label text="06" />
        				</kendo:stockChart-categoryAxisItem-notes-dataItem>
        				<kendo:stockChart-categoryAxisItem-notes-dataItem value="2007/01/01" >
        					<kendo:stockChart-categoryAxisItem-notes-dataItem-label text="07" />
        				</kendo:stockChart-categoryAxisItem-notes-dataItem>
        				<kendo:stockChart-categoryAxisItem-notes-dataItem value="2008/01/01" >
        					<kendo:stockChart-categoryAxisItem-notes-dataItem-label text="08" />
        				</kendo:stockChart-categoryAxisItem-notes-dataItem>
        				<kendo:stockChart-categoryAxisItem-notes-dataItem value="2009/01/01" >
        					<kendo:stockChart-categoryAxisItem-notes-dataItem-label text="09" />
        				</kendo:stockChart-categoryAxisItem-notes-dataItem>
        				<kendo:stockChart-categoryAxisItem-notes-dataItem value="2010/01/01" >
        					<kendo:stockChart-categoryAxisItem-notes-dataItem-label text="10" />
        				</kendo:stockChart-categoryAxisItem-notes-dataItem>
        				<kendo:stockChart-categoryAxisItem-notes-dataItem value="2011/01/01" >
        					<kendo:stockChart-categoryAxisItem-notes-dataItem-label text="11" />
        				</kendo:stockChart-categoryAxisItem-notes-dataItem>
        				<kendo:stockChart-categoryAxisItem-notes-dataItem value="2012/01/01" >
        					<kendo:stockChart-categoryAxisItem-notes-dataItem-label text="12" />
        				</kendo:stockChart-categoryAxisItem-notes-dataItem>
        			</kendo:stockChart-categoryAxisItem-notes-data>
        		</kendo:stockChart-categoryAxisItem-notes>
        	</kendo:stockChart-categoryAxisItem>
        </kendo:stockChart-categoryAxis>
     </kendo:stockChart>
<demo:footer />
