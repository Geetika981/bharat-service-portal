const BASE_URL="http://localhost:4000/api"

export const pingServer=async()=>{
    const res=await fetch(`${BASE_URL}/ping`);
    return res.json()
}