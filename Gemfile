source "http://rubygems.org"

gem "rake"
gem "github_api"
gem "kramdown"
gem "nokogiri"
gem "selenium-webdriver", "~> 2.38.0"
gem "rubyzip", "~> 1.1.4", :require => 'zip/zip'

unless RUBY_PLATFORM =~ /darwin/
    gem "winrm"
end

group :development do
    gem 'guard'
    gem 'guard-shell'
    gem 'guard-livereload'
    gem 'rb-inotify', '~> 0.8.8'
end
