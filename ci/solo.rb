root = File.absolute_path(File.dirname(__FILE__))

file_cache_path '/tmp/chef'
FileUtils.mkdir_p file_cache_path
cookbook_path root + '/cookbooks'
