module CodeGen
    module Array
        attr_reader :item

        def initialize(settings)
            super

            @item = item_class.new(:name => @name.singular,
                                   :type => 'Object',
                                   :content => @content,
                                   :recursive => @recursive,
                                   :owner => self,
                                   :description => @description)

            @options.push(@item)
        end

        def item_class
            ArrayItem
        end

        def add_option(settings)
            @item.add_option(settings)
        end
    end

    class ArrayOption < CompositeOption
        include Array
    end

    class ArrayItem < CompositeOption
    end
end
