
package com.kendoui.taglib;


import com.kendoui.taglib.calendar.*;


import com.kendoui.taglib.json.Function;


import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class CalendarTag extends WidgetTag /* interfaces *//* interfaces */ {

    public CalendarTag() {
        super("Calendar");
    }

    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag
//<< doEndTag

        return super.doEndTag();
    }

    @Override
    public void initialize() {
//>> initialize
//<< initialize

        super.initialize();
    }

    @Override
    public void destroy() {
//>> destroy
//<< destroy

        super.destroy();
    }

//>> Attributes

    public static String tagName() {
        return "calendar";
    }

    public void setMonth(com.kendoui.taglib.calendar.MonthTag value) {
        setProperty("month", value);
    }

    public void setChange(ChangeFunctionTag value) {
        setEvent("change", value.getBody());
    }

    public void setNavigate(NavigateFunctionTag value) {
        setEvent("navigate", value.getBody());
    }

    public java.lang.String getCulture() {
        return (java.lang.String)getProperty("culture");
    }

    public void setCulture(java.lang.String value) {
        setProperty("culture", value);
    }

    public java.lang.Object getDates() {
        return (java.lang.Object)getProperty("dates");
    }

    public void setDates(java.lang.Object value) {
        setProperty("dates", value);
    }

    public java.lang.String getDepth() {
        return (java.lang.String)getProperty("depth");
    }

    public void setDepth(java.lang.String value) {
        setProperty("depth", value);
    }

    public java.lang.String getFooter() {
        return (java.lang.String)getProperty("footer");
    }

    public void setFooter(java.lang.String value) {
        setProperty("footer", value);
    }

    public java.lang.String getFormat() {
        return (java.lang.String)getProperty("format");
    }

    public void setFormat(java.lang.String value) {
        setProperty("format", value);
    }

    public java.util.Date getMax() {
        return (java.util.Date)getProperty("max");
    }

    public void setMax(java.util.Date value) {
        setProperty("max", value);
    }

    public java.util.Date getMin() {
        return (java.util.Date)getProperty("min");
    }

    public void setMin(java.util.Date value) {
        setProperty("min", value);
    }

    public java.lang.String getStart() {
        return (java.lang.String)getProperty("start");
    }

    public void setStart(java.lang.String value) {
        setProperty("start", value);
    }

    public java.util.Date getValue() {
        return (java.util.Date)getProperty("value");
    }

    public void setValue(java.util.Date value) {
        setProperty("value", value);
    }

    public String getChange() {
        Function property = ((Function)getProperty("change"));
        if (property != null) {
            return property.getBody();
        }
        return null;
    }

    public void setChange(String value) {
        setProperty("change", new Function(value));
    }

    public String getNavigate() {
        Function property = ((Function)getProperty("navigate"));
        if (property != null) {
            return property.getBody();
        }
        return null;
    }

    public void setNavigate(String value) {
        setProperty("navigate", new Function(value));
    }

//<< Attributes

}
