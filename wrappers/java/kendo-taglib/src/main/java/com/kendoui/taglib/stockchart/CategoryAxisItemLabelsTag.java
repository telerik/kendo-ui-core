
package com.kendoui.taglib.stockchart;


import com.kendoui.taglib.BaseTag;






import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class CategoryAxisItemLabelsTag extends  BaseTag  /* interfaces *//* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag


        CategoryAxisItemTag parent = (CategoryAxisItemTag)findParentWithClass(CategoryAxisItemTag.class);


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
        return "stockChart-categoryAxisItem-labels";
    }

    public void setBorder(com.kendoui.taglib.stockchart.CategoryAxisItemLabelsBorderTag value) {
        setProperty("border", value);
    }

    public void setTemplate(CategoryAxisItemLabelsTemplateFunctionTag value) {
        setEvent("template", value.getBody());
    }

    public String getBackground() {
        return (String)getProperty("background");
    }

    public void setBackground(String value) {
        setProperty("background", value);
    }

    public String getColor() {
        return (String)getProperty("color");
    }

    public void setColor(String value) {
        setProperty("color", value);
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

    public String getFont() {
        return (String)getProperty("font");
    }

    public void setFont(String value) {
        setProperty("font", value);
    }

    public String getFormat() {
        return (String)getProperty("format");
    }

    public void setFormat(String value) {
        setProperty("format", value);
    }

    public Object getMargin() {
        return (Object)getProperty("margin");
    }

    public void setMargin(Object value) {
        setProperty("margin", value);
    }

    public boolean getMirror() {
        return (boolean)getProperty("mirror");
    }

    public void setMirror(boolean value) {
        setProperty("mirror", value);
    }

    public Object getPadding() {
        return (Object)getProperty("padding");
    }

    public void setPadding(Object value) {
        setProperty("padding", value);
    }

    public float getRotation() {
        return (float)getProperty("rotation");
    }

    public void setRotation(float value) {
        setProperty("rotation", value);
    }

    public float getSkip() {
        return (float)getProperty("skip");
    }

    public void setSkip(float value) {
        setProperty("skip", value);
    }

    public float getStep() {
        return (float)getProperty("step");
    }

    public void setStep(float value) {
        setProperty("step", value);
    }

    public String getTemplate() {
        return (String)getProperty("template");
    }

    public void setTemplate(String value) {
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
