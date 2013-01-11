package "cifs-utils"

directory "/mnt/Resources"

mount "/mnt/Resources" do
    device "//filesrvbg01/Resources"
    fstype "cifs"
    options "username=TeamFoundationUser,password=voyant69,workgroup=telerik,uid=jenkins"
    pass 0
end

link "/kendo-builds" do
    to "/mnt/Resources/Controls/DISTRIBUTIONS/KendoUI/BUILDS"
end


