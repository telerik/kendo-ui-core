case node["platform"]
when "windows"
    include_recipe "jenkins::setup_user"
    include_recipe "jenkins::mount_filesrv"

    if ::Win32::Service.exists?("jenkins-slave") then
        service "jenkins-slave" do
            action [:stop]
        end
    end

    JENKINS_HOME = "C:\\Jenkins\\"

    directory JENKINS_HOME

    %w[jenkins-slave.exe jenkins-slave.xml slave.jar].each do |file|
        cookbook_file File.join(JENKINS_HOME, "#{file}") do
            source "#{file}"
        end
    end

    execute "Register jenkins service" do
        cwd JENKINS_HOME
        command "jenkins-slave uninstall & jenkins-slave install"
    end

    service "jenkins-slave" do
        action [:enable, :start]
    end

    execute "Set jenkins-slave user" do
        command "sc.exe config jenkins-slave obj= .\\jenkins password= jenkins-slave"
    end
else
    user "jenkins" do
        home "/var/lib/jenkins"
    end

    directory "/var/lib/jenkins" do
        owner "jenkins"
        group "nogroup"
    end

    include_recipe "jenkins::setup_user"
    include_recipe "jenkins::mount_filesrv"
end
