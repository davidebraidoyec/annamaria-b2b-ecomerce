import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import image1 from './assets/1.jpg';
import image2 from './assets/2.jpg';
import image3 from './assets/3.jpg';


import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

import 'swiper/css';
import 'swiper/css/pagination';


export default function PromoSlider() {


    return (
        <Container fluid={'md'} id="promo-slider" className='p-0 mb-5'>
            <Swiper
                spaceBetween={0}
                pagination={{
                    clickable: true,
                }}
                modules={[Pagination]}
                className="promo-swiper"
            >
                <SwiperSlide>
                    <div className='promo-slider-slide p-4 text-light' style={{"backgroundImage": `url('${image1}')`}}>
                        <Row>
                            <Col xs={12} md={6}>
                                <h1>Lorem ipsum dolor sit amet</h1>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                            </Col>
                            <Col xs={12} md={6}></Col>
                        </Row>
                        
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className='promo-slider-slide p-4 text-light' style={{"backgroundImage": `url('${image2}')`}}>
                        <Row>
                            <Col xs={12} md={6}>
                                <h1>Lorem ipsum dolor sit amet</h1>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                            </Col>
                            <Col xs={12} md={6}></Col>
                        </Row>
                        
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className='promo-slider-slide p-4 text-light' style={{"backgroundImage": `url('${image3}')`}}>
                        <Row>
                            <Col xs={12} md={6}>
                                <h1>Lorem ipsum dolor sit amet</h1>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                            </Col>
                            <Col xs={12} md={6}></Col>
                        </Row>
                        
                    </div>
                </SwiperSlide>
            </Swiper>
        </Container>
    );
};