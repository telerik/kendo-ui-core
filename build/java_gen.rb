require 'kramdown'
require 'erb'

TLD = 'wrappers/java/kendo-taglib/src/main/resources/META-INF/taglib.tld'

MARKDOWN = FileList['docs/api/{web,dataviz}/*.md'].exclude('**/ui.md')

JAVA_EVENT_TLD = ERB.new(%{
        <attribute>
            <description><%= description %></description>
            <name><%= name %></name>
            <rtexprvalue>true</rtexprvalue>
        </attribute>})

JAVA_OPTION_TLD = ERB.new(%{
<% if (name != '') %>
        <attribute>
            <description><%= description %></description>
            <name><%= name %></name>
            <rtexprvalue>true</rtexprvalue>
            <type><%= type %></type>
        </attribute>
<% end %>
}, 0, '<>')

TLD_WIDGET_TAG_TEMPLATE = ERB.new(%{
    <tag>
        <description><%= name %></description>
        <name><%= name.sub(/^./) { |c| c.downcase } %></name>
        <tag-class>com.kendoui.taglib.<%= type %></tag-class>
        <body-content>JSP</body-content>
        <attribute>
            <description>The mandatory and unique name of the widget. Used as the &quot;id&quot; attribute of the widget HTML element.</description>
            <name>name</name>
            <required>true</required>
            <rtexprvalue>true</rtexprvalue>
            <type>java.lang.String</type>
        </attribute>
<%= (options + events).map {|o| o.to_xml }.join %>
    </tag>
        })

TLD_TAG_TEMPLATE = ERB.new(%{
    <tag>
        <description><%= name %></description>
        <name><%= xml_name %></name>
        <tag-class>com.kendoui.taglib.<%= namespace %>.<%= type %></tag-class>
<% if children.any? %>
        <body-content>JSP</body-content>
<% else %>
        <body-content>empty</body-content>
<% end %>
<%= options.map {|o| o.to_xml }.join %>
    </tag>
})

