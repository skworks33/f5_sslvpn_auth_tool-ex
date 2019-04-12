// Example of execution
// -- casperjs f5-ssl-auth.js --url= --username=usrXXX --password= --ignore-ssl-errors=true
//
// Debug mode
// -- casperjs f5-ssl-auth.js --url= --username=usrXXX --password= --ignore-ssl-errors=true --verbose --log-level=debug


var casper = require('casper').create();

casper.start();

// set user-agent
casper.userAgent("Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.71 Safari/537.36");

// user args
var url = casper.cli.get('url');
var user = casper.cli.get("username");
var pass = casper.cli.get('password');
if (url == null || user == null || pass == null) {
    casper.echo('You need to specify username and password. (ex: casperjs auth.js --url=https://XXXX.XXX --username=usrXXX --password=mofumofu --ignore-ssl-errors=true)');
    casper.exit();
}

casper.open(url);

// login
casper.then(function () {

    this.capture('before_auth.png');

    if (this.exists("#auth_form")) {
        this.fill("#auth_form", {
            username: user,
            password: pass
        }, false);
        this.click('#submit_row > td > input');
        this.echo("Authentication request was executed.");
        this.capture('after_auth.png');
    } else {
        this.echo("Already certified. Nothing to do.");
    }

});

casper.run();
