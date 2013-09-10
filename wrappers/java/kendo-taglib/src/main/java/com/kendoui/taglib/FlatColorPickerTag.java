
package com.kendoui.taglib;



import com.kendoui.taglib.flatcolorpicker.ChangeFunctionTag;
import com.kendoui.taglib.json.Function;


import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class FlatColorPickerTag extends WidgetTag /* interfaces *//* interfaces */ {

    public FlatColorPickerTag() {
        super("FlatColorPicker");
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
        return "flatColorPicker";
    }

    public void setChange(ChangeFunctionTag value) {
        setEvent("change", value.getBody());
    }

    public boolean getAutoupdate() {
        return (boolean)getProperty("autoupdate");
    }

    public void setAutoupdate(boolean value) {
        setProperty("autoupdate", value);
    }

    public boolean getButtons() {
        return (boolean)getProperty("buttons");
    }

    public void setButtons(boolean value) {
        setProperty("buttons", value);
    }

    public java.lang.Object getMessages() {
        return (java.lang.Object)getProperty("messages");
    }

    public void setMessages(java.lang.Object value) {
        setProperty("messages", value);
    }

    public boolean getOpacity() {
        return (boolean)getProperty("opacity");
    }

    public void setOpacity(boolean value) {
        setProperty("opacity", value);
    }

    public boolean getPreview() {
        return (boolean)getProperty("preview");
    }

    public void setPreview(boolean value) {
        setProperty("preview", value);
    }

    public java.lang.String getValue() {
        return (java.lang.String)getProperty("value");
    }

    public void setValue(java.lang.String value) {
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

//<< Attributes

}
