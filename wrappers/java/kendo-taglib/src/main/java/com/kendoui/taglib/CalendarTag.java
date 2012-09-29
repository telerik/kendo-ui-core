package com.kendoui.taglib;

import com.kendoui.taglib.json.Function;

@SuppressWarnings("serial")
public class CalendarTag extends WidgetTag {
    public CalendarTag() {
        super("Calendar");
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

    public Date getMax() {
        return (Date)getProperty("max");
    }

    public void setMax(Date value) {
        setProperty("max", value);
    }

    public Date getMin() {
        return (Date)getProperty("min");
    }

    public void setMin(Date value) {
        setProperty("min", value);
    }

    public String getStart() {
        return (String)getProperty("start");
    }

    public void setStart(String value) {
        setProperty("start", value);
    }

    public Date getValue() {
        return (Date)getProperty("value");
    }

    public void setValue(Date value) {
        setProperty("value", value);
    }

    public String getChange() {
        return ((Function)getProperty("change")).getBody();
    }

    public void setChange(String value) {
        setProperty("change", new Function(value));
    }

    public String getNavigate() {
        return ((Function)getProperty("navigate")).getBody();
    }

    public void setNavigate(String value) {
        setProperty("navigate", new Function(value));
    }

//<< Attributes
}