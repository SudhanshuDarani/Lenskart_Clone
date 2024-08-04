import { useEffect, useState } from "react";
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from "chart.js"
import { Box, SimpleGrid, Stat, StatLabel, StatNumber, } from '@chakra-ui/react';
import AdminNavbar from "../AdminPage/AdminNavbar";
const host = "http://localhost:5000"
Chart.register(...registerables);
const AdminDashboard = () => {
    const [totalProducts, setTotalProducts] = useState(0);
    // const [totalUsers, setTotalUsers] = useState(0);
    const [totaladmin, setAdmins] = useState(0);
    const [totalorders, setTotalorders] = useState([]);

    const productsData = {
        responsive: true,
        labels: ['Products'],
        datasets: [
            {
                label: 'Total Products',
                data: [totalProducts],
                backgroundColor: '#3f51b5',
            },
        ],
    };

    const adminsData = {
        responsive: true,
        labels: ['Admin'],
        datasets: [
            {
                label: 'Total Admin',
                data: [totaladmin],
                backgroundColor: '#C2185B',
            },
        ],
    };

    // const usersData = {
    //     responsive: true,
    //     labels: ['Users'],
    //     datasets: [
    //         {
    //             label: 'Total Users',
    //             data: [totalUsers],
    //             backgroundColor: '#E64A19',
    //         },
    //     ],
    // };

    const ordersData = {
        responsive: true,
        labels: ['Placed', 'Shipped', 'Delivered'],
        datasets: [
            {
                label: "Total Orders",
                data: [
                    totalorders.filter((el) => el.status === "Placed").length,
                    totalorders.filter((el) => el.status === "Shipped").length,
                    totalorders.filter((el) => el.status === "Delivered").length
                ],
                backgroundColor: ['#11DAAC', '#9C27B0', '#FBC02D']
            }
        ]
    }

    useEffect(() => {
        axios.get(`${host}/eyeglasses`)
            .then((res) => {
                // console.log(res);
                setTotalProducts(res.data.length)
            })
            .catch((err) => {
                console.log(err);
            })
        // axios.get(`${host}/user`)
        //     .then((res) => {
        //         setTotalUsers(res.data.length)
        //     })
        //     .catch((err) => {
        //         console.log(err);
        //     })
        axios.get(`${host}/admin`)
            .then((res) => {
                // console.log(res);
                setAdmins(res.data.length)
            })
            .catch((err) => {
                console.log(err);
            })
        axios.get(`${host}/orders`)
            .then((res) => {
                // console.log(res);
                setTotalorders(res.data)
            })
            .catch((err) => {
                console.log(err);
            })
    }, [])
    return (
        <Box px={4} py={5} userSelect={"none"}>
            <AdminNavbar />
            <SimpleGrid columns={{ sm: 1, md: 2 }} spacing={25} userSelect={"none"}>
                <Box bg="white" p={5} borderRadius="md" boxShadow="md">
                    <Stat>
                        <StatLabel fontSize={"21pt"}>Total Products</StatLabel>
                        <StatNumber fontSize={"20pt"}>{totalProducts}</StatNumber>
                    </Stat>
                    <Box mt={4}>
                        <Bar data={productsData} />
                    </Box>
                </Box>
                <Box bg="white" p={5} borderRadius="md" boxShadow="md">
                    <Stat>
                        <StatLabel fontSize={"21pt"}>Total Orders</StatLabel>
                        <StatNumber fontSize={"20pt"}>{totalorders.length}</StatNumber>
                    </Stat>
                    <Box mt={4}>
                        <Bar data={ordersData} />
                    </Box>
                </Box>
                {/* <Box bg="white" p={5} borderRadius="md" boxShadow="md">
                    <Stat>
                        <StatLabel fontSize={"21pt"}>Total Users</StatLabel>
                        <StatNumber fontSize={"20pt"}>{totalUsers}</StatNumber>
                    </Stat>
                    <Box mt={4}>
                        <Bar data={usersData} />
                    </Box>
                </Box> */}
                <Box bg="white" p={5} borderRadius="md" boxShadow="md">
                    <Stat>
                        <StatLabel fontSize={"21pt"}>Total Admin</StatLabel>
                        <StatNumber fontSize={"20pt"}>{totaladmin}</StatNumber>
                    </Stat>
                    <Box mt={4}>
                        <Bar data={adminsData} />
                    </Box>
                </Box>
            </SimpleGrid>    
        </Box>
    )
};

export default AdminDashboard;