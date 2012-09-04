package com.kendoui.taglib;

@SuppressWarnings("serial")
public class CalendarTag extends WidgetTag {
    public CalendarTag() {
        super("Calendar");
    }

    //>> Attributes

    public String getUrl() {
        return (String)getProperty("url");
    }

    public void setUrl(String url) {
        setProperty("url", url);
    }

    public String getCulture() {
        return (String)getProperty("culture");
    }

    public void setCulture(String culture) {
        setProperty("culture", culture);
    }

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

    //<< Attributes
}