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
        <attribute>
            <description><%= description %></description>
            <name><%= name %></name>
            <rtexprvalue>true</rtexprvalue>
            <type><%= type %></type>
        </attribute>})

TLD_TAG_TEMPLATE = ERB.new(%{
    <tag>
        <description><%= name %> Widget</description>
        <name><%= name.sub(/^./) { |c| c.downcase } %></name>
        <tag-class>com.kendoui.taglib.<%= name %>Tag</tag-class>
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

    attr_reader :options, :name, :events

    def initialize(name)
        @name = name.sub(/kendo.*ui\./, '')
        @options = []
        @events = []
    end

    def to_xml
        TLD_TAG_TEMPLATE.result(binding)
    end

    def to_java
        $stderr.puts("\t#{name}") if VERBOSE

        (@options + @events).map {|attr| attr.to_java }.join
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

                unless name.include?('.')
                    type = find_child_with_type.call(e, :codespan)

                    paragraph  = find_element_with_type.call(configuration, index, :p)

                    description = find_child_with_type.call(paragraph, :text)

                    option = Option.new :name => name,
                        :type => type.value,
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

        tag
    end
end

def generate
    tags = MARKDOWN.map{ |md| Tag.parse(md) }.sort{ |a, b| a.name <=> b.name }

    tld = File.read(TLD)

    $stderr.puts("Updating #{TLD}") if VERBOSE

    tld.sub!(/<!-- Auto-generated -->(.|\n)*<!-- Auto-generated -->/,
             "<!-- Auto-generated -->\n\n" +
             tags.map{ |t| t.to_xml }.join("\n") +
             "\n\n<!-- Auto-generated -->"
        )

    File.open(TLD, 'w') do |file|
        file.write(tld)
    end

    tags.each do |tag|
        filename = "wrappers/java/kendo-taglib/src/main/java/com/kendoui/taglib/#{tag.name}Tag.java"

        if File.exists?(filename)
            $stderr.puts("Updating #{filename}") if VERBOSE

            java = File.read(filename)

            java.sub!(/\/\/>> Attributes(.|\n)*\/\/<< Attributes/,
                        "//>> Attributes\n" +
                        tag.to_java +
                        "\n//<< Attributes"
                     )

            java.gsub!(/\r?\n/, "\r\n")

            File.open(filename, 'w') do |file|
                file.write(java)
            end
        end
    end
end


namespace :java do
    desc('Generate JSP Wrappers from Markdown API reference')
    task :generate do
        generate
    end
end

