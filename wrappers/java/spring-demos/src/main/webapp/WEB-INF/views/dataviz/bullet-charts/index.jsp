<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>
<%@page import="java.util.HashMap"%>
<demo:header />
     <% 
      	HashMap<String, Object> padding = new HashMap<String, Object>();
      	padding.put("left", 0);
     %>
     <div class="chart-wrapper">
     <table class="history">
         <tr>
             <td class="item">mmHg</td>
             <td class="chart">
		         <kendo:chart name="chart-mmHg">
		             <kendo:chart-legend visible="false" />
		             <kendo:chart-series>
		                <kendo:chart-seriesItem type="bullet" data="<%= new double[][] { new double[] { 750, 762.5 }} %>" />
		             </kendo:chart-series>
		             <kendo:chart-chartArea margin="0">
		             </kendo:chart-chartArea>
		             <kendo:chart-valueAxis>
		             	<kendo:chart-valueAxisItem min="715" max="795">
		             		<kendo:chart-valueAxisItem-majorGridLines visible="false" />
		             		<kendo:chart-valueAxisItem-minorTicks visible="true" />
		             		<kendo:chart-valueAxisItem-plotBands>
		             			<kendo:chart-valueAxisItem-plotBand from="715" to="752" color="#ccc" opacity="0.6" />
		             			<kendo:chart-valueAxisItem-plotBand from="752" to="772" color="#ccc" opacity="0.3" />
		             		</kendo:chart-valueAxisItem-plotBands>
		             	</kendo:chart-valueAxisItem>
		             </kendo:chart-valueAxis>
		             <kendo:chart-categoryAxis>
		             	<kendo:chart-categoryAxisItem>
		             		<kendo:chart-categoryAxisItem-majorGridLines visible="false" />
		             		<kendo:chart-categoryAxisItem-majorTicks visible="false" />
		             	</kendo:chart-categoryAxisItem>
		          	 </kendo:chart-categoryAxis>
		             <kendo:chart-tooltip visible="true" shared="true" template="Maximum: #= value.target # <br /> Average: #= value.current #" />
		         </kendo:chart>
	         </td>
         </tr>
         <tr>
             <td class="item">hPa</td>
             <td class="chart">
		         <kendo:chart name="chart-hPa">
		             <kendo:chart-legend visible="false" />
		             <kendo:chart-series>
		                <kendo:chart-seriesItem type="bullet" data="<%= new double[][] { new double[] { 1001, 1017 }} %>" />
		             </kendo:chart-series>
		             <kendo:chart-chartArea margin="0">
		             </kendo:chart-chartArea>
		             <kendo:chart-valueAxis>
		             	<kendo:chart-valueAxisItem min="955" max="1055">
		             		<kendo:chart-valueAxisItem-majorGridLines visible="false" />
		             		<kendo:chart-valueAxisItem-minorTicks visible="true" />
		             		<kendo:chart-valueAxisItem-plotBands>
		             			<kendo:chart-valueAxisItem-plotBand from="955" to="1002" color="#ccc" opacity="0.6" />
		             			<kendo:chart-valueAxisItem-plotBand from="1002" to="1027" color="#ccc" opacity="0.3" />
		             		</kendo:chart-valueAxisItem-plotBands>
		             	</kendo:chart-valueAxisItem>
		             </kendo:chart-valueAxis>
		             <kendo:chart-categoryAxis>
		             	<kendo:chart-categoryAxisItem>
		             		<kendo:chart-categoryAxisItem-majorGridLines visible="false" />
		             		<kendo:chart-categoryAxisItem-majorTicks visible="false" />
		             	</kendo:chart-categoryAxisItem>
		          	 </kendo:chart-categoryAxis>
		             <kendo:chart-tooltip visible="true" shared="true" template="Maximum: #= value.target # <br /> Average: #= value.current #" />
		         </kendo:chart>
			 </td>
         </tr>
         <tr>
             <td class="item">hum</td>
             <td class="chart">
		         <kendo:chart name="chart-hum">
		             <kendo:chart-legend visible="false" />
		             <kendo:chart-series>
		                <kendo:chart-seriesItem type="bullet" data="<%= new double[][] { new double[] { 45, 60 }} %>" />
		             </kendo:chart-series>
		             <kendo:chart-chartArea margin="0">
		             </kendo:chart-chartArea>
		             <kendo:chart-valueAxis>
		             	<kendo:chart-valueAxisItem min="0" max="100">
		             		<kendo:chart-valueAxisItem-majorGridLines visible="false" />
		             		<kendo:chart-valueAxisItem-minorTicks visible="true" />
		             		<kendo:chart-valueAxisItem-plotBands>
		             			<kendo:chart-valueAxisItem-plotBand from="0" to="33" color="#ccc" opacity="0.6" />
		             			<kendo:chart-valueAxisItem-plotBand from="33" to="66" color="#ccc" opacity="0.3" />
		             		</kendo:chart-valueAxisItem-plotBands>
		             	</kendo:chart-valueAxisItem>
		             </kendo:chart-valueAxis>
		             <kendo:chart-categoryAxis>
		             	<kendo:chart-categoryAxisItem>
		             		<kendo:chart-categoryAxisItem-majorGridLines visible="false" />
		             		<kendo:chart-categoryAxisItem-majorTicks visible="false" />
		             	</kendo:chart-categoryAxisItem>
		          	 </kendo:chart-categoryAxis>
		             <kendo:chart-tooltip visible="true" shared="true" template="Maximum: #= value.target # <br /> Average: #= value.current #" />
		         </kendo:chart>
		     </td>
         </tr>
         <tr>
             <td class="item">temp</td>
             <td class="chart">
		         <kendo:chart name="chart-temp">
		             <kendo:chart-legend visible="false" />
		             <kendo:chart-series>
		                <kendo:chart-seriesItem type="bullet" data="<%= new double[][] { new double[] { 25, 22 }} %>" />
		             </kendo:chart-series>
		             <kendo:chart-chartArea margin="0">
		             </kendo:chart-chartArea>
		             <kendo:chart-valueAxis>
		             	<kendo:chart-valueAxisItem min="0" max="30">
		             		<kendo:chart-valueAxisItem-majorGridLines visible="false" />
		             		<kendo:chart-valueAxisItem-minorTicks visible="true" />
		             		<kendo:chart-valueAxisItem-plotBands>
		             			<kendo:chart-valueAxisItem-plotBand from="0" to="10" color="yellow" opacity="0.3" />
		             			<kendo:chart-valueAxisItem-plotBand from="10" to="20" color="orange" opacity="0.3" />
		             			<kendo:chart-valueAxisItem-plotBand from="20" to="30" color="red" opacity="0.3" />
		             		</kendo:chart-valueAxisItem-plotBands>
		             	</kendo:chart-valueAxisItem>
		             </kendo:chart-valueAxis>
		             <kendo:chart-categoryAxis>
		             	<kendo:chart-categoryAxisItem>
		             		<kendo:chart-categoryAxisItem-majorGridLines visible="false" />
		             		<kendo:chart-categoryAxisItem-majorTicks visible="false" />
		             	</kendo:chart-categoryAxisItem>
		          	 </kendo:chart-categoryAxis>
		             <kendo:chart-tooltip visible="true" shared="true" template="Maximum: #= value.target # <br /> Average: #= value.current #" />
		         </kendo:chart>
     		  </td>
         </tr>
    </table>
    </div>
    <style>
	    .history {
            border-collapse: collapse;
            width: 100%;
        }
        .history td.chart {
            width: 430px;
        }
        .history .k-chart {
            height: 65px;
            width: 400px;
        }
        .history td.item {
            line-height: 65px;
            width: 20px;
            text-align: right;
            padding-bottom: 22px;
        }
        
        .chart-wrapper  {
            width: 450px;
            height: 350px;    
        }
	</style>
<demo:footer />
