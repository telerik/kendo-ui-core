require 'kramdown'
require 'erb'

TLD = 'wrappers/java/kendo-taglib/src/main/resources/META-INF/taglib.tld'

MARKDOWN = FileList['docs/api/{web,dataviz}/*.md'].exclude('**/ui.md').include('docs/api/framework/datasource.md')

IGNORED = {
    'chart' => ['axisDefaults'],
    'window' => ['content.template']
}

MD_METADATA_TEMPLATE = ERB.new(%{---
title: <%= tag_name %>
slug: <%= tag_name %>
tags: api, java
publish: true
---
})

MD_OPTIONS_TEMPLATE = ERB.new(%{
## Configuration Attributes
<% options.each do |option| %><% if option.name != 'dataSource' %>

### <%= option.name %> `<%= option.java_type.sub('java.lang.', '') %>`

<%= option.description %>

#### Example
    <kendo:<%= tag_name %> <%= option.name %>="<%= option.name %>">
    </kendo:<%= tag_name %>>
    <% end %><% end %>
})

MD_EVENTS_TEMPLATE = ERB.new(%{
## Event Attributes
<% events.each do |event| %>
### <%= event.name %> `String`

<%= event.description %>

#### Example
    <kendo:<%= tag_name %> <%= event.name %>="handle_<%= event.name %>">
    </kendo:<%= tag_name %>>
    <script>
        function handle_<%= event.name %>(e) {
            // Code to handle the <%= event.name %> event.
        }
    </script>
<% end %>

## Event Tags
<% children.each do |child| %><% if child.instance_of?(NestedTagEvent) %>
### <kendo:<%= child.tag_name %>>

<%= child.description %>

#### Example
    <kendo:<%= tag_name %>>
        <kendo:<%= child.tag_name%>>
            <script>
                function(e) {
                    // Code to handle the <%= child.name %> event.
                }
            </script>
        </kendo:<%= child.tag_name%>>
    </kendo:<%= tag_name %>>
<% end %> <% end %>
})

MD_DESCRIPTION_TEMPLATE = ERB.new(%{
# <kendo:<%= tag_name %>>
A JSP tag representing Kendo <%= name %>.
})

MD_CHILDREN_TEMPLATE = ERB.new(%{
## Child JSP Tags
<% children.each do |child| %><% if !child.instance_of?(NestedTagEvent) %>
### [<kendo:<%= child.tag_name %>>](<%= child.markdown_filename.sub('docs', '').sub('.md', '')%>)

<%= child.description %>
<% end %> <% end %>
})

XML_EVENT_ATTRIBUTE_TEMPLATE = ERB.new(%{
        <attribute>
            <description><%= description %></description>
            <name><%= name %></name>
            <rtexprvalue>true</rtexprvalue>
        </attribute>})

XML_OPTION_TEMPLATE = ERB.new(%{
<% if (name != '') %>
        <attribute>
            <description><%= description %></description>
            <name><%= name %></name>
            <rtexprvalue>true</rtexprvalue>
            <type><%= java_type %></type>
        </attribute>
<% end %>
}, 0, '<>')

XML_WIDGET_TAG_TEMPLATE = ERB.new(%{
    <tag>
        <description><%= name %></description>
        <name><%= name.camelize %></name>
        <tag-class>com.kendoui.taglib.<%= java_type %></tag-class>
        <body-content>JSP</body-content>
<% if name != 'DataSource' %>
        <attribute>
            <description>The mandatory and unique name of the widget. Used as the &quot;id&quot; attribute of the widget HTML element.</description>
            <name>name</name>
            <required>true</required>
            <rtexprvalue>true</rtexprvalue>
            <type>java.lang.String</type>
        </attribute>
<% end %>
<%= (options + events).map {|o| o.to_xml }.join %>
    </tag>
        })

