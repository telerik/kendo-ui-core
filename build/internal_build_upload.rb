require 'selenium-webdriver'
require 'singleton'

class TelerikInternalBuildBot
    include Singleton

    attr_reader :driver

    def initialize
        @driver = Selenium::WebDriver.for(:firefox)
        @driver.navigate.to ADMIN_URL

        driver.find_element(:name, "txtEmail").send_keys ADMIN_RELEASE_UPLOAD_LOGIN
        driver.find_element(:name, "txtPassword").send_keys ADMIN_RELEASE_UPLOAD_PASS
        driver.find_element(:name, "btnLogin").click
    end
    def go_to_internal_buids
        click_and_wait "Administration", "administration"
        click_and_wait "Latest Internal Builds", "latest"
    end
    def fill_in(title, contents)
        element = driver.find_element(:xpath, "//label[text()='#{title}']/..//input")
        driver.execute_script 'arguments[0].focus()', element
        element.send_keys contents
        element.send_keys :tab
        rescue
        screenshot("Failed_To_Set_Dropdown_Value")
    end
    def find(selector)
        driver.find_element(:css, selector)
        rescue
        screenshot("No_such_element_" + selector)
        return false
    end
    def find_els(selector)
        driver.find_elements(:css, selector)
        rescue
        screenshot("No_such_elements_" + selector)
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
    def send_keys_to_target(target,line)
        target.send_keys(line)
        rescue
        screenshot("Failed_To_Send_Keys_To_Target")
    end
    def read_changelog(path)
        return File.read(path)
        rescue
        screenshot("Failed_To_Read_Changelog")    
    end
    def uncheck_version(checkbox)
        driver.execute_script 'arguments[0].click()', checkbox
        rescue
        screenshot("Unable_To_Uncheck_Version_Checkbox")  
    end
    def list_versions(name)
        execute_script <<-SCRIPT
         var masterTable = $find($telerik.$('[id$=\"_rgNightBuilds\"]').attr('id')).get_masterTableView();
         masterTable.filter("Title", "#{name}", Telerik.Web.UI.GridFilterFunction.Contains);
        SCRIPT

        Thread.current.send :sleep, 3

        rows_length = find_els(".rgMasterTable tbody tr").length

        1.upto(rows_length) do |index|
            checkbox = find(".rgMasterTable tbody tr:nth-child(#{index}) td:nth-child(2) input[type=checkbox]")
            name_anchor = find(".rgMasterTable tbody tr:nth-child(#{index}) td:nth-child(3) a")
            
            if name_anchor.text.index("#{VERSION}") == nil && name_anchor.text.index("#{VERSION_YEAR}.#{VERSION_Q}") != nil && checkbox.selected?
                 uncheck_version(checkbox)
                 Thread.current.send :sleep, 2
            end
        end
    end
    def quit
        driver.quit
    end
end

def upload_internal_build(options)
    bot = TelerikInternalBuildBot.instance

    bot.go_to_internal_buids

    bot.click_element(bot.find("[value='Add New Item']"))

    bot.wait_for_title "administration"

    Thread.current.send :sleep, 3

    bot.execute_script "$find($telerik.$('[id$=\"_tfTitle_txtFieldText\"]').attr('id')).set_value('#{options[:title]}')"

    bot.fill_in('Product', options[:product])

    Thread.current.send :sleep, 3

    changelog_contents = bot.read_changelog(options[:changelog_path])

    bot.execute_script "$telerik.$(document.body).append('<textarea id=\"tmp_editor\" />')"

    changelog_contents.each_line do |line|
        bot.send_keys_to_target(bot.find("#tmp_editor"), line)
    end

    bot.execute_script "$find($telerik.$('[id$=\"_efReleaseNotes_reFieldText\"]').attr('id')).set_html($telerik.$('#tmp_editor').val())"

    bot.fill_in('File type:', 'Paid Files')

    unless options[:vs_extension]
        bot.execute_script "$telerik.$('input[id$=\"_attachmentEdit_cbIsHotfix\"]').click()"
    else
        bot.send_keys_to_target(bot.find('#fileVersionField input'), "#{VERSION}.0")
    end

    full_path = File.expand_path(options[:archive_path], File.join(File.dirname(__FILE__), ".."))
    bot.send_keys_to_target(bot.find('.RadUpload input[type=file]'), full_path)

    bot.click_element(bot.find("[value='Save']"))
    Thread.current.send :sleep, 6
end


desc "Upload all internal builds on kendoui.com"
task "internal_builds:bundles:all"

desc "Hide all internal builds for current version"
task "internal_builds:uncheck_previous" do
    bot = TelerikInternalBuildBot.instance

    bot.go_to_internal_buids

    bot.list_versions("kendoui")
    bot.list_versions("mvc")
    bot.list_versions("jsp")
    bot.list_versions("php")
end

task "internal_builds:upload" => [ "internal_builds:bundles:all" ]
task "internal_builds:uncheck_previous" => ["internal_builds:upload"]
