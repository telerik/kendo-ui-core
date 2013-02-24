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
	    var today = new Date(),
	    birthdays = [
	        +new Date(today.getFullYear(), today.getMonth(), 11),
	        +new Date(today.getFullYear(), today.getMonth() + 1, 6),
	        +new Date(today.getFullYear(), today.getMonth() + 1, 27),
	        +new Date(today.getFullYear(), today.getMonth() - 1, 3),
	        +new Date(today.getFullYear(), today.getMonth() - 2, 22)
	    ];
    
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
        String template = "# if (isInArray(data.date, birthdays)) { #" +
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
    <div class="demo-section">    
        <kendo:dateTimePicker name="datetimepicker" value="<%=new Date()%>" footer="<%=footer%>">
            <kendo:dateTimePicker-month content="<%=template%>"/>
        </kendo:dateTimePicker>
        
    </div>
    <script>
	    $(document).ready(function() {
	        $("#datetimepicker").data("kendoDateTimePicker")
	                            .dateView.calendar.element
	                            .width(340);
	    });
	</script>
	
    <style scoped>       
        .demo-section {
            margin: 0 0;
            width: 185px;
        }
        
        .birthday {
            background: transparent url('<c:url value="/resources/web/calendar/cake.png" />') no-repeat 0 50%;
            display: inline-block;
            width: 16px;
            height: 16px;
            vertical-align: middle;
            margin-right: 3px;
        }
    </style>
<demo:footer />