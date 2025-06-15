const BASE_URL="http://localhost:4000/api"

export const pingServer=async()=>{
    const rwss=await fetch(`${BASE_URL}/ping`);
    return rwss.json()
}