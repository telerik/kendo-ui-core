case node["platform"]
when "ubuntu"
    bash "install heroku toolbelt" do
        code "wget -qO- https://toolbelt.heroku.com/install-ubuntu.sh | sh"
        action :run
        not_if "which heroku"
    end
end
