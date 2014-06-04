require 'selenium-webdriver'
require 'singleton'
require 'version'

class TelerikCodeLibraryBot
    include Singleton

    attr_reader :driver

    def initialize

        @driver = Selenium::WebDriver.for(:firefox)
        @driver.get(SITE_URL + "/sitefinity")

        driver.find_element(:xpath, "//input[contains(@id,'_UserName')]").send_keys SITE_LOGIN
        driver.find_element(:xpath, "//input[contains(@id,'_Password')]").send_keys SITE_DOWNLOAD_BUILDER_UPLOAD_PASS
        click_and_wait("Log in with Telerik", "Legacy Dashboard")

    end

    def find(selector)
        driver.find_element(:css, selector)
        rescue
        screenshot("No_such_element_" + selector)
        return false
    end

    def click_element(element)
      element.click
      rescue
      screenshot("Click_Element_Failed_For_" + element.attribute("id"))
    end

    def click_and_wait(link, title)
        driver.find_element(:link, link).click
        wait_for_title(title)
        rescue
        screenshot("Click_Element_Failed_For_" + element.attribute("id"))
    end

    def wait_for_title(title)
        Selenium::WebDriver::Wait.new(:timeout => 30).until { driver.title.downcase.start_with? title }
        rescue
        screenshot("Browser_Timeout_On_Page_Title_Wait")
    end
    def wait_for_element(css)
        Selenium::WebDriver::Wait.new(:timeout => 30).until { driver.find_element(:css, css) }
        rescue
        screenshot("Browser_Timeout_On_Element_Wait")
    end
    #not used
    def wait_for_validation(element_path)
        Selenium::WebDriver::Wait.new(:timeout => 30).until { driver.find_element(:xpath, element_path) }
        rescue
        screenshot("Browser_Timeout_On_Validation")
    end
    def screenshot(failed_operation)
      if failed_operation.nil?
        failed_operation = "null"
      end

      Dir.mkdir("build/screenshots") if !File.directory?("build/screenshots")
      @driver.save_screenshot(File.join("build/screenshots", "#{failed_operation}.jpg"))
    end
    def execute_script(script)
      #output filename and code line number as part of the screenshot name
      caller_array = caller.first.split(":")
      file_name = caller_array[1].split("/")[6] 
      driver.execute_script(script)
      rescue 
      screenshot("Script_Execution_Failed_In_" + file_name + "_line_" + caller_array[2])
    end
    #?
    def get_select(title)
        element = driver.find_element(:xpath, "//label[text()='#{title}']/..//select")  
        select_element = Selenium::WebDriver::Support::Select.new(element)
        return select_element
    end
    def click_checkbox(bot, tname)
        element = driver.find_element(:xpath, "//a[text()='#{tname}']/../../..//input")
        bot.execute_script 'arguments[0].click()'
    end
end

def create_code_library(bot, product_name, tname)
    bot = TelerikCodeLibraryBot.instance
    navigate_to_cl_section(bot)
    create_cl_thread(bot, product_name, tname)

    bot.driver.quit
end
def navigate_to_cl_section(bot)
    bot.click_element(bot.driver.find_element(:xpath, "//span[contains(text(), 'Content')]"))
    bot.click_element(bot.driver.find_element(:xpath, "//span[contains(text(), 'Forums')]"))
    bot.wait_for_title("Forums")

    bot.click_element(bot.driver.find_element(:xpath, "//span[contains(text(), 'Code Library')]"))
    bot.wait_for_title("Forums")
end
def create_cl_thread(bot, product_name, tname)
    
    if bot.driver.find_element(:xpath, "//a[contains(text(), #{tname})]") != nil
      p "product found>>#{tname}"
      click_checkbox(bot, tname)
      bot.click_element(bot.driver.find_element(:xpath, "//span[contains(text(), 'Create a forum in selected group')]"))
      bot.wait_for_title("Forums")

      set_cl_fields(bot, product_name)

      bot.click_element(bot.driver.find_element(:xpath, "//span[contains(text(), 'Create this forum')]"))
      sleep(3)
      #bot.wait_for_validation("//div[contains(text(), 'successfully')]")
    end
end
def set_cl_fields(bot, product_name)
      bot.execute_script("$('[id$=\"titleFieldControl_0_ctl00_0_ctl00_0_textBox_write_0\"]').val('#{product_name}')")
      bot.execute_script("$('[id$=\"_pageUrl\"]').className('sfSelectedItem')")
      bot.execute_script("$('[id$=\"_pageUrl\"]').text('Code Library')")

      if product_name.index("Mobile") == nil
        bot.execute_script("$('[id$=\"urlName_3_ctl00_3_ctl00_3_mirroredValueLabel_write_3\"]').text('"+ product_name.downcase + "')")
      else
        bot.execute_script("$('[id$=\"urlName_3_ctl00_3_ctl00_3_mirroredValueLabel_write_3\"]').text('mobile-"+ product_name.downcase.sub " (mobile)","" + "')")
      end
      

      bot.execute_script("$('[id$=\"_singleCheckBox_0\"]').click()")
      sleep(1)
      bot.execute_script("$('[id$=\"radioButtons_radiobuttons_0_1_0\"]').click()")
      sleep(1)
      bot.execute_script("$('[id$=\"AllowedAttachmentExtensionsText_0_ctl00_0_ctl00_0_textBox_write_0\"]').val('.zip, .rar')")
end
