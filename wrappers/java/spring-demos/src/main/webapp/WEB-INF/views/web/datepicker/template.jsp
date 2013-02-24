<%@page import="java.util.Date"%>
<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<demo:header />
	<div class="configuration k-widget k-header">
	    <span class="infoHead">Information</span>
	    <p>
	        Apply special style for the birthdays.
	    </p>
	</div>
	
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
                         "<div class=\"birthday\"></div>" +
                     "# } #" +
                     "#= data.value #";
    
    String footer = "Today - #=kendo.toString(data, 'd') #";
    %>
     <div class="demo-section" style="width: 155px;">   
        <kendo:datePicker name="datepicker" value="<%=new Date()%>" dates="${dates}" footer="<%=footer%>">
            <kendo:datePicker-month content="<%=template%>"/>
        </kendo:datePicker>
        
    </div>
    <script>
	    $(document).ready(function() {
	        $("#datepicker").data("kendoDatePicker")
	                        .dateView.calendar.element
	                        .width(340);
	    });
	</script>
	
    <style scoped>          
        .demo-section {
            margin: 0 0;
        }

        .birthday {
            background: transparent url(<c:url value="/resources/web/calendar/cake.png"/>)  no-repeat 0 50%;
            display: inline-block;
            width: 16px;
            height: 16px;
            vertical-align: middle;
            margin-right: 3px;
        }
    </style>
<demo:footer />