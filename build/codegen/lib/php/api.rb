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

        def slug
            slug = php_type.sub('\\Kendo\\', '').gsub('\\', '-').downcase

            "php-#{slug}"
        end

        def sample_option
            option = simple_options.find { |o| o.type[0] =~ /Number|String|Boolean/ && !o.name.end_with?('Template') }

            option = simple_options[0] unless option

            option = options[0] unless option

            option
        end

        def unique_options
            result = super

            if content?
                result.push option_class.new(
                    :owner => self,
                    :name => 'content'
                )

                result.push option_class.new(
                    :owner => self,
                    :name => 'endContent'
                )

                result.push option_class.new(
                    :owner => self,
                    :name => 'startContent'
                )
            end

            result
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
slug: <%= slug %>
tags: api, php
publish: true
---
})

COMPONENT_DESCRIPTION = ERB.new(%{
# <%= php_type %>

A PHP class representing Kendo [<%= name %>](<%= api_link %>).

<% if widget? %>
## Usage

To use <%= php_class %> in a PHP page instantiate a new instance, configure it via the available
configuration [methods](#methods) and output it by `echo`-ing the result of the `render` method.

### Using Kendo <%= php_class %>

    <?php
    // Create a new instance of <%= php_class %> and specify its id
    <%= variable %> = <%= value %>;

    // Configure it
    <%= variable %>-><%= sample_option.php_name %>(<%= sample_option.value %>)

    // Output it

    echo <%= variable %>->render();
    ?>
<% end %>
})

METHODS = ERB.new(%{
## Methods
<%= (unique_options + events).sort { |a, b| a.name <=> b.name }.map { |o| o.to_markdown_section(root) }.join %>
})
    class Component < CodeGen::PHP::Component
        include Options

        def api_link
            directory = 'web';

            directory = 'framework' if @full_name.start_with?('kendo.data.')
            directory = 'dataviz' if path.start_with?('kendo.dataviz')

            "/api/#{directory}/#{name.downcase}"
        end

        def value
            "new #{php_type}()" unless widget?

            "new #{php_type}('#{name.pascalize}')"
        end

        def to_markdown(root)
            markdown = METADATA.result(binding)

            markdown += COMPONENT_DESCRIPTION.result(binding)

            markdown += METHODS.result(binding)

            markdown
        end
    end

COMPOSITE_OPTION_SECTION = ERB.new(%{
### <%= php_name %>

<%= description %>

#### Returns
`<%= owner.php_type %>`

#### Parameters

##### $value `<%= php_types %>`

<% if simple %>
<%= simple.examples %>
<% end %>
#### Example - using [<%= php_type %>](<%= root %><%= path %>/<%= php_class %>)

    <%= owner.variable %> = <%= owner.value %>;
    <%= variable %> = <%= value %>;
    <%= sample_option.variable %> = <%= sample_option.value %>;
    <%= variable %>-><%= sample_option.php_name %>(<%= sample_option.variable %>);
    <%= owner.variable %>-><%= php_name %>(<%= variable %>);

#### Example - using array

    <%= owner.variable %> = <%= owner.value %>;
    <%= sample_option.variable %> = <%= sample_option.value %>;
    <%= owner.variable %>-><%= php_name %>(array('<%= sample_option.name %>' => <%= sample_option.variable %>));
})

COMPOSITE_OPTION_DESCRIPTION = ERB.new(%{
# <%= php_type %>

A PHP class representing the <%= name %> setting of <%= owner.php_class %>.

})
    class CompositeOption < CodeGen::PHP::CompositeOption
        include Options

        def to_markdown_section(root)
            COMPOSITE_OPTION_SECTION.result(binding)
        end

        def to_markdown(root)
            markdown = METADATA.result(binding)

            markdown += COMPOSITE_OPTION_DESCRIPTION.result(binding)

            markdown += METHODS.result(binding)

            markdown
        end

        def events
            []
        end


        def simple
            @owner.simple_options.find { |o| o.name == @name }
        end
    end

MANUALLY_DOCUMENTED_OPTIONS = {
'startContent' => ERB.new(%{
### startContent

Starts output bufferring. Any following markup will be set as the content of the <%= owner.php_class %>.

#### Example

    <?php
    <%= owner.variable %> = <%= owner.value %>;
    <%= owner.variable %>->startContent();
    ?>
    <strong>Content</strong>
    <?php
    <%= owner.variable %>->endContent(); // content is set to <strong>Content</strong>
    ?>

}),

'endContent' => ERB.new(%{
### endContent

Stops output bufferring and sets the preceding markup as the content of the <%= owner.php_class %>.

#### Example

    <?php
    <%= owner.variable %> = <%= owner.value %>;
    <%= owner.variable %>->startContent();
    ?>
    <strong>Content</strong>
    <?php
    <%= owner.variable %>->endContent(); // content is set to <strong>Content</strong>
    ?>
}),

'content' => ERB.new(%{
### content

Sets the HTML content of the <%= owner.php_class %>.

#### Returns

`<%= owner.php_class %>`

#### $value `string`

#### Example

    <%= owner.variable %> = <%= owner.value %>;
    <%= owner.variable %>->content('<strong>Content</strong>');

})
}

DATA_SOURCE_SECTION = ERB.new(%{
### dataSource

Sets the data source of the <%= name %>.

#### Returns
`<%= owner.php_type %>`

#### Parameters

##### $value `\\Kendo\\Data\\DataSource|array`

#### Example - using [\\Kendo\\Data\\DataSource](/api/wrappers/php/kendo/data/datasource)

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

#### Returns
`<%= owner.php_type %>`

#### Parameters

##### $value `\\Kendo\\Data\\HierarchicalDataSource|array`

#### Example - using [\\Kendo\\Data\\HierarchicalDataSource](/api/wrappers/php/kendo/data/hierarchicaldatasource)

    <%= owner.variable %> = <%= owner.value %>;
    $dataSource = new \\Kendo\\Data\\HierarchicalDataSource();
    <%= owner.variable %>-><%= php_name %>($dataSource);

#### Example - using array

    <%= owner.variable %> = <%= owner.value %>;
    $schema = new \\Kendo\\Data\\DataSourceSchema();
    <%= owner.variable %>-><%= php_name %>(array('schema' => $schema));
})

OPTION_SECTION = ERB.new(%{
### <%= php_name %>

<%= description %>


#### Returns
`<%= owner.php_type %>`

#### Parameters

##### $value `<%= php_types %>`

}, 0, '<%>')

OPTION_SECTION_EXAMPLES = ERB.new(%{
<% php_types.split('|').each do |type| %>

#### Example <% if includeType %> - using <%= type %><% end %>

    <%= owner.variable %> = <%= owner.value %>;
    <%= owner.variable %>-><%= php_name %>(<%= CodeGen::PHP::API.value(type) %>);
<% end %>
}, 0, '<%>')

    class Option < CodeGen::PHP::Option
        include Options

        def to_markdown_section(root)
            if name == 'dataSource'
                return HIERARCHICAL_DATA_SOURCE_SECTION.result(binding) if owner.name == 'TreeView'

                return DATA_SOURCE_SECTION.result(binding)
            end

            if MANUALLY_DOCUMENTED_OPTIONS[@name]
                markdown = MANUALLY_DOCUMENTED_OPTIONS[@name].result(binding)
            else
                markdown = OPTION_SECTION.result(binding)
                markdown += examples(php_types.include?('|'))
            end

            markdown
        end

        def examples(includeType = true)
            OPTION_SECTION_EXAMPLES.result(binding)
        end

        def value
            CodeGen::PHP::API.value(php_types.split('|')[0])
        end
    end

EVENT_SECTION = ERB.new(%{
### <%= php_name %>

<%= description %>


#### Returns
`<%= owner.php_type %>`

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

#### Example - using [\\Kendo\\JavaScriptFunction](/api/wrappers/php/kendo/javascriptfunction)

    <%= owner.variable %> = <%= owner.value %>;
    <%= owner.variable %>-><%= php_name %>(new \\Kendo\\JavaScriptFunction('function(e) { }'));
}, 0, '<%>')
    class Event < CodeGen::PHP::Event
        def to_markdown_section(root)
            EVENT_SECTION.result(binding)
        end
    end

ARRAY_SECTION = ERB.new(%{
### add<%= item.name.pascalize %>

Adds one or more <%= item.php_class %> to the <%= owner.php_class %>.

#### Returns
`<%= owner.php_type %>`

#### Parameters

##### $value[, $value2, ...] `<%= item.php_types %>`

#### Example - using <%= item.php_type %>

    <%= owner.variable %> = <%= owner.value %>;
    <%= item.variable %> = <%= item.value %>;
    <%= item.sample_option.variable %> = <%= item.sample_option.value %>;
    <%= item.variable %>-><%= item.sample_option.php_name %>(<%= item.sample_option.variable %>);
    <%= owner.variable %>->add<%= item.name.pascalize %>(<%= item.variable %>);

#### Example - using array

    <%= owner.variable %> = <%= owner.value %>;
    <%= item.sample_option.variable %> = <%= item.sample_option.value %>;
    <%= owner.variable %>->add<%= item.name.pascalize %>(array('<%= item.sample_option.name %>' => <%= item.sample_option.variable %>));

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

        def to_markdown_section(root)
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

            File.write(filename, component.to_markdown(@path.sub('docs', '')).dos)
        end

        def composite_options(options)
            options.each do |option|

                write_markdown(option) unless option.instance_of?(ArrayOption)

                composite_options(option.composite_options)

            end

        end
    end
end
