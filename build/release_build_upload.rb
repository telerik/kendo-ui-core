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
    end

    def go_to_product_versions
        click_and_wait "Administration", "administration"
        click_and_wait "Product Versions", "product"
    end

    def click_and_wait(link, title)
        driver.find_element(:link, link).click
        wait_for_title(title)
    end

    def wait_for_title(title)
        Selenium::WebDriver::Wait.new(:timeout => 30).until { driver.title.downcase.start_with? title }
    end
    def wait_for_element(css)
        Selenium::WebDriver::Wait.new(:timeout => 30).until { driver.find_element(:css, css) }
    end
    
    #not used
    def fill_in(title, contents)
        element = driver.find_element(:xpath, "//label[text()='#{title}']/..//input")
        driver.execute_script 'arguments[0].focus()', element
        element.send_keys contents
        element.send_keys :tab
    end

    def quit
        driver.quit
    end
    def version_created(product)
       p "Product Name:"
       p product
       return @versions_created.index(product) != nil 
    end
    def add_product(product)
       @versions_created.push(product)
       p "Product name added: "
       p @versions_created[@versions_created.length - 1]
    end
end

def upload_release_build(options)

    bot = TelerikReleaseBot.instance 

    create_version(bot, options[:product])   
    prepare_files(bot, options)  
end
def create_version(bot, product_name)
      return if bot.version_created(product_name) 
      bot.add_product(product_name)

      bot.click_and_wait("Administration", "administration")
      bot.click_and_wait("Product Versions", "product")
      bot.click_and_wait("Product Name", "product")

      #needed for integrationadmin
      if product_name.start_with?('UI')
         bot.click_and_wait("Product Name", "product")
      end

=begin
      bot.driver.execute_script <<-SCRIPT
         var masterTable = $find($telerik.$('[id$=\"_dgProducts\"]').attr('id')).get_masterTableView();
         masterTable.filter("ProductName", "UI", Telerik.Web.UI.GridFilterFunction.Contains, true);
      execute_script
      Thread.current.send :sleep, 3
=end
      p ">>creating version"
      bot.click_and_wait product_name, "administration"
      bot.click_and_wait "Manage Versions", "administration"

      if defined? SERVICE_PACK_NUMBER
        bot.click_and_wait "New Minor","administration"
        fill_version_fields(bot) 
      else
        bot.click_and_wait "New Major","administration"
        fill_version_fields(bot)  
      end
end
def fill_version_fields(bot)
       bot.driver.execute_script "$('[id$=\"_txtMajorName\"]').val('#{VERSION_YEAR}.#{VERSION_Q}')"
       last_numbers = VERSION.split(".")[2]
       bot.driver.execute_script "$('[id$=\"_txtMinorName\"]').val('#{last_numbers}')"
       bot.driver.execute_script "$('[id$=\"_cbBeta\"]').prop('checked', true)"

       bot.find("[value='Save']").click
       bot.click_and_wait "Save", "administration"
       bot.find("[value='Manage files']").click

end
def set_fields_data(bot, file_fields)
    bot.driver.execute_script "$('[id$=\"_txtFieldText\"]').val('#{file_fields[:label]}')" 
    bot.driver.execute_script "$('[id$=\"_txtFileName\"]').val('#{file_fields[:download_name]}')"

    bot.driver.execute_script "$find($telerik.$('[id$=\"_cfFileCategory_rcbField\"]').attr('id')).set_text('#{file_fields[:file_category]}')"
    bot.driver.execute_script "$find($telerik.$('[id$=\"_rcbFileType\"]').attr('id')).set_text('#{file_fields[:file_type]}')"
    bot.driver.execute_script "$find($telerik.$('[id$=\"_cfExtension_rcbField\"]').attr('id')).set_text('#{file_fields[:extension]}')"

    if file_fields[:file_markers]
      file_markers = file_fields[:file_markers]
      file_markers.each do |fm| 
        bot.driver.find_element(:xpath, "//label[contains(.,'#{fm}')]").click

        if file_fields[:vs_hotfix] 
          bot.driver.execute_script "$('[id$=\"_txtFileVersionPrefix\"]').val('#{VERSION}')"
          Thread.current.send :sleep, 1
          bot.driver.execute_script "$('[id$=\"_txtFileVersionSuffix\"]').val('0')"
        end  
      end
    end
 
    websites = file_fields[:websites]
    websites.each do |ws| 
      bot.driver.find_element(:xpath, "//label[contains(.,'#{ws}')]").click
    end


    bot.driver.execute_script "$find($telerik.$('[id$=\"_efDownloadMessage_reFieldText\"]').attr('id')).set_html('#{file_fields[:download_message]}')" 
    bot.driver.execute_script "$find($telerik.$('[id$=\"_efWhatsIncluded_reFieldText\"]').attr('id')).set_html('#{file_fields[:whats_included_message]}')" 
  