XML_EVENT_TAG_TEMPLATE = ERB.new(%{
    <tag>
        <description>Subscribes to the <%= name.camelize %> event of <%= parent.name %>.</description>
        <name><%= tag_name %></name>
        <tag-class>com.kendoui.taglib.<%= namespace %>.<%= java_type %></tag-class>
        <body-content>JSP</body-content>
    </tag>
})

XML_NESTED_TAG_TEMPLATE = ERB.new(%{
    <tag>
        <description><%= description %></description>
        <name><%= tag_name %></name>
        <tag-class>com.kendoui.taglib.<%= namespace %>.<%= java_type %></tag-class>
        <body-content><%= body_content %></body-content>
<%= (options + events).map {|o| o.to_xml }.join %>
    </tag>
})

JAVA_METHODS = %{
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag
//<< doEndTag

        return super.doEndTag();
    }

    @Override
    public void initialize() {
//>> initialize
//<< initialize

        super.initialize();
    }

    @Override
    public void destroy() {
//>> destroy
//<< destroy

        super.destroy();
    }

//>> Attributes
//<< Attributes
}

JAVA_ITEMS_INTERFACE_TEMPLATE = ERB.new(%{
package com.kendoui.taglib.<%= namespace %>;

public interface Items {
    void setItems(ItemsTag items);
}
})

JAVA_WIDGET_TEMPLATE = ERB.new(%{
package com.kendoui.taglib;

<% if children.any? %>
import com.kendoui.taglib.<%= namespace %>.*;
<% end %>
<% if events.any? %>
import com.kendoui.taglib.json.Function;
<% end %>

import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class <%= java_type %> extends WidgetTag /* interfaces */ /* interfaces */ {

    public <%= java_type %>() {
        super("<%= name %>");
    }
    #{JAVA_METHODS}
}
})

JAVA_NESTED_TAG_TEMPLATE = ERB.new(%{
package com.kendoui.taglib.<%= namespace %>;

<% if is_item? %>
import com.kendoui.taglib.BaseItemTag;
<% else %>
import com.kendoui.taglib.BaseTag;
<% end %>

<% if parent.namespace == parent.name.downcase %>
import com.kendoui.taglib.<%= parent.java_type %>;
<% end %>

<% if events.any? %>
import com.kendoui.taglib.json.Function;
<% end %>

import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class <%= java_type %> extends <% if is_item? %> BaseItemTag <% else %> BaseTag <% end %> /* interfaces */ /* interfaces */ {
    #{JAVA_METHODS}
}
})

JAVA_EVENT_NESTED_TAG_TEMPLATE = ERB.new(%{
package com.kendoui.taglib.<%= namespace %>;

import com.kendoui.taglib.FunctionTag;
<% if parent.namespace == parent.name.downcase %>
import com.kendoui.taglib.<%= parent.java_type %>;
<% end %>

import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class <%= java_type %> extends FunctionTag /* interfaces */ /* interfaces */ {
    #{JAVA_METHODS}
}
})

JAVA_NESTED_TAG_ARRAY_TEMPLATE = ERB.new(%{
package com.kendoui.taglib.<%= namespace %>;

<% if is_item_container? %>
import com.kendoui.taglib.ContentTag;
<% else %>
import com.kendoui.taglib.BaseTag;
<% end %>

<% if parent.namespace == parent.name.downcase && !is_item_container?%>
import com.kendoui.taglib.<%= parent.java_type %>;
<% end %>

import java.util.ArrayList;
import java.util.Map;
import java.util.List;

import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class <%= java_type %> extends <% if is_item_container? %>ContentTag<% else %>BaseTag<% end %> /* interfaces */ /* interfaces */ {
    #{JAVA_METHODS}
}
})

JS_TO_JAVA_TYPES = {
    'Number' => 'float',
    'number' => 'float',
    'String' => 'java.lang.String',
    'string' => 'java.lang.String',
    'Boolean' => 'boolean',
    'Object' => 'Object',
    'Function' => 'String',
    'Date' => 'java.util.Date'
}

