import axios from "axios"

const userApi =  async () => {
    const api = axios.create({
        baseURL: "https://jsonplaceholder.typicode.com",
        headers : {
            "Content-Type": "application/json"
        }
    });

    api.interceptors.request.use((config)=>{
        console.log("요청", config.url);

        const token = 'my-access-token'
        config.headers.Authorization = `Bearer ${token}`
        return config
    },
        (error)=>{
            return Promise.reject(error)
        }   
)

    api.interceptors.response.use((response)=>{
        console.log("응답", response.config.url);
        return response

    },(error)=>{
        return Promise.reject(error)
    })

    try{
        const response = await api.get('/users');
        console.log(response.data);
    }catch(error){
        console.error("Error fetching users:", error.message);
    }
}


export { userApi }