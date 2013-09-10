
package com.kendoui.taglib;


import com.kendoui.taglib.dropdownlist.*;


import com.kendoui.taglib.html.Element;
import com.kendoui.taglib.html.Input;
import com.kendoui.taglib.json.Function;


import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class DropDownListTag extends WidgetTag /* interfaces */implements DataBoundWidget/* interfaces */ {

    public DropDownListTag() {
        super("DropDownList");
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
        return "dropDownList";
    }

    public void setAnimation(com.kendoui.taglib.dropdownlist.AnimationTag value) {
        setProperty("animation", value);
    }

    public void setCascade(CascadeFunctionTag value) {
        setEvent("cascade", value.getBody());
    }

    public void setChange(ChangeFunctionTag value) {
        setEvent("change", value.getBody());
    }

    public void setClose(CloseFunctionTag value) {
        setEvent("close", value.getBody());
    }

    public void setDataBound(DataBoundFunctionTag value) {
        setEvent("dataBound", value.getBody());
    }

    public void setOpen(OpenFunctionTag value) {
        setEvent("open", value.getBody());
    }

    public void setSelect(SelectFunctionTag value) {
        setEvent("select", value.getBody());
    }

    public boolean getAutoBind() {
        return (boolean)getProperty("autoBind");
    }

    public void setAutoBind(boolean value) {
        setProperty("autoBind", value);
    }

    public java.lang.String getCascadeFrom() {
        return (java.lang.String)getProperty("cascadeFrom");
    }

    public void setCascadeFrom(java.lang.String value) {
        setProperty("cascadeFrom", value);
    }

    public void setDataSource(DataSourceTag dataSource) {
        setProperty("dataSource", dataSource);
    }

    public java.lang.String getDataTextField() {
        return (java.lang.String)getProperty("dataTextField");
    }

    public void setDataTextField(java.lang.String value) {
        setProperty("dataTextField", value);
    }

    public java.lang.String getDataValueField() {
        return (java.lang.String)getProperty("dataValueField");
    }

    public void setDataValueField(java.lang.String value) {
        setProperty("dataValueField", value);
    }

    public float getDelay() {
        return (float)getProperty("delay");
    }

    public void setDelay(float value) {
        setProperty("delay", value);
    }

    public boolean getEnable() {
        return (boolean)getProperty("enable");
    }

    public void setEnable(boolean value) {
        setProperty("enable", value);
    }

    public float getHeight() {
        return (float)getProperty("height");
    }

    public void setHeight(float value) {
        setProperty("height", value);
    }

    public java.lang.String getIgnoreCase() {
        return (java.lang.String)getProperty("ignoreCase");
    }

    public void setIgnoreCase(java.lang.String value) {
        setProperty("ignoreCase", value);
    }

    public float getIndex() {
        return (float)getProperty("index");
    }

    public void setIndex(float value) {
        setProperty("index", value);
    }

    public java.lang.Object getOptionLabel() {
        return (java.lang.Object)getProperty("optionLabel");
    }

    public void setOptionLabel(java.lang.Object value) {
        setProperty("optionLabel", value);
    }

    public java.lang.String getTemplate() {
        return (java.lang.String)getProperty("template");
    }

    public void setTemplate(java.lang.String value) {
        setProperty("template", value);
    }

    public java.lang.String getText() {
        return (java.lang.String)getProperty("text");
    }

    public void setText(java.lang.String value) {
        setProperty("text", value);
    }

    public java.lang.String getValue() {
        return (java.lang.String)getProperty("value");
    }

    public void setValue(java.lang.String value) {
        setProperty("value", value);
    }

    public boolean getValuePrimitive() {
        return (boolean)getProperty("valuePrimitive");
    }

    public void setValuePrimitive(boolean value) {
        setProperty("valuePrimitive", value);
    }

    public String getCascade() {
        Function property = ((Function)getProperty("cascade"));
        if (property != null) {
            return property.getBody();
        }
        return null;
    }

    public void setCascade(String value) {
        setProperty("cascade", new Function(value));
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

    public String getClose() {
        Function property = ((Function)getProperty("close"));
        if (property != null) {
            return property.getBody();
        }
        return null;
    }

    public void setClose(String value) {
        setProperty("close", new Function(value));
    }

    public String getDataBound() {
        Function property = ((Function)getProperty("dataBound"));
        if (property != null) {
            return property.getBody();
        }
        return null;
    }

    public void setDataBound(String value) {
        setProperty("dataBound", new Function(value));
    }

    public String getOpen() {
        Function property = ((Function)getProperty("open"));
        if (property != null) {
            return property.getBody();
        }
        return null;
    }

    public void setOpen(String value) {
        setProperty("open", new Function(value));
    }

    public String getSelect() {
        Function property = ((Function)getProperty("select"));
        if (property != null) {
            return property.getBody();
        }
        return null;
    }

    public void setSelect(String value) {
        setProperty("select", new Function(value));
    }

//<< Attributes

}
