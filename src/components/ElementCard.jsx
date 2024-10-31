import React from 'react';
import { Card } from 'antd';
import { Link } from 'react-router-dom';

const ElementCard = ({ element }) => {
    return (
        <Card className="p-6 text-center hover:shadow-xl transition-shadow bg-white/80">
            <div className={`${element.color} text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                <span className="text-3xl font-serif">{element.symbol}</span>
            </div>
            <h3 className="text-xl font-semibold mb-3">{element.name}</h3>
            <p className="text-gray-600 mb-4">{element.description}</p>
            <Link to={element.path} className="mt-2 px-6 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors">
                Learn More
            </Link>
        </Card>
    );
};

export default ElementCard;