JAVA_DATASOURCE_SETTER = %{
    @Override
    public void setDataSource(DataSourceTag dataSource) {
        setProperty("dataSource", dataSource);
    }
}

JAVA_EVENT_GETTER_TEMPLATE = ERB.new(%{
    public String get<%= name.sub(/^./) { |c| c.capitalize } %>() {
        Function property = ((Function)getProperty("<%= name %>"));
        if (property != null) {
            return property.getBody();
        }
        return null;
    }
})

JAVA_OPTION_GETTER_TEMPLATE = ERB.new(%{
    public <%= java_type.sub('java.lang.', '') %> get<%= name.sub(/^./) { |c| c.capitalize } %>() {
        return (<%= java_type.sub('java.lang.', '') %>)getProperty("<%= name %>");
    }
})

JAVA_EVENT_SETTER_TEMPLATE = ERB.new(%{
    public void set<%= name.sub(/^./) { |c| c.capitalize } %>(String value) {
        setProperty("<%= name %>", new Function(value));
    }
})

JAVA_OPTION_SETTER_TEMPLATE = ERB.new(%{
    public void set<%= name.sub(/^./) { |c| c.capitalize } %>(<%= java_type.sub('java.lang.', '') %> value) {
        setProperty("<%= name %>", value);
    }
})

JAVA_NESTED_TAG_SETTER_TEMPLATE = ERB.new(%{
    public void set<%= child.name %>(<%= child.java_type %> value) {
        setProperty("<%= child.name.downcase %>", value);
    }
})

JAVA_NESTED_EVENT_SETTER_TEMPLATE = ERB.new(%{
    public void set<%= child.name %>(<%= child.java_type %> value) {
        setEvent("<%= child.name.camelize %>", value.getBody());
    }
})

JAVA_ARRAY_SETTER_TEMPLATE = ERB.new(%{
    public void set<%= child.name %>(<%= child.java_type %> value) {
<% if has_items? %>
        <%= child.name.downcase %> = value.<%= child.name.downcase %>();
<% else %>
        setProperty("<%= child.name.downcase %>", value.<%= child.name.downcase %>());
<% end %>
    }
})

JAVA_PARENT_SETTER_TEMPLATE = ERB.new(%{
<% if name == 'Items' %>
        Items parent = (Items)findParentWithClass(Items.class);
<% else %>
        <%= parent.java_type %> parent = (<%= parent.java_type %>)findParentWithClass(<%= parent.java_type %>.class);
<% end %>

        parent.set<%= name %>(this);
})

JAVA_ARRAY_INIT_TEMPLATE = ERB.new(%{
        <%= name.camelize %> = new ArrayList<Map<String, Object>>();
})

JAVA_ARRAY_DESTROY_TEMPLATE = ERB.new(%{
        <%= name.camelize %> = null;
})

JAVA_ARRAY_DECLARATION_TEMPLATE = ERB.new(%{
    private List<Map<String, Object>> <%= name.camelize %>;

    public List<Map<String, Object>> <%= name.camelize %>() {
        return <%= name.camelize %>;
    }
})

JAVA_ARRAY_PARENT_SETTER_TEMPLATE = ERB.new(%{
        <%= parent.java_type %> parent = (<%= parent.java_type %>)findParentWithClass(<%= parent.java_type %>.class);

        parent.set<%= name %>(this);
})

JAVA_ARRAY_ADD_TO_PARENT_TEMPLATE = ERB.new(%{
        <%= parent.java_type %> parent = (<%= parent.java_type %>)findParentWithClass(<%= parent.java_type %>.class);

        parent.add<%= name %>(this);
})

JAVA_ARRAY_ADD_CHILD_TEMPLATE = ERB.new(%{
    public void add<%= child.name %>(<%= child.java_type %> value) {
        <%= name.camelize %>.add(value.properties());
    }
})

