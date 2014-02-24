<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>

<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<demo:header />

<kendo:sortable name="#sortable-horizontal" axis="x"
	container="#sortable-horizontal" hint="hint" placeholder="placeholder"></kendo:sortable>

<div class="demo-section" style="margin-top: 50px;">
	<h3 class="title">Rearrange the photos</h3>
</div>
<div class="demo-section" style="margin-bottom: 50px;">
	<div id="sortable-horizontal">
		<img src="../../resources/web/sortable/1.jpg" /><img
			src="../../resources/web/sortable/2.jpg" /><img
			src="../../resources/web/sortable/3.jpg" /><img
			src="../../resources/web/sortable/4.jpg" /><img
			src="../../resources/web/sortable/5.jpg" />
	</div>
</div>

<script>
	function hint(element) {
		return element.clone().addClass("hint");
	}

	function placeholder(element) {
		return $("<div class='placeholder'>Drop Here!</div>");
	}
</script>

<style>
#example {
	-webkit-user-select: none;
	-moz-user-select: none;
	-ms-user-select: none;
	user-select: none;
}

.demo-section .title {
	margin: 0;
}

#sortable-horizontal {
	overflow: hidden;
	width: 950px;
	text-align: center;
}

#sortable-horizontal img {
	width: 166px;
	margin: 10px;
	vertical-align: middle
}

.placeholder {
	display: inline-block;
	width: 164px;
	height: 123px;
	border: 1px dashed #ddd;
	background-color: #f3f5f7;
	margin: 10px;
	font-size: 1.3em;
	font-weight: bold;
	line-height: 125px;
	vertical-align: middle;
	color: #777;
}

.tooltip {
	opacity: .6;
}
</style>

<demo:footer />