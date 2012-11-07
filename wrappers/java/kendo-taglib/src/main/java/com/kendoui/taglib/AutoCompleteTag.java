
package com.kendoui.taglib;


import com.kendoui.taglib.autocomplete.*;


import com.kendoui.taglib.html.Element;
import com.kendoui.taglib.html.Input;
import com.kendoui.taglib.json.Function;


import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class AutoCompleteTag extends WidgetTag /* interfaces */implements DataBoundWidget/* interfaces */ {

    public AutoCompleteTag() {
        super("AutoComplete");
    }

    @Override
    public Element<?> createElement() {
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
        return "autoComplete";
    }

    public void setAnimation(AnimationTag value) {
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

    @Override
    public void setDataSource(DataSourceTag dataSource) {
        setProperty("dataSource", dataSource);
    }

    public String getDataTextField() {
        return (String)getProperty("dataTextField");
    }

    public void setDataTextField(String value) {
        setProperty("dataTextField", value);
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

    public String getFilter() {
        return (String)getProperty("filter");
    }

    public void setFilter(String value) {
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

    public boolean getIgnoreCase() {
        return (boolean)getProperty("ignoreCase");
    }

    public void setIgnoreCase(boolean value) {
        setProperty("ignoreCase", value);
    }

    public float getMinLength() {
        return (float)getProperty("minLength");
    }

    public void setMinLength(float value) {
        setProperty("minLength", value);
    }

    public String getPlaceholder() {
        return (String)getProperty("placeholder");
    }

    public void setPlaceholder(String value) {
        setProperty("placeholder", value);
    }

    public String getSeparator() {
        return (String)getProperty("separator");
    }

    public void setSeparator(String value) {
        setProperty("separator", value);
    }

    public boolean getSuggest() {
        return (boolean)getProperty("suggest");
    }

    public void setSuggest(boolean value) {
        setProperty("suggest", value);
    }

    public String getTemplate() {
        return (String)getProperty("template");
    }

    public void setTemplate(String value) {
        setProperty("template", value);
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
