module CodeGen
end

class CodeGen::CompositeOption
    attr_reader :name, :description, :type, :options

    def initialize(settings)
        @name = settings[:name]
        @description = settings[:description]
        @type = settings[:type]
        @options = []
    end

    def add_options(options)
        prefix = @name + "."

        options.each do |option|
            option.name.sub!(prefix, '')

            @options.push(option)
        end

        promote_members
    end


    private

    def promote_members
        @options.clone.each do |member|
            prefix = member.name + '.'

            members = @options.find_all {|m| m.name.start_with?(prefix)}

            next unless members.any?

            @options.push composite_option(member, members)
        end
    end

    def composite_option(member, members)
        members.each {|m| @options.delete(m) }

        @options.delete(member)

        option = CodeGen::CompositeOption.new(:name => member.name,
                                              :type => member.type,
                                              :description => member.description)

        option.add_options(members)

        option
    end
end
