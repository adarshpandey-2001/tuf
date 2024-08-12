import React, { useState, useEffect } from 'react'
import Banner from './Banner';

const Home = () => {

    const [banner, setBanner] = useState([]);

    const getBanner = async () => {
        const url = `http://127.0.0.1:8000/banner`;
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });
        const parsedResponse = await response.json();
        console.log(parsedResponse)
        setBanner(parsedResponse);
    }

    useEffect(() => {
        getBanner();
    }, [])

    return (
        <>
            <div className="container">
                <h1 className="text-center my-2">Home - Banner Display</h1>
                {banner.map((item) => {
                    return <Banner data={item} key={item.id} />
                })}
            </div>
        </>
    )
}

export default Home