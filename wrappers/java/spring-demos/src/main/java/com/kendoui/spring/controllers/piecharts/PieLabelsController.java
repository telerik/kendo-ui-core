package com.kendoui.spring.controllers.piecharts;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.kendoui.spring.models.PiePoint;

@Controller("dataviz-pie_charts-pie_labels-controller")
@RequestMapping(value="/pie-charts/")
public class PieLabelsController {
    @RequestMapping(value = {"/pie-labels"}, method = RequestMethod.GET)
    public String index(Model model) {
        List<PiePoint> pieChartData = new ArrayList<PiePoint>();
        pieChartData.add(new PiePoint("Football",35));
        pieChartData.add(new PiePoint("Basketball",25));
        pieChartData.add(new PiePoint("Volleyball",20));
        pieChartData.add(new PiePoint("Rugby",10));
        pieChartData.add(new PiePoint("Tennis",10));
        model.addAttribute("pieData", pieChartData);
        
        return "/pie-charts/pie-labels";
    }
}
