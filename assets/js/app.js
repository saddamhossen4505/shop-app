// Get elements.
const product_form = document.getElementById('product_form');
const all_product_list = document.getElementById('all_product_list');
const update_form = document.getElementById('update_form');
const single_view = document.getElementById('single_view');
const msg = product_form.querySelector('.msg');
const loading_img = product_form.querySelector('.loading_img');




// All LS Data Show.
const allProductData = () => {

    let data = readLSData('product');

    // Check first LS Data.
    if( !data ){
        all_product_list.innerHTML = `
        
        <tr>
            <td colspan="6" class="text-center"> No data founds </td>
            <td colspan="2" </td>
        </tr>

        `;
    };


    // Now Read Ls data.
    if( data ){

        let list = '';
        let total_amount = 0;
        data.map(( item, index ) => {

            total_amount += (item.price * item.quantity);

            list += `
            <tr style="vertical-align: middle;" class="text-center">
                <td>${ index + 1 }</td>
                <td>${ item.name }</td>
                <td><img style="width: 60px; height: 60px; border-radius: 4px;" src="${ item.photo }" alt=""></td>
                <td>${ item.price } TK.</td>
                <td>${ item.quantity }</td>
                <td>${ item.price * item.quantity } TK.</td>
                <td>
                    <a product_index="${index}" class="btn btn-info btn-sm product_view" href="#singleProduct_view" data-bs-toggle="modal"><i class="fas fa-eye"></i></a>
                    <a product_index="${index}" class="btn btn-warning btn-sm product_edit" href="#update_modal" data-bs-toggle="modal"><i class="fas fa-edit"></i></a>
                    <a product_index="${index}" class="btn btn-danger btn-sm product_delete" href="#"><i class="fas fa-trash"></i></a>
                </td>
            </tr>`;
        });

        list += `
        <tr>
            <td colspan="6" class="text-end"> Total Amount = ${ total_amount } BDT.</td>
            <td colspan="2" </td>
        </tr>
        `;
        all_product_list.innerHTML = list;

    };

};

allProductData();


// Product-form submit.
product_form.onsubmit = (e) => {

    e.preventDefault();


    // Loading images show.
    loading_img.style.display = 'block';

    // Loading Images setTimeout.
    let timeout = setTimeout(() => {
        loading_img.style.display = 'none';

        // Get Data from product_form.
        const form_data = new FormData(e.target);
        const product_data = Object.fromEntries(form_data.entries());
        const { name, photo, price, quantity } = Object.fromEntries(form_data.entries());

        

        // Form-Validation.
        if( !name || !photo || !price || !quantity ){
            msg.innerHTML = setAlert('All fields are required !');
        }else {

            createLSData( 'product', product_data );

            msg.innerHTML = setAlert('Successfully Data Add.', 'success');
            e.target.reset();
            allProductData();
        };

        // Timeout clear.
        clearTimeout(timeout);
    },1000);
};



// Action part start here.
all_product_list.onclick = (e) => {

    e.preventDefault();

    // Single Product show.
    if( e.target.classList.contains('product_view')){

        // Get all data and index from ls data.
        const index = e.target.getAttribute('product_index');
        const data = readLSData('product');
        const { name, photo, price, quantity } = data[index];

        //Single product show.
        single_view.innerHTML = `
        <img src="${ photo }" alt="">
        <h2> Name : ${ name }</h2>
        <p>Price : ${ price } TK.</p>`;

    }else if( e.target.classList.contains('product_edit')){

        const index = e.target.getAttribute('product_index');
        const data = readLSData('product');
        const { name, photo, price, quantity } = data[index];


        update_form.innerHTML = `
            <div class="my-3">
                <label for="">Name</label>
                <input type="text" name="name" value="${name}" class="form-control">
            </div>
            <div class="my-3">
                <img class="w-100" src="${photo}" alt="">
            </div>
            <div class="my-3">
                <label for="">Photo</label>
                <input type="text" name="photo" value="${photo}" class="form-control">
            </div>
            <div class="my-3">
                <label for="">Price</label>
                <input type="text" name="price" value="${price}" class="form-control">
            </div>
            <div class="my-3">
                <label for="">Quantity</label>
                <input type="text" name="quantity" value="${quantity}" class="form-control">
            </div>
            <div class="my-3">
                <input type="hidden" name="index" value="${index}" class="form-control">
            </div>
            <div class="my-3">
                <button class="btn btn-primary btn-sm w-100">Updata-Now</button>
            </div>`;




            // Update form submit.
            update_form.onsubmit = (e) => {

                e.preventDefault();

                // Get data from update form.
                const form_data = new FormData(e.target);
                const { index, name, photo, price, quantity } = Object.fromEntries(form_data.entries());

                // Get all data from Ls database.
                const all_data = readLSData('product');

                // Update form Data.
                let = all_data[index] = { index, name, photo, price, quantity };

                updateData('product', all_data);
                allProductData();

            };


    }else if( e.target.classList.contains('product_delete')){

        // Get data and index.
        let index = e.target.getAttribute('product_index');
        let data = readLSData('product');


        // Delete Data from LS Database.
        data.splice(index, 1);

        // Update Data Now.
        updateData('product', data);

        // Now reload.
        allProductData();
    };
};

// Action part ends here.




