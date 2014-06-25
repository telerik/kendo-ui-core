require 'selenium-webdriver'
require 'singleton'

class TelerikProductCreateBot
    include Singleton

    attr_reader :driver

    def initialize

        @driver = Selenium::WebDriver.for(:firefox)
        @driver.navigate.to ADMIN_URL

        driver.find_element(:name, "txtEmail").send_keys ADMIN_RELEASE_UPLOAD_LOGIN
        driver.find_element(:name, "txtPassword").send_keys ADMIN_RELEASE_UPLOAD_PASS
        driver.find_element(:name, "btnLogin").click
        
        #retrieve existing products for a product line from a service
        #@KUI_existing_products = invoke service with KUI as param
        #@MVC_existing_products = invoke service with MVC as param
        #@JSP_existing_products = invoke service with JSP as param 
        #@PHP_existing_products = invoke service with PHP as param
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
        click_and_wait "Telerik Teams", "Telerik Teams"
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
    def navigate_to_section(suite_alias)
      case suite_alias
        when "KUI"
          click_and_wait "Kendo UI Professional", "administration"
        when "MVC"
          click_and_wait "UI for ASP.NET MVC", "administration"
        when "JSP"
          click_and_wait "UI for JSP", "administration"
        when "PHP"  
          click_and_wait "UI for PHP", "administration"
      end
    end
    def navigate_to_forum(suite_alias)
      case suite_alias
        when "KUI"
          click_and_wait "Kendo UI", "Support"
        when "MVC"
          click_and_wait "UI for ASP.NET MVC", "Support"
        when "JSP"
          click_and_wait "UI for JSP", "Support"
        when "PHP"  
          click_and_wait "UI for PHP", "Support"
      end
    end
    def get_tname(suite_alias)
      tname = String.new
          case suite_alias
            when "KUI"
              tname = "Kendo UI"
            when "MVC"
              tname = "ASP.NET MVC"
            when "JSP"
              tname = "JSP"
            when "PHP"  
              tname = "PHP"
          end
      return tname
    end
    def get_full_product_name(suite_alias)
     full_name = String.new
      case suite_alias
        when "KUI"
          full_name = "Kendo UI Professional"
        when "MVC"
          full_name = "UI for ASP.NET MVC"
        when "JSP"
          full_name = "UI for JSP"
        when "PHP"  
          full_name = "UI for PHP"
      end
     return full_name
    end
    def check_or_expand(element)
      driver.execute_script 'arguments[0].click()', element
      p "click or expand processed>>"
      rescue
      screenshot("Click_Or_Expand_Failed_For_Element_" + element.attribute("id"))
    end
end
def start_product_creation()
      bot = TelerikProductCreateBot.instance
      product_names = ENV["ProductNames"].split(',')

      p "number of products to create>>" + product_names.length.to_s

      suite_alias = ENV["SuiteAlias"] || "KUI"
      
      if product_names == nil
        p "Please provide valid product names for the new products!"
        return
      end
      
      #cancel product creation if such a product already exists
      #return if bot.product_created(product_name, suite_alias)
      #bot.add_product(product_name, suite_alias)
      tname = get_tname(suite_alias)

      product_names.each do |product_name|
        bot.go_to_products

        bot.navigate_to_section(suite_alias)

        bot.click_and_wait "New subproduct", "administration"

        p "creating product>>#{product_name}"
        create_product(bot, product_name,suite_alias, tname)
      end
      product_names.each do |product_name|
        p "creating code library for this product>>"
        create_code_library(bot, product_name, tname)
      end
      bot.quit
