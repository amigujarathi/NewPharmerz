myApp.controller('loginCtrl', function($scope,$route,$rootScope,$location,$cookies,$cookieStore,Page,baseURl,errorMessage,$http,sessionmaintain,getcategorydetails,ContextPath,$timeout){

    var vm = $scope;

    Page.setTitle('Login');     // To set Page Title using factory

    //error messages from custom factory method.
    vm.errorMessage=errorMessage;

    //config parameter is need to send client data to server in ajaxrequest
    var config = {
        headers : {
            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
        }
    }



    /*
     * Method Name  - getClass
     * Created By   - Vaibhav Godambe
     * Created On   - 24 nov 2016
     * Modified By  -
     * Modified On  -
     * Purpose      - This method is use to Manage active class for side bar menu.
     */
    $scope.getClass = function (path) {
        return ($location.path().substr(0, path.length) === path) ? 'activenav' : '';
    }


    /*
     * Method Name  - loginForm
     * Created By   - Sagar Thombare
     * Created On   - 22 June 2017
     * Modified By  -
     * Modified On  -
     * Purpose      - This method is use to validate the login form
     */



    vm.loginForm = function(myForm,params){
        vm.submitted=true;

        vm.invalidusrpass = false;

        if(myForm.$valid)
        {

            var data = $.param({
                username: vm.username,
                password: vm.password,
            });

            $('#login-box').waitMe(trans);

            $http.post(ContextPath +'/login', data, config)
                .success(function (data, status, headers, config) {
                    $('#login-box').waitMe('hide');

                    //angular.element(".modal-backdrop").removeClass('in');
                    angular.element('.modal-backdrop').remove();
                    angular.element('body').removeClass('modal-open');
                    angular.element('body').removeAttr('style');

                    //console.log('Loginsucess   :   ' + JSON.stringify(data));
                    //console.log('Loginsucess status : ' + status);

                    var config = {
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
                        }
                    }

                    // get call for user details after login
                    $http.get(ContextPath + '/user', config)
                        .success(function (data, status , config) {
                            console.log('User data login page   :   ' + JSON.stringify(data));
                            //console.log('userdata status : ' + status);
                            vm.fullname = data.firstName + ' ' + data.lastName; // set fullname
                            //console.log('User fullname : ' + vm.fullname);
                            vm.userId = data.id; // user id get
                            //console.log('User Id : ' + vm.userId);
                            $cookies.put('UserId', vm.userId); // Set Cookie for User Id
                            $cookies.put('UserFullName', vm.fullname); // Set Cookie for User fullname
                            $cookies.put('UserFirstname', data.firstName); // Set Cookies for User first name

                            $cookies.put('UserEmailId', data.email); // Set Cookie for User EmailId
                            $cookies.put('UserMobile', data.mobile); // Set Cookies for User Mobile


                            localStorage.setItem('user',true);// set item from session

                            if(vm.senenqsession)
                            {
                                vm.senenqsession = false;
                                $location.path('/sendenquiry'); // move to send enquiry
                                //window.location.reload(true);
                            }
                            else{

                                $location.path('/admindashbord'); // move to admin home
                                //window.location.reload(true);
                            }


                        }).error(function (data, status, config) {
                        //console.log("Error Data : " +data);
                        //console.log("Error Status : " +status);
                    });
                })
                .error(function (data, status, headers, config) {
                    $('#login-box').waitMe('hide');
                    vm.invalidusrpass = true;
                    angular.element("#input-box-icon").attr('style','top: 40%;cursor: pointer;pointer-events: all;');
                    console.log("Error Data : " +data);
                    //console.log("Error Status : " +status);
                });


        }
    }



    /*
     * Method Name  - checkPasswordIcon
     * Created By   - Sagar Thombare
     * Created On   - 27 June 2017
     * Modified By  -
     * Modified On  -
     * Purpose      - This method is used to adjust password icon dynamically
     */
    vm.checkPasswordIcon = function(myForm){
        vm.invalidusrpass = false;
        if(vm.submitted){

            if(myForm.username.$invalid && myForm.password.$valid){
                //alert('username');
                angular.element("#input-box-icon").attr('style','top: 48%;cursor: pointer;pointer-events: all;');
            }

            if(myForm.username.$valid && myForm.password.$invalid){
                //alert('password');
                angular.element("#input-box-icon").attr('style','top: 42%;cursor: pointer;pointer-events: all;');
            }

            if(myForm.username.$invalid && myForm.password.$invalid){
                //alert('both');
                angular.element("#input-box-icon").attr('style','top: 45%;cursor: pointer;pointer-events: all;');
            }

            if(myForm.username.$valid && myForm.password.$valid){
                //alert('both');
                angular.element("#input-box-icon").attr('style','top: 45%;cursor: pointer;pointer-events: all;');
            }

        }

    }




    /*
     * Method Name  - cancelButton
     * Created By   - Sagar Thombare
     * Created On   - 20 June 2017
     * Modified By  -
     * Modified On  -
     * Purpose      - This method is use to handle cancel button functionality.
     */
    vm.cancelButton = function(){
        $location.path('/home');
    }



    /*
     * Method Name  - chkMobileNumAvail
     * Created By   - vaibhav godambe
     * Created On   - 21 dec 2016
     * Modified By  -
     * Modified On  -
     * Purpose      - This method is used to check availability mobile number.
     */

    //config parameter is need to send client data to server in ajaxrequest
    var chkavailconfig = {
        headers : {
            'Accept' : 'application/json',
            'Content-Type': 'application/json',
        }
    }



//Loader Ttype

    var trans = {
        effect : 'facebook',
        text : '',
        bg : 'rgba(255,255,255,0.7)',
        color : '#000',
        sizeW : '',
        sizeH : '',
        source : ''
    };





    /*
     * Method Name  - mediaquries for angualrjs
     * Created By   - Vaibhav Godambe
     * Created On   - 1 dec 2016
     * Modified By  -
     * Modified On  -
     * Purpose      - This method is use to handle mediaquries using angualr
     */

    /*if (window.matchMedia("(max-width: 960px)").matches) {
     angular.element('#counting-right-box').addClass('col-sm-offset-2');
     } else {
     angular.element('#counting-right-bo').removeClass('col-sm-offset-2');
     }*/


});



