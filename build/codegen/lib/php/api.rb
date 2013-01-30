module CodeGen::PHP::API
    module Options
        def component_class
            Component
        end

        def composite_option_class
            CompositeOption
        end

        def option_class
            Option
        end

        def event_class
            Event
        end

        def array_option_class
            ArrayOption
        end

        def variable
            "$#{@name.camelize}"
        end

        def value
            "new #{php_type}()"
        end
    end

    def self.value(type)
        return "'value'" if type == 'string'

        return '1' if type == 'float'

        return 'true' if type == 'boolean'

        "new #{type}()"
    end

METADATA = ERB.new(%{---
title: <%= php_class %>
slug: php-<%= php_class %>
tags: api, php
publish: true
---
})

COMPONENT_DESCRIPTION = ERB.new(%{
# <%= php_type %>

A PHP class representing Kendo <%= name %>.

})

CONFIGURATION = ERB.new(%{
## Configuration
<%= unique_options.map { |option| option.to_markdown_section }.join %>
})
    class Component < CodeGen::PHP::Component
        include Options

        def to_markdown
            markdown = METADATA.result(binding)

            markdown += COMPONENT_DESCRIPTION.result(binding)

            markdown += CONFIGURATION.result(binding)

            markdown
        end
    end

COMPOSITE_OPTION_SECTION = ERB.new(%{
### <%= php_name %> `<%= php_types %>`

<%= description %>

<% if simple %>
<%= simple.examples %>
<% end %>
#### Example - using <%= php_type %>

    <%= owner.variable %> = <%= owner.value %>;
    <%= variable %> = <%= value %>;
    <%= first_option.variable %> = <%= first_option.value %>;
    <%= variable %>-><%= first_option.php_name %>(<%= first_option.variable %>);
    <%= owner.variable %>-><%= php_name %>(<%= variable %>);

#### Example - using array

    <%= owner.variable %> = <%= owner.value %>;
    <%= first_option.variable %> = <%= first_option.value %>;
    <%= owner.variable %>-><%= php_name %>(array('<%= first_option.name %>' => <%= first_option.variable %>));
})
    class CompositeOption < CodeGen::PHP::CompositeOption
        include Options

        def to_markdown_section
            COMPOSITE_OPTION_SECTION.result(binding)
        end

        def first_option
            option = simple_options[0]

            option = @options[0] unless option

            option
        end

        def simple
            @owner.simple_options.find { |o| o.name == @name }
        end
    end

DATA_SOURCE_SECTION = ERB.new(%{
### dataSource `\\Kendo\\Data\\DataSource|array`
Sets the data source of the <%= name %>.

#### Example - using \\Kendo\\Data\\DataSource

    <%= owner.variable %> = <%= owner.value %>;
    $dataSource = new \\Kendo\\Data\\DataSource();
    <%= owner.variable %>-><%= php_name %>($dataSource);

#### Example - using array

    <%= owner.variable %> = <%= owner.value %>;
    $schema = new \\Kendo\\Data\\DataSourceSchema();
    <%= owner.variable %>-><%= php_name %>(array('schema' => $schema));
})

HIERARCHICAL_DATA_SOURCE_SECTION = ERB.new(%{
### dataSource `\\Kendo\\Data\\HierarchicalDataSource|array`
Sets the data source of the <%= name %>.

#### Example - using \\Kendo\\Data\\HierarchicalDataSource

    <%= owner.variable %> = <%= owner.value %>;
    $dataSource = new \\Kendo\\Data\\HierarchicalDataSource();
    <%= owner.variable %>-><%= php_name %>($dataSource);

#### Example - using array

    <%= owner.variable %> = <%= owner.value %>;
    $schema = new \\Kendo\\Data\\DataSourceSchema();
    <%= owner.variable %>-><%= php_name %>(array('schema' => $schema));
})

OPTION_SECTION = ERB.new(%{
### <%= php_name %> `<%= php_types %>`

<%= description %>

}, 0, '<%>')

OPTION_SECTION_EXAMPLES = ERB.new(%{
<% php_types.split('|').each do |type| %>

#### Example - using <%= type %>

    <%= owner.variable %> = <%= owner.value %>;
    <%= owner.variable %>-><%= php_name %>(<%= CodeGen::PHP::API.value(type) %>);
<% end %>
}, 0, '<%>')

    class Option < CodeGen::PHP::Option
        include Options

        def to_markdown_section
            if name == 'dataSource'
                return HIERARCHICAL_DATA_SOURCE_SECTION.result(binding) if owner.name == 'TreeView'

                return DATA_SOURCE_SECTION.result(binding)
            end

            markdown = OPTION_SECTION.result(binding)

            markdown += examples

            markdown
        end

        def examples
            OPTION_SECTION_EXAMPLES.result(binding)
        end

        def value
            CodeGen::PHP::API.value(php_types.split('|')[0])
        end
    end

    class Event < CodeGen::PHP::Event
    end

    class ArrayOption < CompositeOption
        include CodeGen::Array

        def item_class
            ArrayItem
        end
    end

    class ArrayItem < CompositeOption
        include CodeGen::PHP::ArrayItem
    end

    class Generator
        include Rake::DSL

        def initialize(path)
            @path = path
        end

        def component(component)
            write_markdown(component)

#            composite_options(component.composite_options)
        end

        def write_markdown(component)
            filename = "#{@path}#{component.path}/#{component.php_class}.md"

            $stderr.puts("Updating #{filename}") if VERBOSE

            ensure_path(filename)

            File.write(filename, component.to_markdown().dos)
        end

        def composite_options(options)
            options.each do |option|

                write_markdown(option) unless option.instance_of?(ArrayOption)

                composite_options(option.composite_options)

            end

        end
    end
end
