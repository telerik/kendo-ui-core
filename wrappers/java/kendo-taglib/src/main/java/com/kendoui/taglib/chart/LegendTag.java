
package com.kendoui.taglib.chart;

import com.kendoui.taglib.BaseTag;

import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class LegendTag extends BaseTag /* interfaces */implements Border, Labels/* interfaces */ {

    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag

        Legend parent = (Legend)findParentWithClass(Legend.class);

        parent.setLegend(this);

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

    @Override
    public void setBorder(BorderTag value) {
        setProperty("border", value.properties());
    }

    @Override
    public void setLabels(LabelsTag value) {
        setProperty("labels", value.properties());
    }

    public String getBackground() {
        return (String)getProperty("background");
    }

    public void setBackground(String value) {
        setProperty("background", value);
    }

    public int getMargin() {
        return (int)getProperty("margin");
    }

    public void setMargin(int value) {
        setProperty("margin", value);
    }

    public int getOffsetX() {
        return (int)getProperty("offsetX");
    }

    public void setOffsetX(int value) {
        setProperty("offsetX", value);
    }

    public int getOffsetY() {
        return (int)getProperty("offsetY");
    }

    public void setOffsetY(int value) {
        setProperty("offsetY", value);
    }

    public int getPadding() {
        return (int)getProperty("padding");
    }

    public void setPadding(int value) {
        setProperty("padding", value);
    }

    public String getPosition() {
        return (String)getProperty("position");
    }

    public void setPosition(String value) {
        setProperty("position", value);
    }

    public boolean getVisible() {
        return (boolean)getProperty("visible");
    }

    public void setVisible(boolean value) {
        setProperty("visible", value);
    }

//<< Attributes

}
