import jwtInterceptor from '../plugins/jwt.interceptor'

export default{
    
    async updateLastSeen(_, payload){
        if(payload.id!=null){
        const id=payload.id
       await jwtInterceptor.post('/chat/disconnected-user',{id})
        for (var i in payload.users) {
        if(id==payload.users[i]._id){
          payload.users[i].lastseen=new Date().toLocaleDateString([],{hour:'2-digit',minute:'2-digit',hour12:false})
          return
        }
      }
      }
     },
     async updateLastSeenToOnline(_,payload){
    if(payload.id!=null){
       const id=payload.id
    const response= await jwtInterceptor.post('/chat/connected-user',{id})
      for (var i in payload.users) {
      if(id==payload.users[i]._id){
        payload.users[i].lastseen=response.data
        return
      }
    }
    }
   },
   async getNotificationCount({commit},payload){
    let apiURL1 ="/chat/all-notification";
       const response1=await jwtInterceptor.post(apiURL1,{receiverId:payload.receiverId})
      const notifications=response1.data
       
      //   //("mounted",notifications);
            for (var i in payload.users) { 
        for(var j in notifications){
          //   //('hhhhhhhhhhh');
          if(payload.users[i]._id==notifications[j].senderId){
        // this.users[i].lastseen=response.data
       
         payload.users[i].notify=notifications[j].notification_count

      }
   } 
    }
    // payload.users=payload.userss
     //(payload.users);
     commit("setUsers", payload.users);
    return payload.users
}
}