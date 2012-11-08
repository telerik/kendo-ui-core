<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<demo:header />

<kendo:tabStrip name="tabStrip">
	<kendo:tabStrip-items>
	    <kendo:tabStrip-item text="Tab1" />
	    <kendo:tabStrip-item text="Tab2" />
	</kendo:tabStrip-items>
</kendo:tabStrip>

<demo:footer />