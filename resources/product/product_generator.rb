require 'selenium-webdriver'
require 'singleton'
require 'version'

class TelerikProductCreateBot
    include Singleton

    attr_reader :driver

    def initialize

        @driver = Selenium::WebDriver.for(:firefox)
        @driver.navigate.to ADMIN_URL

        driver.find_element(:name, "txtEmail").send_keys ADMIN_RELEASE_UPLOAD_LOGIN
        driver.find_element(:name, "txtPassword").send_keys ADMIN_RELEASE_UPLOAD_PASS
        driver.find_element(:name, "btnLogin").click

        @KUI_existing_products = []
        @MVC_existing_products = []
        @JSP_existing_products = []
        @PHP_existing_products = []
    end

    def find(selector)
        driver.find_element(:css, selector)
        rescue
        screenshot("No_such_element_" + selector)
        return false
    end

    def go_to_products
        click_and_wait "Administration", "administration"
        click_and_wait "Products", "products"
    end
    def go_to_teams
        click_and_wait "Administration", "administration"
        click_and_wait "Telerik Teams", "Telerik"
    end
    def go_to_support
        click_and_wait "Support", "threads"
        click_and_wait "Forums", "forums"
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
    #not used
    def wait_for_element(css)
        Selenium::WebDriver::Wait.new(:timeout => 1000).until { driver.find_element(:css, css) }
        rescue
        screenshot("Browser_Timeout_On_Element_Wait")
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
    def product_created(product, suite)
      case suite
        when "KUI"
          return @KUI_existing_products.index(product) != nil
        when "MVC"
          return @MVC_existing_products.index(product) != nil
        when "JSP"
          return @JSP_existing_products.index(product) != nil
        when "PHP"  
          return @PHP_existing_products.index(product) != nil
      end
    end
    def add_product(product, suite)
      case suite
        when "KUI"
          @KUI_existing_products.push(product)
        when "MVC"
          @MVC_existing_products.push(product)
        when "JSP"
          @JSP_existing_products.push(product)
        when "PHP"  
          @PHP_existing_products.push(product)
      end
    end
def start_product_creation()
      bot = TelerikProductCreateBot.instance
      product_name = ENV["ProductName"]
      suite_alias = ENV["SuiteAlias"] || "KUI"
      
      if product_name == nil
        p "Please provide valid product name for the new product!"
        return
      end

      return if bot.product_created(product_name, suite_alias)
      bot.add_product(product_name, suite_alias)

      bot.go_to_products

      tname = String.new

      case suite
        when "KUI"
          bot.click_and_wait "Kendo UI Professional", "administration"
          tname = "Kendo UI"
        when "MVC"
          bot.click_and_wait "UI for ASP.NET MVC", "administration"
          tname = "ASP.NET MVC"
        when "JSP"
          bot.click_and_wait "UI for JSP", "administration"
          tname = "JSP"
        when "PHP"  
          bot.click_and_wait "UI for PHP", "administration"
          tname = "PHP"
      end

      bot.click_and_wait "New subproduct", "administration"

      create_product(bot, product_name, suite_alias, tname)

end
def create_product(bot, product_name, suite_alias, tname)
    product_icon_path = String.new

    if tname == "Kendo UI"
       bot.execute_script("$('[id$=\"_tfName_txtFieldText\"]').val('#{product_name} for #{tname}')")
       product_icon_path = "R:\\UX\\KendoUI\\Icons\\#{suite_alias}\\24\\" + product_name.downcase + "_kendoui.png"
    elsif tname == "JSP"
       bot.execute_script("$('[id$=\"_tfName_txtFieldText\"]').val('Kendo UI #{product_name} for #{tname}')")
       product_icon_path = "R:\\UX\\KendoUI\\Icons\\#{suite_alias}\\24\\" + product_name.downcase + "_kendoui_java.png" 
    else
       bot.execute_script("$('[id$=\"_tfName_txtFieldText\"]').val('Kendo UI #{product_name} for #{tname}')")
       product_icon_path = "R:\\UX\\KendoUI\\Icons\\#{suite_alias}\\24\\" + product_name.downcase + "_kendoui_" + suite_alias.downcase + ".png"
    end

    bot.execute_script("$('[id$=\"_tfShortName_txtFieldText\"]').val('#{product_name}')")

    #set product icon
    set_product_icon_path(product_icon_path)

    sleep(1)

    bot.execute_script("$('[id$=\"_tfProductCssClass_txtFieldText\"]').val('-')")

    random_code = Random.rand(1...10000000000).to_s
    bot.execute_script("$('[id$=\"_tfProductCode_txtFieldText\"]').val('#{random_code}')")

    bot.execute_script("$('[id$=\"_tfUrlTitle_txtFieldText\"]').val('" + product_name.downcase + "')")
    
    bot.execute_script("$('[id$=\"_cbVisible\"]').prop('checked', true)")

    bot.execute_script("$find($telerik.$('[id$=\"_efDescription_reFieldText\"]').attr('id')).set_html('-')")
    bot.execute_script("$find($telerik.$('[id$=\"_efSupportTicketInstructions_reFieldText\"]').attr('id')).set_html('<h2 class=\"tRemoveBottomMargin\" style=\"width: 100%; padding-top: 20px; border-top: 3px solid #f0f0f0; float: left;\">  Describe your question</h2><ol class=\"tFormFieldsList tClear\"><li>      <label>      Include the following</label><div class=\"txtWrapper\"><div class=\"tRTF sRTF\"><ul><li style=\"padding-left: 17px;\">Step by step instructions on how to reproduce the problem</li><li style=\"padding-left: 17px;\">Code snippets</li><li style=\"padding-left: 17px;\">Screenshots of the problem</li><li style=\"padding-left: 17px;\">Stack trace, if applicable</li><li style=\"padding-left: 17px;\">Project and its dependencies which illustrates the problem          (stripped, in zip format)*</li></ul></div><p class=\"tClearer tRemoveTopMargin\">      <strong>Note:</strong> Submitting a working project will speed up the resolution      to your issue. <a href=\"http://blogs.telerik.com/supportdept/posts/10-09-29/isolating_a_problem_in_a_sample_project.aspx\" target=\"_blank\">      This blog post</a> can help in this task.      </p></div></li></ol>')")

    bot.execute_script("$find($telerik.$('[id$=\"_ddlSite\"]').attr('id')).set_text('Kendo')")

    sleep (2)

    bot.execute_script("$find($telerik.$('[id$=\"_cfProductType_rcbField\"]').attr('id')).set_text('Telerik')")

    bot.click_and_wait "Save", "administration"
    #sort new product accordingly

    assign_team(bot)
    create_forum(bot, product_name, suite_alias, tname)   

