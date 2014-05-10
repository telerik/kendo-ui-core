require release_notes_upload

namespace :release_notes do
    desc "Upload release notes on telerik.com"
    task :upload do
        set_configuration_and_upload \
    end  
end
end