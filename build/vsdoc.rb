require 'erb'
require 'codegen/lib/options'
require 'codegen/lib/markdown_parser'
require 'codegen/lib/component'

VS_DOC_TEMPLATE_CONTENTS = File.read(File.join(File.dirname(__FILE__), "vsdoc.js.erb"))
VS_DOC_TEMPLATE = ERB.new VS_DOC_TEMPLATE_CONTENTS, 0, '%<>'

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

        def parameter_class
            Parameter
        end
    end

    class Parameter < CodeGen::Parameter
        def vsdoc_type
            return 'Object' if @type.size > 1

            @type[0]
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
