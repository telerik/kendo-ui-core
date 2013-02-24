<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<c:url value="/resources/web/autocomplete/shipping.png" var="shippingImg"/>
<demo:header />
    <div id="shipping">      
    
		<label for="countries" class="info">Choose shipping countries:</label>
		   
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
		<kendo:autoComplete name="countries" filter="startswith" placeholder="Select country..." separator=", ">
		    <kendo:dataSource data="<%=countries%>">
		    </kendo:dataSource>
		</kendo:autoComplete>
	    
		<div class="hint">Start typing the name of an European country</div>
	    
    </div>
	<style scoped="scoped">
		.info {
			display: block;
			line-height: 22px;
			padding: 0 5px 5px 0;
			color: #36558e;
		}

		#shipping {
			width: 482px;
			height: 152px;
			padding: 110px 0 0 30px;
			background: url('${shippingImg}') transparent no-repeat 0 0;
			margin: 30px auto;
		}

		.k-autocomplete
		{
			width: 250px;
			vertical-align: middle;
		}

		.hint {
			line-height: 22px;
			color: #aaa;
			font-style: italic;
			font-size: .9em;
			color: #7496d4;
		}
	</style>
<demo:footer />