JAVA_TAG_NAME_TEMPLATE = ERB.new(%{
    public static String tagName() {
        return "<%= tag_name %>";
    }
})

class String
    def camelize
        self.sub(/^./) { |c| c.downcase }
    end

    def pascalize
        self.sub(/^./) { |c| c.upcase }
    end

    def strip_namespace
        self.sub(/kendo.*ui\./, '').sub('kendo.data.', '')
    end

    def singular
        return self + 'Item' if end_with?('ies') || !end_with?('s')

        self.sub(/s$/, '')
    end
end

class Event
    attr_reader :name, :description

    def initialize(options)
        @name = options[:name].strip
        @description = options[:description].strip
    end

    def to_xml
        XML_EVENT_ATTRIBUTE_TEMPLATE.result(binding)
    end

    def to_java
        $stderr.puts("\t|- #{@name} (event)") if VERBOSE

        [JAVA_EVENT_GETTER_TEMPLATE.result(binding), JAVA_EVENT_SETTER_TEMPLATE.result(binding)].join
    end
end

class Option
    attr_reader :name, :type, :java_type, :description, :parent

    def initialize(options)
        @name = options[:name].strip
        @parent = options[:parent]
        @type = options[:type]

        if @type == 'Array'
            @java_type = 'java.lang.Object'
        else
            @java_type = JS_TO_JAVA_TYPES[@type]
        end
        @description = options[:description].strip
    end

    def required?
        @java_type
    end

    def to_xml
        return '' unless required?

        XML_OPTION_TEMPLATE.result(binding)
    end

    def to_java
        $stderr.puts("\t|- #{@name} (#{@java_type})") if VERBOSE

        return JAVA_DATASOURCE_SETTER if @name == 'dataSource'

        return '' unless required?

        [JAVA_OPTION_GETTER_TEMPLATE.result(binding), JAVA_OPTION_SETTER_TEMPLATE.result(binding)].join
    end
end

