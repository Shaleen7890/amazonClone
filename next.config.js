module.exports = {
    images: {
        domains: ['fakestoreapi.com', 'links.papareact.com', 'pngimg.com','http://localhost:1337/payment']
    },
    experimental:{
        appDir:true
    },
    env: {
        stripe_public_key: process.env.STRIPE_PUBLIC_KEY
    }
}