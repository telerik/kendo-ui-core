
package com.kendoui.taglib.chart;
import com.kendoui.taglib.BaseTag;
import com.kendoui.taglib.ChartTag;
import java.util.ArrayList;
import java.util.Map;
import java.util.List;
import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class SeriesTag extends BaseTag /* interfaces *//* interfaces */ {
    @Override
    public int doEndTag() throws JspException {
        ChartTag parent = (ChartTag)findParentWithClass(ChartTag.class);

        parent.setSeries(this);

        return super.doEndTag();
    }

    @Override
    public void initialize() {
        series = new ArrayList<Map<String, Object>>();

        super.initialize();
    }

    @Override
    public void destroy() {
        series = null;
        super.destroy();
    }

    private List<Map<String, Object>> series;

    public List<Map<String, Object>> series() {
        return series;
    }

    public static String tagName() {
        return "chart-series";
    }

    public void addSeriesItem(List<Map<String, Object>> value) {
        series = value;
    }
}
