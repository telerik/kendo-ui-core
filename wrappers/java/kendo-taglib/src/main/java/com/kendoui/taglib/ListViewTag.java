package com.kendoui.taglib;

import com.kendoui.taglib.json.Function;

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

    public String getChange() {
        return ((Function)getProperty("change")).getBody();
    }

    public void setChange(String change) {
        setProperty("change", new Function(change));
    }

    public String getDataBinding() {
        return ((Function)getProperty("dataBinding")).getBody();
    }

    public void setDataBinding(String dataBinding) {
        setProperty("dataBinding", new Function(dataBinding));
    }

    public String getDataBound() {
        return ((Function)getProperty("dataBound")).getBody();
    }

    public void setDataBound(String dataBound) {
        setProperty("dataBound", new Function(dataBound));
    }

    public String getEdit() {
        return ((Function)getProperty("edit")).getBody();
    }

    public void setEdit(String edit) {
        setProperty("edit", new Function(edit));
    }

    public String getRemove() {
        return ((Function)getProperty("remove")).getBody();
    }

    public void setRemove(String remove) {
        setProperty("remove", new Function(remove));
    }

    public String getSave() {
        return ((Function)getProperty("save")).getBody();
    }

    public void setSave(String save) {
        setProperty("save", new Function(save));
    }

    //<< Attributes
}