package com.kendoui.taglib;

@SuppressWarnings("serial")
public class DropDownListTag extends WidgetTag {
    public DropDownListTag() {
        super("DropDownList");
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

    public String getText() {
        return (String)getProperty("text");
    }

    public void setText(String text) {
        setProperty("text", text);
    }

    public int getDelay() {
        return (int)getProperty("delay");
    }

    public void setDelay(int delay) {
        setProperty("delay", delay);
    }

    public int getHeight() {
        return (int)getProperty("height");
    }

    public void setHeight(int height) {
        setProperty("height", height);
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

    public String getOptionLabel() {
        return (String)getProperty("optionLabel");
    }

    public void setOptionLabel(String optionLabel) {
        setProperty("optionLabel", optionLabel);
    }

    public String getCascadeFrom() {
        return (String)getProperty("cascadeFrom");
    }

    public void setCascadeFrom(String cascadeFrom) {
        setProperty("cascadeFrom", cascadeFrom);
    }

    public boolean getIgnoreCase() {
        return (boolean)getProperty("ignoreCase");
    }

    public void setIgnoreCase(boolean ignoreCase) {
        setProperty("ignoreCase", ignoreCase);
    }

    //<< Attributes
}