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



desc "Upload release builds"
task "release_builds:upload" do
    p "my task"
end