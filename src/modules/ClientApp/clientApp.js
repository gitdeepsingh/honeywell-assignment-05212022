import React, { Component } from 'react';

import './clientApp.css'

const inventory = [
    {
        id: 1, title: 'Washing Machine', subtitle: 'fully automatic', brand: 'Bosh', price: '25000', description: '',
        reviews: [{ reviewer: { id: '', name: '' }, rating: '', reviewDesc: '' }]
    },
    {
        id: 2, title: 'Honey', subtitle: '100% natural', brand: 'Well-Being', price: '455', description: '',
        reviews: [{ reviewer: { id: '', name: '' }, rating: '', reviewDesc: '' }]
    },
    {
        id: 3, title: 'iPhone 13', subtitle: 'with iOS 15', brand: 'Apple', price: '1200000', description: '',
        reviews: [{ reviewer: { id: '', name: '' }, rating: '', reviewDesc: '' }]
    }
]
class ClientApp extends Component {
    renderInventoryList = () => {
        return inventory.map((item, index) => {
            return <div className='inventory-item'>
                <div>
                    {item.title}
                </div>
                <div>
                    Price: Rs. {item.price}
                </div>
                <button>ADD</button>
                <button>REMOVE</button>
            </div>

        })
    }
    render() {
        return (
            <>
                <div className='inventory-list-viewer'>
                    {this.renderInventoryList()}
                </div>
            </>
        )
    }
}

export default ClientApp;