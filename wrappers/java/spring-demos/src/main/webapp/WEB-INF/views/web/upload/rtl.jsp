<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>

<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<demo:header />

<c:url value="/web/upload/async/save" var="saveUrl" />
<c:url value="/web/upload/async/remove" var="removeUrl" />

<div class="k-rtl">
    <div class="demo-section">
	    <kendo:upload name="files">
	        <kendo:upload-async autoUpload="true" saveUrl="${saveUrl}" removeUrl="${removeUrl}"/>
	    </kendo:upload>
    </div>
</div>

<demo:footer />
