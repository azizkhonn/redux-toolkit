/* eslint-disable no-unused-vars */
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useEffect, useState } from "react";
import { useAuthLoginMutation } from "../redux/api/auth-api";
import { useDispatch } from "react-redux";
import { loginUser } from "../redux/slices/authSlice";
import { useDeleteProductMutation, useGetProductsQuery } from "../redux/api/product-api";
import { Button, TextField, Typography, IconButton, CircularProgress, Container, Box, Paper, Rating, Card, CardContent, CardMedia } from '@mui/material';

const Login = () => {
    const [deleteProduct, { data: deleteProductData, isLoading: deleteProductLoading }] = useDeleteProductMutation();
    const { data: productData, isLoading: productLoading } = useGetProductsQuery();
    const [login, { data, isLoading, isSuccess }] = useAuthLoginMutation();
    const dispatch = useDispatch();
    const [eye, setEye] = useState(false);
    const [products, setProducts] = useState([]);

    const [user, setUser] = useState({
        username: '',
        password: ''
    });

    const handleLoginUser = (e) => {
        e.preventDefault();
        login(user);
    };

    useEffect(() => {
        if (isSuccess) {
            dispatch(loginUser(data?.payload?.token));
        }
    }, [isSuccess]);

    const handleDeleteProduct = (id) => {
        deleteProduct(id);
    };

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('https://66a511d65dc27a3c190a9139.mockapi.io/api/cars/cars');
                const data = await response.json();
                console.log("Fetched products:", data);
                setProducts(data);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        fetchProducts();
    }, []);

    return (
        <Container maxWidth="lg" sx={{ marginTop: 8 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 4 }}>
                <Paper elevation={3} sx={{ padding: 4, borderRadius: 2, width: '100%', maxWidth: 400 }}>
                    <Box component="form" onSubmit={handleLoginUser} noValidate>
                        <Typography variant="h4" align="center" gutterBottom>
                            Login
                        </Typography>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            label="Username"
                            value={user.username}
                            onChange={(e) => setUser({ ...user, username: e.target.value })}
                        />
                        <Box sx={{ position: 'relative' }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                label="Password"
                                type={eye ? "text" : "password"}
                                value={user.password}
                                onChange={(e) => setUser({ ...user, password: e.target.value })}
                            />
                            <IconButton
                                onClick={() => setEye(!eye)}
                                sx={{ position: 'absolute', right: 10, top: 35 }}
                            >
                                {eye ? <AiFillEyeInvisible /> : <AiFillEye />}
                            </IconButton>
                        </Box>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Login
                        </Button>
                    </Box>
                </Paper>
            </Box>

            {productLoading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                    <CircularProgress />
                </Box>
            ) : (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                    {products.map((product) => (
                        <Box key={product.id} sx={{ flex: '1 1 calc(33.333% - 16px)', boxSizing: 'border-box' }}>
                            <Card sx={{ height: '100%' }}>
                                <CardMedia
                                    component="img"
                                    alt={product.name}
                                    height="140"
                                    image={product.imageUrl || 'https://via.placeholder.com/150'}
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        {product.name}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {product.description}
                                    </Typography>
                                   
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        onClick={() => handleDeleteProduct(product.id)}
                                        disabled={deleteProductLoading}
                                        sx={{ mt: 2 }}
                                    >
                                        Delete
                                    </Button>
                                </CardContent>
                            </Card>
                        </Box>
                    ))}
                </Box>
            )}
        </Container>
    );
};

export default Login;