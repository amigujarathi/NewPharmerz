 /*  
	* factory Name  - page
	* Created By   - Vaibhav Godambe
	* Created On   - 2 dec 2016
	* Modified By  - 
	* Modified On  - 
	* Purpose      - This factory is use to Set page title
*/ 

myApp.factory('Page', function(){
    
  var title = ' ';// default title set first
  return {
    title: function() { return title; },
    setTitle: function(newTitle) { title = newTitle; }
  };
});

/*  
	* Method Name  - baseURl
	* Created By   - vaibhav godambe
	* Created On   - 8 dec 2016
	* Modified By  - 
	* Modified On  - 
	* Purpose      - This factory is used to manage all error messages.		  
*/

myApp.factory('baseURl',function($location) {
	//var url = 'http://52.220.219.72:8080/PharmerzWeb/';

    //var url = 'http://localhost:8080/api/v1/';

    //console.log("dynamic get url : " + $location.host());
    //console.log("dynamic get url : " + $location.protocol());

    //$location.protocol() +'://'+ $location.host() +'/api/v1/';
	//Ankur - change this url if want to change
	var url = 'https://web.pharmerz.com/api/v1/';

	return url;
});


/*  
	* Method Name  - errorMessage
	* Created By   - vaibhav godambe
	* Created On   - 8 dec 2016
	* Modified By  - 
	* Modified On  - 
	* Purpose      - This factory is used to manage all error messages.		  
*/
myApp.factory('errorMessage', function(){
	  var errMessage={
          emailerror:'Please enter valid email address',
          usernameerror:'Please enter valid username',
          filedrequired:'This is required field',
          /*passworderror:'Must contain number and letter and special character, and at least 8 or more characters',*/
          passworderror:'Please enter valid password',
          invalidUsernamePassword :'Invalid username and password.Please try again',
          cpassword:'Confirm passwords does not match with passwords',
          uname:'Please enter valid user name',
          fname:'Please enter valid first name',
          mname:'Please enter valid middle name',
          lname:'Please enter valid last name',
          fullname:'Please enter valid full name',
          mobile:'Please enter valid mobile number',
          phone:'Please enter valid phone number',
          postalcode:'Please enter valid postal code',
          company:'Please enter valid company name',
          avilmobile:'This mobile number available',
          avilusername:'This username available',
          avilemail:'This email address available',
          notavilmobile:'This mobile number already exist',
          notavilusername:'This username already exist',
          notavilemail:'This email address already exist',
          percentInvalid:'Please enter the valid percent value',
          salesadded:'This product added in sales',
          purchaseadded:'This product added in purchase',
          salespurchaseadded:'This product added in sales & purchase',
          saleserror:'This product already added in sales',
          purchaseerror:'This product already added in purchase',
          salespurchaseerror: 'This product already added in sales and purchase',
          categorysearcherror: 'Please select category first',
          categorysearchboxerror: 'Please enter product name first',
          productmodeerror:'Please select the product mode',
          initiatedEnquiry:'Enquiry initiated on this product you can not remove it',
          waitmin :'Please wait.....',
          identitynotmatch:'Identity value do not match with Identity confirmation value',
          msgempty:'Please enter message',
          otperror:'OTP not valid',
          productaddsuccess:'Product added successfully',
          verifymobilesuccess:'Mobile number is verified successfully',
          verifyemailsuccess:'Email address is verified successfully',
          passwordchangedsuccess:'Your password is changed successfully',
          enquirysendsuccess:'Enquiry send successfully',
          nosupplier:'No supplier for this product',
          quotationsendsuccess:'Quotation send successfully',
          purchasesendsuccess:'Purchase order send successfully',




		 description:'Please enter valid description',

		};
	 return errMessage;
});

 /*
  * Method Name  - sessionmaintain
  * Created By   - vaibhav godambe
  * Created On   - 16 dec 2016
  * Modified By  -
  * Modified On  -
  * Purpose      - This factory is used to manage session.
  */

 myApp.factory('sessionmaintain', function(){
     return {
         checksession: function() {
             if(localStorage.getItem('user'))
             {
                 return true;
             }
             else
			 {
			 	return false;
			 }
         }
     }
 });



 /*
  * Method Name  - getuserdetails
  * Created By   - vaibhav godambe
  * Created On   - 19 dec 2016
  * Modified By  -
  * Modified On  -
  * Purpose      - This factory is used to display usrname.
  */


 myApp.factory('getuserdetails', function($http) {

		 //config parameter is need to send client data to server in ajaxrequest
		 var config = {
			 headers: {
				 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
			 }
		 }

         var url = 'https://web.pharmerz.com/';
		 // get user details
		 return  $http.get(url +'/user', config); // get call for user details after login

 });



 /*
  * Api Name  - To get category
  * Created By   - vaibhav godambe
  * Created On   - 1 jan 2017
  * Modified By  -
  * Modified On  -
  * Purpose      - This api is used to get category.
  */

 myApp.factory('getcategorydetails', function($http){

     //config parameter is need to send client data to server in ajaxrequest
     var categoryconfig = {
         headers : {
             'Accept' : 'application/json',
             'Content-Type': 'application/json',
         }
     }
     //Ankur - change this url if want to change
     var url = 'https://web.pharmerz.com/';
     // get user details
     return  $http.get( url +'/api/v1/categories', categoryconfig); // get category

 });


 /*
  * Method Name  - baseURl
  * Created By   - vaibhav godambe
  * Created On   - 8 dec 2016
  * Modified By  -
  * Modified On  -
  * Purpose      - This factory is used to manage all error messages.
  */

 myApp.factory('ContextPath',function() {

     //Ankur - change this url if want to change
     var url = 'https://web.pharmerz.com/';
     return url;
 });


