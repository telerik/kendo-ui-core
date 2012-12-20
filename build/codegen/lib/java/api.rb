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

<<<<<<< HEAD
        def simple_options
            super.find_all { |option| option.name != 'dataSource' }
        end
=======
>>>>>>> JSP API generation.
    end

    class Component < CodeGen::Java::Component
        include Options

        def to_markdown
            markdown = METADATA.result(binding)

            markdown += COMPONENT_DESCRIPTION.result(binding)

            markdown += CONFIGURATION.result(binding)

<<<<<<< HEAD
            markdown += COMPOSITE_OPTIONS.result(binding) if composite_options.any?

            markdown += EVENTS.result(binding) if events.any?

=======
>>>>>>> JSP API generation.
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
<<<<<<< HEAD
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
=======
<% (options + events).each do |option| %><% if option.name != 'dataSource' %>
<%= option.to_markdown_section %>
<% end %><% end %>
})
    class Event < CodeGen::Java::Event
        include Options

        def to_markdown_section
        end
    end

>>>>>>> JSP API generation.

    class Option < CodeGen::Java::Option
        include Options

<<<<<<< HEAD
        def to_markdown_attribute
            OPTION_SECTION.result(binding)
        end
    end

OPTION_SECTION = ERB.new(%{
=======
        def to_markdown_section
            OPTION.result(binding)
        end
    end

OPTION = ERB.new(%{
>>>>>>> JSP API generation.
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
<<<<<<< HEAD
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

=======
        end
    end

>>>>>>> JSP API generation.
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
        def initialize(path)
            @path = path
        end

        def component(component)
<<<<<<< HEAD
            component.delete_ignored

            tag(component, "#{@path}#{component.tag_name}.md")
        end

        def tag(tag, filename = nil)

            filename ||= "#{@path}#{tag.namespace}/#{tag.tag_name.downcase.sub(tag.namespace + '-', '')}.md"

            $stderr.puts "Updating #{filename}" if VERBOSE

            File.write(filename, tag.to_markdown.dos)

            tag.composite_options.each { |option| tag(option) }
=======
            filename = "#{@path}#{component.tag_name.sub(component.namespace + '-', '')}.md"

            $stderr.puts "Updating #{filename}" if VERBOSE

            component.delete_ignored

            File.write(filename, component.to_markdown.dos)
        end

        def tag(component)

>>>>>>> JSP API generation.
        end
    end
end
