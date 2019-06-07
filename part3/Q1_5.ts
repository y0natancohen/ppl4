// -------------------- 5.a --------------------
function async_f (x : number): Promise<number> {
    return new Promise<number> (function (resolve, reject) {
        if (x == 0){
            reject("cannot divide by zero");
        }else {
            resolve(1/x);
        }
    });
}

function async_g (x : number): Promise<number> {
    return new Promise<number> (function (resolve, reject) {
        resolve(x*x);
    });
}

function async_h (x : number): Promise<number> {
// return f(g(x))
    return new Promise<number> (function (resolve, reject) {
        async_g(x)
            .then(res => async_f(res)
                    .then(res => resolve(res))
                    .catch(err => reject(err)))
            .catch(err => reject(err))
    })
}

async_h(2)
    .then(result => console.log("result is: " + result))
    .catch(err => console.log("Error: " + err)); // result is: 0.25

async_h(0)
    .then(result => console.log("result is: " + result))
    .catch(err => console.log("Error: " + err)); // Error: cannot divide by 0
// -------------------- 5.a --------------------

// -------------------- 5.b --------------------


function async_error_f (x : number, callback : (err, res) => void): void {
    if (x == 0){
        callback("cannot divide by 0", undefined);
    } else {
        callback(undefined, 1/x);
    }
}

function async_error_g (x : number, callback : (err, res) => void): void {
    callback(undefined, x*x);
}

function async_error_h (x : number, callback_h : (err, res) => void): void {
    // return f(g(x))
    async_error_g(x, (err_g, res_g) => {
        if (err_g){
            callback_h(err_g, undefined)
        }else {
            async_error_f(res_g, (err_f, res_f) => callback_h(err_f ,res_f))
        }
    })
}

async_error_h(2, (err, res) =>
    (err)? console.log("Error: "+err): console.log("result is: "+res)); // result is: 0.25
async_error_h(0, (err, res) =>
    (err)? console.log("Error: "+err): console.log("result is: "+res)); // Error: cannot divide by 0
// -------------------- 5.b --------------------
