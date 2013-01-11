bash "Add nodejs PPA" do
    code <<-SH
        apt-add-repository -y ppa:chris-lea/node.js
        apt-get update -y
    SH
end

package "nodejs"
package "npm"
