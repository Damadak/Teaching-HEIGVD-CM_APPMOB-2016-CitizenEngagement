// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('citizen-engagement', ['ionic','leaflet-directive','ionic.service.core', 'citizen-engagement.auth', 'citizen-engagement.constants','citizen-engagement.citizenCtrl','citizen-engagement.mapBox','geolocation', 'citizen-engagement.newIssueCtrl','citizen-engagement.cameraCtrl'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

    .run(function($ionicPlatform) {
        $ionicPlatform.ready(function() {
            var push = new Ionic.Push({
                "debug": true
            });

            push.register(function(token) {
                console.log("Device token:",token.token);
            });
        });
    })

    .run(function(AuthService, $rootScope, $state) {

        // Listen for the $stateChangeStart event of AngularUI Router.
        // This event indicates that we are transitioning to a new state.
        // We have the possibility to cancel the transition in the callback function.
        $rootScope.$on('$stateChangeStart', function(event, toState) {

            // If the user is not logged in and is trying to access another state than "login"...
            if (!AuthService.currentUserId && toState.name != 'login') {

                // ... then cancel the transition and go to the "login" state instead.
                event.preventDefault();
                $state.go('login');
            }
        });
    })

    .config(function($stateProvider, $urlRouterProvider) {

      // Ionic uses AngularUI Router which uses the concept of states
      // Learn more here: https://github.com/angular-ui/ui-router
      // Set up the various states which the app can be in.
      // Each state's controller can be found in controllers.js
      $stateProvider

      // This is the abstract state for the tabs directive.
          .state('menu', {
            url: '/menu',
            abstract: true,
            templateUrl: 'templates/menu.html'
          })

          // The three next states are for each of the three tabs.
          // The state names start with "tab.", indicating that they are children of the "tab" state.
          .state('menu.newIssue', {
            // The URL (here "/newIssue") is used only internally with Ionic; you never see it displayed anywhere.
            // In an Angular website, it would be the URL you need to go to with your browser to enter this state.
            url: '/newIssue',
            views: {
              // The "tab-newIssue" view corresponds to the <ion-nav-view name="tab-newIssue"> directive used in the tabs.html template.
              'menuContent': {
                // This defines the template that will be inserted into the directive.
                templateUrl: 'templates/newIssue.html'
              }
            }
          })

          .state('menu.issueMap', {
            url: '/issueMap',
            views: {
              'menuContent': {
                templateUrl: 'templates/issueMap.html',
                  controller:'IssueMapCtrl'
              }
            }
          })

          .state('menu.issueList', {
            url: '/issueList',
            views: {
              'menuContent': {
                templateUrl: 'templates/issueList.html'
              }
            }
          })

          // This is the issue details state.
          .state('menu.issueDetails', {
            // We use a parameterized route for this state.
            // That way we'll know which issue to display the details of.
            url: '/issueDetails/:issueId',
            views: {
              // Here we use the same "tab-issueList" view as the previous state.
              // This means that the issue details template will be displayed in the same tab as the issue list.
              'menuContent': {
                templateUrl: 'templates/issueDetails.html'
              }
            }
          })
          .state('login', {
              url: '/login',
              controller: 'LoginCtrl',
              templateUrl: 'templates/login.html'


          })
          // This is the issue details state.
          .state('menu.issueSingleMap', {
            // We use a parameterized route for this state.
            // That way we'll know which issue to display the details of.
            url: '/issueSingleMap/:issueId',
            views: {
              // Here we use the same "tab-issueList" view as the previous state.
              // This means that the issue details template will be displayed in the same tab as the issue list.
              'menuContent': {
                templateUrl: 'templates/issueSingleMap.html'
              }
            }
          })
      ;

      // Define the default state (i.e. the first screen displayed when the app opens).
      $urlRouterProvider.otherwise(function($injector) {
        $injector.get('$state').go('menu.newIssue'); // Go to the new issue tab by default.
      });
    })
