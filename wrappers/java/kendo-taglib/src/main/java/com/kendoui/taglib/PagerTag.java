
package com.kendoui.taglib;


import com.kendoui.taglib.pager.*;


import com.kendoui.taglib.json.Function;


import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class PagerTag extends WidgetTag /* interfaces */implements DataBoundWidget/* interfaces */ {

    public PagerTag() {
        super("Pager");
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
        return "pager";
    }

    public void setMessages(com.kendoui.taglib.pager.MessagesTag value) {
        setProperty("messages", value);
    }

    public void setChange(ChangeFunctionTag value) {
        setEvent("change", value.getBody());
    }

    public boolean getAutoBind() {
        return (boolean)getProperty("autoBind");
    }

    public void setAutoBind(boolean value) {
        setProperty("autoBind", value);
    }

    public float getButtonCount() {
        return (float)getProperty("buttonCount");
    }

    public void setButtonCount(float value) {
        setProperty("buttonCount", value);
    }

    public void setDataSource(DataSourceTag dataSource) {
        setProperty("dataSource", dataSource);
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

    public java.lang.String getLinkTemplate() {
        return (java.lang.String)getProperty("linkTemplate");
    }

    public void setLinkTemplate(java.lang.String value) {
        setProperty("linkTemplate", value);
    }

    public boolean getNumeric() {
        return (boolean)getProperty("numeric");
    }

    public void setNumeric(boolean value) {
        setProperty("numeric", value);
    }

    public java.lang.Object getPageSizes() {
        return (java.lang.Object)getProperty("pageSizes");
    }

    public void setPageSizes(java.lang.Object value) {
        setProperty("pageSizes", value);
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

    public java.lang.String getSelectTemplate() {
        return (java.lang.String)getProperty("selectTemplate");
    }

    public void setSelectTemplate(java.lang.String value) {
        setProperty("selectTemplate", value);
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
