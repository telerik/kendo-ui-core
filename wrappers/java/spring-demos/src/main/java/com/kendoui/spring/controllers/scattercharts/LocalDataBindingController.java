package com.kendoui.spring.controllers.scattercharts;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.kendoui.spring.models.ChartDataRepository;

@Controller("dataviz-scatter_chart-local_data-controller")
@RequestMapping(value="/scatter-charts/")
public class LocalDataBindingController {
    @RequestMapping(value = "/local-data-binding", method = RequestMethod.GET)
    public String index(Model model) {
        model.addAttribute("pricePerfomance", ChartDataRepository.PricePerformanceData());
     
        return "/scatter-charts/local-data-binding";
    }
}
