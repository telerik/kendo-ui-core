require 'selenium-webdriver'
require 'singleton'
require 'version'

class TelerikReleaseBot
    include Singleton

    attr_reader :driver

    def initialize

        @driver = Selenium::WebDriver.for(:firefox)
        @driver.navigate.to ADMIN_URL

        driver.find_element(:name, "txtEmail").send_keys ADMIN_RELEASE_UPLOAD_LOGIN
        driver.find_element(:name, "txtPassword").send_keys ADMIN_RELEASE_UPLOAD_PASS
        driver.find_element(:name, "btnLogin").click

        @versions_created = []
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
    def version_created(product)
       return @versions_created.index(product) != nil
    end
    def add_product(product)
       @versions_created.push(product)
    end
end

def upload_release_build(options)

    bot = TelerikReleaseBot.instance

    create_version(bot, options)
    prepare_release_files(bot, options)
end
def create_version(bot, options)
      product_name = options[:product]
      return if bot.version_created(product_name)
      return if (product_name == "Kendo UI Core") && (defined? SERVICE_PACK_NUMBER)
      bot.add_product(product_name)

      bot.click_and_wait("Administration", "administration")
      bot.click_and_wait("Product Versions", "product")
      bot.click_and_wait("Product Name", "product")

      #needed for integrationadmin
      if product_name.start_with?('UI')
         bot.click_and_wait("Product Name", "product")
      end

      bot.click_and_wait product_name, "administration"
      bot.click_and_wait "Manage Versions", "administration"

      if defined? SERVICE_PACK_NUMBER
        bot.click_and_wait "New Minor","administration"
        fill_version_fields(bot, options)
      else
        bot.click_and_wait "New Major","administration"
        fill_version_fields(bot, options)
      end
end
def fill_version_fields(bot, options)
       bot.execute_script("$('[id$=\"_txtMajorName\"]').val('#{VERSION_YEAR}.#{VERSION_Q}')")
       last_numbers = VERSION.split(".")[2]
       bot.execute_script("$('[id$=\"_txtMinorName\"]').val('#{last_numbers}')")
       bot.execute_script("$('[id$=\"_cbBeta\"]').prop('checked', true)")

       product_name = options[:product]
       q_version = options[:archive_path].split("/")[3]
       path_with_dashes = q_version.downcase.gsub " ", "-"
       product_in_url = nil

       product_in_url = "kendo-ui" if product_name.index('Kendo') != nil
       product_in_url = "aspnet-mvc" if product_name.index('MVC') != nil
       product_in_url = "jsp-ui" if product_name.index('JSP') != nil
       product_in_url = "php-ui" if product_name.index('PHP') != nil

       bot.execute_script("$find($telerik.$('[id$=\"_efVersionNotes_reFieldText\"]').attr('id')).set_html('<a href=\"http://www.telerik.com/support/whats-new/#{product_in_url}/release-history/#{path_with_dashes}\">#{q_version}</a>')")

       bot.click_element(bot.find("[value='Save']"))
       bot.click_and_wait "Save", "administration"
       bot.click_element(bot.find("[value='Manage files']"))

end
def set_release_fields_data(bot, file_fields)
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
def prepare_release_files(bot, options)
  release_config = options[:params]
  file_metadata = release_config[:file_metadata]
  p_name = options[:product]

  return if (p_name == "Kendo UI Core") && (defined? SERVICE_PACK_NUMBER)

  #zip files
  if file_metadata[:zip]
    file_fields = file_metadata[:zip]
    bot.click_and_wait "Add new file", "administration"

    set_release_fields_data(bot, file_fields)

    upload_release_file_and_save(bot, options[:archive_path], file_fields[:download_name], false)
  end
  #msi files
  if file_metadata[:msi]

    file_fields = file_metadata[:msi]
    bot.click_and_wait "Add new file", "administration"

    set_release_fields_data(bot, file_fields)

    upload_release_file_and_save(bot, options[:archive_path], file_fields[:download_name], true)
  end
  #control panel files
  if file_metadata[:exe]
    file_fields = file_metadata[:exe]
    bot.click_and_wait "Add new file", "administration"

    set_release_fields_data(bot, file_fields)

    upload_release_file_and_save(bot, options[:archive_path], file_fields[:download_name], false)
  end
  #nuget files
  if file_metadata[:nuget]
    file_fields = file_metadata[:nuget]
    bot.click_and_wait "Add new file", "administration"

    set_release_fields_data(bot, file_fields)

    upload_release_file_and_save(bot, options[:archive_path], file_fields[:download_name], false)
  end

