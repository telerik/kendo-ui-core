<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<demo:header />

<p><label for="currency">Price:</label>
<kendo:numericTextBox name="currency" format="c" min="0" max="100" value="30"></kendo:numericTextBox>
</p>
<p>
<label for="percentage">Discount:</label>
<kendo:numericTextBox name="percentage" format="p0" min="0" max="0.9" value="0.05" step="0.01"></kendo:numericTextBox>
</p>
<p>
<label for="custom">Weight:</label>
<kendo:numericTextBox name="custom" format="#.00 kg" value="10"></kendo:numericTextBox>
</p>
<p>
<label for="numeric">In stock:</label>
<kendo:numericTextBox name="numeric" placeholder="Enter numeric value"></kendo:numericTextBox>
</p>

<style scoped="scoped">

label
{
    display:inline-block;
    width:7em;
}

</style>

<demo:footer />