namespace :cdn do
    desc('Deploy assets to CloudFront')

    task :deploy => 'bundles:cdn.commercial' do
        sh <<-SH
        if [ ! -d kendo-cdn ]
        then
            mkdir kendo-cdn && cd kendo-cdn && git clone git@github.com:telerik/kendo-cdn.git .;
        else
            cd kendo-cdn;
        fi
        git pull;
        mkdir -p #{VERSION};
        rsync -av ../dist/bundles/cdn.commercial/ #{VERSION}/;
        git add #{VERSION};
        git commit --message "Automatic CDN upload of #{VERSION}";
        git push;
        rsync -avz --exclude '.git' ./ #{KENDO_ORIGIN_HOST}:/usr/share/nginx/html/;
        SH
    end
end
