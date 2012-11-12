package com.kendoui.spring.controllers.pie;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.kendoui.spring.models.PiePoint;

@Controller("dataviz-pie_charts-pie_labels-controller")
@RequestMapping(value="/dataviz/pie-charts/")
public class PieLabelsController {
    @RequestMapping(value = {"/pie-labels"}, method = RequestMethod.GET)
    public String index(Model model) {
        List<PiePoint> pieChartData = new ArrayList<PiePoint>();
        pieChartData.add(new PiePoint("2005", 67.96));
        pieChartData.add(new PiePoint("2006", 68.93));
        pieChartData.add(new PiePoint("2007", 75));
        pieChartData.add(new PiePoint("2008", 74));
        pieChartData.add(new PiePoint("2009", 78));
        model.addAttribute("pieData", pieChartData);
        
        return "/dataviz/pie-charts/pie-labels";
    }
}
