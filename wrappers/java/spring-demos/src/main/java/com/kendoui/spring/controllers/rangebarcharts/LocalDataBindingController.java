package com.kendoui.spring.controllers.rangebarcharts;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.kendoui.spring.models.ChartDataRepository;
import com.kendoui.spring.models.RangeBarChartsLocalDataViewModel;

@Controller("dataviz-range_bar_chart-local_data-controller")
@RequestMapping(value="/range-bar-charts/")
public class LocalDataBindingController {
    
    @RequestMapping(value = "/local-data-binding", method = RequestMethod.GET)
    public String index(Model model) {
        List<RangeBarChartsLocalDataViewModel> viewModel =  ChartDataRepository.TaskCompleteness();
        
        model.addAttribute("viewModel", viewModel);
     
        return "/range-bar-charts/local-data-binding";
    }
}
