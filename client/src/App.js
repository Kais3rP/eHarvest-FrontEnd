import React from 'react';
import { flexColSpace } from './styled-components/globalStyles';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import styled from 'styled-components';
import Header from './components/Header';
import MidSection from './components/MidSection';
import Footer from './components/Footer';
import Cart from './components/Cart';
import Login from './components/Login';
import HeaderModal from './components/HeaderModal';
import { useSelector, useDispatch } from 'react-redux';
import { fetchOfferItems, fetchMostSoldItems, closeHeaderModal } from './slices/shopSlice';
import { useEffect } from 'react';




export default function () {
    const isCartOpen = useSelector(state => state.shop.isCartOpen);
    const isHeaderModalOpen = useSelector(state => state.shop.isHeaderModalOpen);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchOfferItems());
        dispatch(fetchMostSoldItems());
    }, [])
    return (
        <Router>
            <AppWrapper>

                <Header />
                {isHeaderModalOpen ? <HeaderModal onMouseOut={() => { dispatch(closeHeaderModal()) }} position={'100px'} /> : <HeaderModal position={'-200px'} />}
                {isCartOpen ? <Cart position={0} /> : <Cart position={'-500px'} />}
                <Switch>
                    <Route path="/login" >
                        <Login />
                    </Route>
                    <Route path="/" >
                        <MidSection />
                    </Route>
                </Switch>
                <Footer />
            </AppWrapper>
        </Router>
    )
}

const AppWrapper = styled.div`
${flexColSpace};
width:100vw;
min-height:100vh;
background:pink;
margin:0;
overflow:hidden;
`