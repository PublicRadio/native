export default (version) => 
	new Promise((resolve, reject)=>{
	    console.log(version)
	    resolve(version);
	})