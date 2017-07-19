myApp.controller('GeneratePoCtrl', function($scope,$rootScope,$route,baseURl,$location,$cookies,Page,$http,errorMessage,DTOptionsBuilder,DTColumnBuilder,sessionmaintain,sessionout,ContextPath,$timeout) {
    var vm = $scope;

    vm.docother = ' ';// default value on page load

    //error messages from custom factory method.
    vm.errorMessage=errorMessage;

    Page.setTitle('Generate Purchase Order'); // To set Page Title using factory
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
    var ReceivedquoId_Cookie = $cookies.get('ReceivedQuoId'); // get ReceivedquoId cookies
    //console.log("ReceivedquoId_Cookie : " +ReceivedquoId_Cookie);

    vm.RecQuoBaseurl =  baseURl + "quotations/" + ReceivedquoId_Cookie; // base url for recevied enq

    var orgnbaseurl = baseURl + "organizations/"; // base url for organization



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



    /*------------------------
     Bootstarp date picker
     Required code
     -------------------------*/

    //$scope.dt = new Date(); //  Set Current Date UTC Format

    // Disable weekend selection
    $scope.disabled = function(date, mode) {
        return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
    };

    $scope.minDate =  new Date(); //  Set Min Date For Validation

    $scope.open = function($event) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.opened = true;
    };

    $scope.dateOptions = {
        formatYear: 'yy',
        startingDay: 1,
        showWeeks:'false'
    };

    /*-----------------------*/




    //config parameter is need to send client data to server in ajax request
    var genpodtlsconfig = {
        headers : {
            'Accept' : 'application/json',
            'Content-Type': 'application/json',
        }
    }

    /*
     * Api Name     - Get Receiver po Data
     * Created By   - vaibhav godambe
     * Created On   - 27 jan 2017
     * Modified By  -
     * Modified On  -
     * Purpose      - This api is used to Get Receiver po data.
     */

    $http.get(ContextPath +'/api/v1/quotations/'+ ReceivedquoId_Cookie +'?projection=detail' , genpodtlsconfig)
        .success(function (data, status) {
           //console.log('Received quotation details  : ' + JSON.stringify(data));
           //console.log('Received quotation details status : ' + status);

            vm.receivedQuotationId = data.id;
            vm.orgName = data.senderOrganization.organization;
            vm.emailid = data.senderOrganization.createdBy;
            vm.showdate = data.senderOrganization.created;
            vm.productName = data.product.product;
            vm.composition = data.product.composition;
            vm.rate = data.rate;
            vm.qty =  data.quantity;
            vm.uom =  data.unitOfMeasurement.uom;
            vm.tax = data.tax;
            vm.taxRate = data.taxRate;
            vm.incoterm = data.incoterm;
            vm.paymentterms = data.paymentTerms;
            vm.leadtime = data.leadTime;
            vm.offervalidity = data.offerValidity;
            vm.msg = data.message;
            vm.genPoShipmentBy = data.shipmentBy;
            //console.log("Generate Po shipmentby : " +vm.genPoShipmentBy);
            //console.log("Generate Po typeof shipmentby" + typeof vm.genPoShipmentBy);
            vm.frieghttype = data.frieghtType;
            vm.packaging = data.packaging;
            vm.status = data.status;

            //console.log("Received quotation status :"+ vm.status);
            vm.senderorgId =  data.senderOrganization.id;

            vm.amt = vm.rate * vm.qty; //Excluding Taxes
            //vm.ttamt = vm.rate * vm.qty * vm.taxRate;  //Including Taxes

            vm.ttamt = ( vm.rate * vm.qty * (vm.taxRate/100)) + (vm.rate * vm.qty); // Including Taxes

            // parameter Required  for generate Po
            vm.senderOrganizationurl = orgnbaseurl + data.receiverOrganization.id;
            vm.receiverOrganizationurl = orgnbaseurl + data.senderOrganization.id;


            //set default checkbox value
            vm.checkboxModel = {
                PackagingList:false,
                NonPreferentialCertificateOrigin:false,
                BillLading:false,
                HealthCertificate:false,
                PreferentialCertificateOrigin:false,
                ManufacturingCertificate:false,
                CertificateAnalysis:false,
                InsurancePolicy:false,
                AirwayBill:false,
                others:false,
            };


            // sender org dropdown info
            $http.get(ContextPath +'/api/v1/organizations/'+ vm.senderorgId +'/user' , genpodtlsconfig)
                .success(function (data, status) {
                   //console.log('senderOrganization details  : ' + JSON.stringify(data));
                   //console.log('senderOrganization details status : ' + status);

                    vm.SenderOrgEmail = data.email;


                }).error(function (data, status) {
                sessionout.checksessionout(status);
                //console.log("senderOrganization details Error Data : " +data);
                //console.log("senderOrganization details Error Status : " +status);
            });


        })
        .error(function (data, status) {
            sessionout.checksessionout(status);
            //console.log("Received quotation details Error Data : " +data);
            //console.log("Received quotation details Error Status : " +status);
        });

     /*
     * Method Name  - chkreqdoc
     * Created By   - vaibhav godambe
     * Created On   - 2 Feb 2017
     * Modified By  -
     * Modified On  -
     * Purpose      - This api is used to check at least one check box check.
     */


      vm.chkreqdoc = function () {

         //console.log('in chkreqdoc');
          // Required document checkbox  validation on ngchange
          if(vm.checkboxModel.CommercialInvoice == true || vm.checkboxModel.PackagingList == true || vm.checkboxModel.NonPreferentialCertificateOrigin == true ||
              vm.checkboxModel.BillLading == true || vm.checkboxModel.HealthCertificate == true || vm.checkboxModel.PreferentialCertificateOrigin == true ||
              vm.checkboxModel.ManufacturingCertificate == true || vm.checkboxModel.CertificateAnalysis == true || vm.checkboxModel.InsurancePolicy == true ||
              vm.checkboxModel.AirwayBill == true || vm.checkboxModel.others == true)
          {
              vm.checkreqcodument  = true;
          }
          else{
              vm.checkreqcodument  = false;
          }
      }

    /*
     * Method Name  - resetGenratepoForm
     * Created By   - vaibhav godambe
     * Created On   - 23 March 2017
     * Modified By  -
     * Modified On  -
     * Purpose      - This api is used to reset form data.
     */


      vm.resetGenratepoForm = function(){
          vm.genPo = false;

          vm.dt = '';
          vm.checkboxModel.CommercialInvoice = false;
          vm.checkboxModel.PackagingList = false;
          vm.checkboxModel.NonPreferentialCertificateOrigin = false;
          vm.checkboxModel.BillLading = false;
          vm.checkboxModel.HealthCertificate = false;
          vm.checkboxModel.PreferentialCertificateOrigin = false;
          vm.checkboxModel.ManufacturingCertificate = false;
          vm.checkboxModel.CertificateAnalysis = false;
          vm.checkboxModel.InsurancePolicy = false;
          vm.checkboxModel.AirwayBill = false;
          vm.checkboxModel.others = false;
          //vm.msg = '';

      }



    /*
     * Method Name     - SendPurchaseOrder
     * Created By   - vaibhav godambe
     * Created On   - 27 jan 2017
     * Modified By  -
     * Modified On  -
     * Purpose      - This api is used to Send Po data.
     */

    //config parameter is need to send client data to server in ajax request
    var sendpodtlsconfig = {
        headers : {
            'Accept' : 'application/json',
            'Content-Type': 'application/json',
        }
    }

    vm.SendPurchaseOrder = function(genratepo){
        vm.genPo = true;

       //alert('in genratepo');

        // Required document checkbox  validation on ngclick
       if(vm.checkboxModel.CommercialInvoice == true || vm.checkboxModel.PackagingList == true || vm.checkboxModel.NonPreferentialCertificateOrigin == true ||
           vm.checkboxModel.BillLading == true || vm.checkboxModel.HealthCertificate == true || vm.checkboxModel.PreferentialCertificateOrigin == true ||
           vm.checkboxModel.ManufacturingCertificate == true || vm.checkboxModel.CertificateAnalysis == true || vm.checkboxModel.InsurancePolicy == true ||
           vm.checkboxModel.AirwayBill == true || vm.checkboxModel.others == true)
       {
           vm.checkreqcodument  = true;
       }
       else{
           vm.checkreqcodument  = false;
       }



       if(genratepo.$valid && vm.checkreqcodument  == true )
       {
            vm.sendrequestpurchaseOrder = true;
           //alert('valid');

            if(vm.docother == null || vm.docother == ' ' || vm.docother == undefined)
            {
                vm.docother = 'null';
            }

           //console.log("taxRate : " + vm.taxRate);

            var data = {
            quotation : vm.RecQuoBaseurl ,
            senderOrganization : vm.senderOrganizationurl,
            receiverOrganization : vm.receiverOrganizationurl,
            rate : vm.rate,
            quantity : vm.qty,
            paymentTerms : vm.paymentterms,
            tax : vm.tax,
            taxRate :  vm.taxRate,
            incoterm : vm.incoterm,
            message : vm.msg,
            deliverySchedule : vm.dt,
            commercialInvoice : vm.checkboxModel.CommercialInvoice,
            packagingList : vm.checkboxModel.PackagingList,
            nonPrefCertOrigin : vm.checkboxModel.NonPreferentialCertificateOrigin,
            billOfLading : vm.checkboxModel.BillLading,
            healthCertificate : vm.checkboxModel.HealthCertificate,
            prefCertOrigin : vm.checkboxModel.PreferentialCertificateOrigin,
            manufacturingCert : vm.checkboxModel.ManufacturingCertificate,
            certAnalysis : vm.checkboxModel.CertificateAnalysis,
            insurancePolicy : vm.checkboxModel.InsurancePolicy,
            airwayBill : vm.checkboxModel.AirwayBill,
            docOthers : vm.docother,
            others : vm.checkboxModel.others,
            frieghtType : vm.frieghttype,
            shipmentBy: vm.genPoShipmentBy,
            };

            //console.log('vm.genPoShipmentBy : ' + vm.genPoShipmentBy);

            //console.log("Genrate Po Data : " +JSON.stringify(data));


            $http.post(ContextPath +'/api/v1/purchaseOrders', data, sendpodtlsconfig)
            .success(function (data, status, sendpodtlsconfig) {
                //console.log('Generate Purchase order details  : ' + JSON.stringify(data));
                //console.log('Generate Purchase order details status : ' + status);

                //config parameter is need to send client data to server in ajaxrequest
                var updatestatusconfig = {
                    headers : {
                        'Accept' : 'application/json',
                        'Content-Type': 'application/json',
                    }
                }

                var POData = {
                    status : 'PURCHASE_ORDER',
                };

                //console.log('PO status : ' + JSON.stringify(POData));

                //console.log('Quotation id: ' + vm.receivedQuotationId);

                $http.patch(ContextPath +'/api/v1/quotations/'+vm.receivedQuotationId, POData ,updatestatusconfig)
                    .success(function (data, status) {
                        //console.log('Quotation status update details  : ' + JSON.stringify(data));
                        //console.log('Quotation status update status : ' + status);

                    })
                    .error(function (data, status) {
                        sessionout.checksessionout(status);
                        //console.log('Quotation status update Error details  : ' + JSON.stringify(data));
                        //console.log('Quotation status update Error status : ' + status);
                    });


                vm.sendrequestpurchaseOrder =false;
                vm.POSendSuccess =true;

                var reloadRoute = function() {
                    vm.POSendSuccess = false;
                    $location.path('/purchaseorder');
                }

                $timeout(reloadRoute, 3000); // timeout

            })
            .error(function (data, status) {
                vm.sendrequestpurchaseOrder =false;
                vm.POSendSuccess = false;
            sessionout.checksessionout(status);
            //console.log("Generate Purchase order details Error Data : " +data);
            //console.log("Generate Purchase order details Error Status : " +status);
            });

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
               // vm.password = data.password;
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
                        })

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