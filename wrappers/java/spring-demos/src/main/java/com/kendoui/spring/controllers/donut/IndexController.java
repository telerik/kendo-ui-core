package com.kendoui.spring.controllers.donut;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.kendoui.spring.models.DonutChartsBasicUsageViewModel;

@Controller("dataviz-donut_charts-home-controller")
@RequestMapping(value="/dataviz/donut-charts/")
public class IndexController {
    @RequestMapping(value = {"/", "/index"}, method = RequestMethod.GET)
    public String index(Model model) {
        List<DonutChartsBasicUsageViewModel> donutChartData = new ArrayList<DonutChartsBasicUsageViewModel>();
        donutChartData.add(new DonutChartsBasicUsageViewModel("Asia",53.8,"#9de219"));
        donutChartData.add(new DonutChartsBasicUsageViewModel("Europe",16.1,"#90cc38"));
        donutChartData.add(new DonutChartsBasicUsageViewModel("LatinAmerica",11.3,"#068c35"));
        donutChartData.add(new DonutChartsBasicUsageViewModel("Africa",9.6,"#006634"));
        donutChartData.add(new DonutChartsBasicUsageViewModel("MiddleEast",5.2,"#004d38"));
        donutChartData.add(new DonutChartsBasicUsageViewModel("NorthAmerica",3.6,"#033939"));
        model.addAttribute("donutData", donutChartData);
        
        return "/dataviz/donut-charts/index";
    }
}
