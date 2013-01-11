gem_package "thin"
gem_package "sinatra"

deploy_revision "/var/www/screenshot" do
  repo 'https://github.com/underlog/xvfb-screenshot.git'
  migrate false
  restart_command "monit restart screenshot"
  create_dirs_before_symlink([])
  symlink_before_migrate({})
  symlinks({})
end
