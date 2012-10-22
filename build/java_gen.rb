require 'kramdown'
require 'erb'

TLD = 'wrappers/java/kendo-taglib/src/main/resources/META-INF/taglib.tld'

MARKDOWN = FileList['docs/api/{web,dataviz}/*.md'].exclude('**/ui.md').include('docs/api/framework/datasource.md')

IGNORED = {
    'chart' => ['axisDefaults'],
    'window' => ['content.template']
}

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
        <description>Subscribes to an event of the <%= name %> widget</description>
        <name><%= name.camelize %>-event</name>
        <tag-class>com.kendoui.taglib.EventTag</tag-class>
        <body-content>JSP</body-content>
        <attribute>
            <description>Specifies the name of the event to subscribe to. Takes one of the following values: <%= events.map{|e| e.name }.join(', ') %>.</description>
            <name>name</name>
            <required>true</required>
            <rtexprvalue>true</rtexprvalue>
            <type>java.lang.String</type>
        </attribute>
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

JAVA_INTERFACE_TEMPLATE = ERB.new(%{
package com.kendoui.taglib.<%= namespace %>;

public interface <%= child.name %> {
<% if child.instance_of?(NestedTagArrayItem) %>
    void add<%= child.name %>(<%= child.java_type %> value);
<% else %>
    void set<%= child.name %>(<%= child.java_type %> value);
<% end %>
}
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

import com.kendoui.taglib.BaseTag;

import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class <%= java_type %> extends BaseTag /* interfaces */ /* interfaces */ {
    #{JAVA_METHODS}
}
})

JAVA_NESTED_TAG_ARRAY_TEMPLATE = ERB.new(%{
package com.kendoui.taglib.<%= namespace %>;

import com.kendoui.taglib.BaseTag;

import java.util.ArrayList;
import java.util.Map;
import java.util.List;

import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class <%= java_type %> extends BaseTag /* interfaces */ /* interfaces */ {
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
        setProperty("dataSource", dataSource.properties());
    }
}

JAVA_EVENT_GETTER_TEMPLATE = ERB.new(%{
    public String get<%= name.sub(/^./) { |c| c.capitalize } %>() {
        return ((Function)getProperty("<%= name %>")).getBody();
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
        setProperty("<%= child.name.downcase %>", value.properties());
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
        <%= parent.java_type %> parent = (<%= parent.java_type %>)findParentWithClass(<%= parent.java_type %>.class);

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
        has_items? && @name == 'Item' && namespace != 'tabstrip'
    end

    def has_item_content?
        has_items? && @name == 'Item'
    end

    def has_items?
        namespace =~ /panelbar|tabstrip|menu|treeview/
    end

    def to_xml
        xml = xml_template.result(binding)

        #xml +=  XML_EVENT_TAG_TEMPLATE.result(binding) if @events.any?

        xml
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

    def java_source_code
        if File.exists?(java_filename)
            File.read(java_filename)
        else
            template.result(binding)
        end
    end

    def generated_interfaces
        @children.map{ |c| c.name }
    end

    def add_implements_interfaces(code, interfaces)
        implements = 'implements ' + interfaces.join(", ") if interfaces.any?

        code.sub /\/\* interfaces \*\/(.|\n)*\/\* interfaces \*\//,
                 "/* interfaces */#{implements}/* interfaces */"
    end

    def interface_template
        JAVA_INTERFACE_TEMPLATE
    end

    def patch_java_source_code(code)
        $stderr.puts("\t#{name}") if VERBOSE

        code.sub /\/\/>> Attributes(.|\n)*\/\/<< Attributes/,
                 "//>> Attributes\n#{java_attributes}\n//<< Attributes"
    end

    def sync_java
        java = java_source_code

        $stderr.puts("Updating #{java_filename}") if VERBOSE


=begin
        @children.each do |child|
            interface_filename =  "wrappers/java/kendo-taglib/src/main/java/com/kendoui/taglib/#{namespace}/#{child.name}.java"

            ensure_path(interface_filename)

            File.open(interface_filename, 'w') do |file|
                file.write(JAVA_INTERFACE_TEMPLATE.result(binding))
            end
        end
=end

        interfaces = [] # generated_interfaces

        if @options.any? { |o| o.name == 'dataSource' }
            interfaces.push('DataBoundWidget')
        end

        if has_item_hierarchy?
            interfaces.push('Items')
        end

        java = add_implements_interfaces(java, interfaces)
        java = patch_java_source_code(java)

        ensure_path(java_filename)

        File.open(java_filename, 'w') do |file|
            file.write(java.gsub(/\r?\n/, "\r\n"))
        end

        @children.each { |child| child.sync_java }
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
                    child =  NestedTagArray.new :name => option.name,
                              :parent => self,
                              :description => option.description,
                              :options => child_options
                else
                    child =  NestedTag.new :name => option.name,
                              :parent => self,
                              :description => option.description,
                              :options => child_options,
                              :events => child_events
                end

                @children.push(child)

                child.promote_options_to_tags
            end
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
                name = find_child_with_type.call(e, :text).value

                type = find_child_with_type.call(e, :codespan)

                next unless type

                name.sub!(/\s*type\s*[=:][^\.]*\.?/, '') # skip exotic documentation like series.type="area".tooltip

                name = name.strip

                type = type.value.strip

                paragraph  = find_element_with_type.call(configuration, index, :p)

                description = find_child_with_type.call(paragraph, :text)

                if type == 'Function'

                    event = Event.new :name => name,
                                      :description => description.value

                    tag.events.push(event)

                    next
                end

                type.split('|').each do |t|
                    t = t.strip.strip_namespace

                    next if t == 'Function'
                    next if IGNORED[tag.name.downcase] && IGNORED[tag.name.downcase].include?(name)

                    option = Option.new :name => name,
                        :parent => tag,
                        :type => t,
                        :description => description.value

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
                                      :description => description.value

                    tag.events.push(event)

                    event = NestedTag.new :name => name,
                                          :parent => tag,
                                          :description => description.value

                    tag.children.push(event);
                end
            end
        end

        tag.promote_options_to_tags

        tag.remove_duplicate_options

        tag
    end

    def remove_duplicate_options
        @options = @options.uniq { |o| o.name }

        @children.each { |child| child.remove_duplicate_options }
    end
end

class NestedTag < Tag
    attr_reader :description, :parent

    def namespace
        @parent.namespace
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
        @name = options[:name].sub(@parent.namespace, '').sub(/^./) { |c| c.capitalize }
        @options = options[:options] if options[:options]
        @events = options[:events] if options[:events]
        @description = options[:description]
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
              :children => @children

        @children = [@child]
        @options = []
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

    def parent_setter_template
        JAVA_ARRAY_PARENT_SETTER_TEMPLATE
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
    end

    def tag_name
        return @parent.tag_name.sub(@parent.name.camelize, @name.camelize)
    end

    def parent_setter_template
        JAVA_ARRAY_ADD_TO_PARENT_TEMPLATE
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

namespace :java do
    desc('Generate JSP Wrappers from Markdown API reference')
    task :generate do
        generate
    end
end

