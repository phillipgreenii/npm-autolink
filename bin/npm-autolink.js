#!/usr/bin/env node

'use strict';

var program = require('commander');
var autolink = require('../');

program.description('Npm autolinking feature');

program
    .command('list')
    .description('list dev packages available')
    .action(function(cmd, options) {
        autolink.getDevPackage()
        .then(function(packages) {
            console.log((packages) ? packages : 'No packages found');
        })
        .catch(function(e) {
            console.error(e);
        })
    });

program
    .command('matches')
    .description('list packages matches that will be linked')
    .action(function(cmd, options) {
        autolink.getMatches()
            .then(function(packages) {
                console.log((packages)?packages:'No matches found');
            }).catch(function(e) {
                console.error(e);
            })
    });

program
    .command('remove [name]')
    .description('remove link')
    .action(function(name, options) {
        autolink.removeLinks(name)
            .then(function(removedLinks) {
                console.log("Removed links : ", removedLinks);
            }).catch(function(e) {
                console.error(e);
            })
    });

program
  .arguments('<name>')
  .action(function (name) {
     autolink.linkModules(name)
        .catch(function(e) {
            console.error(e);
        });
  });

program.parse(process.argv);

if (!program.args.length) {
    autolink.linkModules()
        .catch(function(e) {
            console.error(e);
        });
}