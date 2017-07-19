myApp.controller('registerCtrl', function($scope,$route,$rootScope,$location,$cookies,$cookieStore,Page,baseURl,errorMessage,$http,sessionmaintain,getcategorydetails,ContextPath,$timeout){

    var vm = $scope;

    Page.setTitle('Register'); // To set Page Title using factory

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
     * Method Name  - signupForm
     * Created By   -Sagar Thombare
     * Created On   - 22 June 2017
     * Modified By  -
     * Modified On  -
     * Purpose      - This method is use to signup form
     */

    //config parameter is need to send client data to server in ajaxrequest
    var signupconfig = {
        headers : {
            'Accept' : 'application/json',
            'Content-Type': 'application/json',
        }
    }
    vm.registerUser = function(signup){

        vm.register=true;
        vm.checkmobilenumber = true;
        vm.checkemailaddress = true;
        vm.checkusername = true;

        if(signup.$valid && vm.showerror == false && vm.showmobileSuccess == true && vm.showemailSuccess == true && vm.showusrnameSuccess == true)
        {
            //   alert("firstname : " + vm.fName + " middlename : " + vm.mName + " lastname : " + vm.lName + " Gender : " + vm.radioG  + " Company Name : " + vm.coName + " mobile number : " + vm.cNumber + " emailid : " + vm.emailId + " vm.username : " + vm.uName + " password : " + vm.password + " con pass : " + vm.cpassword);



            var data = {
                firstName : vm.firstname,
                lastName: vm.lastname,
                gender: vm.gender,
                mobile: vm.contactnumber,
                email: vm.emailid,
                username: vm.username,
                password: vm.password
            };

           // console.log(" Signup Request Data  : " + JSON.stringify(data));

            $('#register-button').waitMe(trans);

            $http.post(ContextPath +'/api/v1/users', data, signupconfig)
                .success(function (data, status , headers, signupconfig) {

                   // console.log('Signup user : ' + JSON.stringify(data));
                    //console.log('Signup user status : ' + status);

                    //console.log('Signup user : ' + JSON.stringify(data._links.self.href));

                    var userlink = data._links.self.href; // user link

                    //console.log('userlink : ' + userlink);

                    // organization  data
                    var orgdata = {
                        organization : vm.companyname,
                        user: userlink,
                    };

                    // organization post call
                    $http.post(ContextPath +'/api/v1/organizations', orgdata, signupconfig)
                        .success(function (data, status , headers, signupconfig) {
                          //  console.log('Org data : ' + JSON.stringify(data));
                            //console.log('Org status : ' + status);
                            vm.registeredSuccess=true;
                            $('#register-button').waitMe('hide');
                        })
                        .error(function (data, status, headers, signupconfig) {
                            $('#register-button').waitMe('hide');
                            //console.log("Org Error Data : " +data);
                            //console.log("Org Error Status : " +status);
                        });



                   // angular.element("#SignupModal").modal('hide'); // hide signup modal

                    $timeout( function(){
                         $location.path('/home');
                    }, 5000 );

                })
                .error(function (data, status, headers, signupconfig) {

                    $('#register-button').waitMe('hide');

                    //console.log("Signup Error Data : " +data);
                    //console.log("Signup Error Status : " +status);
                });
        }


    }


    /*
     * Method Name  - chkMobileNumAvail
     * Created By   - Sagar Thombare
     * Created On   - 22 June 2017
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



    vm.chkMobileNumAvail = function (signup) {
        vm.showmobileerror = false;
        vm.showmobileSuccess = false;
        vm.showcheckingmobile = false;

        //alert(" In chkMobileNumAvail");

        //if(vm.cNumber != '' || vm.cNumber != undefined)
        if(signup.contactnumber.$valid)
        {
            vm.showcheckingmobile = true;
            vm.checkmobilenumber = false;

            //alert("chkMobileNumAvail valid");

            console.log('Before  Contact Number : ' + vm.contactnumber );
            vm.contactnumber = '+'+ vm.contactnumber;
            vm.regContactNumber = vm.contactnumber.split("+").join("%2B");
            console.log('After Contact Number : ' + vm.contactnumber );

            $http.get(ContextPath +'/api/v1/users/search/findByMobile?mobile='+ vm.regContactNumber, chkavailconfig)
                .success(function (data, status) {
                    //console.log('Mobile No Availability  : ' + JSON.stringify(data));
                    //console.log('Mobile No Availability status : ' + status);
                    vm.showmobileerror = true;
                    vm.showcheckingmobile = false;
                })
                .error(function (data, status) {
                    vm.showmobileSuccess = true;
                    vm.showcheckingmobile = false;
                    //console.log("Mobile No Availability Error Data : " +data);
                    //console.log("Mobile No Availability Error Status : " +status);
                });
        }
        else{
            //alert("chkMobileNumAvail valid");
            vm.checkmobilenumber = true;
            vm.showcheckingmobile = false;
        }

    }



    /*
     * factory Name  - chkEmailIdAvail
     * Created By   - Sagar Thombare
     * Created On   - 22 June 2017
     * Modified By  -
     * Modified On  -
     * Purpose      - This method is used to check availability email id.
     */
    vm.chkEmailIdAvail = function (signup) {
        /* var data = $.param({
         email: vm.emailId,
         });*/
        //alert(vm.emailId);
        //console.log(" data  : " + JSON.stringify(data));

        vm.showemailerror = false;
        vm.showemailSuccess = false;
        vm.showcheckingemail = false;


        if(signup.emailid.$valid)
        {
            vm.showcheckingemail = true;
            vm.checkemailaddress = false;

            $http.get(ContextPath +'/api/v1/users/search/findByEmail?email=' +vm.emailid, chkavailconfig)
                .success(function (data, status) {

                    //console.log('Email Id Availability  : ' + JSON.stringify(data));
                    //console.log('Email Id Availability status : ' + status);
                    vm.showemailerror = true;
                    vm.showcheckingemail = false;

                })
                .error(function (data, status) {
                    vm.showemailSuccess = true;
                    vm.showcheckingemail = false;
                    //console.log("Email Id Availability Error Data : " +data);
                    //console.log("Email Id Availability Error Status : " +status);
                });
        }
        else{
            vm.checkemailaddress = true;
            vm.showcheckingemail = false;
        }


    }




    /*
     * factory Name  - chkUsrnameAvail
     * Created By   - Sagar Thombare
     * Created On   - 22 June 2017
     * Modified By  -
     * Modified On  -
     * Purpose      - This method is used to check availability user name.
     */
    vm.chkUsrnameAvail = function (signup) {

        vm.showusrnameerror = false;
        vm.showusrnameSuccess = false;
        vm.showcheckingusrname = false;

        if(signup.username.$valid)
        {
            vm.showcheckingusrname = true;
            vm.checkusername = false;

            $http.get(ContextPath +'/api/v1/users/search/findByUsername?username=' +vm.username, chkavailconfig)
                .success(function (data, status) {

                    //console.log('Username Availability  : ' + JSON.stringify(data));
                    //console.log('Username Availability status : ' + status);
                    vm.showusrnameerror = true;
                    vm.showcheckingusrname = false;
                })
                .error(function (data, status) {
                    vm.showusrnameSuccess = true;
                    vm.showcheckingusrname = false;
                    //console.log("Username Availability Error Data : " +data);
                    //console.log("Username Availability Error Status : " +status);
                });
        }
        else {
            vm.checkusername = true;
            vm.showcheckingusrname = false;
        }

    }



    /*
     * Method Name  - addPlusSign
     * Created By   - Sagar Thombare
     * Created On   - 22 June 2017
     * Modified By  -
     * Modified On  -
     * Purpose      - This method is used to addPlusSign in to text box.
     */

    vm.addPlusSign = function () {
        vm.contactnumber='+';
        console.log('Set Plus sign '+vm.contactnumber);
    }




    /*
     * Method Name  - checkPlusSign
     * Created By   - Sagar Thombare
     * Created On   - 23 June 2017
     * Modified By  -
     * Modified On  -
     * Purpose      - This method is used to check double plus sign in contact number.
     */
    vm.checkPlusSign = function(){
        if(signup.contactnumber.$valid){
            var pos = vm.contactnumber.indexOf("++");
            if(pos==0){
                vm.contactnumber=vm.contactnumber.slice(1);
            }
            console.log('Contact number checkPlusSign'+  vm.contactnumber);
        }

    }




    /*
     * Method Name  - matchPassword
     * Created By   - Sagar Thombare
     * Created On   - 21 June 2017
     * Modified By  -
     * Modified On  -
     * Purpose      - This method is used to match password and confirm password
     */
    vm.matchPassword= function(){
        if(vm.password == vm.cpassword){
            vm.showerror = false;
        }else{
            vm.showerror = true;
        }
    }//close matchPassword






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




    //Set Loader Type
    var trans = {
        effect : 'facebook',
        text : '',
        bg : 'rgba(255,255,255,0.7)',
        color : '#000',
        sizeW : '',
        sizeH : '',
        source : ''
    };


});



