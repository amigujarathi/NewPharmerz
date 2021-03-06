myApp.controller('ReceivedEnqCtrl', function($scope,$rootScope,$route,baseURl,$location,$cookies,errorMessage,Page,$http,DTOptionsBuilder, DTColumnBuilder,sessionmaintain,sessionout,ContextPath,$filter,Upload,$timeout) {
    var vm = $scope;
    // alert("Product id : " + $rootScope.productid_sendenq);

    //error messages from custom factory method.
    vm.errorMessage=errorMessage;

    Page.setTitle('Received Enquiry details'); // To set Page Title using factory
    /*
     * factory Name  - sessionmaintain
     * Created By   - vaibhav godambe
     * Created On   - 16 dec 2016
     * Modified By  -
     * Modified On  -
     * Purpose      - This factory is used to maintain session .
     */

    // check session
    $scope.session = sessionmaintain.checksession();
    if($scope.session == false)
    {
        $location.path('/home');
    }
    else
    {
        $scope.showlogin = false;
        $scope.showlogout = true;
    }

    // Retrieving a cookie
    var userid_Cookie = $cookies.get('UserId'); // get user id cookies
    // Retrieving a cookie
    vm.fullname = $cookies.get('UserFullName'); // get user full name cookies
    // Retrieving a cookie
    var Orgnid_Cookie = $cookies.get('OrgnId'); // get orgn id cookies
    //console.log("Orgnid_Cookie : " +Orgnid_Cookie);
    // Retrieving a cookie
    var ReceivedEnqId_Cookie = $cookies.get('ReceivedEnqId'); // get ReceivedEnqId cookies
    //console.log("ReceivedEnqId_Cookie : " +ReceivedEnqId_Cookie);


    vm.verifyUsrId = userid_Cookie.replace(/-/g , "").toUpperCase();
    //console.log("Converted user id : " +vm.verifyUsrId);


    /*
     * Api Name  - check verify email
     * Created By   - vaibhav godambe
     * Created On   - 5 april 2017
     * Modified By  -
     * Modified On  -
     * Purpose      - This api is used to check verify email details.
     */

    var emailflagconfig = {
        headers : {
            'Accept' : 'application/json',
            'Content-Type': 'application/json',
        }
    }

    $http.get( ContextPath +'/api/v1/emailflagverification/'+ vm.verifyUsrId, emailflagconfig)
        .success(function(data,status){
           //console.log("emailflag success data : " + JSON.stringify(data));
           //console.log("emailflag success sataus : " + status);

            vm.emailverified = data.verified;
            //console.log("emailverified : " + vm.emailverified);

            if(vm.emailverified == 1)
            {
                vm.veriEmail = true;
            }

        })
        .error(function(data,status){
            if(status == 400)
            {
                vm.veriEmail = false;
                vm.emailverified = 0;
            }
          //console.log("emailflag error data : " + data);
          //console.log("emailflag error status : " + status);

        });


    /*
     * Api Name  - check verify mobile
     * Created By   - vaibhav godambe
     * Created On   - 5 april 2017
     * Modified By  -
     * Modified On  -
     * Purpose      - This api is used to check verify mobile details.
     */

    var mobileflagconfig = {
        headers : {
            'Accept' : 'application/json',
            'Content-Type': 'application/json',
        }
    }

    $http.get( ContextPath +'/api/v1/mobileflagverification/'+ vm.verifyUsrId, mobileflagconfig)
        .success(function(data,status){
          //console.log("mobileflag success data : " + JSON.stringify(data));
          //console.log("mobileflag success sataus : " + status);

            vm.mobileverified = data.verified;
            //console.log("mobileverified : " + vm.mobileverified);

            if(vm.mobileverified == 1)
            {
                vm.veriMobile = true;
            }

        })
        .error(function(data,status){
            if(status == 400)
            {
                vm.veriMobile = false;
                vm.mobileverified = 0;
            }
         //console.log("mobileflag error data : " + data);
         //console.log("mobileflag error status : " + status);
        });




    //config parameter is need to send client data to server in ajax request
    var getenqdtlsconfig = {
        headers : {
            'Accept' : 'application/json',
            'Content-Type': 'application/json',
        }
    }



    // Receiver enq Tab
    $http.get(ContextPath +'/api/v1/enquiries/'+ ReceivedEnqId_Cookie +'?projection=detail' , getenqdtlsconfig)
        .success(function (data, status) {
           //console.log('Received Enquires details  : ' + JSON.stringify(data));
           //console.log('Received Enquires details status : ' + status);

            vm.EnqReceiveddata = data; // Received

           vm.receivedEnquiryId = data.id;
           vm.orgName = data.senderOrganization.organization;
           vm.emailid = data.senderOrganization.createdBy;
           vm.productName =  data.product.product;
           vm.composition = data.product.composition;
           vm.qty =  data.quantity;
           vm.uom =   data.unitOfMeasurement.uom;
           vm.location = data.location.location +' '+data.location.addressLine1 +' '+ data.location.addressLine2 +' '+ data.location.city +','+ data.location.region +' - '+ data.location.postalCode ;
           vm.currency =  data.currency;
           vm.incoterm = data.incoterm;
           vm.sendenqShipBy = data.shipmentBy;
            //console.log("Received Enquiry shipmentby : " +vm.sendenqShipBy);
            //console.log("Received Enquiry typeof shipmentby" + typeof vm.sendenqShipBy);

           vm.status = data.status;

           if(vm.status == "ACCEPTED")
           {
               vm.btndisabled = true;
               vm.enabled = true;
           }

           if(vm.status == "QUOTATION")
           {
               vm.btndisabled = true;
               vm.enabled = false;
           }

          //console.log('shipmentby value : ' + vm.shipmentby);
           vm.msg = data.message;
           vm.senderorgId =  data.senderOrganization.id;

           // sender org dropdown info
            $http.get(ContextPath +'/api/v1/organizations/'+ vm.senderorgId +'/user' , getenqdtlsconfig)
                .success(function (data, status) {
                   //console.log('senderOrganization details  : ' + JSON.stringify(data));
                   //console.log('senderOrganization details status : ' + status);

                    vm.SenderOrgUsrName = data.username;
                    vm.SenderOrgEmail = data.email;
                    vm.SenderOrgMobile = data.mobile;

                }).error(function (data, status) {
                sessionout.checksessionout(status);
                //console.log("senderOrganization details Error Data : " +data);
                //console.log("senderOrganization details Error Status : " +status);
            });

        })
        .error(function (data, status) {
            sessionout.checksessionout(status);
            //console.log("Received Enquires details Error Data : " +data);
            //console.log("Received Enquires details Error Status : " +status);
        });

    /*
     * method Name  - GenrateQuotation
     * Created By   - vaibhav godambe
     * Created On   - 27 jan 2017
     * Modified By  -
     * Modified On  -
     * Purpose      - This method is used to move to GenrateQuotation screen.
     */
    vm.GenrateQuotation = function(){
        $location.path('/generatequotation'); //  move to the GenrateQuotation screen

    }


    /*
     * method Name  - changeEnquiryStatus
     * Created By   - vaibhav godambe
     * Created On   - 4 april 2017
     * Modified By  -
     * Modified On  -
     * Purpose      - This method is used to change the status.
     */

    //config parameter is need to send client data to server in ajaxrequest
    var updatestatusconfig = {
        headers : {
            'Accept' : 'application/json',
            'Content-Type': 'application/json',
        }
    }

    vm.changeEnquiryStatus = function () {

        vm.sendrequestUpdateEnquiryStatus = true;

        var data = {
            status : 'ACCEPTED',
        };

        //console.log('Enquiry status : ' + JSON.stringify(data));

        //console.log('Enq id: ' + vm.receivedEnquiryId);

        $http.patch(ContextPath +'/api/v1/enquiries/'+vm.receivedEnquiryId, data ,updatestatusconfig)
            .success(function (data, status) {
                //console.log('Enquiry status update details  : ' + JSON.stringify(data));
                //console.log('Enquiry status update status : ' + status);
                vm.sendrequestUpdateEnquiryStatus = false;
                if(vm.status == "ACCEPTED")
                {
                    vm.btndisabled = true;
                    vm.enabled = true;
                }

            })
            .error(function (data, status) {
                vm.sendrequestUpdateEnquiryStatus = false;
                sessionout.checksessionout(status);
                //console.log('Enquiry status update Error details  : ' + JSON.stringify(data));
                //console.log('Enquiry status update Error status : ' + status);
            });

    }



    /*
     * Method Name  - countrycodedata
     * Created By   - Vaibhav Godambe
     * Created On   - 22 Feb 2017
     * Modified By  -
     * Modified On  -
     * Purpose      - This method is use to get country code
     */

    //config parameter is need to send client data to server in ajaxrequest
    var getcountrycodeconfig = {
        headers : {
            'Accept' : 'application/json',
            'Content-Type': 'application/json',
        }
    }

    $http.get(ContextPath +'/api/v1/countries?size=233', getcountrycodeconfig)
        .success(function (data, status) {

           //console.log('Countries vice currency details  : ' + JSON.stringify(data));
           //console.log('Countries vice currency status : ' + status);

            vm.countrydata = data._embedded.countries;

        })
        .error(function (data, status) {
            //console.log("Countries vice currency Error Data : " +data);
            //console.log("Countries vice currency Error Status : " +status);
        });


    /*
     * Api Name  - To get edit profile data
     * Created By   - vaibhav godambe
     * Created On   - 13 feb 2017
     * Modified By  -
     * Modified On  -
     * Purpose      - This Api is used to get edit profile data.
     */

    //config parameter is need to send client data to server in ajax request
    var getuserdetailsconfig = {
        headers : {
            'Accept' : 'application/json',
            'Content-Type': 'application/json',
        }
    }


    vm.getUsrDetails = function () {
        $http.get(ContextPath +'/api/v1/users/'+userid_Cookie, getuserdetailsconfig)
            .success(function (data, status) {
               //console.log('User details  : ' + JSON.stringify(data));
               //console.log('User details status : ' + status);

                vm.fName = data.firstName;
                vm.lName = data.lastName;
              vm.adminName = vm.fName + ' ' + vm.lName;
                vm.mName = data.middleName;
                vm.radioG = data.gender;
                vm.cNumber = data.mobile;
                vm.emailId = data.email;
                vm.uName = data.username;
                //vm.password = data.password;
                //vm.cpassword = data.password;


                vm.TempCNumber = data.mobile; // temp variable
                vm.TempemailId = data.email; // temp variable
                vm.TempuName = data.username; // temp variable



            })
            .error(function (data, status) {
                sessionout.checksessionout(status);
                //console.log("User details Error Data : " +data);
                //console.log("User details Error Status : " +status);
            });
    }




    /*
     * Api Name  - To get edit profile data
     * Created By   - vaibhav godambe
     * Created On   - 10 feb 2017
     * Modified By  -
     * Modified On  -
     * Purpose      - This Api is used to get edit profile data.
     */

    //config parameter is need to send client data to server in ajax request
    var getuserdetailsconfig = {
        headers : {
            'Accept' : 'application/json',
            'Content-Type': 'application/json',
        }
    }

    vm.getOrgDetails = function () {

        $http.get(ContextPath +'/api/v1/users/'+ userid_Cookie +'/organization',getuserdetailsconfig)
            .success(function(data,status){
               //console.log('Organization details  : ' + JSON.stringify(data));
               //console.log('Organization details status : ' + status);

                vm.coName = data.organization;
            })
            .error(function(data,status){
                sessionout.checksessionout(status);
                //console.log("Organization details Error Data : " +data);
                //console.log("Organization details Error Status : " +status);
            });
    }



    /*
     * Medthod Name  - showeditprofile
     * Created By   - vaibhav godambe
     * Created On   - 10 feb 2017
     * Modified By  -
     * Modified On  -
     * Purpose      - This method is used to open editprofile modal.
     */

    vm.showeditprofile = function () {
        angular.element('#EditProfileModal').modal('show');
        // call the function
        vm.getUsrDetails();
        vm.getOrgDetails();

    }



    /*
     * Method Name  - hideShowPassword
     * Created By   - Vaibhav Godambe
     * Created On   - 13 feb 2017
     * Modified By  -
     * Modified On  -
     * Purpose      - This method is use to hideShowPassword in signup form
     */

    // Set the default value of inputType
    vm.inputType = 'password';

    // Hide & show password function
    vm.hideShowPassword = function(){
        if ($scope.inputType == 'password')
            $scope.inputType = 'text';
        else
            $scope.inputType = 'password';
    };

    /*
     * Method Name  - resetEditprofile
     * Created By   - Vaibhav Godambe
     * Created On   - 20 March 2017
     * Modified By  -
     * Modified On  -
     * Purpose      - This method is use to reset all field data
     */

    vm.resetEditprofile = function () {
        vm.editPro = false;
        vm.checkmobilenumber = false;
        vm.checkemailaddress = false;
        vm.checkusername = false;
        vm.showerror = false ;


        vm.showmobileSuccess = false;
        vm.showemailSuccess = false;
        vm.showusrnameSuccess = false;
        vm.showmobileerror = false;
        vm.showemailerror = false;
        vm.showusrnameerror = false;

    }

    /*
     * Method Name  - EditprofileForm
     * Created By   - Vaibhav Godambe
     * Created On   - 13 feb 2017
     * Modified By  -
     * Modified On  -
     * Purpose      - This method is use to Edit Profile Form
     */

    //config parameter is need to send client data to server in ajaxrequest
    var signupconfig = {
        headers : {
            'Accept' : 'application/json',
            'Content-Type': 'application/json',
        }
    }

    vm.EditprofileForm = function(editprofile){

        vm.editPro=true;
        vm.checkmobilenumber = true;
        vm.checkemailaddress = true;
        vm.checkusername = true;

        if(vm.focasedMobile != true)
        {
            vm.showmobileSuccess = true;
        }
        if(vm.focasedEmail != true)
        {
            vm.showemailSuccess = true;
        }
        if(vm.focasedUserName != true)
        {
            vm.showusrnameSuccess = true;
        }

        if(vm.password == null && vm.cpassword == null)
        {
            vm.showerror = false;
        }


        if(editprofile.$valid && vm.showerror == false && vm.showmobileSuccess == true && vm.showemailSuccess == true && vm.showusrnameSuccess == true)
        {

            vm.showmobileSuccess = false;
            vm.showemailSuccess = false;
            vm.showusrnameSuccess = false;

            vm.sendrequestupdateprofile = true;

            // To Verify data
            vm.getstausPlusSign = vm.cNumber.indexOf("+");

            if(vm.getstausPlusSign == 0)
            {
                vm.cNumber =  vm.cNumber;
            }
            else if(vm.getstausPlusSign == -1)
            {
                vm.cNumber = "+" + vm.cNumber;
            }


            var data = {
                firstName : vm.fName,
                lastName: vm.lName,
                middleName: vm.mName,
                gender: vm.radioG,
                mobile: vm.cNumber,
                email: vm.emailId,
                username: vm.uName,
                password: vm.password,
            };

            //console.log(" data  : " + JSON.stringify(data));

            $http.patch(ContextPath +'/api/v1/users/'+userid_Cookie, data, signupconfig)
                .success(function (data, status , headers, signupconfig) {

                    //console.log('Edit Profile  : ' + JSON.stringify(data));
                   //console.log('Edit Profile status : ' + status);

                    //console.log('Edit Profile : ' + JSON.stringify(data._links.self.href));

                    var userlink = data._links.self.href; // user link
                    //console.log('userlink : ' + userlink);


                    vm.updateOrgnizationIdCookie =  $cookies.get('OrgnId'); // get Cookie for Orgn Id
                    //console.log('Update OrgnizationId Cookie : ' + vm.updateOrgnizationIdCookie);


                    // organization  data
                    var orgdata = {
                        organization : vm.coName,
                    };
                    //console.log('Update orgn data   : ' + JSON.stringify(orgdata));

                    // organization patch call
                    $http.patch(ContextPath +'/api/v1/organizations/'+vm.updateOrgnizationIdCookie, orgdata, signupconfig)
                        .success(function (data, status , headers, signupconfig) {
                           //console.log('Org data : ' + JSON.stringify(data));
                            //console.log('Org status : ' + status);
                        })
                        .error(function (data, status, headers, signupconfig) {
                            sessionout.checksessionout(status);
                           //console.log("Org Error Data : " +data);
                            //console.log("Org Error Status : " +status);
                        });

                    // To Verify data

                    var UserVerifyData = {
                        id: userid_Cookie,
                        mobile: vm.cNumber,
                        email: vm.emailId,
                    };

                    //console.log('UserVerifyData   : ' + JSON.stringify(UserVerifyData));

                    // UserVerifyData  call
                    $http.post(ContextPath +'/api/v1/edituser', UserVerifyData, signupconfig)
                        .success(function (data, status , headers, signupconfig) {
                            //console.log('Org data : ' + JSON.stringify(data));
                            //console.log('Org status : ' + status);
                        })
                        .error(function (data, status, headers, signupconfig) {
                            sessionout.checksessionout(status);
                            //console.log("Org Error Data : " +data);
                            //console.log("Org Error Status : " +status);
                        });

                    vm.sendrequestupdateprofile = false;

                    angular.element('.modal-backdrop').remove();
                    angular.element('body').removeClass('modal-open');
                    angular.element('body').removeAttr('style');
                    angular.element('#EditProfileModal').css('display','none');
                    $route.reload();

                })
                .error(function (data, status, headers, signupconfig) {
                    vm.sendrequestupdateprofile = false;
                    sessionout.checksessionout(status);
                   //console.log("Edit Profile Error Data : " +data);
                    //console.log("Edit Profile Error Status : " +status);
                });
        }
    }


    /*
     * Method Name  - chkMobileNumAvail
     * Created By   - vaibhav godambe
     * Created On   - 13 feb 2017
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

    vm.chkMobileNumAvail = function (editprofile) {
        vm.showmobileerror = false;
        vm.showmobileSuccess = false;
        vm.showcheckingmobile = false;
        vm.focasedMobile = true;

        //if(vm.cNumber != '' || vm.cNumber != undefined)
        if(editprofile.contactnumber.$valid)
        {
            vm.showcheckingmobile = true;
            vm.checkmobilenumber = false;

           //console.log('cNumber : ' + vm.cNumber );
            vm.cNumbers = vm.cNumber;
            vm.cNumbers = '+' + vm.cNumber;
            vm.regContactNumber = vm.cNumbers.split("+").join("%2B");
            //console.log('cNumber : ' + vm.regContactNumber );

            if(vm.cNumbers != vm.TempCNumber)
            {
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
                        sessionout.checksessionout(status);
                       //console.log("Mobile No Availability Error Data : " +data);
                       //console.log("Mobile No Availability Error Status : " +status);
                    });
            }
            else
            {
                vm.showcheckingmobile = false;
                vm.showmobileSuccess = true;
            }

        }
        else{
            vm.checkmobilenumber = true;
            vm.showcheckingmobile = false;
        }

    }

    /*
     * factory Name  - chkEmailIdAvail
     * Created By   - vaibhav godambe
     * Created On   - 13 feb 2017
     * Modified By  -
     * Modified On  -
     * Purpose      - This method is used to check availability email id.
     */
    vm.chkEmailIdAvail = function (editprofile) {
        vm.showemailerror = false;
        vm.showemailSuccess = false;
        vm.showcheckingemail = false;
        vm.focasedEmail = true;

        if(editprofile.emailid.$valid)
        {
            vm.showcheckingemail = true;
            vm.checkemailaddress = false;

            if(vm.emailId != vm.TempemailId)
            {
                $http.get(ContextPath + '/api/v1/users/search/findByEmail?email=' + vm.emailId, chkavailconfig)
                    .success(function (data, status) {

                       //console.log('Email Id Availability  : ' + JSON.stringify(data));
                       //console.log('Email Id Availability status : ' + status);
                        vm.showemailerror = true;
                        vm.showcheckingemail = false;

                    })
                    .error(function (data, status) {
                        vm.showemailSuccess = true;
                        vm.showcheckingemail = false;
                        sessionout.checksessionout(status);
                       //console.log("Email Id Availability Error Data : " +data);
                       //console.log("Email Id Availability Error Status : " +status);
                    });
            }
            else
            {
                vm.showemailSuccess = true;
                vm.showcheckingemail = false;
            }
        }
        else{
            vm.checkemailaddress = true;
            vm.showcheckingemail = false;
        }


    }

    /*
     * factory Name  - chkUsrnameAvail
     * Created By   - vaibhav godambe
     * Created On   - 21 dec 2016
     * Modified By  -
     * Modified On  -
     * Purpose      - This method is used to check availability user name.
     */
    vm.chkUsrnameAvail = function (editprofile) {

        vm.showusrnameerror = false;
        vm.showusrnameSuccess = false;
        vm.showcheckingusrname = false;
        vm.focasedUserName = true;

        if(editprofile.username.$valid)
        {
            vm.showcheckingusrname = true;
            vm.checkusername = false;

            if(vm.uName != vm.TempuName)
            {
                $http.get(ContextPath + '/api/v1/users/search/findByUsername?username=' + vm.uName, chkavailconfig)
                    .success(function (data, status) {

                       //console.log('Username Availability  : ' + JSON.stringify(data));
                       //console.log('Username Availability status : ' + status);
                        vm.showusrnameerror = true;
                        vm.showcheckingusrname = false;
                    })
                    .error(function (data, status) {
                        vm.showusrnameSuccess = true;
                        vm.showcheckingusrname = false;
                        sessionout.checksessionout(status);
                       //console.log("Username Availability Error Data : " +data);
                       //console.log("Username Availability Error Status : " +status);
                    });
            }
            else
            {
                vm.showusrnameSuccess = true;
                vm.showcheckingusrname = false;

            }
        }
        else {
            vm.checkusername = true;
            vm.showcheckingusrname = false;
        }

    }

    /*
     * Method Name  - matchPassword
     * Created By   - Vaibhav Godambe
     * Created On   - 13 feb 2017
     * Modified By  -
     * Modified On  -
     * Purpose      - This method is use to match password from password filed
     */


    vm.matchPassword = function(){
        if(vm.password == vm.cpassword)
        {
            vm.showerror = false;
        }
        else
        {
            vm.showerror = true;
        }
    }//close matchPassword



    /*--------------------------------
     Sample Chat Code
     ---------------------------------*/
    angular.element("#enquirychat_window").css('display','block'); //default


    // Assign  the key
    var publish_key = 'pub-c-14a07f89-d575-44bb-9177-580dc1990ee5';
    var subscribe_key = 'sub-c-e0b973a6-eec9-11e6-94bb-0619f8945a4f';

    vm.channel = ReceivedEnqId_Cookie + 'enq' ; // Unique channel Id

    //console.log("Channel name: " + vm.channel);

    var username = vm.fullname; // set username

    // Intialize the key
    pubnub = PUBNUB.init({
        publish_key : publish_key,
        subscribe_key : subscribe_key,
        uuid : username,
        ssl : true
    });

    vm.chatwindowhisory = function () {

        vm.currentDate = new Date();
        vm.convertDatetime = vm.currentDate.getTime();
        vm.startunixtime = Math.floor( vm.convertDatetime / 1000);

       //console.log(" unix start time : " +vm.startunixtime);

        var msgstr = '';

        pubnub.history(
            {
                channel: vm.channel,
                reverse: true, // Setting to true will traverse the time line in reverse starting with the oldest message first.
                count: 50, // how many items to fetch
                stringifiedTimeToken: true, // false is the default
                start: vm.startunixtime // start time token to fetch
            },
            function (status, response) {

               //console.log("history status: " +JSON.stringify(status));

                vm.historymsg = status[0];

               //console.log("historymsg : " + JSON.stringify(vm.historymsg));

               //console.log("arryavalue : " + vm.historymsg[0].userName + vm.historymsg[0].messageStr);

               //console.log("history response:" +response.message);

                vm.currentTime = $filter('date')(new Date(), 'h:mm a'); //12:05 PM
               //console.log("length : " +vm.historymsg.length);

                if(vm.historymsg.length != undefined || vm.historymsg.length != 0)
                {
                    for(var i = 0 ; i < vm.historymsg.length ; i++)
                    {

                        if(vm.historymsg[i].userName == vm.fullname)
                        {


                            msgstr += '<div class="row msg_container base_sent">'
                                + '<div class="col-md-10 col-xs-10 ">'
                                + '<div class="messages msg_sent">'
                                + '<p style="word-wrap: break-word;"><span style="font-size:11px;color:#ccc;">' + vm.historymsg[i].userName + '</span><br/>' + vm.historymsg[i].messageStr + '</p>'
                                + '<time datetime="currentTime">' + vm.currentTime + '</time>'
                                + '</div>'
                                + '</div>'
                                + '<div class="col-md-2 col-xs-2 avatar">'
                                + '<img src="http://www.bitrebels.com/wp-content/uploads/2011/02/Original-Facebook-Geek-Profile-Avatar-1.jpg" class=" img-responsive ">'
                                + '</div>'
                                + '</div>';
                        }
                        else
                        {

                            msgstr += '<div class="row msg_container base_receive">'
                                +'<div class="col-md-2 col-xs-2 avatar">'
                                +'<img src="http://www.bitrebels.com/wp-content/uploads/2011/02/Original-Facebook-Geek-Profile-Avatar-1.jpg" class=" img-responsive ">'
                                +'</div>'
                                +'<div class="col-xs-10 col-md-10">'
                                +'<div class="messages msg_receive">'
                                + '<p style="word-wrap: break-word;"><span style="font-size:11px;color:#ccc;">' + vm.historymsg[i].userName + '</span><br/>' + vm.historymsg[i].messageStr + '</p>'
                                + '<time datetime="currentTime">' + vm.currentTime + '</time>'
                                + '</div>'
                                + '</div>'
                                + '</div>';
                        }

                    }

                    $("#mychat").append(msgstr);
                }
            }
        );

    }

    // Received the message
    pubnub.subscribe({
        channel : vm.channel,
        callback : function(message) {

           //console.log("message object format : " + JSON.stringify(message));

            vm.currentTime = $filter('date')(new Date(), 'h:mm a'); //12:05 PM

            var getmsgstr = '';

            if(message.userName == vm.fullname)
            {
                getmsgstr +='<div class="row msg_container base_sent">'
                    +'<div class="col-md-10 col-xs-10 ">'
                    +'<div class="messages msg_sent">'
                    +'<p style="word-wrap: break-word;"><span style="font-size:11px;color:#ccc;">'+ message.userName +'</span><br/>'+ message.messageStr +'</p>'
                    +'<time datetime="currentTime">'+ vm.currentTime +'</time>'
                    +'</div>'
                    +'</div>'
                    +'<div class="col-md-2 col-xs-2 avatar">'
                    +'<img src="http://www.bitrebels.com/wp-content/uploads/2011/02/Original-Facebook-Geek-Profile-Avatar-1.jpg" class=" img-responsive ">'
                    +'</div>'
                    +'</div>';
            }
            else
            {
                getmsgstr += '<div class="row msg_container base_receive">'
                    +'<div class="col-md-2 col-xs-2 avatar">'
                    +'<img src="http://www.bitrebels.com/wp-content/uploads/2011/02/Original-Facebook-Geek-Profile-Avatar-1.jpg" class=" img-responsive ">'
                    +'</div>'
                    +'<div class="col-xs-10 col-md-10">'
                    +'<div class="messages msg_receive">'
                    + '<p style="word-wrap: break-word;"><span style="font-size:11px;color:#ccc;">' + message.userName + '</span><br/>' + message.messageStr + '</p>'
                    + '<time datetime="currentTime">' + vm.currentTime + '</time>'
                    + '</div>'
                    + '</div>'
                    + '</div>';
            }


            $("#mychat").append(getmsgstr);


        },
        presence : function(state) {
            if (state.action == 'join') {
            } else if (state.action == 'leave' || state.action == 'timeout') {
            }
        }
    });

    //Send the message
    pubnub.bind('click', pubnub.$('btn-chat'), function(e) {

        vm.data = {
            userName : pubnub.get_uuid(),
            messageStr : $('#btn-input').val()
        };

       //console.log("message object format : " + JSON.stringify(vm.data));

        pubnub.publish({
            channel : vm.channel,
            message : vm.data
            //message : pubnub.get_uuid() + ' : '  + $('#btn-input').val()
        });

        $('#btn-input').val('');
    });

    //Leave the channel
    vm.leave = function() {
        pubnub.unsubscribe({
            channel : vm.channel,
            callback : function() {
                angular.element("#enquirychat_window").css('display','none'); //default
                $("#mychat").empty();
               //console.log("Unsubscribe Channel");
            }
        });
    }





    /*----------Upload Code------------*/


   // $('#attachment').click(function() {
   //     $('button[type=file]').click();
   // });
    
    
    vm.openAttachFile = function () {
        //alert();
        // var fileuploader = angular.element("#attachment");
        //
        // fileuploader.on('click',function(){
       //console.log("File upload triggered programatically");
        // })
        // fileuploader.trigger('click')

        angular.element('button[type=file]').trigger('click');

    }

    var files = null;

    vm.imageUpload = function (event) {
        //alert();
        files = event.target.files; //FileList object

        var data = new FormData();
        data.append("obj_file", files[0]);

        //console.log("Data : " + data);
    }

    // Policy and Signature
    vm.policy = 'ewogICJleHBpcmF0aW9uIjogIjIwMjAtMDEtMDFUMDA6MDA6MDBaIiwKICAiY29uZGl0aW9ucyI6IFsKICAgIHsiYnVja2V0IjogInBoYXJtZXJ6LWNoYXQifSwKICAgIFsic3RhcnRzLXdpdGgiLCAiJGtleSIsICIiXSwKICAgIHsiYWNsIjogInByaXZhdGUifSwKICAgIFsic3RhcnRzLXdpdGgiLCAiJENvbnRlbnQtVHlwZSIsICIiXSwKICAgIFsic3RhcnRzLXdpdGgiLCAiJGZpbGVuYW1lIiwgIiJdLAogICAgWyJjb250ZW50LWxlbmd0aC1yYW5nZSIsIDAsIDUyNDI4ODAwMF0KICBdCn0=';
    vm.signature = 'Usf7t8jLp199rp2PtQ/a7nGarMk=';



    vm.uploadFiles = function(chatfile) {
        vm.chatfiles = chatfile;

        var file = vm.chatfiles;

        if(vm.chatfiles != null)
        {
            alert(vm.chatfiles);

            // Upload.dataUrl(vm.f, boolean).then(function(url){
           //console.log( "File " + url);
            // });


            var data = {
              filename : vm.chatfiles.name,
              fileObject : vm.chatfiles
            };
            //console.log( "File " + JSON.stringify(data));

            Upload.upload({
                    url: 'https://pharmerz-chat.s3.amazonaws.com/', //S3 upload url including bucket name
                    method: 'POST',
                    data: {
                        key: file.name, // the key to store the file on S3, could be file name or customized
                        AWSAccessKeyId: 'AKIAI5T24QARKTXLDXLQ',
                        acl: 'public-read', // sets the access to the uploaded file in the bucket: private, public-read, ...
                        policy: vm.policy, // base64-encoded json policy (see article below)
                        signature: vm.signature, // base64-encoded signature based on policy string (see article below)
                        "Content-Type": file.type != '' ? file.type : 'application/octet-stream', // content type of the file (NotEmpty)
                        filename: file.name, // this is needed for Flash polyfill IE8-9
                        file: file
                    }
             });


        }


       // Upload.base64DataUrl(file).then(function(urls){
        //    alert(urls);
          //console.log(urls); // data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAeUlEQVR42mNkoDFgHLVgZFowC4hPA/FsWlgQAcT1QGwCxF+pbYEiEB8HYg8gvkDtIGIB4sNAvByIJ1HLcGQL2oBYF4h9qWk4zAIHIN4DxDOA+DWVzd9MSwtAZm+iSxCBAM0jGQRomkxhgKYZDQZoWlRQHYxaMAIsAADmiRh9oNMjjgAAAABJRU5ErkJggg==
            //var url = urls.replace(/^data:image\/(png|jpg);base64,/, "");
           //console.log("Convert url : " + url); // iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAeUlEQVR42mNkoDFgHLVgZFowC4hPA/FsWlgQAcT1QGwCxF+pbYEiEB8HYg8gvkDtIGIB4sNAvByIJ1HLcGQL2oBYF4h9qWk4zAIHIN4DxDOA+DWVzd9MSwtAZm+iSxCBAM0jGQRomkxhgKYZDQZoWlRQHYxaMAIsAADmiRh9oNMjjgAAAABJRU5ErkJggg==
        //});


    }



/*
    $scope.form = {
        files: [],
        file:  []
    };

    $scope.options2 = {
        multiple:   false,
        extensions: ['png','jpg'],
        immediate:  true,
        bucket:     'pharmerz-chat',
        acl:        'public-read',
        folder:     "",
        filename:   "art",
        filesize:   '10000000',
        totalsize:  '10000000',
        region:     'ap-south-1',
        limit:      1,
        policy:     {
            "policy":"ewogICJleHBpcmF0aW9uIjogIjIwMjAtMDEtMDFUMDA6MDA6MDBaIiwKICAiY29uZGl0aW9ucyI6IFsKICAgIHsiYnVja2V0IjogInBoYXJtZXJ6LWNoYXQifSwKICAgIFsic3RhcnRzLXdpdGgiLCAiJGtleSIsICIiXSwKICAgIHsiYWNsIjogInB1YmxpYy1yZWFkIn0sCiAgICBbInN0YXJ0cy13aXRoIiwgIiRDb250ZW50LVR5cGUiLCAiIl0sCiAgICBbInN0YXJ0cy13aXRoIiwgIiRmaWxlbmFtZSIsICIiXSwKICAgIFsiY29udGVudC1sZW5ndGgtcmFuZ2UiLCAwLCA1MjQyODgwMDBdCiAgXQp9",
            "signature":"Fdz/8sNGkNC1gh9YYmn1xe6+Lok=",
            "key":"AKIAI5T24QARKTXLDXLQ"
        }
    };

    $scope.delete2 = function(name) {
        $scope.form.file = [];
    };

    */

});