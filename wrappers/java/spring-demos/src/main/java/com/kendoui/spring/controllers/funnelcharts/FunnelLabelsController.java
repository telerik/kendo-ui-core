package com.kendoui.spring.controllers.funnelcharts;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.kendoui.spring.models.PiePoint;

@Controller("dataviz-funnel_charts-funnel_labels-controller")
@RequestMapping(value="/funnel-charts/")
public class FunnelLabelsController {
    @RequestMapping(value = {"/funnel-labels"}, method = RequestMethod.GET)
    public String index(Model model) {
        List<PiePoint> funnelChartData = new ArrayList<PiePoint>();
        funnelChartData.add(new PiePoint("Awareness", 4));
        funnelChartData.add(new PiePoint("Interest", 3));
        funnelChartData.add(new PiePoint("Desire", 2));
        funnelChartData.add(new PiePoint("Action", 1));
        
        model.addAttribute("funnelData", funnelChartData);
        
        return "/funnel-charts/funnel-labels";
    }
}
