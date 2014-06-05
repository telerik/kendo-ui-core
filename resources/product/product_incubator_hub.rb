require 'product_generator'
require 'code_library_creator'

namespace :kendo_product do
  desc "Create new product and its accompanying forum and code library, and assign its support to the appropriate Telerik team"
    #product name and suite are fetched from environmental/runtime variables: ENV["ProductName"] and ENV["SuiteAlias"]
      task :create do
          start_product_creation
      end
end