package com.kendoui.taglib;

@SuppressWarnings("serial")
public class TimePickerTag extends WidgetTag {
    public TimePickerTag() {
        super("TimePicker");
    }

    //>> Attributes

    public String getFormat() {
        return (String)getProperty("format");
    }

    public void setFormat(String format) {
        setProperty("format", format);
    }

    public int getInterval() {
        return (int)getProperty("interval");
    }

    public void setInterval(int interval) {
        setProperty("interval", interval);
    }

    public int getHeight() {
        return (int)getProperty("height");
    }

    public void setHeight(int height) {
        setProperty("height", height);
    }

    //<< Attributes
}