end
def prepare_files(bot, options)
  p ">>preparing files"

  release_config = options[:params]
  file_metadata = release_config[:file_metadata]
 
  #zip files
  if file_metadata[:zip]
    file_fields = file_metadata[:zip]
    bot.click_and_wait "Add new file", "administration"

    set_fields_data(bot, file_fields)

    upload_file_and_save(bot, options[:archive_path], file_fields[:download_name], false)
  end
  #msi files 
  if file_metadata[:msi]
    
    file_fields = file_metadata[:msi]
    bot.click_and_wait "Add new file", "administration"

    set_fields_data(bot, file_fields)

    upload_file_and_save(bot, options[:archive_path], file_fields[:download_name], true)
  end
  #control panel files
  if file_metadata[:exe]
    file_fields = file_metadata[:exe]
    bot.click_and_wait "Add new file", "administration"

    set_fields_data(bot, file_fields)

    upload_file_and_save(bot, options[:archive_path], file_fields[:download_name], false)
  end
  #nuget files
  if file_metadata[:nuget]
    file_fields = file_metadata[:nuget]
    bot.click_and_wait "Add new file", "administration"

    set_fields_data(bot, file_fields)

    upload_file_and_save(bot, options[:archive_path], file_fields[:download_name], false)
  end

end
def upload_file_and_save(bot, dirpath, filename, isMsi)
  full_path = File.expand_path(dirpath + "/" + filename, File.join(File.dirname(__FILE__), ".."))

  element = bot.driver.find_element(:xpath, "//div[contains(@id,'rdFileUpload')]")
  upload_id = element.attribute("id")

  upload_file(bot, upload_id, full_path)

  if isMsi
    p "Setting xml filename..."
    
    filename = filename.sub "msi", "xml"
    full_path = File.expand_path(dirpath + "/" + filename, File.join(File.dirname(__FILE__), ".."))

    element = bot.driver.find_element(:xpath, "//div[contains(@id,'rdXMLConfigFileUpload')]")
    upload_id = element.attribute("id")
    
    upload_file(bot, upload_id, full_path) 
  end

  bot.find("[value='Save']").click

  p "Saving..."

  bot.find("[value='GO TO FILE LIST']").click
end
def upload_file(bot, upload_id, full_path)
    bot.driver.execute_script("
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

  bot.driver.find_element(:css, "##{upload_id} input[type=file]").send_keys(full_path.gsub('/', '\\'))
  bot.wait_for_element("##{upload_id} .ruRemove")
end
def release_build_file_copy(release_build, name, versioned_bundle_destination_path, versioned_bundle_archive_path)
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
    if release_build_config[:exe]
      archive_file = File.join(WEB_INSTALLER_ROOT, "TelerikControlPanelSetup.exe")
      cp archive_file, File.join(versioned_bundle_destination_path, "TelerikControlPanelSetup.MVC.#{VERSION}.exe")
      cp archive_file, File.join(versioned_bundle_destination_path, "TelerikControlPanelSetup.KUI.Professional.#{VERSION}.exe") 

      archive_file = File.join(WEB_INSTALLER_ROOT, "TelerikUIForAspNetMvcSetup.exe")
      cp archive_file, File.join(versioned_bundle_destination_path, "TelerikUIForAspNetMvcSetup.#{VERSION}.exe")
    end

    return versioned_bundle_destination_path    
end
def build_path_and_copy(options)
   if options[:static_name]
    destination = File.join(options[:destination], options[:static_name])
    archive = File.join(options[:archive], options[:static_name])
   else
    destination = File.join(options[:destination], options[:vbd] + options[:extension])
    archive = File.join(options[:archive], options[:vbd] + options[:extension])
   end
   cp_r archive, destination
end