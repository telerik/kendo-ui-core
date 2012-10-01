package com.kendoui.taglib;

import com.kendoui.taglib.json.Function;

@SuppressWarnings("serial")
public class DateTimePickerTag extends WidgetTag /* interfaces */implements Animation, Month/* interfaces */ {
    public DateTimePickerTag() {
        super("DateTimePicker");
    }

    //>> Attributes

    @Override
    public void setAnimation(AnimationTag value) {
        setProperty("animation", value);
    }

    @Override
    public void setMonth(MonthTag value) {
        setProperty("month", value);
    }

    public String getCulture() {
        return (String)getProperty("culture");
    }

    public void setCulture(String value) {
        setProperty("culture", value);
    }

    public String getDepth() {
        return (String)getProperty("depth");
    }

    public void setDepth(String value) {
        setProperty("depth", value);
    }

    public String getFooter() {
        return (String)getProperty("footer");
    }

    public void setFooter(String value) {
        setProperty("footer", value);
    }

    public String getFormat() {
        return (String)getProperty("format");
    }

    public void setFormat(String value) {
        setProperty("format", value);
    }

    public int getInterval() {
        return (int)getProperty("interval");
    }

    public void setInterval(int value) {
        setProperty("interval", value);
    }

    public String getStart() {
        return (String)getProperty("start");
    }

    public void setStart(String value) {
        setProperty("start", value);
    }

    public String getTimeFormat() {
        return (String)getProperty("timeFormat");
    }

    public void setTimeFormat(String value) {
        setProperty("timeFormat", value);
    }

    public String getChange() {
        return ((Function)getProperty("change")).getBody();
    }

    public void setChange(String value) {
        setProperty("change", new Function(value));
    }

    public String getClose() {
        return ((Function)getProperty("close")).getBody();
    }

    public void setClose(String value) {
        setProperty("close", new Function(value));
    }

    public String getOpen() {
        return ((Function)getProperty("open")).getBody();
    }

    public void setOpen(String value) {
        setProperty("open", new Function(value));
    }

//<< Attributes
}