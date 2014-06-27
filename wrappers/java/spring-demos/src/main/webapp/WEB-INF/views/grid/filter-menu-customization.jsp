<%@page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>

<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<c:url value="/grid/filter-menu-customization/read" var="transportReadUrl" />
<c:url value="/grid/filter-menu-customization/cities" var="citiesUrl" />
<c:url value="/grid/filter-menu-customization/titles" var="titlesUrl" />

<demo:header />
    <kendo:grid name="grid" filterable="true">
    	<kendo:grid-columns>
	    	<kendo:grid-column template="#=firstName# #=lastName#" title="Name"/>   		   		
	    	<kendo:grid-column field="city" title="City">
	    		<kendo:grid-column-filterable>
	    			<kendo:grid-column-filterable-ui>
    					<script> 
							function cityFilter(element) {
								element.kendoDropDownList({
									optionLabel: "--Select Value --",
									dataSource: {
										transport: {
											read: "${citiesUrl}"
										}
									}
								});
					  		}
					  	</script>		
	    			</kendo:grid-column-filterable-ui>
	    		</kendo:grid-column-filterable>	    	
	    	</kendo:grid-column>
	    	<kendo:grid-column field="title" title="Title">	
	    		<kendo:grid-column-filterable>
	    			<kendo:grid-column-filterable-ui>
    					<script> 
							function cityTitle(element) {
								element.kendoAutoComplete({
									dataSource: {
										transport: {
											read: "${titlesUrl}"
										}
									}
								});
					  		}
					  	</script>		
	    			</kendo:grid-column-filterable-ui>
	    		</kendo:grid-column-filterable>	        		
	    	</kendo:grid-column>	    	
    	</kendo:grid-columns>        
        <kendo:dataSource serverFiltering="true">
        	<kendo:dataSource-schema data="data" total="total"/>        	
            <kendo:dataSource-transport>            	            	
                <kendo:dataSource-transport-read url="${transportReadUrl}" type="POST"  contentType="application/json"/>
                 <kendo:dataSource-transport-parameterMap>
                	<script>
	                	function parameterMap(options,type) { 
	                		return JSON.stringify(options);	                		
	                	}
                	</script>
                </kendo:dataSource-transport-parameterMap>                                
            </kendo:dataSource-transport>            
        </kendo:dataSource>
    </kendo:grid>	
<demo:footer />
