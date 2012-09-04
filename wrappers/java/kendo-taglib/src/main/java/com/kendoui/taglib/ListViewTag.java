package com.kendoui.taglib;

@SuppressWarnings("serial")
public class ListViewTag extends WidgetTag {
    public ListViewTag() {
        super("ListView");
    }

    //>> Attributes

    public boolean getAutoBind() {
        return (boolean)getProperty("autoBind");
    }

    public void setAutoBind(boolean autoBind) {
        setProperty("autoBind", autoBind);
    }

    public boolean getSelectable() {
        return (boolean)getProperty("selectable");
    }

    public void setSelectable(boolean selectable) {
        setProperty("selectable", selectable);
    }

    public boolean getNavigatable() {
        return (boolean)getProperty("navigatable");
    }

    public void setNavigatable(boolean navigatable) {
        setProperty("navigatable", navigatable);
    }

    public String getTemplate() {
        return (String)getProperty("template");
    }

    public void setTemplate(String template) {
        setProperty("template", template);
    }

    public String getAltTemplate() {
        return (String)getProperty("altTemplate");
    }

    public void setAltTemplate(String altTemplate) {
        setProperty("altTemplate", altTemplate);
    }

    public String getEditTemplate() {
        return (String)getProperty("editTemplate");
    }

    public void setEditTemplate(String editTemplate) {
        setProperty("editTemplate", editTemplate);
    }

    //<< Attributes
}