require 'tmpdir'

root = File.absolute_path(File.dirname(__FILE__))

file_cache_path File.join(Dir.tmpdir, 'chef')
FileUtils.mkdir_p file_cache_path
cookbook_path File.join(root, 'cookbooks')
