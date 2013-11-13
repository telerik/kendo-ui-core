package com.kendoui.spring.controllers.boxplotcharts;

import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.kendoui.spring.models.BoxPlotCategoryPoint;
import com.kendoui.spring.models.ChartDataRepository;

@Controller("dataviz-box_plot_charts_remote_data-controller")
@RequestMapping(value="/dataviz//box-plot-charts/")
public class RemoteDataController {
    @RequestMapping(value = "/remote-data", method = RequestMethod.GET)
    public String index() {
        return "/dataviz//box-plot-charts/remote-data";
    }
    
    @RequestMapping(value = "/remote-data/read", method = RequestMethod.POST)
    public @ResponseBody List<BoxPlotCategoryPoint> read() {
        return ChartDataRepository.OzoneConcentrationRemote();
    }
}
