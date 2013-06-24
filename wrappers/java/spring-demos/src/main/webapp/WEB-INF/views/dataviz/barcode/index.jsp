<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>

<demo:header />                        
    <div class="demo-section">
        <div id="barcode-container">
        	<kendo:barcode name="ean" value="9658423" type="EAN8">
        	</kendo:barcode>            
            <kendo:barcode name="code128" value="Hello world!" type="code128">
        	</kendo:barcode>                    
            <kendo:barcode name="postnet" value="23494" type="POSTNET">
        	</kendo:barcode>  
        </div>
    </div>
<demo:footer />