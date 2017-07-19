 /*  
	* controller Name  - MainCtrl
	* Created By   - Vaibhav Godambe
	* Created On   - 2 dec 2016
	* Modified By  - 
	* Modified On  - 
	* Purpose      - This contoller is use to Set page title
*/ 

myApp.controller('MainCtrl', function($scope,Page,$location){

  $scope.Page = Page;// Page Title

    $scope.signupregister =  function(){
        angular.element('#SignupModal').modal('show');
        angular.element('body').removeAttr('style');
        angular.element('body').addClass('body-adjs');
        angular.element('body').removeAttr('style');

    }

    $scope.forgotpassword = function() {
        angular.element('#ForgotPassModal').modal('show');
        angular.element('body').removeAttr('style');
        angular.element('body').addClass('body-adjs');
        angular.element('body').removeAttr('style');
    }
});