end
def create_product(bot, product_name, suite_alias, tname)
    product_icon_path = String.new
    product_name_trim = String.new

    if tname == "Kendo UI"
       bot.execute_script("$('[id$=\"_tfName_txtFieldText\"]').val('#{product_name} for #{tname}')")

       if product_name.index("Mobile") == nil
         product_icon_path = "\\\\telerik.com\\resources\\UX\\KendoUI\\Icons\\#{suite_alias}\\" + product_name.downcase + "_kendoui.png"
       else
        product_name_mod = product_name.downcase.sub " (mobile)", ""
        product_icon_path = "\\\\telerik.com\\resources\\UX\\KendoUI\\Icons\\#{suite_alias}\\mobile_" + product_name_mod.downcase + "_kendoui.png"
       end

    else
       if product_name.index("Mobile") == nil
         bot.execute_script("$('[id$=\"_tfName_txtFieldText\"]').val('Kendo UI #{product_name} for #{tname}')")
         product_icon_path = "\\\\telerik.com\\resources\\UX\\KendoUI\\Icons\\#{suite_alias}\\" + product_name.downcase + "_kendoui_" + suite_alias.downcase + ".png"
       else
        product_name_mod = product_name.downcase.sub " (mobile)", ""
        product_name_trim = product_name.sub " (Mobile)", ""
        bot.execute_script("$('[id$=\"_tfName_txtFieldText\"]').val('Kendo UI Mobile #{product_name_trim} for #{tname}')")
        product_icon_path = "\\\\telerik.com\\resources\\UX\\KendoUI\\Icons\\#{suite_alias}\\mobile_" + product_name_mod.downcase + "_kendoui_" + suite_alias.downcase + ".png"
       end

    end

    bot.execute_script("$('[id$=\"_tfShortName_txtFieldText\"]').val('#{product_name}')")

    #set product icon
    set_product_icon_path(bot, product_icon_path)

    sleep(1)

    bot.execute_script("$('[id$=\"_tfProductCssClass_txtFieldText\"]').val('-')")
    
    #need to generate random product code due to admin limitation
    random_code = Random.rand(1...10000000000).to_s
    bot.execute_script("$('[id$=\"_tfProductCode_txtFieldText\"]').val('#{random_code}')")

    if product_name.index("Mobile") == nil
       bot.execute_script("$('[id$=\"_tfUrlTitle_txtFieldText\"]').val('" + product_name.downcase + "')")
    else
      product_name_mod = product_name.downcase.sub " (mobile)", ""
      bot.execute_script("$('[id$=\"_tfUrlTitle_txtFieldText\"]').val('mobile-#{product_name_mod}')")
    end
    
    bot.execute_script("$('[id$=\"_cbVisible\"]').prop('checked', true)")

    bot.execute_script("$find($telerik.$('[id$=\"_efDescription_reFieldText\"]').attr('id')).set_html('-')")
    bot.execute_script("$find($telerik.$('[id$=\"_efSupportTicketInstructions_reFieldText\"]').attr('id')).set_html('<h2 class=\"tRemoveBottomMargin\" style=\"width: 100%; padding-top: 20px; border-top: 3px solid #f0f0f0; float: left;\">  Describe your question</h2><ol class=\"tFormFieldsList tClear\"><li>      <label>      Include the following</label><div class=\"txtWrapper\"><div class=\"tRTF sRTF\"><ul><li style=\"padding-left: 17px;\">Step by step instructions on how to reproduce the problem</li><li style=\"padding-left: 17px;\">Code snippets</li><li style=\"padding-left: 17px;\">Screenshots of the problem</li><li style=\"padding-left: 17px;\">Stack trace, if applicable</li><li style=\"padding-left: 17px;\">Project and its dependencies which illustrates the problem          (stripped, in zip format)*</li></ul></div><p class=\"tClearer tRemoveTopMargin\">      <strong>Note:</strong> Submitting a working project will speed up the resolution      to your issue. <a href=\"http://blogs.telerik.com/supportdept/posts/10-09-29/isolating_a_problem_in_a_sample_project.aspx\" target=\"_blank\">      This blog post</a> can help in this task.      </p></div></li></ol>')")

    bot.execute_script("$find($telerik.$('[id$=\"_ddlSite\"]').attr('id')).set_text('Kendo')")

    sleep (2)

    bot.execute_script("$find($telerik.$('[id$=\"_cfProductType_rcbField\"]').attr('id')).set_text('Telerik')")

    bot.click_element(bot.find("[value='Save']"))
    #sort new product accordingly
    sleep(5)

    p "assigning team for this product>>"
    if product_name_trim == ""
      assign_team(bot, product_name, suite_alias)
    else
      assign_team(bot, "Mobile " + product_name_trim, suite_alias)
    end
    p "creating forum for this product>>"
    create_forum(bot, product_name, suite_alias, tname)
end
def set_product_icon_path(bot, product_icon_path)
  element = bot.driver.find_element(:xpath, "//input[contains(@id,'_ruIconPicfile0')]")
  upload_id = element.attribute("id")

  upload_file(bot, upload_id, product_icon_path)
end
def upload_file(bot, upload_id, product_icon_path)
    product_icon_path.gsub!('/', '\\') unless PLATFORM =~ /linux|darwin/
    bot.set_upload_path(bot.driver.find_element(:css, "##{upload_id}"), product_icon_path)
    sleep (1)
    #bot.wait_for_element("##{upload_id} .ruRemove")
end
def create_forum(bot, product_name, suite_alias, tname)
  bot.go_to_support

  bot.navigate_to_forum(suite_alias)

  tname = get_tname(suite_alias)
  
  bot.click_element(bot.find("[value='New Subforum']"))

  fill_forum_fields(bot, product_name, tname)

