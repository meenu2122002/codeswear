import React from 'react'
import { ThemeProvider } from "@mui/material/styles";
import FullLayout from "../../src/layouts/FullLayout";
import theme from "../../src/theme/theme";
import { useState } from 'react';
import {
    Grid,
    Stack,
    TextField,
    Checkbox,
    FormGroup,
    FormControlLabel,
    RadioGroup,
    Radio,
    FormLabel,
    FormControl,
    Button,
  } from "@mui/material";
  import BaseCard from "../../src/components/baseCard/BaseCard";
  import { toast } from 'react-toastify';

  
const Add = () => {
    const [form, setform] = useState({
        title:"",
        desc:"",
        slug:"",
        color:"",
        size:"",
        category:"",
        price:"",
        availability:0,
        img:''
    })
    const handlechange= (e)=>{
setform({...form,[e.target.name]:e.target.value})
console.log("form",form)
    }
    const handleclick=async()=>{
console.log(form)
const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify([form])
  };
  const response = await fetch('http://localhost:3000/api/addproducts', requestOptions);
  const res=await response.json();
  if(res.success){
    toast.success('Yoh! Product added successfully',{autoClose:1000,  
        icon: '👏',position:"top-center"})
        setform({
            title:"",
            desc:"",
            slug:"",
            color:"",
            size:"",
            category:"",
            price:"",
            availability:0,
            img:''
        })
  }else{
    toast.error("Validation Failed",{autoClose:1000,icon: '😢',position:"top-center"});
  }
//   console.log("res",res)
 
    }
  return (
    <ThemeProvider theme={theme}>
        <style jsx global>{`
        footer{
          display:none;
        }
      `}</style>
    <FullLayout>
   <h1 className='text-2xl text-gray-500 text-center font-bold'>Add Product</h1>
    <Grid container spacing={0}>
      <Grid item xs={12} lg={12}>
        <BaseCard title="Form Layout">
          <Stack spacing={3}>
            <TextField value={ form.title} onChange={handlechange}
              name="title"
              label="Title"
              variant="outlined"
              
            />
            <TextField value={form.category} onChange={handlechange} name="category" label="Category" variant="outlined" />
            <TextField value={ form.size} onChange={handlechange}
              name="size"
              label="size"
            
              variant="outlined"
            />
            <TextField value={ form.color} onChange={handlechange}
              name="color"
              label="color"
            
              variant="outlined"
            />
            <TextField value={ form.slug} onChange={handlechange}
              name="slug"
              label="slug"
            
              variant="outlined"
            />
            <TextField value={ form.img} onChange={handlechange}
              name="img"
              label="ImageUrl"
            
              variant="outlined"
            />
            <TextField value={ form.availability} onChange={handlechange}
              name="availability"
              label="availability"
            
              variant="outlined"
            />
            <TextField value={ form.price} onChange={handlechange}
              name="price"
              label="price"
            
              variant="outlined"
            />
            <TextField value={ form.desc} onChange={handlechange}
              name="desc"
              label="Description"
              multiline
              rows={4}
              
            />
           
           
           
           
          </Stack>
          <br />
          <Button variant="outlined" mt={2} onClick={handleclick}>
            Submit
          </Button>
        </BaseCard>
      </Grid>

     
    </Grid>
  
     </FullLayout>
     </ThemeProvider>
  )
}

export default Add