JAVA_INTERFACE_TEMPLATE = ERB.new(%{
package com.kendoui.taglib.<%= namespace %>;

public interface <%= interface %> {
    void set<%= interface %>(<%= interface %>Tag value);
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

@SuppressWarnings("serial")
public class <%= type %> extends WidgetTag /* interfaces */ /* interfaces */ {

    public <%= type %>() {
        super("<%= name %>");
    }

//>> Attributes
//<< Attributes
}
})

JAVA_TAG_TEMPLATE = ERB.new(%{
package com.kendoui.taglib.<%= namespace %>;

import com.kendoui.taglib.BaseTag;

import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class <%= type %> extends BaseTag /* interfaces */ /* interfaces */ {

//>> Attributes
//<< Attributes
}
})
JS_TO_JAVA_TYPES = {
    'Number' => 'int',
    'String' => 'java.lang.String',
    'Boolean' => 'boolean',
    'Object' => 'Object',
    'Array' => 'Array',
    'Date' => 'java.lang.Date'
}

JAVA_DATASOURCE_SETTER = %{
    @Override
    public void setDataSource(DataSourceTag dataSource) {
        setProperty("dataSource", dataSource);
    }
}

JAVA_EVENT_GETTER = ERB.new(%{
    public String get<%= name.sub(/^./) { |c| c.capitalize } %>() {
        return ((Function)getProperty("<%= name %>")).getBody();
    }
})

JAVA_OPTION_GETTER = ERB.new(%{
    public <%= type.sub('java.lang.', '') %> get<%= name.sub(/^./) { |c| c.capitalize } %>() {
        return (<%= type.sub('java.lang.', '') %>)getProperty("<%= name %>");
    }
})

JAVA_EVENT_SETTER = ERB.new(%{
    public void set<%= name.sub(/^./) { |c| c.capitalize } %>(String value) {
        setProperty("<%= name %>", new Function(value));
    }
})

JAVA_OPTION_SETTER = ERB.new(%{
    public void set<%= name.sub(/^./) { |c| c.capitalize } %>(<%= type.sub('java.lang.', '') %> value) {
        setProperty("<%= name %>", value);
    }
})

JAVA_TAG_SETTER = ERB.new(%{
    @Override
    public void set<%= name.sub(/^./) { |c| c.capitalize } %>(<%= type.sub('java.lang.', '') %> value) {
        setProperty("<%= name %>", value);
    }
})

JAVA_PARENT_SETTER = ERB.new(%{
    @Override
    public int doEndTag() throws JspException {
        <%= parent_type %> parent = (<%= parent_type %>)findParentWithClass(<%= parent_type %>.class);

        parent.set<%= name %>(this);

        return EVAL_PAGE;
    }
})

class Event
    attr_reader :name, :description

    def initialize(options)
        @name = options[:name].strip
        @description = options[:description].strip
    end

    def to_xml
        JAVA_EVENT_TLD.result(binding)
    end

    def to_java
        $stderr.puts("\t|- #{@name} (event)") if VERBOSE

        [JAVA_EVENT_GETTER.result(binding), JAVA_EVENT_SETTER.result(binding)].join
    end
end

class Option
    attr_reader :name, :type, :description

    def initialize(options)
        @name = options[:name].strip
        @type = JS_TO_JAVA_TYPES[options[:type]]
        @description = options[:description].strip
    end

    def required?
        @type != 'Object' && @type != 'Array' && @type != 'java.lang.Date' && @type != nil
    end

    def to_xml
        return '' unless required?

        JAVA_OPTION_TLD.result(binding)
    end

    def to_java
        $stderr.puts("\t|- #{@name} (#{@type})") if VERBOSE

        return JAVA_DATASOURCE_SETTER if @name == 'dataSource'

        return '' unless required?

        [JAVA_OPTION_GETTER.result(binding), JAVA_OPTION_SETTER.result(binding)].join
    end
end

class Tag
    include Rake::DSL

    attr_reader :options, :name, :events, :children

    attr_accessor :type, :parent_type, :namespace, :parent

    def initialize(name, options = [])
        @name = name.sub(/kendo.*ui\./, '').sub('kendo.data.', '')
        @type = @name + 'Tag'
        @options = options
        @events = []
        @children = []
    end

    def xml_name
        return @name.sub(/^./) { |c| c.downcase } unless @parent

        return @parent.xml_name + @name
    end

    def to_xml
        type = @type

        template = @parent_type ? TLD_TAG_TEMPLATE : TLD_WIDGET_TAG_TEMPLATE

        template.result(binding)
    end

    def to_java
        $stderr.puts("\t#{name}") if VERBOSE

        parent = ''

        if @parent_type
            parent_type = @name
            parent = JAVA_PARENT_SETTER.result(binding)
        end

        children = @children.map do |child|
            type = child.type
            name = child.name.sub(/^./) { |c| c.downcase }
            JAVA_TAG_SETTER.result(binding)
        end.join

        parent + children + (@options + @events).map {|attr| attr.to_java }.join
    end

    def sync_java
        path = @namespace ? @namespace + '/' + @type : @type
        namespace = @namespace ? @namespace : @name.downcase

        filename = "wrappers/java/kendo-taglib/src/main/java/com/kendoui/taglib/#{path}.java"

        interfaces = @children.map{ |c| c.name }.uniq

        template = JAVA_WIDGET_TEMPLATE
        template = JAVA_TAG_TEMPLATE if @parent_type

        java = template.result(binding)

        java = File.read(filename) if File.exists?(filename)

        $stderr.puts("Updating #{filename}") if VERBOSE

        interfaces.each do |interface|
            interface_filename =  "wrappers/java/kendo-taglib/src/main/java/com/kendoui/taglib/#{namespace}/#{interface}.java"

            ensure_path(interface_filename)

            File.open(interface_filename, 'w') do |file|
                file.write(JAVA_INTERFACE_TEMPLATE.result(binding))
            end
        end

        if @options.any? { |o| o.name == 'dataSource' }
            interfaces.push('DataBoundWidget')
        end

        if (@name =~/PanelBar/)
            interfaces.push('PanelBarItemTagContainer')
        end

        implements = ""
        implements = 'implements ' + interfaces.join(", ") if interfaces.any?

        java.sub!(/\/\* interfaces \*\/(.|\n)*\/\* interfaces \*\//,
                 '/* interfaces */' + implements + '/* interfaces */')

        java.sub!(/\/\/>> Attributes(.|\n)*\/\/<< Attributes/,
                        "//>> Attributes\n" +
                        to_java +
                        "\n//<< Attributes"
                     )

        java.gsub!(/\r?\n/, "\r\n")

        ensure_path(filename)

        File.open(filename, 'w') do |file|
            file.write(java)
        end

        @children.each { |child| child.sync_java }

    end

    def promote_options_to_tags
        @options.dup.each do |option|
            prefix = option.name + '.'

            child_options = @options.find_all { |o| o.name.start_with?(prefix) }

            if child_options.any?
                @options.delete(option)

                child_options.each do |o|
                    o.name.sub!(prefix, '')
                    @options.delete(o)
                end

                namespace = @namespace ? @namespace : @name.downcase

                child = Tag.new(option.name.sub(namespace, '').sub(/^./) { |c| c.capitalize }, child_options)

                child.parent_type = @type
                child.parent = self
                child.namespace = namespace


                @children.push(child)

                child.promote_options_to_tags
            end
        end
    end

    def same_options?(tag)
        return false if tag.options.length != @options.length

        tag.options.all? do |target|
            @options.any? do |source|
                source.name == target.name && source.type == target.type
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

        tag = Tag.new(header.options[:raw_text])

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

                name.sub!(/\s*type\s*[=:][^\.]*\.?/, '')

                type.value.split('|').each do |t|
                    next if t =~ /Function/

                    paragraph  = find_element_with_type.call(configuration, index, :p)

                    description = find_child_with_type.call(paragraph, :text)

                    option = Option.new :name => name,
                        :type => t,
                        :description => description.value

                    tag.options.push(option)
                end

            end
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

