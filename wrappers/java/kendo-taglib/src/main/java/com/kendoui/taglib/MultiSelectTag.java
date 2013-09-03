
package com.kendoui.taglib;


import com.kendoui.taglib.multiselect.*;

import com.kendoui.taglib.html.Element;
import com.kendoui.taglib.html.Select;
import com.kendoui.taglib.json.Function;


import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class MultiSelectTag extends WidgetTag /* interfaces */implements DataBoundWidget/* interfaces */ {

    public MultiSelectTag() {
        super("MultiSelect");
    }
    
    @Override
    protected Element<?> createElement() {
        return new Select().attr("name", getName()).attr("multiple", "multiple");
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
        return "multiSelect";
    }

    public void setAnimation(com.kendoui.taglib.multiselect.AnimationTag value) {
        setProperty("animation", value);
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

    public java.lang.String getFilter() {
        return (java.lang.String)getProperty("filter");
    }

    public void setFilter(java.lang.String value) {
        setProperty("filter", value);
    }

    public float getHeight() {
        return (float)getProperty("height");
    }

    public void setHeight(float value) {
        setProperty("height", value);
    }

    public boolean getHighlightFirst() {
        return (boolean)getProperty("highlightFirst");
    }

    public void setHighlightFirst(boolean value) {
        setProperty("highlightFirst", value);
    }

    public java.lang.String getIgnoreCase() {
        return (java.lang.String)getProperty("ignoreCase");
    }

    public void setIgnoreCase(java.lang.String value) {
        setProperty("ignoreCase", value);
    }

    public java.lang.String getItemTemplate() {
        return (java.lang.String)getProperty("itemTemplate");
    }

    public void setItemTemplate(java.lang.String value) {
        setProperty("itemTemplate", value);
    }

    public float getMaxSelectedItems() {
        return (float)getProperty("maxSelectedItems");
    }

    public void setMaxSelectedItems(float value) {
        setProperty("maxSelectedItems", value);
    }

    public float getMinLength() {
        return (float)getProperty("minLength");
    }

    public void setMinLength(float value) {
        setProperty("minLength", value);
    }

    public java.lang.String getPlaceholder() {
        return (java.lang.String)getProperty("placeholder");
    }

    public void setPlaceholder(java.lang.String value) {
        setProperty("placeholder", value);
    }

    public java.lang.String getTagTemplate() {
        return (java.lang.String)getProperty("tagTemplate");
    }

    public void setTagTemplate(java.lang.String value) {
        setProperty("tagTemplate", value);
    }

    public java.lang.Object getValue() {
        return (java.lang.Object)getProperty("value");
    }

    public void setValue(java.lang.Object value) {
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
