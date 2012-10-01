
package com.kendoui.taglib;

import com.kendoui.taglib.json.Function;

@SuppressWarnings("serial")
public class PagerTag extends WidgetTag /* interfaces */implements DataBoundWidget, Messages/* interfaces */ {

    public PagerTag() {
        super("Pager");
    }

//>> Attributes

    @Override
    public void setMessages(MessagesTag value) {
        setProperty("messages", value);
    }

    public boolean getAutoBind() {
        return (boolean)getProperty("autoBind");
    }

    public void setAutoBind(boolean value) {
        setProperty("autoBind", value);
    }

    public int getButtonCount() {
        return (int)getProperty("buttonCount");
    }

    public void setButtonCount(int value) {
        setProperty("buttonCount", value);
    }

    @Override
    public void setDataSource(DataSourceTag dataSource) {
        setProperty("dataSource", dataSource);
    }

    public String getSelectTemplate() {
        return (String)getProperty("selectTemplate");
    }

    public void setSelectTemplate(String value) {
        setProperty("selectTemplate", value);
    }

    public String getLinkTemplate() {
        return (String)getProperty("linkTemplate");
    }

    public void setLinkTemplate(String value) {
        setProperty("linkTemplate", value);
    }

    public boolean getInfo() {
        return (boolean)getProperty("info");
    }

    public void setInfo(boolean value) {
        setProperty("info", value);
    }

    public boolean getInput() {
        return (boolean)getProperty("input");
    }

    public void setInput(boolean value) {
        setProperty("input", value);
    }

    public boolean getNumeric() {
        return (boolean)getProperty("numeric");
    }

    public void setNumeric(boolean value) {
        setProperty("numeric", value);
    }

    public boolean getPreviousNext() {
        return (boolean)getProperty("previousNext");
    }

    public void setPreviousNext(boolean value) {
        setProperty("previousNext", value);
    }

    public boolean getRefresh() {
        return (boolean)getProperty("refresh");
    }

    public void setRefresh(boolean value) {
        setProperty("refresh", value);
    }

    public String getChange() {
        return ((Function)getProperty("change")).getBody();
    }

    public void setChange(String value) {
        setProperty("change", new Function(value));
    }

//<< Attributes
}
