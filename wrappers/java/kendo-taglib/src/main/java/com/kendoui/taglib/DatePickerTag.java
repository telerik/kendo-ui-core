package com.kendoui.taglib;

import com.kendoui.taglib.json.Function;

@SuppressWarnings("serial")
public class DatePickerTag extends WidgetTag {
    public DatePickerTag() {
        super("DatePicker");
    }

    //>> Attributes

    public String getFooter() {
        return (String)getProperty("footer");
    }

    public void setFooter(String footer) {
        setProperty("footer", footer);
    }

    public String getFormat() {
        return (String)getProperty("format");
    }

    public void setFormat(String format) {
        setProperty("format", format);
    }

    public String getCulture() {
        return (String)getProperty("culture");
    }

    public void setCulture(String culture) {
        setProperty("culture", culture);
    }

    public String getStart() {
        return (String)getProperty("start");
    }

    public void setStart(String start) {
        setProperty("start", start);
    }

    public String getDepth() {
        return (String)getProperty("depth");
    }

    public void setDepth(String depth) {
        setProperty("depth", depth);
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