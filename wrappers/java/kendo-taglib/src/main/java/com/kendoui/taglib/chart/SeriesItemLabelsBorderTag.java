
package com.kendoui.taglib.chart;


import com.kendoui.taglib.BaseTag;






import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class SeriesItemLabelsBorderTag extends  BaseTag  /* interfaces *//* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag


        SeriesItemLabelsTag parent = (SeriesItemLabelsTag)findParentWithClass(SeriesItemLabelsTag.class);


        parent.setBorder(this);

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
        return "chart-seriesItem-labels-border";
    }

    public void setColor(SeriesItemLabelsBorderColorFunctionTag value) {
        setEvent("color", value.getBody());
    }

    public void setDashType(SeriesItemLabelsBorderDashTypeFunctionTag value) {
        setEvent("dashType", value.getBody());
    }

    public void setWidth(SeriesItemLabelsBorderWidthFunctionTag value) {
        setEvent("width", value.getBody());
    }

    public java.lang.String getColor() {
        return (java.lang.String)getProperty("color");
    }

    public void setColor(java.lang.String value) {
        setProperty("color", value);
    }

    public java.lang.String getDashType() {
        return (java.lang.String)getProperty("dashType");
    }

    public void setDashType(java.lang.String value) {
        setProperty("dashType", value);
    }

    public float getWidth() {
        return (float)getProperty("width");
    }

    public void setWidth(float value) {
        setProperty("width", value);
    }

//<< Attributes

}
