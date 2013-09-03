
package com.kendoui.taglib.chart;


import com.kendoui.taglib.BaseTag;






import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class CategoryAxisItemSelectTag extends  BaseTag  /* interfaces */ /* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag


        CategoryAxisItemTag parent = (CategoryAxisItemTag)findParentWithClass(CategoryAxisItemTag.class);


        parent.setSelect(this);

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
        return "chart-categoryAxisItem-select";
    }

    public void setMousewheel(com.kendoui.taglib.chart.CategoryAxisItemSelectMousewheelTag value) {
        setProperty("mousewheel", value);
    }

    public java.lang.Object getFrom() {
        return (java.lang.Object)getProperty("from");
    }

    public void setFrom(java.lang.Object value) {
        setProperty("from", value);
    }

    public java.lang.Object getMax() {
        return (java.lang.Object)getProperty("max");
    }

    public void setMax(java.lang.Object value) {
        setProperty("max", value);
    }

    public java.lang.Object getMin() {
        return (java.lang.Object)getProperty("min");
    }

    public void setMin(java.lang.Object value) {
        setProperty("min", value);
    }

    public java.lang.Object getTo() {
        return (java.lang.Object)getProperty("to");
    }

    public void setTo(java.lang.Object value) {
        setProperty("to", value);
    }

//<< Attributes

}
