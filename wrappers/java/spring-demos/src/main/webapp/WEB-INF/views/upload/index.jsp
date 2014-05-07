<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>

<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<demo:header />

<div class="configuration k-widget k-header">
    <span class="infoHead">Information</span>
    <p>
        The Upload can be used as a drop-in replacement
        for file input elements.
    </p>
    <p>
        This "synchronous" mode does not require
        special handling on the server.
    </p>
</div>

<form method="post" action="<c:url value='/web/upload/' />" style="width:45%">
    <div class="demo-section">
    
        <kendo:upload name="files" />
        
        <p>
            <input type="submit" value="Submit" class="k-button" />
        </p>
    </div>
</form>

<demo:footer />
