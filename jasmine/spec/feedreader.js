/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */

function isValidUrl(url) {
    var urlPattern = new RegExp(/(http|https):\/\/[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-])?/);
    return urlPattern.test(url);
}

$(function() {
    //Test Suite for RSS Feeds
    describe('RSS Feeds', function() {
        //Test to ensure the feed variable is defined
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        //Loops through each feed in the allFeeds object and ensures it has a URL defined and that the URL is not empty.
        it('it has url', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.url).toBeDefined();
                expect(isValidUrl(feed.url)).toBe(true);
            });
        });

        //Loops through each feed in the allFeeds object and ensures it has a name defined and that the name is not empty.
        it('it has name', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.name).toBeDefined();
                expect(feed.name).not.toBe('');
            });
        });

    });

    //Test suite fore the menu
    describe('The menu', function() {
        var body = $('body'),
            menuIconLink = $('.menu-icon-link');

        //Test ensuring that the menu is hidden by default
        it('is hidden by default', function() {
            expect(body.hasClass('menu-hidden')).toBe(true);
        });

        //Test that the menu changes visibility when clicked
        it('changes visibility when the menu icon is clicked', function() {
            menuIconLink.trigger('click');
            expect(body.hasClass('menu-hidden')).toBe(false);
            menuIconLink.trigger('click');
            expect(body.hasClass('menu-hidden')).toBe(true);
        });

    });

    //Test suite for Initial Entries
    describe('Initial Entries', function() {

        //Clean fead html and load first feed
        beforeEach(function(done) {
            $('.feed').empty();
            loadFeed(0, done);
        });

        //Test there is at least a single .entry element within the .feed container.
        it('has at least one entry', function(done){
            var entry = $('.feed .entry');
            expect(entry.length).toBeGreaterThan(0);
            done();
        });

    });

    //Test Suite for Feed Selection
    describe('New Feed Selection', function() {
        var entryTexts;

        //Clean fead html, then load two new feed.
        beforeEach(function(done) {
            $('.feed').empty();
            loadFeed(0, function(){
                entryTexts = $('.feed').find('h2').text();
                loadFeed(1,done);
            });
        });

        //Test ensuring content is changed when new feed is loaded by loadFeed()
        it('changes the content when new content is loaded', function(done){
            //Test if text different
            expect($('.feed').find('h2').text()).not.toBe(entryTexts);
            done();
        });

        //Initial feed back to first feed
        afterEach(function(done) {
            loadFeed(0, done);
        });
    });

    /*
     * This additional test
     * Test Suite for Add/Delete new feed to menu
     */
    describe('Feed list in menu', function() {

        //Test ensure that new feeds added to menu
        it('add new feed to end menu', function() {
            var feed = {
                    name: 'Smashing Magazine',
                    url: 'http://www.smashingmagazine.com/feed/'
                },
                coundFeeds = allFeeds.length-1, //count feeds
                id;

            //Add feed to end in menu
            addToMenuFeed(feed);

            //after add length feed incremental + 1 and equal data attribute 'data-id'
            id = coundFeeds + 1;
            //Check new feed in menu with text
            expect($('.feed-list li a[data-id="'+id+'"]').text()).toBe(feed.name);
        });

        //Test ensure that feed removed from menu
        it('remove feed from menu', function() {
            //Remove feed from menu by id
            var id = 0, //it first item in menu list
                feedText = $('.feed-list li a[data-id="'+id+'"]').text(),
                coundFeedsBefore = allFeeds.length,
                coundFeedsAfter;

            removeMenuFeed(id);
            coundFeedsAfter = allFeeds.length; //after remove length is -1

            //Check if removed feed from menu, find text no
            expect($('.feed-list li a[data-id="'+id+'"]').text()).not.toBe(feedText);
            //Check if changed length -1 in allFeeds
            expect(coundFeedsAfter).toBe(coundFeedsBefore-1);
        });

    });
}());