yum_key "google-chrome" do
    url "https://dl-ssl.google.com/linux/linux_signing_key.pub"
    action :add
end

yum_repository "google-chrome" do
    description "google-chrome - 64-bit"
    url "http://dl.google.com/linux/chrome/rpm/stable/x86_64"
    key "google-chrome"
    action :add
end

package "google-chrome-stable"

