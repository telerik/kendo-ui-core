WIDGET_NAMES = {
    "Group" => "Groupable",
    "Filter" => "FilterMenu",
    "FilterMenuOperators" => "FilterMenu"
}

PROPERTY_NAMES = {
    "View" => "views"
}

OPERATOR_NAMES = {
    "IsEqualTo" => "eq",
    "IsNotEqualTo" => "neq",
    "IsGreaterThanOrEqualTo" => "gte",
    "IsGreaterThan" => "gt",
    "IsLessThanOrEqualTo" => "lte",
    "IsLessThan" => "lt"
}

COLUMN_MENU_OPTIONS = {
    "Columns" => "columns",
    "Done" => "done",
    "Filter" => "filter",
    "Lock" => "lock",
    "ColumnSettings" => "settings",
    "SortAscending" => "sortAscending",
    "SortDescending" => "sortDescending",
    "Unlock" => "unlock"
}

LOCALIZATION_OPTION_NAMES = Hash.new("messages")
LOCALIZATION_OPTION_NAMES["Upload"] = "localization"
LOCALIZATION_OPTION_NAMES["FilterMenuOperators"] = "operators"

def getPropertyName(property)
    result = PROPERTY_NAMES[property] || property
    return result.sub(/^[A-Z]/) { |f| f.downcase }
end

def extractMessages(file_name)
    messages = Hash.new

    messages["FilterMenuOperators"] = Hash.new
    messages["ColumnMenu"] = Hash.new
    messages["RecurrenceEditor"] = Hash.new
    messages["GridDummy"] = Hash.new #contains the Grid options that cannot be set through the prototype


    doc = Nokogiri::XML(open(file_name))

    doc.xpath('/root/data').each do |node|
        widget_name, property = node["name"].split '_'
        widget_name = WIDGET_NAMES[widget_name] || widget_name
        value = node.first_element_child.inner_text

        if widget_name == "FilterMenu" && property.match(/^(Date|Number|String|Enum)/)

            match = property.match(/^([A-Z][a-z]+)(.+)$/)
            operator_for = match[1].downcase
            operator = OPERATOR_NAMES[match[2]] || match[2].downcase

            messages["FilterMenuOperators"][operator_for] ||= Hash.new
            messages["FilterMenuOperators"][operator_for][operator] = value

        elsif widget_name == "Grid"

            #column menu messages
            if COLUMN_MENU_OPTIONS[property]
                messages["ColumnMenu"][COLUMN_MENU_OPTIONS[property]] = value
            elsif #options that cannot be set through the prototype
                messages["GridDummy"][property] = value
            end

        elsif widget_name == "Scheduler"

            property = node["name"].match(/([^_]+_)(.+)$/)[2]

            if property.include? "_"

                #scheduler views.messages
                if property.start_with?("View_") | property.start_with?("Editor_")
                    parent_property, property = property.split("_")

                #scheduler recurrenceMessages
                elsif property.match(/(^Recurrence_)(?!Editor_)(.+)$/)
                    parent_property = "recurrenceMessages"
                    property = property.match(/(^Recurrence_)(?!Editor_)(.+)$/)[2]

                #scheduler recurrenceEditor messages
                elsif property.start_with?("Recurrence_Editor_")
                    widget_name = "RecurrenceEditor"
                    parent_property, property = property.gsub(/(^Recurrence_Editor_)/, "").split("_")

                end


                messages[widget_name][getPropertyName(parent_property)] ||= Hash.new
                messages[widget_name][getPropertyName(parent_property)][getPropertyName(property)] = value

            else
                messages[widget_name] ||= Hash.new
                messages[widget_name][getPropertyName(property)] = value
            end

        else

            messages[widget_name] ||= Hash.new
            messages[widget_name][getPropertyName(property)] = value

        end
    end

    messages

end

desc 'Generates .js localization files from MVC wrappers Resources/Messages.*.resx files'
task :l10n_res => FileList["wrappers/mvc/src/Kendo.Mvc/Resources/Messages.*.resx"].sub("wrappers/mvc/src/Kendo.Mvc/Resources/", "src/l10n/").ext("js")

rule /src\/l10n\/(.+)\.js/ => lambda { |target| target.sub( "src/l10n/", "wrappers/mvc/src/Kendo.Mvc/Resources/").ext("resx") } do |task|
    sh "mkdir -p src/l10n/"
    messages = extractMessages(task.source)

    File.open(task.name, "w") do |file|

        messages.each do |key, options|

            if key == "GridDummy"
                #todo
            elsif key == "FilterMenuOperators"
                file.write(
                    "\n\n/* Filter menu operator messages */\n\n" +
                    "if (kendo.ui.FilterMenu) {\n" +
                        "kendo.ui.FilterMenu.prototype.options." + LOCALIZATION_OPTION_NAMES[key] + " =\n" +
                        "$.extend(true, kendo.ui.FilterMenu.prototype.options." + LOCALIZATION_OPTION_NAMES[key] + "," +
                            JSON.pretty_generate(options) +
                        ");\n" +
                    "}"
                )
            else
                file.write(
                    "\n\n/* " + key + " messages */\n\n" +
                    "if (kendo.ui." + key + ") {\n" +
                        "kendo.ui." + key + ".prototype.options." + LOCALIZATION_OPTION_NAMES[key] + " =\n" +
                        "$.extend(true, kendo.ui." + key + ".prototype.options." + LOCALIZATION_OPTION_NAMES[key] + "," +
                            JSON.pretty_generate(options) +
                        ");\n" +
                    "}"
                )
            end

        end

    end
end

CLEAN.include("src/l10n")
