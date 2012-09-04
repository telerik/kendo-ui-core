package com.kendoui.taglib;

@SuppressWarnings("serial")
public class TabStripTag extends WidgetTag {
    public TabStripTag() {
        super("TabStrip");
    }

    //>> Attributes

    public String getDataTextField() {
        return (String)getProperty("dataTextField");
    }

    public void setDataTextField(String dataTextField) {
        setProperty("dataTextField", dataTextField);
    }

    public String getDataContentField() {
        return (String)getProperty("dataContentField");
    }

    public void setDataContentField(String dataContentField) {
        setProperty("dataContentField", dataContentField);
    }

    public String getDataImageUrlField() {
        return (String)getProperty("dataImageUrlField");
    }

    public void setDataImageUrlField(String dataImageUrlField) {
        setProperty("dataImageUrlField", dataImageUrlField);
    }

    public String getDataUrlField() {
        return (String)getProperty("dataUrlField");
    }

    public void setDataUrlField(String dataUrlField) {
        setProperty("dataUrlField", dataUrlField);
    }

    public String getDataSpriteCssClass() {
        return (String)getProperty("dataSpriteCssClass");
    }

    public void setDataSpriteCssClass(String dataSpriteCssClass) {
        setProperty("dataSpriteCssClass", dataSpriteCssClass);
    }

    public String getDataContentUrlField() {
        return (String)getProperty("dataContentUrlField");
    }

    public void setDataContentUrlField(String dataContentUrlField) {
        setProperty("dataContentUrlField", dataContentUrlField);
    }

    public boolean getCollapsible() {
        return (boolean)getProperty("collapsible");
    }

    public void setCollapsible(boolean collapsible) {
        setProperty("collapsible", collapsible);
    }

    //<< Attributes
}