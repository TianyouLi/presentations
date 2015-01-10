Normally, just:
npm install && bower install

If you are under Ubuntu 12.04, according to http://stackoverflow.com/a/21715730/3728874, you should:
sudo apt-get purge nodejs npm
curl -sL https://deb.nodesource.com/setup | sudo bash -
sudo apt-get install -y nodejs

To install bower:
sudo npm install -g bower

To install grunt:
sudo npm install -g grunt-cli

To start testing, please:
grunt
