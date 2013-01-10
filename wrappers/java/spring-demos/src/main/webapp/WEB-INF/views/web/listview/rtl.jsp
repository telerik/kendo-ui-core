<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>

<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<c:url value="/web/listview/rtl_read" var="transportReadUrl" />

<demo:header />

<div class="k-rtl">
	<kendo:listView name="listView" template="template" selectable="multiple" pageable="true">	
		<kendo:dataSource pageSize="12" serverPaging="true">
			<kendo:dataSource-transport>
				<kendo:dataSource-transport-read url="${transportReadUrl}" contentType="application/json" type="POST"/>
				 <kendo:dataSource-transport-parameterMap>
                	<script>
	                	function parameterMap(options,type) {
	                		return JSON.stringify(options);	                		
	                	}
                	</script>
                </kendo:dataSource-transport-parameterMap>
			</kendo:dataSource-transport>
			<kendo:dataSource-schema data="data" total="total"></kendo:dataSource-schema>
		</kendo:dataSource>		
	</kendo:listView>
</div>

<script type="text/x-kendo-tmpl" id="template">
    <div class="product">
        <img src="../../resources/web/foods/#=productId#.jpg" alt="#=productName# image" />
        <h3>#=productName#</h3>
    </div>
</script>

<style scoped="scoped">    
	.product
	{
		float: right;
		width: 270px;
		height: 110px;
		margin: 5px;
		padding: 5px;
		-moz-box-shadow: inset 0 0 30px rgba(0,0,0,0.15);
	    -webkit-box-shadow: inset 0 0 30px rgba(0,0,0,0.15);
	    box-shadow: inset 0 0 30px rgba(0,0,0,0.15);
	    -webkit-border-radius: 15px;
	    -moz-border-radius: 15px;
	    border-radius: 15px;
	    background-image: none;
	    cursor: pointer;
	}
	.product img
	{
		float: right;
		width: 110px;
		height: 110px;
		-webkit-border-radius: 10px;
	    -moz-border-radius: 10px;
	    border-radius: 10px;
	}
	.product h3
	{
		margin: 10px 0 0 0;
		padding: 10px 20px 10px 10px;
		font-size: 1em;
		float: right;
		max-width: 120px;
		text-transform: uppercase;
	}
	.k-state-selected h3
	{
		color: #fff;
		background-color: rgba(0,0,0,0.4);
		-moz-box-shadow: inset 0 0 20px rgba(0,0,0,0.2);
	    -webkit-box-shadow: inset 0 0 20px rgba(0,0,0,0.2);
	    box-shadow: inset 0 0 20px rgba(0,0,0,0.2);
	    -moz-border-radius-topright: 5px;
	    -moz-border-radius-bottomright: 5px;
	    -webkit-border-top-right-radius: 5px;
	    -webkit-border-bottom-right-radius: 5px;
	    border-top-right-radius: 5px;
	    border-bottom-right-radius: 5px;
	}
	.k-listview:after
	{
		content: ".";
	    display: block;
	    height: 0;
	    clear: both;
	    visibility: hidden;
	}
	.k-listview
	{
		border: 0;
		padding: 0 0 20px 0;
		min-width: 0;
	}    
</style>
            
<demo:footer />