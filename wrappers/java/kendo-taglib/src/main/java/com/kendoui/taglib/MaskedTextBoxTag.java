
package com.kendoui.taglib;

import com.kendoui.taglib.maskedtextbox.*;
import com.kendoui.taglib.html.Element;
import com.kendoui.taglib.html.Input;
import com.kendoui.taglib.json.Function;

import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class MaskedTextBoxTag extends WidgetTag /* interfaces *//* interfaces */ {

    public MaskedTextBoxTag() {
        super("MaskedTextBox");
    }
    
    @Override
    protected Element<?> createElement() {
        return new Input().attr("name", getName());
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
        return "maskedTextBox";
    }

    public void setChange(ChangeFunctionTag value) {
        setEvent("change", value.getBody());
    }

    public java.lang.String getCulture() {
        return (java.lang.String)getProperty("culture");
    }

    public void setCulture(java.lang.String value) {
        setProperty("culture", value);
    }

    public java.lang.String getMask() {
        return (java.lang.String)getProperty("mask");
    }

    public void setMask(java.lang.String value) {
        setProperty("mask", value);
    }

    public java.lang.String getPromptChar() {
        return (java.lang.String)getProperty("promptChar");
    }

    public void setPromptChar(java.lang.String value) {
        setProperty("promptChar", value);
    }

    public java.lang.Object getRules() {
        return (java.lang.Object)getProperty("rules");
    }

    public void setRules(java.lang.Object value) {
        setProperty("rules", value);
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
