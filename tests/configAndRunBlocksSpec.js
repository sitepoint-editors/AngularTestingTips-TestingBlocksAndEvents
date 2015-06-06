describe('config and run blocks', function(){
  var routeProvider, messenger;

  beforeEach(function() {
    module('ngRoute');

    module(function ($provide, $routeProvider) {
      routeProvider = $routeProvider;
      spyOn(routeProvider, 'when').and.callThrough();
      spyOn(routeProvider, 'otherwise').and.callThrough();

      messenger = {
        send: jasmine.createSpy('send')
      };
      $provide.value('messenger', messenger);
    });

    module('configAndRunBlocks');
  });

  beforeEach(inject());

  describe('config block tests', function(){
    it('should have called registered 2 routes', function(){
      //Otherwise internally calls when. So, call count of when has to be 3
      expect(routeProvider.when.calls.count()).toBe(3);
    });

    it('should have registered a default route', function(){
        expect(routeProvider.otherwise).toHaveBeenCalled();
    });
  });

  describe('run block tests', function(){
    var rootScope;
    beforeEach(inject(function($rootScope){
      rootScope=$rootScope;
    }));

    it('should send application bootstrap message', function(){
      expect(messenger.send).toHaveBeenCalled();
      expect(messenger.send).toHaveBeenCalledWith("Bootstrapping application");
    });

    it('should handle the $locationChangeStart event', function(){
      var next='/second';
      var current='/first';
      rootScope.$broadcast('$locationChangeStart',next, current);

      expect(messenger.send).toHaveBeenCalled();
      expect(messenger.send).toHaveBeenCalledWith('Changing route to ' + next + ' from '+current);
    });
  });
});
