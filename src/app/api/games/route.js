import axios from 'axios'
import { NextResponse } from 'next/server';


export async function GetGames(request){
   try{
      const response=await axios.get('https://www.freetogame.com/api/games');
      return NextResponse.json({data:response.data});
   }catch(error){
      console.log(error)
   }

   return NextResponse.json({Data:'data'})
}

export {GetGames as GET}