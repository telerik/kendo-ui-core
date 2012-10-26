<%@page import="java.util.Date"%>
<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<demo:header />
    <div>
        <%
        String template = "# if ($.inArray(+data.date, data.dates) != -1) { #" +
				                "<div class=\"" +
				                "# if (data.value < 10) { #" +
				                    "exhibition" +
				                "# } else if ( data.value < 20 ) { #" +
				                    "party" +
				                "# } else { #" +
				                    "cocktail" +
				                "# } #" +
				             "\"></div>" +
				          "# } #" +
				          "#= data.value #";
        String footer = "Today - #=kendo.toString(data, 'd') #";
        %>
        
        <kendo:calendar name="special-days" value="<%=new Date()%>" dates="${dates}" footer="<%=footer%>">
            <kendo:calendar-month content="<%=template%>"/>
        </kendo:calendar>
        
    </div>
    <style scoped>
        #special-days {
            width: 310px;
        }
        
        #calendar .k-content {
            height: 168px;
        }
        
        .exhibition {
            background: transparent url(<c:url value="/resources/web/calendar/exhibition.png"/>) no-repeat 0 50%;
            display: inline-block;
            width: 16px;
            height: 16px;
            vertical-align: middle;
            margin-right: 3px;
        }

        .party {
            background: transparent url(<c:url value="/resources/web/calendar/party.png" />) no-repeat 0 50%;
            display: inline-block;
            width: 16px;
            height: 16px;
            vertical-align: middle;
            margin-right: 3px;
        }

        .cocktail {
            background: transparent url(<c:url value="/resources/web/calendar/cocktail.png" />) no-repeat 0 50%;
            display: inline-block;
            width: 16px;
            height: 16px;
            vertical-align: middle;
            margin-right: 3px;
        }
    </style>
<demo:footer />