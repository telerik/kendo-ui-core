require 'selenium-webdriver'
require 'singleton'

class TelerikReleaseBot
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
        Selenium::WebDriver::Wait.new(:timeout => 10).until { driver.title.downcase.start_with? title }
    end

    def fill_in(title, contents)
        element = driver.find_element(:xpath, "//label[text()='#{title}']/..//input")
        driver.execute_script 'arguments[0].focus()', element
        element.send_keys contents
        element.send_keys :tab
    end

    def quit
        driver.quit
    end
end

def upload_release_build(options)
    bot = TelerikReleaseBot.instance

    bot.go_to_product_versions

    bot.driver.execute_script <<-SCRIPT
         var masterTable = $find($telerik.$('[id$=\"_dgProducts\"]').attr('id')).get_masterTableView();
         masterTable.filter("ProductName", "ui", Telerik.Web.UI.GridFilterFunction.Contains);
    SCRIPT

    bot.wait_for_title "product"

    Thread.current.send :sleep, 3

    product_names = ['Kendo UI Web', 'Kendo UI Web GPL' 'Kendo UI DataViz', 'Kendo UI Mobile', 'Kendo UI Complete', 'UI for ASP.NET MVC', 'UI for JSP', 'UI for PHP']

    create_version("Kendo UI Mobile") 
    #product_names.each { |pn| create_version(pn) }
    
end
def create_version(productName)
      click_and_wait productName, "administration"
      click_and_wait "Manage Versions", "administration"

      if defined? SERVICE_PACK_NUMBER
        click_and_wait "New Minor","administration"
        fill_version_fields
        #upload_files  
      else
        click_and_wait "New Major","administration"
        fill_version_fields
        #upload_files  
      end
end
def fill_version_fields
       bot.driver.execute_script "$find($telerik.$('[id$=\"_txtMajorName\"]').attr('id')).set_value('#{VERSION_YEAR}.#{VERSION_Q}')"
       bot.driver.execute_script "$find($telerik.$('[id$=\"_txtMinorName\"']).attr('id')).set_value('#{VERSION}')"
       bot.driver.execute_script "$find($telerik.$('[id$=\"_cbBeta\"']).attr('id')).checked = true"

       bot.find("[value='Save']").click
       Thread.current.send :sleep, 6
end
def upload_files

end
def release_build_file_copy(release_build_config, name)
    if defined? SERVICE_PACK_NUMBER
        destination_folder_name = "Q#{VERSION_Q} #{VERSION_YEAR} SP#{SERVICE_PACK_NUMBER}"
    else
        destination_folder_name = "Q#{VERSION_Q} #{VERSION_YEAR}"
    end

    versioned_bundle_destination_path = File.join(RELEASE_ROOT, VERSION_YEAR.to_s, destination_folder_name)
    versioned_bundle_archive_path = File.join(ARCHIVE_ROOT, "Production")


    FileUtils.mkdir_p(versioned_bundle_destination_path)

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

    end
    if release_build_config[:xml]
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
      :extension => "nupkg.zip"
    end
    if release_build_config[:download_builder]
      build_path_and_copy \
      :destination =>  versioned_bundle_destination_path,
      :archive => versioned_bundle_archive_path,
      :static_name => "download-builder" 
      
    end
    if release_build_config[:demos]
      build_path_and_copy \
      :destination =>  versioned_bundle_destination_path,
      :archive => versioned_bundle_archive_path,
      :static_name => "online-examples.zip" 

    end
    if release_build_config[:common_installer]
      archive_file = File.join(WEB_INSTALLER_ROOT, "TelerikControlPanelSetup.exe")
      cp archive_file, File.join(versioned_bundle_destination_path, "TelerikControlPanelSetup.MVC.#{VERSION}.exe")
      cp archive_file, File.join(versioned_bundle_destination_path, "TelerikControlPanelSetup.KUI.Complete.#{VERSION}.exe") 

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

desc "Upload release builds"
task "release_builds:upload" do
    p "my task"
end