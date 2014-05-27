package com.kendoui.spring.controllers.bubblecharts;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.kendoui.spring.models.ChartDataRepository;

@Controller("dataviz-bubble_chart-local_data-controller")
@RequestMapping(value="/bubble-charts/")
public class LocalDataBindingController {
    @RequestMapping(value = "/local-data-binding", method = RequestMethod.GET)
    public String index(Model model) {
        model.addAttribute("jobGrowth", ChartDataRepository.JobGrowthData());
     
        return "/bubble-charts/local-data-binding";
    }
}
