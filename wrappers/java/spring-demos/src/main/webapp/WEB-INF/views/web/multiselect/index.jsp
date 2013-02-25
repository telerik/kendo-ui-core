<%@page import="com.kendoui.spring.models.DropDownListItem"%>
<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<demo:header />
	<%
	String[] values = {"Anne King", "Andrew Fuller"};
	%>
    <div class="demo-section">
        <h2>Invite Attendees</h2>
        <label for="required">Required</label> 
	    <kendo:multiSelect name="required" placeholder="Select attendees..." value="values">
	        <kendo:dataSource data="${attendees}"></kendo:dataSource>
	    </kendo:multiSelect>
	    <label for="optional">Optional</label>
	    <kendo:multiSelect name="optional" placeholder="Select attendees...">
	        <kendo:dataSource data="${attendees}"></kendo:dataSource>
	    </kendo:multiSelect>
	    <button class="k-button" id="get">Send Invitation</button>
	</div>
	<style scoped>
        .demo-section {
            width: 350px;
            height: 200px;
            padding: 30px;
        }
        .demo-section h2 {
            font-weight: normal;
        }
        .demo-section label {
            display: inline-block;
            margin: 15px 0 5px 0;
        }
        .demo-section select {
            width: 350px;
        }
        #get {
            float: right;
            margin: 25px auto 0;
        }
    </style>
<demo:footer />