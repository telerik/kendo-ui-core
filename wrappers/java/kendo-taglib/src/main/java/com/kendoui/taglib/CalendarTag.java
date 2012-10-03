
package com.kendoui.taglib;


import com.kendoui.taglib.calendar.*;


import com.kendoui.taglib.json.Function;


@SuppressWarnings("serial")
public class CalendarTag extends WidgetTag /* interfaces */implements Month/* interfaces */ {

    public CalendarTag() {
        super("Calendar");
    }

//>> Attributes

    @Override
    public void setMonth(MonthTag value) {
        setProperty("month", value.properties());
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

    public String getStart() {
        return (String)getProperty("start");
    }

    public void setStart(String value) {
        setProperty("start", value);
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
