<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
    <title>Kendo UI for JSP - Spring MVC Offline Examples</title>
    <link href="<c:url value='/resources/shared/styles/suite.css'/>" rel="stylesheet">
</head>
<body>
    <div id="page">
        <h2>Kendo UI for JSP</h2>
         <ul id="suites">
             <li class="box">
                <a href="<c:url value='/web/'/>" class="imgPlate"><img src="<c:url value='/resources/shared/styles/demos-web.png'/>" /></a>
                <h2><a href="<c:url value='/web/'/>">Web examples</a></h2>
            </li>
             <li class="box">
                <a href="<c:url value='/dataviz/'/>" class="imgPlate"><img src="<c:url value='/resources/shared/styles/demos-dataviz.png'/>" /></a>
                <h2><a href="<c:url value='/dataviz/'/>">DataViz examples</a></h2>
            </li>
        </ul>
    </div>
</body>
</html>