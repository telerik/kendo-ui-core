
package com.kendoui.taglib;


import com.kendoui.taglib.stockchart.*;
import com.kendoui.taglib.json.Function;
import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class StockChartTag extends WidgetTag /* interfaces */implements DataBoundWidget/* interfaces */ {

    public StockChartTag() {
        super("StockChart");
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
        return "stockChart";
    }

    public void setCategoryAxis(CategoryAxisTag value) {

        setProperty("categoryAxis", value.categoryAxis());

    }

    public void setChartArea(com.kendoui.taglib.stockchart.ChartAreaTag value) {
        setProperty("chartArea", value);
    }

    public void setLegend(com.kendoui.taglib.stockchart.LegendTag value) {
        setProperty("legend", value);
    }

    public void setNavigator(com.kendoui.taglib.stockchart.NavigatorTag value) {
        setProperty("navigator", value);
    }

    public void setPanes(PanesTag value) {

        setProperty("panes", value.panes());

    }

    public void setPlotArea(com.kendoui.taglib.stockchart.PlotAreaTag value) {
        setProperty("plotArea", value);
    }

    public void setSeries(SeriesTag value) {

        setProperty("series", value.series());

    }

    public void setTitle(com.kendoui.taglib.stockchart.TitleTag value) {
        setProperty("title", value);
    }

    public void setTooltip(com.kendoui.taglib.stockchart.TooltipTag value) {
        setProperty("tooltip", value);
    }

    public void setValueAxis(ValueAxisTag value) {

        setProperty("valueAxis", value.valueAxis());

    }

    public void setXAxis(XAxisTag value) {

        setProperty("xAxis", value.xAxis());

    }

    public void setYAxis(YAxisTag value) {

        setProperty("yAxis", value.yAxis());

    }

    public void setAxisLabelClick(AxisLabelClickFunctionTag value) {
        setEvent("axisLabelClick", value.getBody());
    }

    public void setDataBound(DataBoundFunctionTag value) {
        setEvent("dataBound", value.getBody());
    }

    public void setDrag(DragFunctionTag value) {
        setEvent("drag", value.getBody());
    }

    public void setDragEnd(DragEndFunctionTag value) {
        setEvent("dragEnd", value.getBody());
    }

    public void setDragStart(DragStartFunctionTag value) {
        setEvent("dragStart", value.getBody());
    }

    public void setPlotAreaClick(PlotAreaClickFunctionTag value) {
        setEvent("plotAreaClick", value.getBody());
    }

    public void setSelect(SelectFunctionTag value) {
        setEvent("select", value.getBody());
    }

    public void setSelectEnd(SelectEndFunctionTag value) {
        setEvent("selectEnd", value.getBody());
    }

    public void setSelectStart(SelectStartFunctionTag value) {
        setEvent("selectStart", value.getBody());
    }

    public void setSeriesClick(SeriesClickFunctionTag value) {
        setEvent("seriesClick", value.getBody());
    }

    public void setSeriesHover(SeriesHoverFunctionTag value) {
        setEvent("seriesHover", value.getBody());
    }

    public void setZoom(ZoomFunctionTag value) {
        setEvent("zoom", value.getBody());
    }

    public void setZoomEnd(ZoomEndFunctionTag value) {
        setEvent("zoomEnd", value.getBody());
    }

    public void setZoomStart(ZoomStartFunctionTag value) {
        setEvent("zoomStart", value.getBody());
    }

    public boolean getAutoBind() {
        return (boolean)getProperty("autoBind");
    }

    public void setAutoBind(boolean value) {
        setProperty("autoBind", value);
    }

    @Override
    public void setDataSource(DataSourceTag dataSource) {
        setProperty("dataSource", dataSource);
    }

    public String getDateField() {
        return (String)getProperty("dateField");
    }

    public void setDateField(String value) {
        setProperty("dateField", value);
    }

    public String getSeries.currentField() {
        return (String)getProperty("series.currentField");
    }

    public void setSeries.currentField(String value) {
        setProperty("series.currentField", value);
    }

    public String getSeries.targetField() {
        return (String)getProperty("series.targetField");
    }

    public void setSeries.targetField(String value) {
        setProperty("series.targetField", value);
    }

    public Object getSeriesColors() {
        return (Object)getProperty("seriesColors");
    }

    public void setSeriesColors(Object value) {
        setProperty("seriesColors", value);
    }

    public String getTheme() {
        return (String)getProperty("theme");
    }

    public void setTheme(String value) {
        setProperty("theme", value);
    }

    public boolean getTransitions() {
        return (boolean)getProperty("transitions");
    }

    public void setTransitions(boolean value) {
        setProperty("transitions", value);
    }

    public String getAxisLabelClick() {
        Function property = ((Function)getProperty("axisLabelClick"));
        if (property != null) {
            return property.getBody();
        }
        return null;
    }

    public void setAxisLabelClick(String value) {
        setProperty("axisLabelClick", new Function(value));
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

    public String getDrag() {
        Function property = ((Function)getProperty("drag"));
        if (property != null) {
            return property.getBody();
        }
        return null;
    }

    public void setDrag(String value) {
        setProperty("drag", new Function(value));
    }

    public String getDragEnd() {
        Function property = ((Function)getProperty("dragEnd"));
        if (property != null) {
            return property.getBody();
        }
        return null;
    }

    public void setDragEnd(String value) {
        setProperty("dragEnd", new Function(value));
    }

    public String getDragStart() {
        Function property = ((Function)getProperty("dragStart"));
        if (property != null) {
            return property.getBody();
        }
        return null;
    }

    public void setDragStart(String value) {
        setProperty("dragStart", new Function(value));
    }

    public String getPlotAreaClick() {
        Function property = ((Function)getProperty("plotAreaClick"));
        if (property != null) {
            return property.getBody();
        }
        return null;
    }

    public void setPlotAreaClick(String value) {
        setProperty("plotAreaClick", new Function(value));
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

    public String getSelectEnd() {
        Function property = ((Function)getProperty("selectEnd"));
        if (property != null) {
            return property.getBody();
        }
        return null;
    }

    public void setSelectEnd(String value) {
        setProperty("selectEnd", new Function(value));
    }

    public String getSelectStart() {
        Function property = ((Function)getProperty("selectStart"));
        if (property != null) {
            return property.getBody();
        }
        return null;
    }

    public void setSelectStart(String value) {
        setProperty("selectStart", new Function(value));
    }

    public String getSeriesClick() {
        Function property = ((Function)getProperty("seriesClick"));
        if (property != null) {
            return property.getBody();
        }
        return null;
    }

    public void setSeriesClick(String value) {
        setProperty("seriesClick", new Function(value));
    }

    public String getSeriesHover() {
        Function property = ((Function)getProperty("seriesHover"));
        if (property != null) {
            return property.getBody();
        }
        return null;
    }

    public void setSeriesHover(String value) {
        setProperty("seriesHover", new Function(value));
    }

    public String getZoom() {
        Function property = ((Function)getProperty("zoom"));
        if (property != null) {
            return property.getBody();
        }
        return null;
    }

    public void setZoom(String value) {
        setProperty("zoom", new Function(value));
    }

    public String getZoomEnd() {
        Function property = ((Function)getProperty("zoomEnd"));
        if (property != null) {
            return property.getBody();
        }
        return null;
    }

    public void setZoomEnd(String value) {
        setProperty("zoomEnd", new Function(value));
    }

    public String getZoomStart() {
        Function property = ((Function)getProperty("zoomStart"));
        if (property != null) {
            return property.getBody();
        }
        return null;
    }

    public void setZoomStart(String value) {
        setProperty("zoomStart", new Function(value));
    }

//<< Attributes

}
