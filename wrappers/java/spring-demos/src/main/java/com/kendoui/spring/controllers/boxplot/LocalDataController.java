package com.kendoui.spring.controllers.boxplot;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.kendoui.spring.models.ChartDataRepository;

@Controller("dataviz-box_plot_chart-local_data-controller")
@RequestMapping(value="/dataviz/box-plot-charts/")
public class LocalDataController {
    @RequestMapping(value = "/local-data", method = RequestMethod.GET)
    public String index(Model model) {
        model.addAttribute("ozoneConcentration", ChartDataRepository.OzoneConcentration());
     
        return "/dataviz/box-plot-charts/local-data";
    }
}
