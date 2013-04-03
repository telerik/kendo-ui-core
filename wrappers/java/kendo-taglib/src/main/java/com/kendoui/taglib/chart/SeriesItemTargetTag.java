
package com.kendoui.taglib.chart;


import com.kendoui.taglib.BaseTag;
import com.kendoui.taglib.json.Function;






import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class SeriesItemTargetTag extends  BaseTag  /* interfaces */ /* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag


        SeriesItemTag parent = (SeriesItemTag)findParentWithClass(SeriesItemTag.class);


        parent.setTarget(this);

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
        return "chart-seriesItem-target";
    }

    public void setBorder(com.kendoui.taglib.chart.SeriesItemTargetBorderTag value) {
        setProperty("border", value);
    }

    public void setLine(com.kendoui.taglib.chart.SeriesItemTargetLineTag value) {
        setProperty("line", value);
    }

    public void setColor(SeriesItemTargetColorFunctionTag value) {
        setEvent("color", value.getBody());
    }

    public String getBorder() {
        Function property = ((Function)getProperty("border"));
        if (property != null) {
            return property.getBody();
        }
        return null;
    }

    public void setBorder(String value) {
        setProperty("border", new Function(value));
    }

    public String getColor() {
        return (String)getProperty("color");
    }

    public void setColor(String value) {
        setProperty("color", value);
    }

//<< Attributes

}
