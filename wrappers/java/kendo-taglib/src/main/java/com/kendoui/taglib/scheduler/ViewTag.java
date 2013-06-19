
package com.kendoui.taglib.scheduler;


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
        return "scheduler-view";
    }

    public void setEditable(com.kendoui.taglib.scheduler.ViewEditableTag value) {
        setProperty("editable", value);
    }

    public void setAllDayEventTemplate(ViewAllDayEventTemplateFunctionTag value) {
        setEvent("allDayEventTemplate", value.getBody());
    }

    public void setDateHeaderTemplate(ViewDateHeaderTemplateFunctionTag value) {
        setEvent("dateHeaderTemplate", value.getBody());
    }

    public void setDayTemplate(ViewDayTemplateFunctionTag value) {
        setEvent("dayTemplate", value.getBody());
    }

    public void setEventTemplate(ViewEventTemplateFunctionTag value) {
        setEvent("eventTemplate", value.getBody());
    }

    public void setEventTimeTemplate(ViewEventTimeTemplateFunctionTag value) {
        setEvent("eventTimeTemplate", value.getBody());
    }

    public void setMajorTimeHeaderTemplate(ViewMajorTimeHeaderTemplateFunctionTag value) {
        setEvent("majorTimeHeaderTemplate", value.getBody());
    }

    public void setMinorTimeHeaderTemplate(ViewMinorTimeHeaderTemplateFunctionTag value) {
        setEvent("minorTimeHeaderTemplate", value.getBody());
    }

    public String getAllDayEventTemplate() {
        return (String)getProperty("allDayEventTemplate");
    }

    public void setAllDayEventTemplate(String value) {
        setProperty("allDayEventTemplate", value);
    }

    public boolean getAllDaySlot() {
        return (boolean)getProperty("allDaySlot");
    }

    public void setAllDaySlot(boolean value) {
        setProperty("allDaySlot", value);
    }

    public String getDateHeaderTemplate() {
        return (String)getProperty("dateHeaderTemplate");
    }

    public void setDateHeaderTemplate(String value) {
        setProperty("dateHeaderTemplate", value);
    }

    public String getDayTemplate() {
        return (String)getProperty("dayTemplate");
    }

    public void setDayTemplate(String value) {
        setProperty("dayTemplate", value);
    }

    public boolean getEditable() {
        return (boolean)getProperty("editable");
    }

    public void setEditable(boolean value) {
        setProperty("editable", value);
    }

    public java.util.Date getEndTime() {
        return (java.util.Date)getProperty("endTime");
    }

    public void setEndTime(java.util.Date value) {
        setProperty("endTime", value);
    }

    public float getEventHeight() {
        return (float)getProperty("eventHeight");
    }

    public void setEventHeight(float value) {
        setProperty("eventHeight", value);
    }

    public String getEventTemplate() {
        return (String)getProperty("eventTemplate");
    }

    public void setEventTemplate(String value) {
        setProperty("eventTemplate", value);
    }

    public String getEventTimeTemplate() {
        return (String)getProperty("eventTimeTemplate");
    }

    public void setEventTimeTemplate(String value) {
        setProperty("eventTimeTemplate", value);
    }

    public float getMajorTick() {
        return (float)getProperty("majorTick");
    }

    public void setMajorTick(float value) {
        setProperty("majorTick", value);
    }

    public String getMajorTimeHeaderTemplate() {
        return (String)getProperty("majorTimeHeaderTemplate");
    }

    public void setMajorTimeHeaderTemplate(String value) {
        setProperty("majorTimeHeaderTemplate", value);
    }

    public float getMinorTickCount() {
        return (float)getProperty("minorTickCount");
    }

    public void setMinorTickCount(float value) {
        setProperty("minorTickCount", value);
    }

    public String getMinorTimeHeaderTemplate() {
        return (String)getProperty("minorTimeHeaderTemplate");
    }

    public void setMinorTimeHeaderTemplate(String value) {
        setProperty("minorTimeHeaderTemplate", value);
    }

    public boolean getSelected() {
        return (boolean)getProperty("selected");
    }

    public void setSelected(boolean value) {
        setProperty("selected", value);
    }

    public String getSelectedDateFormat() {
        return (String)getProperty("selectedDateFormat");
    }

    public void setSelectedDateFormat(String value) {
        setProperty("selectedDateFormat", value);
    }

    public java.util.Date getStartTime() {
        return (java.util.Date)getProperty("startTime");
    }

    public void setStartTime(java.util.Date value) {
        setProperty("startTime", value);
    }

    public String getTitle() {
        return (String)getProperty("title");
    }

    public void setTitle(String value) {
        setProperty("title", value);
    }

    public String getType() {
        return (String)getProperty("type");
    }

    public void setType(String value) {
        setProperty("type", value);
    }

//<< Attributes

}
