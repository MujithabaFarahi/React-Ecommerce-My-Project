import React, { useContext, useEffect, useReducer } from 'react';
import axios from 'axios';
import {useLocation, useNavigate} from 'react-router-dom';
import { Store } from '../Store';
import LoadingBox from '../Components/LoadingBox';
import MessageBox from '../Components/MessageBox';
import Button from "react-bootstrap/Button";
import {toast} from "react-toastify";
import {getError} from "../Util";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const reducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_REQUEST':
            return { ...state, loading: true };
        case 'FETCH_SUCCESS':
            return {
                ...state,
                products: action.payload.products,
                loading: false,
            };
        case 'FETCH_FAIL':
            return { ...state, loading: false, error: action.payload };
        case 'CREATE_REQUEST':
            return { ...state, loadingCreate: true };
        case 'CREATE_SUCCESS':
            return {
                ...state,
                loadingCreate: false,
            };
        case 'CREATE_FAIL':
            return { ...state, loadingCreate: false };
        case 'DELETE_REQUEST':
            return { ...state, loadingDelete: true, successDelete: false };
        case 'DELETE_SUCCESS':
            return {
                ...state,
                loadingDelete: false,
                successDelete: true,
            };
        case 'DELETE_FAIL':
            return { ...state, loadingDelete: false, successDelete: false };

        case 'DELETE_RESET':
            return { ...state, loadingDelete: false, successDelete: false };

        default:
            return state;
    }
};

export default function ProductListPage() {
    const [ {
            loading,
            error,
            products,
            loadingCreate,
            loadingDelete,
            successDelete,
        },
        dispatch, ] = useReducer(reducer, {
        loading: true,
        error: '',
    });

    const navigate = useNavigate();
    const { state } = useContext(Store);
    const { userInfo } = state;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await axios.get(`/api/products/admin`, {
                    headers: { Authorization: `Bearer ${userInfo.token}` },
                });

                dispatch({ type: 'FETCH_SUCCESS', payload: data });
            } catch (err) {
                dispatch({ type: 'FETCH_FAIL', payload: err.message });
            }
        };
        if (successDelete) {
            dispatch({ type: 'DELETE_RESET' });
        } else {
            fetchData();
        }
    }, [userInfo, successDelete]);

    const createHandler = async () => {
        if (window.confirm('Are you sure to create?')) {
            try {
                dispatch({ type: 'CREATE_REQUEST' });
                const { data } = await axios.post(
                    '/api/products',
                    {},
                    {
                        headers: { Authorization: `Bearer ${userInfo.token}` },
                    }
                );
                toast.success('product created successfully');
                dispatch({ type: 'CREATE_SUCCESS' });
                navigate(`/admin/product/${data.product._id}`);
            } catch (err) {
                toast.error(getError(error));
                dispatch({
                    type: 'CREATE_FAIL',
                });
            }
        }
    };

    const deleteHandler = async (product) => {
        if (window.confirm('Are you sure to delete?')) {
            try {
                await axios.delete(`/api/products/${product._id}`, {
                    headers: { Authorization: `Bearer ${userInfo.token}` },
                });
                toast.success('product deleted successfully');
                dispatch({ type: 'DELETE_SUCCESS' });
            } catch (err) {
                toast.error(getError(error));
                dispatch({
                    type: 'DELETE_FAIL',
                });
            }
        }
    };

    return (
        <div>
            <Row>
                <Col>
                    <h1>Products</h1>
                </Col>
                <Col className="col text-end">
                    <div>
                        <Button type="button" onClick={createHandler}>
                            Create Product
                        </Button>
                    </div>
                </Col>
            </Row>

            {loadingCreate && <LoadingBox></LoadingBox>}
            {loadingDelete && <LoadingBox></LoadingBox>}

            {loading ? (
                <LoadingBox></LoadingBox>
            ) : error ? (
                <MessageBox variant="danger">{error}</MessageBox>
            ) : (
                <>
                    <table className="table">
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>IMAGE</th>
                            <th>NAME</th>
                            <th>PRICE</th>
                            <th>CATEGORY</th>
                            <th>BRAND</th>
                            <th>ACTIONS</th>
                        </tr>
                        </thead>
                        <tbody>
                        {products.map((product) => (
                            <tr key={product._id}>
                                <td className={"align-middle"}>{product._id}</td>
                                <td className={"align-middle"}><img
                                    src={product.image}
                                    alt={product.name}
                                    className={"img-fluid"}
                                ></img>
                                </td>
                                <td className={"align-middle"}>{product.name}</td>
                                <td className={"align-middle"}>{product.price}</td>
                                <td className={"align-middle"}>{product.category}</td>
                                <td className={"align-middle"}>{product.brand}</td>
                                <td className={"align-middle"}>
                                    <Button
                                        className={"editButton"}
                                        type="button"
                                        variant="light"
                                        onClick={() => navigate(`/admin/product/${product._id}`)}
                                    >
                                        Edit
                                    </Button>
                                    &nbsp;
                                    <Button
                                        className={"deleteButton"}
                                        type="button"
                                        variant="light"
                                        onClick={() => deleteHandler(product)}
                                    >
                                        Delete
                                    </Button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </>
            )}
        </div>
    );
}
