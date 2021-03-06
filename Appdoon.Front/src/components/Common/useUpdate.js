const useUpdate = async(url,body,headers) => {
    let message = "";
    let color = "";
    
    await fetch(url,{
        credentials:"include",
        method:"PUT",
        headers:headers,
        body:body
    })
    .then(res=>res.json())
    .then((result)=>{
        if(result.IsSuccess){

            message = result.Message;
            color = "green";
            
        }
        else{
            
            message = result.Message;
            color = "red";
            
        }
    })
    .catch(error => {
        alert(error.message);
        message = "خطایی رخ داده است!";
        color = "red";
    })

    return [message,color];   
}

export default useUpdate;