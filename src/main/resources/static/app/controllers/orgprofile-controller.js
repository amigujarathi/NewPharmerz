myApp.controller('OrgprofileCtrl', function($scope,$route,$location,$cookies,Page,baseURl,$http,errorMessage,sessionmaintain,sessionout,ContextPath) {
 
	 var vm = $scope;

    //error messages from custom factory method.
    vm.errorMessage=errorMessage;

    Page.setTitle('Organisation Profile'); // To set Page Title using factory
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

   // vm.adminName = vm.fullname; // Set Admin Name

    // Retrieving a cookie
    var Orgnid_Cookie = $cookies.get('OrgnId'); // get orgn id cookies
    //console.log("Orgnid_Cookie : " +Orgnid_Cookie);

    vm.OrgBaseurl = baseURl + 'organizations/' + Orgnid_Cookie; // organization url

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
    var identityconfig = {
        headers : {
            'Accept' : 'application/json',
            'Content-Type': 'application/json',
        }
    }

    // vm.identitydataObject = [{"identities":"CIN","identityType":"CIN","isDisable":true},{"identities":"TIN","identityType":"TIN","isDisable":true},
    //     {"identities":"SERVICE TAX NUMBER","identityType":"SERVICE_TAX_NUMBER"},
    //     {"identities":"DRUG MANUFACTURING LICENSE NUMBER","identityType":"DRUG_MANUFACTURING_LICENSE_NUMBER"},
    //     {"identities":"VAT TIN NUMBER","identityType":"VAT_TIN_NUMBER"},
    //     {"identities":"CST NUMBER","identityType":"CST_NUMBER"},
    //     {"identities":"EXCISE REGISTRATION NUMBER","identityType":"EXCISE_REGISTRATION_NUMBER"},
    //     {"identities":"PAN","identityType":"PAN"},{"identities":"TAN","identityType":"TAN"},
    //     {"identities":"RANGE","identityType":"RANGE"},
    //     {"identities":"DIVISION","identityType":"DIVISION"},
    //     {"identities":"COMMISSSION RATE","identityType":"COMMISSSION_RATE"},
    //     {"identities":"OTHER","identityType":"OTHER"}];


    vm.identitydataObject = [{"identities":"CIN","identityType":"CIN"},{"identities":"TIN","identityType":"TIN"},
        {"identities":"SERVICE TAX NUMBER","identityType":"SERVICE_TAX_NUMBER"},
        {"identities":"DRUG MANUFACTURING LICENSE NUMBER","identityType":"DRUG_MANUFACTURING_LICENSE_NUMBER"},
        {"identities":"VAT TIN NUMBER","identityType":"VAT_TIN_NUMBER"},
        {"identities":"CST NUMBER","identityType":"CST_NUMBER"},
        {"identities":"EXCISE REGISTRATION NUMBER","identityType":"EXCISE_REGISTRATION_NUMBER"},
        {"identities":"PAN","identityType":"PAN"},{"identities":"TAN","identityType":"TAN"},
        {"identities":"RANGE","identityType":"RANGE"},
        {"identities":"DIVISION","identityType":"DIVISION"},
        {"identities":"COMMISSSION RATE","identityType":"COMMISSSION_RATE"},
        {"identities":"OTHER","identityType":"OTHER"}];

   //console.log('identity  array push : ' + JSON.stringify(vm.identitydataObject));

    /*
     * Api Name  - get all identities as per organization id
     * Created By   - vaibhav godambe
     * Created On   - 16 dec 2016
     * Modified By  -
     * Modified On  -
     * Purpose      - This api is used to get all identities as per organization id .
     */

    $http.get(ContextPath +'/api/v1/identities/search/findByOrganizationId?organizationId='+Orgnid_Cookie+'&projection=summary',identityconfig)
        .success(function(data, status, identityconfig){
           //console.log("Identities Data : " +JSON.stringify(data));
           //console.log("Identities Status : " +status);

            vm.identitiesdata = data._embedded.identities; // identities data


            vm.elementsdata = data.page.totalElements; // total elements

             vm.identitydataObjects = []; // array

               for( var i = 0 ; i < vm.identitydataObject.length ; i++ )
               {
                 //console.log("In First foreach loop : " + vm.identitydataObject[i].identityType );

                   vm.firstobject = vm.identitydataObject[i].identityType.trim();

                   vm.matchFound = false;

                    for(var x = 0 ; x < vm.identitiesdata.length ; x++ )
                    {
                      //console.log("In Second foreach loop : " + vm.identitiesdata[x].type );

                       vm.secondobject = vm.identitiesdata[x].type.trim();

                       if( vm.firstobject == vm.secondobject )
                       {
                         //console.log('Index Postion : ' + [i] + " , " + [x]);
                         //console.log("Match Identity : " + vm.firstobject +" And " +vm.secondobject);

                           // isDisabled added Object
                           vm.identitydataObjects.push({
                               identities : vm.identitydataObject[i].identities,
                               identityType : vm.identitydataObject[i].identityType,
                               isDisable: true
                           });

                           vm.matchFound=true;

                       }

                   }//end_for

                   // Normal Object
                   if(vm.matchFound==false)
                   {

                       vm.identitydataObjects.push({
                           identities : vm.identitydataObject[i].identities,
                           identityType : vm.identitydataObject[i].identityType
                       });

                   }

               }//end_for

              //console.log('new array identity  array push : ' + JSON.stringify(vm.identitydataObject1));

        }).error(function (data, status) {
        sessionout.checksessionout(status);
        //console.log("Identities Error Data : " +data);
        //console.log("Identities Error Status : " +status);
    });



    /*
     * Method Name  - matchIdentityValue
     * Created By   - Vaibhav Godambe
     * Created On   - 16 dec 2016
     * Modified By  -
     * Modified On  -
     * Purpose      - This method is use to match identity value from confirm identity value filed
     */


    vm.matchIdentityValue = function(){
        if(vm.identityboxValue == vm.confidentityValue){
            vm.showerrors = false;
        }else{
            vm.showerrors = true;
        }
    }//close matchPassword


    /*
     * method Name  - resetcompanyidentity
     * Created By   - vaibhav godambe
     * Created On   - 12 may 2017
     * Modified By  -
     * Modified On  -
     * Purpose      - This method is used to reset the data.
     */

    vm.resetcompanyidentity = function (){
        vm.identityType = ' ';
        vm.identityValue = ' ';
        vm.addidentity = false;
        vm.showerrors = false;
    }


    /*
     * method Name  - addcinform
     * Created By   - vaibhav godambe
     * Created On   - 16 dec 2016
     * Modified By  -
     * Modified On  -
     * Purpose      - This method is used to get data from user add into table.
    */

      vm.addidentityform = function(identityform){

            vm.addidentity = true;

            if(identityform.$valid && vm.showerrors == false)
            {
             //console.log("Identity type : " +vm.identityType);
            //console.log("Identity value : " +vm.identityValue);

                vm.sendrequestIdentity = true;

                var data =  {
                    organization : vm.OrgBaseurl,
                    type : vm.identityType,
                    identity : vm.identityboxValue,
                };

                //console.log('Data : '  + JSON.stringify(data));

                $http.post(ContextPath +'/api/v1/identities',data,identityconfig)
                    .success(function(data, status, identityconfig){
                      //console.log("Add Identity Data : " +JSON.stringify(data));
                       //console.log("Add Identity Status : " +status);

                        angular.element('.modal-backdrop').remove();
                        angular.element('body').removeClass('modal-open');
                        angular.element('body').removeAttr('style');
                        angular.element('#identityModal').css('display','none');

                        vm.sendrequestIdentity = false;

                        $route.reload();

                    }).error(function (data, status) {
                    vm.sendrequestIdentity = false;
                    sessionout.checksessionout(status);
                    //console.log("Add Identity Error Data : " +data);
                    //console.log("Add Identity Error Status : " +status);
                });
            }

      }

    /*
     * method Name  - selectcompanyidentity
     * Created By   - vaibhav godambe
     * Created On   - 7 Feb 2017
     * Modified By  -
     * Modified On  -
     * Purpose      - This method is used to get data select box and open modal window.
     */

    vm.selectcompanyidentity = function () {

       //console.log("Identity value : " + vm.CompanyIdentity);

       vm.identityType = vm.CompanyIdentity; // set value

       if(vm.CompanyIdentity != null)
       {
           angular.element('#identityModal').modal('toggle');
       }

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
            sessionout.checksessionout(status);
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
               // vm.cpassword = data.password;


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


});