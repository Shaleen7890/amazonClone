const express= require('express')
const app = express();
const cors= require('cors')
const Razorpay= require('razorpay')
const path= require('path')

app.use((cors()))
app.post('/payment',(req,res)=>{
    
    const instance = new Razorpay({ key_id: 'rzp_test_FrCF6fMx4En7r6', key_secret: 's0CQwutspJEY90et4oOB9qqI' })
    try{
        const response= instance.orders.create({
            // amount: (amount*100).toString(),
            currency: "INR",
            // receipt: "receipt#1",
            })
            console.log(response)
            res.json({id:response.id,
                currency:response.currency,
                // amount:response.amount
            })
    }catch(error){
        console.log(error)
    }
})
// app.listen(3000,(req,res)=>{
//     console.log('Listening on port 1337')
// })