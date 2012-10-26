
package com.kendoui.taglib;


import com.kendoui.taglib.stockchart.*;



import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class StockChartTag extends WidgetTag /* interfaces *//* interfaces */ {

    public StockChartTag() {
        super("StockChart");
    }
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag
//<< doEndTag

        return super.doEndTag();
    }

    @Override
    public void initialize() {
//>> initialize
//<< initialize

        super.initialize();
    }

    @Override
    public void destroy() {
//>> destroy
//<< destroy

        super.destroy();
    }

//>> Attributes

    public static String tagName() {
        return "stockChart";
    }

    public void setNavigator(NavigatorTag value) {
        setProperty("navigator", value);
    }

    public String getDateField() {
        return (String)getProperty("dateField");
    }

    public void setDateField(String value) {
        setProperty("dateField", value);
    }

//<< Attributes

}
