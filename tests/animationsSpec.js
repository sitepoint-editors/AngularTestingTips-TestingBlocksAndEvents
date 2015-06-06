describe('animation testing', function () {
    var animate, rootScope, rootElement, divElement;

    beforeEach(function () {
        module('ngAnimate', 'ngAnimateMock', 'animationsApp');

        inject(function($animate, $rootScope, $rootElement){
            $animate.enabled(true);
            animate=$animate;

            rootScope=$rootScope;
            rootElement = $rootElement;

            divElement = angular.element('<div class="view-slide-in">This is my view</div>');

            rootScope.$digest();
        });
    });

    it('element should start entering from bottom right', function(){
        animate.enter(divElement, rootElement);

        rootScope.$digest();

        expect(divElement.css('opacity')).toEqual('0.5');
        expect(divElement.css('position')).toEqual('relative');
        expect(divElement.css('top')).toEqual('10px');
        expect(divElement.css('left')).toEqual('20px');
    });

    it('element should be positioned after 1 sec', function(done) {
        animate.enter(divElement, rootElement);

        rootScope.$digest();

        setTimeout(function () {
            expect(divElement.css('opacity')).toEqual('1');
            expect(divElement.css('position')).toEqual('relative');
            expect(divElement.css('top')).toEqual('0px');
            expect(divElement.css('left')).toEqual('0px');

            done();
        }, 1000);
    });

    it('element should leave by sliding towards bottom right for 100ms', function(done){
        rootElement.append(divElement);

        animate.leave(divElement, rootElement);

        rootScope.$digest();

        setTimeout(function () {
            expect(divElement.css('opacity')).toEqual('0.5');
            expect(divElement.css('top')).toEqual('10px');
            expect(divElement.css('left')).toEqual('20px');
            done();
        }, 105);
        //5 ms delay in the above snippet is to include some time for the digest cycle
    });
});