require 'selenium-webdriver'
require 'singleton'
require 'version'

class TelerikReleaseNotesBot
    include Singleton

    attr_reader :driver

    def initialize

        @driver = Selenium::WebDriver.for(:firefox)
        @driver.get(SITE_URL + "/sitefinity")

        driver.find_element(:xpath, "//input[contains(@id,'_UserName')]").send_keys SITE_LOGIN
        driver.find_element(:xpath, "//input[contains(@id,'_Password')]").send_keys SITE_DOWNLOAD_BUILDER_UPLOAD_PASS
        click_and_wait("Log in with Telerik", "Legacy Dashboard")

        @products = ["Kendo UI", "UI for ASP.NET MVC", "UI for JSP", "UI for PHP"]

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
    def set_upload_path(element, path)
      element.send_keys(path)
      rescue
      screenshot("Upload_Path_Setting_Failed_For_" + path)
    end
    def get_select(title)
        element = driver.find_element(:xpath, "//label[text()='#{title}']/..//select")  
        option = Selenium::WebDriver::Support::Select.new(element)
        return option
    end
    def get_product()
      return @products.pop()
    end
end

def set_configuration_and_upload()

    bot = TelerikReleaseNotesBot.instance

    #Beta release
    if defined? Beta
      if ENV["DRY_RUN"]
        archive_folder_name = "Q#{VERSION_Q} #{VERSION_YEAR}/DRY_RUN_BETA/changelogs"
      else
        archive_folder_name = "Q#{VERSION_Q} #{VERSION_YEAR}/BETA/changelogs"
      end    
    else
      #official release
      if defined? SERVICE_PACK_NUMBER
        archive_folder_name = "Q#{VERSION_Q} #{VERSION_YEAR} SP#{SERVICE_PACK_NUMBER}/changelogs"
      else
        archive_folder_name = "Q#{VERSION_Q} #{VERSION_YEAR}/Q#{VERSION_Q} #{VERSION_YEAR}/changelogs"
      end
    end 

    versioned_bundle_archive_path = File.join(RELEASE_ROOT, VERSION_YEAR.to_s, archive_folder_name)

    navigate_to_import_form()
    upload_files_and_validate(bot, versioned_bundle_archive_path, bot.get_product())
end
def navigate_to_import_form
    bot.click_element(bot.driver.find_element(:xpath, "//span[contains(text(), 'Administration')]"))
    bot.click_element(bot.driver.find_element(:xpath, "//span[contains(text(), 'Import Release Notes')]"))
    bot.wait_for_title("Import Release Notes")
end
def upload_files_and_validate(bot, archive_path, productName)

    set_fields_data(productName)
    full_path = String.new

    case productName
      when "Kendo UI"
         full_path = File.expand_path(archive_path + "/telerik.kendoui.professional.#{VERSION}.trial.xml", File.join(File.dirname(__FILE__), ".."))
      when "UI for ASP.NET MVC"
        full_path = File.expand_path(archive_path + "/telerik.ui.for.aspnetmvc.#{VERSION}.trial.xml", File.join(File.dirname(__FILE__), ".."))
      when "UI for JSP"
        full_path = File.expand_path(archive_path + "/telerik.ui.for.jsp.#{VERSION}.trial.xml", File.join(File.dirname(__FILE__), ".."))
      when "UI for PHP"
        full_path = File.expand_path(archive_path + "/telerik.ui.for.php.#{VERSION}.trial.xml", File.join(File.dirname(__FILE__), ".."))
    end
    
    element = bot.driver.find_element(:xpath, "//div[contains(@id,'ReleaseNoteFileUploader')]")
    upload_id = element.attribute("id")
    upload_file(bot, upload_id, full_path)

    bot.click_element(bot.driver.find_element(:xpath, "//a[contains(@id,'ImportReleaseNotesButton')]"))
    bot.wait_for_validation("//div[contains(text(), 'successfully')]")

    if @products.length > 0
      navigate_to_import_form()
      upload_files_and_validate(bot, versioned_bundle_archive_path, @products.pop())
    else
       bot.driver.quit
    end
end
def set_fields_data(productName)
    #Beta release notes
    if defined? Beta
      bot.execute_script("$('[id$=\"_TitleTb\"]').val('Q#{VERSION_Q} #{VERSION_YEAR} Beta')")
      #due to mandatory non-empty value requirement
      bot.execute_script("$('[id$=\"_ProductMinorVersionTb\"]').val('11')")
      bot.click_element(bot.driver.find_element(:xpath, "//label[contains(.,'Beta Version')]"))   
    else
    #official release notes
      if defined? SERVICE_PACK_NUMBER
        bot.execute_script("$('[id$=\"_TitleTb\"]').val('Q#{VERSION_Q} #{VERSION_YEAR} SP#{SERVICE_PACK_NUMBER}')")
        bot.execute_script("$('[id$=\"_ProductMinorVersionTb\"]').val('#{SERVICE_PACK_NUMBER}')")
        bot.click_element(bot.driver.find_element(:xpath, "//label[contains(.,'Minor Version')]"))
      else
        bot.execute_script("$('[id$=\"_TitleTb\"]').val('Q#{VERSION_Q} #{VERSION_YEAR}')")
        #due to mandatory non-empty value requirement
        bot.execute_script("$('[id$=\"_ProductMinorVersionTb\"]').val('11')")
        bot.click_element(bot.driver.find_element(:xpath, "//label[contains(.,'Major Version')]"))
      end
    end 
    bot.execute_script("$('[id$=\"_ReleaseVersionTb\"]').val('#{VERSION}')") 

    date = DateTime.now.strftime('%m/%d/%Y')
    p date
    bot.execute_script("$find($telerik.$('[id$=\"_ReleaseDateDatePicker_dateInput\"]').attr('id')).set_value('#{date}')")

    option_select = get_select("Product")
    option_select.select_by(:text, productName)

end
def upload_file(bot, upload_id, full_path)
    full_path.gsub!('/', '\\') unless PLATFORM =~ /linux|darwin/
    bot.set_upload_path(bot.driver.find_element(:css, "##{upload_id} input[type=file]"), full_path)
   #bot.wait_for_element("##{upload_id} .ruRemove")
end
