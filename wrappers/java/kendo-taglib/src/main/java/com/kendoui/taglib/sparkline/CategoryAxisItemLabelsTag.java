
package com.kendoui.taglib.sparkline;


import com.kendoui.taglib.BaseTag;






import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class CategoryAxisItemLabelsTag extends  BaseTag  /* interfaces */ /* interfaces */ {
    
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
        return "sparkline-categoryAxisItem-labels";
    }

    public void setBorder(com.kendoui.taglib.sparkline.CategoryAxisItemLabelsBorderTag value) {
        setProperty("border", value);
    }

    public void setTemplate(CategoryAxisItemLabelsTemplateFunctionTag value) {
        setEvent("template", value.getBody());
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

    public java.lang.String getCulture() {
        return (java.lang.String)getProperty("culture");
    }

    public void setCulture(java.lang.String value) {
        setProperty("culture", value);
    }

    public java.lang.Object getDateFormats() {
        return (java.lang.Object)getProperty("dateFormats");
    }

    public void setDateFormats(java.lang.Object value) {
        setProperty("dateFormats", value);
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

    public java.lang.Object getMargin() {
        return (java.lang.Object)getProperty("margin");
    }

    public void setMargin(java.lang.Object value) {
        setProperty("margin", value);
    }

    public boolean getMirror() {
        return (boolean)getProperty("mirror");
    }

    public void setMirror(boolean value) {
        setProperty("mirror", value);
    }

    public java.lang.Object getPadding() {
        return (java.lang.Object)getProperty("padding");
    }

    public void setPadding(java.lang.Object value) {
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
