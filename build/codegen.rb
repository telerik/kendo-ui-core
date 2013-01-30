require 'codegen/lib/options'
require 'codegen/lib/markdown_parser'
require 'codegen/lib/component'

require 'codegen/lib/java/module'
require 'codegen/lib/java/composite_option'
require 'codegen/lib/java/event'
require 'codegen/lib/java/option'
require 'codegen/lib/java/component'
require 'codegen/lib/java/tld'
require 'codegen/lib/java/jsp'
require 'codegen/lib/java/api'

require 'codegen/lib/php/options'
require 'codegen/lib/php/composite_option'
require 'codegen/lib/php/event'
require 'codegen/lib/php/option'
require 'codegen/lib/php/component'
require 'codegen/lib/php/php'

namespace :generate do
    def import_metadata(component)
        metadata = "build/codegen/#{component.name.downcase}.yml"

        if File.exists?(metadata)
            yaml = YAML.load(File.read(metadata))

            component.import(yaml)
        end
    end

    desc 'Generate PHP wrappers'
    task :php do
        components = CodeGen::MarkdownParser.all(CodeGen::PHP::Wrappers::Component)

        components.each do |component|

            import_metadata(component)

            generator = CodeGen::PHP::Wrappers::Generator.new('wrappers/php/lib')

            generator.component(component)

        end

    end

    desc 'Generate JSP wrappers'
    task :java => ['java:tld', 'java:jsp']

    namespace :java do


        desc 'Generate JSP classes'
        task :jsp do

            components = CodeGen::MarkdownParser.all(CodeGen::Java::JSP::Component)

            components.each do |component|

                import_metadata(component)

                generator = CodeGen::Java::JSP::Generator.new('wrappers/java/kendo-taglib/src/main/java/com/kendoui/taglib/')

                generator.component(component)

            end

        end

        desc 'Generate JSP API reference'
        task :api do

            components = CodeGen::MarkdownParser.all(CodeGen::Java::API::Component)

            components.each do |component|

                import_metadata(component)

                generator = CodeGen::Java::API::Generator.new('docs/api/wrappers/jsp/')

                generator.component(component)

            end

        end

        desc 'Generate JSP TLD'
        task :tld do

            generator = CodeGen::Java::TLD::Generator.new('wrappers/java/kendo-taglib/src/main/resources/META-INF/taglib.tld')

            components = CodeGen::MarkdownParser.all(CodeGen::Java::TLD::Component)

            components.each do |component|

                import_metadata(component)

                generator.component(component)

            end

            generator.sync

        end
    end

end
