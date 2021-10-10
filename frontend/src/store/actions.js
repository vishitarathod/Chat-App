import jwtInterceptor from '../plugins/jwt.interceptor'

export default{
    
    async updateLastSeen(_, payload){
      console.log(payload.id,"......");
        if(payload.id!=null){
        console.log(payload.id);
        const id=payload.id
       const response=await jwtInterceptor.post('/chat/disconnected-user',{id})
      console.log("res.....data.........",response.data)
      console.log("total users....",payload.users);
     // for(var i=0;i<this.users.length;i++){
        for (var i in this.users) {
        if(id==this.users[i]._id){
          console.log("idsssssss",this.users[i]._id);
          console.log("before last seenssssss",this.users[i].lastseen);
          this.users[i].lastseen=new Date().toLocaleDateString([],{hour:'2-digit',minute:'2-digit',hour12:false})
          console.log("after last seenssssss",this.users[i].lastseen);
          return
        }
      }
      }
     },
     async updateLastSeenToOnline({commit},payload){
      console.log(payload.id,"......");
    if(payload.id!=null){
       console.log(payload.id,"......");
       const id=payload.id
     const response=await jwtInterceptor.post('/chat/connected-user',{id})
    console.log("res.....data.........",response.data)
    console.log("total users....",payload.users);
   // for(var i=0;i<this.users.length;i++){
      for (var i in payload.users) {
      if(id==payload.users[i]._id){
        console.log("idsssssss",payload.users[i]._id);
        console.log("before online status",payload.users[i].lastseen);
        payload.users[i].lastseen=response.data
        console.log(payload.users)
        commit("setUpdateLastSeenToOnline", payload.users);
        console.log("after online status",payload.users[i].lastseen);
        return
      }
    }
    }
   }
}