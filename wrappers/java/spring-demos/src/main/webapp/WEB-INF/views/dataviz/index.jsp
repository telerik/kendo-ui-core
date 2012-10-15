<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
    <title>Kendo UI DataViz Examples</title>
    <link href="<c:url value='/resources/shared/styles/suite.css'/>" rel="stylesheet">
</head>
<body>
    <div id="page">
        <a class="offline-button" href="<c:url value='/'/>">Back to all suites</a>
        <c:forEach var="category" items="${navigation.keySet()}">
	       	<h1>${category}</h1>
	       	<ul>
	       	<c:forEach var="widget" items="${navigation.get(category)}">
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
        </c:forEach>
    </div>
</body>
</html>