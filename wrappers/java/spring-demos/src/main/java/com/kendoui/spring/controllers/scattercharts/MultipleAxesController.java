package com.kendoui.spring.controllers.scattercharts;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.kendoui.spring.models.ChartDataRepository;

@Controller("dataviz-scatter_charts-multiple_axes-controller")
@RequestMapping(value="/scatter-charts/")
public class MultipleAxesController {
    @RequestMapping(value = "/multiple-axes", method = RequestMethod.GET)
    public String index(Model model) {
        model.addAttribute("engineData", ChartDataRepository.EngineData());
        
        return "/scatter-charts/multiple-axes";
    }
}
