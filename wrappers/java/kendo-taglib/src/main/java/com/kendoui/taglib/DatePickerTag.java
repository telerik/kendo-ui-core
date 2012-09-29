package com.kendoui.taglib;

import com.kendoui.taglib.json.Function;

@SuppressWarnings("serial")
public class DatePickerTag extends WidgetTag {
    public DatePickerTag() {
        super("DatePicker");
    }

    //>> Attributes

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

    public String getMax() {
        return ((Function)getProperty("max")).getBody();
    }

    public void setMax(String value) {
        setProperty("max", new Function(value));
    }

    public String getMin() {
        return ((Function)getProperty("min")).getBody();
    }

    public void setMin(String value) {
        setProperty("min", new Function(value));
    }

    public String getParseFormats() {
        return ((Function)getProperty("parseFormats")).getBody();
    }

    public void setParseFormats(String value) {
        setProperty("parseFormats", new Function(value));
    }

    public String getStart() {
        return (String)getProperty("start");
    }

    public void setStart(String value) {
        setProperty("start", value);
    }

    public String getValue() {
        return ((Function)getProperty("value")).getBody();
    }

    public void setValue(String value) {
        setProperty("value", new Function(value));
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