class Tag
    include Rake::DSL

    attr_reader :options, :name, :events, :children

    def initialize(options)
        @name = options[:name].strip_namespace
        @options = []
        @events = []
        @children = []
    end

    def java_type
        @name + "Tag"
    end

    def namespace
        @name.downcase
    end

    def path
        java_type
    end

    def tag_name
        return @name.camelize
    end

    def xml_template
        XML_WIDGET_TAG_TEMPLATE
    end

    def has_item_hierarchy?
        @name == 'Item' && namespace =~/panelbar|menu|treeview/
    end

    def has_item_content?
        has_items? && @name == 'Item'
    end

    def is_item?
        @name == 'Item' && namespace =~ /panelbar|menu|treeview|tabstrip/
    end

    def has_items?
        @name =~ /panelbar|menu|treeview|tabstrip/i || has_item_hierarchy?
    end

    def to_xml
        xml_template.result(binding)
    end

    def child_setters
        children = @children.map do |child|
            child.setter_template.result(binding)
        end.join
    end

    def setter_template
        JAVA_NESTED_TAG_SETTER_TEMPLATE
    end

    def java_attributes
        JAVA_TAG_NAME_TEMPLATE.result(binding) + child_setters + (@options + @events).map {|attr| attr.to_java }.join
    end

    def template
        JAVA_WIDGET_TEMPLATE
    end

    def java_filename
        "wrappers/java/kendo-taglib/src/main/java/com/kendoui/taglib/#{path}.java"
    end

    def markdown_filename
        "docs/api/wrappers/jsp/#{tag_name}.md"
    end

    def java_source_code
        if File.exists?(java_filename)
            File.read(java_filename)
        else
            template.result(binding)
        end
    end

    def add_implements_interfaces(code, interfaces)
        implements = 'implements ' + interfaces.join(", ") if interfaces.any?

        code.sub /\/\* interfaces \*\/(.|\n)*\/\* interfaces \*\//,
                 "/* interfaces */#{implements}/* interfaces */"
    end

    def patch_java_source_code(code)
        $stderr.puts("\t#{name}") if VERBOSE

        code.sub /\/\/>> Attributes(.|\n)*\/\/<< Attributes/,
                 "//>> Attributes\n#{java_attributes}\n//<< Attributes"
    end

    def sync_java
        java = java_source_code

        $stderr.puts("Updating #{java_filename}") if VERBOSE

        interfaces = []

        if @options.any? { |o| o.name == 'dataSource' }
            interfaces.push('DataBoundWidget')
        end

        if has_items?
            interfaces.push('Items')

            interface_filename =  "wrappers/java/kendo-taglib/src/main/java/com/kendoui/taglib/#{namespace}/Items.java"

            ensure_path(interface_filename)

            File.open(interface_filename, 'w') do |file|
                file.write(JAVA_ITEMS_INTERFACE_TEMPLATE.result(binding))
            end
        end

        java = add_implements_interfaces(java, interfaces)
        java = patch_java_source_code(java)

        ensure_path(java_filename)

        File.open(java_filename, 'w') do |file|
            file.write(java.gsub(/\r?\n/, "\r\n"))
        end

        @children.each { |child| child.sync_java }
    end

    def sync_markdown
        $stderr.puts("Updating #{markdown_filename}") if VERBOSE

        ensure_path(markdown_filename)

        File.open(markdown_filename, 'w') do |file|
            file.write(to_markdown)
        end

        @children.each { |child| child.sync_markdown unless child.instance_of?(NestedTagEvent) }
    end

    def to_markdown
        MD_METADATA_TEMPLATE.result(binding) +
        MD_DESCRIPTION_TEMPLATE.result(binding) +
        MD_OPTIONS_TEMPLATE.result(binding) +
        MD_EVENTS_TEMPLATE.result(binding) +
        MD_CHILDREN_TEMPLATE.result(binding)
    end

    def namespace
        @name.downcase
    end

    def promote_options_to_tags
        @options.dup.each do |option|
            prefix = option.name + '.'

            child_options = @options.find_all { |o| o.name.start_with?(prefix) }
            child_events = @events.find_all { |o| o.name.start_with?(prefix) }

            if (child_options.any? || child_events.any?) && option.type =~ /Array|Object/i
                @options.delete_if{|o| o.name == option.name && o.type == option.type }

                child_options.each do |o|
                    @options.delete_if { |opt| opt.name == o.name }
                    o.name.sub!(prefix, '')
                end

                child_events.each do |o|
                    @events.delete_if { |opt| opt.name == o.name }
                    o.name.sub!(prefix, '')
                end

                if option.type == 'Array'
                    child =  NestedTagArray.new :name => option.name.sub(prefix, ''),
                              :parent => self,
                              :description => option.description,
                              :options => child_options,
                              :events => child_events
                else
                    child =  NestedTag.new :name => option.name.sub(prefix, ''),
                              :parent => self,
                              :description => option.description,
                              :options => child_options,
                              :events => child_events
                end

                @children.push(child)

                child.promote_options_to_tags
            end
        end

        @events.each do |event|
            child = NestedTagEvent.new :name => event.name,
                                  :parent => self,
                                  :description => event.description

            @children.push(child);
        end
    end

    def all_children
        @children + children.map { |child| child.all_children }.flatten
    end

    def self.parse(filename)

        tree = Kramdown::Parser::Markdown.parse(File.read(filename))

        root = tree[0]

        header = root.children.find { |e| e.type == :header && e.options[:level] == 1 }

        tag = Tag.new :name => header.options[:raw_text]

        start_element_index = root.children.find_index { |e| e.options[:raw_text] == 'Configuration' }

        end_element_index = root.children.find_index { |e| e.options[:raw_text] == 'Methods' }

        configuration = root.children.slice(start_element_index..end_element_index)

        find_child_with_type = lambda do |element, type|
            element.children.find { |e| e.type == type }
        end

        find_element_with_type = lambda do |elements, reference_index, type|
            elements.slice(reference_index, elements.length)
                         .find { |e| e.type == type }
        end
        configuration.each_with_index do |e, index|
            if (e.type == :header && e.options[:level] == 3)
                name = find_child_with_type.call(e, :text).value.strip

                type = find_child_with_type.call(e, :codespan)

                next unless type

                name.sub!(/\s*type\s*[=:][^\.]*\.?/, '') # skip exotic documentation like series.type="area".tooltip

                next if IGNORED[tag.name.downcase] && IGNORED[tag.name.downcase].include?(name)

                type = type.value.strip

                paragraph  = find_element_with_type.call(configuration, index, :p)

                description = find_child_with_type.call(paragraph, :text)

                types = type.split('|').map { |t| t.strip.strip_namespace }

                if types.include?('Function') && types.size == 1

                    event = Event.new :name => name,
                                      :description => description.value.strip

                    tag.events.push(event)

                    next
                end

                types.each do |type|

                    option = Option.new :name => name,
                        :parent => tag,
                        :type => type,
                        :description => description.value.strip

                    tag.options.push(option)
                end

            end
        end

        if tag.has_items?
            tag.options.push(Option.new :name => 'items',
                                        :type => 'Array',
                                        :description => "Contains items of #{tag.name}")

            tag.options.push(Option.new :name => 'items.text',
                                        :type => 'String',
                                        :description => "Specifies the text displayed by the item")

            tag.options.push(Option.new :name => 'items.spriteCssClass',
                                        :type => 'String',
                                        :description => "Specifies the class name for the sprite image displayed by the item")
        end

        start_element_index = root.children.find_index { |e| e.options[:raw_text] == 'Events' }

        if start_element_index != nil
            events = root.children.slice(start_element_index, root.children.length)

            events.each_with_index do |e, index|
                if (e.type == :header && e.options[:level] == 3)
                    name = find_child_with_type.call(e, :text).value

                    paragraph  = find_element_with_type.call(events, index, :p)

                    description = find_child_with_type.call(paragraph, :text)

                    event = Event.new :name => name,
                                      :description => description.value.strip

                    tag.events.push(event)

                end
            end
        end

        tag.promote_options_to_tags

        tag.remove_duplicate_options

        tag
    end

    def remove_duplicate_options
        @options.dup.each do |option|
            options_with_this_name = @options.find_all {|o| o.name == option.name && o.type != option.type }

            if options_with_this_name.size > 1
                options_with_this_name.each { |o| @options.delete(o) }

                @options.push(Option.new :name => option.name,
                              :description => option.description,
                              :type => 'Object')
            end
        end

        @options.uniq! { |option| option.name }

        @children.each { |child| child.remove_duplicate_options }
    end
