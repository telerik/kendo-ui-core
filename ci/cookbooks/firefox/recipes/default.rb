remote_file "/tmp/remi-release-6.rpm" do
    source "http://rpms.famillecollet.com/enterprise/remi-release-6.rpm"
    action :create_if_missing
end

package "remi-repository" do
    source "/tmp/remi-release-6.rpm"
    action :install
end

bash "install firefox" do
    code %q{
        yum install -y --enablerepo=remi --disablerepo=updates firefox
    }
end


