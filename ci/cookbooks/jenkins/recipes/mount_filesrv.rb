package "cifs-utils"

access_options = "username=TeamFoundationUser,password=voyant69,workgroup=telerik,uid=jenkins"

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