end

class NestedTag < Tag
    attr_reader :description
    attr_accessor :parent

    def namespace
        @parent.namespace
    end

    def java_type
        return super if parent.name.downcase == namespace || @name == 'Item' || @name == 'Items' || (@name == parent.name.singular && !(name =~ /aggregate/i))

        return parent.name + @name + 'Tag'
    end

    def markdown_filename
        filename = tag_name.downcase.sub(namespace + '-', '')
        "docs/api/wrappers/jsp/#{namespace}/#{filename}.md"
    end

    def tag_name
        return "#{@parent.tag_name}-#{@name.camelize}"
    end

    def path
        namespace + "/" + java_type
    end

    def parent_setter_template
        JAVA_PARENT_SETTER_TEMPLATE
    end

    def patch_java_source_code(code)
        code = super(code)

        parent_setter = parent_setter_template.result(binding)

        code.sub /\/\/>> doEndTag(.|\n)*\/\/<< doEndTag/,
                 "//>> doEndTag\n#{parent_setter}\n//<< doEndTag"
    end

    def template
        JAVA_NESTED_TAG_TEMPLATE
    end

    def xml_template
        XML_NESTED_TAG_TEMPLATE
    end

    def body_content
        return 'JSP' if has_item_content? || @children.any? || @name.downcase == 'schema'

        'empty'
    end

    def initialize(options)
        super
        @parent = options[:parent]
        @name = options[:name].pascalize
        @options = options[:options] if options[:options]
        @events = options[:events] if options[:events]
        @description = options[:description]
    end