end
def fill_forum_fields(bot, product_name, tname)
    bot.execute_script("$('[id$=\"_txtTitle\"]').val('#{product_name}')")
    bot.execute_script("$('[id$=\"_txtPageTitle\"]').val('#{product_name}')")
    
    if product_name.index("Mobile") == nil
      bot.execute_script("$('[id$=\"_txtUrlTitle\"]').val('" + product_name.downcase + "')")
    else
      product_name_mod = product_name.downcase.sub " (mobile)", ""
      bot.execute_script("$('[id$=\"_txtUrlTitle\"]').val('mobile-#{product_name_mod}')")
    end

    if tname == "Kendo UI"
       bot.execute_script <<-SCRIPT
         var node = $find($telerik.$('[id$=\"treeViewProductHierarchy\"]').attr('id')).findNodeByText("#{product_name} for #{tname}");
         var textElement = $telerik.$(node.get_element()).find('.rtIn')[0];
         $telerik.$(textElement).click();
       SCRIPT
       sleep(1)
    elsif product_name.index("Mobile") == nil
       bot.execute_script <<-SCRIPT
         var node = $find($telerik.$('[id$=\"treeViewProductHierarchy\"]').attr('id')).findNodeByText("Kendo UI #{product_name} for #{tname}");
         var textElement = $telerik.$(node.get_element()).find('.rtIn')[0];
         $telerik.$(textElement).click();
       SCRIPT
       sleep(1)
    else
       product_name_mod = product_name.sub " (Mobile)", ""
       bot.execute_script <<-SCRIPT
         var node = $find($telerik.$('[id$=\"treeViewProductHierarchy\"]').attr('id')).findNodeByText("Kendo UI Mobile #{product_name_mod} for #{tname}");
         var textElement = $telerik.$(node.get_element()).find('.rtIn')[0];
         $telerik.$(textElement).click();
       SCRIPT
       sleep(1)
    end


    bot.execute_script("$('[id$=\"_txtDefaultPriority\"]').val('48')")
    
    bot.execute_script("$('[id$=\"_cbPublic\"]').prop('checked', true)")
    bot.execute_script("$('[id$=\"_cbVisible\"]').prop('checked', true)")

    bot.execute_script("$('[id$=\"_cbAllowAttachments\"]').prop('checked', true)")
    bot.execute_script("$find($telerik.$('[id$=\"_rcbFileExtensions\"]').attr('id')).set_text('.jpg, .jpeg, .gif, .png,.zip')")

    bot.click_element(bot.find("[value='Save']"))
    sleep (6)
end
def assign_team(bot, product_name, suite_alias)
  bot.go_to_teams
  bot.click_and_wait "Kendo", "administration"

  grid_element = bot.driver.find_element(:xpath, "//div[contains(@id,'radGridProductSubscripts')]")
  grid_id = grid_element.attribute("id")

  full_name = bot.get_full_product_name(suite_alias)

  rows_length = bot.driver.find_elements(:css, "##{grid_id} tbody tr").length
  p "rows length>>#{rows_length}. Processing..."

    1.upto(rows_length) do |index|
        tcell = bot.driver.find_element(:css, "##{grid_id} tbody tr:nth-child(#{index}) td:nth-child(2)")
        p "cell text>>" + tcell.text
        p "cell found>>#{full_name}" if tcell.text.include? full_name

        if tcell.text.include? full_name
          expand_cell = bot.driver.find_element(:css, "##{grid_id} tbody tr:nth-child(#{index}) td:nth-child(1) input[type=submit]")
          p "expanding>>"
          bot.check_or_expand(expand_cell)
          Thread.current.send :sleep, 1

          next_row_index = index + 1
          detail_table_rows_length = bot.driver.find_elements(:css, "##{grid_id} tbody tr:nth-child(#{next_row_index}) td:nth-child(2) .rgDetailTable tbody tr").length
          p "detail table rows length>>#{detail_table_rows_length}. Processing..."
          
          1.upto(detail_table_rows_length) do |dindex|
              inner_tcell = bot.driver.find_element(:css, "##{grid_id} tbody tr:nth-child(#{next_row_index}) td:nth-child(2) .rgDetailTable tbody tr:nth-child(#{dindex}) td:nth-child(1)")
              p "cell found>>#{product_name}" if inner_tcell.text.include? product_name

              if inner_tcell.text.include? product_name
                  checkbox = bot.driver.find_element(:css, "##{grid_id} tbody tr:nth-child(#{next_row_index}) td:nth-child(2) .rgDetailTable tbody tr:nth-child(#{dindex}) td:nth-child(2) input[type=checkbox]")
                  p "checking checkbox>>"
                  bot.check_or_expand(checkbox) if !checkbox.selected?
                  Thread.current.send :sleep, 1
                  return
              end
          end
        end
    end

    bot.click_element(bot.find("[value='Save']"))

    sleep (5)
    #save
end