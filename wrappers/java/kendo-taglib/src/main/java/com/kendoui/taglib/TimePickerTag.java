package com.kendoui.taglib;

import com.kendoui.taglib.json.Function;

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

    public Function getOpen() {
        return (Function)getProperty("open");
    }

    public void setOpen(String open) {
        setProperty("open", new Function(open));
    }

    public Function getClose() {
        return (Function)getProperty("close");
    }

    public void setClose(String close) {
        setProperty("close", new Function(close));
    }

    public Function getChange() {
        return (Function)getProperty("change");
    }

    public void setChange(String change) {
        setProperty("change", new Function(change));
    }

    //<< Attributes
}