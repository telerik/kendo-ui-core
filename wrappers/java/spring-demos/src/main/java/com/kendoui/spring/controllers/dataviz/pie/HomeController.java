package com.kendoui.spring.controllers.dataviz.pie;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.kendoui.spring.models.PiePoint;

@Controller("dataviz-pie_charts-home-controller")
@RequestMapping(value="/dataviz/pie-charts/")
public class HomeController {
    @RequestMapping(value = {"/", "/index"}, method = RequestMethod.GET)
    public String index(Model model) {
        List<PiePoint> pieChartData = new ArrayList<PiePoint>();
        pieChartData.add(new PiePoint("Hydro", 22));
        pieChartData.add(new PiePoint("Solar", 2));
        pieChartData.add(new PiePoint("Nuclear", 49));
        pieChartData.add(new PiePoint("Wind", 27));
        model.addAttribute("pieData", pieChartData);
        
        return "/dataviz/pie-charts/index";
    }
}
