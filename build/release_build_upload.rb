require 'selenium-webdriver'
require 'singleton'

class TelerikReleaseBot
    include Singleton

    attr_reader :driver

    def initialize
        @driver = Selenium::WebDriver.for(:firefox)
        @driver.navigate.to ADMIN_URL

        driver.find_element(:name, "txtEmail").send_keys ADMIN_LOGIN
        driver.find_element(:name, "txtPassword").send_keys ADMIN_PASS
        driver.find_element(:name, "btnLogin").click
    end

    def find(selector)
        driver.find_element(:css, selector)
    end

    def go_to_product_versions
        click_and_wait "Administration", "administration"
        click_and_wait "Latest Internal Builds", "latest"
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

def upload_internal_build(options)
    bot = TelerikAdminBot.instance

    bot.go_to_internal_buids

    bot.find("[value='Add New Item']").click

    bot.wait_for_title "administration"

    Thread.current.send :sleep, 3

    bot.driver.execute_script "$find($telerik.$('[id$=\"_tfTitle_txtFieldText\"]').attr('id')).set_value('#{options[:title]}')"

    bot.fill_in('Product', options[:product])

    Thread.current.send :sleep, 3

    changelog_contents = File.read(options[:changelog_path])

    bot.driver.execute_script "$telerik.$(document.body).append('<textarea id=\"tmp_editor\" />')"

    changelog_contents.each_line do |line|
        bot.find("#tmp_editor").send_keys(line)
    end

    bot.driver.execute_script "$find($telerik.$('[id$=\"_efReleaseNotes_reFieldText\"]').attr('id')).set_html($telerik.$('#tmp_editor').val())"

    bot.fill_in('File type:', 'Paid Files')

    unless options[:vs_extension]
        bot.driver.execute_script "$telerik.$('input[id$=\"_attachmentEdit_cbIsHotfix\"]').click()"
    else
        bot.find('#fileVersionField input').send_keys "#{VERSION}.0"
    end

    full_path = File.expand_path(options[:archive_path], File.join(File.dirname(__FILE__), ".."))
    bot.find('.RadUpload input[type=file]').send_keys(full_path)

    bot.find("[value='Save']").click
    Thread.current.send :sleep, 6
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

      #destination_zip = File.join(versioned_bundle_destination_path, versioned_bundle_name(name) + ".zip")
      #archive_zip = File.join(versioned_bundle_archive_path, versioned_bundle_name(name) + ".zip")
      #cp archive_zip, destination_zip
    end
    if release_build_config[:msi]
      build_path_and_copy \
      :destination =>  versioned_bundle_destination_path,
      :archive => versioned_bundle_archive_path,
      :vbd => versioned_bundle_name(name),
      :extension => ".msi"
      #destionation_msi = File.join(versioned_bundle_destination_path, versioned_bundle_name(name)  + ".msi") 
      #archive_msi = File.join(versioned_bundle_archive_path, versioned_bundle_name(name)  + ".msi") 
      #cp archive_msi, destionation_msi
    end
    if release_build_config[:xml]
      build_path_and_copy \
      :destination =>  versioned_bundle_destination_path,
      :archive => versioned_bundle_archive_path,
      :vbd => versioned_bundle_name(name),
      :extension => ".xml"
      #destionation_xml = File.join(versioned_bundle_destination_path, versioned_bundle_name(name)  + ".xml") 
      #archive_xml = File.join(versioned_bundle_archive_path, versioned_bundle_name(name)  + ".xml") 
      #cp archive_xml, destionation_xml
    end
    if release_build_config[:nuget]
      build_path_and_copy \
      #:destination =>  versioned_bundle_destination_path,
      #:archive => versioned_bundle_archive_path,
      #:vbd => versioned_bundle_name(name),
      #:extension => "nupkg.zip"
       #destionation_nuget = File.join(versioned_bundle_destination_path, versioned_bundle_name(name)  + ".zip") 
       #archive_nuget = File.join(versioned_bundle_archive_path, versioned_bundle_name(name)  + ".zip") 
       #cp archive_nuget, destionation_nuget
    end
    if release_build_config[:download_builder]
      build_path_and_copy \
      :destination =>  versioned_bundle_destination_path,
      :archive => versioned_bundle_archive_path,
      :static_name => "download-builder" 
      #destination_path = File.join(versioned_bundle_destination_path, "download-builder")
      #archive_path = File.join(versioned_bundle_archive_path, "download-builder") 
      #cp_r(archive_path, destination_path)
      #cp archive_path, destionation_path
      
    end
    if release_build_config[:demos]
      build_path_and_copy \
      :destination =>  versioned_bundle_destination_path,
      :archive => versioned_bundle_archive_path,
      :static_name => "online-examples.zip" 
      #destionation_demos = File.join(versioned_bundle_destination_path, "online-examples.zip") 
      #archive_demos = File.join(versioned_bundle_archive_path, "online-examples.zip") 
      #cp archive_demos, destionation_demos
    end
    if release_build_config[:common_installer]
      archive_file = File.join(WEB_INSTALLER_ROOT, "TelerikControlPanelSetup.exe")
      cp archive_file, File.join(versioned_bundle_destination_path, "TelerikControlPanelSetup.MVC.#{VERSION}.exe")
      cp archive_file, File.join(versioned_bundle_destination_path, "TelerikControlPanelSetup.KUI.Complete.#{VERSION}.exe") 

      archive_file = File.join(WEB_INSTALLER_ROOT, "TelerikUIForAspNetMvcSetup.exe")
      cp archive_file, File.join(versioned_bundle_destination_path, "TelerikUIForAspNetMvcSetup.#{VERSION}.exe")
    end
        
end
def build_path_and_copy(options)
   if options[:static_name]
    destination = File.join(options[:destination], options[:static_name])
    archive = File.join(options[:archive], options[:static_name])
   else
    destination = File.join(options[:destination], options[:vbd] + options[:extension])
    archive = File.join(options[:archive], options[:vbd] + options[:extension])
   end
   cp archive, destination
end

desc "Upload release builds"
task "release_builds:upload" do
    p "my task"
end