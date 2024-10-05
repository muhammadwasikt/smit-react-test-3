import axios from 'axios';
import { useEffect, useState } from 'react';
import { RiSearch2Line } from "react-icons/ri";

const Crud = () => {
  const [product,setProduct] = useState([])
  const [isLoading,setIsLoading] = useState(false);
  const [filterProduct,setFilterProduct] = useState([]);
  const [make,setMake] = useState([]);
  const [search,setSearch] = useState('');
  const [isFound,seIsFound] = useState(false);
  const getData = async()=>{
    setIsLoading(true);
    try{
      const data = await axios.get('https://freetestapi.com/api/v1/cars')
      const res = data?.data;
      console.log(data)
      setProduct(res);
      setFilterProduct(res);
      const makes = [... new Set(res.map((item)=>item.make))];
      setMake(makes);
      setIsLoading(false);
   }
   catch(error){
     console.log(error);
     setIsLoading(false);
    }
  }

  const handleValue = (cat)=>{
    if(cat==="All"){
      setFilterProduct(product)
    }
    else{
      const filterdData = product.filter((item)=>item.make === cat);
      setFilterProduct(filterdData)
    }
   
  }

  const handleSearch = ()=>{
    const filterSearch =  filterProduct.filter((item)=>item.model.toLowerCase().includes(search.toLowerCase()))
    if(filterSearch.length===0){
      seIsFound(true);
    }
    else{
      setFilterProduct(filterSearch)
      seIsFound(false);
    }
  }

  const handleEnterSearch = (e)=>{
    if(e.key =="Enter"){
      handleSearch()
    }
  }


  useEffect(()=>{
   getData(); 
  },[])

  return (
    <div>
      {isLoading ? <div className="loader m-auto mt-[250px]"></div> 
      : 
     <>
      <div className='w-[100%] flex justify-evenly gap-x-1 p-[20px] bg-[#4379F2]'>
        <div className='bg-gray-200 outline-none p-2 rounded w-[60%] flex items-center justify-between'>
        <input onKeyDown={handleEnterSearch} value={search} placeholder='Type here you search......' onChange={(e)=>setSearch(e.target.value)} className='w-[100%] outline-none'/>
        <RiSearch2Line className='text-[gray]'/>
        </div>
        <select onChange={(e)=>handleValue(e.target.value)} className='bg-gray-200 lg:px-[10px] md:px-[10px] outline-none sm:px-[5px] w-[20%]'>
          <option value="All">All</option>
          {make.map((item,index)=>{
            return(
              <option key={index} value={item} className='border' >{item}</option>
            )
          })}
        </select>
        <button onClick={handleSearch} className='bg-gray-200 px-4 rounded-xl'>Search</button>
      </div>

        {isFound ? <div className='w-[100%] h-[90vh] flex justify-center items-center  '>
          <h1 className='text-3xl'>Your search result is not found</h1>

        </div> : 

    <div className='grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 p-[20px] gap-[20px] w-[100%] bg-[#FFEB00]'>
     {filterProduct.map((item)=>{
        const {id, make ,image ,model, year ,color ,price} = item;
        return(
          <div key={id}  className='bg-[#6EC207] rounded-md p-[10px] shadow-md'>

          <img src={image}/>
          <p>Company: {make}</p>
          <p>Model: {model}</p>
          <p>Manufacturing year: {year}</p>
          <p>Color: {color}</p>
          <p>Price: {price}</p>
          </div>
        )
      })}
     </div>
       }
    </>
       } 
    </div>
  );
}

export default Crud;
