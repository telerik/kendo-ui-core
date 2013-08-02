access_user = "TeamFoundationUser"
access_pass = "voyant69"

case node["platform"]
when "windows"
    def psexec message, cmd
        execute message do
            command "psexec -u jenkins -p jenkins-slave /accepteula " + cmd
        end
    end

    psexec(
        "Disconnect network share",
        "net use k: /delete"
    )

    psexec(
        "Add credentials for network share to windows vault",
        "cmdkey /add:telerik.com /user:telerik.com\\#{access_user} /pass:#{access_pass}"
    )

    psexec(
        "Mount network share",
        "net use k: \\\\telerik.com\\resources\\Controls\\DISTRIBUTIONS\\KendoUI\\BUILDS /persistent:yes"
    )
else
    package "cifs-utils"

    access_options = "username=#{access_user},password=#{access_pass},workgroup=telerik,uid=jenkins"

    directory "/mnt/Resources"

    mount "/mnt/Resources" do
        device "//filesrvbg01/Resources"
        fstype "cifs"
        options access_options
        pass 0
        action [:mount, :enable]
    end

    link "/kendo-builds" do
        to "/mnt/Resources/Controls/DISTRIBUTIONS/KendoUI/BUILDS"
    end

    directory "/mnt/kendo-iis"

    mount "/mnt/kendo-iis" do
        device "//KendoIIS/shares"
        fstype "cifs"
        options access_options
        pass 0
        action [:mount, :enable]
    end
end
