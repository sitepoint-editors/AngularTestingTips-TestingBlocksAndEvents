describe('testing resolve block', function(){
    var route, injector, rootScope, q, httpBackend;

    beforeEach(module(function($provide){
        var messenger={
            send:jasmine.createSpy('send')
        };
        $provide.value('messenger',messenger);
    }));

    beforeEach(module('configAndRunBlocks'));

    beforeEach(inject(function($route, $injector, $rootScope, $q, $httpBackend){
        route=$route;
        injector=$injector;
        rootScope=$rootScope;
        q=$q;
        httpBackend=$httpBackend;
    }));

    it('should return data on calling the resolve block', function(){
      var homeRoute=route.routes['/home'];
      var bootstrapResolveBlock=homeRoute.resolve.bootstrap;

      httpBackend.expectGET('home.html').respond('<div>This is the homepage!</div>');

      var bootstrapSvc = injector.invoke(bootstrapResolveBlock); //[1].call(q);

      bootstrapSvc.then(function(data){
        expect(data).toEqual({prop: 'value'});
      });

      rootScope.$digest();
      httpBackend.flush();
    });
});
