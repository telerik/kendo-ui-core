package com.kendoui.taglib;

import com.kendoui.taglib.html.Element;
import com.kendoui.taglib.html.Input;
import com.kendoui.taglib.json.Function;

@SuppressWarnings("serial")
public class AutoCompleteTag extends WidgetTag implements DataBoundWidget {

    public AutoCompleteTag() {
        super("AutoComplete");
    }

    @Override
    public void setDataSource(DataSourceTag dataSource) {
        setProperty("dataSource", dataSource);
    }

    @Override
    protected Element<?> createElement() {
        return new Input();
    }

//>> Attributes

    public boolean getSuggest() {
        return (boolean)getProperty("suggest");
    }

    public void setSuggest(boolean suggest) {
        setProperty("suggest", suggest);
    }

    public String getDataTextField() {
        return (String)getProperty("dataTextField");
    }

    public void setDataTextField(String dataTextField) {
        setProperty("dataTextField", dataTextField);
    }

    public int getMinLength() {
        return (int)getProperty("minLength");
    }

    public void setMinLength(int minLength) {
        setProperty("minLength", minLength);
    }

    public int getDelay() {
        return (int)getProperty("delay");
    }

    public void setDelay(int delay) {
        setProperty("delay", delay);
    }

    public int getHeight() {
        return (int)getProperty("height");
    }

    public void setHeight(int height) {
        setProperty("height", height);
    }

    public String getFilter() {
        return (String)getProperty("filter");
    }

    public void setFilter(String filter) {
        setProperty("filter", filter);
    }

    public boolean getIgnoreCase() {
        return (boolean)getProperty("ignoreCase");
    }

    public void setIgnoreCase(boolean ignoreCase) {
        setProperty("ignoreCase", ignoreCase);
    }

    public boolean getHighlightFirst() {
        return (boolean)getProperty("highlightFirst");
    }

    public void setHighlightFirst(boolean highlightFirst) {
        setProperty("highlightFirst", highlightFirst);
    }

    public String getPlaceholder() {
        return (String)getProperty("placeholder");
    }

    public void setPlaceholder(String placeholder) {
        setProperty("placeholder", placeholder);
    }

    public String getOpen() {
        return ((Function)getProperty("open")).getBody();
    }

    public void setOpen(String open) {
        setProperty("open", new Function(open));
    }

    public String getClose() {
        return ((Function)getProperty("close")).getBody();
    }

    public void setClose(String close) {
        setProperty("close", new Function(close));
    }

    public String getChange() {
        return ((Function)getProperty("change")).getBody();
    }

    public void setChange(String change) {
        setProperty("change", new Function(change));
    }

    public String getSelect() {
        return ((Function)getProperty("select")).getBody();
    }

    public void setSelect(String select) {
        setProperty("select", new Function(select));
    }

    public String getDataBinding() {
        return ((Function)getProperty("dataBinding")).getBody();
    }

    public void setDataBinding(String dataBinding) {
        setProperty("dataBinding", new Function(dataBinding));
    }

    public String getDataBound() {
        return ((Function)getProperty("dataBound")).getBody();
    }

    public void setDataBound(String dataBound) {
        setProperty("dataBound", new Function(dataBound));
    }

    //<< Attributes
}
