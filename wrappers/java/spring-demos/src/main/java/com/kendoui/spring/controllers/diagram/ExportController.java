package com.kendoui.spring.controllers.diagram;

import java.io.IOException;
import java.util.List;

import javax.servlet.http.HttpServletResponse;
import javax.xml.bind.DatatypeConverter;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.kendoui.spring.models.DiagramDataRepository;
import com.kendoui.spring.models.OrgChartItem;

@Controller("dataviz-diagram-export-controller")
@RequestMapping(value = "/diagram/")
public class ExportController {
    @RequestMapping(value = { "/export" }, method = RequestMethod.GET)
    public String index() {
        return "/diagram/export";
    }
    
    @RequestMapping(value = "/export/read", method = RequestMethod.POST)
    public @ResponseBody List<OrgChartItem> read() {
        return DiagramDataRepository.OrgChart();
    }

    @RequestMapping(value = "/export/save", method = RequestMethod.POST)
    public @ResponseBody
    void save(String fileName, String base64, String contentType,
            HttpServletResponse response) throws IOException {

        response.setHeader("Content-Disposition", "attachment;filename="
                + fileName);
        response.setContentType(contentType);

        byte[] data = DatatypeConverter.parseBase64Binary(base64);

        response.setContentLength(data.length);
        response.getOutputStream().write(data);
        response.flushBuffer();
    }
}
