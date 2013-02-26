require 'erb'
require 'codegen/lib/options'
require 'codegen/lib/markdown_parser'
require 'codegen/lib/component'

VS_DOC_TEMPLATE_CONTENTS = File.read(File.join(File.dirname(__FILE__), "vsdoc.js.erb"))
VS_DOC_TEMPLATE = ERB.new VS_DOC_TEMPLATE_CONTENTS, 0, '%<>'

class VsDocClass
    attr_reader :name, :plugin, :methods, :configuration

    def initialize(name, plugin)
        @name = name
        @is_class = name =~ /[A-Z]\w+$/
        @plugin = plugin
        @methods = []
        @configuration = []
    end

    def real_class?
        @is_class
    end
end

class VsDocMethod
    attr_accessor :name, :description, :parameters, :returns, :returns_description

    def initialize(name, description)
        @name = name
        @description = description
        @parameters = []
    end

    def add_param(name, type, description)
        @parameters.push VsDocParameter.new(name, type, description)
    end

    def self.parse(child)
        match = child.title.match(/\w+/)

        method = VsDocMethod.new(match[0], child.contents)

        child.children.each do |member|
            if member.title =~ /Parameters/
                member.children.each do |param|
                    # Skip composite parameters like "options.url"
                    next if param.title.include? "."

                    match = param.title.match /(\w+).+`(.*)`/

                    raise "Invalid param statement - '#{param.title}' - #{method.name}" unless match

                    method.add_param match[1], match[2], param.contents
                end

            elsif member.title =~ /Returns/
                match = member.contents.match /`?(.+)`(.*)/

                raise "Invalid param statement - '#{member.contents}' - #{method.name}" unless match

                method.returns = match[1]
                method.returns_description = match[2]
            end
        end

        return method
    end
end

class VsDocParameter < Struct.new(:name, :type, :description)
end

class VsDocConfiguration < Struct.new(:name, :type, :default, :description)
    def self.parse(child)
       match = child.title.match /(\S+)\s*(`(.+)`)?(\*(.+)\*)?/
       if match[3]
           return VsDocConfiguration.new match[1], match[3], match[5], child.contents
       end
    end
end

class Node
    attr_reader :children
    attr_accessor :contents
    attr_reader :title
    attr_accessor :parent

    def initialize(title, parent = nil)
        @title = title
        @contents = ""
        @parent = parent
        @children = []
    end

    def add_child(title)
        child = Node.new(title, self)
        children.push child
        child
    end
end

def to_heading_tree(file)
    node = root = Node.new("Root")
    level = 0

    File.open(file, 'r:bom|utf-8').each_line do |line|
        match = line.match /^(#+) (.+)$/
        if match
            current_level = match[1].length
            current_title = match[2]

            if current_level > level + 1
                while level < current_level - 1 do
                    node = node.add_child("-Dummy-")
                    level += 1
                end
            else
                while level >= current_level do
                    node = node.parent
                    level -= 1
                end
            end

            level = current_level

            node = node.add_child(current_title)
        else
            node.contents += line + "\n";
        end
    end

    root
end

module CodeGen::VSDoc
    class Component < CodeGen::Component

        def real_class?
            @name =~ /[A-Z]\w+$/
        end

        def plugin
            'kendo' + @name
        end

        def method_class
            Method
        end

        def methods
            @methods.find_all { |m| !m.name.include?('.') }
        end
    end

    class Method < CodeGen::Method

        def parameters
            @parameters.find_all { |p| !p.name.include?('.') }
        end

    end
end

def get_vsdoc(sources)

    classes = sources.map do |source|
        parser = CodeGen::MarkdownParser.new

        markdown = File.read(source)

        parser.parse(File.read(source), CodeGen::VSDoc::Component)
    end

    classes.sort! {|a, b| a.full_name <=> b.full_name }

    VS_DOC_TEMPLATE.result(binding)
end

class VsDocTask < Rake::FileTask
    include Rake::DSL
    def execute(args=nil)
        mkdir_p File.dirname(name), :verbose => false

        $stderr.puts("Creating #{name}") if VERBOSE

        File.open(name, "w") do |file|
            file.write get_vsdoc(prerequisites)
        end
    end
end

def vsdoc(*args, &block)
    VsDocTask.define_task(*args, &block)
end

namespace :vsdoc do
    VSDOC_SOURCES = FileList["docs/api/{web,mobile,dataviz,framework}/*.md"]
    %w(master production).each do |branch|
        namespace branch do
            desc "Test VSDoc generation"
            task :test do
                sh "cd docs && git fetch && git reset --hard origin/#{branch}"

                File.open("dist/kendo.vsdoc-#{branch}.js", "w") do |f|
                    f.write get_vsdoc(VSDOC_SOURCES)
                    sh "node_modules/jshint/bin/hint #{f.path}"
                end
            end
        end
    end
end
