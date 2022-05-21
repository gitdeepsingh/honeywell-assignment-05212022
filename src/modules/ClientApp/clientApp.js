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

const cart = [];
class ClientApp extends Component {
    constructor() {
        super()
        this.state = {
            cartValue: 0
        }
    }

    onAdd = () => {
        this.setState((prev) => {
            return {
                cartValue: prev.cartValue + 1
            }
        })
    }
    onRemove = () => {
        const { cartValue } = this.state;
        if (cartValue > 0) {
            this.setState((prev) => {
                return {
                    cartValue: prev.cartValue - 1
                }
            })
        }

    }

    renderInventoryList = () => {
        const { cartValue } = this.state;
        return inventory.map((item, index) => {
            return <div className='inventory-item'>
                <div>
                    {item.title}
                </div>
                <div>
                    Price: Rs. {item.price}
                </div>
                <button onClick={this.onAdd}>ADD</button>
                <button onClick={this.onRemove}>REMOVE</button>
            </div>

        })
    }
    render() {
        const { cartValue } = this.state;
        return (
            <>
                <div className='inventory-list-viewer'>
                    {this.renderInventoryList()}
                </div>
                <div className='cart'>
                    <div> &#8371; CART</div>
                    <div>{cartValue}</div>
                </div>
            </>
        )
    }
}

export default ClientApp;