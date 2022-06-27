/**
 *    Alert-Function.
 *    ===============
 */
const setAlert = (messege, type = 'danger') => {
   return `<p class="alert alert-${ type } d-flex justify-content-between"> ${ messege } <button class="btn btn-close" data-bs-dismiss="alert"></button> </p>`
};



/**
 *    Email-Check Function.
 *    ====================
 */
const emailCheck = (email) => {

   let pattern = /^[a-z0-9\._]{1,}@[a-z0-9]{1,}\.[a-z]{2,5}$/;
   return pattern.test(email);

};



/**
 *    Phone number Check-Function.
 *    ===========================
 */
const cellCheck = (cell) => {

   let pattern = /^(01|\+8801)[0-9]{9}$/;
   return pattern.test(cell);

};


/**
 *    Create LSData function.
 *    ======================
 */
const createLSData = ( key, value ) => {

   let data = [];

   // Check Ls Data.
   if( localStorage.getItem(key)){
      data = JSON.parse(localStorage.getItem(key));
   };

   // previous Ls data push in data object.
   data.push(value);

   // new LS data create.
   localStorage.setItem(key, JSON.stringify(data));

};



/**
 *    ReadLSData function.
 *    ===================
 */
const readLSData = (key) => {

   if( localStorage.getItem(key)){
      return JSON.parse(localStorage.getItem(key));
   }else {
      return false;
   };

};


/**
 *    Update Data function.
 *    ====================
 */
const updateData = ( key, array ) => {

   localStorage.setItem(key, JSON.stringify(array));

};

