package com.kendoui.spring.controllers.scattercharts;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.kendoui.spring.models.ChartDataRepository;

@Controller("dataviz-scatter_chart-local_data-controller")
@RequestMapping(value="/dataviz/scatter-charts/")
public class LocalDataController {
    @RequestMapping(value = "/local-data", method = RequestMethod.GET)
    public String index(Model model) {
        model.addAttribute("pricePerfomance", ChartDataRepository.PricePerformanceData());
     
        return "/dataviz/scatter-charts/local-data";
    }
}
