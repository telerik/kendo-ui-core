<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>
<demo:header />
     <div class="chart-wrapper">
     	 <h2>Website optimization stats</h2>
     	 
         <kendo:chart name="before">
             <kendo:chart-title text="Before optimization" align="left">
             	<kendo:chart-title-margin top="10" bottom="10" left="-5" />
             </kendo:chart-title>
             <kendo:chart-legend visible="false" />
             <kendo:dataSource data="${dataBefore}" />
             <kendo:chart-series>
                <kendo:chart-seriesItem type="funnel" field="visitors" categoryField="description" 
                	dynamicSlope="true" dynamicHeight="false">
                    <kendo:chart-seriesItem-labels color="black" visible="true" background="transparent"
                    	template="#= dataItem.description #: #= value#" />
                </kendo:chart-seriesItem>
             </kendo:chart-series>
             <kendo:chart-tooltip visible="true" template="#= dataItem.description # #= kendo.format('{0:p}',data.value/dataItem.parent()[0].visitors)#" />
         </kendo:chart>
         
         <kendo:chart name="after">
             <kendo:chart-title text="After optimization" align="left">
             	<kendo:chart-title-margin top="10" bottom="10" left="-5" />
             </kendo:chart-title>
             <kendo:chart-legend visible="false" />
             <kendo:dataSource data="${dataAfter}" />
             <kendo:chart-series>
                <kendo:chart-seriesItem type="funnel" field="visitors" categoryField="description" 
                	dynamicSlope="true" dynamicHeight="false">
                    <kendo:chart-seriesItem-labels color="black" visible="true" background="transparent"
                    	template="#= dataItem.description #: #= value#" />
                </kendo:chart-seriesItem>
             </kendo:chart-series>
             <kendo:chart-tooltip visible="true" template="#= dataItem.description # #= kendo.format('{0:p}',data.value/dataItem.parent()[0].visitors)#" />
         </kendo:chart>
    </div>

    <style scoped>
        .chart-wrapper {
            height: 400px;
        }
        .chart-wrapper h2 {
            padding: 20px 0 0 25px;
        }
        .chart-wrapper .k-chart {
            display: inline-block;
            width: 290px;
            height: 350px;
            margin: 0 30px 0 20px;
        }
    </style>
<demo:footer />
