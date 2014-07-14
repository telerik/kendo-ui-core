
package com.kendoui.taglib.chart;


import com.kendoui.taglib.BaseTag;






import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class SeriesItemLabelsFromTag extends  BaseTag  /* interfaces */ /* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag


        SeriesItemLabelsTag parent = (SeriesItemLabelsTag)findParentWithClass(SeriesItemLabelsTag.class);


        parent.setFrom(this);

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
        return "chart-seriesItem-labels-from";
    }

    public void setBorder(com.kendoui.taglib.chart.SeriesItemLabelsFromBorderTag value) {
        setProperty("border", value);
    }

    public void setMargin(com.kendoui.taglib.chart.SeriesItemLabelsFromMarginTag value) {
        setProperty("margin", value);
    }

    public void setPadding(com.kendoui.taglib.chart.SeriesItemLabelsFromPaddingTag value) {
        setProperty("padding", value);
    }

    public void setBackground(SeriesItemLabelsFromBackgroundFunctionTag value) {
        setEvent("background", value.getBody());
    }

    public void setColor(SeriesItemLabelsFromColorFunctionTag value) {
        setEvent("color", value.getBody());
    }

    public void setFont(SeriesItemLabelsFromFontFunctionTag value) {
        setEvent("font", value.getBody());
    }

    public void setFormat(SeriesItemLabelsFromFormatFunctionTag value) {
        setEvent("format", value.getBody());
    }

    public void setPosition(SeriesItemLabelsFromPositionFunctionTag value) {
        setEvent("position", value.getBody());
    }

    public void setTemplate(SeriesItemLabelsFromTemplateFunctionTag value) {
        setEvent("template", value.getBody());
    }

    public void setVisible(SeriesItemLabelsFromVisibleFunctionTag value) {
        setEvent("visible", value.getBody());
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

    public java.lang.String getFormat() {
        return (java.lang.String)getProperty("format");
    }

    public void setFormat(java.lang.String value) {
        setProperty("format", value);
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

    public java.lang.String getTemplate() {
        return (java.lang.String)getProperty("template");
    }

    public void setTemplate(java.lang.String value) {
        setProperty("template", value);
    }

    public boolean getVisible() {
        return (boolean)getProperty("visible");
    }

    public void setVisible(boolean value) {
        setProperty("visible", value);
    }

//<< Attributes

}
