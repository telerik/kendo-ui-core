<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>

<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<demo:header />

<p>
    Uploaded files
</p>

<c:if test="${!files.isEmpty()}">
	<ul>
	    <c:forEach var="file" items="${files}">
         <li>
            ${file.getOriginalFilename()} (${file.getSize()} bytes)
         </li>
	    </c:forEach>
	</ul>
</c:if>

<c:if test="${files.isEmpty()}">
-- None --
</c:if>

<p>
    <a href="<c:url value='/web/upload/' />">Go back</a>
</p>
<demo:footer />
