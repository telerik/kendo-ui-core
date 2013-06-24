<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>

<demo:header />                        
 	<div class="demo-section">
 		<kendo:qRCode name="qrMail" value="mailto:clientservice@kendoui.com" size="100" >
 		</kendo:qRCode> 	
 		
 		<kendo:qRCode name="qrUrl" value="http://demos.kendoui.com/dataviz/overview/index.html" size="130" errorCorrectionLevel="M" >
 			<kendo:qRCode-border color="#d11717" width="5"/>
 		</kendo:qRCode> 	
 		
 		<kendo:qRCode name="qrTelephone" value="tel:+1-888-365-2779" size="170" errorCorrectionLevel="Q" darkModuleColor="#FF321C" >
 			<kendo:qRCode-border color="#FF321C" width="5"/>
 		</kendo:qRCode> 	
 		
 		<kendo:qRCode name="qrGeoLocation" value="geo:42.65049,23.37925,100" size="190" errorCorrectionLevel="Q" background="#ACD608"> 			
 		</kendo:qRCode> 	
 	</div>
 
	<style scoped="scoped">
	    .k-qrcode {
	        display:inline-block;
	        margin: 10px;                    
	    }   	
	</style>
<demo:footer />