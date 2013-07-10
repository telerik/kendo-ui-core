<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page import="java.util.List" %>
<%@ page import="com.kendoui.spring.models.CompensationStats" %>

<demo:header />
	<div class="chart-wrapper">
    <table id="stats" class="stats">
        <thead>
            <tr>
                <th class="year">Year</th>
                <th class="hourly">Compensation costs</th>
                <th class="change">Annual change %</th>
                <th class="direct">Direct Pay</th>
                <th class="benefits">Benefit components</th>
            </tr>
        </thead>
        <tbody>
<%
@SuppressWarnings("unchecked")
List<CompensationStats> model =	(List<CompensationStats>) request.getAttribute("compensationData");
for (int i = 0; i < model.size(); i++) {
	CompensationStats row = model.get(i);
%>
        <tr>
            <td class="year"><%= row.getYear() %></td>
            <td class="hourly">
            	<kendo:sparkline name="<%= \"bar-hourly-\" + i %>" type="bar" data="<%= row.getHourly() %>"
            					 renderAs="canvas" style="width: 130px;">
            		<kendo:sparkline-valueAxis>
            			<kendo:sparkline-valueAxisItem max="50"></kendo:sparkline-valueAxisItem>
            		</kendo:sparkline-valueAxis>
            	</kendo:sparkline>
            </td>
            <td class="change">
            	<kendo:sparkline name="<%= \"bar-change-\" + i %>" renderAs="canvas" style="width: 130px;">
            		<kendo:sparkline-series>
            			<kendo:sparkline-seriesItem type="bar" data="<%= new double[] { row.getChange() } %>"
            										negativeColor="#808080">
            			</kendo:sparkline-seriesItem>
            		</kendo:sparkline-series>
            		<kendo:sparkline-valueAxis>
            			<kendo:sparkline-valueAxisItem min="-40" max="40"></kendo:sparkline-valueAxisItem>
            		</kendo:sparkline-valueAxis>
            		<kendo:sparkline-categoryAxis>
            			<kendo:sparkline-categoryAxisItem visible="true">
            				<kendo:sparkline-categoryAxisItem-majorTicks visible="false" />
            			</kendo:sparkline-categoryAxisItem>
            		</kendo:sparkline-categoryAxis>
            		<kendo:sparkline-chartArea background="transparent"></kendo:sparkline-chartArea>
            	</kendo:sparkline>
            </td>
            <td class="direct">
            	<kendo:sparkline name="<%= \"bar-direct-\" + i %>" type="bar"  data="<%= row.getDirect() %>"
            					 renderAs="canvas" style="width: 130px;">
            		<kendo:sparkline-valueAxis>
            			<kendo:sparkline-valueAxisItem max="50"></kendo:sparkline-valueAxisItem>
            		</kendo:sparkline-valueAxis>
            	</kendo:sparkline>
            </td>
            <td class="benefits">
            	<kendo:sparkline name="<%= \"bar-benefits-\" + i %>" renderAs="canvas" style="width: 130px;">
					<kendo:dataSource data="<%= row.getBenefits() %>">
						<kendo:dataSource-group>
							<kendo:dataSource-groupItem field="type" dir="asc" />
						</kendo:dataSource-group>
		            </kendo:dataSource>
            		<kendo:sparkline-series>
            			<kendo:sparkline-seriesItem type="bar" field="value">
            			</kendo:sparkline-seriesItem>
            		</kendo:sparkline-series>
            		<kendo:sparkline-valueAxis>
            			<kendo:sparkline-valueAxisItem max="10"></kendo:sparkline-valueAxisItem>
            		</kendo:sparkline-valueAxis>
            	</kendo:sparkline>
            </td>
        </tr>
<%
}
%>
        </tbody>
    </table>
</div>

<style scoped>
        .chart-wrapper {
            padding: 10px 0;
            height: 450px;
        }
        .stats {
            border-collapse: collapse;
            line-height: 2em;
            width: 100%;
            border: 0;
            border-top: 1px solid rgba(128,128,128,.3);
            border-bottom: 1px solid rgba(128,128,128,.3);
        }
        .stats td, .stats th {
            padding: 0 10px;
        }
        .stats th {
            border-bottom: 1px solid rgba(128,128,128,.3);
            text-align: left;
        }
        .stats tr.rows {
            -moz-transition: background .6s;
            -webkit-transition: background .6s;
            transition: background .6s;
        }
        .stats tr.rows:hover {
            -moz-transition: background-color .3s;
            -webkit-transition: background-color .3s;
            transition: background-color .3s;
            background-color: rgba(128,128,128,.2);
        }
        .year {
            width: 40px;
        }
        .stats th.change, .change {
            text-align: center;
            background-color: rgba(128,128,128,.1);
        }
        .title {
            margin: 5px 0 15px;
            text-align: center;
        }
</style>


<demo:footer />
