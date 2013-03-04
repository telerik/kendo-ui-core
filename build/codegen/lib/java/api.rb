module CodeGen::Java::API

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

        def simple_options
            super.find_all { |option| option.name != 'dataSource' }
        end
    end

    class Component < CodeGen::Java::Component
        include Options

        def to_markdown
            markdown = METADATA.result(binding)

            markdown += COMPONENT_DESCRIPTION.result(binding)

            markdown += CONFIGURATION.result(binding)

            markdown += COMPOSITE_OPTIONS.result(binding) if composite_options.any?

            markdown += EVENTS.result(binding) if events.any?

            markdown
        end
    end

METADATA = ERB.new(%{---
title: <%= tag_name %>
slug: jsp-<%= tag_name %>
tags: api, java
publish: true
---
})

COMPONENT_DESCRIPTION = ERB.new(%{
# \\<kendo:<%= tag_name %>\\>
A JSP tag representing Kendo <%= name %>.
})

CONFIGURATION = ERB.new(%{
## Configuration Attributes
<%= simple_options.map { |option| option.to_markdown_attribute }.join %>
})

EVENTS = ERB.new(%{
## Event Attributes
<%= events.map { |event| event.to_markdown_attribute }.join %>
## Event Tags
<%= events.map { |event| event.to_markdown }.join %>
})

    class Event < CodeGen::Java::Event
        include Options

        def to_markdown
            EVENT.result(binding)
        end

        def to_markdown_attribute
            EVENT_SECTION.result(binding)
        end
    end

EVENT = ERB.new(%{
### kendo:<%= tag_name %>

<%= description %>

#### Example
    <kendo:<%= owner.tag_name %>>
        <kendo:<%= tag_name%>>
            <script>
                function(e) {
                    // Code to handle the <%= name %> event.
                }
            </script>
        </kendo:<%= tag_name%>>
    </kendo:<%= owner.tag_name %>>
})

EVENT_SECTION = ERB.new(%{
### <%= name %> `String`

<%= description %>

#### Example
    <kendo:<%= owner.tag_name %> <%= name %>="handle_<%= name %>">
    </kendo:<%= owner.tag_name %>>
    <script>
        function handle_<%= name %>(e) {
            // Code to handle the <%= name %> event.
        }
    </script>
})

    class Option < CodeGen::Java::Option
        include Options

        def to_markdown_attribute
            OPTION_SECTION.result(binding)
        end
    end

OPTION_SECTION = ERB.new(%{
### <%= name %> `<%= java_type %>`
<% tag = owner.composite_options.find { |c| c.name == name } %>
<%= description %><% if tag %> Further configuration is available via [kendo:<%= tag.tag_name %>](#kendo-<%= tag.tag_name %>). <% end %>

#### Example
    <kendo:<%= owner.tag_name %> <%= name %>="<%= name %>">
    </kendo:<%= owner.tag_name %>>
})
    class CompositeOption < CodeGen::Java::CompositeOption
        include Options

        def to_markdown
            markdown = METADATA.result(binding)

            markdown += COMPOSITE_OPTION_DESCRIPTION.result(binding)

            markdown += CONFIGURATION.result(binding)

            markdown += COMPOSITE_OPTIONS.result(binding) if composite_options.any?

            markdown += EVENTS.result(binding) if events.any?

            markdown
        end

        def to_markdown_attribute
            COMPOSITE_OPTION_SECTION.result(binding)
        end
    end

COMPOSITE_OPTION_DESCRIPTION = ERB.new(%{
# \\<kendo:<%= tag_name %>\\>

<%= description %>

#### Example
    <kendo:<%= owner.tag_name %>>
        <kendo:<%= tag_name%>></kendo:<%= tag_name%>>
    </kendo:<%= owner.tag_name %>>
})

COMPOSITE_OPTIONS = ERB.new(%{
##  Configuration JSP Tags
<%= composite_options.map { |option| option.to_markdown_attribute }.join %>
})

COMPOSITE_OPTION_SECTION = ERB.new(%{
### kendo:<%= tag_name %>

<%= description %>

More documentation is available at [kendo:<%= tag_name %>](<%= namespace %>/<%= tag_name.downcase.sub(namespace + '-', '') %>).

#### Example

    <kendo:<%= owner.tag_name %>>
        <kendo:<%= tag_name%>></kendo:<%= tag_name%>>
    </kendo:<%= owner.tag_name %>>
})

    class ArrayOption < CompositeOption
        include CodeGen::Array

        def item_class
            ArrayItem
        end
    end

    class ArrayItem < CompositeOption
        include CodeGen::Java::ArrayItem
    end

    class Generator
        include Rake::DSL

        def initialize(path)
            @path = path
        end

        def component(component)
            component.delete_ignored

            tag(component, "#{@path}#{component.tag_name}.md")
        end

        def tag(tag, filename = nil)

            filename ||= "#{@path}#{tag.namespace}/#{tag.tag_name.downcase.sub(tag.namespace + '-', '')}.md"

            $stderr.puts "Updating #{filename}" if VERBOSE

            ensure_path(filename)

            File.write(filename, tag.to_markdown.dos)

            tag.composite_options.each { |option| tag(option) }
        end
    end
end
