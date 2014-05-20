package com.kendoui.spring.controllers.boxplotcharts;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.kendoui.spring.models.ChartDataRepository;

@Controller("dataviz-box_plot_chart-local_data-controller")
@RequestMapping(value="/box-plot-charts/")
public class LocalDataBindingController {
    @RequestMapping(value = "/local-data-binding", method = RequestMethod.GET)
    public String index(Model model) {
        model.addAttribute("ozoneConcentration", ChartDataRepository.OzoneConcentration());
     
        return "/box-plot-charts/local-data-binding";
    }
}
