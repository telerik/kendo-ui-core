<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>

<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<c:url value="/web/listview/products/" var="transportReadUrl" />

<demo:header />
<kendo:listView name="listView" template="template">
	<kendo:dataSource pageSize="12" serverPaging="true">
		<kendo:dataSource-transport>
			<kendo:dataSource-transport-read url="${transportReadUrl}" contentType="application/json" type="POST"/>
		</kendo:dataSource-transport>
		<kendo:dataSource-schema data="data" total="total"></kendo:dataSource-schema>
	</kendo:dataSource>		
</kendo:listView>

<script type="text/x-kendo-tmpl" id="template">
	<div class="product">
        <img src="../../resources/web/foods/#=productId#.jpg" alt="#=productName# image" />
        <h3>#=productName#</h3>
    	<p>#=kendo.toString(unitPrice, "c")#</p>
	</div>
</script>

<style scoped="scoped">
#listView {
    min-height: 610px;
}

.product {
    float: left;
    position: relative;
    width: 110px;
    height: 160px;
    margin: 10px;
    padding: 7px 7px 0 7px;
    -moz-box-shadow: 0 1px 2px 0 rgba(0,0,0,0.2);
    -webkit-box-shadow: 0 1px 2px 0 rgba(0,0,0,0.2);
    box-shadow: 0 1px 2px 0 rgba(0,0,0,0.2);
	background-color: rgba(255,255,255,0.8)
}

.product img {
	width: 110px;
     height: 110px;
}

.product h3 {
    margin: 0;
    padding: 0;
    line-height: 1.1em;
    font-size: .9em;
    font-weight: normal;
    text-transform: uppercase;
    color: #777;
}

.product p {
    visibility: hidden;
}

.product:hover p {
    visibility: visible;
    position: absolute;
    width: 100px;
    height: 34px;
    top: 77px;
    margin: 0;
    padding: 3px 5px;
    line-height: 34px;
    vertical-align: middle;
    text-align: center;
    color: #fff;
    background-color: rgba(0,0,0,0.65);
    transition: background .2s linear, color .2s linear;
    -moz-transition: background .2s linear, color .2s linear;
    -webkit-transition: background .2s linear, color .2s linear;
    -o-transition: background .2s linear, color .2s linear;
}

.k-listview:after, .product dl:after {
    content: ".";
    display: block;
    height: 0;
    clear: both;
    visibility: hidden;
}

.k-listview {
    border: 0;
    padding: 0 0 20px 0;
    min-width: 0;
}
</style>
            
<demo:footer />