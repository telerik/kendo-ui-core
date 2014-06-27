<%@page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>

<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<c:url value="/resources/web/foods/200/${ id }" var="imageFolderUrl" />

<div class="dairy-details">
    <img src="${ imageFolderUrl }.jpg" alt="${ title }" />
    <h3>${ title }</h3>
</div>