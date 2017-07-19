myApp.controller('HomeCtrl', function($scope,$route,$rootScope,$location,$cookies,$cookieStore,Page,baseURl,errorMessage,$http,sessionmaintain,getcategorydetails,ContextPath,$timeout){
 
    var vm = $scope;

    Page.setTitle("Pharmerz - India's Complete B2B Pharma Marketplace"); // To set Page Title using factory
    
    //error messages from custom factory method.
    vm.errorMessage=errorMessage;

    //config parameter is need to send client data to server in ajaxrequest
    var config = {
        headers : {
            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
        }
    }

    vm.showlogin = true; // show by default login and signup option

    // check session
    vm.session = sessionmaintain.checksession();
    if(vm.session == false)
    {
        $location.path('/home');
    }
    else
    {
        vm.showlogin = false;
        vm.showlogout = true;
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
     * Method Name  - changeLocation
     * Created By   - Sagar Thombare
     * Created On   - 13 June 2017
     * Modified By  -
     * Modified On  -
     * Purpose      - This method is use to change location
     */
    vm.changeLocation = function(id){
        if($cookies.get('ProductCategory') && $cookies.get('ProductName')){

            $cookieStore.remove('ProductCategory');
            $cookieStore.remove('ProductName');

        }
        $location.path(id);
    }

    /*  
     * Method Name  - resetLoginForm
     * Created By   - Vaibhav Godambe
     * Created On   - 15 feb 2017
     * Modified By  - 
     * Modified On  - 
     * Purpose      - This method is use to reset the login form  
     */
    
    
    vm.resetLoginForm = function (params) {
        vm.submitted=false;
        vm.invalidusrpass = false;

        params.loginUsername = '';
        params.password = '';

    }


    vm.keyCustomer=['image/key1.png','image/key2.png','image/key3.png','image/key4.png','image/key5.png','image/key6.png','image/key7.png','image/key8.png'];
    
    
    
    /*  
	* Method Name  - loginForm
	* Created By   - Vaibhav Godambe
	* Created On   - 15 feb 2017
	* Modified By  - 
	* Modified On  - 
	* Purpose      - This method is use to validate the login form  
    */

    vm.params = {};

    vm.loginForm = function(myForm,params){
        vm.submitted=true;
        vm.invalidusrpass = false;
        vm.sendrequest = false;

        //if(myForm.$valid && vm.checkpassword == false )
        if(myForm.$valid)
        {

           // alert(params.loginUsername);
           // alert(params.password);

            vm.sendrequest = true;

            var data = $.param({
                username: params.loginUsername,
                password: params.password,
            });

             $http.post(ContextPath +'/login', data, config)
                .success(function (data, status, headers, config) {

                    vm.sendrequest = false;

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
                           //console.log('userdata   :   ' + JSON.stringify(data));
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
                            vm.sendrequest = false;
                        //console.log("Error Data : " +data);
                        //console.log("Error Status : " +status);
                      });
                })
              .error(function (data, status, headers, config) {

                  vm.invalidusrpass = true;
                  vm.sendrequest = false;
                 //console.log("Error Data : " +data);
                 //console.log("Error Status : " +status);
              });
       
			 
        }
    }

    // Retrieving a cookie
    vm.username = $cookies.get('UserFirstname'); // get user first name cookies

       
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
        
        
    /*  
	* Method Name  - scrolltotop
	* Created By   - Vaibhav Godambe
	* Created On   - 2 dec 2016
	* Modified By  - 
	* Modified On  - 
	* Purpose      - This method is use to move to top position
    */      
        
    vm.movetoTop = function() {
        // set the location.hash to the id of
        // the element you wish to scroll to.
        //$location.hash('top');

        // call $anchorScroll()
        // $anchorScroll();
        var scrollDuration = 500;
        var scrollStep = -window.scrollY / (scrollDuration / 15);
        //console.log(scrollStep);
            
        var scrollInterval = setInterval(function(){  
            if (window.scrollY != 0) {
                window.scrollBy(0, scrollStep);
            } else {
                clearInterval(scrollInterval); 
            }
        },15);		
    }
    
    
    /*  
	* Method Name  - whatTab,whoTab,howTab
	* Created By   - Vaibhav Godambe
	* Created On   - 6 dec 2016
	* Modified By  - 
	* Modified On  - 
	* Purpose      - This method is use to show data as per tabs
    */ 
    
    vm.what = true;// by default set value
    vm.who = false;// by default set value
    vm.how = false;// by default set value
    
    vm.whatTab = function(){
        vm.who = false;
        vm.how = false;
        vm.what = true;
    }
    
    vm.whoTab = function(){
        vm.what = false;
        vm.how = false;
        vm.who = true;
    }
    
    vm.howTab = function(){
        vm.what = false;
        vm.who = false;
        vm.how = true;
    }

    /*
     * Method Name  - matchPassword
     * Created By   - Vaibhav Godambe
     * Created On   - 16 dec 2016
     * Modified By  -
     * Modified On  -
     * Purpose      - This method is use to match password from password filed
     */


    vm.matchPassword= function(){
        if(vm.password === vm.cpassword){
            vm.showerror = false;
        }else{
            vm.showerror = true;
        }
    }//close matchPassword


    /*
     * Method Name  - resetSignup
     * Created By   - Vaibhav Godambe
     * Created On   - 21 Feb 2017
     * Modified By  -
     * Modified On  -
     * Purpose      - This method is use to reset all field data
     */

    vm.resetSignup = function () {
        vm.register = false;
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

        // reset value

         vm.fName = '';
         vm.lName = '';
         vm.mName = '';
         vm.radioG = '';
         vm.cNumbercode = '';
         vm.cNumber = '';
         vm.emailId = '';
         vm.uName = '';
         vm.password = '';
         vm.coName = '';
         vm.cpassword = '';

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
     * Method Name  - signupForm
     * Created By   - Vaibhav Godambe
     * Created On   - 21 dec 2016
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



    vm.signupForm = function(signup){

        vm.register=true;
        vm.checkmobilenumber = true;
        vm.checkemailaddress = true;
        vm.checkusername = true;

        if(signup.$valid && vm.showerror == false && vm.showmobileSuccess == true && vm.showemailSuccess == true && vm.showusrnameSuccess == true)
        {
         //   alert("firstname : " + vm.fName + " middlename : " + vm.mName + " lastname : " + vm.lName + " Gender : " + vm.radioG  + " Company Name : " + vm.coName + " mobile number : " + vm.cNumber + " emailid : " + vm.emailId + " vm.username : " + vm.uName + " password : " + vm.password + " con pass : " + vm.cpassword);

            vm.sendrequest = true; // loader added

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

            $http.post(ContextPath +'/api/v1/users', data, signupconfig)
                .success(function (data, status , headers, signupconfig) {

                   //console.log('Signup user : ' + JSON.stringify(data));
                    //console.log('Signup user status : ' + status);

                    //console.log('Signup user : ' + JSON.stringify(data._links.self.href));

                    var userlink = data._links.self.href; // user link

                    //console.log('userlink : ' + userlink);

                    // organization  data
                    var orgdata = {
                        organization : vm.coName,
                        user: userlink,
                    };

                   // organization post call
                   $http.post(ContextPath +'/api/v1/organizations', orgdata, signupconfig)
                        .success(function (data, status , headers, signupconfig) {
                          //console.log('Org data : ' + JSON.stringify(data));
                            //console.log('Org status : ' + status);
                        })
                        .error(function (data, status, headers, signupconfig) {

                       //console.log("Org Error Data : " +data);
                        //console.log("Org Error Status : " +status);
                    });

                    vm.sendrequest = false; // loader added

                    angular.element("#SignupModal").modal('hide'); // hide signup modal
                    $location.path('/home');
                })
                .error(function (data, status, headers, signupconfig) {
                    vm.sendrequest = false; // loader added
                   //console.log("Signup Error Data : " +data);
                    //console.log("Signup Error Status : " +status);
                });
        }


    }


    /*
     * Method Name  - hideShowPassword
     * Created By   - Vaibhav Godambe
     * Created On   - 16 dec 2016
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
     * Method Name  - addPlusSign
     * Created By   - vaibhav godambe
     * Created On   - 30 March 2017
     * Modified By  -
     * Modified On  -
     * Purpose      - This method is used to addPlusSign in to text box.
     */


    vm.addPlusSign = function () {
        vm.cNumber = '+';
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

         //console.log('cNumber : ' + vm.cNumber );
           vm.cNumber = '+'+ vm.cNumber;
           vm.regContactNumber = vm.cNumber.split("+").join("%2B");
           //console.log('cNumber : ' + vm.cNumber );

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
     * Created By   - vaibhav godambe
     * Created On   - 21 dec 2016
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

            $http.get(ContextPath +'/api/v1/users/search/findByEmail?email=' +vm.emailId, chkavailconfig)
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
     * Created By   - vaibhav godambe
     * Created On   - 21 dec 2016
     * Modified By  -
     * Modified On  -
     * Purpose      - This method is used to check availability user name.
     */
    vm.chkUsrnameAvail = function (signup) {
        /*var data = $.param({
            username: vm.uName,
        });*/
        //alert(vm.uName);
       //console.log(" data  : " + JSON.stringify(data));

        vm.showusrnameerror = false;
        vm.showusrnameSuccess = false;
        vm.showcheckingusrname = false;

        if(signup.username.$valid)
        {
            vm.showcheckingusrname = true;
            vm.checkusername = false;

            $http.get(ContextPath +'/api/v1/users/search/findByUsername?username=' +vm.uName, chkavailconfig)
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
     * factory Name  - getcategorydetails
     * Created By   - vaibhav godambe
     * Created On   - 2 jan 2017
     * Modified By  -
     * Modified On  -
     * Purpose      - This factory is used to get user details.
     */

    // To get category from  getcategorydetails factory

    getcategorydetails.then(function(response){
       //console.log("Category details : " + JSON.stringify(response.data));
        vm.categories = response.data._embedded.categories;

        vm.categoriesData = [{"ids": "ALLCat","category" : 'All Category'}];
        vm.categoriesData1 = [];

        for( var i = 0 ; i < vm.categoriesData.length ; i++ )
        {
            vm.categoriesData1.push({
                ids : vm.categoriesData[i].ids,
                category : vm.categoriesData[i].category
            });
        }

        for( var j = 0 ; j < vm.categories.length ; j++ )
        {
            vm.categoriesData1.push({
                ids : vm.categories[j].id,
                category : vm.categories[j].category
            });
        }


       //console.log("Category data: " +  JSON.stringify(vm.categoriesData1));
        vm.productcategory = 'ALLCat';

    });




    /*
     * Method Name  - CategoryProductSearch
     * Created By   - vaibhav godambe
     * Created On   - 3 jan 2017
     * Modified By  -
     * Modified On  -
     * Purpose      - This method is used to get category vice product.
     */


    // Remove a cookie
    $cookies.remove("Categoryid");

    vm.CategoryProductSearch = function(itemid){
        //console.log('Item Id : ' + itemid);
        // Setting a cookie
        $cookies.put('Categoryid',itemid);
        //$rootScope.newCategoryid = itemid;
        $location.path('/product');

    }

    /*
     * Method Name  - getContactData
     * Created By   - vaibhav godambe
     * Created On   - 15 Feb 2017
     * Modified By  -
     * Modified On  -
     * Purpose      - This method is used to get contact data and send contact data.
     */


    //config parameter is need to send client data to server in ajaxrequest
    var contactusconfig = {
        headers : {
            'Accept' : 'application/json',
            'Content-Type': 'application/json',
        }
    }


    vm.getContactData = function (contactusform) {

        vm.contactfrm = true;

        if(contactusform.$valid){
            var data = {
                full_NAME : vm.fullname,
                company_NAME : vm.companyname,
                email : vm.email,
                contact_NUMBER : vm.contactnum,
                address : vm.address,
                comments : vm.comment
            };
            //console.log('contact us data  : ' + JSON.stringify(data));

            $http.post(ContextPath +'/api/v1/contactus', data ,contactusconfig)
                .success(function (data, status,contactusconfig) {
                    //console.log('contact us data  : ' + JSON.stringify(data));
                    //console.log('contact us data status : ' + status);

                    // vm.fullname = '';
                    // vm.companyname='';
                    // vm.email='';
                    // vm.contactnum='';
                    // vm.address='';
                    // vm.comment='';

                    $route.reload();

                })
                .error(function (data, status) {
                    //console.log("contact us data Error Data : " +data);
                    //console.log("contact us data Error Status : " +status);
                });
        }
    }


    /*--------------------------------------
    * Forgot Password
    * Date : 15 March 2017
    ---------------------------------------*/

    vm.countryCode = '91';

    /*
     * Method Name  - forgoetmatchEmailPassword
     * Created By   - Vaibhav Godambe
     * Created On   - 15 March 2017
     * Modified By  -
     * Modified On  -
     * Purpose      - This method is use to match password from password filed
     */


    vm.forgoetmatchEmailPassword= function(){
        if(vm.EmailResetPass === vm.EmailConfirmPass){
            vm.showforgoterror = false;
        }else{
            vm.showforgoterror = true;
        }
    }//close matchPassword



    /*
     * Method Name  - forgoetmatchMobilePassword
     * Created By   - Vaibhav Godambe
     * Created On   - 15 March 2017
     * Modified By  -
     * Modified On  -
     * Purpose      - This method is use to match password from password filed
     */

    vm.forgoetmatchMobilePassword= function(){
        if(vm.MobileResetPass === vm.MobileConfirmPass){
            vm.showforgotmobileerror = false;
        }else{
            vm.showforgotmobileerror = true;
        }
    }//close matchPassword



    /*
     * Method Name  - resetForgotPass
     * Created By   - Vaibhav Godambe
     * Created On   - 29 March 2017
     * Modified By  -
     * Modified On  -
     * Purpose      - This method is use to reset all field data
     */

    vm.resetForgotPass = function () {
        vm.forgotPassEmail = false;
        vm.forgotPassEmailOtp = false;
        vm.forgotPassMailChangePass = false;
        vm.showforgoterror = false;
        // new validation part
        vm.checkemailaddressforgot = false;
        vm.showemailSuccessforgot = false;
        //vm.showemailerrorforgot = false;



        vm.forgotPassMobile = false;
        vm.forgotPassMobileOtp = false;
        vm.forgotPassMobChangePass = false;
        vm.showforgotmobileerror = false;
        // new validation part
        vm.checkmobilenumberforgot = false;
        vm.showmobileSuccessforgot = false;
        //vm.showmobileerrorforgot = false;

        // reset value

        vm.registeredEmail = '';
        vm.emailOtp = '';
        vm.EmailResetPass = '';
        vm.EmailConfirmPass = '';

        vm.registeredMobile ='';
        vm.mobileOtp = '';
        vm.MobileResetPass = '';
        vm.MobileConfirmPass = '';

        vm.emailotpdisabled = false;
        vm.mobileotpdisabled = false;


    }



    /*
     * Method Name  - getEmailRegOtp
     * Created By   - Vaibhav Godambe
     * Created On   - 15 March 2017
     * Modified By  -
     * Modified On  -
     * Purpose      - This method is use to getEmailRegOtp
     */

    //config parameter is need to send client data to server in ajaxrequest
    var forgotpassconfig = {
        headers : {
            'Accept' : 'application/json',
            'Content-Type': 'application/json',
        }
    }


    vm.getEmailRegOtp = function (forgotPasswordEmail) {
        vm.forgotPassEmail = true;
        vm.checkemailaddressforgot = true;

        if(forgotPasswordEmail.$valid && vm.showemailSuccessforgot == true)
        {
            var data = {
                emails: vm.registeredEmail
            };

            //console.log('getEmailRegOtp data  : ' + JSON.stringify(data));

            $http.post(ContextPath +'/api/v1/forgetpassword', data ,forgotpassconfig)
                .success(function (data, status,forgotpassconfig) {
                   //console.log('getEmailRegOtp data  : ' + JSON.stringify(data));
                   //console.log('getEmailRegOtp data status : ' + status);


                })
                .error(function (data, status) {
                    //console.log("getEmailRegOtp data Error Data : " +data);
                    //console.log("getEmailRegOtp data Error Status : " +status);
                });

        }
    }

    /*
     * Method Name  - submitEmailOtp
     * Created By   - Vaibhav Godambe
     * Created On   - 15 March 2017
     * Modified By  -
     * Modified On  -
     * Purpose      - This method is use to submitEmailOtp
     */
    vm.emailpassdisabled = false; // by default

    vm.submitEmailOtp = function (forgotPasswordEmailOtp) {
        vm.forgotPassEmailOtp = true;

        if(forgotPasswordEmailOtp.$valid){

            var data = {
                emails: vm.registeredEmail,
                hashcode: vm.emailOtp
            };

            //console.log('submitEmailOtp data  : ' + JSON.stringify(data));

            $http.post(ContextPath +'/api/v1/verifyforgetpassword', data ,forgotpassconfig)
                .success(function (data, status,forgotpassconfig) {
                  //console.log('submitEmailOtp data  : ' + JSON.stringify(data));
                   //console.log('submitEmailOtp data status : ' + status);

                        vm.emailflag = data.flag; // set flag value
                        vm.emailpassdisabled = true;
                })
                .error(function (data, status) {
                    vm.emailpassdisabled = false; // by default
                    //console.log("submitEmailOtp data Error Data : " +data);
                    //console.log("submitEmailOtp data Error Status : " +status);
                });

        }
    }

    /*
     * Method Name  - SaveEmailSetPass
     * Created By   - Vaibhav Godambe
     * Created On   - 15 March 2017
     * Modified By  -
     * Modified On  -
     * Purpose      - This method is use to SaveEmailSetPass
     */

    vm.SaveEmailSetPass = function (forgotPassEmailChangePass) {

        vm.forgotPassMailChangePass = true;

        if(forgotPassEmailChangePass.$valid && vm.showforgoterror == false){

            vm.sendrequestChangePassword = true;
            var data = {
                emails: vm.registeredEmail,
                password: vm.EmailResetPass,
                flag : vm.emailflag
            };

            //console.log('SaveEmailSetPass data  : ' + JSON.stringify(data));

            $http.post(ContextPath +'/api/v1/updatepassword', data ,forgotpassconfig)
                .success(function (data, status,forgotpassconfig) {
                  //console.log('SaveEmailSetPass data  : ' + JSON.stringify(data));
                   //console.log('SaveEmailSetPass data status : ' + status);

                    vm.sendrequestChangePassword = false;
                    vm.PasswordChangedSuccess = true;

                    var reloadRoute = function() {
                        vm.PasswordChangedSuccess = false;
                        angular.element('.modal-backdrop').remove(); // hide modal
                        angular.element('body').removeClass('modal-open'); // hide modal
                        angular.element('body').removeAttr('style'); // hide modal
                        angular.element('#ForgotPassModal').css('display','none'); // hide modal

                        angular.element('#LoginModal').modal('show'); //  open login modal box
                        //$route.reload();
                    }

                    $timeout(reloadRoute, 3000); // timeout




                })
                .error(function (data, status) {
                    vm.sendrequestChangePassword = false;
                    vm.PasswordChangedSuccess = false;
                    //console.log("SaveEmailSetPass data Error Data : " +data);
                    //console.log("SaveEmailSetPass data Error Status : " +status);
                });

        }

    }



    /*
     * Method Name  - getMobileRegOtp
     * Created By   - Vaibhav Godambe
     * Created On   - 15 March 2017
     * Modified By  -
     * Modified On  -
     * Purpose      - This method is use to getMobileRegOtp
     */

    vm.getMobileRegOtp = function (forgotPasswordMobile) {

        vm.forgotPassMobile = true;
        vm.checkmobilenumberforgot = true;

        if(forgotPasswordMobile.$valid && vm.showmobileSuccessforgot == true)
        {
             var data ={
                 mobile: '+' + vm.countryCode + vm.registeredMobile
             };

            //console.log('getMobileRegOtp data  : ' + JSON.stringify(data));

            $http.post(ContextPath +'/api/v1/forgetpassword/mobile', data ,forgotpassconfig)
                .success(function (data, status,forgotpassconfig) {
                  //console.log('getMobileRegOtp data  : ' + JSON.stringify(data));
                    //console.log('getMobileRegOtp data status : ' + status);



                })
                .error(function (data, status) {
                    //console.log("getMobileRegOtp data Error Data : " +data);
                    //console.log("getMobileRegOtp data Error Status : " +status);
                });


        }
    }




    /*
     * Method Name  - submitMobileOtp
     * Created By   - Vaibhav Godambe
     * Created On   - 15 March 2017
     * Modified By  -
     * Modified On  -
     * Purpose      - This method is use to submitMobileOtp
     */

    vm.mobilepassdisabled = false; // by default

    vm.submitMobileOtp = function (forgotPasswordMobileOtp) {
        vm.forgotPassMobileOtp = true;

        if(forgotPasswordMobileOtp.$valid)
        {
            var data ={
                mobile: '+' + vm.countryCode + vm.registeredMobile,
                hashcode: vm.mobileOtp
            };

            //console.log('submitMobileOtp data  : ' + JSON.stringify(data));

            $http.post(ContextPath +'/api/v1/verifyforgetpassword/mobile', data ,forgotpassconfig)
                .success(function (data, status,forgotpassconfig) {
                   //console.log('submitMobileOtp data  : ' + JSON.stringify(data));
                    //console.log('submitMobileOtp data status : ' + status);

                    vm.mobileflag = data.flag; // set flag value
                    vm.mobilepassdisabled = true; // by default

                })
                .error(function (data, status) {
                    vm.mobilepassdisabled = false; // by default
                    //console.log("submitMobileOtp data Error Data : " +data);
                    //console.log("submitMobileOtp data Error Status : " +status);
                });
        }

    }

    /*
     * Method Name  - SaveMobileSetPass
     * Created By   - Vaibhav Godambe
     * Created On   - 15 March 2017
     * Modified By  -
     * Modified On  -
     * Purpose      - This method is use to SaveMobileSetPass
     */

    vm.SaveMobileSetPass = function (forgotPassMobileChangePass) {
        vm.forgotPassMobChangePass = true;

        if(forgotPassMobileChangePass.$valid && vm.showforgotmobileerror == false)
        {
            vm.sendrequestChangePassword = true;
            var data ={
                mobile: '+' + vm.countryCode + vm.registeredMobile,
                password: vm.MobileResetPass,
                flag : vm.mobileflag
            };

            //console.log('SaveMobileSetPass data  : ' + JSON.stringify(data));

            $http.post(ContextPath +'/api/v1/updatepassword/mobile', data ,forgotpassconfig)
                .success(function (data, status,forgotpassconfig) {
                  //console.log('SaveMobileSetPass data  : ' + JSON.stringify(data));
                  //console.log('SaveMobileSetPass data status : ' + status);
                    vm.sendrequestChangePassword = false;
                    vm.PasswordChangedSuccess = true;
                    var reloadRoute = function() {
                        vm.PasswordChangedSuccess = false;

                        angular.element('.modal-backdrop').remove(); // hide modal
                        angular.element('body').removeClass('modal-open'); // hide modal
                        angular.element('body').removeAttr('style'); // hide modal
                        angular.element('#ForgotPassModal').css('display','none'); // hide modal

                        angular.element('#LoginModal').modal('show'); //  open login modal box

                        //$route.reload();
                    }

                    $timeout(reloadRoute, 3000); // timeout



                })
                .error(function (data, status) {
                    vm.sendrequestChangePassword = false;
                    vm.PasswordChangedSuccess = false;

                    //console.log("SaveMobileSetPass data Error Data : " +data);
                    //console.log("SaveMobileSetPass data Error Status : " +status);
                });


        }
    }

    /*
     * Method Name  - chkEmailIdAvailForgot
     * Created By   - vaibhav godambe
     * Created On   - 21 dec 2016
     * Modified By  -
     * Modified On  -
     * Purpose      - This method is used to check availability email id.
     */

    //config parameter is need to send client data to server in ajaxrequest
    var chkavailconfig = {
        headers : {
            'Accept' : 'application/json',
            'Content-Type': 'application/json',
        }
    }

     vm.emailotpdisabled = false; // by default

    vm.chkEmailIdAvailForgot = function (forgotPasswordEmail) {


        //vm.showemailerrorforgot = false;
        vm.showemailSuccessforgot = false;
        vm.showcheckingemailforgot = false;


        if(forgotPasswordEmail.regEmail.$valid)
        {
            vm.showcheckingemailforgot = true;
            vm.checkemailaddressforgot = false;

            $http.get(ContextPath +'/api/v1/users/search/findByEmail?email=' +vm.registeredEmail, chkavailconfig)
                .success(function (data, status) {

                   //console.log('Email Id Availability  : ' + JSON.stringify(data));
                   //console.log('Email Id Availability status : ' + status);

                    vm.showemailSuccessforgot = true;
                    vm.showcheckingemailforgot = false;

                    vm.emailotpdisabled = true;

                })
                .error(function (data, status) {

                    vm.showemailSuccessforgot = false;
                    vm.showcheckingemailforgot = false;

                    vm.emailotpdisabled = false;
                    //console.log("Email Id Availability Error Data : " +data);
                    //console.log("Email Id Availability Error Status : " +status);
                });
        }
        else{
            vm.checkemailaddressforgot = true;
            vm.showcheckingemailforgot = false;
        }


    }

    /*
     * Method Name  - chkMobileNumAvailForgot
     * Created By   - vaibhav godambe
     * Created On   - 29 march 2017
     * Modified By  -
     * Modified On  -
     * Purpose      - This method is used to check availability mobile number.
     */



    vm.mobileotpdisabled = false; // by default

    vm.chkMobileNumAvailForgot = function (forgotPasswordMobile) {

       // vm.showmobileerrorforgot = false;
        vm.showmobileSuccessforgot = false;
        vm.showcheckingmobileforgot = false;


        if(forgotPasswordMobile.regMobile.$valid)
        {
            vm.showcheckingmobileforgot = true;
            vm.checkmobilenumberforgot = false;

            vm.sentmobileno =  '%2B' + vm.countryCode + vm.registeredMobile;
            //console.log("sentmobileno  : " + vm.sentmobileno);
            //console.log("sentmobileno typeof : "+ typeof vm.sentmobileno);

            $http.get(ContextPath +'/api/v1/users/search/findByMobile?mobile='+vm.sentmobileno, chkavailconfig)
                .success(function (data, status) {
                   //console.log('Mobile No Availability  : ' + JSON.stringify(data));
                   //console.log('Mobile No Availability status : ' + status);

                    vm.showmobileSuccessforgot = true;
                    vm.showcheckingmobileforgot = false;

                    vm.mobileotpdisabled = true;
                })
                .error(function (data, status) {

                    vm.showmobileSuccessforgot = false;
                    vm.showcheckingmobileforgot = false;

                    vm.mobileotpdisabled = false;
                    //console.log("Mobile No Availability Error Data : " +data);
                    //console.log("Mobile No Availability Error Status : " +status);
                });
        }
        else{
            vm.checkmobilenumberforgot = true;
            vm.showcheckingmobileforgot = false;
        }

    }


    /*
     * Method Name  - getProductByCompo
     * Created By   - vaibhav godambe
     * Created On   - 13 April 2017
     * Modified By  -
     * Modified On  -
     * Purpose      - This method is used to get Product by composition .
     */




    vm.getProductByCompo = function (serachByCompo) {
        //http://localhost:8080/PharmerzWeb/api/v1/products/search/findByComposition?composition=compo
        vm.CompoSubmit = true;

        if(serachByCompo.$valid)
        {
            $cookies.put('ProductComposition',vm.composition);
            $location.path('/product');
        }

    }


    /*
     * Method Name  - getProductNameCategory
     * Created By   - vaibhav godambe
     * Created On   - 13 April 2017
     * Modified By  -
     * Modified On  -
     * Purpose      - This method is used to get product name and category .
     */


    vm.getProductNameCategory = function (searchByProductNameCategory) {

        vm.ProductNameCategorySubmit = true;

        if(searchByProductNameCategory.$valid)
        {
            $cookies.put('ProductCategory',vm.productcategory);
            $cookies.put('ProductName',vm.ProductName);

            //console.log('ProductCategory : ' +vm.productcategory + ' ProductName : ' + vm.ProductName);
            $location.path('/product');
        }

    }



    /*
     * Api Name  - get Category Count
     * Created By   - vaibhav godambe
     * Created On   - 13 April 2017
     * Modified By  -
     * Modified On  -
     * Purpose      - This api is used to get Category count .
     */


    //config parameter is need to send client data to server in ajaxrequest
    var catcountconfig = {
        headers : {
            'Accept' : 'application/json',
            'Content-Type': 'application/json',
        }
    }

    $http.get(ContextPath +'/api/v1/productcount', catcountconfig)
        .success(function (data, status) {
           //console.log('Category count  : ' + JSON.stringify(data));
           //console.log('Category count status : ' + status);

            vm.countapis = data.countapis;
            vm.countPellets = data.countPellets;
            vm.countFineChemicals = data.countFineChemicals;
            vm.countFinishedFormulation = data.countFinishedFormulation;
            vm.countIntermediatesExcipients = data.countIntermediatesExcipients;
            vm.countLabEquipment = data.countLabEquipment;

        })
        .error(function (data, status) {
           //console.log("Category count Error Data : " +data);
           //console.log("Category count Error Status : " +status);
        });



    /*
     * Api Name  - get ticker Product
     * Created By   - vaibhav godambe
     * Created On   - 5 May 2017
     * Modified By  -
     * Modified On  -
     * Purpose      - This api is used to get ticker Product .
     */

        //config parameter is need to send client data to server in ajaxrequest
        var tickerproductconfig = {
            headers : {
                'Accept' : 'application/json',
                'Content-Type': 'application/json',
            }
        }

    $http.get(ContextPath +'/api/v1/products?size=50', tickerproductconfig)
        .success(function (data, status) {
           //console.log('product count  : ' + JSON.stringify(data));
           //console.log('product count status : ' + status);

            vm.productsData = data._embedded.products;


        })
        .error(function (data, status) {
           //console.log("product count Error Data : " +data);
           //console.log("product count Error Status : " +status);
        });


    /*
     * Mathod Name  - enquirySend
     * Created By   - vaibhav godambe
     * Created On   - 5 May 2017
     * Modified By  -
     * Modified On  -
     * Purpose      - This method is used to send enuiry using ticker products .
     */

        vm.enquirySend = function (itemid) {
            //console.log("item Id : " +itemid );
            if(vm.session == true)
            {
                // $rootScope.productid_sendenq = itemid ; // pass product id to other controller using global scope
                // Setting a cookie
                //console.log("Set productid_sendenq :" + itemid);
                $cookies.put('productid_sendenq',itemid);
                $location.path('/sendenquiry');
            }
            else
            {
                vm.senenqsession = true;
                //$rootScope.productid_sendenq = itemid ; // pass product id to other controller using global scope
                // Setting a cookie
                $cookies.put('productid_sendenq',itemid);
                angular.element("#LoginModal").modal('show'); // show login modal
            }
        }




    /*
     * Api Name  - vm.buyerRequirement
     * Created By   -Sagar Thombare
     * Created On   - 19 JUne 2017
     * Modified By  -
     * Modified On  -
     * Purpose      - This api is used to send buyer requirement.
     */

    //config parameter is need to send client data to server in ajaxrequest
    var buyerReqconfig = {
        headers : {
            'Accept' : 'application/json',
            'Content-Type': 'application/json',
        }
    }

    vm.buyerRequirement = function(Form){
            vm.buyersubmit=true;

        if(Form.$valid){

            if(vm.yourcity=='')
            {
                vm.yourcity='';
            }

            var data = {
                productname : vm.buyerProduct,
                name: vm.yourname,
                mobile: vm.yourmobile,
                email: vm.youremail,
                city: vm.yourcity
            };

            console.log('Buyer Requirement Form  : ' + JSON.stringify(data));

                $http.post(ContextPath +'/api/v1/buyingRequirement', data, buyerReqconfig)
                    .success(function (data, status, headers, config) {

                        //console.log("Success Data "+data);
                        //console.log("Success Data "+status);

                        vm.showBuyerMesg=true;
                        vm.buyerProduct='';
                        vm.yourname='';
                        vm.yourmobile='';
                        vm.youremail='';
                        vm.yourcity='';
                        vm.buyersubmit=false;

                    })
                    .error(function (data, status, headers, buyerReqconfig) {
                        vm.showBuyerMesg=false;
                        //console.log("Error Data : " +data);
                        //console.log("Error Status : " +status);

                    });
        }
    }






    /*
     * Api Name  - get ticker Product
     * Created By   - vaibhav godambe
     * Created On   - 5 May 2017
     * Modified By  -
     * Modified On  -
     * Purpose      - This api is used to get ticker Product .
     */




   /****************/

    vm.checkScrollPosition = function(){
        angular.element('#toTop').removeClass('show');
    }


    $(window).scroll(function() {
        if (window.scrollY >= 50)
        {
            angular.element('#toTop').addClass('show');
        }
        else
        {
            angular.element('#toTop').removeClass('show');
        }

    });


    vm.topmove = function()
    {
        $('html, body').animate({
            scrollTop: 0
        }, 250);
        // e.preventDefault();
    }

});



