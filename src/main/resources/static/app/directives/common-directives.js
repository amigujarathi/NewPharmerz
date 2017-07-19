/*
 * Method Name  - loading
 * Created By   - Vaibahv Godambe
 * Created On   - 13 Feb 2017
 * Modified By  -
 * Modified On  -
 * Purpose      -  This directive used to display loader on page.
 */
myApp.directive('loading', function () {
    return {
        restrict: 'E',
        replace:true,
        template: '<div class="loading"></div>',
        link: function (scope, element, attr) {
            scope.$watch('loading', function (val) {
                if (val){
                    $(element).show();
                    angular.element('.find_page_header').addClass('pagefullcover');
                }
                else{
                    $(element).hide();
                    angular.element('.find_page_header').removeClass('pagefullcover');
                }
            });
        }
    }
});

/*
 * Method Name  - owlCarousel
 * Created By   - Vaibahv Godambe
 * Created On   - 8 May 2017
 * Modified By  -
 * Modified On  -
 * Purpose      -  This directive used to display owlCarousel on page.
 */

myApp.directive("owlCarousel", function() {
    return {
        restrict: 'E',
        transclude: false,
        link: function (scope) {
            scope.initCarousel = function(element) {
                // provide any default options you want
                var defaultOptions = {
                    navigation: false,
                    pagination: false,
                    rewindNav : true,
                    autoPlay: 1500 ,
                    stopOnHover: true,
                    items : 4,
                    itemsDesktop : [1199,4],
                    itemsDesktopSmall : [980,3],
                    itemsTablet: [768,2],
                    itemsTabletSmall: [768,2],
                    itemsMobile : [479,1],
                    singleItem : false
                };
                var customOptions = scope.$eval($(element).attr('data-options'));
                // combine the two options objects
                for(var key in customOptions) {
                    defaultOptions[key] = customOptions[key];
                }
                // init carousel
                $(element).owlCarousel(defaultOptions);
            };
        }
    };
}).directive('owlCarouselItem', [function() {
        return {
            restrict: 'A',
            transclude: false,
            link: function(scope, element) {
                // wait for the last item in the ng-repeat then call init
                if(scope.$last) {
                    scope.initCarousel(element.parent());
                }
            }
        };
    }]);