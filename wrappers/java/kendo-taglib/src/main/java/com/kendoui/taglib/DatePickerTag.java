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

    public String getOpen() {
        return ((Function)getProperty("open")).getBody();
    }

    public void setOpen(String open) {
        setProperty("open", new Function(open));
    }

    public String getClose() {
        return ((Function)getProperty("close")).getBody();
    }

    public void setClose(String close) {
        setProperty("close", new Function(close));
    }

    public String getChange() {
        return ((Function)getProperty("change")).getBody();
    }

    public void setChange(String change) {
        setProperty("change", new Function(change));
    }

    //<< Attributes
}