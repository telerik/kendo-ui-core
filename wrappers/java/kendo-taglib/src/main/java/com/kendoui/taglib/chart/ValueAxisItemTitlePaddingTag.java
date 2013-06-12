
package com.kendoui.taglib.chart;


import com.kendoui.taglib.BaseTag;






import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class ValueAxisItemTitlePaddingTag extends  BaseTag  /* interfaces */ /* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag


        ValueAxisItemTitleTag parent = (ValueAxisItemTitleTag)findParentWithClass(ValueAxisItemTitleTag.class);


        parent.setPadding(this);

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
        return "chart-valueAxisItem-title-padding";
    }

    public float getBottom() {
        return (float)getProperty("bottom");
    }

    public void setBottom(float value) {
        setProperty("bottom", value);
    }

    public float getLeft() {
        return (float)getProperty("left");
    }

    public void setLeft(float value) {
        setProperty("left", value);
    }

    public float getRight() {
        return (float)getProperty("right");
    }

    public void setRight(float value) {
        setProperty("right", value);
    }

    public float getTop() {
        return (float)getProperty("top");
    }

    public void setTop(float value) {
        setProperty("top", value);
    }

//<< Attributes

}
