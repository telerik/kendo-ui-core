package com.kendoui.spring.controllers.dataviz.donut;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.kendoui.spring.models.ChartDataRepository;

@Controller("dataviz-donut_chart-local_data-controller")
@RequestMapping(value="/dataviz/donut-charts/")
public class LocalDataController {
    @RequestMapping(value = "/local-data", method = RequestMethod.GET)
    public String index(Model model) {
        model.addAttribute("spainElectricityBreakdown", ChartDataRepository.SpainElectricityBreakdown());
     
        return "/dataviz/donut-charts/local-data";
    }
}
