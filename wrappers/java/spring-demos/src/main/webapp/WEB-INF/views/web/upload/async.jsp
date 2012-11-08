<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>

<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<demo:header />

<div class="configuration k-widget k-header" style="width: 300px">
    <span class="infoHead">Information</span>
    <p>
        The Upload is able to upload files out-of-band using the
        HTML5 File API with fallback for legacy browsers.
    </p>
    <p>
        You need to configure save action that will receive
        the uploaded files.
        An optional remove action is also available.
    </p>
</div>

<c:url value="/web/upload/async/save" var="saveUrl" />
<c:url value="/web/upload/async/remove" var="removeUrl" />

<div style="width:45%">
    <kendo:upload name="files">
        <kendo:upload-async autoUpload="true" saveUrl="${saveUrl}" removeUrl="${removeUrl}"/>
    </kendo:upload>
</div>

<demo:footer />
