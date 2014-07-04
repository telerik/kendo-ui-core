require 'selenium-webdriver'
require 'singleton'

class TelerikCodeLibraryBot
    include Singleton

    attr_reader :driver

    def initialize

        @driver = Selenium::WebDriver.for(:firefox)
        @driver.get(SITE_URL + "/sitefinity")

        driver.find_element(:xpath, "//input[contains(@id,'_UserName')]").send_keys SITE_LOGIN
        driver.find_element(:xpath, "//input[contains(@id,'_Password')]").send_keys SITE_DOWNLOAD_BUILDER_UPLOAD_PASS
        click_and_wait("Log in with Telerik", "Legacy Dashboard")
        #to be used on wwwsit.telerik.com
        #driver.find_element(:xpath, "//input[contains(@id,'username')]").send_keys SITE_LOGIN
        #driver.find_element(:xpath, "//input[contains(@id,'password')]").send_keys SITE_DOWNLOAD_BUILDER_UPLOAD_PASS
        #click_element(find("[id='LoginButton']"))
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
    def click_checkbox(tname)
        element = driver.find_element(:xpath, "//strong[contains(text(),'#{tname}')]/../../../../input")
        driver.execute_script 'arguments[0].click()', element
        rescue
        screenshot("Clicking_CheckBox_Failed_For_" + element.attribute("id"))
    end
end

def create_code_library(bot, product_name, tname)
    bot = TelerikCodeLibraryBot.instance
    navigate_to_cl_section(bot)
    create_cl_thread(bot, product_name, tname)
end
def navigate_to_cl_section(bot)
    p "navigating to cl section>>"
    bot.click_element(bot.driver.find_element(:xpath, "//span[contains(text(), 'Content')]"))
    bot.click_element(bot.driver.find_element(:xpath, "//span[contains(text(), 'Forums')]"))
    bot.wait_for_title("Forums")

    bot.click_element(bot.driver.find_element(:xpath, "//span[contains(text(), 'Code Library')]"))
    bot.wait_for_title("Forums")
end
def create_cl_thread(bot, product_name, tname)
    
    if bot.driver.find_element(:xpath, "//strong[contains(text(), '#{tname}')]") != nil
      p "product found>>#{tname}"
      bot.click_checkbox(tname)
      bot.click_element(bot.driver.find_element(:xpath, "//span[contains(text(), 'Create a forum in selected group')]"))
      sleep(3)
      #bot.wait_for_title("Forums")

      set_cl_fields(bot, product_name)
      
      p "saving>>"
      bot.execute_script("window.frames[0].$('[id*=\"saveButton\"]').click()")
      sleep(10)
    end
end
def set_cl_fields(bot, product_name)
      p "setting code library fields>>#{product_name}"
      sleep(4)
      bot.execute_script("window.frames[0].$('input[id*=\"titleFieldControl\"]').val('#{product_name}')")
      sleep(1)
      bot.execute_script("window.frames[0].$('span[id*=\"pageUrl\"]').removeClass('sfDisplayNone')")
      sleep(1)
      bot.execute_script("window.frames[0].$('span[id*=\"pageUrl\"]').text('Code Library')")
      sleep(1)

      if product_name.index("Mobile") == nil
        bot.execute_script("window.frames[0].$('[id*=\"urlName\"]').text('"+ product_name.downcase + "')")
      else
        product_name_mod = product_name.downcase.sub " (mobile)",""
        bot.execute_script("window.frames[0].$('[id*=\"urlName\"]').text('mobile-#{product_name_mod}')")
      end
      sleep(1)

      bot.execute_script("window.frames[0].$('a:contains(\"File attachments\")').click()")
      sleep(1)
      bot.execute_script("window.frames[0].$('label:contains(\"Allow users to upload file attachments in posts\")').click()")
      sleep(1)
      bot.execute_script("window.frames[0].$('label:contains(\"Define Manually...\")').click()")
      sleep(1)
      p "fields settings done>>"
      bot.execute_script("window.frames[0].$('textarea[id*=\"AllowedAttachmentExtensionsText\"]').val('.zip, .rar')")
      sleep(1)
end
