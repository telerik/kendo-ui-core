package com.kendoui.spring.navigation;

import java.io.BufferedReader;
import java.io.FileReader;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

public class SourceCodeInterceptor extends HandlerInterceptorAdapter  {
    @Override
    public void postHandle(HttpServletRequest request, 
            HttpServletResponse response, Object handler,
            ModelAndView modelAndView) throws Exception {
        
        if (modelAndView != null) {
           
            String filename = modelAndView.getViewName() + ".jsp";
            
            String realPath = request.getSession().getServletContext().getRealPath("/WEB-INF/views/" + filename);
            
            BufferedReader input = new BufferedReader(new FileReader(realPath));
            
            StringBuilder content = new StringBuilder();
            String line = input.readLine();
            
            while (line != null) {
                content.append(line + "\r\n");
                line = input.readLine();
            }
            
            input.close();
            
            modelAndView.addObject("view", content.toString());
        }
    }
}
