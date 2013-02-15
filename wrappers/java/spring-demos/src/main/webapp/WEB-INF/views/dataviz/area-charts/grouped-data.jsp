<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>

<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<c:url value="/dataviz/area-charts/grouped-data/read" var="readUrl" />

<demo:header />
     <div class="chart-wrapper">
         <kendo:chart name="chart">
             <kendo:chart-title text="Stock Prices" />
             <kendo:chart-legend position="bottom" />
             <kendo:dataSource>
                 <kendo:dataSource-transport>
                     <kendo:dataSource-transport-read url="${readUrl}" dataType="json" type="POST" contentType="application/json" />
                 </kendo:dataSource-transport>
                 <kendo:dataSource-group>
                     <kendo:dataSource-groupItem field="symbol" />
                 </kendo:dataSource-group>
                 <kendo:dataSource-sort>
                     <kendo:dataSource-sortItem field="date" dir="asc" />
                 </kendo:dataSource-sort>
                 <kendo:dataSource-schema>
                    <kendo:dataSource-schema-model>
                        <kendo:dataSource-schema-model-fields>
                            <kendo:dataSource-schema-model-field name="date" type="date" />
                        </kendo:dataSource-schema-model-fields>
                    </kendo:dataSource-schema-model>
                 </kendo:dataSource-schema>
             </kendo:dataSource>
             <kendo:chart-series>
                <kendo:chart-seriesItem type="area" field="close" name="close" groupNameTemplate="#= group.value # (#= series.name #)" />
             </kendo:chart-series>
              <kendo:chart-categoryAxis>
                <kendo:chart-categoryAxisItem field="date">
                    <kendo:chart-categoryAxisItem-labels format="MMM" />
                    <kendo:chart-categoryAxisItem-line visible="false"/>
                    <kendo:chart-categoryAxisItem-majorGridLines visible="false"/>
                </kendo:chart-categoryAxisItem>
             </kendo:chart-categoryAxis>
             <kendo:chart-valueAxis>
                <kendo:chart-valueAxisItem max="700">
                    <kendo:chart-valueAxisItem-labels format="\${0}" step="2" skip="2" />
                    <kendo:chart-valueAxisItem-line visible="false"/>
                </kendo:chart-valueAxisItem>
             </kendo:chart-valueAxis>
         </kendo:chart>
     </div>
<demo:footer />
