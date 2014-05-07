package com.kendoui.spring.controllers.piecharts;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.kendoui.spring.models.PieChartsBasicUsageViewModel;

@Controller("dataviz-pie_charts-home-controller")
@RequestMapping(value="/pie-charts/")
public class IndexController {
    @RequestMapping(value = {"/", "/index"}, method = RequestMethod.GET)
    public String index(Model model) {
        List<PieChartsBasicUsageViewModel> pieChartData = new ArrayList<PieChartsBasicUsageViewModel>();
        pieChartData.add(new PieChartsBasicUsageViewModel("Asia",53.8,"#9de219"));
        pieChartData.add(new PieChartsBasicUsageViewModel("Europe",16.1,"#90cc38"));
        pieChartData.add(new PieChartsBasicUsageViewModel("LatinAmerica",11.3,"#068c35"));
        pieChartData.add(new PieChartsBasicUsageViewModel("Africa",9.6,"#006634"));
        pieChartData.add(new PieChartsBasicUsageViewModel("MiddleEast",5.2,"#004d38"));
        pieChartData.add(new PieChartsBasicUsageViewModel("NorthAmerica",3.6,"#033939"));

        model.addAttribute("pieData", pieChartData);
        
        return "/pie-charts/index";
    }
}
