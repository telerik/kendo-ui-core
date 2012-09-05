package com.kendoui.taglib;

import com.kendoui.taglib.json.Function;

@SuppressWarnings("serial")
public class ChartTag extends WidgetTag {
    public ChartTag() {
        super("Chart");
    }

    //>> Attributes

    public String getTheme() {
        return (String)getProperty("theme");
    }

    public void setTheme(String theme) {
        setProperty("theme", theme);
    }

    public boolean getAutoBind() {
        return (boolean)getProperty("autoBind");
    }

    public void setAutoBind(boolean autoBind) {
        setProperty("autoBind", autoBind);
    }

    public boolean getTransitions() {
        return (boolean)getProperty("transitions");
    }

    public void setTransitions(boolean transitions) {
        setProperty("transitions", transitions);
    }

    public String getDataBound() {
        return ((Function)getProperty("dataBound")).getBody();
    }

    public void setDataBound(String dataBound) {
        setProperty("dataBound", new Function(dataBound));
    }

    public String getSeriesClick() {
        return ((Function)getProperty("seriesClick")).getBody();
    }

    public void setSeriesClick(String seriesClick) {
        setProperty("seriesClick", new Function(seriesClick));
    }

    public String getSeriesHover() {
        return ((Function)getProperty("seriesHover")).getBody();
    }

    public void setSeriesHover(String seriesHover) {
        setProperty("seriesHover", new Function(seriesHover));
    }

    public String getAxisLabelClick() {
        return ((Function)getProperty("axisLabelClick")).getBody();
    }

    public void setAxisLabelClick(String axisLabelClick) {
        setProperty("axisLabelClick", new Function(axisLabelClick));
    }

    public String getPlotAreaClick() {
        return ((Function)getProperty("plotAreaClick")).getBody();
    }

    public void setPlotAreaClick(String plotAreaClick) {
        setProperty("plotAreaClick", new Function(plotAreaClick));
    }

    //<< Attributes
}