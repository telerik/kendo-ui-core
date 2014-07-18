require 'selenium-webdriver'
require 'singleton'
require 'version'

class TelerikNuGetBot
    include Singleton

    attr_reader :driver

    def initialize

        @driver = Selenium::WebDriver.for(:firefox)
        @driver.get(NUGET_SITE_URL + "/users/account/LogOn?returnUrl=%2F")

        driver.find_element(:xpath, "//input[contains(@id,'SignIn_UserNameOrEmail')]").send_keys NUGET_SITE_LOGIN
        driver.find_element(:xpath, "//input[contains(@id,'SignIn_Password')]").send_keys NUGET_UPLOAD_PASS
        click_element(find("[id='signin-link']"))

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
    def send_keys_to_target(target,line)
        target.send_keys(line)
        rescue
        screenshot("Failed_To_Send_Keys_To_Target")
    end
end

def navigate_and_upload()

    bot = TelerikNuGetBot.instance

    click_and_wait "Upload Package", "NuGet Gallery | Upload Package"
    upload_package(bot, archive_path) 

    bot.driver.quit
end
def upload_package(bot, archive_path)
    full_path = File.expand_path(archive_path + "/KendoUICore.#{VERSION}.nupkg", File.join(File.dirname(__FILE__), ".."))
    
    bot.send_keys_to_target(bot.find('input[type=file]'), full_path)  
    sleep(2)

    click_element(bot.find("[value='Upload']"))
    sleep(5)

    click_element(bot.find("[value='Save']"))
    sleep(7)

    bot.wait_for_validation("//span[contains(text(), 'Kendo UI Core #{VERSION}')]")
end

