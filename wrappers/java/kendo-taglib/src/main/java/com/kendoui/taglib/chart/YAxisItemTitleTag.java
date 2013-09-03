
package com.kendoui.taglib.chart;


import com.kendoui.taglib.BaseTag;






import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class YAxisItemTitleTag extends  BaseTag  /* interfaces *//* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag


        YAxisItemTag parent = (YAxisItemTag)findParentWithClass(YAxisItemTag.class);


        parent.setTitle(this);

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
        return "chart-yAxisItem-title";
    }

    public void setBorder(com.kendoui.taglib.chart.YAxisItemTitleBorderTag value) {
        setProperty("border", value);
    }

    public void setMargin(com.kendoui.taglib.chart.YAxisItemTitleMarginTag value) {
        setProperty("margin", value);
    }

    public void setPadding(com.kendoui.taglib.chart.YAxisItemTitlePaddingTag value) {
        setProperty("padding", value);
    }

    public java.lang.String getBackground() {
        return (java.lang.String)getProperty("background");
    }

    public void setBackground(java.lang.String value) {
        setProperty("background", value);
    }

    public java.lang.String getColor() {
        return (java.lang.String)getProperty("color");
    }

    public void setColor(java.lang.String value) {
        setProperty("color", value);
    }

    public java.lang.String getFont() {
        return (java.lang.String)getProperty("font");
    }

    public void setFont(java.lang.String value) {
        setProperty("font", value);
    }

    public float getMargin() {
        return (float)getProperty("margin");
    }

    public void setMargin(float value) {
        setProperty("margin", value);
    }

    public float getPadding() {
        return (float)getProperty("padding");
    }

    public void setPadding(float value) {
        setProperty("padding", value);
    }

    public java.lang.String getPosition() {
        return (java.lang.String)getProperty("position");
    }

    public void setPosition(java.lang.String value) {
        setProperty("position", value);
    }

    public float getRotation() {
        return (float)getProperty("rotation");
    }

    public void setRotation(float value) {
        setProperty("rotation", value);
    }

    public java.lang.String getText() {
        return (java.lang.String)getProperty("text");
    }

    public void setText(java.lang.String value) {
        setProperty("text", value);
    }

    public boolean getVisible() {
        return (boolean)getProperty("visible");
    }

    public void setVisible(boolean value) {
        setProperty("visible", value);
    }

//<< Attributes

}
