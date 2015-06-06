describe('testing routes', function(){
    var route;

    beforeEach(module(function($provide){
        var messenger={
            send:jasmine.createSpy('send')
        };
        $provide.value('messenger',messenger);
    }));

    beforeEach(module('configAndRunBlocks'));

    beforeEach(inject(function($route){
      route=$route;
    }));

    it('should have home route with right template, controller and a resolve block', function(){
      var homeRoute=route.routes['/home'];
      expect(homeRoute).toBeDefined();
      expect(homeRoute.controller).toEqual('HomeController');
      expect(homeRoute.templateUrl).toEqual('home.html');
      expect(homeRoute.resolve.bootstrap).toBeDefined();
    });

    it('should have details route', function(){
        var detailsRoute=route.routes['/details/:id'];
        expect(detailsRoute).toBeDefined();
        expect(detailsRoute.templateUrl).toEqual('details.html');
        expect(detailsRoute.controller,'DetailsController');
    });

    it('should have a default route', function(){
      var defaultRoute=route.routes['null'];
      expect(defaultRoute).toBeDefined();
    });
});