/*
  * Method Name  - checksessionout
  * Created By   - vaibhav godambe
  * Created On   - 14 March 2017
  * Modified By  -
  * Modified On  -
  * Purpose      - This factory is used to manage all error messages.
  */

 myApp.factory('sessionout', function($route,$location,$cookieStore){
     return {
         checksessionout: function(status) {
             console.log("SessionOut Status : " + status);

             if(status == 401)
             {
                 //alert("Check status : " + status);

                 localStorage.removeItem('user');// remove item from session
                 // Removing a cookie
                 $cookieStore.remove('UserId');
                 // Removing a cookie
                 $cookieStore.remove('UserFullName');
                 // Removing a cookie
                 $cookieStore.remove('UserFirstname');
                 // Removing a cookie
                 $cookieStore.remove('OrgnId');
                 // Removing a cookie
                 $cookieStore.remove('OrgnLinks');
                 // Removing a cookie
                 $cookieStore.remove('productid_sendenq');
                 // Removing a cookie
                 $cookieStore.remove('UserEmailId');
                 // Removing a cookie
                 $cookieStore.remove('UserMobile');
                 // Removing a cookie
                 $cookieStore.remove('ReceivedEnqId');
                 // Removing a cookie
                 $cookieStore.remove('ReceivedQuoId');
                 // Removing a cookie
                 $cookieStore.remove('SentEnqId');

                 $location.path('/home');
                // $route.reload();

                 angular.element('#LoginModal').modal('show'); //  open login modal box
                 //angular.element('body').removeAttr('style');
                // angular.element('body').addClass('body-adjs');
                // angular.element('body').removeAttr('style');

             }

         }
     }
 });


 /*
  * Method Name  - Camlecase
  * Created By   - vaibhav godambe
  * Created On   - 22 March 2017
  * Modified By  -
  * Modified On  -
  * Purpose      - This factory is used to Camlecase.
  */


 myApp.filter('Camlecase',function() {
     return function(input) {
         input = input || '';
         return input.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
     };
 });
