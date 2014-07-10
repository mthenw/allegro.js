[33mcommit e1579a9fc3e7fca7e6bcfb67838f387ad9e05ffb[m
Author: unknown <jedrzej.jozefowicz@gmail.com>
Date:   Thu Jul 10 18:39:28 2014 +0200

    Fixed client to use "new" structure of journal items

[1mdiff --git a/lib/client.js b/lib/client.js[m
[1mindex be7b8fd..c230728 100644[m
[1m--- a/lib/client.js[m
[1m+++ b/lib/client.js[m
[36m@@ -76,8 +76,8 @@[m [mvar Client = function (options) {[m
 [m
                     self._soapClient.doGetSiteJournal(callArgs, function (err, result) {[m
                         if (!err) {[m
[31m-                            Object.keys(result.siteJournalArray[0].item).forEach(function (key) {[m
[31m-                                var row = result.siteJournalArray[0].item[key];[m
[32m+[m[32m                            Object.keys(result.siteJournalArray.item).forEach(function (key) {[m
[32m+[m[32m                                var row = result.siteJournalArray.item[key];[m
                                 if (row.changeType === API_CHANGE_BUYNOW) {[m
                                     self.emit(event, row.itemId);[m
                                 }[m
[1mdiff --git a/test/client.js b/test/client.js[m
[1mindex 0ff867b..ac771cd 100644[m
[1m--- a/test/client.js[m
[1m+++ b/test/client.js[m
[36m@@ -167,13 +167,13 @@[m [mdescribe('Client', function () {[m
             _getDoLoginEncStub(soapClient);[m
             var doGetSiteJournalStub = sinon.stub(soapClient, 'doGetSiteJournal');[m
             doGetSiteJournalStub.callsArgWith(1, null, {[m
[31m-                siteJournalArray: [{[m
[32m+[m[32m                siteJournalArray: {[m
                     item: [{[m
                         rowId: 1,[m
                         itemId: 2,[m
                         changeType: 'now'[m
                     }][m
[31m-                }][m
[32m+[m[32m                }[m
             });[m
 [m
             var client = new Client({[m
