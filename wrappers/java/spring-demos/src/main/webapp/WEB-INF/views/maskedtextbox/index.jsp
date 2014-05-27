<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<demo:header />

    <div class="demo-section">
        <h2>Mask Input </h2>
        <ul id="fieldlist">
            <li>
                <label for="phone_number">Phone number:</label>
                <kendo:maskedTextBox name="phone_number" mask="(999) 000-0000" value="555 123 4567"></kendo:maskedTextBox>
            </li>
            <li>
                <label for="credit_card">Credit Card number:</label>
                <kendo:maskedTextBox name="credit_card" mask="0000 0000 0000 0000" value="1234 1234 1234 1234"></kendo:maskedTextBox>
            </li>
            <li>
                <label for="ssn">Social security number:</label>
                <kendo:maskedTextBox name="ssn" mask="000-00-0000" value="003-12-3456"></kendo:maskedTextBox>
            </li>
            <li>
                <label for="postcode">UK postcode:</label>
                <kendo:maskedTextBox name="postcode" mask="L0L 0LL" value="W1N 1AC"></kendo:maskedTextBox>
            </li>
        </ul>
    </div>

    <style>
        .demo-section {
            width: 300px;
            margin: 35px auto 50px;
            padding: 30px;
        }

        .demo-section h2 {
            text-transform: uppercase;
            font-size: 1.2em;
            margin-bottom: 10px;
        }

        #fieldlist
        {
            margin:0;
            padding:0;
        }

        #fieldlist li
        {
            list-style:none;
            padding:10px 0;
        }

        #fieldlist label {
            display: inline-block;
            width: 130px;
            margin-right: 5px;
            text-align: right;
        }
    </style>

<demo:footer />
