<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>

<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<demo:header />   
   <kendo:tooltip name="#autohide-true" position="top" content="Hello!" show="onShow" hide="onHide" />
   <kendo:tooltip name="#autohide-false" position="top" content="Hello!" show="onShow" hide="onHide" autoHide="false" />
   
	<div class="demo-section">
	    <span id="autohide-true" class="key-button wider">Hover me!</span>
	    <span id="autohide-false" class="key-button wider">Hover me too!</span>
	</div>
    
	<div class="demo-section">
	    <h3 class="title">Console log</h3>
	    <div class="console"></div>
	</div>
            
    <script>
	    function onShow(e) {
	        kendoConsole.log("event :: show");
	    }
	
	    function onHide(e) {
	        kendoConsole.log("event :: hide");
	    }
    </script>
    
    <style scoped="scoped">
		.demo-section {
			 width: 600px;
             padding-top: 2em;
             padding-bottom: 2em;
             text-align: center;
         }
         .wider {
             margin: 0 20px;
             padding: 15px 8px;
             line-height: 23px;
             width: 120px;
         }
    </style>                   
    
<demo:footer />