require 'erb'

DEPENDENCIES_TEMPLATE = ERB.new(File.read(File.join(File.dirname(__FILE__), 'javascript_dependencies.md.erb')), 0, '%<>')


def add_dependencies(widget, dependency, dependencies)
    unless widget["dependencies"].include? dependency
        if dependencies[dependency]
            dependencies[dependency].each do |parent_dependency|
                add_dependencies(widget, parent_dependency, dependencies)
            end
        end
        widget["dependencies"] << dependency
    end
end

desc 'Generate js dependencies'
task :js_dependencies do
    dependencies = {}

    data = YAML.load(`node #{COMPILEJS} --kendo-config`)
    categories = data["categories"]

    categories.each do |name, category|
        category["components"] = []
    end

    data["components"].each do |component|
        dependencies[component["id"]] = component["depends"]
        unless component["hidden"] || component["advanced"]
            categories[component["category"]]["components"] << component
        end
    end

    categories.each do |name, category|
        category["components"].each do |component|
            component["dependencies"] = []
            component["features"] ||= []
            add_dependencies(component, component["id"], dependencies)
            component["features"].each do |feature|
                feature["dependencies"] = []
                feature["depends"].each do |dependency|
                    add_dependencies(feature, dependency, dependencies)
                end
            end
        end
    end

    puts DEPENDENCIES_TEMPLATE.result(binding)
end

