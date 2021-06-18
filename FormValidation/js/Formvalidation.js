// counter variable used in form submition to add number in document name.
var counter = 0;
var createElemtArray = ["firstname", "lastname", "DOB", "mobilenumber", "city", "email", "address", "country", "state", "gender"];
var storageDataResult = [];
function StudentViewModel() {

    // Creating Observable
    this.firstname = ko.observable("").extend({ required: true, minLength: 3 });
    this.lastname = ko.observable("").extend({ required: true, minLength: 3 });
    this.dayDOB = ko.observableArray(["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31"]);
    this.monthDOB = ko.observableArray(["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]);
    this.yearDOB = ko.observableArray(["1998", "1999", "2000", "2001", "2002", "2003", "2004", "2005", "2006", "2007", "2008"]);
    this.selectedDayDOB = ko.observable("");
    this.selectedMonthDOB = ko.observable("");
    this.selectedYearDOB = ko.observable("");
    this.email = ko.observable("").extend({ email: true });
    this.mobilenumber = ko.observable("");

    this.city = ko.observable("").extend({ required: true });
    this.selectedgender = ko.observable("").extend({ required: true });
    this.address = ko.observable("").extend({ required: true });
    this.zipcode = ko.observable().extend({ required: true });
    this.states = ko.observable(['Maharashtra', 'Kerala', 'Uttar Pradesh', 'Tamil Nadu', 'Punjabi']);
    this.selectedState = ko.observable("");
    this.countries = ko.observable(['Nepal', 'India', 'Bhutan', 'Bangladesh']);
    this.selectedCountry = ko.observable("");

    this.otherhobby = ko.observable();
    //    result array 
    this.storageDataResult = ko.observableArray([]);
    // Below code is used to store form data in browser local storage.
    formSubmit = function (formElement) {

        var result = ko.validation.group(this, { deep: true });

        if (result().length > 0) {
            alert("Please fix all errors before preceding");
            result.showAllMessages(true);

            return false;
        } else {
            // Creating object to with properties and value.
            const saveDta = {
                firstname: this.firstname,
                lastname: this.lastname,
                DOB: this.selectedDayDOB() + "/" + this.selectedMonthDOB() + "/" + this.selectedYearDOB(),
                email: this.email,
                mobilenumber: this.mobilenumber,
                city: this.city,
                gender: this.selectedgender,
                address: this.address,
                state: this.selectedState,
                country: this.selectedCountry,

            }
            //converting object into json format
            const jsonData = ko.toJSON(saveDta);
            localStorage.setItem('student ' + counter,jsonData);
            counter++;
			

        }
    }
    //Below code is used to display storage data in Html page.
    for (var localStoragekeys in localStorage) {

        if (localStoragekeys.startsWith('st')) {
            documentKey = localStoragekeys.toString();
            var localStoragekeyDoc = localStorage.getItem(localStoragekeys);

            var parsedDocument = JSON.parse(localStoragekeyDoc);
            parsedDocument = { ...parsedDocument, documentKey: documentKey };
            this.storageDataResult.push(parsedDocument);
        }
    }
}
// Below function is used to delete document from local storage by document key.
function removeLocalStorageDataByKey(e) {

    localStorage.removeItem(documentKey);
    documentKey = null;
}

updateLocalStorageData = (e) => {
    console.log("eeeeeeeeeeeeeeeee ", e);
}
ko.applyBindings(new StudentViewModel());
