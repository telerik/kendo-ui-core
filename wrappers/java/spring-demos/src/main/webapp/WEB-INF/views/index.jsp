<%@page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
    <title>Kendo UI Web Examples</title>
    <link href="<c:url value='/resources/shared/styles/suite.css'/>" rel="stylesheet">
</head>
<body>
    <div id="page">
     <ul>
        <c:forEach var="widget" items="${navigation}">
       		<c:if test="${widget.include()}">
	       		<li>
	       			<h2>${widget.text}</h2>
	       			<ul>
	       			<c:forEach var="example" items="${widget.items}">
	       				<c:if test="${example.include()}">
	       					<li><a href="<c:url value='${example.url.replaceAll(".html", "")}'/>">${example.text}</a></li>
	       				</c:if>
	       			</c:forEach>
	       			</ul>
	       		</li>
       		</c:if>
       </c:forEach>
        </ul>
    </div>
</body>
</html>