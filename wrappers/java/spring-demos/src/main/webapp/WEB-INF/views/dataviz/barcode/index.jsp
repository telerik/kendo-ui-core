<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>


<demo:header />    
    <c:url value="/resources/web/foods/200/12.jpg" var="manchegoUrl" />
    <c:url value="/resources/web/foods/200/32.jpg" var="mascarponeUrl" />
    <c:url value="/resources/web/foods/200/72.jpg" var="gudbrandsUrl" />
    
    <ul id="dairy">
        <li>
            <img src="${manchegoUrl}" alt="Queso Manchego La Pastora" />
            <kendo:barcode name="manchego" value="2346722" type="ean8" width="200" height="100">
            </kendo:barcode>
        </li>
        <li>
            <img src="${mascarponeUrl}" alt="Mascarpone Fabioli" />
            <kendo:barcode name="mascarpone" value="Mascarpone" type="code128" width="200" height="100">
            </kendo:barcode>
        </li>
        <li>
            <img src="${gudbrandsUrl}" alt="Gudbrandsdalsost" />
            <kendo:barcode name="gudbrands" value="CHEESE" type="code39" width="200" height="100">
            </kendo:barcode>
        </li>
    </ul>
        
    <style scoped>
        #dairy {
            margin: 0;
            padding: 30px 25px;
            list-style-type: none;
        }
        #dairy li {
            display: inline-block;
            padding: 10px;
            margin: 6px;
            background-color: #fff;
            
            box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
            -moz-box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
            -webkit-box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
        }
        #dairy li p, #dairy li img {
            margin: 0;
            padding: 0;
        }
        #dairy li img {
            margin-bottom: 10px;
        }
    </style>
<demo:footer />