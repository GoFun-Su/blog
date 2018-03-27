export default {
	axios_req_post:(url, params,callback,error) =>{
        axios.post(url, { params: params})
        	.then(({data}) => {
        		callback(data)
            })
            .catch(({data}) => {
        		alert(data)
            })
      }
 }