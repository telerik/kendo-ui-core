
package com.kendoui.taglib;


import com.kendoui.taglib.gantt.*;


import com.kendoui.taglib.json.Function;


import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class GanttTag extends WidgetTag /* interfaces */implements DataBoundWidget/* interfaces */ {

    public GanttTag() {
        super("Gantt");
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
        return "gantt";
    }

    public void setAssignments(com.kendoui.taglib.gantt.AssignmentsTag value) {
        setProperty("assignments", value);
    }

    public void setColumns(ColumnsTag value) {

        setProperty("columns", value.columns());

    }

    public void setCurrentTimeMarker(com.kendoui.taglib.gantt.CurrentTimeMarkerTag value) {
        setProperty("currentTimeMarker", value);
    }

    public void setEditable(com.kendoui.taglib.gantt.EditableTag value) {
        setProperty("editable", value);
    }

    public void setMessages(com.kendoui.taglib.gantt.MessagesTag value) {
        setProperty("messages", value);
    }

    public void setPdf(com.kendoui.taglib.gantt.PdfTag value) {
        setProperty("pdf", value);
    }

    public void setResources(com.kendoui.taglib.gantt.ResourcesTag value) {
        setProperty("resources", value);
    }

    public void setToolbar(ToolbarTag value) {

        setProperty("toolbar", value.toolbar());

    }

    public void setTooltip(com.kendoui.taglib.gantt.TooltipTag value) {
        setProperty("tooltip", value);
    }

    public void setViews(ViewsTag value) {

        setProperty("views", value.views());

    }

    public void setAdd(AddFunctionTag value) {
        setEvent("add", value.getBody());
    }

    public void setCancel(CancelFunctionTag value) {
        setEvent("cancel", value.getBody());
    }

    public void setChange(ChangeFunctionTag value) {
        setEvent("change", value.getBody());
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

    public void setMove(MoveFunctionTag value) {
        setEvent("move", value.getBody());
    }

    public void setMoveEnd(MoveEndFunctionTag value) {
        setEvent("moveEnd", value.getBody());
    }

    public void setMoveStart(MoveStartFunctionTag value) {
        setEvent("moveStart", value.getBody());
    }

    public void setNavigate(NavigateFunctionTag value) {
        setEvent("navigate", value.getBody());
    }

    public void setPdfExport(PdfExportFunctionTag value) {
        setEvent("pdfExport", value.getBody());
    }

    public void setRemove(RemoveFunctionTag value) {
        setEvent("remove", value.getBody());
    }

    public void setResize(ResizeFunctionTag value) {
        setEvent("resize", value.getBody());
    }

    public void setResizeEnd(ResizeEndFunctionTag value) {
        setEvent("resizeEnd", value.getBody());
    }

    public void setResizeStart(ResizeStartFunctionTag value) {
        setEvent("resizeStart", value.getBody());
    }

    public void setSave(SaveFunctionTag value) {
        setEvent("save", value.getBody());
    }

    public boolean getAutoBind() {
        return (boolean)getProperty("autoBind");
    }

    public void setAutoBind(boolean value) {
        setProperty("autoBind", value);
    }

    public boolean getCurrentTimeMarker() {
        return (boolean)getProperty("currentTimeMarker");
    }

    public void setCurrentTimeMarker(boolean value) {
        setProperty("currentTimeMarker", value);
    }

    public void setDataSource(DataSourceTag dataSource) {
        setProperty("dataSource", dataSource);
    }

    public java.lang.Object getDependencies() {
        return (java.lang.Object)getProperty("dependencies");
    }

    public void setDependencies(java.lang.Object value) {
        setProperty("dependencies", value);
    }

    public boolean getEditable() {
        return (boolean)getProperty("editable");
    }

    public void setEditable(boolean value) {
        setProperty("editable", value);
    }

    public java.lang.Object getHeight() {
        return (java.lang.Object)getProperty("height");
    }

    public void setHeight(java.lang.Object value) {
        setProperty("height", value);
    }

    public float getHourSpan() {
        return (float)getProperty("hourSpan");
    }

    public void setHourSpan(float value) {
        setProperty("hourSpan", value);
    }

    public java.lang.Object getListWidth() {
        return (java.lang.Object)getProperty("listWidth");
    }

    public void setListWidth(java.lang.Object value) {
        setProperty("listWidth", value);
    }

    public boolean getNavigatable() {
        return (boolean)getProperty("navigatable");
    }

    public void setNavigatable(boolean value) {
        setProperty("navigatable", value);
    }

    public boolean getSelectable() {
        return (boolean)getProperty("selectable");
    }

    public void setSelectable(boolean value) {
        setProperty("selectable", value);
    }

    public boolean getShowWorkDays() {
        return (boolean)getProperty("showWorkDays");
    }

    public void setShowWorkDays(boolean value) {
        setProperty("showWorkDays", value);
    }

    public boolean getShowWorkHours() {
        return (boolean)getProperty("showWorkHours");
    }

    public void setShowWorkHours(boolean value) {
        setProperty("showWorkHours", value);
    }

    public boolean getSnap() {
        return (boolean)getProperty("snap");
    }

    public void setSnap(boolean value) {
        setProperty("snap", value);
    }

    public java.lang.String getToolbar() {
        return (java.lang.String)getProperty("toolbar");
    }

    public void setToolbar(java.lang.String value) {
        setProperty("toolbar", value);
    }

    public java.util.Date getWorkDayEnd() {
        return (java.util.Date)getProperty("workDayEnd");
    }

    public void setWorkDayEnd(java.util.Date value) {
        setProperty("workDayEnd", value);
    }

    public java.util.Date getWorkDayStart() {
        return (java.util.Date)getProperty("workDayStart");
    }

    public void setWorkDayStart(java.util.Date value) {
        setProperty("workDayStart", value);
    }

    public float getWorkWeekEnd() {
        return (float)getProperty("workWeekEnd");
    }

    public void setWorkWeekEnd(float value) {
        setProperty("workWeekEnd", value);
    }

    public float getWorkWeekStart() {
        return (float)getProperty("workWeekStart");
    }

    public void setWorkWeekStart(float value) {
        setProperty("workWeekStart", value);
    }

    public String getAdd() {
        Function property = ((Function)getProperty("add"));
        if (property != null) {
            return property.getBody();
        }
        return null;
    }

    public void setAdd(String value) {
        setProperty("add", new Function(value));
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

    public String getMove() {
        Function property = ((Function)getProperty("move"));
        if (property != null) {
            return property.getBody();
        }
        return null;
    }

    public void setMove(String value) {
        setProperty("move", new Function(value));
    }

    public String getMoveEnd() {
        Function property = ((Function)getProperty("moveEnd"));
        if (property != null) {
            return property.getBody();
        }
        return null;
    }

    public void setMoveEnd(String value) {
        setProperty("moveEnd", new Function(value));
    }

    public String getMoveStart() {
        Function property = ((Function)getProperty("moveStart"));
        if (property != null) {
            return property.getBody();
        }
        return null;
    }

    public void setMoveStart(String value) {
        setProperty("moveStart", new Function(value));
    }

    public String getNavigate() {
        Function property = ((Function)getProperty("navigate"));
        if (property != null) {
            return property.getBody();
        }
        return null;
    }

    public void setNavigate(String value) {
        setProperty("navigate", new Function(value));
    }

    public String getPdfExport() {
        Function property = ((Function)getProperty("pdfExport"));
        if (property != null) {
            return property.getBody();
        }
        return null;
    }

    public void setPdfExport(String value) {
        setProperty("pdfExport", new Function(value));
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

    public String getResize() {
        Function property = ((Function)getProperty("resize"));
        if (property != null) {
            return property.getBody();
        }
        return null;
    }

    public void setResize(String value) {
        setProperty("resize", new Function(value));
    }

    public String getResizeEnd() {
        Function property = ((Function)getProperty("resizeEnd"));
        if (property != null) {
            return property.getBody();
        }
        return null;
    }

    public void setResizeEnd(String value) {
        setProperty("resizeEnd", new Function(value));
    }

    public String getResizeStart() {
        Function property = ((Function)getProperty("resizeStart"));
        if (property != null) {
            return property.getBody();
        }
        return null;
    }

    public void setResizeStart(String value) {
        setProperty("resizeStart", new Function(value));
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
