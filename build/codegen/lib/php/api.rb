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

        return "new \\Kendo\\JavaScriptFunction('function() { }')" if type == '\Kendo\JavaScriptFunction'

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

METHODS = ERB.new(%{
## Methods
<%= (unique_options + events).sort { |a, b| a.name <=> b.name }.map { |option| option.to_markdown_section }.join %>
})
    class Component < CodeGen::PHP::Component
        include Options

        def to_markdown
            markdown = METADATA.result(binding)

            markdown += COMPONENT_DESCRIPTION.result(binding)

            markdown += METHODS.result(binding)

            markdown
        end
    end

COMPOSITE_OPTION_SECTION = ERB.new(%{
### <%= php_name %>

#### Parameters

##### $value `<%= php_types %>`

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

COMPOSITE_OPTION_DESCRIPTION = ERB.new(%{
# <%= php_type %>

A PHP class representing the <%= name %> setting of <%= owner.php_class %>.

})
    class CompositeOption < CodeGen::PHP::CompositeOption
        include Options

        def to_markdown_section
            COMPOSITE_OPTION_SECTION.result(binding)
        end

        def to_markdown
            markdown = METADATA.result(binding)

            markdown += COMPOSITE_OPTION_DESCRIPTION.result(binding)

            markdown += METHODS.result(binding)

            markdown
        end

        def events
            []
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
### dataSource

Sets the data source of the <%= name %>.

#### Parameters

##### $value `\\Kendo\\Data\\DataSource|array`

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
### dataSource

Sets the data source of the <%= name %>.

#### Parameters

##### $value `\\Kendo\\Data\\HierarchicalDataSource|array`

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

EVENT_SECTION = ERB.new(%{
### <%= php_name %>

<%= description %>

#### Parameters

##### $value `string|\\Kendo\\JavaScriptFunction`

#### Example - using string which defines a JavaScript function

    <%= owner.variable %> = <%= owner.value %>;
    <%= owner.variable %>-><%= php_name %>('function(e) { }');

#### Example - using string which defines a JavaScript name
    <script>
        function on<%= name.pascalize %>(e) {
            // handle the <%= name %> event.
        }
    </script>
    <?php
    <%= owner.variable %> = <%= owner.value %>;
    <%= owner.variable %>-><%= php_name %>('on<%= name.pascalize %>');
    ?>

#### Example - using \\Kendo\\JavaScriptFunction

    <%= owner.variable %> = <%= owner.value %>;
    <%= owner.variable %>-><%= php_name %>(new \\Kendo\\JavaScriptFunction('function(e) { }'));
}, 0, '<%>')
    class Event < CodeGen::PHP::Event
        def to_markdown_section
            EVENT_SECTION.result(binding)
        end
    end

ARRAY_SECTION = ERB.new(%{
### add<%= item.name.pascalize %>

Adds one or more <%= item.php_class %> to the <%= owner.php_class %>.

#### Parameters

##### $value[, $value2, ...] `<%= item.php_types %>`

#### Example - using <%= item.php_type %>

    <%= owner.variable %> = <%= owner.value %>;
    <%= item.variable %> = <%= item.value %>;
    <%= item.first_option.variable %> = <%= item.first_option.value %>;
    <%= item.variable %>-><%= item.first_option.php_name %>(<%= item.first_option.variable %>);
    <%= owner.variable %>->add<%= item.name.pascalize %>(<%= item.variable %>);

#### Example - using array

    <%= owner.variable %> = <%= owner.value %>;
    <%= item.first_option.variable %> = <%= item.first_option.value %>;
    <%= owner.variable %>->add<%= item.name.pascalize %>(array('<%= item.first_option.name %>' => <%= item.first_option.variable %>));

#### Example - adding more than one <%= item.php_class %>

    <%= owner.variable %> = <%= owner.value %>;
    $first  = <%= item.value %>;
    $second = <%= item.value %>;
    <%= owner.variable %>->add<%= item.name.pascalize %>($first, $second);
})

    class ArrayOption < CompositeOption
        include CodeGen::Array

        def item_class
            ArrayItem
        end

        def to_markdown_section
            ARRAY_SECTION.result(binding)
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

            composite_options(component.composite_options)
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
