require 'selenium-webdriver'
require 'singleton'
require 'version'

class TelerikBetaBot
    include Singleton

    attr_reader :driver

    def initialize

        @driver = Selenium::WebDriver.for(:firefox)
        @driver.navigate.to ADMIN_URL

        driver.find_element(:name, "txtEmail").send_keys ADMIN_RELEASE_UPLOAD_LOGIN
        driver.find_element(:name, "txtPassword").send_keys ADMIN_RELEASE_UPLOAD_PASS
        driver.find_element(:name, "btnLogin").click
    end

    def find(selector)
        driver.find_element(:css, selector)
        rescue
        screenshot("No_such_element_" + selector)
        return false
    end

    def go_to_product_versions
        click_and_wait "Administration", "administration"
        click_and_wait "Product Versions", "product"
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
        Selenium::WebDriver::Wait.new(:timeout => 1000).until { driver.find_element(:css, css) }
        rescue
        screenshot("Browser_Timeout_On_Element_Wait")
    end
    
    #not used
    def fill_in(title, contents)
        element = driver.find_element(:xpath, "//label[text()='#{title}']/..//input")
        driver.execute_script 'arguments[0].focus()', element
        element.send_keys contents
        element.send_keys :tab
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
    def quit
        driver.quit
    end
end

def upload_beta_build(options)

    bot = TelerikReleaseBot.instance 

    navigate_to_latest_version(bot, options)   
    prepare_files(bot, options)  
end
def navigate_to_latest_version(bot, options)
      product_name = options[:product]

      bot.click_and_wait("Administration", "administration")
      bot.click_and_wait("Product Versions", "product")
      bot.click_and_wait("Product Name", "product")

      #needed for integrationadmin
      if product_name.start_with?('UI')
         bot.click_and_wait("Product Name", "product")
      end

      bot.click_and_wait product_name, "administration"
      bot.click_and_wait "Manage Versions", "administration"
      bot.click_element(bot.find("[id$=\"_hlVersionNumber\"]"))
      bot.click_element(bot.find("[value='Manage files']"))
end
def set_fields_data(bot, file_fields)
    bot.execute_script("$('[id$=\"_txtFieldText\"]').val('#{file_fields[:label]}')")
    bot.execute_script("$('[id$=\"_txtFileName\"]').val('#{file_fields[:download_name]}')")

    bot.execute_script("$find($telerik.$('[id$=\"_cfFileCategory_rcbField\"]').attr('id')).set_text('#{file_fields[:file_category]}')")
    bot.execute_script("$find($telerik.$('[id$=\"_rcbFileType\"]').attr('id')).set_text('#{file_fields[:file_type]}')")
    bot.execute_script("$find($telerik.$('[id$=\"_cfExtension_rcbField\"]').attr('id')).set_text('#{file_fields[:extension]}')")

    if file_fields[:file_markers]
      file_markers = file_fields[:file_markers]
      file_markers.each do |fm| 
        bot.click_element(bot.driver.find_element(:xpath, "//label[contains(.,'#{fm}')]"))

        if file_fields[:vs_hotfix] 
          bot.execute_script("$('[id$=\"_txtFileVersionPrefix\"]').val('#{VERSION}')")
          Thread.current.send :sleep, 3
          bot.execute_script("$('[id$=\"_txtFileVersionSuffix\"]').val('0')")
        end  
      end
    end
 
    websites = file_fields[:websites]
    websites.each do |ws| 
      bot.click_element(bot.driver.find_element(:xpath, "//label[contains(.,'#{ws}')]"))
    end


    bot.execute_script("$find($telerik.$('[id$=\"_efDownloadMessage_reFieldText\"]').attr('id')).set_html('#{file_fields[:download_message]}')") 
    bot.execute_script("$find($telerik.$('[id$=\"_efWhatsIncluded_reFieldText\"]').attr('id')).set_html('#{file_fields[:whats_included_message]}')") 
  
end
def prepare_files(bot, options)

  release_config = options[:params]
  file_metadata = release_config[:file_metadata]
 
  #zip files
  if file_metadata[:zip]
    file_fields = file_metadata[:zip]
    bot.click_and_wait "Add new file", "administration"

    set_fields_data(bot, file_fields)

    upload_file_and_save(bot, options[:archive_path], file_fields[:download_name])
  end
  #msi files 
  if file_metadata[:msi]
    
    file_fields = file_metadata[:msi]
    bot.click_and_wait "Add new file", "administration"

    set_fields_data(bot, file_fields)

    upload_file_and_save(bot, options[:archive_path], file_fields[:download_name])
  end

end
def upload_file_and_save(bot, dirpath, filename)
  full_path = File.expand_path(dirpath + "/" + filename, File.join(File.dirname(__FILE__), ".."))

  element = bot.driver.find_element(:xpath, "//div[contains(@id,'rdFileUpload')]")
  upload_id = element.attribute("id")

  upload_file(bot, upload_id, full_path)

  bot.click_element(bot.find("[value='Save']"))
  
  bot.wait_for_element("[value='GO TO FILE LIST']")
  bot.click_element(bot.find("[value='GO TO FILE LIST']"))

end
def upload_file(bot, upload_id, full_path)
    bot.execute_script("
                (function (module, $) {
                    var upload = $find('#{upload_id}');
                    var plugins = ['Flash', 'Silverlight', 'FileApi'];

                    $('##{upload_id}ListContainer').remove();
                    $(upload.get_element()).off();
                    upload._uploadModule.dispose();

                    for (var i = 0; i < plugins.length; i++) {
                        module[plugins[i]].isAvailable = function () { return false; };
                    }
                    upload.initialize();
                })(Telerik.Web.UI.RadAsyncUpload.Modules, $telerik.$);")

    full_path.gsub!('/', '\\') unless PLATFORM =~ /linux|darwin/
    bot.set_upload_path(bot.driver.find_element(:css, "##{upload_id} input[type=file]"), full_path)
    bot.wait_for_element("##{upload_id} .ruRemove")
end
def beta_build_file_copy(beta_build, name, versioned_bundle_destination_path, versioned_bundle_archive_path)
    beta_build_config = beta_build[:file_metadata]

    if beta_build_config[:zip]
      build_path_and_copy \
      :destination =>  versioned_bundle_destination_path,
      :archive => versioned_bundle_archive_path,
      :vbd => versioned_bundle_name(name),
      :vbdb => versioned_bundle_beta_name(name),
      :extension => ".zip"
    end
    if beta_build_config[:msi]
      build_path_and_copy \
      :destination =>  versioned_bundle_destination_path,
      :archive => versioned_bundle_archive_path,
      :vbd => versioned_bundle_name(name),
      :vbdb => versioned_bundle_beta_name(name),
      :extension => ".msi"

      build_path_and_copy \
      :destination =>  versioned_bundle_destination_path,
      :archive => versioned_bundle_archive_path,
      :vbd => versioned_bundle_name(name),
      :vbdb => versioned_bundle_beta_name(name),
      :extension => ".xml"
    end
    if beta_build[:demos]
      build_path_and_copy \
      :destination =>  versioned_bundle_destination_path,
      :archive => versioned_bundle_archive_path,
      :static_name => "online-examples.zip" 

    end 
end
def build_path_and_copy(options)
   if options[:static_name]
    destination = File.join(options[:destination], options[:static_name])
    archive = File.join(options[:archive], options[:static_name])
   else
    destination = File.join(options[:destination], options[:vbdb] + options[:extension])
    archive = File.join(options[:archive], options[:vbd] + options[:extension])
   end
   cp_r archive, destination
end