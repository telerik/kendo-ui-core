<%@page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>

<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<demo:header />

<c:url value="/resources/web/sortable/handlers-title.png"
	var="handlersTitle" />
	
<c:url value="/resources/web/sortable/handle.png"
	var="handleImg" />

<kendo:sortable name="#sortable-handlers" hint="hint" handler=".handler"></kendo:sortable>

<div id="pages">
	<div id="pages-title">
		<span>Site Menu</span>
	</div>
	<div id="sortable-handlers">
		<div class="item">
			<span class="handler">&nbsp;</span> <span>About us</span>
		</div>
		<div class="item">
			<span class="handler">&nbsp;</span> <span>Contact us</span>
		</div>
		<div class="item">
			<span class="handler">&nbsp;</span> <span>Community</span>
		</div>
		<div class="item">
			<span class="handler">&nbsp;</span> <span>Products</span>
		</div>
		<div class="item">
			<span class="handler">&nbsp;</span> <span>Services</span>
		</div>
	</div>
</div>

<script>
	function hint(element) {
		return element.clone().addClass("hint");
	}
</script>

<style>
#example {
	-webkit-user-select: none;
	-moz-user-select: none;
	-ms-user-select: none;
	user-select: none;
}

#pages {
	margin: 30px auto;
	width: 300px;
	background-color: #f3f5f7;
	border-radius: 4px;
	border: 1px solid rgba(0, 0, 0, .1);
}

#pages-title {
	height: 60px;
	background: url('${handlersTitle}') no-repeat 50% 15px;
}

#pages-title span {
	display: none;
}

.item {
	margin: 15px;
	padding: 0 10px 0 0;
	min-width: 200px;
	background-color: #fff;
	border: 1px solid rgba(0, 0, 0, .1);
	border-radius: 3px;
	font-size: 1.3em;
	line-height: 2.5em;
}

.handler {
	display: inline-block;
	width: 30px;
	margin-right: 10px;
	border-radius: 3px 0 0 3px;
	background: url('${handleImg}') no-repeat 50% 50% #ccc;
}

.handler:hover {
	background-color: #2db245;
}

.placeholder {
	width: 298px;
	border: 1px solid #2db245;
}

.hint {
	border: 2px solid #2db245;
	border-radius: 6px;
}

.hint .handler {
	background-color: #2db245;
}
</style>

<demo:footer />