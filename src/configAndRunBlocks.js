angular.module('configAndRunBlocks',['ngRoute'])
  .config(function($routeProvider) {
    $routeProvider.when('/home', {
        templateUrl: 'home.html',
        controller: 'HomeController',
        resolve: {
          bootstrap: ['$q',function ($q) {
            return $q.when({prop: 'value'});
          }]
        }
      })
      .when('/details/:id', {
        templateUrl: 'details.html',
        controller: 'DetailsController'
      })
      .otherwise({redirectTo: '/home'});
  })
  .run(function($rootScope, messenger) {

    messenger.send('Bootstrapping application');
    $rootScope.$on('$locationChangeStart', function (event, next, current) {
      messenger.send('Changing route to ' + next + ' from ' + current);
    });
  });
