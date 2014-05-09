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
end

def upload_release_notes_files()

    bot = TelerikReleaseNotesBot.instance
 
    bot.click_element(bot.driver.find_element(:xpath, "//span[contains(text(), 'Administration')]"))
    bot.click_element(bot.driver.find_element(:xpath, "//span[contains(text(), 'Import Release Notes')]"))
    bot.wait_for_title("Import Release Notes")

    #todo: copy changelogs to release folders 
    if defined? SERVICE_PACK_NUMBER
        archive_folder_name = "Q#{VERSION_Q} #{VERSION_YEAR} SP#{SERVICE_PACK_NUMBER}/changelog"
    else
        archive_folder_name = "Q#{VERSION_Q} #{VERSION_YEAR}/Q#{VERSION_Q} #{VERSION_YEAR}/changelog"
    end

    if defined? BETA
        archive_folder_name = "Q#{VERSION_Q} #{VERSION_YEAR}/BETA/changelog"    
    end 

    versioned_bundle_archive_path = File.join(RELEASE_ROOT, VERSION_YEAR.to_s, archive_folder_name)

    upload_files_and_validate(bot, versioned_bundle_archive_path)
end
def upload_files_and_validate(bot, archive_path)

      #upload Kendo UI Professional release notes  
      set_fields_data("Kendo UI")
      full_path = File.expand_path(archive_path + "/professional.commercial.#{VERSION}.changelog.xml", File.join(File.dirname(__FILE__), ".."))

      element = bot.driver.find_element(:xpath, "//input[contains(@id,'ReleaseNoteFileUploader')]")
      upload_id = element.attribute("id")

      upload_file(bot, upload_id, full_path)

      #upload UI for ASP.NET MVC release notes
      set_fields_data("UI for ASP.NET MVC")
      full_path = File.expand_path(archive_path + "/aspnetmvc.commercial.#{VERSION}.changelog.xml", File.join(File.dirname(__FILE__), ".."))

      element = bot.driver.find_element(:xpath, "//input[contains(@id,'ReleaseNoteFileUploader')]")
      upload_id = element.attribute("id")

      upload_file(bot, upload_id, full_path)

      #upload UI for JSP release notes
      set_fields_data("UI for JSP")
      full_path = File.expand_path(archive_path + "/jsp.commercial.#{VERSION}.changelog.xml", File.join(File.dirname(__FILE__), ".."))

      element = bot.driver.find_element(:xpath, "//input[contains(@id,'ReleaseNoteFileUploader')]")
      upload_id = element.attribute("id")

      upload_file(bot, upload_id, full_path)

      #upload UI for PHP release notes
      set_fields_data("UI for PHP")
      full_path = File.expand_path(archive_path + "/php.commercial.#{VERSION}.changelog.xml", File.join(File.dirname(__FILE__), ".."))

      element = bot.driver.find_element(:xpath, "//input[contains(@id,'ReleaseNoteFileUploader')]")
      upload_id = element.attribute("id")

      upload_file(bot, upload_id, full_path)

      bot.click_element(bot.driver.find_element(:xpath, "//a[contains(@id,'ImportReleaseNotesButton')]"))
      #bot.wait_for_validation("//div[contains(text(), 'successfully')]")

  end
end
def set_fields_data(productName)
  #todo
end
def upload_file(bot, upload_id, full_path)
    full_path.gsub!('/', '\\') unless PLATFORM =~ /linux|darwin/
    bot.set_upload_path(bot.driver.find_element(:css, "##{upload_id} input[type=file]"), full_path)
   #bot.wait_for_element("##{upload_id} .ruRemove")
end
