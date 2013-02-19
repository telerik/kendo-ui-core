<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>

<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<demo:header />

	<c:url value="/resources/web/foods/" var="imageFolderUrl" />
	<c:url value="/web/tooltip/ajax/details" var="detailsUrl" />
	
    <kendo:tooltip name="#products" filter="a" width="220" height="280" position="top" requestStart="requestStart">
    	<kendo:tooltip-content>
    		<kendo:tooltip-content-url url="${ detailsUrl }" />    		
    	</kendo:tooltip-content>
    </kendo:tooltip>    
    
    <div class="demo-section">
        <ul id="products" class="dairy-photos">
            <li>
                <a href="#" data-id="11"><img src="${ imageFolderUrl }11.jpg" /></a>
            </li><li>
                <a href="#" data-id="12"><img src="${ imageFolderUrl }12.jpg" /></a>
            </li><li>
                <a href="#" data-id="31"><img src="${ imageFolderUrl }31.jpg" /></a>
            </li><li>
                <a href="#" data-id="32"><img src="${ imageFolderUrl }32.jpg" /></a>
            </li><li>
                <a href="#" data-id="33"><img src="${ imageFolderUrl }33.jpg" /></a>
            </li><li>
                <a href="#" data-id="59"><img src="${ imageFolderUrl }59.jpg" /></a>
            </li><li>
                <a href="#" data-id="60"><img src="${ imageFolderUrl }60.jpg" /></a>
            </li><li>
                <a href="#" data-id="69"><img src="${ imageFolderUrl }69.jpg" /></a>
            </li><li>
                <a href="#" data-id="72"><img src="${ imageFolderUrl }72.jpg" /></a>
            </li>
        </ul>
        <div class="dairy-description">
            <h2>Dairy Products</h2>
            <p>Queso Cabrales, Queso Manchego La Pastora, Gorgonzola Telino, Mascarpone Fabioli, Geitost, Raclette Courdavault, Camembert Pierrott, Gudbrandsdalsost, Flotemysost, Mozzarella di Giovanni</p>
            <p>Hover an image for details.</p>
        </div>
    </div>
    
	<script>
		function requestStart(e) {			
			e.options.data = {
				id: e.target.data("id")
			};
		}
	</script>
	
	<style scoped="scoped">
	   .demo-section {
           height: 460px;
       }
       .dairy-photos {
           float: left;
           list-style-type: none;
           margin: 60px 0 0 60px;
           padding: 0;
           width: 330px;
           line-height: 0;
       }
       .dairy-photos li {
           display: inline-block;
           margin: 0;
           padding: 0;
           width:110px;
           height: 110px;
           position: relative;
       }
       .dairy-photos li:hover {
           -moz-box-shadow: 0 0 10px rgba(0,0,0,0.8);
           -webkit-box-shadow: 0 0 10px rgba(0,0,0,0.8);
           box-shadow: 0 0 10px rgba(0,0,0,0.8);
           z-index: 1;
       }
       .dairy-photos li,
       .dairy-photos li:hover {
           transition: all .2s;
           -moz-transition: all .2s;
           -webkit-transition: all .2s;
       }
       .dairy-photos a {
           display: inline-block;
       }
       .dairy-description {
           float: right;
           width: 250px;
           margin: 80px 60px 0 0;
       }
       .dairy-description h2 {
           font-size: 2.7em;
           font-weight: normal;
       }
       .dairy-description p {
           line-height: 2em;
       }
       .dairy-details {
           padding: 10px 0 0 0;
       }
       .dairy-details h3 {
           font-weight: normal;
           font-size: 1.5em;
           margin-top: 10px;
       }
	</style>
<demo:footer />