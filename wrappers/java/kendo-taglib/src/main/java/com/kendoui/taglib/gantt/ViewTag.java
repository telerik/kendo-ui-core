
package com.kendoui.taglib.gantt;


import com.kendoui.taglib.BaseTag;






import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class ViewTag extends  BaseTag  /* interfaces */ /* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag

        ViewsTag parent = (ViewsTag)findParentWithClass(ViewsTag.class);

        parent.addView(this);

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
        return "gantt-view";
    }

    public void setTimeHeaderTemplate(ViewTimeHeaderTemplateFunctionTag value) {
        setEvent("timeHeaderTemplate", value.getBody());
    }

    public void setDayHeaderTemplate(ViewDayHeaderTemplateFunctionTag value) {
        setEvent("dayHeaderTemplate", value.getBody());
    }

    public void setWeekHeaderTemplate(ViewWeekHeaderTemplateFunctionTag value) {
        setEvent("weekHeaderTemplate", value.getBody());
    }

    public void setMonthHeaderTemplate(ViewMonthHeaderTemplateFunctionTag value) {
        setEvent("monthHeaderTemplate", value.getBody());
    }

    public void setYearHeaderTemplate(ViewYearHeaderTemplateFunctionTag value) {
        setEvent("yearHeaderTemplate", value.getBody());
    }

    public java.lang.String getDayHeaderTemplate() {
        return (java.lang.String)getProperty("dayHeaderTemplate");
    }

    public void setDayHeaderTemplate(java.lang.String value) {
        setProperty("dayHeaderTemplate", value);
    }

    public java.lang.String getMonthHeaderTemplate() {
        return (java.lang.String)getProperty("monthHeaderTemplate");
    }

    public void setMonthHeaderTemplate(java.lang.String value) {
        setProperty("monthHeaderTemplate", value);
    }

    public java.lang.String getResizeTooltipFormat() {
        return (java.lang.String)getProperty("resizeTooltipFormat");
    }

    public void setResizeTooltipFormat(java.lang.String value) {
        setProperty("resizeTooltipFormat", value);
    }

    public boolean getSelected() {
        return (boolean)getProperty("selected");
    }

    public void setSelected(boolean value) {
        setProperty("selected", value);
    }

    public java.lang.Object getSlotSize() {
        return (java.lang.Object)getProperty("slotSize");
    }

    public void setSlotSize(java.lang.Object value) {
        setProperty("slotSize", value);
    }

    public java.lang.String getTimeHeaderTemplate() {
        return (java.lang.String)getProperty("timeHeaderTemplate");
    }

    public void setTimeHeaderTemplate(java.lang.String value) {
        setProperty("timeHeaderTemplate", value);
    }

    public java.lang.String getType() {
        return (java.lang.String)getProperty("type");
    }

    public void setType(java.lang.String value) {
        setProperty("type", value);
    }

    public java.lang.String getWeekHeaderTemplate() {
        return (java.lang.String)getProperty("weekHeaderTemplate");
    }

    public void setWeekHeaderTemplate(java.lang.String value) {
        setProperty("weekHeaderTemplate", value);
    }

    public java.lang.String getYearHeaderTemplate() {
        return (java.lang.String)getProperty("yearHeaderTemplate");
    }

    public void setYearHeaderTemplate(java.lang.String value) {
        setProperty("yearHeaderTemplate", value);
    }

//<< Attributes

}
