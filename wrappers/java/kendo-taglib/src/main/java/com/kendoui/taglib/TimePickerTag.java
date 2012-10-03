
package com.kendoui.taglib;


import com.kendoui.taglib.timepicker.*;


import com.kendoui.taglib.json.Function;


@SuppressWarnings("serial")
public class TimePickerTag extends WidgetTag /* interfaces */implements Animation/* interfaces */ {

    public TimePickerTag() {
        super("TimePicker");
    }

//>> Attributes

    @Override
    public void setAnimation(AnimationTag value) {
        setProperty("animation", value.properties());
    }

    public String getCulture() {
        return (String)getProperty("culture");
    }

    public void setCulture(String value) {
        setProperty("culture", value);
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
