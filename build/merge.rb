class MergeTask < Rake::FileTask
    def execute(args=nil)
        File.open(name, 'w') do |output|
            puts "Merge #{prerequisites.join(',')} to #{name}"

            prerequisites.each do |src|
                File.open(src, 'r:bom|utf-8') do |file|
                    output.write file.read
                end
            end
        end
    end
end

def merge(*args, &block)
    MergeTask.define_task(*args, &block)
end
