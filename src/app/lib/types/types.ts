interface WishList{

}
interface Cart{

}
interface CurrentSettings{

}

interface SignUp{
   username:string,
   password:string,
   wishlistItems:WishList[],
   cartItems:Cart[],
   currentSettings:CurrentSettings[]
}