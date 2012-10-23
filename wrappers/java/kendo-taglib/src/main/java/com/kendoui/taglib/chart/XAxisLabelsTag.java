
package com.kendoui.taglib.chart;


import com.kendoui.taglib.BaseTag;






import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class XAxisLabelsTag extends  BaseTag  /* interfaces *//* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag


        XAxisTag parent = (XAxisTag)findParentWithClass(XAxisTag.class);


        parent.setLabels(this);

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
        return "chart-xAxis-labels";
    }

    public String getCulture() {
        return (String)getProperty("culture");
    }

    public void setCulture(String value) {
        setProperty("culture", value);
    }

    public Object getDateFormats() {
        return (Object)getProperty("dateFormats");
    }

    public void setDateFormats(Object value) {
        setProperty("dateFormats", value);
    }

//<< Attributes

}
