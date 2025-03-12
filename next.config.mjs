/** @type {import('next').NextConfig} */

const nextConfig = {
   images:{
    domains:['www.freetogame.com',"image.mux.com","assets.aceternity.com","res.cloudinary.com"],
    remotePatterns:[
      {
         protocol:'https',
         hostname:'gam3rs-blob.public.blob.vercel-storage.com',
         port:''
      }
    ]
   },
  async redirects(){
   return [
      {
         source: '/',
         destination: '/home', // Matched parameters can be used in the destination
         permanent: true,
       },
   ]
  }
};

export default nextConfig;
