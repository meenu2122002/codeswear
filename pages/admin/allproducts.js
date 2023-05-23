import React from "react";
import {
    Typography,
    Box,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Chip,
} from "@mui/material";
// import BaseCard from "../baseCard/BaseCard";
import BaseCard from "@/src/components/baseCard/BaseCard";
import mongoose from "mongoose";
import Product from "@/models/product";
import { ThemeProvider } from "@mui/material/styles";
import FullLayout from "../../src/layouts/FullLayout";
import theme from "../../src/theme/theme";
import product from "@/models/product";



const ProductPerfomance = ({ products }) => {
    console.log("firesa")
    return (
        <ThemeProvider theme={theme}>
            <style jsx global>{`
        footer{
          display:none;
        }
      `}</style>
            <FullLayout>
                <BaseCard title="Product Perfomance">
                    <Table
                        aria-label="simple table"
                        sx={{
                            mt: 3,
                            whiteSpace: "nowrap",
                        }}
                    >
                        <TableHead>
                            <TableRow>
                                <TableCell>
                                    <Typography color="textSecondary" variant="h6">
                                        ID
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography color="textSecondary" variant="h6">
                                        Title
                                    </Typography>
                                </TableCell>

                                <TableCell>
                                    <Typography color="textSecondary" variant="h6">
                                        Image
                                    </Typography>
                                </TableCell>

                                <TableCell>
                                    <Typography color="textSecondary" variant="h6">
                                        Category
                                    </Typography>
                                </TableCell>
                                <TableCell align="right">
                                    <Typography color="textSecondary" variant="h6">
                                        Price
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {products.map((e) => (
                                <TableRow key={e.name}>
                                    <TableCell>
                                        <Typography
                                            sx={{
                                                fontSize: "15px",
                                                fontWeight: "500",
                                            }}
                                        >
                                            {e._id}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Box
                                            sx={{
                                                display: "flex",
                                                alignItems: "center",
                                            }}
                                        >
                                            <Box>
                                                <Typography
                                                    variant="h6"
                                                    sx={{
                                                        fontWeight: "600",
                                                    }}
                                                >
                                                    {e.title}
                                                </Typography>
                                                <Typography
                                                    color="textSecondary"
                                                    sx={{
                                                        fontSize: "13px",
                                                    }}
                                                >
                                                    {e.size}/{e.color}
                                                </Typography>
                                               
                                            </Box>
                                        </Box>
                                    </TableCell>
                                    <TableCell>
                                        {/* <Typography color="textSecondary" variant="h6">
                                            {e.category}
                                        </Typography> */}
                                         <img src={e.img} alt="" style={{ height: "60px", width: "60px" }} />
                                    </TableCell>
                                    <TableCell>
                                        <Typography color="textSecondary" variant="h6">
                                            {e.category}
                                        </Typography>
                                    </TableCell>
                                    

                                    <TableCell align="right">
                                        <Typography variant="h6">₹{e.price}</Typography>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </BaseCard>
            </FullLayout>
        </ThemeProvider>
    );
};
export async function getServerSideProps(context) {
    console.log("fired")
    const a = await mongoose.connect(process.env.MONGODB_URI)
    // console.log(a)
    // return handler(req,res);

    let products = await Product.find();
    // let products=await Product.find();


    console.log(products)


    return {
        props: { products: JSON.parse(JSON.stringify(products)) }, // will be passed to the page component as props
    }
}
export default ProductPerfomance;
