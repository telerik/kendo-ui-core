
package com.kendoui.taglib;


import com.kendoui.taglib.dropdownlist.*;


import com.kendoui.taglib.json.Function;


import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class DropDownListTag extends WidgetTag /* interfaces */implements Animation, DataBoundWidget/* interfaces */ {

    public DropDownListTag() {
        super("DropDownList");
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

    @Override
    public void setAnimation(AnimationTag value) {
        setProperty("animation", value.properties());
    }

    public boolean getAutoBind() {
        return (boolean)getProperty("autoBind");
    }

    public void setAutoBind(boolean value) {
        setProperty("autoBind", value);
    }

    public String getCascadeFrom() {
        return (String)getProperty("cascadeFrom");
    }

    public void setCascadeFrom(String value) {
        setProperty("cascadeFrom", value);
    }

    @Override
    public void setDataSource(DataSourceTag dataSource) {
        setProperty("dataSource", dataSource.properties());
    }

    public String getDataTextField() {
        return (String)getProperty("dataTextField");
    }

    public void setDataTextField(String value) {
        setProperty("dataTextField", value);
    }

    public String getDataValueField() {
        return (String)getProperty("dataValueField");
    }

    public void setDataValueField(String value) {
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

    public String getIgnoreCase() {
        return (String)getProperty("ignoreCase");
    }

    public void setIgnoreCase(String value) {
        setProperty("ignoreCase", value);
    }

    public float getIndex() {
        return (float)getProperty("index");
    }

    public void setIndex(float value) {
        setProperty("index", value);
    }

    public String getOptionLabel() {
        return (String)getProperty("optionLabel");
    }

    public void setOptionLabel(String value) {
        setProperty("optionLabel", value);
    }

    public String getTemplate() {
        return (String)getProperty("template");
    }

    public void setTemplate(String value) {
        setProperty("template", value);
    }

    public String getText() {
        return (String)getProperty("text");
    }

    public void setText(String value) {
        setProperty("text", value);
    }

    public String getValue() {
        return (String)getProperty("value");
    }

    public void setValue(String value) {
        setProperty("value", value);
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

    public String getSelect() {
        return ((Function)getProperty("select")).getBody();
    }

    public void setSelect(String value) {
        setProperty("select", new Function(value));
    }

//<< Attributes

}
