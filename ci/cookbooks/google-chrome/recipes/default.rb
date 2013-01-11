apt_repository "google" do
  uri "http://dl.google.com/linux/chrome/deb/ "
  components ["stable", "main"]
  key "https://dl-ssl.google.com/linux/linux_signing_key.pub"
end

package "google-chrome-stable"

