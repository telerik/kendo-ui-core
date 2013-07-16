
package com.kendoui.taglib;


import com.kendoui.taglib.scheduler.*;


import com.kendoui.taglib.json.Function;


import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class SchedulerTag extends WidgetTag /* interfaces */implements DataBoundWidget/* interfaces */ {

    public SchedulerTag() {
        super("Scheduler");
    }
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag
//<< doEndTag

        if (isSet("eventTemplate")) {
            setProperty("eventTemplate", new Function("kendo.template($(\"#" + getEventTemplate() + "\").html())"));
        }
        
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
        return "scheduler";
    }

    public void setEditable(com.kendoui.taglib.scheduler.EditableTag value) {
        setProperty("editable", value);
    }

    public void setGroup(com.kendoui.taglib.scheduler.GroupTag value) {
        setProperty("group", value);
    }

    public void setResources(ResourcesTag value) {

        setProperty("resources", value.resources());

    }

    public void setViews(ViewsTag value) {

        setProperty("views", value.views());

    }

    public void setCancel(CancelFunctionTag value) {
        setEvent("cancel", value.getBody());
    }

    public void setDataBinding(DataBindingFunctionTag value) {
        setEvent("dataBinding", value.getBody());
    }

    public void setDataBound(DataBoundFunctionTag value) {
        setEvent("dataBound", value.getBody());
    }

    public void setEdit(EditFunctionTag value) {
        setEvent("edit", value.getBody());
    }

    public void setRemove(RemoveFunctionTag value) {
        setEvent("remove", value.getBody());
    }

    public void setSave(SaveFunctionTag value) {
        setEvent("save", value.getBody());
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

    public void setDataSource(DataSourceTag dataSource) {
        setProperty("dataSource", dataSource);
    }

    public java.util.Date getDate() {
        return (java.util.Date)getProperty("date");
    }

    public void setDate(java.util.Date value) {
        setProperty("date", value);
    }

    public String getDateHeaderTemplate() {
        return (String)getProperty("dateHeaderTemplate");
    }

    public void setDateHeaderTemplate(String value) {
        setProperty("dateHeaderTemplate", value);
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

    public String getEventTemplate() {
        return (String)getProperty("eventTemplate");
    }

    public void setEventTemplate(String value) {
        setProperty("eventTemplate", value);
    }

    public Object getHeight() {
        return (Object)getProperty("height");
    }

    public void setHeight(Object value) {
        setProperty("height", value);
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

    public boolean getSelectable() {
        return (boolean)getProperty("selectable");
    }

    public void setSelectable(boolean value) {
        setProperty("selectable", value);
    }

    public java.util.Date getStartTime() {
        return (java.util.Date)getProperty("startTime");
    }

    public void setStartTime(java.util.Date value) {
        setProperty("startTime", value);
    }

    public String getTimezone() {
        return (String)getProperty("timezone");
    }

    public void setTimezone(String value) {
        setProperty("timezone", value);
    }

    public Object getWidth() {
        return (Object)getProperty("width");
    }

    public void setWidth(Object value) {
        setProperty("width", value);
    }

    public String getCancel() {
        Function property = ((Function)getProperty("cancel"));
        if (property != null) {
            return property.getBody();
        }
        return null;
    }

    public void setCancel(String value) {
        setProperty("cancel", new Function(value));
    }

    public String getDataBinding() {
        Function property = ((Function)getProperty("dataBinding"));
        if (property != null) {
            return property.getBody();
        }
        return null;
    }

    public void setDataBinding(String value) {
        setProperty("dataBinding", new Function(value));
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

    public String getEdit() {
        Function property = ((Function)getProperty("edit"));
        if (property != null) {
            return property.getBody();
        }
        return null;
    }

    public void setEdit(String value) {
        setProperty("edit", new Function(value));
    }

    public String getRemove() {
        Function property = ((Function)getProperty("remove"));
        if (property != null) {
            return property.getBody();
        }
        return null;
    }

    public void setRemove(String value) {
        setProperty("remove", new Function(value));
    }

    public String getSave() {
        Function property = ((Function)getProperty("save"));
        if (property != null) {
            return property.getBody();
        }
        return null;
    }

    public void setSave(String value) {
        setProperty("save", new Function(value));
    }

//<< Attributes

}
