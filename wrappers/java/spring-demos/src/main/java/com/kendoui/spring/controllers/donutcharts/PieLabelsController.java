package com.kendoui.spring.controllers.donutcharts;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.kendoui.spring.models.PiePoint;

@Controller("dataviz-donut_charts-pie_labels-controller")
@RequestMapping(value="/donut-charts/")
public class PieLabelsController {
    @RequestMapping(value = {"/donut-labels"}, method = RequestMethod.GET)
    public String index(Model model) {
        List<PiePoint> pieChartData = new ArrayList<PiePoint>();
        pieChartData.add(new PiePoint("Football",35));
        pieChartData.add(new PiePoint("Basketball",25));
        pieChartData.add(new PiePoint("Volleyball",20));
        pieChartData.add(new PiePoint("Rugby",10));
        pieChartData.add(new PiePoint("Tennis",10));
        model.addAttribute("donutData", pieChartData);
        
        return "/donut-charts/donut-labels";
    }
}
