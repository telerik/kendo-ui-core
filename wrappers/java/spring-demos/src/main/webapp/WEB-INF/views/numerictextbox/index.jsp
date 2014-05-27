<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<c:url value="resources/web/numerictextbox/addProduct.png" var="addProduct"/>
<demo:header />

<div id="add-product">
    <div>
        <kendo:numericTextBox name="currency" format="c" min="0" max="100" value="30"></kendo:numericTextBox>
    </div>
    <div>
        <kendo:numericTextBox name="percentage" format="p0" min="0" max="0.9" value="0.05" step="0.01"></kendo:numericTextBox>
    </div>
    <div>
        <kendo:numericTextBox name="custom" format="#.00 kg" value="2"></kendo:numericTextBox>
    </div>
    <div>
        <kendo:numericTextBox name="numeric" placeholder="Enter numeric value" value="17"></kendo:numericTextBox>
    </div>
</div>

<style scoped>
    #add-product {
        height: 181px;
        width: 252px;
        margin: 30px auto;
        padding: 64px 0 0 143px;
        background: url('${addProduct}') transparent no-repeat 0 0;
    }
</style>

<demo:footer />
