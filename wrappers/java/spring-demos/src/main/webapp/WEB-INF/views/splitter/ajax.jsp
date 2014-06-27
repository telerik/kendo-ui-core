<%@page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<demo:header />

<c:url value="/splitter/content/1" var="ajaxContent1" />
<c:url value="/splitter/content/2" var="ajaxContent2" />

<kendo:splitter name="splitter">
    <kendo:splitter-panes>
	    <kendo:splitter-pane contentUrl="${ajaxContent1}"></kendo:splitter-pane>    
	    <kendo:splitter-pane contentUrl="${ajaxContent2}"></kendo:splitter-pane>
    </kendo:splitter-panes>    
</kendo:splitter>

<demo:footer />