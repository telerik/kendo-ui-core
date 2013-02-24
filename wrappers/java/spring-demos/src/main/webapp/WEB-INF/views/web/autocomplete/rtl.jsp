<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>
<demo:header />
  <div class="demo-section">
	    <div class="k-rtl">
	        <label for="states">Select a state in USA:</label>
	        <kendo:autoComplete name="states" placeholder="Select state...">
	            <kendo:dataSource data="${states}">
	            </kendo:dataSource>
	        </kendo:autoComplete>
	    </div>
  </div>
<demo:footer />