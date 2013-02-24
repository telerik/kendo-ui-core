<%@page import="java.util.Date"%>
<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<demo:header />
    <script>
    function isInArray(date, dates) {
    	for(var idx = 0, length = dates.length; idx < length; idx++) {
    		if (+date === +dates[idx]) {
    			return true;
    		}
    	}
    	
    	return false;
    }
    </script>
        <%
        String template = "# if (isInArray(+data.date, data.dates)) { #" +
                          "<div class='" +
                             "# if (data.value < 10) { #" +
                                 "exhibition" +
                             "# } else if ( data.value < 20 ) { #" +
                                 "party" +
                             "# } else { #" +
                                 "cocktail" +
                             "# } #" +
                          "'>#= data.value #</div>" +
                       "# } else { #" +
                       "#= data.value #" +
                       "# } #";
           
        %>
         <div class="demo-section">
            <div id="special-days">
				<kendo:calendar name="calendar" value="<%= new Date()%>" dates="${dates}" footer="<#= false#>">
					<kendo:calendar-month content="<%=template%>"/>
				</kendo:calendar>
            </div>
        </div>
             
	<style scoped>
		.demo-section {
			height: 430px;
			width: 690px;  
		}
		#special-days {
			height: 100%;
			width: 100%;
			margin: 0;
			padding: 0;
			background: url('<c:url value="/resources/web/calendar/calendar-template.jpg"/>') transparent no-repeat 0 bottom;
		}
		#calendar {
			margin: 20px 0 0 265px;
			width: 340px;
			text-align: center;
		}
		#calendar .k-content {
			height: 300px;
		}
		#calendar,
		#calendar .k-content,
		#calendar .k-header,
		#calendar th,
		#calendar .k-link,
		#calendar .k-state-hover,
		#calendar .k-state-selected,
		#calendar .k-state-focused {
			background: transparent;
			border-color: transparent;
			color: #fff;
			box-shadow: none;
		}
		#calendar .k-content .k-state-hover,
		#calendar .k-content .k-state-focused {
			font-size: 18px;
			font-weight: bold;
		}
		#calendar .k-state-selected, #calendar .k-state-selected.k-state-focused {
			font-size: 24px;
			font-weight: bold;
		}
		#calendar .k-content .k-link {
			padding: 0;
			min-height: 40px;
			line-height: 40px;
		}
		#calendar th {
			padding-top: 20px;
			color: #8cbabf;
		}
		#calendar td.k-other-month .k-link {
			color: #8cbabf;
		}
		#calendar th,
		#calendar td {
			text-align: center;
		}
		
		/* Template Days */
		.exhibition, .party, .cocktail {
				width: 40px;
				height: 40px;
				margin: auto;
				-webkit-border-radius: 100px;
				-moz-border-radius: 100px;
				border-radius: 50%;
				line-height: 40px;
		}
		.exhibition {
			background-color: #fff;
			color: #000;
		}
		.party {
			background-color: #70c114;
		}
		.cocktail {
			background-color: #00a1e8;
		}
	</style>
<demo:footer />