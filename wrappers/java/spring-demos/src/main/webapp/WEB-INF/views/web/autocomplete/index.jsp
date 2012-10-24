<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>
<demo:header />
    <div id="shipping">
        <p>Start typing the name of a European country</p>
    
        <label for="country">Shipping countries:</label>
        
	    <%
	    String[] countries = {
	        "Albania",
	        "Andorra",
	        "Armenia",
	        "Austria",
	        "Azerbaijan",
	        "Belarus",
	        "Belgium",
	        "Bosnia & Herzegovina",
	        "Bulgaria",
	        "Croatia",
	        "Cyprus",
	        "Czech Republic",
	        "Denmark",
	        "Estonia",
	        "Finland",
	        "France",
	        "Georgia",
	        "Germany",
	        "Greece",
	        "Hungary",
	        "Iceland",
	        "Ireland",
	        "Italy",
	        "Kosovo",
	        "Latvia",
	        "Liechtenstein",
	        "Lithuania",
	        "Luxembourg",
	        "Macedonia",
	        "Malta",
	        "Moldova",
	        "Monaco",
	        "Montenegro",
	        "Netherlands",
	        "Norway",
	        "Poland",
	        "Portugal",
	        "Romania",
	        "Russia",
	        "San Marino",
	        "Serbia",
	        "Slovakia",
	        "Slovenia",
	        "Spain",
	        "Sweden",
	        "Switzerland",
	        "Turkey",
	        "Ukraine",
	        "United Kingdom",
	        "Vatican City"
	    };
	    %>
	    <kendo:autoComplete name="country" filter="startswith" placeholder="Select country..." separator=", ">
	        <kendo:dataSource data="<%=countries%>">
	        </kendo:dataSource>
	    </kendo:autoComplete>
    </div>
    <style scoped="scoped">
        .k-autocomplete
        {
            width: 250px;
        }
    </style>
<demo:footer />