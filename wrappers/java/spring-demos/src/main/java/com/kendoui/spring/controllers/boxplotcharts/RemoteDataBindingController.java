package com.kendoui.spring.controllers.boxplotcharts;

import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.kendoui.spring.models.BoxPlotCategoryPoint;
import com.kendoui.spring.models.ChartDataRepository;

@Controller("dataviz-box_plot_charts_remote_data-controller")
@RequestMapping(value="//box-plot-charts/")
public class RemoteDataBindingController {
    @RequestMapping(value = "/remote-data-binding", method = RequestMethod.GET)
    public String index() {
        return "//box-plot-charts/remote-data-binding";
    }
    
    @RequestMapping(value = "/remote-data-binding/read", method = RequestMethod.POST)
    public @ResponseBody List<BoxPlotCategoryPoint> read() {
        return ChartDataRepository.OzoneConcentrationRemote();
    }
}