end
def set_product_icon_path(product_icon_path)
  element = bot.driver.find_element(:xpath, "//div[contains(@id,'_ruIconPicfile0')]")
  upload_id = element.attribute("id")

  upload_file(bot, upload_id, product_icon_path)
end
def upload_file(bot, upload_id, product_icon_path)
=begin    bot.execute_script("
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
=end
    product_icon_path.gsub!('/', '\\') unless PLATFORM =~ /linux|darwin/
    bot.set_upload_path(bot.driver.find_element(:css, "##{upload_id} input[type=file]"), product_icon_path)
    #bot.wait_for_element("##{upload_id} .ruRemove")
end
def create_forum(bot, product_name, suite_alias, tname)
  
end
def assign_team(bot, product_name, suite_alias, tname)
  bot.go_to_teams
  bot.click_and_wait("Kendo", "administration")
  
  case suite_alias
        when "KUI"
          bot.click_and_wait "Kendo UI Professional", "administration"
          tname = "Kendo UI"
        when "MVC"
          bot.click_and_wait "UI for ASP.NET MVC", "administration"
          tname = "ASP.NET MVC"
        when "JSP"
          bot.click_and_wait "UI for JSP", "administration"
          tname = "JSP"
        when "PHP"  
          bot.click_and_wait "UI for PHP", "administration"
          tname = "PHP"
  end
  rows_length = bot.driver.find_elements(:css, ".rgMasterTable tbody tr").length

    1.upto(rows_length) do |index|
        tcell = bot.driver.find_element(:css, ".rgMasterTable tbody tr:nth-child(#{index}) td:nth-child(2)")
        p "cell found>>" if tcell.text.include? tname

        if tcell.text.include? tname
          expand_cell = bot.driver.find_element(:css, ".rgMasterTable tbody tr:nth-child(#{index}) td:nth-child(1)")
          bot.execute_script 'arguments[0].click()'
          Thread.current.send :sleep, 1

          next_row_index = index + 1
          detail_table_rows_length = bot.driver.find_elements(:css, ".rgMasterTable tbody tr:nth-child(#{next_row_index}) td:nth-child(2) .rgDetailTable tbody tr").length
          
          1.upto(detail_table_rows_length) do |dindex|
              inner_tcell = bot.driver.find_element(:css, ".rgMasterTable tbody tr:nth-child(#{next_row_index}) td:nth-child(2) .rgDetailTable tbody tr:nth-child(#{dindex}) td:nth-child(1)")

              if inner_tcell.text.include? product_name
                  checkbox = bot.driver.find_element(:css, ".rgMasterTable tbody tr:nth-child(#{next_row_index}) td:nth-child(2) .rgDetailTable tbody tr:nth-child(#{dindex}) td:nth-child(2) input[type=checkbox]")
                  bot.execute_script 'arguments[0].click()', checkbox if checkbox.selected?
                  Thread.current.send :sleep, 1
                  return
              end
          end
        end
    end

    bot.click_element(bot.find("[value='Save']"))
    #save
=begin    
    1.upto(rows_length) do |index|
        checkbox = bot.driver.find_element(:css, ".rgMasterTable tbody tr:nth-child(#{index}) td:nth-child(2) input[type=checkbox]")
        bot.driver.execute_script 'arguments[0].click()', checkbox if checkbox.selected?
        Thread.current.send :sleep, 1
    end
=end
end