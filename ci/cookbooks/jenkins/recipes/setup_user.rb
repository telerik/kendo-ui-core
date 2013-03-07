bash "set jenkins users shell" do
    code "chsh -s /bin/zsh jenkins"
end

%w[zshrc gitconfig netrc].each do |file|
    cookbook_file "/var/lib/jenkins/.#{file}" do
        source "#{file}"
        owner "jenkins"
        group "nogroup"
        mode "0600"
    end
end

directory "/var/lib/jenkins/.ssh" do
    owner "jenkins"
    group "nogroup"
    mode "0700"
end

%w[id_rsa id_rsa.pub authorized_keys known_hosts config].each do |file|
    cookbook_file "/var/lib/jenkins/.ssh/#{file}" do
        source "ssh/#{file}"
        owner "jenkins"
        group "nogroup"
        mode "0600"
    end
end