end
def upload_release_file_and_save(bot, dirpath, filename, isMsi)
  full_path = File.expand_path(dirpath + "/" + filename, File.join(File.dirname(__FILE__), ".."))

  element = bot.driver.find_element(:xpath, "//div[contains(@id,'rdFileUpload')]")
  upload_id = element.attribute("id")

  upload_release_file(bot, upload_id, full_path)

  if isMsi

    filename = filename.sub "msi", "xml"
    full_path = File.expand_path(dirpath + "/" + filename, File.join(File.dirname(__FILE__), ".."))

    element = bot.driver.find_element(:xpath, "//div[contains(@id,'rdXMLConfigFileUpload')]")
    upload_id = element.attribute("id")

    upload_release_file(bot, upload_id, full_path)
  end

  bot.click_element(bot.find("[value='Save']"))

  bot.wait_for_element("[value='GO TO FILE LIST']")
  bot.click_element(bot.find("[value='GO TO FILE LIST']"))

end
def upload_release_file(bot, upload_id, full_path)
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
def release_build_file_copy(release_build, name, versioned_bundle_destination_path, versioned_bundle_archive_path)
    return if (name == "core") && (defined? SERVICE_PACK_NUMBER)
    release_build_config = release_build[:file_metadata]

    if release_build_config[:zip]
      build_path_and_copy \
      :destination =>  versioned_bundle_destination_path,
      :archive => versioned_bundle_archive_path,
      :vbd => versioned_bundle_name(name),
      :extension => ".zip"
    end
    if release_build_config[:msi]
      build_path_and_copy \
      :destination =>  versioned_bundle_destination_path,
      :archive => versioned_bundle_archive_path,
      :vbd => versioned_bundle_name(name),
      :extension => ".msi"

      build_path_and_copy \
      :destination =>  versioned_bundle_destination_path,
      :archive => versioned_bundle_archive_path,
      :vbd => versioned_bundle_name(name),
      :extension => ".xml"
    end
    if release_build_config[:nuget]
      build_path_and_copy \
      :destination =>  versioned_bundle_destination_path,
      :archive => versioned_bundle_archive_path,
      :vbd => versioned_bundle_name(name),
      :extension => ".nupkg.zip"
    end
    if release_build[:download_builder]
      build_path_and_copy \
      :destination =>  versioned_bundle_destination_path,
      :archive => versioned_bundle_archive_path,
      :static_name => "download-builder"

    end
    if release_build[:demos]
      build_path_and_copy \
      :destination =>  versioned_bundle_destination_path,
      :archive => versioned_bundle_archive_path,
      :static_name => "online-examples.zip"

    end
    if release_build[:changelog]
      FileUtils.mkdir_p(File.join(versioned_bundle_destination_path, "changelogs"))
      build_path_and_copy \
      :destination =>  versioned_bundle_destination_path,
      :archive => versioned_bundle_archive_path,
      :static_name => "changelogs/" + versioned_bundle_name(name) + ".xml" 
    end 
    if release_build_config[:exe]
      exe_config = release_build_config[:exe]
      
      if exe_config[:download_name].to_s.index("TelerikControlPanelSetup.MVC")!= nil 
        archive_file = File.join(WEB_INSTALLER_ROOT, "TelerikControlPanelSetup.exe")
        cp archive_file, File.join(versioned_bundle_destination_path, "TelerikControlPanelSetup.MVC.#{VERSION}.exe")
      end 
      if exe_config[:download_name].to_s.index("TelerikControlPanelSetup.KUI")!= nil 
        archive_file = File.join(WEB_INSTALLER_ROOT, "TelerikControlPanelSetup.exe")
        cp archive_file, File.join(versioned_bundle_destination_path, "TelerikControlPanelSetup.KUI.Professional.#{VERSION}.exe") 
      end
      if exe_config[:download_name].to_s.index("TelerikUIForAspNetMvcSetup")!= nil
          archive_file = File.join(WEB_INSTALLER_ROOT, "TelerikUIForAspNetMvcSetup.exe")
          cp archive_file, File.join(versioned_bundle_destination_path, "TelerikUIForAspNetMvcSetup.#{VERSION}.exe")
      end
    end

end
def build_path_and_copy(options)
   if options[:static_name]
    destination = File.join(options[:destination], options[:static_name])
    archive = File.join(options[:archive], options[:static_name])
   else
    #prefer vbdb option for Beta build and vbd option for official release
    destination = File.join(options[:destination], (options[:vbdb] || options[:vbd]) + options[:extension])
    archive = File.join(options[:archive], options[:vbd] + options[:extension])
   end
   cp_r archive, destination
end
