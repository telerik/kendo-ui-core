<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>

<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<demo:header />

<div class="configuration k-widget k-header" style="width: 300px">
    <span class="infoHead">Information</span>
    <p>
        This example show how to persist the successfully uploaded files
        in the list and display them again when the page is reloaded.
    </p>
    <p>
        Please upload some files and refresh the page.
    </p>
</div>

<c:url value="/web/upload/initialFiles/saveAndPersist" var="saveAndPersistUrl" />
<c:url value="/web/upload/initialFiles/removeAndPersist" var="removeAndPersistUrl" />

<div style="width:45%">
	<div class="demo-section">
	    <kendo:upload name="files" files="${initialFiles}">
	        <kendo:upload-async autoUpload="true"
	        					saveUrl="${saveAndPersistUrl}" 
	        					removeUrl="${removeAndPersistUrl}"/>
	    </kendo:upload>
    </div>
</div>

<demo:footer />