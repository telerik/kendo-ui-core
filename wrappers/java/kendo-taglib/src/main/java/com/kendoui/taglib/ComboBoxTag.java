package com.kendoui.taglib;

@SuppressWarnings("serial")
public class ComboBoxTag extends WidgetTag {
    public ComboBoxTag() {
        super("ComboBox");
    }

    //>> Attributes

    public boolean getEnable() {
        return (boolean)getProperty("enable");
    }

    public void setEnable(boolean enable) {
        setProperty("enable", enable);
    }

    public int getIndex() {
        return (int)getProperty("index");
    }

    public void setIndex(int index) {
        setProperty("index", index);
    }

    public boolean getAutoBind() {
        return (boolean)getProperty("autoBind");
    }

    public void setAutoBind(boolean autoBind) {
        setProperty("autoBind", autoBind);
    }

    public int getDelay() {
        return (int)getProperty("delay");
    }

    public void setDelay(int delay) {
        setProperty("delay", delay);
    }

    public String getDataTextField() {
        return (String)getProperty("dataTextField");
    }

    public void setDataTextField(String dataTextField) {
        setProperty("dataTextField", dataTextField);
    }

    public String getDataValueField() {
        return (String)getProperty("dataValueField");
    }

    public void setDataValueField(String dataValueField) {
        setProperty("dataValueField", dataValueField);
    }

    public int getMinLength() {
        return (int)getProperty("minLength");
    }

    public void setMinLength(int minLength) {
        setProperty("minLength", minLength);
    }

    public int getHeight() {
        return (int)getProperty("height");
    }

    public void setHeight(int height) {
        setProperty("height", height);
    }

    public boolean getHighlightFirst() {
        return (boolean)getProperty("highlightFirst");
    }

    public void setHighlightFirst(boolean highlightFirst) {
        setProperty("highlightFirst", highlightFirst);
    }

    public String getFilter() {
        return (String)getProperty("filter");
    }

    public void setFilter(String filter) {
        setProperty("filter", filter);
    }

    public String getPlaceholder() {
        return (String)getProperty("placeholder");
    }

    public void setPlaceholder(String placeholder) {
        setProperty("placeholder", placeholder);
    }

    public boolean getSuggest() {
        return (boolean)getProperty("suggest");
    }

    public void setSuggest(boolean suggest) {
        setProperty("suggest", suggest);
    }

    public boolean getIgnoreCase() {
        return (boolean)getProperty("ignoreCase");
    }

    public void setIgnoreCase(boolean ignoreCase) {
        setProperty("ignoreCase", ignoreCase);
    }

    //<< Attributes
}