require 'selenium-webdriver'
require 'singleton'

class TelerikAdminBot
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

    def go_to_internal_buids
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

    bot.driver.execute_script "$find('ctl18_tfTitle_txtFieldText').set_value('#{options[:title]}')"

    bot.fill_in('Product', options[:product])

    Thread.current.send :sleep, 3

    changelog_contents = File.read(options[:changelog_path])
    bot.driver.execute_script "$telerik.$(document.body).append('<textarea id=\"tmp_editor\" />')"

    changelog_contents.each_line do |line|
        bot.find("#tmp_editor").send_keys(line)
    end

    bot.driver.execute_script "$find('ctl18_efReleaseNotes_reFieldText').set_html($telerik.$('#tmp_editor').val())"

    bot.fill_in('File type:', 'Paid Files')

    bot.find('#fileVersionField input').send_keys "#{VERSION}.0"

    full_path = File.expand_path(options[:archive_path], File.join(File.dirname(__FILE__), ".."))
    bot.find('.RadUpload input[type=file]').send_keys(full_path)

    bot.find("[value='Save']").click
    Thread.current.send :sleep, 6
end

# driver.quit

=begin
def unmark_previous_builds
    $driver.execute_script <<-SCRIPT
         var masterTable = $find("ctl18_rgNightBuilds").get_masterTableView();
         masterTable.filter("Title", "kendoui", Telerik.Web.UI.GridFilterFunction.Contains);
    SCRIPT

    Thread.current.send :sleep, 3

    rows_length = $driver.find_elements(:css, ".rgMasterTable tbody tr").length

    p rows_length

    1.upto(rows_length) do |index|
        checkbox = $driver.find_element(:css, ".rgMasterTable tbody tr:nth-child(#{index}) td:nth-child(2) input[type=checkbox]")
        $driver.execute_script 'arguments[0].click()', checkbox if checkbox.selected?
        Thread.current.send :sleep, 1
    end
    Thread.current.send :sleep, 7
end
=end

