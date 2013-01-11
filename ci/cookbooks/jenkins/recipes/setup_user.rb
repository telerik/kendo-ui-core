bash "set jenkins users shell" do
    code "chsh -s /bin/zsh jenkins"
end

cookbook_file "/var/lib/jenkins/.zshrc" do
    source "zshrc"
    owner "jenkins"
    group "nogroup"
    mode "0600"
end

directory "/var/lib/jenkins/.ssh" do
    owner "jenkins"
    group "nogroup"
    mode "0700"
end

cookbook_file "/var/lib/jenkins/.gitconfig" do
    source "gitconfig"
    owner "jenkins"
    group "nogroup"
    mode "0600"
end

%w[id_rsa id_rsa.pub authorized_keys known_hosts].each do |file|
    cookbook_file "/var/lib/jenkins/.ssh/#{file}" do
        source "ssh/#{file}"
        owner "jenkins"
        group "nogroup"
        mode "0600"
    end
end