end

class NestedTagEvent < NestedTag
    def template
        JAVA_EVENT_NESTED_TAG_TEMPLATE
    end

    def java_type
        @name + 'FunctionTag'
    end

    def xml_template
        XML_EVENT_TAG_TEMPLATE
    end

    def setter_template
        JAVA_NESTED_EVENT_SETTER_TEMPLATE
    end
end

class NestedTagArray < NestedTag
    attr_reader :child

    def promote_options_to_tags
        super

        @child = NestedTagArrayItem.new :name => @name.singular,
              :parent => self,
              :options => @options,
              :description => @description,
              :events => @events,
              :children => @children

        @children = [@child]
        @options = []
        @events = []
    end

    def is_item_container?
        return @child.is_item?
    end

    def template
        JAVA_NESTED_TAG_ARRAY_TEMPLATE
    end

    def setter_template
        JAVA_ARRAY_SETTER_TEMPLATE
    end

    def patch_java_source_code(code)
        code = super(code)

        initialize = JAVA_ARRAY_INIT_TEMPLATE.result(binding)

        code.sub! /\/\/>> initialize(.|\n)*\/\/<< initialize/,
                 "//>> initialize\n#{initialize}\n//<< initialize"

        destroy = JAVA_ARRAY_DESTROY_TEMPLATE.result(binding)

        code.sub! /\/\/>> destroy(.|\n)*\/\/<< destroy/,
                 "//>> destroy\n#{destroy}\n//<< destroy"
        code
    end

    def java_attributes
        JAVA_ARRAY_DECLARATION_TEMPLATE.result(binding) + super
    end

    def child_setters
        JAVA_ARRAY_ADD_CHILD_TEMPLATE.result(binding)
    end
end

class NestedTagArrayItem < NestedTag

    def initialize(options)
        super

        @children = options[:children]

        @children.each { |child| child.parent = self }
    end

    def tag_name
        return @parent.tag_name.sub(@parent.name.camelize, @name.camelize)
    end

    def parent_setter_template
        JAVA_ARRAY_ADD_TO_PARENT_TEMPLATE
    end

    def java_attributes
        return super if !has_item_hierarchy?

        child = NestedTagArray.new :name => @parent.name,
                            :description => @parent.description,
                            :parent => self


        JAVA_ARRAY_SETTER_TEMPLATE.result(binding) + super
    end
end

def generate
    tags = MARKDOWN.map{ |md| Tag.parse(md) }.sort{ |a, b| a.name <=> b.name }

    tld = File.read(TLD)

    $stderr.puts("Updating #{TLD}") if VERBOSE

    children = tags.map{ |t| t.all_children }.flatten

    xml = (tags + children).map{ |t| t.to_xml }.join("\n")

    tld.sub!(/<!-- Auto-generated -->(.|\n)*<!-- Auto-generated -->/,
             "<!-- Auto-generated -->\n\n" +
             xml +
             "\n\n<!-- Auto-generated -->"
        )

    File.open(TLD, 'w') do |file|
        file.write(tld)
    end

    tags.each { |tag| tag.sync_java }
end

def api

    tags = MARKDOWN.map{ |md| Tag.parse(md) }.sort{ |a, b| a.name <=> b.name }

    tags.each { |tag| tag.sync_markdown }

end

namespace :java do
    desc('Generate JSP Wrappers from Markdown API reference')
    task :generate do
        generate
    end

    desc('Generate API reference for the JSP Wrappers')
    task :api do
        api
    end
end

