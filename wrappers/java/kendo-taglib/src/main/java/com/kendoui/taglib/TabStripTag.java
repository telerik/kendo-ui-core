package com.kendoui.taglib;

import com.kendoui.taglib.json.Function;

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

    public String getSelect() {
        return ((Function)getProperty("select")).getBody();
    }

    public void setSelect(String select) {
        setProperty("select", new Function(select));
    }

    public String getActivate() {
        return ((Function)getProperty("activate")).getBody();
    }

    public void setActivate(String activate) {
        setProperty("activate", new Function(activate));
    }

    public String getError() {
        return ((Function)getProperty("error")).getBody();
    }

    public void setError(String error) {
        setProperty("error", new Function(error));
    }

    public String getContentLoad() {
        return ((Function)getProperty("contentLoad")).getBody();
    }

    public void setContentLoad(String contentLoad) {
        setProperty("contentLoad", new Function(contentLoad));
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

    //<< Attributes
}